---
phase: "03"
plan: "01"
subsystem: ui-components
tags: [navigation, hero, services, about, animations, whatsapp]
dependency_graph:
  requires: [phase-02]
  provides: [Nav, HeroSection, ServicesSection, AboutSection, global-animations, whatsapp-button]
  affects: [index.astro, BaseLayout.astro]
tech_stack:
  added: []
  patterns: [glass-card, section-animate, stagger-child, IntersectionObserver, React island for mobile nav]
key_files:
  created:
    - src/components/Nav.astro
    - src/components/NavHamburger.tsx
    - src/components/HeroSection.astro
    - src/components/ServicesSection.astro
    - src/components/AboutSection.astro
  modified:
    - src/styles/global.css
    - src/layouts/BaseLayout.astro
decisions:
  - astro-icon not installed — used generic inline SVG star as service icon fallback per plan instruction
  - WhatsApp phone remains placeholder (5511999999999) — marked with TODO comments in both BaseLayout and HeroSection
metrics:
  duration: "~12 minutes"
  completed: "2026-04-03T20:53:20Z"
  tasks: 3
  files: 7
---

# Phase 3 Plan 01: Navigation + Hero + Static Sections Summary

**One-liner:** Fixed nav with React hamburger island, full-viewport hero with dual CTAs, services section from collection with 3-step process, about section with stats/values/team cards, and global CSS fade-up entrance animation infrastructure.

## What Was Built

### Task 1: Global animation CSS + floating WhatsApp button
- Added `.section-animate`, `.stagger-child`, `.glass-card` CSS utility classes to `global.css`
- Added `html { scroll-behavior: smooth; scroll-padding-top: 72px }` for fixed nav offset
- Added `prefers-reduced-motion` override for accessibility
- Added fixed 56x56px WhatsApp button (bottom-right, #25D366 background, z-index 40) to `BaseLayout.astro`
- Added global `IntersectionObserver` script to `BaseLayout.astro` that handles all `.section-animate` and `.stagger-child` elements across pages

### Task 2: Nav.astro + NavHamburger.tsx
- `Nav.astro`: fixed header (64px, 95% opacity bg + blur(8px), border-bottom), logo left, desktop nav right
- Desktop nav links: Serviços, Portfólio, Sobre, Contato — hidden below 1024px, shown above
- `NavHamburger.tsx`: React island with `useState` for open/close, inline hamburger/X SVGs, `aria-expanded` and `aria-label` toggling, mobile drawer via `max-height: 0 → 300px` CSS transition
- Drawer CSS lives in `Nav.astro` as `<style is:global>` targeting `nav.mobile-drawer[data-open="true"]`

### Task 3: HeroSection.astro + ServicesSection.astro + AboutSection.astro
- `HeroSection.astro`: min-height 100vh, radial-gradient bg, h1 (48px mobile/60px desktop), body copy, flex-wrap CTA row (WhatsApp primary + "Ver portfólio" secondary)
- `ServicesSection.astro`: services from `getCollection('services')` in 2-col desktop grid with `.glass-card .stagger-child`; 3-step process with connector lines via CSS `::after`
- `AboutSection.astro`: story text + stats (20+/15+/2+), values 2-col grid, team cards with photo or initials fallback — team block conditionally rendered only if `team.length > 0`
- All section roots have `class="section-animate"` for the global observer

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Notes

**[Fallback] astro-icon not installed** — The plan specified using `<Icon name={service.data.icon} />` from `astro-icon/components` with a fallback if not installed. Since `astro-icon` is not in the project dependencies, the generic inline SVG star was used as specified by the plan's fallback instruction. This is expected; astro-icon can be added later when real icon names are wired to services data.

## Known Stubs

- **WhatsApp phone number** (`src/layouts/BaseLayout.astro` line ~10, `src/components/HeroSection.astro` line ~3): hardcoded placeholder `5511999999999`. Both marked with `// TODO: replace with real number`. Functional but uses a fake phone number until the client provides the real one.
- **Service icons** (`src/components/ServicesSection.astro`): all services use a generic star SVG regardless of `service.data.icon` value. Requires astro-icon installation and icon library to be wired to render real icons.

## Self-Check: PASSED

All 5 component files confirmed present. All 3 task commits confirmed in git log:
- `080bf0c` — feat(03-01): add global animation CSS and floating WhatsApp button
- `5c3f727` — feat(03-01): create Nav.astro and NavHamburger React island
- `1b680e1` — feat(03-01): create HeroSection, ServicesSection, and AboutSection
