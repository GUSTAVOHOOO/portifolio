---
phase: "03-ui-components-site-sections"
plan: "03-02"
subsystem: "site-sections"
tags: ["portfolio", "testimonials", "contact", "web3forms", "react-island", "homepage"]
dependency_graph:
  requires: ["03-01"]
  provides: ["PortfolioSection", "TestimonialsSection", "ContactSection", "ContactForm", "final-homepage"]
  affects: ["src/pages/index.astro"]
tech_stack:
  added: ["Web3Forms API (contact form backend)"]
  patterns: ["React island for form", "CSS marquee animation", "responsive grid layouts"]
key_files:
  created:
    - src/components/PortfolioSection.astro
    - src/components/TestimonialsSection.astro
    - src/components/ContactSection.astro
    - src/components/ContactForm.tsx
    - .env.example
    - public/images/projects/placeholder-600x400.jpg
  modified:
    - src/pages/index.astro
    - src/content/projects/barbearia-style.md
    - src/content/projects/padaria-do-joao.md
decisions:
  - "Thumbnail images moved to public/images/projects/ for browser-accessible URLs (src/assets paths don't work at runtime)"
  - "React inline styles + CSS custom properties for ContactForm (no Tailwind class pollution in React island)"
  - ":global() CSS in ContactSection.astro for contact-input focus ring (scoped styles don't reach React island DOM)"
metrics:
  duration: "~15 min"
  completed: "2026-04-03"
  tasks: 2
  files: 9
---

# Phase 3 Plan 02: Portfolio + Testimonials + Contact + Page Composition Summary

**One-liner:** Portfolio grid + CSS marquee testimonials + Web3Forms React island contact form wired into the final GMStudio homepage.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | PortfolioSection + TestimonialsSection | 89771cf | PortfolioSection.astro, TestimonialsSection.astro, project .md files, public thumbnail |
| 2 | ContactSection + ContactForm + .env.example + index.astro | 7f72abe | ContactSection.astro, ContactForm.tsx, .env.example, index.astro |

## What Was Built

**PortfolioSection.astro** — responsive 3/2/1-column grid loaded from the `projects` content collection. Each card is a full `<a>` tag linking to `liveUrl` (new tab). Empty state renders a Portuguese placeholder message. Cards have `stagger-child` class for animation. External-link SVG icon shown inline next to project title.

**TestimonialsSection.astro** — CSS `@keyframes` marquee (30s loop) loaded from `testimonials` collection. Section hidden entirely when no testimonials exist. Second card set has `aria-hidden="true"`. Hover pauses animation. `prefers-reduced-motion` wraps cards instead. Photo or initial-letter fallback circle.

**ContactForm.tsx** — React island (`client:load`). Web3Forms POST with `idle | loading | success | error` states. Fields: name, email, subject (select), message. Success replaces form with confirmation message. Error shows inline alert. All fields use `.contact-input` class for focus ring styling from parent ContactSection scoped CSS (`:global()`).

**ContactSection.astro** — Two-column desktop / stacked mobile layout. Left: WhatsApp CTA block with 48px SVG icon, h3, paragraph, green CTA button, email link, Instagram + LinkedIn icon links. Right: `<ContactForm client:load />`. Focus ring styles via `:global()`.

**index.astro** — Replaced Phase 2 verification page with final homepage: Nav + HeroSection + ServicesSection + PortfolioSection + AboutSection + TestimonialsSection + ContactSection, all inside `<main>`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing critical asset] Thumbnail paths referenced `src/assets/` which is unreachable at runtime**
- **Found during:** Task 1 (thumbnail path audit, per plan instructions)
- **Issue:** Both project `.md` files had `thumbnail: "/src/assets/projects/placeholder-600x400.jpg"` — this path is inside the Astro source directory and not accessible to the browser
- **Fix:** Copied `placeholder-600x400.jpg` to `public/images/projects/` and updated both `.md` frontmatter values to `/images/projects/placeholder-600x400.jpg`
- **Files modified:** `src/content/projects/barbearia-style.md`, `src/content/projects/padaria-do-joao.md`, added `public/images/projects/placeholder-600x400.jpg`
- **Commit:** 89771cf

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| WhatsApp phone `5511999999999` | ContactSection.astro | Placeholder — real business number not provided yet |
| Instagram URL `https://instagram.com/gmstudio` | ContactSection.astro | Placeholder — real handle pending client input |
| LinkedIn URL `https://linkedin.com/company/gmstudio` | ContactSection.astro | Placeholder — real handle pending client input |
| Email `contato@gmstudio.com.br` | ContactSection.astro | Placeholder — real email pending client confirmation |
| `PUBLIC_WEB3FORMS_KEY=your_access_key_here` | .env.example / .env | Placeholder — requires real Web3Forms key from web3forms.com |

These stubs do not block the plan goal (homepage composited, build passes). Contact submission fails gracefully with error state until a real Web3Forms key is provided.

## Self-Check: PASSED

- src/components/PortfolioSection.astro — FOUND
- src/components/TestimonialsSection.astro — FOUND
- src/components/ContactSection.astro — FOUND
- src/components/ContactForm.tsx — FOUND
- .env.example — FOUND
- Commit 89771cf — FOUND
- Commit 7f72abe — FOUND
