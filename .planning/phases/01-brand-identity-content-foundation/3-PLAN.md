---
phase: 01-brand-identity-content-foundation
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - src/assets/logo/gmstudio-logo-concept-a.svg
  - src/assets/logo/gmstudio-logo-concept-b.svg
  - src/assets/logo/gmstudio-logo-concept-c.svg
  - src/assets/logo/gmstudio-logo.svg
  - src/assets/logo/gmstudio-logo-mono.svg
  - src/assets/logo/gmstudio-icon.svg
  - src/assets/logo/gmstudio-icon-mono.svg
  - public/favicon.svg
autonomous: false
requirements:
  - BRAND-01

must_haves:
  truths:
    - "Three distinct SVG logo concepts are presented inline for user review"
    - "User selects one concept (or requests iteration) before any final file is written"
    - "Final logo exists in four production variants: color wordmark, mono wordmark, color icon, mono icon"
    - "Favicon SVG is present at public/favicon.svg"
    - "All SVGs open correctly in a browser with no broken font references"
  artifacts:
    - path: "src/assets/logo/gmstudio-logo.svg"
      provides: "Primary full wordmark — color version"
    - path: "src/assets/logo/gmstudio-logo-mono.svg"
      provides: "Monochrome wordmark — white on transparent"
    - path: "src/assets/logo/gmstudio-icon.svg"
      provides: "GM initials mark — color version, used as favicon"
    - path: "src/assets/logo/gmstudio-icon-mono.svg"
      provides: "Monochrome icon variant"
    - path: "public/favicon.svg"
      provides: "SVG favicon for modern browsers"
  key_links:
    - from: "src/assets/logo/gmstudio-logo.svg"
      to: "Phase 2 Astro <Header> component"
      via: "Astro import statement"
      pattern: "import Logo from.*assets/logo"
---

# Plan 03: Logo Design & Production

**Phase:** 01-brand-identity-content-foundation
**Requires:** 1-CONTEXT.md (decisions D-06 through D-09), RESEARCH.md (Pattern 1 — SVG wordmark construction)
**Wave:** 1 (no dependencies — can run in parallel with Plan 02)

## Objective

Design three SVG logo concepts for GMStudio and produce the final approved logo in four production variants. This plan has a mandatory human checkpoint: Claude presents 3 concepts, the user approves one (or requests changes), then Claude finalizes and saves the production files.

Purpose: The logo is the most visible brand artifact. It feeds the style guide (Plan 04), appears in every page of the Astro site, and is the primary signal of GMStudio's design quality to potential clients.

Output: Four production SVG files in `src/assets/logo/` and a favicon at `public/favicon.svg`.

## Context

Read before executing:
- `.planning/phases/01-brand-identity-content-foundation/1-CONTEXT.md` — D-06 through D-09 (logo decisions)
- `.planning/phases/01-brand-identity-content-foundation/RESEARCH.md` — Pattern 1 (SVG wordmark construction techniques)

**Locked constraints (non-negotiable):**
- D-06: Logo created as SVG by Claude — no external design tool
- D-07: Style is wordmark typographic — "GMStudio" in bold lettering, accent color #6366F1 on "GM"
- D-08: Two required production variations: full wordmark + icon/favicon ("GM" initials)
- D-09: 3 concepts → user approval → final saved to `src/assets/logo/`
- Accent color: `#6366F1` (GM letters), text color: `#F8F8F8` (Studio), background: transparent

**Visual references:** Resend.com, Linear.app, Vercel.com — confident, geometric, contemporary wordmarks.

## Tasks

### Task 1: Create directory and draft 3 SVG logo concepts

**Files:**
- `src/assets/logo/gmstudio-logo-concept-a.svg`
- `src/assets/logo/gmstudio-logo-concept-b.svg`
- `src/assets/logo/gmstudio-logo-concept-c.svg`

**Action:**

Create the directory `src/assets/logo/` if it does not exist, then produce three distinct SVG concepts. Each concept must use Technique A from RESEARCH.md (embedded Google Font via `@import`) since these are drafts for quick iteration. The user will select one, then it gets converted to production.

All three concepts share these non-negotiable properties:
- `viewBox="0 0 300 60"` for wordmark, transparent background (no `<rect>` fill)
- "GM" rendered in `#6366F1`, "Studio" rendered in `#F8F8F8`
- Font: Space Grotesk 700 weight via Google Fonts import in `<defs><style>`
- SVG must include `role="img"` and `aria-label="GMStudio"`

**Concept A — Clean split wordmark:**
- "GM" and "Studio" as two adjacent `<text>` elements
- "GM" at font-size 44, weight 700, fill #6366F1, letter-spacing -1
- "Studio" at font-size 44, weight 600, fill #F8F8F8, letter-spacing -0.5
- Positioned so they sit baseline-aligned, slightly tighter spacing than default
- No decorative elements — pure typographic confidence

**Concept B — Wordmark with geometric accent mark:**
- Same "GMStudio" text treatment as Concept A
- Add a small geometric detail: a filled square or rectangle (8x8px, fill #6366F1) positioned as a leading mark before "GM" — like a favicon-sized accent block
- The block sits at the cap-height vertically centered, slightly left of "GM"
- This creates a secondary visual identifier that echoes the icon variant

**Concept C — Condensed weight contrast wordmark:**
- "GM" at font-size 44, weight 700, fill #6366F1, letter-spacing -2 (very tight)
- "Studio" at font-size 28, weight 500, fill #F8F8F8, letter-spacing 3 (wide, all caps or mixed)
- Size contrast makes "GM" dominant and "Studio" subordinate — monogram-forward brand feel
- If using all caps on "Studio", use letter-spacing 4 and reduce opacity slightly to 0.85

Save each concept file. The concept files are drafts only — they will NOT be used in production directly.

Also create a companion icon SVG for each concept to show how the "GM" initials mark would look:
- `gmstudio-icon-concept-a.svg` through `gmstudio-icon-concept-c.svg`
- `viewBox="0 0 60 60"`, square format
- Each shows only "GM" centered in the square, matching the style of the corresponding wordmark concept
- "GM" in #6366F1, transparent background

### Task 2: Present concepts to user for approval (checkpoint)

**This task is a mandatory human checkpoint. Do not proceed to Task 3 until the user responds.**

Present the three concepts inline in the conversation. For each concept, show:
1. The raw SVG code (so the user can copy/paste and preview it)
2. A brief description of the design intent (1-2 sentences)
3. What it would look like as a favicon

After presenting all three, ask:

> "Which concept would you like to use as the GMStudio logo? Reply with A, B, or C. If none feels right, describe what you'd change and I'll iterate before finalizing."

Wait for the user's response before proceeding.

### Task 3: Finalize approved concept as production SVGs

**Files:**
- `src/assets/logo/gmstudio-logo.svg`
- `src/assets/logo/gmstudio-logo-mono.svg`
- `src/assets/logo/gmstudio-icon.svg`
- `src/assets/logo/gmstudio-icon-mono.svg`
- `public/favicon.svg`

**Action (execute only after user approves a concept in Task 2):**

Take the approved concept and produce four production-quality SVG files. Production files upgrade from Technique A to a more robust form:

**Production upgrade strategy:**
- Keep the `<text>` + embedded `@import` approach (browser-safe, since all usage is in-browser via Astro)
- Add explicit `font-display: swap` in the embedded style
- Ensure each file is self-contained and works when opened as a standalone file in a browser
- Strip draft/concept markers from file names and metadata

**gmstudio-logo.svg** (color wordmark):
- Exact replica of the approved concept, cleaned up
- `viewBox="0 0 300 60"`, transparent background
- "GM" in #6366F1, "Studio" in #F8F8F8
- Include `<title>GMStudio</title>` element for accessibility

**gmstudio-logo-mono.svg** (monochrome wordmark):
- Identical structure to color version
- Change "GM" fill to `#F8F8F8` (both parts become white)
- Intended for use on colored or image backgrounds where accent color creates contrast issues

**gmstudio-icon.svg** (color "GM" initials mark):
- `viewBox="0 0 60 60"`, square
- "GM" initials centered, fill #6366F1
- Used as the favicon source and app icon

**gmstudio-icon-mono.svg** (monochrome "GM" initials):
- Identical to icon, fill changed to #F8F8F8

**public/favicon.svg** (browser favicon):
- Copy of `gmstudio-icon.svg`
- Add `<style>@media (prefers-color-scheme: dark) { .gm-text { fill: #6366F1; } }</style>` for system dark mode support
- This file goes in `public/` so Astro serves it at `/favicon.svg`

After writing all five files, delete the draft concept files (`gmstudio-logo-concept-*.svg` and `gmstudio-icon-concept-*.svg`) to keep the directory clean.

## Success Criteria

- `src/assets/logo/` contains exactly four files: `gmstudio-logo.svg`, `gmstudio-logo-mono.svg`, `gmstudio-icon.svg`, `gmstudio-icon-mono.svg`
- `public/favicon.svg` exists
- Each SVG opens correctly in a browser (no broken layout, text renders with Space Grotesk)
- Color variants show #6366F1 for "GM" portion; mono variants show #F8F8F8 throughout
- All SVGs include `role="img"` and an accessible label
- Draft concept files are removed after user approval

## Verification

```bash
# Production files exist
for f in src/assets/logo/gmstudio-logo.svg src/assets/logo/gmstudio-logo-mono.svg src/assets/logo/gmstudio-icon.svg src/assets/logo/gmstudio-icon-mono.svg public/favicon.svg; do
  test -f "$f" && echo "PASS: $f" || echo "FAIL: $f missing"
done

# No draft concept files remain
ls src/assets/logo/gmstudio-logo-concept-*.svg 2>/dev/null && echo "FAIL: draft files still present" || echo "PASS: drafts cleaned up"

# Color token present in wordmark
grep -q "6366F1" src/assets/logo/gmstudio-logo.svg && echo "PASS: accent color in wordmark" || echo "FAIL"

# Mono wordmark uses white only
grep -q "6366F1" src/assets/logo/gmstudio-logo-mono.svg && echo "FAIL: accent color leaked into mono" || echo "PASS: mono is clean"

# Accessibility attributes
grep -q 'role="img"' src/assets/logo/gmstudio-logo.svg && echo "PASS: role=img" || echo "FAIL"
```

Open each SVG directly in a browser and visually confirm rendering.

## Output

After completion, create `.planning/phases/01-brand-identity-content-foundation/01-03-SUMMARY.md` documenting:
- Which concept was approved (A, B, or C) and any iteration notes
- Final file inventory with paths
- SVG technique used (Technique A with embedded font)
- Note for Plan 04 (style guide): logo file paths and mono usage rules
- Note for Phase 2: how to import SVGs in Astro components
