# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start local dev server at http://localhost:4321
npm run build      # Build static site to dist/
npm run preview    # Preview the production build locally
npm run check      # Run Astro type-check on .astro files
```

Requires Node.js >=22.12.0 and the `PUBLIC_WEB3FORMS_KEY` env var (copy `.env.example` to `.env`).

## Architecture

This is an **Astro 6 + React 19** static site using the [Islands Architecture](https://docs.astro.build/en/concepts/islands/). The page renders as static HTML/CSS; interactive React components are selectively hydrated with `client:` directives.

### Component organization

```
src/components/
  sections/    # Page sections (.astro) — HeroSection, ServicesSection, PortfolioSection, AboutSection, TestimonialsSection, ContactSection
  layout/      # Structural shells (.astro) — Nav, FooterSection
  blocks/      # Interactive React islands (.tsx) — HeroContent, ContactForm, PortfolioIsland, ServicesAnimations
  ui/          # Reusable visual effects (.tsx/.jsx) — AuroraBackground, MagicBento, MagicRings, RippleGrid, ShinyText, Magnet, StatsCounter
```

Each `.tsx`/`.jsx` component that uses hooks or animations must be hydrated in its parent `.astro` file:

```astro
<!-- Required for any React component with state or animations -->
<MagicBento client:load />
<PortfolioIsland client:visible />
```

### Styling system

**Tailwind CSS v4** is loaded as a Vite plugin (not a PostCSS plugin). Design tokens live in `src/styles/tokens.css` and are the single source of truth — **never hardcode hex values**. Tokens are bridged into Tailwind via the `@theme` block in `src/styles/global.css`, making them available as Tailwind utility classes (e.g., `bg-bg`, `text-accent`, `text-text-muted`).

Each UI component keeps its own co-located `.css` file alongside the `.tsx`.

### Design intent

Dark premium aesthetic aligned with Resend/Linear/Vercel. All surfaces use glassmorphism — use the `.glass-card` utility class for card containers. Primary accent is indigo `#6366F1` (`--color-accent`). Typography is Geist Sans / Geist Mono throughout.

### Key files

| File | Purpose |
|------|---------|
| `src/styles/tokens.css` | All CSS custom properties (colors, typography scale, spacing, shadows) |
| `src/styles/global.css` | Tailwind imports + `@theme` bridge + shared utility classes |
| `src/layouts/BaseLayout.astro` | HTML shell, meta/OG tags, floating WhatsApp button |
| `astro.config.mjs` | Astro config — site URL, React/Sitemap integrations, Tailwind Vite plugin |
| `src/content.config.ts` | Astro content collections schema |
| `docs/STYLE-GUIDE.md` | Brand identity reference (colors, logo rules, typography) |

### Form handling

Contact form submits to Web3Forms via `PUBLIC_WEB3FORMS_KEY` (set in `.env`). The key is public (prefixed `PUBLIC_`) and intentionally exposed to the client.

### Deployment

Static output (`dist/`) deploys to Cloudflare Pages (`gmstudio.pages.dev`). Build command: `npm run build`, output directory: `dist`.
