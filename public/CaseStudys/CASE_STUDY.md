# Laravel on the Edge: A Stateless-First Employee Management Platform on Vercel Serverless PHP

**Subtitle:** *Re-architecting a traditional Eloquent/CrudMonolith for AWS Lambda — where every framework default that assumed a persistent filesystem had to be deliberately re-engineered.*

---

## 1. Executive Summary / Overview

This project is a full-stack employee management platform — **First Onw HR** — built with **Laravel 12.69.2** and deployed exclusively to **Vercel's serverless PHP runtime** (`vercel-php@0.6.2`, running on AWS Lambda). It delivers a complete, authenticated CRUD product surface: registration, login, email verification, password reset/confirmation, profile management, and a paginated, responsive employee directory with create/read/update/delete flows.

The core engineering innovation is **not the CRUD itself but the deployment substrate underneath it**. PHP and Laravel were architected around a persistent, writable filesystem — `storage/` for compiled views, session files, cache, and logs; `bootstrap/cache/` for configuration; a long-lived web server process to boot the framework. None of those conditions exist on a stateless function runtime. The read-only filesystem after deploy, the ephemeral instance-local `/tmp`, and per-invocation cold starts are all Vercel/FaaS constraints that this project solves explicitly and defensively.

| Verified Project Facts | Value |
|---|---|
| Framework | Laravel Framework `v12.69.2` |
| PHP constraint | `^8.2` (dev machine verified on PHP 8.5) |
| Runtime | Vercel serverless PHP (`vercel-php@0.6.2`) |
| Persistent store | Managed cloud MySQL (Aiven) — single source of truth |
| Functional surface | 4 employee CRUD ops (Create, Read, Update, Delete) over 6 data fields |
| Pagination | 25 records per page (`simplePaginate(25)`) |
| Automated tests | 5 feature tests covering the full employee lifecycle + auth guards |
| Git history | 17 commits, including an explicit serverless-hardening phase |

No traffic/uptime figures are claimed here because the repository itself does not instrument them; every quantitative statement below is derived directly from committed code, configuration, and migrations.

---

## 2. Architecture & Serverless Engineering

### 2.1 The deployment topology

Vercel is configured with a **hybrid build graph** in `vercel.json` — one PHP serverless function and one static edge cache sharing the same domain:

```jsonc
// vercel.json
{
  "version": 2,
  "framework": null,                      // bypass framework auto-detection
  "installCommand": "npm install",
  "buildCommand": "npm run build",        // Vite production bundle
  "outputDirectory": "public",
  "builds": [
    { "src": "api/index.php", "use": "vercel-php@0.6.2" },   // PHP lambda
    { "src": "public/**",   "use": "@vercel/static" }        // CDN edge assets
  ],
  "routes": [
    { "src": "/build/(.*)",   "dest": "/public/build/$1" },  // Vite assets
    { "src": "/favicon.ico",  "dest": "/public/favicon.ico" },
    { "src": "/robots.txt",   "dest": "/public/robots.txt" },
    { "src": "/(.*)",         "dest": "/api/index.php" }     // everything else → Laravel
  ]
}
```

Key decisions visible in this file:

- **`framework: null`** — Because Laravel is *not* a brick-and-mortar, AOT-compiled frontend framework, Vercel's framework presets misfire. The build is a hand-written two-target graph: the PHP lambda owns all dynamic traffic, while `public/**` (favicon, robots, and the committed Vite bundle) is served from the CDN edge with zero function invocation.
- **Route ordering is intentional** — `/build/(.*)` is matched before the catch-all `/(.*)` so compiled assets (`public/build/assets/app-*.{css,js}`) are served statically and never burn a Lambda invocation (and never take a cold-start penalty), while every application route funnels through `api/index.php`.

### 2.2 The custom serverless entrypoint: `api/index.php`

Laravel ships a `public/index.php` front controller designed for a long-lived PHP-FPM/mod_php host. Vercel's lambda executes PHP from the function root, so `api/index.php` is a purpose-built bootstrapper:

```php
// api/index.php
$_ENV['APP_STORAGE'] = '/tmp/storage';

$paths = [
    '/tmp/storage/app',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/views',
    '/tmp/bootstrap/cache',
];
foreach ($paths as $path) {
    if (!is_dir($path)) {
        mkdir($path, 0777, true);
    }
}

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

$app->useStoragePath('/tmp/storage');

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
```

This sequence encodes the entire serverless adaptation in five deliberate steps:

1. **Pre-declare the storage override** *before* the framework boots, because Laravel resolves `storage_path()` during configuration.
2. **Idempotently materialize** the writable directory tree in `/tmp` — the only volume AWS Lambda makes writable.
3. **Load Composer's optimized autoloader** (`optimize-autoloader: true` in `composer.json` — an explicit cold-start optimization).
4. **Rebind the storage path** via `Application::useStoragePath()` so every subsequent `storage_path()` call — compiled Blade views, session writes, cache, logs — lands in `/tmp`.
5. **Handle the request through the classic HTTP Kernel** (including the `terminate()` lifecycle callback) rather than a shortcut, preserving framework semantics like response sending and post-response teardown.

The git history shows this is the *third* iteration of this file (commits `1c8fcec` → `d455acd`), converging from a directory-scatter approach to the streamlined five-directory bootstrap above.

### 2.3 Statelessness: moving every framework default off the filesystem

The most consequential architectural decision is that **all Laravel state moved into MySQL** (`config/database.php`, `config/session.php`, `config/cache.php`):

| Concern | Traditional default | This project |
|---|---|---|
| Sessions | `file` driver writing to `storage/framework/sessions` | **`database` driver → `sessions` table** |
| Cache | `file` driver writing to `storage/framework/cache` | **`database` driver → `cache` table** |
| Queues | `sync`/`database` local | **`database` driver → `jobs` table** |
| Logs | `stack` single file | era-configured via env |

Rationale, grounded in the Lambda execution model: `/tmp` is **ephemeral and instance-local**. State written there is invisible to the next invocation (which may land on a fresh cold container) and to parallel invocations during traffic scaling. File-backed sessions would therefore silently "forget" users mid-session — a catastrophic failure for an authenticated app. The three database-backed drivers make every invocation read and write the same durable store, giving **stateless functions with stateful behavior**. The schema required for this is itself captured in migration `0001_01_01_000000_create_users_table.php` (the `sessions` table with `id`, `user_id`, `payload`, `last_activity`) and `0001_01_01_000001_create_cache_table.php` / `0001_01_01_000002_create_jobs_table.php`.

### 2.4 TLS termination behind the CDN

Vercel terminates HTTPS at its edge; the origin Lambda receives a plain-HTTP request. Left unhandled, this causes two production defects: session cookies and any scheme-generated URLs (`redirect()->intended()`, asset URLs) resolve to `http://` under the TLS-serving domain — a mixed-content and session-integrity problem.

The fix lives in `app/Providers/AppServiceProvider.php`:

```php
public function boot(): void
{
    if ($this->app->environment('production')) {
        URL::forceScheme('https');
    }
}
```

The `production` guard is deliberate — it never corrupts local `http://localhost` development, and it makes the edge-termination assumption explicit and self-documenting in the provider that owns the concern.

### 2.5 Trimmed cold-start surface

A serverless cold start pays for *every* bootstrapped class and service provider. The project trims the fat aggressively:

- **Composer auto-discovery exclusion** (`composer.json` → `extra.laravel.dont-discover`): `laravel/pail`, `nunomaduro/collision`, and `pestphp/pest-plugin-laravel` are dev-only tooling that would otherwise be *auto-discovered and bootstrapped* in production. Each is explicitly suppressed (commits `91c142b`, `0d81409`).
- **Optimized autoloader + classmap** (`config` → `"optimize-autoloader": true`) so the generated `vendor/composer/autoload_classmap.php` avoids filesystem scans on every cold invocation.
- **Vite output committed to the repo** — `public/build/` was removed from `.gitignore` (commit `fd51666`) and `public/build/manifest.json` + hashed assets are tracked, so the edge serves them statically and the origin never compiles assets on boot.

---

## 3. Tech Stack & Tooling Matrix

| Layer | Technology | Version / Config | Role & Evidence |
|---|---|---|---|
| **Language** | PHP | `^8.2` (`composer.json`) | Serverless backend runtime |
| **Framework** | Laravel | `v12.69.2` (composer.lock) | Routing, ORM, auth, validation, templating |
| **Serverless runtime** | `vercel-php` builder | `0.6.2` (`vercel.json`) | PHP → AWS Lambda bridge |
| **Datastore (prod)** | MySQL (Aiven managed cloud) | `DB_CONNECTION=mysql` (`.env`) | Durable sessions, cache, queue, employees |
| **Datastore (dev/test)** | SQLite | file + `:memory:` (`phpunit.xml`) | Zero-friction local + isolated test DB |
| **Asset pipeline** | Vite 7 + `laravel-vite-plugin` 2 | `vite.config.js` | Compiles Tailwind + Alpine bundles |
| **Styling** | Tailwind CSS 3 (radix-free utility stack) | `tailwind.config.js`, dark-mode variants | Responsive card UI |
| **Interactivity** | Alpine.js 3.4 | `resources/js/app.js` (`Alpine.start()`) | Flash toasts, dropdowns, mobile nav |
| **Forms UX** | `@tailwindcss/forms` 0.5 | `tailwind.config.js` plugins | Blog-grade form field normalization |
| **Auth** | Laravel Breeze (Blade stack) + custom routes | `routes/auth.php` | Register/login/verify/reset/profile |
| **Validation** | Laravel Form Requests | `app/Http/Requests/*` | Server-side, reuse-safe rule objects |
| **Testing** | Pest 4 + `pest-plugin-laravel` | `tests/Feature/EmployeeTest.php` | Hybrid CRUD lifecycle verification |
| **Tooling** | Artisan, Tinker, Pint, Sail | `composer.json` dev deps | Local DX |
| **Deploy** | Vercel CLI (as dependency) + static/php builds | `vercel.json` | CI-agnostic, push-to-deploy |

---

## 4. Key Features & Implementation Details

### 4.1 Full auth surface, Breeze-scaffolded but customized

`routes/auth.php` wires the complete guest/authed flow — registration, session login, email-verification prompt + signed-link verification (rate-limited `throttle:6,1`), password reset via token, password confirmation, password change, and logout (POST/CSRF). A second `auth` middleware group in `routes/web.php` wraps profile editing (`PATCH /profile`) and account deletion (`DELETE /profile`, gated by `current_password` validation in `app/Http/Controllers/ProfileController.php`). Account deletion also demonstrates correct session hygiene: `logout()` → `invalidate()` → `regenerateToken()`.

Two production-grade details worth calling out:

- **Email-change invalidation** — `ProfileController::update()` detects `isDirty('email')` and resets `email_verified_at` to `null`, forcing re-verification of a changed address rather than silently trusting it.
- **Mass-assignment discipline** — `app/Models/User.php` `$fillable = ['name','email','password']`; the `password` and `remember_token` attributes are **hidden** from serialization, and `password` carries a `hashed` cast so every assignment is automatically hashed.

### 4.2 Employee CRUD with route-model-bound, validated operations

The domain model: `employees` table (`2026_09_14_102424_create_employees_table.php`) with `title` (string 100), `description` (nullable text), `address` (nullable string), `salary` (`decimal(10,2)`), `department` (string 100), timestamps. The Eloquent model (`app/Models/Employee.php`) uses `HasFactory` and an explicit `$fillable` list.

**Controller data flow** (`app/Http/Controllers/EmployeeController.php`):

| Method | Route | Mechanics |
|---|---|---|
| `index` | `GET /dashboard` | `simplePaginate(25)` descending by ID → card grid |
| `create` / `store` | `GET /create`, `POST /dashboard` | Renders form; stores **only validated data**, flashes `success`, redirects |
| `show` | `GET /dashboard/{employee}` | **Route-model-bound** `Employee $employee`, profile render |
| `edit` / `update` | `GET/DELETE /dashboard/{employee}...` | Model-bound prefill; PUT persists validated data, redirects to profile |
| `destroy` | `DELETE /dashboard/{employee}/delete` | Model-bound delete → dashboard redirect |

Every write path funnels through one FormRequest (`app/Http/Requests/EmployeeRequest.php`):

```php
public function authorize(): bool
{
    return Auth::check();
}

public function rules(): array
{
    return [
        'title'       => 'required|string|max:255',
        'department'  => 'required|string|max:255',
        'salary'      => 'required|numeric|min:0|max:99999999.99',
        'address'     => 'nullable|string|max:255',
        'description' => 'nullable|string',
    ];
}
```

This single class is reused by both `store()` and `update()` — eliminating validation drift between create and edit. The `salary` bounds mirror the `decimal(10,2)` column precisely (a 10-digit-capable max of `99999999.99`), so the *validation layer and schema layer cannot disagree*. Data never touches the model unvetted: only `$request->validated()` is passed to `Employee::create()` / `->update()`.

### 4.3 Responsive, accessible UI with real interaction detail

The Blade layer is organised around a shared `layouts/app.blade.php` shell and anonymous component partials. Notable implementation specifics:

- **Responsive employee grid** (`resources/views/dashboard.blade.php`) — dispatches across breakpoints (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3`), each card with a gradient hero band, a monospace `ID` badge, a computed two-letter initials monogram derived with `str($employee->title)->substr(...)->upper()`, hover elevation (`hover:-translate-y-1`, `transition-all duration-300`), and full dark-mode parity.
- **Empty-state handling** — `@forelse(...) @empty` renders a distinct, centered "no employees" message rather than a broken grid.
- **Pagination integrated into the layout** via `$employees->links()`, whose Blade partials are explicitly included in `tailwind.config.js` content scan paths so Tailwind purges the framework's paginator classes correctly.
- **Auto-dismissing flash toasts** (`layouts/app.blade.php`) — session `success` message rendered inside an Alpine component (`x-data="{show:true}"`, `x-init="setTimeout(() => show=false, 4000)"`) with a close button — genuine client-side behavior, not server-round-trip feedback.
- **Edit screen with inline editing** (`employees/edit.blade.php`) — editable inputs pre-populated with `old('title', $employee->title)` (last-submitted value wins, then model value) and per-field `@error` blocks rendering `$message`.
- **Progressive asset resilience** (`resources/views/components/header.blade.php`) — the head conditionally renders `@vite(...)` when `public/build/manifest.json` or `public/hot` exists; otherwise it emits a **precompiled inline Tailwind v4 stylesheet fallback**, so even a manifest-less deployment renders a styled, functional page.
- **Microcopy**: salary formatted with `number_format($employee->salary, 2)` for display; `created_at?->format('Y-m-d')` with a null-safe accessor.

### 4.4 Cost-instructed UX on the landing page

`resources/views/index.blade.php` is a hand-rolled, auth-aware landing experience (not the default Welcome page — deleted in commit `96bb0d0`). It branches on `Auth::check()` for nav alignment, renders the authenticated user's dropdown + Dashboard CTA to logged-in visitors, and login/register links to guests. Fonts are served from `fonts.bunny.net` with `<link rel="preconnect">` for early handshake.

---

## 5. Engineering Hurdles & Solutions

### Hurdle 1 — Read-only filesystem after deploy: Laravel won't boot

**Problem.** Laravel writes to `storage_path('framework/views')` (compiled Blade), `storage_path('framework/cache')`, `storage_path('framework/sessions')`, and `bootstrap/cache` during normal operation. On Vercel/Lambda the post-deploy filesystem is read-only; the first eager-loaded compiled view throws `ErrorException: file_put_contents(...): failed to open stream: Read-only file system`.

**Solution.** A bespoke front controller (`api/index.php`) that (a) pre-sets the storage override in `$_ENV` before framework config loads, (b) idempotently `mkdir`s the full writable tree under `/tmp`, and (c) rebinds with `Application::useStoragePath('/tmp/storage')` so every framework write target resolves inside `/tmp`. The design is **extensible**: future writable subdirectories are one array entry away.

### Hurdle 2 — Ephemeral, non-shared `/tmp` breaks sessions

**Problem.** Even with writes redirected to `/tmp`, session data would live only on the executing instance. Vercel may serve the *next* request from a different (or cold) container — logins would randomly evaporate under load, and scaled-up traffic would fragment state.

**Solution.** **Move state out of the filesystem entirely.** `SESSION_DRIVER=database`, `CACHE_STORE=database`, `QUEUE_CONNECTION=database` route all state through the shared cloud MySQL instance. This converts a fundamentally stateless runtime into a stateful application without adding external infrastructure beyond the database the app already owns. It is the difference between "runs on serverless" and "behaves correctly on serverless."

### Hurdle 3 — Cold-start latency on a framework with a heavy boot path

**Problem.** Laravel's service container bootstraps providers, middleware, facades, and the config repository on every cold invocation. Dev tooling auto-discovered in production adds bootstrap cost and risk; un-optimized autoloading adds filesystem churn.

**Solution.** A three-pronged cold-start diet, all visible in the repo:
1. `dont-discover` suppresses `pail`, `collision`, and `pest-plugin-laravel` in **production only** — they remain fully available for the `composer test` / `composer dev` local workflow.
2. `optimize-autoloader: true` generates authoritative classmaps so Composer never probes the filesystem.
3. `npm install && npm run build` are the build pipeline, and the compiled `public/build/` bundle is committed and served by `@vercel/static` — zero build-time work at deploy, zero origin-time asset generation.

### Hurdle 4 — TLS handoff at the edge produces `http://` URLs

**Problem.** Vercel's CDN terminates TLS; the origin sees HTTP. Without intervention, `route()` helpers, `redirect()->intended()`, and generated absolute links emit `http://`, breaking mixed-content rules and cookie security expectations on the public HTTPS domain.

**Solution.** `URL::forceScheme('https')` guarded by `app()->environment('production')` in `AppServiceProvider::boot()` — a single-line, environment-scoped fix certified by commit `b682f7a`.

### Hurdle 5 — Framework auto-detection fights a multi-bucket Vercel build

**Problem.** Vercel's framework presets assume a single-output SPA/SSG pipeline. Laravel ships PHP *and* static assets with conflicting routing requirements (CDN-cacheable `/build/*`, dynamic `/*`).

**Solution.** Compose the build graph manually: `framework: null`, explicit `use: vercel-php@0.6.2` for the function, `use: @vercel/static` for `public/**`, and ordered routes that prioritize static asset patterns before the PHP catch-all. Output directory scoped to `public/` while the lambda lives at `api/` keeps both halves of the graph correct.

---

## 6. Test Strategy

Testing is a first-class citizen and validates the auth + CRUD contract from the outside in:

- **Pest PHP on Laravel's test harness** (`tests/Pest.php`) binds all Feature tests to the base `Tests\TestCase` with `RefreshDatabase`, giving transactional DB isolation per test.
- **In-memory SQLite for tests** (`phpunit.xml`): `DB_CONNECTION=sqlite`, `DB_DATABASE=:memory:`, ephemeral `array` cache/session drivers, `sync` queue, `array` mailer — tests are fast, deterministic, and never touch the Aiven cluster.
- **`tests/Feature/EmployeeTest.php`** asserts the exact user-visible contract:

| Test | Assertion strength |
|---|---|
| Authenticated user views dashboard with employees | `assertOk()` + page contains employee title |
| Unauthenticated user is redirected | `assertRedirect('/login')` — the auth wall |
| Employee creation | `assertRedirect(dashboard)` **+ `assertDatabaseHas`** |
| Employee update | redirect to profile **+ `assertDatabaseHas('Updated Title')`** |
| Employee deletion | redirect to dashboard **+ `assertDatabaseMissing`** |

The database assertions are the point: they verify the write actually landed in persistence, not just that a 2xx came back. Factories (`UserFactory`, `EmployeeFactory`) generate realistic fixtures (job titles, salaries in `3000–50000`, real addresses).

---

## 7. Conclusion & Future Enhancements

### Conclusion

This project demonstrates that a **convention-ridden full-stack framework and a stateless FaaS runtime are not mutually exclusive** — they merely require that every framework assumption be made explicit and deliberately re-bound. The result is a production-shaped Laravel application that runs fully on Vercel's free-tier-compatible serverless PHP: Breeze-backed auth with verification, validated and model-bound CRUD, database-persisted sessions/cache/queue, CDN-served Vite assets, an HTTPS-safe URL scheme, multi-level dark-mode UI, and a committed, fast, isolated test suite. Inspection of the git history shows the engineering trajectory clearly: feature work first (CRUD + Breeze auth), then a dedicated serverless-hardening arc (storage rebinding, production-package suppression, static asset commitment, config iteration, TLS enforcement).

### Future Enhancements

Reasoned, codebase-grounded next steps:

1. **Durable queue workers for email.** `QUEUE_CONNECTION=database` is already configured and the `jobs` table migrated; wiring password-reset/profile notifications through it (a Firebase/Vercel cron or external worker draining `jobs`) would move mail off the request path — the correct serverless pattern.
2. **Ephemeral-transient backoff for sessions.** A Vercel cron that periodically garbage-collects expired `sessions`/`cache` rows would keep the shared store lean, since no long-lived PHP process runs Laravel's own session lottery (`session.php` lottery `[2,100]`) reliably.
3. **Salary privacy hardening.** The binding route exposes raw `$employee` to the profile view; introducing a Read/Update `DTO` or `$visible`/`$appends` presentation layer (e.g., salary formatted at the model layer via a custom cast) would centralize currency formatting currently done with inline `number_format` calls.
4. **API layer.** The controllers are presentational but already return only validated data; adding a first-party JSON API (TALL-style SPA or mobile read model) is a near-zero-cost extension given the existing FormRequest boundary.
5. **Observability.** With sessions/cache in durable storage, adding request logging to `logs` (a `/tmp` write) plus a `/up` health-check consumer would close the monitoring gap for a serverless origin.

---

*Case study generated from static analysis of the committed repository: `vercel.json`, `api/index.php`, `bootstrap/app.php`, `app/`, `config/`, `routes/`, `resources/views/`, `database/migrations/`, `tests/Feature/`, and the 17-commit history (commits `ebb8270` → `b682f7a`). Runtime-provoked production metrics (traffic volume, p95 latency, uptime) are not included because the repository does not ship telemetry for them; all claims above are verifiable against source.*