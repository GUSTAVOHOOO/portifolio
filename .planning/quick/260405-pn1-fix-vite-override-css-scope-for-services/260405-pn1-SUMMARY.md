---
phase: quick
plan: 260405-pn1
type: quick-fix
subsystem: build-config, services-section
tags: [vite, css-scope, react-island, astro, tailwind]
dependency_graph:
  requires: []
  provides: [working-build, services-grid-layout, process-steps-layout]
  affects: [src/components/ServicesSection.astro, src/components/ServicesAnimations.tsx]
tech_stack:
  added: []
  patterns: [astro-scoped-vs-global-styles, npm-overrides-for-vite-version]
key_files:
  modified:
    - package.json
    - src/components/ServicesSection.astro
decisions:
  - Use npm overrides field to pin Vite to ^7 until Astro supports Vite 8
  - Split style block into scoped + is:global rather than making entire block global
metrics:
  duration: "~8 minutes"
  completed: "2026-04-05"
  tasks_completed: 1
  files_modified: 2
---

# Quick Fix 260405-pn1: Force Vite 7 override + fix ServicesSection CSS scope

**One-liner:** Forced Vite 7.3.1 via npm overrides to restore build, and split ServicesSection styles into scoped + `is:global` blocks so React island classes render with correct grid/flex layout.

## What Was Fixed

### Problem 1 — Vite 8 / Astro incompatibility
Vite 8.0.3 was installed but Astro requires Vite 7.x. This caused build errors and prevented React island hydration from working correctly.

**Fix:** Added `"overrides": { "vite": "^7" }` to `package.json`. Running `npm install` downgraded Vite to 7.3.1. Build now completes cleanly.

### Problem 2 — Scoped CSS not reaching React island elements
`.services-grid`, `.process-steps`, and `.process-step` were defined in a scoped `<style>` block in `ServicesSection.astro`, but these classes are applied by `ServicesAnimations.tsx` (a React island). Astro's CSS scoping adds `[data-astro-cid-...]` attribute selectors, which never match React-rendered DOM — so the grid and flex layouts were completely absent.

**Fix:** Split the `<style>` block into two:
- Kept `section#servicos` and `.section-heading` in the original scoped `<style>` block (targeting Astro-rendered elements — scoping correct here).
- Moved `.services-grid`, `.process-steps`, `.process-step` (and all their media queries) to a new `<style is:global>` block. These classes now appear in the built CSS without Astro hash suffixes, matching what React renders.

## Verification

- `npm run build` completes in ~4.2s with no errors
- Built CSS confirms `.services-grid{...}` appears without `[data-astro-cid-...]` suffix
- Services grid: `grid-template-columns: repeat(2, 1fr)` active at `min-width: 1024px`
- Process steps: `flex-direction: row` active at `min-width: 1024px`

## Deviations from Plan

None — plan executed exactly as written.

## Commits

| Hash | Description |
|------|-------------|
| 87465db | fix(260405-pn1): force Vite 7 via npm overrides and fix ServicesSection CSS scope |

## Self-Check: PASSED

- [x] `package.json` contains `"overrides": { "vite": "^7" }` — FOUND
- [x] `node_modules/vite/package.json` version: 7.3.1 — FOUND
- [x] `src/components/ServicesSection.astro` has `<style is:global>` block with `.services-grid`, `.process-steps`, `.process-step` — FOUND
- [x] `src/components/ServicesSection.astro` retains scoped `<style>` with `section#servicos` and `.section-heading` — FOUND
- [x] Build passes — CONFIRMED (Completed in 4.20s)
- [x] Commit 87465db exists — CONFIRMED
