# GMStudio — Brand Style Guide

**Version:** 1.0
**Phase:** 01 — Brand Identity & Content Foundation
**Status:** Locked (do not modify without explicit approval)
**Source of truth for:** All Phase 2 and Phase 3 UI implementation

This document is the authoritative reference for GMStudio's visual identity.
Downstream phases render this as a live page at `/style-guide` in the Astro site.

---

## Brand Personality

GMStudio occupies a dark premium aesthetic in the web development agency space — intentionally aligned with the visual language of Resend.com, Linear.app, and Vercel.com. The site itself is the portfolio: every pixel must communicate craft, precision, and capability before a single project case study is read (D-03). UI/UX quality is the primary differentiator — the site must look and feel like something that cost considerably more than a typical agency portfolio. Cards use glassmorphism with subtle borders and ambient glow on interaction — no flat, textureless surfaces anywhere on the site (D-05).

---

## Logo

### File Inventory

| File | Use Case | Background |
|------|----------|------------|
| `src/assets/logo/gmstudio-logo.svg` | Header, light sections, primary usage | Dark or transparent |
| `src/assets/logo/gmstudio-logo-mono.svg` | Colored backgrounds, partner logos, print | Any |
| `src/assets/logo/gmstudio-icon.svg` | Favicon, app icon, avatar, tight spaces | Dark or transparent |
| `src/assets/logo/gmstudio-icon-mono.svg` | Monochrome contexts, colored surfaces | Any |
| `public/favicon.svg` | Browser tab favicon | — |

### Design Description

**Concept B — Wordmark with geometric accent mark.** A 10×10px filled square in `#6366F1` (indigo) precedes the wordmark text. "GM" renders in Space Grotesk weight 700 in `#6366F1`. "Studio" renders in Space Grotesk weight 600 in `#F8F8F8`. The square block functions as a secondary visual identifier that echoes the icon variant at any scale.

### How to Use in Astro (Phase 2 Reference)

As an inline SVG (recommended — enables CSS styling and no extra HTTP request):

```astro
---
import Logo from '../assets/logo/gmstudio-logo.svg?raw';
---
<Fragment set:html={Logo} />
```

As an `<img>` element:

```astro
<img src="/assets/logo/gmstudio-logo.svg" alt="GMStudio" width="180" height="36" />
```

As a module import (Astro + Vite resolve):

```astro
---
import logoUrl from '../assets/logo/gmstudio-logo.svg';
---
<img src={logoUrl} alt="GMStudio" width="180" height="36" />
```

### Do / Don't Rules

**DO:** Use the color wordmark (`gmstudio-logo.svg`) on the dark page background (`--color-bg`, `--color-surface`).

**DON'T:** Place the color logo on a white or light background — the indigo `#6366F1` loses contrast. Use `gmstudio-logo-mono.svg` instead.

**DO:** Use the icon mark (`gmstudio-icon.svg`) when horizontal space is limited (container narrower than 120px) — favicons, app icons, avatar placeholders.

**DON'T:** Resize the SVG by changing only `width` or `height` in isolation — always maintain aspect ratio or use both attributes together.

**DO:** Maintain a minimum clear-space margin of at least 16px (`--space-4`) around the logo on all sides.

**DON'T:** Recolor, rotate, add drop shadows, apply `filter`, or modify the SVG markup in any way. Use the provided mono variant if the default colors conflict with the background.

---

## Colors

### Color Palette

| Token | Hex / Value | Use Case |
|-------|-------------|----------|
| `--color-bg` | `#0A0A0F` | Page background — deepest layer |
| `--color-surface` | `#13131A` | Card, panel, section surface |
| `--color-surface-raised` | `#1A1A24` | Modal, tooltip, elevated element |
| `--color-accent` | `#6366F1` | CTAs, links, active states, logo GM letters |
| `--color-accent-hover` | `#4F46E5` | Accent on hover/focus |
| `--color-accent-surface` | `#1E1B4B` | Badge background, tag, pill — low-opacity accent fill |
| `--color-text` | `#F8F8F8` | Primary text — near-white |
| `--color-text-muted` | `#9CA3AF` | Secondary text, captions, metadata |
| `--color-text-subtle` | `#6B7280` | Placeholder text, disabled state |
| `--color-border` | `rgba(248, 248, 248, 0.08)` | Subtle borders — glassmorphism edge treatment |
| `--color-border-accent` | `rgba(99, 102, 241, 0.30)` | Accent-tinted border on card hover/focus |

### Usage Rules

- **NEVER hardcode hex values in component files.** Always use `var(--token-name)`.
- **Background hierarchy:** `--color-bg` (deepest) → `--color-surface` → `--color-surface-raised` (most elevated). Each layer is slightly lighter. Do not skip levels.
- **CTA buttons:** background `var(--color-accent)`, hover state `var(--color-accent-hover)`, text `var(--color-text)`.
- **`--color-text-muted`** is for metadata, timestamps, secondary labels, and captions — not for body paragraph text. Body paragraphs use `--color-text`.
- **`--color-text-subtle`** is only for placeholder text in form inputs and visually disabled elements.
- **`--color-accent-surface`** is for interactive badges and tags, not for layout backgrounds.

### Glassmorphism Pattern (D-05)

Every card and panel in the UI uses the glassmorphism treatment. Use the dedicated glass tokens — never construct these values inline.

```css
.glass-card {
  background: var(--glass-bg);           /* rgba(19, 19, 26, 0.60) */
  border: 1px solid var(--glass-border); /* rgba(248, 248, 248, 0.08) */
  backdrop-filter: var(--glass-blur);    /* blur(12px) */
  border-radius: var(--radius-xl);       /* 16px */
}
```

**Glass tokens reference:**

| Token | Value | Notes |
|-------|-------|-------|
| `--glass-bg` | `rgba(19, 19, 26, 0.60)` | Semi-transparent surface — requires a dark background layer behind it |
| `--glass-border` | `rgba(248, 248, 248, 0.08)` | Hairline border — matches `--color-border` |
| `--glass-blur` | `blur(12px)` | Value for `backdrop-filter` |

### Shadow Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.5)` | Subtle elevation, small components |
| `--shadow-md` | `0 4px 16px rgba(0, 0, 0, 0.4)` | Cards, dropdowns |
| `--shadow-lg` | `0 8px 32px rgba(0, 0, 0, 0.5)` | Modals, popovers |
| `--shadow-glow` | `0 0 24px rgba(99, 102, 241, 0.25)` | Accent glow for CTA buttons and highlighted cards |

---

## Typography

### Font Stack

| Role | Font | Weights Used | CSS Token |
|------|------|-------------|-----------|
| Headings | Space Grotesk | 500, 600, 700 | `var(--font-heading)` |
| Body / UI | Inter | 400, 500 | `var(--font-body)` |
| Code (optional) | JetBrains Mono | 400 | `var(--font-mono)` |

### Loading Fonts

**Google Fonts (CDN — simpler setup):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

**Self-hosted via npm (recommended for Phase 2 — eliminates third-party request, better LCP):**

```bash
npm install @fontsource/space-grotesk @fontsource/inter
```

Then import in the Astro global layout:

```astro
---
// src/layouts/BaseLayout.astro
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
---
```

### Type Scale

| Token | rem | px | Use Case |
|-------|-----|----|----------|
| `--text-xs` | 0.75 | 12 | Captions, badge labels |
| `--text-sm` | 0.875 | 14 | Small UI text, form labels |
| `--text-base` | 1 | 16 | Body paragraph |
| `--text-lg` | 1.125 | 18 | Lead paragraph, intro copy |
| `--text-xl` | 1.25 | 20 | Card title |
| `--text-2xl` | 1.5 | 24 | Section subheading |
| `--text-3xl` | 1.875 | 30 | Section heading |
| `--text-4xl` | 2.25 | 36 | Page heading |
| `--text-5xl` | 3 | 48 | Hero headline (mobile) |
| `--text-6xl` | 3.75 | 60 | Hero headline (desktop) |

Scale is modular, ratio 1.25, base 16px. Do not introduce intermediate sizes — pick the nearest token.

### Weight Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-weight-regular` | 400 | Body text, paragraph copy |
| `--font-weight-medium` | 500 | UI labels, navigation, small headings |
| `--font-weight-semibold` | 600 | Card titles, section headings |
| `--font-weight-bold` | 700 | Hero headlines, logo "GM" |

### Usage Mapping

| Element | Font | Weight Token | Size Token | Letter Spacing |
|---------|------|-------------|------------|----------------|
| Hero headline | Space Grotesk | `--font-weight-bold` | `--text-5xl` / `--text-6xl` | `--tracking-tight` |
| Section heading | Space Grotesk | `--font-weight-semibold` | `--text-3xl` / `--text-4xl` | `--tracking-tight` |
| Card title | Space Grotesk | `--font-weight-semibold` | `--text-xl` | `--tracking-normal` |
| Body text | Inter | `--font-weight-regular` | `--text-base` | `--tracking-normal` |
| UI label | Inter | `--font-weight-medium` | `--text-sm` | `--tracking-normal` |
| Badge / tag | Inter | `--font-weight-medium` | `--text-xs` | `--tracking-wide` |
| Lead paragraph | Inter | `--font-weight-regular` | `--text-lg` | `--tracking-normal` |

### Line Height Rules

Use these tokens — never use raw numeric values:

| Token | Value | Apply To |
|-------|-------|----------|
| `--leading-tight` | 1.1 | Display / hero headings |
| `--leading-snug` | 1.2 | Section headings |
| `--leading-normal` | 1.5 | Body paragraphs |
| `--leading-relaxed` | 1.625 | Long-form readable prose (blog, case study) |

### Letter Spacing Tokens

| Token | Value | Apply To |
|-------|-------|----------|
| `--tracking-tight` | -0.025em | Large headings (`--text-3xl` and up) |
| `--tracking-normal` | 0em | Body text, card titles |
| `--tracking-wide` | 0.05em | Uppercase labels, badges, tags |

---

## Spacing

The spacing scale uses powers of 4px as its base unit. All spacing in components must use these tokens. Do not introduce custom margin or padding values.

| Token | rem | px | Typical Use Case |
|-------|-----|----|-----------------|
| `--space-1` | 0.25 | 4 | Icon gap, tight inline spacing |
| `--space-2` | 0.5 | 8 | Badge padding, list item gap |
| `--space-3` | 0.75 | 12 | Button vertical padding, tag padding |
| `--space-4` | 1 | 16 | Default element margin, input padding, logo clear space |
| `--space-6` | 1.5 | 24 | Button horizontal padding, form field gap |
| `--space-8` | 2 | 32 | Card internal padding, section row gap |
| `--space-12` | 3 | 48 | Section padding (compact), content column gap |
| `--space-16` | 4 | 64 | Section vertical padding (standard) |
| `--space-20` | 5 | 80 | Section vertical padding (generous) |
| `--space-24` | 6 | 96 | Hero section padding, large section separators |

**Key rules:**
- Default card internal padding: `var(--space-8)` (32px).
- Default section vertical padding: `var(--space-16)` to `var(--space-24)` depending on section weight.
- Never use raw pixel values in component styles. If the required value is not in this table, use the nearest token.

### Border Radius Tokens

| Token | rem | px | Use Case |
|-------|-----|----|----------|
| `--radius-sm` | 0.25 | 4 | Badges, small chips |
| `--radius-md` | 0.5 | 8 | Buttons, inputs, small cards |
| `--radius-lg` | 0.75 | 12 | Medium cards, dropdowns |
| `--radius-xl` | 1 | 16 | Large cards, glass panels |
| `--radius-2xl` | 1.5 | 24 | Featured cards, hero elements |
| `--radius-full` | — | 9999 | Pill badges, avatar circles, fully-rounded buttons |

---

## Component Patterns

These are the canonical CSS patterns for core UI components. Phase 2 and Phase 3 implementors must use these patterns as the starting point — do not invent new color or spacing values.

### CTA Button — Primary

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
  cursor: pointer;
  transition: background-color var(--transition-base), box-shadow var(--transition-base);
  box-shadow: var(--shadow-glow);
  letter-spacing: var(--tracking-normal);
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background-color: var(--color-accent-hover);
}
```

### CTA Button — Ghost / Outline

```css
.btn-ghost {
  background-color: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: border-color var(--transition-base), background-color var(--transition-base);
}

.btn-ghost:hover,
.btn-ghost:focus-visible {
  border-color: var(--color-border-accent);
  background-color: var(--color-surface);
}
```

### Glass Card

The default treatment for all cards (project cards, service cards, testimonial cards):

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

### Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  background-color: var(--color-accent-surface);
  color: var(--color-accent);
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border-accent);
}
```

### Section Heading Block

Canonical pattern for section headings with an optional label above:

```html
<div class="section-heading">
  <span class="section-label">Nossos Serviços</span>
  <h2 class="section-title">O que a GMStudio faz</h2>
  <p class="section-subtitle">Criamos presença digital que vende — lojas online, cardápios, landing pages e sites institucionais.</p>
</div>
```

```css
.section-label {
  display: block;
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--color-accent);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.section-title {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-3xl);  /* bump to --text-4xl on desktop */
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

.section-subtitle {
  font-family: var(--font-body);
  font-weight: var(--font-weight-regular);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
  color: var(--color-text-muted);
  max-width: 560px;
}
```

### Navigation Link

```css
.nav-link {
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav-link:hover,
.nav-link[aria-current="page"] {
  color: var(--color-text);
}
```

---

## Out of Scope (Phase 1)

The following items are explicitly deferred and must not be implemented in Phase 1:

- **`/style-guide.astro` visual page** — Deferred to Phase 2. The Astro project must exist before this document can be rendered as a live page. This STYLE-GUIDE.md is the source of truth; Phase 2 renders it at `/style-guide` for browser-based verification.
- **Copy and testimonials** — Deferred to Phase 3. Real content (project descriptions, client names, testimonial text) must be gathered from the client before Phase 3 begins.
- **Dark/light mode toggle** — Not planned. The site is dark-only by design. A light mode is not part of v1 scope and would require creating an entirely separate token layer.
- **Animation tokens** — Motion (Framer Motion) integration deferred to Phase 2. Scroll-triggered entrance animations and hover transitions beyond CSS `transition` are a Phase 2 concern.
- **CMS integration** — Deferred to v2. Phase 1 uses hard-coded Astro content collections.
