# Phase 4: SEO, Performance & Pre-launch Hardening - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Get the built site through every launch gate: WhatsApp link preview shows the correct image, PageSpeed mobile score ≥80, Core Web Vitals LCP ≤2.5s and CLS ≤0.1, sitemap indexed, robots.txt clean.

Requirements in scope: SEO-01, SEO-03

Out of scope: SEO-04 (full meta tags per page — v2), animation refactor with React (v2), any new UI sections.

</domain>

<decisions>
## Implementation Decisions

### Open Graph & Social Preview (SEO-01)
- **D-OG-01:** OG image is a static file at `public/og-image.png`, sized 1200×630px. Created in this phase using the GMStudio logo as the main visual element. No dynamic generation (Satori/astro-og) — single-page site doesn't need it.
- **D-OG-02:** OG title: `"GMStudio — Presença digital para empresas"`
- **D-OG-03:** OG description: `"Criamos lojas online, cardápios digitais, landing pages e sites institucionais para empreendedores brasileiros."`
- **D-OG-04:** OG tags added to `BaseLayout.astro` `<head>` — applies site-wide. Tags to include: `og:title`, `og:description`, `og:image` (absolute URL using `Astro.site`), `og:type` (`website`), `og:url`, `og:locale` (`pt_BR`). Also add Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) alongside OG.

### Performance Strategy
- **D-PERF-01:** Run first, fix after. Measure PageSpeed Insights mobile on the deployed site first — only fix what fails the ≥80 score or LCP/CLS thresholds. No preventive animation audit.
- **D-PERF-02:** Existing CSS animations (marquee, fade-up) are not touched unless PageSpeed flags them. React animation work is deferred to v2.

### WhatsApp Configuration
- **D-WA-01:** Real WhatsApp number: `5543996142514` (replaces `5511999999999` placeholder in `BaseLayout.astro` and any other location it appears).
- **D-WA-02:** Pre-filled message: `"Olá, vim pelo site da GMStudio"` (keep existing).

### Sitemap & robots.txt (SEO-03)
- **D-SEO-01:** `@astrojs/sitemap` is already installed and configured in `astro.config.mjs` with `site: 'https://gmstudio.pages.dev'`. No additional setup needed — it auto-generates `sitemap-index.xml` at build time.
- **D-SEO-02:** `public/robots.txt` created with:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://gmstudio.pages.dev/sitemap-index.xml
  ```
  No paths to exclude. All bots allowed.

### Claude's Discretion
- Exact layout/design of the OG image (logo placement, background color, typography — use brand tokens: dark bg `#0A0A0F`, accent indigo `#6366F1`)
- Whether to use `canvas`, SVG, or a design tool to produce `og-image.png`
- Order of OG/Twitter meta tags in `<head>`
- Verification method for WhatsApp preview (WhatsApp link preview debugger or actual device test)

</decisions>

<specifics>
## Specific Details

- WhatsApp phone: `5543996142514`
- OG image path: `public/og-image.png` (served at `https://gmstudio.pages.dev/og-image.png`)
- Production URL: `https://gmstudio.pages.dev`
- Sitemap URL: `https://gmstudio.pages.dev/sitemap-index.xml`
- Performance strategy: measure first, fix only what fails — no premature optimization
- React animations are explicitly v2 and not part of Phase 4 scope

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/REQUIREMENTS.md` — SEO-01 and SEO-03 definitions
- `.planning/ROADMAP.md` §"Phase 4" — Success criteria (3 items): WhatsApp preview, PageSpeed ≥80, sitemap+robots
- `src/layouts/BaseLayout.astro` — Where OG tags and WhatsApp phone number are added
- `astro.config.mjs` — `site` property set to `https://gmstudio.pages.dev`; sitemap integration already registered
- `src/styles/tokens.css` — Brand colors for OG image design (`--color-bg: #0A0A0F`, `--color-accent: #6366F1`)
- `src/assets/logo/` — Logo SVGs for use in OG image creation
- `.planning/phases/03-ui-components-site-sections/03-CONTEXT.md` — Phase 3 decisions carried forward (visual style, WhatsApp message)

</canonical_refs>

<code_context>
## Existing Code Insights

### Already in place
- `astro.config.mjs` — `site: 'https://gmstudio.pages.dev'`, `sitemap()` integration registered, `react()` integration
- `BaseLayout.astro` — Has `<title>` and `<meta name="description">` but **no OG or Twitter tags yet**. Has WhatsApp button with placeholder number `5511999999999`
- `src/styles/tokens.css` — Brand tokens available for OG image design
- `src/assets/logo/` — Logo SVGs from Phase 1

### What needs to be created/changed
- `public/og-image.png` — New file, 1200×630px, logo-based
- `public/robots.txt` — New file
- `BaseLayout.astro` — Add OG/Twitter meta tags; replace WhatsApp phone placeholder with real number

### Integration points
- `Astro.site` in BaseLayout gives the absolute base URL for `og:image` construction

</code_context>

<deferred>
## Deferred Ideas

- React-based animations — v2, explicitly out of Phase 4 scope
- Per-page SEO meta tags (SEO-04) — v2 requirement
- PageSpeed animation audit — only if score fails after measuring
- WhatsApp Business API or advanced CRM integration — out of scope for v1

</deferred>

---

*Phase: 04-seo-performance-pre-launch-hardening*
*Context gathered: 2026-04-03*
