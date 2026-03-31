---
phase: 01-brand-identity-content-foundation
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/tokens.css
autonomous: true
requirements:
  - BRAND-02
  - BRAND-03

must_haves:
  truths:
    - "A single CSS file contains every design token as a named custom property"
    - "Color tokens match the locked palette exactly: #0A0A0F bg, #6366F1 accent, #F8F8F8 text"
    - "Typography tokens declare Space Grotesk for headings and Inter for body text"
    - "Spacing, radius, shadow, and glassmorphism tokens are present and named consistently"
    - "Opening the file in a browser (via a minimal HTML test harness) renders the expected token values in DevTools"
  artifacts:
    - path: "src/styles/tokens.css"
      provides: "Complete CSS custom property token set — single source of truth for all downstream phases"
      contains: ":root"
  key_links:
    - from: "src/styles/tokens.css"
      to: "Phase 2 Astro global layout"
      via: "@import in global CSS"
      pattern: "--color-bg|--color-accent|--font-heading"
---

# Plan 02: CSS Design Token File

**Phase:** 01-brand-identity-content-foundation
**Requires:** 1-CONTEXT.md (decisions D-01 through D-15), RESEARCH.md (Pattern 2 — token file structure)
**Wave:** 1 (no dependencies — can run immediately)

## Objective

Create `src/styles/tokens.css` — the single source of truth for every design value used across the GMStudio site. This file is a prerequisite for Phase 2 (Astro setup imports it globally) and for the style guide (Phase 1, Plan 04). No UI code is written yet; this plan only produces the token file.

Purpose: Encode all locked decisions (D-01 through D-15) as CSS custom properties so that no downstream file ever hardcodes a hex value or pixel size. The entire visual identity is controlled from this one file.

Output: `src/styles/tokens.css` — a fully annotated CSS file with color, typography, spacing, radius, shadow, glassmorphism, and transition tokens.

## Context

Read before executing:
- `.planning/phases/01-brand-identity-content-foundation/1-CONTEXT.md` — locked decisions (especially D-01, D-02, D-13, D-14, D-15)
- `.planning/phases/01-brand-identity-content-foundation/RESEARCH.md` — Pattern 2 (CSS token file structure) contains the full token set with exact values; use it as the reference implementation

## Tasks

### Task 1: Create directory structure and write tokens.css

**Files:** `src/styles/tokens.css`

**Action:**

Create the directory `src/styles/` if it does not exist, then create `src/styles/tokens.css` with the complete token set below. Every section must be present and annotated with comments. Do not omit any token group — downstream phases depend on every token being present.

Write the file with this exact content (values come from locked decisions and RESEARCH.md Pattern 2):

```css
/* src/styles/tokens.css
   GMStudio Design Tokens — Single Source of Truth
   All downstream files MUST use these variables. Never hardcode hex values.
   Phase 2 imports this file globally via: @import "../../styles/tokens.css"
*/

:root {
  /* ─── Color: Backgrounds ─────────────────────────────────── */
  --color-bg:              #0A0A0F;   /* Page background — near-black (D-01) */
  --color-surface:         #13131A;   /* Card/panel surface */
  --color-surface-raised:  #1A1A24;   /* Elevated surface (modal, tooltip) */

  /* ─── Color: Accent — Indigo (D-02) ─────────────────────── */
  --color-accent:          #6366F1;   /* Primary interactive / CTA / logo GM letters */
  --color-accent-hover:    #4F46E5;   /* Accent on hover/focus */
  --color-accent-surface:  #1E1B4B;   /* Low-opacity accent background (badge, tag) */

  /* ─── Color: Text ────────────────────────────────────────── */
  --color-text:            #F8F8F8;   /* Primary text — near-white (D-01) */
  --color-text-muted:      #9CA3AF;   /* Secondary text, captions, meta */
  --color-text-subtle:     #6B7280;   /* Placeholder, disabled state */

  /* ─── Color: Borders ─────────────────────────────────────── */
  --color-border:          rgba(248, 248, 248, 0.08);  /* Subtle border — glassmorphism (D-05) */
  --color-border-accent:   rgba(99, 102, 241, 0.30);   /* Accent-tinted border on hover */

  /* ─── Typography: Families ───────────────────────────────── */
  --font-heading:  'Space Grotesk', system-ui, sans-serif;   /* Geometric sans, D-10 */
  --font-body:     'Inter', system-ui, sans-serif;            /* Neutral sans, D-11 */
  --font-mono:     'JetBrains Mono', 'Fira Code', monospace;  /* Code snippets (optional) */

  /* ─── Typography: Scale (modular, ratio 1.25 from 16px base) ─ */
  --text-xs:    0.75rem;    /*  12px — captions, labels */
  --text-sm:    0.875rem;   /*  14px — small UI text */
  --text-base:  1rem;       /*  16px — body paragraph */
  --text-lg:    1.125rem;   /*  18px — lead paragraph */
  --text-xl:    1.25rem;    /*  20px — card title, small heading */
  --text-2xl:   1.5rem;     /*  24px — section subheading */
  --text-3xl:   1.875rem;   /*  30px — section heading */
  --text-4xl:   2.25rem;    /*  36px — page heading */
  --text-5xl:   3rem;       /*  48px — hero headline */
  --text-6xl:   3.75rem;    /*  60px — display / hero on desktop */

  /* ─── Typography: Weights ────────────────────────────────── */
  --font-weight-regular:    400;
  --font-weight-medium:     500;
  --font-weight-semibold:   600;
  --font-weight-bold:       700;

  /* ─── Typography: Line Heights ───────────────────────────── */
  --leading-tight:    1.1;    /* Display headings */
  --leading-snug:     1.2;    /* Section headings */
  --leading-normal:   1.5;    /* Body text */
  --leading-relaxed:  1.625;  /* Long-form readable prose */

  /* ─── Typography: Letter Spacing ─────────────────────────── */
  --tracking-tight:   -0.025em;  /* Large headings */
  --tracking-normal:   0em;
  --tracking-wide:     0.05em;   /* Uppercase labels, badges */

  /* ─── Spacing ────────────────────────────────────────────── */
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */

  /* ─── Border Radius ──────────────────────────────────────── */
  --radius-sm:   0.25rem;   /*  4px */
  --radius-md:   0.5rem;    /*  8px */
  --radius-lg:   0.75rem;   /* 12px */
  --radius-xl:   1rem;      /* 16px */
  --radius-2xl:  1.5rem;    /* 24px */
  --radius-full: 9999px;    /* Pill / badge */

  /* ─── Effects: Glassmorphism (D-05) ──────────────────────── */
  --glass-bg:      rgba(19, 19, 26, 0.60);       /* Semi-transparent surface */
  --glass-border:  rgba(248, 248, 248, 0.08);    /* Hairline border */
  --glass-blur:    blur(12px);                    /* Value for backdrop-filter */

  /* ─── Shadows ────────────────────────────────────────────── */
  --shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.5);
  --shadow-md:   0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg:   0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 24px rgba(99, 102, 241, 0.25);  /* Accent glow for CTAs */

  /* ─── Transitions ────────────────────────────────────────── */
  --transition-fast:    150ms ease;
  --transition-base:    200ms ease;
  --transition-slow:    300ms ease;
}
```

### Task 2: Write verification HTML test harness

**Files:** `src/styles/tokens-preview.html`

**Action:**

Create a minimal HTML file that imports `tokens.css` and visually renders every token so a human can verify the palette in any browser without an Astro project running. This file is a development aid — it will NOT be committed to the Astro site.

Structure:
- A dark page (`background-color: var(--color-bg)`)
- A row of color swatches: one `<div>` per color token, labeled with the variable name and hex value
- Three heading specimens using `var(--font-heading)` at `--text-5xl`, `--text-3xl`, `--text-xl`
- Two body text specimens using `var(--font-body)` at `--text-base` and `--text-sm`
- One glassmorphism card using `background: var(--glass-bg)`, `border: 1px solid var(--glass-border)`, `backdrop-filter: var(--glass-blur)`

Include a `<link rel="stylesheet">` reference to `tokens.css` (relative path: `./tokens.css`).

Add a `<link>` to Google Fonts at the top so Space Grotesk and Inter render correctly:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

## Success Criteria

- `src/styles/tokens.css` exists and contains a `:root` block
- All 9 mandatory token names from D-14/D-15 are present: `--color-bg`, `--color-surface`, `--color-accent`, `--color-accent-hover`, `--color-accent-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-border-accent`
- Typography tokens `--font-heading` and `--font-body` declare Space Grotesk and Inter respectively (per D-10, D-11)
- No hardcoded hex values appear outside of `:root` in this file — all usage in downstream files must reference these variables
- `src/styles/tokens-preview.html` exists and can be opened in a browser to visually verify the palette

## Verification

```bash
# Token file exists
test -f src/styles/tokens.css && echo "PASS: tokens.css exists" || echo "FAIL: tokens.css missing"

# Mandatory color tokens present
for token in --color-bg --color-surface --color-accent --color-accent-hover --color-accent-surface --color-text --color-text-muted --color-border --color-border-accent; do
  grep -q "$token" src/styles/tokens.css && echo "PASS: $token" || echo "FAIL: $token missing"
done

# Typography tokens present
grep -q "\-\-font-heading" src/styles/tokens.css && echo "PASS: --font-heading" || echo "FAIL: --font-heading missing"
grep -q "\-\-font-body" src/styles/tokens.css && echo "PASS: --font-body" || echo "FAIL: --font-body missing"
grep -q "Space Grotesk" src/styles/tokens.css && echo "PASS: Space Grotesk declared" || echo "FAIL"
grep -q "Inter" src/styles/tokens.css && echo "PASS: Inter declared" || echo "FAIL"

# Preview harness exists
test -f src/styles/tokens-preview.html && echo "PASS: preview harness exists" || echo "FAIL"
```

Open `src/styles/tokens-preview.html` in a browser and confirm:
- Background renders as near-black
- Accent swatch renders as indigo #6366F1
- Text renders in Space Grotesk (headings) and Inter (body)
- Glassmorphism card shows semi-transparent surface with hairline border

## Output

After completion, create `.planning/phases/01-brand-identity-content-foundation/01-02-SUMMARY.md` documenting:
- Files created
- All token names and their values
- Any deviations from RESEARCH.md Pattern 2 (there should be none)
- Note for Phase 2: import path and Tailwind v4 compatibility note
