---
phase: "05"
plan: "01"
subsystem: animations
tags: [motion, css-cleanup, animation-teardown, dependency-setup]
dependency_graph:
  requires: []
  provides: [motion-package, clean-animation-slate]
  affects: [BaseLayout, global.css, all-section-components]
tech_stack:
  added: [motion@12.38.0]
  patterns: [whatsapp-float CSS class, hero-bg-animated reduced-motion stub]
key_files:
  created: []
  modified:
    - package.json
    - src/layouts/BaseLayout.astro
    - src/styles/global.css
    - src/components/HeroSection.astro
    - src/components/ServicesSection.astro
    - src/components/PortfolioSection.astro
    - src/components/AboutSection.astro
    - src/components/TestimonialsSection.astro
    - src/components/ContactSection.astro
decisions:
  - motion v12 installed as ^12.38.0 — clean slate for subsequent plans to wire animations
  - whatsapp-float CSS class replaces inline onmouseover/onmouseout JS handlers
  - hero-bg-animated reduced-motion stub added for Plan 05-02 CSS gradient animation
metrics:
  duration: "~10 minutes"
  completed: "2026-04-05"
  tasks_completed: 5
  files_modified: 9
---

# Phase 05 Plan 01: Dependency Setup & CSS Animation Teardown Summary

**One-liner:** Installed motion v12 and completely stripped the IntersectionObserver/CSS animation system — every section is now fully visible with no opacity-0 elements.

## What Was Built

The old animation system consisted of three parts that had to be removed together: a CSS IntersectionObserver `<script>` in BaseLayout.astro that toggled `.visible` classes, CSS rules in global.css that set `opacity: 0` on `.section-animate` and `.stagger-child` elements, and the class attributes themselves on every section component.

All three layers were deleted. The `motion` package (v12.38.0) was installed in preparation for the Motion-based animation system added in Plans 05-02 through 05-05.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Install motion v12 | fcc70c3 |
| 2 | Delete IntersectionObserver script, replace inline JS hover with CSS class | 34b584f |
| 3 | Remove section-animate/stagger-child CSS from global.css | 15cd34c |
| 4 | Remove class usages from all section components | dcbf43f |
| 5 | Build verification + fix ContactSection (missed in plan) | 466bd20 |

## Verification

- `npm run build` completed with zero errors
- `grep -r "section-animate\|stagger-child" src/` returns zero matches
- All sections render fully visible — no opacity-0 or translateY artifacts

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] ContactSection.astro had section-animate class not listed in plan**
- **Found during:** Task 5 (grep verification)
- **Issue:** Plan listed 5 component files but ContactSection.astro also had `class="section-animate"` — if left, the section would render invisible post-teardown
- **Fix:** Removed `section-animate` from ContactSection.astro
- **Files modified:** `src/components/ContactSection.astro`
- **Commit:** 466bd20

## Known Stubs

None — this plan is a teardown plan. No UI stubs introduced.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundary changes.

## Self-Check: PASSED

- package.json contains `"motion": "^12.38.0"` — FOUND
- BaseLayout.astro has no `<script>` IntersectionObserver block — CONFIRMED
- global.css has no `.section-animate` or `.stagger-child` rules — CONFIRMED
- Zero grep matches for section-animate/stagger-child in src/ — CONFIRMED
- Build passes with zero errors — CONFIRMED
- Commits fcc70c3, 34b584f, 15cd34c, dcbf43f, 466bd20 — all present in git log
