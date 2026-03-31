---
phase: 01-brand-identity-content-foundation
plan: 04
type: execute
wave: 2
depends_on:
  - "01-02"
  - "01-03"
files_modified:
  - docs/STYLE-GUIDE.md
autonomous: true
requirements:
  - BRAND-04

must_haves:
  truths:
    - "A single Markdown file documents the complete GMStudio visual identity"
    - "Every color token is shown with its hex value and CSS variable name"
    - "Typography pairing is documented with use-case mapping (heading vs body, weights, sizes)"
    - "Logo usage rules include both correct and incorrect usage examples"
    - "A reader can implement any UI component using only this document and tokens.css as references"
  artifacts:
    - path: "docs/STYLE-GUIDE.md"
      provides: "Authoritative brand reference for Phase 2 and 3 implementors"
      contains: "## Colors"
  key_links:
    - from: "docs/STYLE-GUIDE.md"
      to: "Phase 2 src/pages/style-guide.astro"
      via: "Source of truth — Phase 2 renders this document visually in the browser"
      pattern: "STYLE-GUIDE.md"
---

# Plan 04: Brand Style Guide (docs/STYLE-GUIDE.md)

**Phase:** 01-brand-identity-content-foundation
**Requires:** Plan 02 (tokens.css must exist), Plan 03 (logo files must be approved and saved)
**Wave:** 2 (runs after Plans 02 and 03 complete)

## Objective

Write `docs/STYLE-GUIDE.md` — the complete, authoritative brand reference for GMStudio. This document is the human-readable companion to `tokens.css` and the source of truth that Phase 2 will render as a live `/style-guide` Astro page.

Purpose: Any developer (or Claude executor) working on Phase 2 or Phase 3 must be able to implement pixel-perfect, on-brand UI components using only this document and `tokens.css` as references — without asking questions about color, typography, or logo usage.

Output: `docs/STYLE-GUIDE.md` — a complete brand reference covering logo, colors, typography, component patterns, and do/don't usage rules.

## Context

Read before executing:
- `src/styles/tokens.css` — extract every token name and value to document here
- `src/assets/logo/` — list all logo variants with their intended use cases
- `.planning/phases/01-brand-identity-content-foundation/1-CONTEXT.md` — decisions D-01 through D-17
- `.planning/phases/01-brand-identity-content-foundation/01-02-SUMMARY.md` — token inventory from Plan 02
- `.planning/phases/01-brand-identity-content-foundation/01-03-SUMMARY.md` — logo decisions from Plan 03

## Tasks

### Task 1: Create docs/ directory and write STYLE-GUIDE.md

**Files:** `docs/STYLE-GUIDE.md`

**Action:**

Create the `docs/` directory if it does not exist, then write `docs/STYLE-GUIDE.md` with the complete content below. Every section is required. Do not abbreviate or summarize — this is a reference document.

---

**Required document structure:**

#### Header

```markdown
# GMStudio — Brand Style Guide

**Version:** 1.0
**Phase:** 01 — Brand Identity & Content Foundation
**Status:** Locked (do not modify without explicit approval)
**Source of truth for:** All Phase 2 and Phase 3 UI implementation

This document is the authoritative reference for GMStudio's visual identity.
Downstream phases render this as a live page at `/style-guide` in the Astro site.
```

#### Section 1 — Brand Personality

Describe in 3-4 sentences:
- Dark premium aesthetic positioning (references: Resend.com, Linear.app, Vercel.com)
- "The site itself is the portfolio" — design must be RICH and detailed (D-03)
- UI/UX quality is the primary differentiator
- Cards use glassmorphism with subtle borders — no flat, textureless surfaces (D-05)

#### Section 2 — Logo

Document the following:

**File inventory table:**
| File | Use Case | Background |
|------|----------|-----------|
| `src/assets/logo/gmstudio-logo.svg` | Header, light sections | Dark or transparent |
| `src/assets/logo/gmstudio-logo-mono.svg` | Colored backgrounds, partner logos | Any |
| `src/assets/logo/gmstudio-icon.svg` | Favicon, app icon, tight spaces | Dark or transparent |
| `src/assets/logo/gmstudio-icon-mono.svg` | Monochrome contexts | Any |
| `public/favicon.svg` | Browser tab favicon | — |

**How to use in Astro (Phase 2 reference):**
```astro
---
import Logo from '../assets/logo/gmstudio-logo.svg?raw';
---
<Fragment set:html={Logo} />
```
Or as `<img>`:
```astro
<img src="/assets/logo/gmstudio-logo.svg" alt="GMStudio" width="180" height="36" />
```

**Do / Don't rules — include both a "DO" and "DON'T" for each:**
- DO: Use the color wordmark (`gmstudio-logo.svg`) on the dark background (`--color-bg`)
- DON'T: Place the color logo on a white or light background — use mono variant instead
- DO: Use the icon mark (`gmstudio-icon.svg`) when horizontal space is limited (< 120px)
- DON'T: Resize the SVG by changing only width or height attributes — always maintain aspect ratio
- DO: Maintain a clear-space margin of at least 16px around the logo on all sides
- DON'T: Recolor, rotate, add drop shadows, or modify the SVG markup

#### Section 3 — Colors

**Color palette table:**
| Token | Hex | Use Case |
|-------|-----|----------|
| `--color-bg` | `#0A0A0F` | Page background |
| `--color-surface` | `#13131A` | Card, panel, section surface |
| `--color-surface-raised` | `#1A1A24` | Modal, tooltip, elevated element |
| `--color-accent` | `#6366F1` | CTAs, links, active states, logo GM |
| `--color-accent-hover` | `#4F46E5` | Accent on hover/focus |
| `--color-accent-surface` | `#1E1B4B` | Badge background, tag, pill |
| `--color-text` | `#F8F8F8` | Primary text |
| `--color-text-muted` | `#9CA3AF` | Secondary text, captions |
| `--color-text-subtle` | `#6B7280` | Placeholder, disabled |
| `--color-border` | `rgba(248,248,248,0.08)` | Subtle borders, glassmorphism edge |
| `--color-border-accent` | `rgba(99,102,241,0.30)` | Accent hover borders on cards |

**Usage rules:**
- NEVER hardcode hex values in component files — always use `var(--token-name)`
- Background hierarchy: bg (deepest) → surface → surface-raised (most elevated)
- CTA buttons: background `--color-accent`, hover `--color-accent-hover`, text `--color-text`
- Muted text is for metadata, timestamps, secondary labels — not for body paragraph text

**Glassmorphism pattern (D-05):**
```css
.glass-card {
  background: var(--glass-bg);         /* rgba(19,19,26,0.60) */
  border: 1px solid var(--glass-border); /* rgba(248,248,248,0.08) */
  backdrop-filter: var(--glass-blur);  /* blur(12px) */
  border-radius: var(--radius-xl);
}
```

#### Section 4 — Typography

**Font stack:**
| Role | Font | Weights | CSS Token |
|------|------|---------|-----------|
| Headings | Space Grotesk | 500, 600, 700 | `var(--font-heading)` |
| Body / UI | Inter | 400, 500 | `var(--font-body)` |
| Code (optional) | JetBrains Mono | 400 | `var(--font-mono)` |

**Google Fonts import (for Phase 2 global layout):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

**Self-hosted alternative (Phase 2, recommended):**
```bash
npm install @fontsource/space-grotesk @fontsource/inter
```

**Type scale table:**
| Token | rem | px | Use Case |
|-------|-----|----|----------|
| `--text-xs` | 0.75 | 12 | Captions, labels |
| `--text-sm` | 0.875 | 14 | Small UI text |
| `--text-base` | 1 | 16 | Body paragraph |
| `--text-lg` | 1.125 | 18 | Lead paragraph |
| `--text-xl` | 1.25 | 20 | Card title |
| `--text-2xl` | 1.5 | 24 | Section subheading |
| `--text-3xl` | 1.875 | 30 | Section heading |
| `--text-4xl` | 2.25 | 36 | Page heading |
| `--text-5xl` | 3 | 48 | Hero headline |
| `--text-6xl` | 3.75 | 60 | Display / hero desktop |

**Usage mapping:**
| Element | Font | Weight Token | Size Token | Letter Spacing |
|---------|------|-------------|-----------|----------------|
| Hero headline | Space Grotesk | `--font-weight-bold` | `--text-5xl` / `--text-6xl` | `--tracking-tight` |
| Section heading | Space Grotesk | `--font-weight-semibold` | `--text-3xl` / `--text-4xl` | `--tracking-tight` |
| Card title | Space Grotesk | `--font-weight-semibold` | `--text-xl` | `--tracking-normal` |
| Body text | Inter | `--font-weight-regular` | `--text-base` | `--tracking-normal` |
| UI label | Inter | `--font-weight-medium` | `--text-sm` | `--tracking-normal` |
| Badge / tag | Inter | `--font-weight-medium` | `--text-xs` | `--tracking-wide` |
| Lead paragraph | Inter | `--font-weight-regular` | `--text-lg` | `--tracking-normal` |

**Line height rules:**
- Display / hero: `var(--leading-tight)` (1.1)
- Section headings: `var(--leading-snug)` (1.2)
- Body paragraphs: `var(--leading-normal)` (1.5)
- Long prose: `var(--leading-relaxed)` (1.625)

#### Section 5 — Spacing

Document the spacing scale tokens (`--space-1` through `--space-24`) with their pixel values and typical use cases. Note: prefer token values over arbitrary pixel values in all components.

#### Section 6 — Component Patterns

**CTA Button (primary):**
```css
.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  border: none;
  transition: background-color var(--transition-base), box-shadow var(--transition-base);
  box-shadow: var(--shadow-glow);
}
.btn-primary:hover {
  background-color: var(--color-accent-hover);
}
```

**Glass card:**
```css
.card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}
.card:hover {
  border-color: var(--color-border-accent);
  box-shadow: var(--shadow-glow);
}
```

#### Section 7 — Out of Scope (Phase 1)

Explicitly note:
- `/style-guide.astro` visual page — deferred to Phase 2 (Astro project must exist first)
- Copy and testimonials — deferred to Phase 3
- Dark/light mode toggle — not planned (dark only)

---

**Writing guidelines for this document:**
- Use Markdown tables for all token documentation (scannable, copy-pasteable)
- Include working code blocks for every pattern — no pseudocode
- Be specific: "Use `var(--color-text-muted)` for timestamps" not "use muted color for secondary content"
- The target reader is a Claude executor in Phase 2 or 3 who has never seen this project before

## Success Criteria

- `docs/STYLE-GUIDE.md` exists
- All 7 sections are present: Brand Personality, Logo, Colors, Typography, Spacing, Component Patterns, Out of Scope
- Every color token from `tokens.css` appears in the Colors table
- Typography section includes both font families with weight mappings
- Logo section lists all four production SVG paths with use-case descriptions
- Do/Don't logo rules are explicit (min 3 of each)
- Component patterns section includes at minimum: CTA button and glass card CSS patterns

## Verification

```bash
# File exists
test -f docs/STYLE-GUIDE.md && echo "PASS: STYLE-GUIDE.md exists" || echo "FAIL"

# Required sections present
for section in "## Brand Personality" "## Logo" "## Colors" "## Typography" "## Spacing" "## Component Patterns"; do
  grep -q "$section" docs/STYLE-GUIDE.md && echo "PASS: $section" || echo "FAIL: $section missing"
done

# Color tokens documented
grep -q "\-\-color-accent" docs/STYLE-GUIDE.md && echo "PASS: accent token documented" || echo "FAIL"
grep -q "6366F1" docs/STYLE-GUIDE.md && echo "PASS: hex value present" || echo "FAIL"

# Both fonts documented
grep -q "Space Grotesk" docs/STYLE-GUIDE.md && echo "PASS: Space Grotesk" || echo "FAIL"
grep -q "Inter" docs/STYLE-GUIDE.md && echo "PASS: Inter" || echo "FAIL"

# Logo file paths documented
grep -q "gmstudio-logo.svg" docs/STYLE-GUIDE.md && echo "PASS: logo paths" || echo "FAIL"
```

Human review: Open `docs/STYLE-GUIDE.md` and confirm a developer could implement the Hero section from Phase 3 using only this document and `tokens.css` — without asking any clarifying questions about brand choices.

## Output

After completion, create `.planning/phases/01-brand-identity-content-foundation/01-04-SUMMARY.md` documenting:
- File created and section count
- Any decisions made during authoring (Claude's discretion areas)
- Confirmation that all logo paths from Plan 03 are documented
- Note for Phase 2: this file is the source of truth for the `/style-guide.astro` page
