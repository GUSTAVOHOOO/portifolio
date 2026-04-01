---
plan: 01-03
status: complete
---

# Summary: Plan 03 — Logo Design & Production

## Approved Concept

**Concept B** — Wordmark with geometric accent mark.

Design: Small 10×10px filled square in `#6366F1` as leading mark before "GM", followed by "GM" in 700 weight and "Studio" in 600 weight. The block creates a secondary visual identifier that echoes the icon variant at any size.

No iteration was required — user approved Concept B on first presentation.

## File Inventory

| File | Path | Purpose |
|------|------|---------|
| Color wordmark | `src/assets/logo/gmstudio-logo.svg` | Primary full wordmark — color version |
| Mono wordmark | `src/assets/logo/gmstudio-logo-mono.svg` | White on transparent, for colored backgrounds |
| Color icon | `src/assets/logo/gmstudio-icon.svg` | GM initials mark — accent color |
| Mono icon | `src/assets/logo/gmstudio-icon-mono.svg` | GM initials mark — white |
| Favicon | `public/favicon.svg` | Served at /favicon.svg with dark mode support |

Draft concept files (`gmstudio-logo-concept-*.svg`, `gmstudio-icon-concept-*.svg`) removed after approval.

## SVG Technique

Technique A: embedded Google Font via `@import url(...)` in `<defs><style>`. Font: Space Grotesk 700/600 from Google Fonts. All files are self-contained and render correctly when opened standalone in a browser.

## Notes for Plan 04 (Style Guide)

- Logo file paths: `src/assets/logo/gmstudio-logo.svg` (primary), `gmstudio-logo-mono.svg` (mono)
- Mono usage rule: use mono wordmark on backgrounds where `#6366F1` creates contrast issues
- Icon usage: use `gmstudio-icon.svg` as app icon / avatar; `gmstudio-icon-mono.svg` on colored surfaces

## Notes for Phase 2 (Astro Setup)

Import SVGs in Astro components:
```astro
import Logo from '../assets/logo/gmstudio-logo.svg?raw';
// or as an img src:
import logoUrl from '../assets/logo/gmstudio-logo.svg';
```
