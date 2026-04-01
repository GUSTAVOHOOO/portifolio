---
plan: 01-05
status: complete
---

# Summary: Plan 05 — Content Asset Structure & Gathering Checklist

## Directories Created

| Path | Purpose |
|------|---------|
| `src/assets/projects/` | Portfolio project thumbnails and hero images |
| `src/assets/team/` | Team member photos |

Both tracked in git via `.gitkeep` placeholder files. No image content — real assets to be added by GMStudio team before Phase 3.

## Checklist File

`docs/CONTENT-CHECKLIST.md` — complete asset-gathering guide covering:
- Portfolio project images: 800×500 thumbnails + 1200×675 heroes, WebP, lowercase slugs
- Team photos: 800×800 square crop, WebP, firstname-lastname naming
- Drop-in instructions for non-technical team members
- What is NOT needed yet (copy deferred to Phase 3)

## Note for Phase 2 Planner

Asset directories exist; image files will be added by the GMStudio team before Phase 3 execution begins. No Phase 2 code changes required for this.

## Note for Phase 3 Planner

Astro glob pattern to pick up project thumbnails:
```js
const projectImages = import.meta.glob('../assets/projects/*-thumb.webp', { eager: true });
const teamPhotos = import.meta.glob('../assets/team/*.webp', { eager: true });
```
