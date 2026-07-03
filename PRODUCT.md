# Product

## Register

brand

## Users

- **Tech recruiters & hiring managers** — evaluating engineering skill, code quality, and design sensibility for employment.
- **Potential clients** — assessing technical capability and professionalism for freelance or agency engagements.
- **Fellow developers** — seeking peer-level recognition; the portfolio signals depth of craft.

All three arrive in a technical mindset, scanning for evidence of real ability. The surface must reward scrutiny.

## Product Purpose

A precision portfolio that communicates systems-level thinking through every design decision. Exists to build trust, demonstrate capability, and serve as a professional contact point. Success looks like a visitor spending 30+ seconds exploring and leaving with a clear "this developer knows their craft" impression.

## Brand Personality

Engineered, minimalist, precise.

Voice is direct and technical — no fluff, no hype. The portfolio speaks with the confidence of someone who understands systems architecture. Warmth comes through clarity and intent, not through decorative language or sentiment.

## Anti-references

Must explicitly avoid the standard developer portfolio cliché: over-animated particle effects, "Hello World" tropes, rainbow gradients, neon overload, stock illustrations, icon-grid sprints, and the generic "I love to code" narrative. The opposite of a theme forest template.

## Design Principles

1. **Practice what you preach** — every line of code on this portfolio should exemplify the engineering standards it describes. No sloppy z-indices, no unused imports, no inconsistent patterns.
2. **Show, don't tell** — visual craft demonstrates capability; let the interface quality be the proof.
3. **Expert confidence** — restrained, intentional design. No gratuitous animations, no decoration that doesn't serve hierarchy.
4. **Precision over decoration** — every element earns its place. When in doubt, remove.
5. **Clarity through structure** — information architecture before visual flair. A developer's site should be as well-architected as their code.

## Accessibility & Inclusion

Target WCAG AA as a baseline. Specific requirements:

- **Contrast**: body text at minimum 4.5:1 against background; large text at 3:1
- **Reduced motion**: every animation must degrade gracefully via `prefers-reduced-motion` queries; never gate content visibility on animation completion
- **Screen readers**: semantic HTML (`nav`, `main`, `section`), proper `aria-labels` on icon-only interactive elements, logical heading hierarchy
- **Text scaling**: no viewport-locked text that breaks zoom; use relative units
