---
phase: "05"
plan: "02"
subsystem: animations
tags: [motion, hero, css-animation, react-island, word-reveal, spring-animation]
dependency_graph:
  requires: [motion-package, clean-animation-slate]
  provides: [hero-animated-background, hero-motion-island, hero-word-reveal]
  affects: [HeroSection, HeroContent]
tech_stack:
  added: []
  patterns: [LazyMotion domAnimation, motion/react-m, spring-variants, containerVariants stagger, CSS keyframe gradient animation, noscript fallback]
key_files:
  created:
    - src/components/HeroContent.tsx
  modified:
    - src/components/HeroSection.astro
decisions:
  - HeroContent React island uses LazyMotion + domAnimation feature set to minimize bundle size
  - whileTap on primary CTA provides tactile feedback (scale 0.95)
  - noscript fallback ensures headline and CTAs are visible without JS
  - WhatsApp phone number updated from placeholder 5511999999999 to real number 5543996142514
  - hero-bg-animated CSS class with 12s hero-mesh-shift keyframe replaces static radial-gradient
metrics:
  duration: "~8 minutes"
  completed: "2026-04-05"
  tasks_completed: 4
  files_modified: 2
---

# Phase 05 Plan 02: Hero Visual Upgrade Summary

**One-liner:** Replaced static hero background with 3-layer animated mesh gradient and wired Motion v12 React island for staggered word-reveal headline and spring-entrance CTA buttons.

## What Was Built

The hero section previously rendered a static radial-gradient background with a plain `<h1>` and two static anchor elements. This plan replaced all three with:

1. **CSS animated mesh gradient** — Three overlapping radial-gradients (indigo/violet) animate via `hero-mesh-shift` `@keyframes` over a 12-second cycle shifting `background-position` from `0% 50%` to `100% 50%` and back.

2. **HeroContent React island** — A new `src/components/HeroContent.tsx` file uses `LazyMotion` + `domAnimation` (minimal bundle) from `motion/react`. The headline splits into four words (`Presença`, `digital`, `que`, `converte`), each animated with `spring` physics (stiffness 300, damping 28) staggered at 0.12s intervals with a `blur(4px) → blur(0px)` + `y: 28 → 0` entrance. CTA buttons follow with a `scale: 0.85 → 1` spring entrance after a 0.72s delay. `useReducedMotion()` disables all animations when the user prefers reduced motion.

3. **noscript fallback** — Static `<h1>` and `<p>` inside `<noscript>` ensure the hero is readable without JavaScript.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Add CSS animated mesh gradient to HeroSection.astro | 3cf167a |
| 2 | Create HeroContent.tsx React island with Motion animations | 3cf167a |
| 3 | Update HeroSection.astro to use HeroContent island + noscript fallback | 3cf167a |
| 4 | Build verification — zero errors confirmed | (no code change) |

## Verification

- `npm run build` completed with zero errors
- HeroContent.tsx imports from `motion/react` and `motion/react-m` — no Three.js, @react-three/fiber, or cannon imports
- `<noscript>` fallback present in HeroSection.astro
- `whileTap` prop on primary CTA for scale-down press feedback

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] Updated placeholder WhatsApp phone number**
- **Found during:** Task 2 (creating HeroContent.tsx)
- **Issue:** Plan specified phone `5543996142514` in the component code; the old HeroSection.astro had a placeholder `5511999999999` with a `// TODO: replace with real number` comment
- **Fix:** HeroContent.tsx uses the real number `5543996142514` as specified in the plan
- **Files modified:** `src/components/HeroContent.tsx`
- **Commit:** 3cf167a

**2. [Rule 1 - Structural] Tasks 1 and 3 committed together**
- **Found during:** Task 3
- **Issue:** Both Task 1 and Task 3 modify HeroSection.astro — splitting them into separate commits would require an intermediate broken state (section with animated background but old static content)
- **Fix:** Combined into one atomic commit `3cf167a` that includes both the background change and the React island wiring
- **Files modified:** `src/components/HeroSection.astro`

## Known Stubs

None — all hero content is wired. WhatsApp URL uses the real phone number. Headline text is the final copy from the design brief.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundary changes. The WhatsApp URL is a client-side external link with `rel="noopener noreferrer"`.

## Self-Check: PASSED

- `src/components/HeroContent.tsx` exists — FOUND
- `src/components/HeroSection.astro` contains `hero-bg-animated` class — CONFIRMED
- `src/components/HeroSection.astro` contains `<HeroContent client:load />` — CONFIRMED
- `src/components/HeroSection.astro` contains `<noscript>` fallback — CONFIRMED
- `src/components/HeroSection.astro` contains `hero-mesh-shift` keyframe — CONFIRMED
- No Three.js imports in HeroContent.tsx — CONFIRMED
- `npm run build` zero errors — CONFIRMED
- Commit 3cf167a present in git log — CONFIRMED
