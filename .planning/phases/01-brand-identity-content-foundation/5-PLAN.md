---
phase: 01-brand-identity-content-foundation
plan: 05
type: execute
wave: 1
depends_on: []
files_modified:
  - src/assets/projects/.gitkeep
  - src/assets/team/.gitkeep
  - docs/CONTENT-CHECKLIST.md
autonomous: false
requirements:
  - BRAND-01

must_haves:
  truths:
    - "Directory structure for portfolio images and team photos exists in the repository"
    - "Placeholder files hold the directories in git without requiring actual image content"
    - "A clear, actionable checklist tells the user exactly what files to provide and in what format"
    - "Naming conventions and dimension specifications are documented so assets can be dropped in without rework"
  artifacts:
    - path: "src/assets/projects/.gitkeep"
      provides: "Placeholder holding src/assets/projects/ in git"
    - path: "src/assets/team/.gitkeep"
      provides: "Placeholder holding src/assets/team/ in git"
    - path: "docs/CONTENT-CHECKLIST.md"
      provides: "Step-by-step asset gathering guide for the GMStudio team"
  key_links:
    - from: "src/assets/projects/"
      to: "Phase 3 portfolio grid component"
      via: "Astro glob import for project thumbnails"
      pattern: "assets/projects"
    - from: "src/assets/team/"
      to: "Phase 3 team section component"
      via: "Astro glob import for team photos"
      pattern: "assets/team"
---

# Plan 05: Content Asset Structure & Gathering Checklist

**Phase:** 01-brand-identity-content-foundation
**Requires:** 1-CONTEXT.md (decisions D-18, D-19, D-20)
**Wave:** 1 (no dependencies — can run in parallel with Plans 02 and 03)

## Objective

Set up the directory structure for portfolio project images and team photos, then produce a clear human-readable checklist (`docs/CONTENT-CHECKLIST.md`) that guides the GMStudio team through gathering and naming every asset that Phase 3 will need.

Purpose: Phase 3 components (portfolio grid, team section) import images from `src/assets/projects/` and `src/assets/team/`. Those directories must exist in git and their contents must follow strict naming and dimension conventions so Astro's image optimization pipeline works without manual intervention. The humans providing the assets (the GMStudio team) need explicit instructions — not assumptions.

Output: Two placeholder-holding directories in git and one comprehensive content checklist in `docs/CONTENT-CHECKLIST.md`.

## Context

Read before executing:
- `.planning/phases/01-brand-identity-content-foundation/1-CONTEXT.md` — D-18 (portfolio images), D-19 (team photos), D-20 (copy deferred to Phase 3)
- `.planning/REQUIREMENTS.md` — PORTF-01, PORTF-02, ABOUT-02 (to understand what data Phase 3 will need)

**Key constraints:**
- D-18: Portfolio project images go to `src/assets/projects/` (thumbnails + screenshots of real client cases)
- D-19: Team photos go to `src/assets/team/` (photos of agency members)
- D-20: Copy (hero text, services copy, about text) and testimonials are NOT in scope for this phase — they belong to Phase 3. Do not create placeholder text files for copy.

## Tasks

### Task 1: Create asset directories with placeholder files

**Files:**
- `src/assets/projects/.gitkeep`
- `src/assets/team/.gitkeep`

**Action:**

Create the two asset directories and add `.gitkeep` files so git tracks them even before real images are added.

```bash
mkdir -p src/assets/projects
mkdir -p src/assets/team
touch src/assets/projects/.gitkeep
touch src/assets/team/.gitkeep
```

Do NOT create any sample or placeholder images. The directories must be empty except for `.gitkeep`. Real images will be added by the GMStudio team following the checklist in Task 2.

### Task 2: Write docs/CONTENT-CHECKLIST.md

**Files:** `docs/CONTENT-CHECKLIST.md`

**Action:**

Write a complete asset-gathering checklist for the GMStudio team. The audience is non-technical (or semi-technical) — it must be clear enough that a team member who has never worked with Astro can drop in files correctly.

Write the file with this structure:

---

```markdown
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
```

---

After writing the file, output the checklist summary to the user (see Task 3).

### Task 3: Present checklist to user (checkpoint)

**This task pauses for human action. Claude cannot gather the actual image files — only the team can.**

Present the following message to the user:

---

> **Content asset structure is ready.**
>
> Two directories have been created in `src/assets/`:
> - `src/assets/projects/` — for portfolio project thumbnails and hero images
> - `src/assets/team/` — for team member photos
>
> The full asset-gathering guide is at `docs/CONTENT-CHECKLIST.md`.
>
> **Before Phase 3 can begin, the GMStudio team needs to:**
> 1. Open `docs/CONTENT-CHECKLIST.md`
> 2. Fill in the project names and team members table
> 3. Gather and convert all images to WebP at the specified dimensions
> 4. Drop the files into the correct directories
> 5. Commit the assets to git
>
> This is the only manual step in Phase 1. You can do this at any time before Phase 3 execution starts.
>
> **Phase 1 is otherwise complete** once Plans 02, 03, and 04 finish — asset gathering can happen in parallel with Phase 2 (Astro setup) since no image files are needed until Phase 3.
>
> Reply with `acknowledged` to mark this plan complete, or ask any questions about the asset requirements.

---

Wait for the user to reply before marking this plan done.

## Success Criteria

- `src/assets/projects/` exists in git (confirmed by `.gitkeep` presence)
- `src/assets/team/` exists in git (confirmed by `.gitkeep` presence)
- `docs/CONTENT-CHECKLIST.md` exists with all sections: Portfolio Project Images, Team Photos, Dropping Files Into the Project, What Is NOT Needed Yet
- Dimension specifications documented: 800×500 thumbnail, 1200×675 hero, 800×800 team photo
- Naming convention documented: lowercase slugs, no spaces, WebP format
- User has been informed of what manual action is required and when

## Verification

```bash
# Directories exist (via .gitkeep)
test -f src/assets/projects/.gitkeep && echo "PASS: projects dir in git" || echo "FAIL"
test -f src/assets/team/.gitkeep && echo "PASS: team dir in git" || echo "FAIL"

# Checklist file exists
test -f docs/CONTENT-CHECKLIST.md && echo "PASS: checklist exists" || echo "FAIL"

# Required sections present
for section in "## Portfolio Project Images" "## Team Photos" "## Dropping Files" "## What Is NOT Needed Yet"; do
  grep -q "$section" docs/CONTENT-CHECKLIST.md && echo "PASS: $section" || echo "FAIL: $section missing"
done

# Dimensions specified
grep -q "800×500" docs/CONTENT-CHECKLIST.md && echo "PASS: thumbnail dimensions" || echo "FAIL"
grep -q "800×800" docs/CONTENT-CHECKLIST.md && echo "PASS: team photo dimensions" || echo "FAIL"
grep -q "WebP" docs/CONTENT-CHECKLIST.md && echo "PASS: format specified" || echo "FAIL"
```

## Output

After completion, create `.planning/phases/01-brand-identity-content-foundation/01-05-SUMMARY.md` documenting:
- Directories created
- Checklist file location
- Note for Phase 2 planner: asset directories exist; image files will be added by team before Phase 3
- Note for Phase 3 planner: Astro glob pattern to pick up project images: `import.meta.glob('../assets/projects/*-thumb.webp')`
