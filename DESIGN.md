---
name: Portfolite
description: A precision-built developer portfolio where systems thinking meets interface craft
colors:
  primary: oklch(0.585 0.233 277.117)
  primary-deep: oklch(0.489 0.214 277.117)
  primary-light: oklch(0.721 0.184 277.117)
  background: oklch(0.02 0 0)
  surface: oklch(0.14 0 0)
  surface-elevated: oklch(0.17 0 0)
  foreground: oklch(0.985 0 0)
  body: oklch(0.63 0 0)
  muted: oklch(0.44 0 0)
  label: oklch(0.37 0 0)
  border: oklch(1 0 0 / 10%)
  border-strong: oklch(1 0 0 / 15%)
  destructive: oklch(0.704 0.191 22.216)
  success: oklch(0.792 0.209 163.47)
typography:
  display:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: clamp(1.875rem, 5vw, 3.75rem)
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.04em
  headline:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: clamp(2.25rem, 4vw, 3rem)
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.03em
  title:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: clamp(1rem, 2vw, 1.25rem)
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.02em
  body:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: clamp(0.875rem, 1.5vw, 1rem)
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: Geist Mono, monospace
    fontSize: 0.625rem
    fontWeight: 500
    letterSpacing: 0.3em
    textTransform: uppercase
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.625rem
  xl: 0.875rem
  xxl: 1.5rem
  pill: 9999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  xxl: 3rem
  section: 6rem
components:
  button-primary:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: 12px 32px
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: 12px 32px
    border: 1px solid oklch(0.586 0.233 277.117 / 40%)
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    rounded: "{rounded.xxl}"
    padding: 2rem
    border: 1px solid "{colors.border}"
---

# Design System: Portfolite

## 1. Overview

**Creative North Star: "The Darkroom"**

Precision, focus, and deliberate exposure. Like a photographer in a darkroom developing a print — every chemical decision matters, nothing is accidental. The interface is a clean, dark canvas where light (the indigo accent) appears only where it's needed to guide the eye. The system trusts that engineering minds appreciate restraint: fewer elements, higher signal.

This is the opposite of the standard developer portfolio — no particles, no neon, no "Hello World". The surface communicates skill through quality of execution, not through decoration. **Key Characteristics:**

- **Dark-first, indigo-lit**: a near-black canvas where indigo acts as a precision tool — sparing, intentional, and always meaningful
- **Flat-by-default, tonal layering**: depth comes from shifts in value (zinc-800 → zinc-900 → black), never from box-shadows
- **Monospaced labels as structural metadata**: uppercase tracked mono text labels serve as a consistent system annotation layer
- **Motion enhances hierarchy**: entrances are staggered, transitions are deliberate — never gratuitous, never animated for its own sake

## 2. Colors

The palette is restrained by design: a near-black canvas, a single indigo accent, and a tight neutral ramp. The indigo spans both technical (cold blue) and creative (warm violet) registers, chosen specifically to bridge engineering precision with design intent.

### Primary

- **Focus Indigo** (oklch(0.585 0.233 277.117)): The only accent. Used for interactive elements — buttons, links, focus rings, hover states, progress indicators. Never decorative.
- **Focus Deep** (oklch(0.489 0.214 277.117)): Primary button fill, deeper hover states, status badges.
- **Focus Light** (oklch(0.721 0.184 277.117)): Lighter text accents, badge text, subtle highlights.

### Neutral

- **Darkroom Black** (oklch(0.02 0 0)): The page background (`#050505`). The canvas itself. This is not a pure black — it has a trace of depth.
- **Surface** (oklch(0.14 0 0)): Cards, containers, form fields. One step above the page.
- **Surface Elevated** (oklch(0.17 0 0)): Elevated surfaces, hover states. Nearly indistinguishable from Surface but provides a layer when needed.
- **Foreground** (oklch(0.985 0 0)): Primary text — headings, nav links, high-emphasis content.
- **Body** (oklch(0.63 0 0)): Body text, descriptions, secondary information.
- **Muted** (oklch(0.44 0 0)): Placeholder text, disabled states, low-priority metadata.
- **Label** (oklch(0.37 0 0)): Monospaced label text, section markers.
- **Border** (oklch(1 0 0 / 10%)): Default container borders — white at 10% opacity.
- **Border Strong** (oklch(1 0 0 / 15%)): Input field borders, emphasized dividers.

### Named Rules

**The Rare Color Rule.** The indigo accent appears on no more than ~10% of any given screen. Its scarcity is what makes it meaningful. When a visitor sees indigo, they know it's interactive or important.

**The Neutral Discipline Rule.** Every neutral is a true neutral (chroma 0). No warm or cool tinting. The brand's temperature is carried by the indigo accent, not by the background.

## 3. Typography

**Display Font:** Geist Sans (system-ui, sans-serif fallback)
**Body Font:** Geist Sans (same stack)
**Label/Mono Font:** Geist Mono (monospace fallback)

**Character:** A single-family system. Geist Sans handles everything from hero headlines to body copy, modulated only by weight, size, and tracking. The pairing with Geist Mono signals technical precision. No second display face, no decorative flourishes — the structure of the type itself does the work.

### Hierarchy

- **Display** (700, clamp(1.875rem, 5vw, 3.75rem), 1.1, -0.04em): Hero headings only. `text-wrap: balance`. Never used outside the first viewport.
- **Headline** (700, clamp(2.25rem, 4vw, 3rem), 1.2, -0.03em): Section titles (Featured Systems, Technical Arsenal). One per section.
- **Title** (700, clamp(1rem, 2vw, 1.25rem), 1.3, -0.02em): Card, project, and skill names. Short, scannable.
- **Body** (400, clamp(0.875rem, 1.5vw, 1rem), 1.7): Description text, paragraphs. Max line length 75ch.
- **Label** (500, 0.625rem, 1, 0.3em, uppercase): Monospaced metadata — status labels, section markers, "SYSTEM BUILDING" badges. Function over form.

### Named Rules

**The One Family Rule.** No second display font. If text needs distinction, use weight, size, or mono — never a different typeface.

**The Label Ceiling Rule.** Labels never exceed 0.75rem. They are annotation, not content. If a label is competing with body text, it's too large.

## 4. Elevation

The system is flat-by-default. Depth is communicated through **tonal layering** — surfaces at different luminosity levels stack to create hierarchy. There are no box-shadows on any surface at rest.

**The Flat Rest Rule.** At rest, every surface is flat. Box-shadows do not exist. Depth is read through background color shifts (page → surface → elevated). Only interactive states (hover, focus, active) may introduce a shadow or lift effect, and only via `y`-translation on the element itself.

### Shadow Vocabulary

The system does not use box-shadows. Interactive lift is achieved through `translateY` motion:

- **Card hover lift**: `transform: translateY(-5px)` only. No shadow accompany. The displacement is enough to signal elevation.

## 5. Components

### Buttons

- **Shape:** Gently curved edges (12px radius for default sizes, `rounded-xl`).
- **Primary:** Indigo deep to focus gradient (`bg-linear-30 from-indigo-700 to-indigo-400`). White text. Hover: lighten gradient, no shadow.
- **Outline:** Transparent fill, 1px indigo border at 40% opacity. White text. Hover: subtle background lighten.
- **Secondary/Ghost:** Used in NavMenu close button — outlined circle, zinc-800 border, hover reveals zinc-900 background.
- **States:** Hover transitions use 300ms ease-out. Active state: `scale(0.9)` for tactile feedback.

### Cards / Containers

- **Corner Style:** 1.5rem radius (`rounded-[2.5rem]` / `rounded-3xl`).
- **Background:** Surface (`bg-zinc-900/20` to `bg-zinc-900/30`), often with `backdrop-blur` for a subtle frosted effect.
- **Border:** 1px Border color (white at 10% opacity). Hover: shifts to indigo at 30-50% opacity.
- **Internal Padding:** 2rem (p-8) standard. Reduced to 1.5rem on mobile.
- **Shadow Strategy:** None at rest. Hover reveals a `linear-gradient` from indigo/5 overlay and a -5px y-translation.

### Inputs / Fields

- **Style:** 1px border (`border-zinc-800`), surface background (`bg-zinc-900/50`), 0.5rem radius.
- **Focus:** Indigo ring via `focus-visible:ring-indigo-500`.
- **Error:** Red-500 text error message, no border color change on the input itself.
- **Label:** Geist Sans, text-zinc-300 (13px), stacked above the field.
- **Padding:** Comfortable — approximately 12px vertical, 16px horizontal.

### Navigation

- **Style:** Fixed at top, full width. Transparent at rest on page top. Gains `bg-black/60 backdrop-blur-xl` + bottom border after 20px scroll.
- **Logo:** Geist Sans bold, white. Dot after name is indigo.
- **Mobile:** Hamburger icon (AlignRightIcon) opens full-screen overlay (NavMenu). Overlay uses staggered children with slide-from-left motion. Close button is an outlined circle.
- **Status Badge:** "System Building" pill with ping dot — desktop-only, hidden on mobile.

### Chips / Tags

- **Style:** `text-[10px] font-mono`, uppercase, tracking-wider. Background zinc-900/50, 1px zinc-800 border, zinc-500 text.
- **Used for:** Project tags, skill level indicators, status badges.
- **Shape:** 4px radius (`rounded-md`).

### Custom Cursor

- **Target:** Desktop-only (`hidden md:block`). Indigo dot (16px) with spring physics for smooth tracking.
- **Hover state:** Scales 4x and gains slight opacity when over interactive elements. Accompanied by an outer ring (32px) that fades on hover.
- **Note:** mix-blend-difference is used, meaning the cursor inverts under it. This breaks on dark surfaces — the dot becomes near-invisible on black backgrounds. Consider removing blend mode or adding a fallback.

## 6. Do's and Don'ts

### Do:

- **Do** use indigo sparingly — its rarity is its power
- **Do** layer surfaces by value (darker → lighter) for depth instead of shadows
- **Do** use Geist Mono for labels, code references, and metadata
- **Do** stagger entrance animations with 0.2s delays for deliberate reveals
- **Do** keep body text at `text-zinc-400` or lighter against the dark canvas
- **Do** use semantic HTML — `nav`, `main`, `section`, proper heading hierarchy
- **Do** respect `prefers-reduced-motion` — every animation needs a reduced alternative

### Don't:

- **Don't** use gradient text (`bg-clip-text text-transparent`) — use a single solid color for emphasis via weight or size
- **Don't** put an uppercase tracked eyebrow label above every section — use at most one per page, or none
- **Don't** use box-shadows — tonal layering is the elevation system
- **Don't** use numbered section markers (01 / 02 / 03) unless the content is literally sequential
- **Don't** use z-index values outside the semantic scale (dropdown: 50, sticky: 100, modal-backdrop: 105, modal: 110, toast: 120, tooltip: 130) — never 999, 9999
- **Don't** use side-stripe borders (border-left > 1px) as accent — use full borders or background tint instead
- **Don't** animate layout properties — stick to opacity, transform, and filter
- **Don't** use standard dev portfolio clichés — no particles, no neon, no "Hello World", no stock illustrations
- **Don't** leave commented-out code blocks in production files
- **Don't** use invalid HTML attributes as props on Link/Button components
