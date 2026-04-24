<div align="center">

# Portfolite

**A precision-built portfolio surface where systems thinking meets interface craft.**

*Engineering mindset first: clarity, performance, and intentional structure over decoration.*

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-FF0055?style=flat-square)](https://motion.dev/)
[![Lucide React](https://img.shields.io/badge/Lucide-React-F56565?style=flat-square&logo=lucide&logoColor=white)](https://lucide.dev/)

</div>

---

## Overview

**Portfolite** is a minimalist, dark-first developer portfolio built on the Next.js App Router. The experience is anchored in a near-black canvas (`#050505`), restrained typography (Geist Sans / Geist Mono via `next/font/google`), and motion that reinforces hierarchy rather than competing with content.

---

## Core Architecture

### Hexagonal SVG node system

The hero’s visual signature is a **custom hexagonal SVG composition** (`components/ui/HexNode.tsx`), not a stock illustration or Lottie asset.

| Layer | Role |
|--------|------|
| **Outer frame** | Large hexagonal shell (`viewBox="0 0 320 320"`) filled with a diagonal `linearGradient` for depth and brand-adjacent burgundy → violet tones. |
| **Inner core** | Six modular path instances arranged in a ring using per-node `translate` / `rotate` with `transformOrigin: center` and `transformBox: fill-box` for predictable SVG geometry. |
| **Path symmetry** | Alternate cells use mirrored path data (`originalPath` vs `reflectedPath`) so the tessellation reads as a coherent engineered lattice. |
| **SSR-safe IDs** | React `useId()` (sanitized for SVG) scopes `<linearGradient>` definitions (`mainGradient-*`, `coreGradient-*`), avoiding ID collisions when multiple instances or strict hydration are in play. |
| **Motion** | The wrapper uses `motion` / Framer Motion–compatible primitives for an entrance transition (`opacity`, `scale`, configurable `delay`). |

In `components/Hero.tsx`, `HexNode` is positioned as a **background layer** (absolute placement, responsive opacity) so the primary narrative stays typographic while the geometry signals technical depth.

A separate **`AnimatedSvg`** component (`components/ui/AnimatedSvg.tsx`) drives the navigation mark with imperative `useAnimation` controls, interval-based auto-play, and layered path variants—useful for micro-interactions beyond the hero motif.

---

## Key Features

### 1. Server-side rendering & SEO

The App Router keeps **`app/page.tsx`** as a **Server Component** by default, so the initial HTML carries real structure for crawlers and preview cards. **`app/layout.tsx`** centralizes **`metadata`** (title template, description, keywords, Open Graph, Twitter card) so every route inherits consistent, indexable defaults. Fonts are loaded through **`next/font`** with Latin subsetting, reducing layout shift and improving perceived performance.

### 2. Fluid UI / UX (Motion)

**`Hero`** uses the Motion API (`motion/react`) with **orchestrated variants**: a parent `container` runs `staggerChildren: 0.2` and `delayChildren: 0.5`, while child `item` variants animate opacity and horizontal offset over **0.8s**—a deliberate, premium cadence rather than simultaneous pops.

**`Navebar`** composes **`motion.create(Link)`** for animated route transitions and uses **`AnimatePresence`** with nested **`staggerChildren`** for the mobile overlay, keeping navigation state and motion in sync with **`usePathname`**.

### 3. Performance & responsiveness

The stack aligns with **Core Web Vitals** discipline in practice: server-first rendering, font optimization, and a layout that uses **`min-h-screen`**, **`grow`**, and **`container mx-auto`** for predictable reflow across breakpoints. Hero imagery is vector-based (SVG), which scales crisply without large raster payloads. Production builds use **`next build`** / **`next start`** as defined in `package.json`.

### 4. Semantic HTML & accessibility

- **`html lang="en"`** and a single top-level **`main`** landmark in the root layout support assistive technology navigation.
- **`suppressHydrationWarning`** on `<html>` is scoped to known class-driven dark styling to avoid false hydration warnings while preserving correct client markup.
- The hero uses a **`section`** with an **`h1`** for the primary heading; navigation uses real **`Link`** elements from **`next/link`**.
- The menu toggle exposes a **`title="Main Menu"`** hint on the control surface.

Further WCAG hardening (focus traps in the mobile drawer, visible focus rings, reduced-motion preferences) is a natural extension point as the surface grows.

---

## Quick Start

```bash
git clone <your-repository-url>
cd portfolite
npm install
npm run dev
```

Open **http://localhost:3000**. Edit **`app/page.tsx`** and **`components/Hero.tsx`**; changes hot-reload in development.

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production bundle |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

---

## Architecture Rationale

**Next.js with the App Router** was chosen because a portfolio is both a **marketing surface** and a **long-lived codebase**: colocated routes, nested layouts, streaming-friendly boundaries, and first-class **metadata** APIs map cleanly to evolving pages (projects, blog, contact) without abandoning performance or DX.

That maps directly to **scalability** (route and layout composition), **performance** (defaults that favor static and server output where appropriate), and **modern patterns** (Server Components by default, client islands only where interactivity demands it—e.g. **`"use client"`** on `Hero`, `HexNode`, and `Navebar`).

---

## Technical Reference

| Area | Implementation |
|------|----------------|
| **Root shell** | `app/layout.tsx` — Geist font variables, global dark background `#050505`, `NavigationWrapper`, flex column body, `main` with `container mx-auto px-4`. |
| **Metadata** | Default title **"Abdulrahman Sameh \| Full Stack Developer"**, title template `"%s \| Abdulrahman Sameh"`, OG/Twitter blocks (image URL placeholders commented for deployment). |
| **Home route** | `app/page.tsx` — server component rendering `<Hero />`. |
| **Hero** | `components/Hero.tsx` — Motion staggered children, badge, gradient headline span, CTA row with `Button` + `ArrowUpRightIcon`, `HexNode` as decorative layer. |
| **Hex node** | `components/ui/HexNode.tsx` — SVG hex shell + six rotated inner paths, gradients, `motion.div` entrance. |
| **Styles** | Tailwind CSS v4 + `app/globals.css`; utility-first layout matching the dark engineering aesthetic. |
| **UI primitives** | shadcn-style patterns under `components/ui/` (e.g. `button`, `hover-card`) with `class-variance-authority`, `clsx`, `tailwind-merge`. |

**Dependency highlights** (see `package.json`): `next@16.2.2`, `react@19.2.4`, `motion@^12.38.0`, `lucide-react`, `radix-ui`, Tailwind 4 toolchain.

---

## Project Structure (excerpt)

```
app/
  layout.tsx          # Root layout, fonts, metadata, shell
  page.tsx            # Home (Server Component)
  globals.css         # Global styles
components/
  Hero.tsx            # Hero + Motion stagger
  Navebar.tsx         # Navigation + motion links
  NavigationWrapper.tsx
  ui/
    HexNode.tsx       # Hexagonal SVG system
    AnimatedSvg.tsx   # Nav / brand SVG animation
    ...
```

---

## License

Private project (`"private": true` in `package.json`). Adjust licensing if you open-source the repository.
