---
phase: 05-design-enhancement-advanced-animations
plan: "07"
subsystem: visual-design
status: checkpoint_pending
tags: [aurora, animations, premium-ui, hero, services]
dependency_graph:
  requires: ["05-06"]
  provides: ["aurora-hero-background", "premium-service-cards", "3d-word-reveal"]
  affects: ["src/components/HeroSection.astro", "src/components/HeroContent.tsx", "src/components/ServicesAnimations.tsx"]
tech_stack:
  added: []
  patterns:
    - "CSS keyframe aurora blobs (3 radial gradient circles, blurred, animated)"
    - "React island mounts-gated animation (aurora CSS only starts after client hydration)"
    - "Motion rotateX + scale + blur 3D word-reveal variant"
    - "Inline onMouseEnter/Leave shimmer sweep via DOM style mutation"
key_files:
  created:
    - src/components/AuroraBackground.tsx
  modified:
    - src/components/HeroSection.astro
    - src/components/HeroContent.tsx
    - src/components/ServicesAnimations.tsx
decisions:
  - "Used CSS @keyframes injected via <style> tag in AuroraBackground (not requestAnimationFrame) — satisfies T-05-07-01 threat mitigation"
  - "Removed hero-mesh-shift CSS animation from HeroSection.astro — AuroraBackground replaces it with more premium look"
  - "Shimmer sweep uses JS DOM style mutation (not Motion) to avoid adding motion overhead to non-React card wrapper elements"
  - "Icon container resized from 32px raw SVG to 48px accent-background box with glow — more premium visual hierarchy"
metrics:
  duration_seconds: 139
  completed_date: "2026-04-05"
  tasks_completed: 2
  tasks_total: 3
  files_changed: 4
---

# Phase 05 Plan 07: Premium Hero Aurora & Service Card Upgrade — Summary

**One-liner:** CSS aurora blob background (3 indigo/violet/cyan radial gradients) with Motion 3D rotateX word-reveal in hero, plus shimmer-sweep + glow-border premium card effects in services.

## Status

**CHECKPOINT PENDING** — Tasks 1 and 2 complete. Awaiting human visual verification (Task 3) before plan is marked complete.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Source and integrate premium hero background | `418a5ea` | AuroraBackground.tsx (new), HeroSection.astro, HeroContent.tsx |
| 2 | Enhance service cards with premium visual patterns | `ad5ef00` | ServicesAnimations.tsx |

## What Was Built

### Task 1 — AuroraBackground + Enhanced Hero Text

**AuroraBackground.tsx** — New React component with:
- 3 large radial gradient blobs: indigo (top-left), violet (bottom-right), cyan (center-right)
- CSS keyframe animations: `aurora-drift-1/2/3` with translate + scale oscillation (12–18s cycles)
- Animations gate on `mounted` state — no SSR/hydration mismatch
- `prefers-reduced-motion` respected via CSS `@media` query (`animation: none !important`)
- `aria-hidden="true"`, `pointer-events: none` — fully accessible, no interaction interference
- Threat model compliant: pure CSS, no canvas/WebGL, no external fetches, no localStorage

**HeroSection.astro** changes:
- Added `import AuroraBackground` and `<AuroraBackground client:load />` before content div
- Content div gets `position: relative; z-index: 1` so text sits above aurora blobs
- Replaced `hero-mesh-shift` CSS animation with simple `background: var(--color-bg)` — aurora replaces it

**HeroContent.tsx** changes:
- `wordVariants` enhanced: `rotateX: 40 -> 0`, `scale: 0.8 -> 1`, `blur(8px) -> blur(0px)`, `y: 40 -> 0`
- Spring: `stiffness: 200, damping: 25` (slower, more dramatic than previous 300/28)
- `containerVariants` stagger: `0.15s` (up from `0.12s`) + `delayChildren: 0.2s`
- `perspective: '600px'` added to h1 style for 3D depth
- `transformStyle: 'preserve-3d'` added to each word `<m.span>`

### Task 2 — Premium Service Cards

**ServicesAnimations.tsx** changes:
- Cards upgraded from `className="glass-card"` to `service-card-premium` with inline styles
- **Shimmer sweep**: `<div className="shimmer-sweep">` positioned absolute, `left: -100%` at rest, transitions to `left: 100%` on `onMouseEnter` (light streak effect)
- **Glow border**: `onMouseEnter` sets `borderColor: rgba(99, 102, 241, 0.5)` + `boxShadow` with double-layer indigo/violet glow; `onMouseLeave` resets
- **Lift animation**: `whileHover={{ y: -6 }}` (skipped if `prefersReduced`)
- **Icon container**: 48x48px `borderRadius: 12px` accent-background box with `boxShadow: 0 0 20px rgba(99,102,241,0.2)` glow
- All hover effects skip when `prefersReduced` is true

## Deviations from Plan

### Auto-fixed Issues

None required.

### Plan Adaptations

**1. Worktree base reset required**
- Found during: Pre-execution setup
- Issue: Worktree HEAD was at `9498da5` (older commit), not the required base `9a6c5ad`. The plan's `depends_on: ["05-06"]` required the Plan 06 changes to be present.
- Fix: `git reset --soft 9a6c5ad && git checkout 9a6c5ad -- .` to restore working tree to correct base
- Impact: None — all Plan 06 files were present after reset

**2. ServicesAnimations.tsx containerProps/itemProps pattern differed from main repo**
- Found during: Task 2 execution
- Issue: Worktree's ServicesAnimations.tsx had a slightly different containerProps/itemProps destructuring pattern vs. main repo version (simplified conditional). Both are correct; the worktree version was the base to build on.
- Fix: Applied enhancements to the worktree version as-is, keeping its existing pattern intact

## Known Stubs

None — all aurora blobs render live CSS animations, all card hover effects are functional JS.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. All changes are pure client-side CSS/JS visual effects. T-05-07-01 and T-05-07-02 mitigations applied as required.

## Self-Check

- [x] `src/components/AuroraBackground.tsx` — created
- [x] `src/components/HeroSection.astro` — AuroraBackground imported and rendered as `client:load`
- [x] `src/components/HeroContent.tsx` — `rotateX` in wordVariants, `perspective` on h1, `transformStyle` on spans
- [x] `src/components/ServicesAnimations.tsx` — `shimmer-sweep`, `boxShadow`, `whileHover` present
- [x] Build passes with zero errors (confirmed twice: after Task 1 and Task 2)
- [x] Task 1 committed: `418a5ea`
- [x] Task 2 committed: `ad5ef00`

## Self-Check: PASSED

## Awaiting

Task 3 — Human visual verification:
1. Run `npm run dev` and open http://localhost:4321
2. Hero section: aurora blobs (indigo, violet, cyan) visibly animate in the background
3. Hero text: 3D flip-in word-by-word reveal with blur — no hydration flash
4. Browser console: zero hydration mismatch warnings
5. Services section: glow border + shimmer on card hover
6. Portfolio section: 3-column grid, no empty black areas on left
7. Mobile (360px): hero background visible, text readable, cards stack vertically
