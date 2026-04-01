# Phase 2: Project Foundation & Data Layer - Research

**Researched:** 2026-04-01
**Domain:** Astro 5/6, Tailwind CSS v4, Cloudflare Pages, Astro Content Collections, Zod, Image optimization
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HERO-02 | Site responsivo com layout mobile-first | Astro zero-JS default output; Tailwind v4 responsive utilities; viewport meta via BaseLayout |
| SEO-02 | Imagens otimizadas (formato WebP, dimensões corretas, lazy loading) | Astro `<Image />` component with sharp auto-converts to WebP; `loading="lazy"` is the default |
</phase_requirements>

---

## Summary

Phase 2 bootstraps the Astro project from scratch inside the existing repo, wires in the brand tokens from Phase 1, deploys to Cloudflare Pages via `git push`, and populates all content data schemas so Phase 3 can consume type-safe collections without touching infrastructure.

The registry shows Astro has released **6.1.2** as the latest version — the CLAUDE.md says "5.x" but Astro 6 is stable and the recommended migration is seamless (the Content Layer API, live collections, and all relevant APIs are present). The stack recommendation in CLAUDE.md remains valid; only the version number differs. The Tailwind CSS v4 integration now uses `@tailwindcss/vite` directly — the `@astrojs/tailwind` adapter is deprecated for v4 projects. `npx astro add tailwind` in Astro 5.2+ handles this automatically.

**Primary recommendation:** Initialize the Astro project with `npm create astro@latest`, add Tailwind via `npx astro add tailwind` (installs `@tailwindcss/vite` plugin), connect to Cloudflare Pages via the dashboard, define all content collections in `src/content.config.ts` with Zod schemas, and populate data files. All four success criteria are achievable in a single focused phase.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 6.1.2 | Static site framework + build | Zero-JS default output; Content Layer with Zod; Islands; verified latest via npm registry |
| tailwindcss | 4.2.2 | Utility-first CSS | CSS-first config via `@theme`; no JS config file; verified via npm registry |
| @tailwindcss/vite | 4.2.2 | Vite plugin for Tailwind v4 | Replaces deprecated `@astrojs/tailwind`; official integration method |
| typescript | 5.x (bundled) | Type safety | Astro ships strict TS support; catches content schema errors at build time |
| zod | 4.3.6 | Schema validation | Bundled with Astro via `astro/zod`; used in `defineCollection()` schemas |
| sharp | 0.34.5 | Image processing | Bundled by Astro; powers `<Image />` → auto WebP conversion + resizing |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | 3.7.2 | Auto-generates sitemap.xml | Add at project init — required for Phase 4 SEO gate |
| @astrojs/react | 5.0.2 | React island hydration | Add now; Phase 3 needs it for contact form and portfolio filter islands |
| @astrojs/check | 0.9.8 | Astro TypeScript diagnostics | Run in CI to catch `.astro` type errors |
| astro-seo | 1.1.0 | Meta tags, OG, Twitter Card | Add now; Phase 4 needs per-page SEO management |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tailwindcss/vite | @astrojs/tailwind | `@astrojs/tailwind` is deprecated for v4; causes build failures |
| astro/zod (bundled) | Standalone zod package | Both work, but `astro/zod` re-exports the same Zod version Astro uses — avoids version conflicts |
| file() loader | Manual import + JSON.parse | file() gives build-time validation + TypeScript types; manual import has none of that |

**Installation:**
```bash
# Step 1 — Create the Astro project (run from repo root)
npm create astro@latest . -- --template minimal --typescript strict --install --no-git

# Step 2 — Add Tailwind CSS v4 (Vite plugin, not the old @astrojs/tailwind)
npx astro add tailwind

# Step 3 — Add React integration (for Phase 3 islands)
npx astro add react

# Step 4 — Add sitemap (always add at init)
npx astro add sitemap

# Step 5 — Supporting libraries
npm install astro-seo @astrojs/check
```

**Version verification:** Versions above verified against npm registry on 2026-04-01.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content.config.ts    # All collection schemas (Zod-validated)
├── data/                # Raw JSON data files (services, team, testimonials)
├── content/
│   └── projects/        # Project .md files (one per case study)
├── styles/
│   ├── global.css       # @import "tailwindcss"; @import "./tokens.css";
│   └── tokens.css       # Phase 1 output — design tokens (ALREADY EXISTS)
├── layouts/
│   └── BaseLayout.astro # HTML shell, viewport meta, global CSS import
├── pages/
│   └── index.astro      # Single-page site entry
├── components/          # Section components (Phase 3)
└── assets/
    ├── logo/            # Phase 1 output — SVG logos (ALREADY EXISTS)
    ├── projects/        # Phase 1 output — placeholder dir (ALREADY EXISTS)
    └── team/            # Phase 1 output — placeholder dir (ALREADY EXISTS)
public/
└── favicon.svg          # Copy from src/assets/logo/gmstudio-icon.svg
```

### Pattern 1: Tailwind v4 + Design Tokens Integration
**What:** Import Tailwind then the Phase 1 tokens file in `global.css`. Use `@theme` to wire CSS custom properties into Tailwind's design system.
**When to use:** Always — this connects the locked brand tokens to Tailwind utilities.
**Example:**
```css
/* src/styles/global.css */
@import "tailwindcss";
@import "./tokens.css";

/* Map CSS custom properties into Tailwind v4 theme */
@theme {
  --color-accent: var(--color-accent);
  --color-bg: var(--color-bg);
  --color-surface: var(--color-surface);
  --color-text: var(--color-text);
  --color-text-muted: var(--color-text-muted);
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);
}
```

### Pattern 2: Content Collections with file() Loader for JSON
**What:** Use Astro's `file()` loader to load JSON data files as type-safe collections validated at build time.
**When to use:** For `services.json`, `team.json`, `testimonials.json` — structured data that doesn't have per-file frontmatter.
**Example:**
```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const services = defineCollection({
  loader: file("src/data/services.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

const team = defineCollection({
  loader: file("src/data/team.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: file("src/data/testimonials.json"),
  schema: z.object({
    id: z.string(),
    author: z.string(),
    role: z.string().optional(),
    photo: z.string().optional(),
    text: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["loja", "cardapio", "landing-page", "institucional"]),
    thumbnail: z.string(),
    liveUrl: z.string().url(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { services, team, testimonials, projects };
```

### Pattern 3: Astro `<Image />` for SEO-02
**What:** Use the built-in `<Image />` component for every project thumbnail and team photo. It auto-converts to WebP, resizes, and adds `loading="lazy"` by default.
**When to use:** Every `<img>` that references an asset in `src/assets/` — never use raw `<img>` tags for local images.
**Example:**
```astro
---
// Source: https://docs.astro.build/en/guides/images/
import { Image } from 'astro:assets';
import projectThumb from '../assets/projects/example.jpg';
---
<Image
  src={projectThumb}
  alt="Project name"
  width={600}
  height={400}
  format="webp"
/>
<!-- Astro adds loading="lazy" automatically for non-above-fold images -->
<!-- format="webp" is the default when format is omitted for local images -->
```

### Pattern 4: BaseLayout with Responsive Viewport (HERO-02)
**What:** A single BaseLayout.astro wraps every page, includes the viewport meta tag, imports global CSS, and sets the mobile-first base styles.
**When to use:** Always — every page uses BaseLayout.
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css';
interface Props {
  title?: string;
  description?: string;
}
const { title = 'GMStudio', description = '' } = Astro.props;
---
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body class="bg-[var(--color-bg)] text-[var(--color-text)]">
    <slot />
  </body>
</html>
```

### Anti-Patterns to Avoid
- **Using `@astrojs/tailwind` with Tailwind v4:** This adapter is deprecated for v4; it causes build failures. Use `@tailwindcss/vite` instead.
- **Importing `zod` directly instead of `astro/zod`:** Causes version mismatch with Astro's internal Zod. Always use `import { z } from 'astro:content'` or `from 'astro/zod'`.
- **Hardcoding hex values in components:** Phase 1 tokens must be the single source. Use `var(--color-accent)` or Tailwind utilities mapped via `@theme`.
- **Using `<img>` instead of `<Image />`:** Raw `<img>` tags bypass sharp and produce no WebP output — SEO-02 fails.
- **Placing the Astro project init in a subdirectory:** The repo root is the project root. `npm create astro@latest .` with a dot initializes in-place.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image WebP conversion | Custom sharp script | Astro `<Image />` component | Handles format, srcset, dimensions, lazy loading in one declaration |
| Schema validation on JSON | Manual JSON.parse + type checks | Astro content collections + Zod | Build-time error, TypeScript types, IDE autocomplete — all free |
| Sitemap generation | Template-based sitemap builder | `@astrojs/sitemap` | Auto-discovers all pages; respects `lastmod`; handles i18n |
| Meta tag management | Manual `<head>` strings | `astro-seo` | Handles OG, Twitter Card, canonical, robots in one component |

**Key insight:** Astro's Content Layer with `file()` loaders makes JSON → TypeScript types completely automatic. Any attempt to wire this manually produces the same result with more code and no build-time validation.

---

## Common Pitfalls

### Pitfall 1: Astro Initialized in a Subdirectory
**What goes wrong:** `npm create astro@latest` defaults to creating a new folder. If run without `.` it creates `my-astro-project/` and the repo structure breaks.
**Why it happens:** The CLI default is a named folder.
**How to avoid:** Always run `npm create astro@latest . -- --template minimal` (note the `.`). Confirm there is no existing `package.json` first (there isn't one in this repo).
**Warning signs:** A new subdirectory appears after running the command.

### Pitfall 2: file() Loader Requires an Array at JSON Root
**What goes wrong:** `file()` loader expects the JSON file to be an array of objects. If the JSON is an object with nested arrays (e.g., `{ "services": [...] }`), the loader fails silently or errors.
**Why it happens:** Astro's `file()` loader maps each array item to a collection entry.
**How to avoid:** Structure all JSON data files as top-level arrays: `[{ "id": "...", ... }, ...]`.
**Warning signs:** `getCollection("services")` returns an empty array even when the JSON file has data.

### Pitfall 3: Tailwind Theme Variables Not Available as Utilities
**What goes wrong:** CSS custom properties from tokens.css are defined but `bg-accent` doesn't work as a Tailwind class because the `@theme` mapping is missing.
**Why it happens:** Tailwind v4 reads theme tokens from `@theme` directives in CSS — it does not auto-import `:root` variables.
**How to avoid:** Explicitly map each brand token under `@theme` in `global.css` (see Pattern 1 above).
**Warning signs:** Tailwind utilities using brand color names compile to transparent or black.

### Pitfall 4: Horizontal Scroll at 360px (HERO-02 Failure)
**What goes wrong:** A fixed-width element (e.g., `min-w-[400px]`) or a non-responsive image causes overflow at 360px viewport width.
**Why it happens:** Not testing at the target breakpoint during development.
**How to avoid:** Set Chrome DevTools to 360px width before committing any layout. Add `overflow-x: hidden` to `<body>` as a safety net, but fix the root cause.
**Warning signs:** Horizontal scrollbar visible on mobile preview.

### Pitfall 5: Font Loading Not Configured
**What goes wrong:** Space Grotesk and Inter (defined in tokens.css) don't load because there is no `<link>` to Google Fonts or a local font file.
**Why it happens:** tokens.css declares the font family names but doesn't include the source.
**How to avoid:** Add Google Fonts `<link preconnect>` + `<link href="...">` to BaseLayout.astro for both Space Grotesk and Inter.
**Warning signs:** Browser DevTools shows fallback system font; font-family in computed styles shows `system-ui`.

---

## Code Examples

### astro.config.mjs (complete Phase 2 config)
```javascript
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gmstudio.pages.dev', // replace with real URL after first deploy
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Querying a content collection in a page
```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content';
const services = await getCollection('services');
const projects = await getCollection('projects');
---
{services.map(s => (
  <div>{s.data.title}</div>
))}
```

### Sample services.json structure (must be top-level array)
```json
[
  {
    "id": "landing-page",
    "title": "Landing Page",
    "description": "Página de conversão de alta performance para campanhas e lançamentos.",
    "icon": "rocket"
  },
  {
    "id": "loja",
    "title": "Loja Online",
    "description": "E-commerce completo com catálogo, carrinho e checkout.",
    "icon": "shopping-bag"
  }
]
```

### Sample project .md frontmatter
```markdown
---
title: "Padaria do João"
category: "loja"
thumbnail: "/src/assets/projects/padaria-joao.jpg"
liveUrl: "https://padaria-joao.com.br"
featured: true
---
```

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|---------|
| Node.js | Astro build toolchain | Yes | v24.8.0 | — |
| npm | Package manager | Yes | 11.6.0 | — |
| npx / Astro CLI | Project init | Yes | Astro 6.1.2 via npx | — |
| Git | Cloudflare Pages trigger | Yes (repo exists) | — | — |
| Cloudflare Pages | Hosting | Unknown (dashboard) | — | Manual deploy via `wrangler pages deploy dist` |

**Missing dependencies with no fallback:** None blocking local development.

**Missing dependencies with fallback:** Cloudflare Pages dashboard setup requires a browser login — not automatable. The planner must include a manual step for the developer to connect the GitHub repo to Cloudflare Pages via the dashboard. First deploy can be verified by `npm run build` locally.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` adapter | `@tailwindcss/vite` Vite plugin | Tailwind v4 + Astro 5.2 (Jan 2025) | Must use new approach; old adapter deprecated for v4 |
| `src/content/config.ts` | `src/content.config.ts` | Astro 5.0 Content Layer | New file path; old path still works but triggers deprecation warning |
| `defineCollection({ type: 'data' })` | `defineCollection({ loader: file(...) })` | Astro 5.0 Content Layer | New loader-based API; old `type: 'data'` triggers legacy mode warning |
| Astro 5.x | Astro 6.1.2 | 2025/2026 | CLAUDE.md says 5.x — actual latest is 6.x. APIs are compatible. Use 6.x. |

---

## Open Questions

1. **Cloudflare Pages project name / production URL**
   - What we know: Astro `site` config requires the production URL for sitemap and canonical tags.
   - What's unclear: The actual Cloudflare Pages project URL (e.g., `gmstudio.pages.dev`) is only known after first deploy.
   - Recommendation: Set a placeholder in `astro.config.mjs`; update after Cloudflare Pages project is created.

2. **Google Fonts vs. self-hosted fonts**
   - What we know: tokens.css references Space Grotesk and Inter; Phase 1 style guide uses Google Fonts CDN links.
   - What's unclear: Whether the team wants fonts self-hosted (better performance, no external request) or via Google Fonts CDN (simpler).
   - Recommendation: Default to Google Fonts CDN for Phase 2 (fastest to implement); self-hosting can be added in Phase 4 as a performance optimization.

3. **Existing `src/` files from Phase 1**
   - What we know: `src/styles/tokens.css`, `src/styles/tokens-preview.html`, `src/assets/logo/`, `src/assets/projects/`, `src/assets/team/` exist from Phase 1.
   - What's unclear: `npm create astro@latest .` may prompt about existing files or overwrite them.
   - Recommendation: Run the Astro init with `--force` flag or accept prompts carefully; verify `src/styles/tokens.css` survives initialization.

---

## Sources

### Primary (HIGH confidence)
- [Astro 5.0 blog](https://astro.build/blog/astro-5/) — Content Layer, Server Islands, Astro 4→5 migration
- [Tailwind CSS Astro installation guide](https://tailwindcss.com/docs/installation/framework-guides/astro) — `@tailwindcss/vite` setup (official)
- [Astro Content Collections API reference](https://docs.astro.build/en/reference/modules/astro-content/) — `file()` loader, `defineCollection`, Zod usage
- [Cloudflare Pages Astro deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) — build command `npm run build`, output dir `dist`
- npm registry (`npm view` commands) — all package versions verified on 2026-04-01

### Secondary (MEDIUM confidence)
- [Tailkits — Astro + Tailwind v4 setup 2026](https://tailkits.com/blog/astro-tailwind-setup/) — confirms `@astrojs/tailwind` deprecation for v4
- [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/) — `file()` loader array requirement

### Tertiary (LOW confidence)
- None — all critical claims verified with official sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry on 2026-04-01
- Architecture: HIGH — patterns sourced from official Astro and Tailwind docs
- Pitfalls: MEDIUM — `file()` array requirement verified via docs; font/token pitfalls from direct analysis of Phase 1 artifacts

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (Astro and Tailwind are actively developed; check for patch releases)
