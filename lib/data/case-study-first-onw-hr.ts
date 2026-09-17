export type CaseStudyBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; title: string; lang: string; code: string }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "hurdle"; title: string; problem: string; solution: string };

export type CaseStudySection = {
  id: string;
  label: string;
  title: string;
  intro?: string;
  blocks: CaseStudyBlock[];
};

const vercelJson = `{
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
}`;

const apiIndexPhp = `$_ENV['APP_STORAGE'] = '/tmp/storage';

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

$kernel = $app->make(Illuminate\\Contracts\\Http\\Kernel::class);
$response = $kernel->handle($request = Illuminate\\Http\\Request::capture());
$response->send();
$kernel->terminate($request, $response);`;

const tlsProviderPhp = `public function boot(): void
{
    if ($this->app->environment('production')) {
        URL::forceScheme('https');
    }
}`;

export const firstOnwHrCaseStudy: {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  sections: CaseStudySection[];
} = {
  slug: "first-onw-hr",
  title: "First Onw HR",
  subtitle:
    "Re-architecting a traditional Eloquent/CRUD monolith for AWS Lambda — where every framework default that assumed a persistent filesystem had to be deliberately re-engineered.",
  summary:
    "A stateless-first employee management platform on Vercel serverless PHP — Laravel 12, PHP 8, and MySQL re-bound for a read-only filesystem and ephemeral /tmp.",
  sections: [
    {
      id: "executive-summary",
      label: "01 // Executive Summary",
      title: "Overview",
      blocks: [
        {
          kind: "paragraph",
          text: "First Onw HR is a full-stack employee management platform built with Laravel 12.69.2 and deployed exclusively to Vercel's serverless PHP runtime (vercel-php@0.6.2, running on AWS Lambda). It delivers a complete, authenticated CRUD product surface: registration, login, email verification, password reset/confirmation, profile management, and a paginated, responsive employee directory with create/read/update/delete flows.",
        },
        {
          kind: "table",
          headers: ["Verified Project Facts", "Value"],
          rows: [
            ["Framework", "Laravel Framework v12.69.2"],
            ["PHP constraint", "^8.2 (dev machine verified on PHP 8.5)"],
            ["Runtime", "Vercel serverless PHP (vercel-php@0.6.2)"],
            ["Persistent store", "Managed cloud MySQL (Aiven) — single source of truth"],
            ["Functional surface", "4 employee CRUD ops (Create, Read, Update, Delete) over 6 data fields"],
            ["Pagination", "25 records per page (simplePaginate(25))"],
            ["Automated tests", "5 feature tests covering the full employee lifecycle + auth guards"],
            ["Git history", "17 commits, including an explicit serverless-hardening phase"],
          ],
        },
        {
          kind: "paragraph",
          text: "The core engineering innovation is not the CRUD itself but the deployment substrate underneath it. PHP and Laravel were architected around a persistent, writable filesystem — storage/ for compiled views, session files, cache, and logs; bootstrap/cache/ for configuration; a long-lived web server process to boot the framework. None of those conditions exist on a stateless function runtime. The read-only filesystem after deploy, the ephemeral instance-local /tmp, and per-invocation cold starts are Vercel/FaaS constraints this project solves explicitly and defensively.",
        },
      ],
    },
    {
      id: "architecture",
      label: "02 // Architecture & Serverless Engineering",
      title: "The Deployment Topology",
      intro:
        "Vercel is configured with a hybrid build graph in vercel.json — one PHP serverless function and one static edge cache sharing the same domain.",
      blocks: [
        {
          kind: "code",
          title: "vercel.json",
          lang: "jsonc",
          code: vercelJson,
        },
        {
          kind: "list",
          items: [
            "framework: null — Laravel is not a brick-and-mortar, AOT-compiled frontend framework, so Vercel's presets misfire. The build is a hand-written two-target graph: the PHP lambda owns all dynamic traffic, while public/** is served from the CDN edge with zero function invocation.",
            "Route ordering is intentional — /build/(.*) is matched before the catch-all, so compiled assets are served statically and never burn a Lambda invocation or take a cold-start penalty.",
          ],
        },
        {
          kind: "paragraph",
          text: "Laravel ships a public/index.php front controller designed for a long-lived PHP-FPM/mod_php host. Vercel's lambda executes PHP from the function root, so api/index.php is a purpose-built bootstrapper that pre-declares the storage override before framework config loads, idempotently materializes the writable tree under /tmp, and rebinds storage via Application::useStoragePath().",
        },
        {
          kind: "code",
          title: "api/index.php",
          lang: "php",
          code: apiIndexPhp,
        },
        {
          kind: "paragraph",
          text: "The most consequential architectural decision: all Laravel state moved into MySQL. In the Lambda execution model /tmp is ephemeral and instance-local — state written there is invisible to the next invocation and to parallel invocations during traffic scaling, so file-backed sessions would silently 'forget' users mid-session. Database-backed drivers make every invocation read and write the same durable store, giving stateless functions with stateful behavior.",
        },
        {
          kind: "table",
          headers: ["Concern", "Traditional default", "This project"],
          rows: [
            ["Sessions", "file driver → storage/framework/sessions", "database driver → sessions table"],
            ["Cache", "file driver → storage/framework/cache", "database driver → cache table"],
            ["Queues", "sync / database local", "database driver → jobs table"],
            ["Logs", "stack — single file", "era-configured via env"],
          ],
        },
        {
          kind: "paragraph",
          text: "Vercel terminates HTTPS at its edge, so the origin Lambda receives plain-HTTP requests. Left unhandled this causes session cookies and scheme-generated URLs to resolve to http:// — a mixed-content and session-integrity problem. The fix lives in AppServiceProvider, guarded deliberately by the production environment so local development is never corrupted.",
        },
        {
          kind: "code",
          title: "app/Providers/AppServiceProvider.php",
          lang: "php",
          code: tlsProviderPhp,
        },
        {
          kind: "paragraph",
          text: "A serverless cold start pays for every bootstrapped class and service provider, so the project trims the fat aggressively.",
        },
        {
          kind: "list",
          items: [
            "Composer auto-discovery exclusion (extra.laravel.dont-discover) suppresses laravel/pail, nunomaduro/collision, and pestphp/pest-plugin-laravel in production — dev-only tooling otherwise auto-discovered and bootstrapped.",
            "Optimized autoloader + classmap (composer.json) so the generated autoload_classmap.php avoids filesystem scans on every cold invocation.",
            "Vite output committed to the repo — public/build/ was removed from .gitignore so the edge serves assets statically and the origin never compiles assets on boot.",
          ],
        },
      ],
    },
    {
      id: "stack",
      label: "03 // Tech Stack & Tooling Matrix",
      title: "Stack",
      blocks: [
        {
          kind: "table",
          headers: ["Layer", "Technology", "Role"],
          rows: [
            ["Language", "PHP ^8.2", "Serverless backend runtime"],
            ["Framework", "Laravel v12.69.2", "Routing, ORM, auth, validation, templating"],
            ["Serverless runtime", "vercel-php builder 0.6.2", "PHP → AWS Lambda bridge"],
            ["Datastore (prod)", "MySQL (Aiven managed cloud)", "Durable sessions, cache, queue, employees"],
            ["Datastore (dev/test)", "SQLite (file + :memory:)", "Zero-friction local + isolated test DB"],
            ["Asset pipeline", "Vite 7 + laravel-vite-plugin 2", "Compiles Tailwind + Alpine bundles"],
            ["Styling", "Tailwind CSS 3", "Responsive card UI, dark-mode variants"],
            ["Interactivity", "Alpine.js 3.4", "Flash toasts, dropdowns, mobile nav"],
            ["Auth", "Laravel Breeze (Blade stack) + custom routes", "Register/login/verify/reset/profile"],
            ["Validation", "Laravel Form Requests", "Server-side, reuse-safe rule objects"],
            ["Testing", "Pest 4 + pest-plugin-laravel", "Hybrid CRUD lifecycle verification"],
            ["Deploy", "Vercel CLI + static/php builds", "CI-agnostic, push-to-deploy"],
          ],
        },
      ],
    },
    {
      id: "features",
      label: "04 // Key Features",
      title: "Implementation Details",
      blocks: [
        {
          kind: "list",
          items: [
            "Full auth surface — routes/auth.php wires registration, session login, email-verification (signed-link, rate-limited with throttle:6,1), password reset, confirmation, change, and logout (POST/CSRF). Profile edits and account deletion run behind an auth middleware group in routes/web.php.",
            "Email-change invalidation — ProfileController::update() detects isDirty('email') and resets email_verified_at to null, forcing re-verification of a changed address rather than silently trusting it.",
            "Mass-assignment discipline — User model $fillable = ['name','email','password']; password and remember_token are hidden from serialization, and password carries a hashed cast so every assignment is automatically hashed.",
            "Employee CRUD — employees table (title, description, address, salary decimal(10,2), department, timestamps) driven by an Eloquent model with HasFactory; every write path funnels through one reuse-safe FormRequest (EmployeeRequest) shared by store() and update() so validation and schema cannot drift.",
            "Route-model-bound operations — show/edit/update/delete bind Employee $employee directly; salary bounds in the FormRequest mirror the decimal(10,2) column precisely.",
            "Responsive dashboard — grid-cols-1 md:grid-cols-2 xl:grid-cols-3 card grid, two-letter initials monogram, hover elevation, @forelse empty-state handling, and pagination ($employees->links()) with Tailwind-purged paginator classes.",
            "Auto-dismissing flash toasts — session success rendered inside an Alpine component (x-init setTimeout 4000) with a close button.",
          ],
        },
      ],
    },
    {
      id: "hurdles",
      label: "05 // Engineering Hurdles",
      title: "Problems & Solutions",
      blocks: [
        {
          kind: "hurdle",
          title: "Hurdle 1 — Read-only filesystem: Laravel won't boot",
          problem:
            "Laravel writes to storage_path('framework/views'), 'framework/cache', 'framework/sessions', and bootstrap/cache during normal operation. On a read-only post-deploy filesystem, the first eager-loaded compiled view throws ErrorException: file_put_contents(...): failed to open stream: Read-only file system.",
          solution:
            "A bespoke front controller (api/index.php) pre-sets the storage override in $_ENV before framework config loads, idempotently mkdirs the full writable tree under /tmp, and rebinds via Application::useStoragePath('/tmp/storage') so every framework write target resolves inside /tmp. The design is extensible — future writable subdirectories are one array entry away.",
        },
        {
          kind: "hurdle",
          title: "Hurdle 2 — Ephemeral, non-shared /tmp breaks sessions",
          problem:
            "Even with writes redirected to /tmp, session data would live only on the executing instance. Vercel may serve the next request from a different (or cold) container — logins would randomly evaporate under load, and scaled-up traffic would fragment state.",
          solution:
            "Move state out of the filesystem entirely: SESSION_DRIVER=database, CACHE_STORE=database, QUEUE_CONNECTION=database route all state through the shared cloud MySQL instance — converting a fundamentally stateless runtime into a stateful application without extra infrastructure.",
        },
        {
          kind: "hurdle",
          title: "Hurdle 3 — Cold-start latency on a heavy boot path",
          problem:
            "Laravel's service container bootstraps providers, middleware, facades, and config on every cold invocation; dev tooling auto-discovered in production adds bootstrap cost and risk; un-optimized autoloading adds filesystem churn.",
          solution:
            "A three-pronged cold-start diet: dont-discover suppresses pail, collision, and pest-plugin-laravel in production only; optimize-autoloader: true generates authoritative classmaps; and the compiled public/build/ bundle is committed and served by @vercel/static — zero build-time work at deploy, zero origin-time asset generation.",
        },
        {
          kind: "hurdle",
          title: "Hurdle 4 — TLS handoff at the edge produces http:// URLs",
          problem:
            "Vercel's CDN terminates TLS; the origin sees HTTP. Without intervention, route() helpers, redirect()->intended(), and generated absolute links emit http://, breaking mixed-content rules and cookie security expectations.",
          solution:
            "URL::forceScheme('https') guarded by app()->environment('production') in AppServiceProvider::boot() — a single-line, environment-scoped fix.",
        },
        {
          kind: "hurdle",
          title: "Hurdle 5 — Framework auto-detection fights a multi-bucket build",
          problem:
            "Vercel's framework presets assume a single-output SPA/SSG pipeline, but Laravel ships PHP and static assets with conflicting routing requirements (CDN-cacheable /build/* vs dynamic /*).",
          solution:
            "Compose the build graph manually: framework: null, explicit vercel-php@0.6.2 for the function, @vercel/static for public/**, and ordered routes that prioritize static asset patterns before the PHP catch-all.",
        },
      ],
    },
    {
      id: "testing",
      label: "06 // Test Strategy",
      title: "Outside-In Verification",
      intro:
        "Testing is a first-class citizen and validates the auth + CRUD contract from the outside in — Pest PHP on Laravel's test harness, in-memory SQLite, and database assertions that verify writes actually landed.",
      blocks: [
        {
          kind: "table",
          headers: ["Test", "Assertion strength"],
          rows: [
            ["Authenticated user views dashboard with employees", "assertOk() + page contains employee title"],
            ["Unauthenticated user is redirected", "assertRedirect('/login') — the auth wall"],
            ["Employee creation", "assertRedirect(dashboard) + assertDatabaseHas"],
            ["Employee update", "redirect to profile + assertDatabaseHas('Updated Title')"],
            ["Employee deletion", "redirect to dashboard + assertDatabaseMissing"],
          ],
        },
        {
          kind: "paragraph",
          text: "The database assertions are the point: they verify the write actually landed in persistence, not just that a 2xx came back. Factories (UserFactory, EmployeeFactory) generate realistic fixtures — job titles, salaries in 3000–50000, real addresses — and RefreshDatabase gives transactional DB isolation per test.",
        },
      ],
    },
    {
      id: "conclusion",
      label: "07 // Conclusion",
      title: "Future Enhancements",
      blocks: [
        {
          kind: "paragraph",
          text: "A convention-ridden full-stack framework and a stateless FaaS runtime are not mutually exclusive — they merely require that every framework assumption be made explicit and deliberately re-bound. The result is a production-shaped Laravel application that runs fully on Vercel's free-tier-compatible serverless PHP, with every quantitative claim verifiable against repositories listed in the full case study.",
        },
        {
          kind: "list",
          items: [
            "Durable queue workers for email — QUEUE_CONNECTION=database is configured and the jobs table migrated; draining jobs off the request path is the correct serverless pattern.",
            "Ephemeral-transient backoff for sessions — a Vercel cron that periodically garbage-collects expired sessions/cache rows keeps the shared store lean, since no long-lived PHP process runs Laravel's session lottery.",
            "Salary privacy hardening — a Read/Update DTO or $visible/$appends presentation layer centralizes currency formatting currently done with inline number_format calls.",
            "API layer — controllers already return only validated data, so a first-party JSON API (TALL-style SPA or mobile read model) is a near-zero-cost extension.",
            "Observability — request logging to /tmp plus a /up health-check consumer closes the monitoring gap for a serverless origin.",
          ],
        },
      ],
    },
  ],
};