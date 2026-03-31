---
phase: 01-brand-identity-content-foundation
plan: 02
subsystem: design-tokens
tags: [css-tokens, design-system, brand, typography, color]
dependency_graph:
  requires: []
  provides: [src/styles/tokens.css]
  affects: [Phase 2 global CSS import, Phase 1 Plan 04 style guide]
tech_stack:
  added: []
  patterns: [CSS custom properties, :root token file, single-source-of-truth]
key_files:
  created:
    - src/styles/tokens.css
    - src/styles/tokens-preview.html
  modified: []
decisions:
  - "All design values encoded as CSS custom properties — no hardcoded hex values in downstream files"
  - "tokens-preview.html committed as dev aid (not deployed to Astro build output)"
metrics:
  duration: "~10 minutes"
  completed: "2026-03-31"
  tasks: 2
  files: 2
requirements:
  - BRAND-02
  - BRAND-03
---

# Phase 1 Plan 02: CSS Design Token File Summary

**One-liner:** Complete CSS custom property token file encoding all locked brand decisions — palette, typography, spacing, glassmorphism, shadows, and transitions — as a single `:root` source of truth.

## What Was Done

Created `src/styles/tokens.css` with every design token required by the GMStudio site, plus `src/styles/tokens-preview.html` as a standalone browser verification harness.

## Files Created

| File | Purpose |
|------|---------|
| `src/styles/tokens.css` | Complete CSS custom property token set — single source of truth |
| `src/styles/tokens-preview.html` | Browser-openable visual verification harness (dev aid, not deployed) |

## Token Inventory

### Color Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-bg` | `#0A0A0F` | Page background — near-black (D-01) |
| `--color-surface` | `#13131A` | Card/panel surface |
| `--color-surface-raised` | `#1A1A24` | Elevated surface (modal, tooltip) |
| `--color-accent` | `#6366F1` | Primary interactive / CTA / logo GM letters (D-02) |
| `--color-accent-hover` | `#4F46E5` | Accent on hover/focus |
| `--color-accent-surface` | `#1E1B4B` | Low-opacity accent background (badge, tag) |
| `--color-text` | `#F8F8F8` | Primary text — near-white (D-01) |
| `--color-text-muted` | `#9CA3AF` | Secondary text, captions, meta |
| `--color-text-subtle` | `#6B7280` | Placeholder, disabled state |
| `--color-border` | `rgba(248,248,248,0.08)` | Subtle border — glassmorphism (D-05) |
| `--color-border-accent` | `rgba(99,102,241,0.30)` | Accent-tinted border on hover |

### Typography Tokens

| Token | Value |
|-------|-------|
| `--font-heading` | `'Space Grotesk', system-ui, sans-serif` |
| `--font-body` | `'Inter', system-ui, sans-serif` |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` |
| `--text-xs` through `--text-6xl` | 0.75rem – 3.75rem (10-step scale) |
| `--font-weight-regular` through `--font-weight-bold` | 400 / 500 / 600 / 700 |
| `--leading-tight` through `--leading-relaxed` | 1.1 / 1.2 / 1.5 / 1.625 |
| `--tracking-tight` through `--tracking-wide` | -0.025em / 0em / 0.05em |

### Spacing Tokens

`--space-1` (4px) through `--space-24` (96px) — 10 steps.

### Border Radius Tokens

`--radius-sm` (4px) through `--radius-full` (9999px) — 6 steps including pill shape.

### Glassmorphism Tokens (D-05)

| Token | Value |
|-------|-------|
| `--glass-bg` | `rgba(19,19,26,0.60)` |
| `--glass-border` | `rgba(248,248,248,0.08)` |
| `--glass-blur` | `blur(12px)` |

### Shadow Tokens

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.5)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.4)` |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` |
| `--shadow-glow` | `0 0 24px rgba(99,102,241,0.25)` |

### Transition Tokens

| Token | Value |
|-------|-------|
| `--transition-fast` | `150ms ease` |
| `--transition-base` | `200ms ease` |
| `--transition-slow` | `300ms ease` |

## Verification Results

All mandatory tokens confirmed present via Grep:
- `--color-bg`, `--color-surface`, `--color-accent`, `--color-accent-hover`, `--color-accent-surface` — PASS
- `--color-text`, `--color-text-muted`, `--color-border`, `--color-border-accent` — PASS
- `--font-heading` (Space Grotesk) — PASS
- `--font-body` (Inter) — PASS
- `tokens-preview.html` exists — PASS

## Note for Phase 2: Import Path and Tailwind v4 Compatibility

**Import path** (from Astro global CSS, typically at `src/styles/global.css`):
```css
@import "./tokens.css";
```

**Tailwind v4 compatibility:** Tailwind v4 uses a CSS-first config via `@theme` directives. The tokens in this file are plain CSS custom properties and are fully compatible — they can coexist with Tailwind v4's `@theme` block or be referenced by Tailwind's `theme()` function. No conflicts expected. Downstream components reference tokens via `var(--token-name)`.

## Deviations from Plan

None. File content matches RESEARCH.md Pattern 2 and all locked decisions (D-01 through D-15) exactly.

## Commits

| Hash | Message |
|------|---------|
| `8a38d48` | `feat(01-02): create CSS design token file` |

## Self-Check: PASSED

- `src/styles/tokens.css` — found
- `src/styles/tokens-preview.html` — found
- Commit `8a38d48` — found
- All 9 mandatory color tokens confirmed present via Grep
