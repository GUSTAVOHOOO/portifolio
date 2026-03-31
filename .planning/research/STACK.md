# Stack Research

**Domain:** Agency portfolio website (static, content-focused, mobile-first)
**Researched:** 2026-03-30
**Confidence:** HIGH

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.x (latest: 5.16+) | Static site framework | Zero-JS by default, Islands Architecture, near-perfect Lighthouse scores for content sites. Massively outperforms Next.js for static portfolios — 50-70% smaller JS bundles. Static output deploys to any CDN with zero server compute cost. |
| TypeScript | 5.x (bundled via Astro) | Type safety | Astro ships with first-class TypeScript support; use `strict` template. Catches errors at build time, not in production. |
| Tailwind CSS | 4.x (v4.1+, released Jan 2025) | Utility-first styling | New Oxide engine (Rust-based) is faster than v3. CSS-first config via `@theme` directives replaces JS config file. No build tool required. Industry standard for agency work in 2025. |
| Motion (formerly Framer Motion) | 11.x | UI animations | The de facto React animation standard. Rebranded from Framer Motion to Motion in 2024. For portfolio sites, use `LazyMotion` to keep initial bundle at ~6KB. Best DX for scroll-triggered entrances, hover effects, and page transitions. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | 3.x | Auto-generates sitemap.xml | Always — add at project init. Reduces search engine indexing time ~50% according to benchmarks. |
| astro-seo | 0.8.x | Meta tags, Open Graph, Twitter Card | Always — simplifies per-page SEO head management into a single component. |
| @astrojs/react | 4.x | React component hydration | Only for interactive islands (contact form, portfolio filter). Pure `.astro` files for everything static. |
| Web3Forms | N/A (HTTP API) | Contact form backend | Free plan handles unlimited forms with hCaptcha spam protection, email delivery, no backend needed. No monthly fee unlike Formspree ($10/mo). |
| astro-icon | 1.x | SVG icon management | For social icons, service icons, UI icons. Loads only used icons, zero unused SVG payload. |
| sharp | Latest (bundled by Astro) | Image optimization | Astro's built-in `<Image />` component uses sharp. Enable via `@astrojs/image` integration for automatic WebP conversion and lazy loading. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Cloudflare Pages | Hosting + CDN | Free tier: unlimited bandwidth, unlimited seats, 100 custom domains, 500 builds/month. Best for static sites due to global edge network and no bandwidth caps — unlike Vercel/Netlify which cap free tier at 100GB/mo. |
| GitHub | Source control + CI trigger | Cloudflare Pages connects to GitHub; `git push` triggers build and deploy automatically. Free for public and private repos. |
| VS Code + Astro extension | IDE support | Official Astro VS Code extension provides syntax highlighting, IntelliSense, and error checking for `.astro` files. |
| ESLint + Prettier | Code quality | Use `eslint-plugin-astro` for Astro-specific linting rules. Prettier with `prettier-plugin-astro` for consistent formatting. |

---

## Installation

```bash
# Create project with Astro's strict TypeScript template
npm create astro@latest gmstudio-site -- --template strict

# Navigate to project
cd gmstudio-site

# Add Tailwind CSS v4
npx astro add tailwind

# Add React for interactive islands
npx astro add react

# Add sitemap generation
npx astro add sitemap

# Supporting libraries
npm install motion astro-seo astro-icon

# Dev dependencies
npm install -D prettier prettier-plugin-astro eslint eslint-plugin-astro
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro 5 | Next.js 15 | Only if the site needs user auth, API routes, real-time data, or the team is already deeply invested in Next.js and does not want to learn Astro. For a static portfolio, Next.js adds ~40-50KB of runtime JS that serves no purpose. |
| Astro 5 | Gatsby | Never — Gatsby is in maintenance mode as of 2023, no longer actively developed by Netlify. Community has migrated to Astro. |
| Tailwind CSS v4 | CSS Modules | If you strongly prefer scoped styles. Tailwind v4 is the better choice for agency work: faster iteration, consistent design tokens, no class naming overhead. |
| Motion | GSAP | If you need advanced timeline-sequencing, SVG morphing, or scroll-scrubbing animations beyond simple entrances and hover states. GSAP has a more complex API but more raw control. For a portfolio with scroll animations and hover effects, Motion is sufficient and has better React ergonomics. |
| Cloudflare Pages | Vercel | If the project ever adds Next.js with SSR. Vercel has first-party Next.js support. For static Astro, Cloudflare Pages is better due to unlimited bandwidth. |
| Cloudflare Pages | Netlify | Netlify's free tier caps bandwidth at 100GB/month and recently changed pricing unfavorably. Cloudflare Pages has no bandwidth limit on free tier. |
| Web3Forms | Formspree | Formspree is only better if you need advanced workflows (Zapier triggers, CRM integrations). For simple contact → email, Web3Forms is free and sufficient. |
| Web3Forms | Resend | Resend is an email sending API — use it only if building a custom backend form handler. No backend is needed for this project; Web3Forms is the right abstraction level. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Gatsby | Maintenance mode since 2023 — Netlify shut down active development. Long build times, complex plugin ecosystem, dependency hell. | Astro 5 |
| Create React App (CRA) | Deprecated, archived. No SSG, no routing, terrible performance for content sites. | Astro 5 |
| WordPress (self-hosted) | Requires PHP server, database, security patching, plugin updates. Violates the constraint of "no paid platforms and easy to maintain". | Astro 5 + Web3Forms |
| Next.js App Router for this use case | SSR requires persistent server compute (Vercel costs scale with traffic). Zero benefit over Astro for a static portfolio. Adds React runtime to every page. | Astro 5 |
| Tailwind CSS v3 | v4 is stable and released (Jan 2025). v3 is still maintained but v4 is faster, smaller, and CSS-first. Starting a new project in v3 creates immediate migration debt. | Tailwind CSS v4 |
| Bootstrap 5 | Low design flexibility, dated aesthetic, heavier than Tailwind, requires jQuery-era mental model. Agency portfolios need a distinctive look — Bootstrap templates all look alike. | Tailwind CSS v4 |
| Contentful / Sanity CMS | PROJECT.md explicitly defers CMS to v2. Adding a CMS now introduces an external service dependency, a new learning curve, and monthly cost. Content is static and team-managed. | Hard-coded Astro content collections (type-safe, zero cost) |
| Framer (the design tool, not the animation library) | Framer-as-website-builder locks the agency into a $19+/mo subscription, exports non-portable code, and limits custom development. Defeats the purpose of building a custom portfolio. | Astro 5 |

---

## Stack Patterns by Variant

**For the portfolio grid with category filtering:**
- Use a React island (`client:load`) for the filter interaction
- Keep project cards as Astro components for static rendering
- Pass project data via Astro content collections (type-safe JSON/YAML)
- Because: filter state is the only dynamic behavior needed — no need to hydrate the entire page

**For contact form:**
- Use a React island (`client:load`) for the form component
- POST to Web3Forms API endpoint from the client
- Because: form submission requires JS, but the rest of the page stays static HTML

**For animations:**
- Use Motion's `<motion.div>` inside React islands where client-side hydration is already happening
- Use CSS `@keyframes` or Tailwind's `animate-*` utilities for simple static animations (hero fade-in, etc.)
- Because: importing Motion for purely static sections adds JS weight unnecessarily

**If a CMS is added in v2:**
- Astro Content Layer (introduced in Astro 5) accepts custom loaders for Sanity, Contentful, Notion, etc.
- No architecture change required — swap hard-coded collections for CMS-backed loaders

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| astro@5.x | tailwindcss@4.x | Use `@astrojs/tailwind` integration; v4 requires no `tailwind.config.js` — all config in CSS |
| astro@5.x | @astrojs/react@4.x | React 18 and 19 both supported; use React 19 for new projects |
| motion@11.x | react@19 | Fully compatible; use `LazyMotion` + `domAnimation` feature set to minimize bundle |
| tailwindcss@4.x | eslint@9.x | Use `eslint-config-tailwindcss` for class-order linting |

---

## Sources

- [Astro 5 official blog — Astro 5.0 release](https://astro.build/blog/astro-5/) — Features and architecture (HIGH confidence)
- [Makersden.io — Next.js vs Astro for marketing websites](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website) — Framework comparison (MEDIUM confidence)
- [Pagepro — Astro vs Next.js 2026](https://pagepro.co/blog/astro-nextjs/) — Performance benchmarks (MEDIUM confidence)
- [Motion official docs — Bundle size](https://motion.dev/docs/react-reduce-bundle-size) — LazyMotion details (HIGH confidence)
- [shadcn/ui docs — Tailwind v4 support](https://ui.shadcn.com/docs/tailwind-v4) — Tailwind v4 compatibility confirmation (HIGH confidence)
- [Cloudflare Pages docs — Limits](https://developers.cloudflare.com/pages/platform/limits/) — Free tier limits (HIGH confidence)
- [Web3Forms — Static site contact forms](https://web3forms.com/blog/working-contact-forms-static-websites) — Contact form setup (MEDIUM confidence)
- [Astro docs — @astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — Sitemap integration (HIGH confidence)
- [Astro boilerplate with React + TypeScript + Tailwind](https://github.com/ixartz/Astro-boilerplate) — Community-validated setup pattern (MEDIUM confidence)

---

*Stack research for: GMStudio agency portfolio site (static, mobile-first, low-cost)*
*Researched: 2026-03-30*
