---
phase: "05"
plan: "03"
subsystem: animations
tags: [motion, scroll-reveal, counter, whileInView, micro-interactions]
dependency_graph:
  requires: [05-01]
  provides: [services-animations-island, stats-counter-island, whatsapp-pulse]
  affects: [ServicesSection, AboutSection, BaseLayout]
tech_stack:
  added: []
  patterns:
    - Motion LazyMotion + domAnimation feature set for minimal bundle
    - useReducedMotion hook to disable all animations for accessibility
    - whileInView + viewport.once for scroll-triggered stagger entrances
    - useMotionValue + useTransform + useInView for counting animation
    - CSS @keyframes pulse with animation-play-state paused on hover
key_files:
  created:
    - src/components/ServicesAnimations.tsx
    - src/components/StatsCounter.tsx
  modified:
    - src/components/ServicesSection.astro
    - src/components/AboutSection.astro
    - src/layouts/BaseLayout.astro
decisions:
  - ServicesAnimations uses variants container/item pattern with staggerChildren 0.08s and spring stiffness 300 damping 30
  - StatsCounter uses useMotionValue animate() rather than a third-party counter library — keeps bundle minimal
  - client:visible used for both islands (below fold) — hydration deferred until element enters viewport
  - WhatsApp pulse implemented as pure CSS @keyframes — no JS cost
metrics:
  duration: "~15 minutes"
  completed: "2026-04-05"
  tasks_completed: 5
  files_modified: 5
---

# Phase 05 Plan 03: Section Scroll Reveals, Stats Counter & Micro-interactions Summary

**One-liner:** Wired Motion whileInView staggered entrances to ServicesSection, animated number counters to AboutSection stats, and a CSS pulse glow ring to the WhatsApp floating button.

## What Was Built

Three animation layers were added using Motion v12 React islands and pure CSS:

**ServicesAnimations island** (`src/components/ServicesAnimations.tsx`) — wraps the services grid and process steps. Uses Motion `LazyMotion` + `domAnimation` feature set, `variants` container/item pattern with `staggerChildren: 0.08`, and `whileInView` with `viewport={{ once: true }}`. Each card fades up (y: 20 → 0) with a spring transition. `ServicesSection.astro` now passes serialized service data as props and mounts the island with `client:visible`.

**StatsCounter island** (`src/components/StatsCounter.tsx`) — three independent `Counter` components, each using `useMotionValue`, `useTransform`, and `useInView`. When the ref enters the viewport (`once: true`), `animate()` drives the motion value from 0 to the target in 1.5s `easeOut`. `AboutSection.astro` now passes typed `{ numericValue, suffix, label }` objects and mounts the island with `client:visible`.

**WhatsApp pulse** (`src/layouts/BaseLayout.astro`) — `@keyframes whatsapp-pulse` expands a green glow ring (`box-shadow`) from 0 to 12px every 2.5s. Animation pauses on hover. `prefers-reduced-motion: reduce` disables the animation entirely.

All Motion animations respect `useReducedMotion()` — when the hook returns true, variant props are omitted and components render statically. Counter jumps directly to final value.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Create ServicesAnimations.tsx React island | c7647a3 |
| 2 | Update ServicesSection.astro to use island | c7647a3 |
| 3 | Create StatsCounter.tsx React island | 5ffcc9a |
| 4 | Update AboutSection.astro to use island | 5ffcc9a |
| 5 | Add whatsapp-pulse keyframe to BaseLayout.astro | 85595d6 |

## Verification

- `npm run build` completed with zero errors
- ServicesAnimations.tsx and StatsCounter.tsx compile without TypeScript errors
- `grep -r "section-animate\|stagger-child" src/` returns zero matches (confirmed worktree parity with 05-01 baseline)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Worktree working tree was at pre-05-01 state**
- **Found during:** Task 5 (BaseLayout.astro inspection)
- **Issue:** After `git reset --soft` to 683acc1, the working tree files reflected the 9498da5 commit (pre-05-01). BaseLayout.astro still had the IntersectionObserver `<script>` and inline `onmouseover` JS — no `whatsapp-float` class. The plan's Task 5 assumed a 05-01 baseline.
- **Fix:** Extracted 05-01 versions of all affected files from git (`683acc1`) and copied them into the worktree before applying Task 5 changes. This includes global.css, HeroSection, PortfolioSection, TestimonialsSection, ContactSection, and BaseLayout.
- **Files modified:** All files brought to 05-01 state; then Task 5 applied on top
- **Impact:** Net result is correct — worktree now contains clean 05-01 baseline + all 05-03 additions

## Known Stubs

None — all animation data is wired to real content collections (services) and hardcoded stat values (20+, 15+, 2+) matching the existing AboutSection data.

## Threat Flags

None — no new network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

- `src/components/ServicesAnimations.tsx` — FOUND
- `src/components/StatsCounter.tsx` — FOUND
- `src/components/ServicesSection.astro` — uses ServicesAnimations client:visible — CONFIRMED
- `src/components/AboutSection.astro` — uses StatsCounter client:visible — CONFIRMED
- `src/layouts/BaseLayout.astro` — contains whatsapp-pulse @keyframes — CONFIRMED
- Commits c7647a3, 5ffcc9a, 85595d6 — present in git log
- Build passes with zero errors — CONFIRMED
