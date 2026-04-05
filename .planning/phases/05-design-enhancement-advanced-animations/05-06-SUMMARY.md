---
phase: 05-design-enhancement-advanced-animations
plan: "06"
subsystem: ui-animations
tags: [bug-fix, css, animation, hydration, portfolio, hero]
dependency_graph:
  requires: []
  provides: [portfolio-grid-layout, hero-animation-fouc-fix, hero-background-visible]
  affects: [src/components/PortfolioSection.astro, src/components/HeroSection.astro, src/components/HeroContent.tsx]
tech_stack:
  added: []
  patterns: [astro-is-global, motion-mounted-guard, ssr-safe-animation]
key_files:
  created: []
  modified:
    - src/components/PortfolioSection.astro
    - src/components/HeroSection.astro
    - src/components/HeroContent.tsx
decisions:
  - "Use is:global on PortfolioSection style block so .portfolio-grid CSS reaches React island DOM — Astro scoped styles add data-astro-cid-* that don't propagate into hydrated island elements"
  - "Hero animation pattern: initial always 'hidden' (SSR and client agree), animate gated on mounted state — eliminates visible->hidden->animated FOUC cycle"
  - "Hero gradient opacities raised from 0.30/0.20/0.15 to 0.70/0.55/0.45 with cyan accent added — previous values were invisible against near-black background"
metrics:
  duration: "~4 minutes"
  completed_date: "2026-04-05"
  tasks_completed: 2
  files_changed: 3
---

# Phase 05 Plan 06: UAT Gap Closure — Portfolio Grid, Hero FOUC, Hero Background Summary

Three structural bugs from Phase 05 UAT fixed: portfolio grid CSS scoping (blocker), hero hydration mismatch (major), and hero background invisible opacity (major).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix portfolio grid CSS scoping + hero background opacity | fd14343 | PortfolioSection.astro, HeroSection.astro |
| 2 | Fix hero hydration FOUC in HeroContent.tsx | d753c26 | HeroContent.tsx |

## What Was Built

**Fix 1 — Portfolio grid CSS scoping (Gap 5, blocker):**
`PortfolioSection.astro` had `.portfolio-grid` defined in a standard `<style>` block. Astro's scoped CSS adds `data-astro-cid-*` attributes that only match elements rendered by the Astro component — not elements rendered inside a React island. Since `PortfolioIsland.tsx` renders the `.portfolio-grid` div client-side, the scoped CSS never matched. Fixed by changing `<style>` to `<style is:global>`.

**Fix 2 — Hero background opacity (Gap 1, major):**
The `.hero-bg-animated` radial gradients used opacities of 0.30, 0.20, and 0.15. Against the site's near-black background (`rgb(10,10,15)`), these values are effectively invisible. Raised to 0.70 (indigo), 0.55 (violet), and replaced the third indigo gradient with a cyan accent (`rgba(6,182,212,0.45)`) for visual richness and color variety.

**Fix 3 — Hero hydration FOUC (Gap 2, major):**
The previous pattern in `HeroContent.tsx` caused a flash of unstyled content:
1. SSR renders with `initial={false}` — elements visible
2. Client hydrates, `useEffect` sets `mounted=true`
3. `initial` switches to `'hidden'` — elements become invisible
4. Motion animates from hidden to show — elements reappear

Fixed by always using `initial='hidden'` (SSR and client agree — no mismatch), and gating `animate` on `mounted` state so animation only triggers after hydration. Reduced motion users get `initial={false}` immediately (no animation). All `suppressHydrationWarning` props removed — no longer needed.

## Deviations from Plan

None — plan executed exactly as written. The worktree's `HeroContent.tsx` was already partially improved (no `suppressHydrationWarning`, `prefersReduced ? undefined :` guards) compared to the version shown in the plan context, but the core FOUC bug pattern was still present and was fixed as specified.

## Known Stubs

None — all three fixes are complete and functional.

## Threat Flags

None — CSS and animation fixes only, no new trust boundaries or network endpoints.

## Self-Check: PASSED

- [x] `src/components/PortfolioSection.astro` — modified, `is:global` confirmed
- [x] `src/components/HeroSection.astro` — modified, opacity 0.70 confirmed
- [x] `src/components/HeroContent.tsx` — modified, `getInitial`/`getAnimate` pattern confirmed
- [x] Commit `fd14343` — exists (Task 1)
- [x] Commit `d753c26` — exists (Task 2)
- [x] Build passes with zero errors
