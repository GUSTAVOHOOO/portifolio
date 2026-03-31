# Phase 1: Brand Identity & Content Foundation - Research

**Researched:** 2026-03-31
**Domain:** Brand design, SVG logo production, CSS design tokens, typography, favicon strategy
**Confidence:** HIGH (most findings verified against official docs or multiple authoritative sources)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: Dark mode premium aesthetic — near-black background (~#0A0A0F), white text (~#F8F8F8), electric accent
- D-02: Accent color: Indigo #6366F1 (hover: #4F46E5; surface tint: #1E1B4B at ~10% opacity)
- D-03: Site itself is the portfolio — design must be RICH and detailed, not minimal for minimalism's sake. Visual references: Resend.com, Linear.app, Vercel.com
- D-04: Cards use glassmorphism and/or subtle borders — avoid flat, textureless surfaces
- D-05: Logo created by Claude as SVG directly — no external design tool required
- D-06: Logo style: wordmark typographic — "GMStudio" with accent color (#6366F1) on "GM" or geometric detail
- D-07: Two required variations: full wordmark + icon/favicon variant ("GM" initials)
- D-08: Workflow: Claude proposes 3 SVG concepts → user approves → final saved to `src/assets/logo/`
- D-09: Heading font: geometric sans-serif (Inter, Space Grotesk, or similar — Claude's discretion)
- D-10: Body font: neutral sans-serif, highly readable (Claude's discretion)
- D-11: Both fonts via Google Fonts (free, self-hostable)
- D-12: Tokens as CSS custom properties in `src/styles/tokens.css`
- D-13: Token naming: `--color-bg`, `--color-surface`, `--color-accent`, `--color-accent-hover`, `--color-accent-surface`, `--color-text`, `--color-text-muted`, `--color-border`
- D-14: Phase 1 deliverable: `docs/STYLE-GUIDE.md` (Markdown) — logo paths, color tokens, typography scale, do/don't usage rules
- D-15: Phase 2 deliverable: `src/pages/style-guide.astro` — out of scope for Phase 1
- D-16: Portfolio project images → `src/assets/projects/`, team photos → `src/assets/team/`
- D-17: Copy and testimonials deferred to Phase 3

### Claude's Discretion
- Exact font weights and line-height scale (within geometric/neutral sans direction)
- Specific SVG construction of the wordmark (letter-spacing, weight, proportions)
- Number of type size steps in the scale (e.g., xs/sm/base/lg/xl/2xl/3xl)
- Exact spacing between logo mark and wordmark text in the lockup

### Deferred Ideas (OUT OF SCOPE)
- `/style-guide.astro` visual page — Phase 2
- Copy and testimonials — Phase 3
- CMS for brand assets — post-launch milestone
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BRAND-01 | Logo criado com variações (principal, monocromático, favicon) | SVG wordmark + monochrome + favicon variant patterns documented below |
| BRAND-02 | Paleta de cores definida como tokens CSS (primárias, secundárias, neutras) | Complete token set with exact hex values and CSS var names documented below |
| BRAND-03 | Tipografia definida (fontes para títulos e corpo de texto) | Space Grotesk + Inter pairing with full weight/scale documented below |
| BRAND-04 | Guia de estilo básico documentando uso correto de logo, cores e fontes | STYLE-GUIDE.md structure and required sections documented below |
</phase_requirements>

---

## Summary

Phase 1 produces no deployable code — it produces brand artifacts that all later phases consume. The three concrete file outputs are: `src/assets/logo/` (SVG files), `src/styles/tokens.css` (CSS custom properties), and `docs/STYLE-GUIDE.md` (Markdown reference). The content-gathering tasks (portfolio images, team photos) are human-driven gating tasks, not code tasks.

The most technically nuanced question in this phase is SVG logo production. The naive approach — using `<text>` with a web font embedded — fails because fonts need to be embedded or the text will render incorrectly in tools that open the SVG outside a browser. The correct approach converts text to outlines (paths) or uses self-contained SVG geometry. Since Claude is generating the SVG directly and it will be displayed in a browser context, using embedded Google Fonts via a `<style>` block with `@import` is viable for browser rendering but breaks in design tools. The most portable approach is to hand-craft geometric letterforms as paths or use `<text>` with `font-family` set to a web-safe geometric approximation and ship the full `@font-face` declaration inside the SVG.

The typography recommendation is Space Grotesk (headings, weight 700/600) + Inter (body, weight 400/500). This is a verified, widely-used premium agency pairing. Space Grotesk has the geometric quirk needed to feel distinct from corporate sites; Inter is the most legible neutral sans at small sizes for paragraph text.

**Primary recommendation:** Treat brand tokens as the single source of truth. Every value in `tokens.css` should be referenced by name — never hardcode `#6366F1` in any downstream file; always use `var(--color-accent)`.

---

## Standard Stack

This phase produces static files only — no npm packages required. All outputs are SVGs, CSS, and Markdown.

### Fonts (Google Fonts, self-hostable)

| Font | Weights to Load | Purpose | Notes |
|------|----------------|---------|-------|
| Space Grotesk | 500, 600, 700 | Headings, logo wordmark | 5 weights available (300–700). Load only 500/600/700 to minimize payload. |
| Inter | 400, 500 | Body text, UI labels | Variable font available — use `wght` axis 400–500 range. |

**Google Fonts URL (two families, minimal weights):**
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap
```

For Phase 2 self-hosting, download via `fontsource` packages:
```bash
npm install @fontsource/space-grotesk @fontsource/inter
```

### Tools (no install required for Phase 1)

| Tool | Purpose | Notes |
|------|---------|-------|
| Plain text editor | SVG authoring | SVG is XML — any editor works |
| Browser devtools | SVG preview and token verification | Open SVG directly in browser |
| Sharp (Astro built-in, Phase 2) | Image optimization for portfolio/team assets | Not needed until Phase 2 |

---

## Architecture Patterns

### File Delivery Targets

```
src/
└── assets/
    ├── logo/
    │   ├── gmstudio-logo.svg        # Full wordmark, color version
    │   ├── gmstudio-logo-mono.svg   # Monochrome (white on transparent)
    │   ├── gmstudio-icon.svg        # "GM" initials mark, used as favicon
    │   └── gmstudio-icon-mono.svg   # Monochrome icon variant
    ├── projects/
    │   └── [project-slug].webp      # Portfolio thumbnails (see dimensions below)
    └── team/
        └── [name].webp              # Team member photos (square, 800x800)
src/
└── styles/
    └── tokens.css                   # CSS custom properties — the single source of truth
docs/
└── STYLE-GUIDE.md                   # Markdown brand reference
public/
├── favicon.ico                      # 32x32 ICO fallback (generated from icon SVG)
└── favicon.svg                      # SVG favicon for modern browsers
```

### Pattern 1: SVG Wordmark Construction

**What:** Two valid techniques for programmatic SVG logos. Choose based on portability requirement.

**Technique A — Embedded font with `<text>` element (browser-only, easiest):**
Works reliably in browsers. Breaks in Illustrator/Inkscape without the font installed.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" role="img" aria-label="GMStudio">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
    </style>
  </defs>
  <!-- "GM" in accent color -->
  <text x="0" y="38" font-family="'Space Grotesk', sans-serif" font-weight="700"
        font-size="40" fill="#6366F1" letter-spacing="-1">GM</text>
  <!-- "Studio" in white -->
  <text x="62" y="38" font-family="'Space Grotesk', sans-serif" font-weight="600"
        font-size="40" fill="#F8F8F8" letter-spacing="-0.5">Studio</text>
</svg>
```

**Technique B — Pure SVG paths (fully portable, preferred for production logo):**
Convert letterforms to `<path>` elements. No font dependency. Works in all tools, all browsers, offline. Appropriate for a production logo that will be used across different contexts.

For the icon/favicon variant (just "GM"), paths are compact enough to hand-author or to trace from a browser render. The full wordmark paths are verbose — generate once, save, treat as opaque.

**Recommendation for this project:** Use Technique A for the 3 draft concepts (fast iteration, Claude can compose them directly). After user approval of a concept, convert the approved concept to paths (Technique B) for the final production SVGs. This workflow matches D-08 (3 concepts → approval → final saved to src/assets/logo/).

**Draft SVG viewBox sizing:** Use `viewBox="0 0 300 60"` for the full wordmark, `viewBox="0 0 60 60"` for the icon mark (square).

### Pattern 2: CSS Token File Structure

**What:** Complete `tokens.css` implementing all tokens from D-13/D-14/D-15 with the locked color palette.

```css
/* src/styles/tokens.css
   Single source of truth for GMStudio design tokens.
   All downstream files MUST reference these variables — never hardcode hex values.
*/

:root {
  /* ─── Color: Backgrounds ─────────────────────────────────── */
  --color-bg:              #0A0A0F;   /* Page background — near-black */
  --color-surface:         #13131A;   /* Card/panel surface — slightly lighter than bg */
  --color-surface-raised:  #1A1A24;   /* Elevated surface (modal, tooltip) */

  /* ─── Color: Accent (Indigo) ─────────────────────────────── */
  --color-accent:          #6366F1;   /* Primary interactive / CTA / logo GM letters */
  --color-accent-hover:    #4F46E5;   /* Accent on hover/focus */
  --color-accent-surface:  #1E1B4B;   /* Low-opacity accent background (badge, tag) */

  /* ─── Color: Text ────────────────────────────────────────── */
  --color-text:            #F8F8F8;   /* Primary text — near-white */
  --color-text-muted:      #9CA3AF;   /* Secondary text, captions, meta */
  --color-text-subtle:     #6B7280;   /* Placeholder, disabled state */

  /* ─── Color: Borders ─────────────────────────────────────── */
  --color-border:          rgba(248, 248, 248, 0.08);  /* Subtle border — glassmorphism */
  --color-border-accent:   rgba(99, 102, 241, 0.30);   /* Accent-tinted border on hover */

  /* ─── Typography: Families ───────────────────────────────── */
  --font-heading:  'Space Grotesk', system-ui, sans-serif;
  --font-body:     'Inter', system-ui, sans-serif;
  --font-mono:     'JetBrains Mono', 'Fira Code', monospace; /* Optional — for code snippets */

  /* ─── Typography: Scale ──────────────────────────────────── */
  /* Modular scale — ratio 1.25 (Major Third) from base 16px */
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
  --leading-tight:    1.1;   /* Display headings */
  --leading-snug:     1.2;   /* Section headings */
  --leading-normal:   1.5;   /* Body text */
  --leading-relaxed:  1.625; /* Long-form readable prose */

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

  /* ─── Effects: Glassmorphism (D-04/D-05) ─────────────────── */
  --glass-bg:      rgba(19, 19, 26, 0.60);       /* Semi-transparent surface */
  --glass-border:  rgba(248, 248, 248, 0.08);    /* Hairline border */
  --glass-blur:    blur(12px);                    /* Backdrop filter value */

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

**Note on Tailwind v4 integration:** In Phase 2, when Tailwind v4 is initialized, `tokens.css` is imported via `@import "../../styles/tokens.css"` in the global CSS file. Tailwind v4 CSS-first config (`@theme`) can reference these variables directly via `--color-*` naming — no JS config needed. Keep the token names compatible with Tailwind v4's `--color-*` namespace.

### Pattern 3: Typography Pairing — Space Grotesk + Inter

**What:** Recommended weights and usage mapping for the two-font system.

| Use Case | Font | Weight | Size Token | Letter Spacing |
|----------|------|--------|-----------|----------------|
| Hero headline | Space Grotesk | 700 | `--text-5xl` / `--text-6xl` | `--tracking-tight` |
| Section heading | Space Grotesk | 700 | `--text-3xl` / `--text-4xl` | `--tracking-tight` |
| Card title | Space Grotesk | 600 | `--text-xl` / `--text-2xl` | `--tracking-tight` |
| Subheading / label | Space Grotesk | 500 | `--text-lg` | `--tracking-normal` |
| Body paragraph | Inter | 400 | `--text-base` | `--tracking-normal` |
| Lead paragraph | Inter | 400 | `--text-lg` | `--tracking-normal` |
| Small UI text | Inter | 500 | `--text-sm` | `--tracking-normal` |
| Caption / meta | Inter | 400 | `--text-xs` | `--tracking-wide` |
| Uppercase badge | Inter | 500 | `--text-xs` | `--tracking-wide` |
| Logo wordmark "GM" | Space Grotesk | 700 | — (SVG, not CSS) | -1px absolute |
| Logo wordmark "Studio" | Space Grotesk | 600 | — (SVG, not CSS) | -0.5px absolute |

**Line height rule:**
- Headings (anything `--text-3xl` and above): `--leading-tight` (1.1)
- Subheadings (`--text-xl` / `--text-2xl`): `--leading-snug` (1.2)
- Body text: `--leading-normal` (1.5)
- Long prose: `--leading-relaxed` (1.625)

### Pattern 4: Favicon Setup (2025 minimal approach)

Source: Evil Martians canonical guide + caniuse.com SVG favicon support table.

**Minimum required files:**

| File | Path | Size | Purpose |
|------|------|------|---------|
| SVG favicon | `public/favicon.svg` | Vector | Modern browsers (Chrome, Firefox, Edge, Safari 15.6+) |
| ICO fallback | `public/favicon.ico` | 32×32 | Legacy browsers, direct URL requests, RSS readers |
| Apple touch icon | `public/apple-touch-icon.png` | 180×180 | iOS "Add to Home Screen" |

**HTML `<head>` declarations (Phase 2 task, documented here for reference):**
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**SVG favicon dark mode support** — add `prefers-color-scheme` inside the SVG:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
  <style>
    .bg { fill: #0A0A0F; }
    .mark { fill: #6366F1; }
    @media (prefers-color-scheme: light) {
      .bg { fill: #ffffff; }
      .mark { fill: #4F46E5; }
    }
  </style>
  <!-- "GM" mark geometry here -->
</svg>
```

**Phase 1 deliverable scope:** Create `public/favicon.svg` (the icon SVG) and `src/assets/logo/gmstudio-icon.svg`. The ICO and Apple touch PNG are Phase 2 tasks (require running sharp or an online converter after the SVG is finalized).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font delivery | Self-hosted font loading with manual WOFF2 file management | `@fontsource/space-grotesk` npm package in Phase 2 | Fontsource handles WOFF2 subsetting, license compliance, and `@font-face` declarations automatically |
| Color contrast checking | Manual contrast ratio math | Browser DevTools accessibility panel or contrast.tools | WCAG math is error-prone; tools verify instantly |
| ICO file generation | Hand-writing ICO binary format | favicon.io or RealFaviconGenerator.net from the final SVG | ICO is a multi-frame binary format — not hand-authorable |
| Apple touch icon | SVG-to-PNG conversion manually | sharp CLI or favicon.io from the icon SVG | Exact 180×180 PNG required; browsers do not accept SVG for apple-touch-icon |

**Key insight:** Phase 1 is design work, not engineering work. The deliverables are files, not code systems. Resist the urge to build tooling — just produce the artifacts.

---

## Common Pitfalls

### Pitfall 1: SVG text renders differently across environments
**What goes wrong:** `<text>` elements with external font references render correctly in Chrome but show system fallback fonts in design tools, Node.js image generators, and email clients — making the logo look wrong in any non-browser context.
**Why it happens:** SVG `<text>` relies on the font being available in the rendering environment. External font URLs (`@import`) are not fetched by all renderers.
**How to avoid:** For draft/iteration, `<text>` with Google Fonts `@import` is fine (browser preview). For the final production logo, convert to paths. Mark the path-converted SVG clearly in the filename (e.g., `gmstudio-logo.svg` = final paths, not text).
**Warning signs:** The logo looks different in Figma vs. browser vs. an og-image generator.

### Pitfall 2: Hardcoding hex values instead of CSS tokens
**What goes wrong:** Colors like `#6366F1` appear directly in Astro component styles in Phase 2+. When a brand color is adjusted, dozens of files need updating.
**Why it happens:** Developers default to copying hex values from design files rather than referencing tokens.
**How to avoid:** The `tokens.css` file is created in Phase 1 and imported globally in Phase 2. All component files MUST use `var(--color-accent)` — enforce this in the STYLE-GUIDE.md "don't" section explicitly.
**Warning signs:** Any grep for `#6366F1` in Phase 2+ code is a violation.

### Pitfall 3: SVG logo missing `viewBox` — breaks responsive scaling
**What goes wrong:** The logo SVG has `width="300" height="60"` but no `viewBox`. It renders at fixed pixel size and cannot be resized via CSS.
**Why it happens:** Naive SVG authoring sets absolute dimensions without `viewBox`.
**How to avoid:** Every SVG logo MUST have `viewBox` set. Remove `width` and `height` from the root `<svg>` element (or use `width="100%"`). Size control belongs to CSS, not the SVG.
**Warning signs:** Logo appears at wrong size in Phase 2 Astro `<img>` usage.

### Pitfall 4: Portfolio images not WebP
**What goes wrong:** Images are added as JPEG/PNG to `src/assets/projects/`. In Phase 2/3, Astro's `<Image />` component still converts them — but source PNGs are large and inflate the repo.
**Why it happens:** Client provides images in whatever format they have.
**How to avoid:** Convert source images to WebP before adding to the repo. Recommended tooling: `cwebp` CLI or Squoosh.app. See target dimensions below.
**Warning signs:** `src/assets/` growing to >50MB indicates uncompressed sources.

### Pitfall 5: Logo SVG not accessible
**What goes wrong:** Logo SVG has no accessible label. Screen readers announce nothing or read raw SVG markup.
**Why it happens:** SVG accessibility is often forgotten in brand asset creation.
**How to avoid:** Add `role="img"` and `aria-label="GMStudio"` to every `<svg>` element. For inline SVGs, use `<title>` as the first child element.
```xml
<svg role="img" aria-label="GMStudio" xmlns="...">
  <title>GMStudio</title>
  <!-- paths -->
</svg>
```

---

## Code Examples

### STYLE-GUIDE.md Required Structure

```markdown
# GMStudio — Guia de Estilo

**Versão:** 1.0
**Atualizado:** [data]

---

## 1. Logo

### Arquivos
| Variação | Arquivo | Usar quando |
|----------|---------|-------------|
| Wordmark (cor) | `src/assets/logo/gmstudio-logo.svg` | Fundo escuro — uso principal |
| Wordmark (mono) | `src/assets/logo/gmstudio-logo-mono.svg` | Fundo claro, impressão em P&B |
| Ícone (cor) | `src/assets/logo/gmstudio-icon.svg` | Favicon, avatar, espaços pequenos |
| Ícone (mono) | `src/assets/logo/gmstudio-icon-mono.svg` | Versão monocromática do ícone |

### Zona de proteção
Manter espaçamento mínimo de [X]px ao redor do logo em todos os lados.
Nunca posicionar sobre fundos que criem contraste insuficiente.

### Usos corretos
- ✓ Logo cor sobre fundo `--color-bg` (#0A0A0F)
- ✓ Logo mono branco sobre fundo escuro uniforme
- ✓ Ícone "GM" como favicon e avatar de redes sociais

### Usos incorretos (Don'ts)
- ✗ Não deformar proporções (não esticar/comprimir)
- ✗ Não aplicar sombra drop-shadow no logo
- ✗ Não recolorizar — usar apenas as variações oficiais
- ✗ Não usar o wordmark completo em espaços menores que 120px de largura (usar ícone)
- ✗ Não colocar sobre imagem fotográfica sem overlay escuro

---

## 2. Cores

### Paleta Principal
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#0A0A0F` | Fundo de página |
| `--color-surface` | `#13131A` | Cards, painéis |
| `--color-surface-raised` | `#1A1A24` | Modais, tooltips |
| `--color-accent` | `#6366F1` | CTA, links, letras GM do logo |
| `--color-accent-hover` | `#4F46E5` | Estado hover do accent |
| `--color-accent-surface` | `#1E1B4B` | Fundo de badge/tag accent |
| `--color-text` | `#F8F8F8` | Texto principal |
| `--color-text-muted` | `#9CA3AF` | Texto secundário, meta |
| `--color-text-subtle` | `#6B7280` | Placeholder, desabilitado |
| `--color-border` | `rgba(248,248,248,0.08)` | Bordas sutis, glassmorphism |
| `--color-border-accent` | `rgba(99,102,241,0.30)` | Borda accent no hover |

### Regras de uso
- Sempre usar CSS vars (`var(--color-accent)`) — nunca hex diretamente no código
- Contraste mínimo de 4.5:1 para texto corpo sobre `--color-bg`
- Contraste mínimo de 3:1 para texto grande (headings 24px+) sobre qualquer superfície

### Usos incorretos
- ✗ Nunca usar `#6366F1` diretamente no CSS de componentes
- ✗ Não criar novas variantes de cor fora dos tokens definidos
- ✗ Não usar branco puro (#FFFFFF) — usar `--color-text` (#F8F8F8)

---

## 3. Tipografia

### Famílias
| Papel | Fonte | Fallback |
|-------|-------|---------|
| Títulos | Space Grotesk | system-ui, sans-serif |
| Corpo | Inter | system-ui, sans-serif |

### Escala
| Token | Tamanho | Uso |
|-------|---------|-----|
| `--text-xs` | 12px | Legendas, labels |
| `--text-sm` | 14px | UI pequeno |
| `--text-base` | 16px | Parágrafo corpo |
| `--text-lg` | 18px | Lead / intro |
| `--text-xl` | 20px | Título de card |
| `--text-2xl` | 24px | Subheading de seção |
| `--text-3xl` | 30px | Heading de seção |
| `--text-4xl` | 36px | Heading de página |
| `--text-5xl` | 48px | Hero headline (mobile) |
| `--text-6xl` | 60px | Hero headline (desktop) |

### Regras de uso
- Headings sempre em Space Grotesk, mínimo weight 600
- Corpo sempre em Inter weight 400
- `letter-spacing: -0.025em` em headings `3xl` ou maiores
- Nunca usar Space Grotesk abaixo de `--text-sm` — Inter é mais legível em tamanhos pequenos

---

## 4. Efeitos e Componentes

### Glassmorphism (cards, panels)
```css
background: var(--glass-bg);
backdrop-filter: var(--glass-blur);
border: 1px solid var(--glass-border);
border-radius: var(--radius-lg);
```

### Sombra glow (CTAs, accent buttons)
```css
box-shadow: var(--shadow-glow);
```

### Regras
- Glassmorphism apenas sobre fundos com conteúdo visível por baixo (imagem ou gradiente)
- Nunca usar glassmorphism sobre `--color-bg` sólido — efeito invisível e sem propósito
- Glow accent apenas em elementos de CTA primário — não em decorações

---

## 5. Imagens de Portfólio

### Dimensões e formato
| Tipo | Dimensões | Formato | Caminho |
|------|-----------|---------|---------|
| Thumbnail (grid) | 800×500px | WebP | `src/assets/projects/[slug].webp` |
| Foto de equipe | 800×800px | WebP | `src/assets/team/[nome].webp` |

### Convenção de nomenclatura
- Slugs em kebab-case: `restaurante-da-maria.webp`, `loja-do-joao.webp`
- Fotos de equipe pelo primeiro nome: `gabriel.webp`, `mateus.webp`
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|-----------------|--------------|--------|
| Multiple PNG favicon sizes (16, 32, 48, 64, 96, 128...) | SVG + 32px ICO + 180px PNG | ~2021 (Evil Martians guide) | 90% fewer favicon files to maintain |
| Tailwind v3 `tailwind.config.js` for design tokens | Tailwind v4 `@theme` directive in CSS + CSS custom properties | Jan 2025 | Token file (`tokens.css`) works natively — no JS config layer |
| Google Fonts `<link>` tag in HTML | `@fontsource` npm packages for self-hosting | 2022 onwards | No external DNS lookup; GDPR-safe; works offline; zero latency |
| `font-display: block` | `font-display: swap` | Best practice established ~2020 | Prevents invisible text during font load; better perceived performance |

**Deprecated/outdated:**
- Favicon sizes: 57px, 72px, 76px, 114px, 120px, 144px, 152px, 180px PNG variants — all unnecessary with the modern 3-file approach
- `<meta name="theme-color">` with a single hex — support now also accepts `media` attribute for light/dark variants
- Framer Motion import (old name) — package is now `motion` (`npm install motion`), not `framer-motion` — relevant for Phase 3

---

## Image Dimensions for Portfolio and Team Assets

### Portfolio thumbnails (`src/assets/projects/`)
Source format to provide to client: WebP preferred; JPEG acceptable as source (Astro will convert).
- **Target dimensions:** 800×500px (16:10 aspect ratio — works in card grid without cropping)
- **Minimum acceptable source:** 1200×750px (so Astro can downscale to 800 and 400 without upscaling)
- **Astro will generate:** 400w and 800w variants automatically via `widths` prop in Phase 2
- **File size target:** <150KB per WebP thumbnail after optimization

### Team photos (`src/assets/team/`)
- **Target dimensions:** 800×800px (square — consistent with circular avatar cropping in Phase 3)
- **Minimum acceptable source:** 400×400px
- **File size target:** <80KB per WebP

### Pre-processing before adding to repo
The client will likely provide JPEGs. Convert before committing:
```bash
# Using cwebp (install: brew install webp / apt install webp)
cwebp -q 80 input.jpg -o output.webp

# Resize + convert with sharp CLI (if Node available)
npx sharp-cli --input photo.jpg --output photo.webp --resize 800 800
```

---

## Open Questions

1. **How many portfolio projects will be in v1?**
   - What we know: Client "has real projects to show" (PROJECT.md) — no count specified
   - What's unclear: 3 projects? 10 projects? This affects grid layout decisions in Phase 3
   - Recommendation: Phase 1 plan should include a task for client to provide a list. Placeholder images (solid color WebPs) can unblock Phase 2-3 development.

2. **How many team members?**
   - What we know: "agency members" — implied small team (2-4 people based on "GMStudio" name)
   - What's unclear: Exact count, whether all members want to be shown
   - Recommendation: Same as above — collect names in Phase 1, use placeholder avatars if photos aren't ready

3. **Logo approval workflow logistics**
   - What we know: D-08 specifies 3 concepts → user approval → final
   - What's unclear: How does user provide feedback? Chat message? Annotation?
   - Recommendation: Plan should include a clear "STOP — awaiting logo approval" checkpoint after concept presentation. Phase 1 must not mark BRAND-01 complete until approval is confirmed in writing.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 1 produces static files (SVG, CSS, Markdown) only. No external tools, runtimes, databases, or services are required beyond a text editor and browser.

The only optional tool (image conversion) uses web-based alternatives (Squoosh.app) if CLI tools are unavailable.

---

## Validation Architecture

Step 4: Nyquist validation is minimal for this phase because all deliverables are static design artifacts, not code with testable behavior.

| Req ID | Behavior | Test Type | How to Verify |
|--------|----------|-----------|---------------|
| BRAND-01 | Logo SVG exists in 2+ variations + favicon file | Manual inspection | File exists at correct path; opens in browser without fallback font; paths render correctly |
| BRAND-02 | Color palette as CSS custom properties | Manual + lint | Open `tokens.css`; verify all 8+ required token names are present; no hex values in any downstream file (grep check) |
| BRAND-03 | Typography documented with weights and scale | Manual inspection | `docs/STYLE-GUIDE.md` §3 exists; Space Grotesk and Inter named with weights; scale table complete |
| BRAND-04 | Style guide documents correct/incorrect usage | Manual inspection | `docs/STYLE-GUIDE.md` has at least 3 ✓ and 3 ✗ examples per section (logo, colors, fonts) |

**Phase gate verification command (Phase 1 exit):**
```bash
# Verify all required files exist
ls src/assets/logo/gmstudio-logo.svg
ls src/assets/logo/gmstudio-logo-mono.svg
ls src/assets/logo/gmstudio-icon.svg
ls src/styles/tokens.css
ls docs/STYLE-GUIDE.md
ls public/favicon.svg

# Verify required token names are present in tokens.css
grep -E "(--color-bg|--color-surface|--color-accent|--color-accent-hover|--color-accent-surface|--color-text|--color-text-muted|--color-border)" src/styles/tokens.css
```

---

## Sources

### Primary (HIGH confidence)
- [MDN Web Docs — SVG `<text>` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/text) — SVG text rendering behavior
- [Evil Martians — How to Favicon in 2021](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) — Canonical minimal favicon approach (still current in 2025)
- [caniuse.com — SVG favicon support](https://caniuse.com/link-icon-svg) — Browser support table for SVG favicons
- [Astro Docs — Images](https://docs.astro.build/en/guides/images/) — `<Image />` component behavior, WebP default output
- [Beautiful Web Type — Space Grotesk](https://www.beautifulwebtype.com/space-grotesk/) — Available weights (300–700), use case guidance

### Secondary (MEDIUM confidence)
- [Favicon Best Practices 2025 — Icon Maker Studio](https://iconmaker.studio/blog/favicon-best-practices-2025) — Confirmed 3-file minimal approach aligns with Evil Martians
- [maxibestof.one — Inter + Space Grotesk pairing](https://maxibestof.one/typefaces/inter/pairing/space-grotesk) — Community-validated pairing confirmation
- [Penpot Blog — Design tokens and CSS variables guide](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) — Token naming convention patterns

### Tertiary (LOW confidence — flagged for validation)
- General web search results on CSS token naming conventions — consistent across multiple sources but not from a single official spec

---

## Metadata

**Confidence breakdown:**
- SVG logo techniques: HIGH — MDN is authoritative; `<text>` vs paths is well-understood
- CSS token set: HIGH — values from CONTEXT.md decisions + standard naming patterns
- Typography scale: HIGH — Space Grotesk weights verified; scale is standard Major Third modular
- Favicon strategy: HIGH — Evil Martians guide + caniuse data cross-verified
- Image dimensions: MEDIUM — Astro image handling verified; specific portfolio dimensions are a recommendation, not a standard
- Style guide structure: MEDIUM — no official format exists; structure based on established agency style guide conventions

**Research date:** 2026-03-31
**Valid until:** 2026-09-01 (stable domain — CSS custom properties, SVG, Google Fonts unlikely to change significantly)
