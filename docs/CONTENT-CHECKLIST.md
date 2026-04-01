# GMStudio Content Asset Checklist

**Purpose:** This checklist guides you through gathering every image asset needed before Phase 3 development begins.
**Who:** GMStudio team (the humans providing real content)
**When:** Complete this before executing Phase 3 plans

> Copy (hero text, services descriptions, about text, testimonials) is NOT required yet — that will be gathered during Phase 3.

---

## Portfolio Project Images

**Destination:** `src/assets/projects/`

For each client project you want to feature in the portfolio grid, provide:

### Required files per project

| File | Dimensions | Format | Notes |
|------|-----------|--------|-------|
| `[project-slug]-thumb.webp` | 800×500px | WebP | Main grid thumbnail — shown in the portfolio cards |
| `[project-slug]-hero.webp` | 1200×675px | WebP | Full-width image (used if project gets a detail page in v2) |

**Naming rules:**
- Use lowercase slugs with hyphens: `padaria-central-thumb.webp`, not `Padaria Central Thumb.webp`
- No spaces, accents, or special characters in filenames
- If a project has no live URL yet, still add the thumbnail — you can add the URL to `src/data/projects.json` in Phase 2

**WebP conversion:**
- If your originals are JPG or PNG, convert to WebP before dropping in
- Free tool: [Squoosh](https://squoosh.app) — drag in, choose WebP, download
- Or use macOS Quick Look: select files → right-click → Convert Image → WebP

**Checklist:**

For each project you plan to feature, check both boxes:

- [ ] `[project-slug]-thumb.webp` — 800×500, under 200KB
- [ ] `[project-slug]-hero.webp` — 1200×675, under 400KB

**Projects to gather (fill in your actual project slugs):**

| Project Name | Slug | Thumb | Hero | Live URL |
|-------------|------|-------|------|----------|
| _Example: Padaria Central_ | `padaria-central` | [ ] | [ ] | https://... |
| | | [ ] | [ ] | |
| | | [ ] | [ ] | |
| | | [ ] | [ ] | |
| | | [ ] | [ ] | |
| | | [ ] | [ ] | |

> Minimum recommended: 4 projects. Optimal for the grid layout: 6 projects (fills a 3-column grid with 2 rows).

---

## Team Photos

**Destination:** `src/assets/team/`

### Required files per team member

| File | Dimensions | Format | Notes |
|------|-----------|--------|-------|
| `[first-name-last-name].webp` | 800×800px | WebP | Square crop, face centered, professional |

**Naming rules:**
- Lowercase, hyphens: `gabriel-martins.webp`
- Square crop only — rectangular photos will be forced into a square and may crop awkwardly
- Recommended: plain or blurred dark background, good lighting on face
- Avoid: busy backgrounds, group photos, casual selfies

**Checklist:**

- [ ] Photo for each team member at 800×800px WebP
- [ ] Filenames match `[firstname-lastname].webp` convention

**Team members to photograph:**

| Name | File | Done |
|------|------|------|
| _Fill in your team_ | `[name].webp` | [ ] |
| | | [ ] |
| | | [ ] |

---

## Dropping Files Into the Project

Once files are ready:

1. Copy WebP files into `src/assets/projects/` (thumbnails + heroes)
2. Copy WebP files into `src/assets/team/` (member photos)
3. Run `git status` to confirm git sees the new files
4. Commit with a message like: `content: add portfolio images and team photos`

The files will be picked up automatically by Phase 3 components — no code changes needed as long as naming conventions are followed.

---

## What Is NOT Needed Yet

These will be collected during Phase 3:

- [ ] Hero section headline and subheadline copy
- [ ] Services descriptions (landing page, loja, cardápio, institucional)
- [ ] About section text (agency story, mission, values)
- [ ] Team member bios and job titles
- [ ] Client testimonials and photos
- [ ] Project descriptions and categories
- [ ] Contact information (email, WhatsApp number, Instagram, LinkedIn)

---

## Questions?

If unsure about any file requirement, check with the Phase 3 planner before proceeding.
File dimension or format issues will cause build errors in Phase 2+ — it is easier to fix before assets are committed.
