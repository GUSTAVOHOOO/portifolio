# Project Research Summary

**Project:** GMStudio — Site Portfólio
**Domain:** Web development agency portfolio / lead generation (static, mobile-first, Brazilian SMB market)
**Researched:** 2026-03-30
**Confidence:** HIGH

## Executive Summary

GMStudio is a Brazilian web development agency building its own portfolio and lead-generation site from scratch, with no existing brand identity. The site's core job is to convert visiting small-business entrepreneurs into WhatsApp or email inquiries. Research across all four domains converges on a single clear approach: build a fast, static, mobile-first site using Astro 5 + Tailwind CSS v4 deployed to Cloudflare Pages, with all content stored in data files separate from component logic. The target audience — Brazilian SMB owners — accesses the web primarily via mid-range Android devices on 4G connections, which makes performance not a nice-to-have but the baseline for any conversion to happen at all.

The recommended approach is a structured single-page site with anchored sections (Hero, Services, Portfolio, About, Testimonials, Contact) assembled from modular Astro section components fed by JSON and Markdown content collections. The portfolio filter is the only interactive piece and should be implemented with 10 lines of vanilla JS rather than a React island to keep the bundle minimal. Contact channels must be WhatsApp-first, with pre-filled message URLs per section. Brand identity — logo, color tokens, typography — must be finalized and committed as CSS custom properties before any UI component is built; this is the single hardest dependency in the project.

The key risks are not technical. They are: (1) building the site without locked brand identity, forcing a visual rebuild later; (2) writing company-centric hero and services copy that fails to speak to the prospect's problem; (3) shipping a portfolio section with no business context per project, which reduces it to a thumbnail gallery that cannot persuade; and (4) unoptimized images destroying Core Web Vitals on mobile. All four are well-understood, have clear prevention strategies, and should be addressed as phase-gate criteria rather than post-launch cleanup.

---

## Key Findings

### Recommended Stack

Astro 5 is the clear choice for this use case. It generates zero-JS static HTML by default, achieves near-perfect Lighthouse scores, and supports an "islands" model that lets the one interactive piece (the portfolio filter) stay isolated without paying a full framework runtime cost. Tailwind CSS v4 (Oxide engine, CSS-first config) replaces v3 for all new projects and pairs seamlessly with Astro. Motion 11 should be used with `LazyMotion` only where client-side hydration is already happening, never as a site-wide import. Cloudflare Pages hosts the static output for free with unlimited bandwidth, no compute cost, and automatic HTTPS.

For details see: `.planning/research/STACK.md`

**Core technologies:**
- Astro 5: Static site framework — zero-JS by default, Islands Architecture, ~50% smaller bundles than Next.js for static portfolios
- Tailwind CSS v4: Utility-first styling — Rust-based Oxide engine, CSS-first config, industry standard for agency work
- TypeScript 5 (bundled): Type safety — strict template; catches missing content fields at build time
- Motion 11: UI animations — use `LazyMotion` + `domAnimation`; keep initial bundle at ~6KB
- Web3Forms: Contact form backend — free, no backend required, hCaptcha spam protection
- Cloudflare Pages: Hosting — free tier, unlimited bandwidth, global edge CDN

**Critical version note:** Tailwind CSS v4 requires no `tailwind.config.js`; configuration lives in CSS via `@theme` directives. Starting a new project on v3 creates immediate migration debt.

### Expected Features

Features are well-researched with strong differentiation between v1 launch requirements and post-validation additions. The dependency graph is clear: brand identity must exist before any UI, services definition must precede portfolio filter categories, and testimonials must be collected from real clients before the launch checklist can be marked complete.

For details see: `.planning/research/FEATURES.md`

**Must have (table stakes) — v1 launch blockers:**
- Visual brand identity (logo, palette, typography) — blocks all other UI work
- Hero with clear value proposition and primary WhatsApp CTA — visitor decides to stay or leave in ~3s
- Services section (categorical, outcome-led, not technical prose) — confirms agency scope
- Filterable portfolio (6-10 curated projects, by service type) — primary proof of capability
- Testimonials (3-5 real clients, full name + business context) — social proof for first-time buyers
- About / team section with real photos — humanizes; critical for local trust in Brazil
- Contact section: WhatsApp (pre-filled), email, social — the conversion goal
- Mobile-first responsive design — ~70-80% of target audience is on smartphone
- Basic SEO: meta tags, Open Graph (especially for WhatsApp link previews)

**Should have (differentiators) — add after initial launch or concurrent if ready:**
- 2-3 deep case studies (problem + solution + result) — converts skeptical visitors; even 2 beats 10 thumbnails
- Process / how we work section — reduces first-buyer anxiety
- Pricing signal ("a partir de" or tiered packages) — manages budget expectations, qualifies leads
- Pre-filled WhatsApp message per service type — reduces friction at point of contact

**Defer to v2+:**
- Niche service landing pages — high SEO value, high content effort; not worth it until traffic validates
- CMS / admin panel — add when content change frequency demands it
- Blog / editorial content — only if agency commits to consistent content production

### Architecture Approach

The architecture is a JAMstack static site with a clear five-layer build dependency order: foundation (layout, CSS tokens) → data structures (Zod schemas, JSON files) → UI primitives (cards, buttons) → section components (Hero, Portfolio, etc.) → pages (index, optional portfolio slugs). All content lives in `src/content/projects/*.md` (Astro Content Collections with Zod validation for type safety) and `src/data/*.json` (flat JSON for services, team, testimonials). Section components receive data as props at build time; no section component contains hardcoded content. The only runtime JavaScript is the portfolio filter, implemented as an inline `<script>` that reads and writes `data-category` attributes on project card wrappers.

For details see: `.planning/research/ARCHITECTURE.md`

**Major components:**
1. `BaseLayout.astro` — HTML shell, global `<head>`, meta tags, Open Graph; consumed by all pages
2. `src/content/content.config.ts` — Zod schemas for portfolio projects; enforces required fields (title, description, category, year, cover, featured) at build time
3. `PortfolioSection.astro` — filterable project grid; vanilla JS `<script>` handles filter state via DOM data attributes; zero framework runtime cost
4. `ContactSection.astro` — WhatsApp anchor links (pre-filled), Web3Forms integration, email; no backend
5. `pages/index.astro` — clean composition file; imports and orders all section components; should not contain section markup directly
6. `pages/portfolio/[slug].astro` — optional static case study pages generated from content collection at build time

**Key architectural pattern:** Content and presentation are always separate. Portfolio case data (title, client, category, cover, description) lives in `.md` frontmatter and is consumed via `getCollection()`. No content is ever hardcoded inside component logic.

### Critical Pitfalls

Ten pitfalls are documented with prevention strategies, phase mappings, and warning signs. The five most likely to cause project failure or post-launch rework are:

1. **Brand identity built during development, not before it** — Development starts with placeholder colors; when the final brand arrives, every component must be reworked. Prevention: lock logo, palette, and typography as CSS custom properties in `global.css` before any HTML/CSS is written. This is Phase 0 and must be complete before Phase 1 begins.

2. **Company-centric copy that ignores the prospect** — Hero says "Somos a GMStudio, apaixonados por tecnologia." Visitor doesn't recognize their own problem. Prevention: every headline must pass the test "does this speak to the prospect's situation?" Copy should be drafted and reviewed before UI components are built around it.

3. **Portfolio without business context** — Cards show image + title only. Prospects cannot tell if the agency understands their kind of business. Prevention: enforce problem + outcome fields as non-optional in the Zod schema; no card can be created without them.

4. **Unoptimized hero and portfolio images destroying LCP** — PNG screenshots at original resolution cause LCP > 4s on mobile 4G. Lighthouse score drops below 50. Prevention: establish WebP conversion pipeline before the first image is added to the project. Set PageSpeed Insights mobile score ≥ 80 as a launch gate criterion.

5. **WhatsApp CTA with no pre-filled message** — Blank chat window creates friction; prospects close without sending. Prevention: always include a URL-encoded `?text=` parameter; define the WhatsApp number and message templates as constants in a single file.

Additional pitfalls: single CTA buried below the fold (place CTA in Hero, after Portfolio, after Testimonials, in Footer); vague generic testimonials (use 3 specific collection questions); mobile touch target failures (minimum 44x44px, test on real device at 360px); Open Graph missing at launch (must pass WhatsApp link preview test before launch).

---

## Implications for Roadmap

Based on combined research, the phase structure below is strongly recommended. The ordering is driven by three constraints: (1) brand identity is a hard dependency for all UI work, (2) content (copy, project data, testimonials) must be gathered before components that display it are finalized, and (3) the architecture's build dependency graph (foundation → data → UI → sections → pages) must be respected to avoid rework.

### Phase 0: Brand Identity and Content Foundation
**Rationale:** Brand identity (logo, palette, typography) is identified by PITFALLS.md as the single most expensive post-facto fix. FEATURES.md confirms it as the only P1 blocker that precedes all other work. No UI component can be built coherently without locked design tokens. Simultaneously, copy and content gathering should begin here — prospect-focused copy, project case data, and team information need to be drafted before layout locks them in.
**Delivers:** Logo SVG, CSS custom properties file (`--color-primary`, `--font-heading`, etc.), typography decisions, drafted hero copy, draft services descriptions, gathered testimonials, project case data (title, client, category, problem, outcome, cover image) for the portfolio.
**Addresses:** Visual brand identity (P1), company-centric copy pitfall, testimonial quality pitfall.
**Avoids:** Brand-during-development pitfall (highest recovery cost in research); copy retrofitting problem.

### Phase 1: Project Foundation and Data Layer
**Rationale:** ARCHITECTURE.md defines a clear build dependency order. Foundation (Astro project, Tailwind config, BaseLayout, global CSS tokens) must precede all component work. Data structures (Zod schemas, JSON files) must precede section components that consume them. This phase has no UX risk and follows well-documented patterns.
**Delivers:** Initialized Astro 5 project with TypeScript strict, Tailwind v4, Cloudflare Pages deployment pipeline (GitHub → auto-deploy), `BaseLayout.astro`, `global.css` with design tokens from Phase 0, `content.config.ts` Zod schema for projects, `services.json`, `team.json`, `testimonials.json` populated with Phase 0 content, and the image optimization pipeline (WebP, sharp, `<Image />` component).
**Uses:** Astro 5, Tailwind v4, TypeScript strict, `@astrojs/sitemap`, sharp image pipeline, Cloudflare Pages.
**Implements:** Content Collections architecture pattern; data/presentation separation.
**Avoids:** Hardcoded portfolio pitfall; unoptimized image pitfall.

### Phase 2: UI Primitives and Section Components
**Rationale:** With brand tokens and data structures in place, all UI components can be built correctly the first time. The section components follow the page conversion funnel order (Hero → Services → Portfolio → About → Testimonials → Contact). The portfolio filter is implemented with vanilla JS inside the Astro section component, not as a React island. This phase delivers the full single-page site.
**Delivers:** All UI primitive components (`Button`, `ServiceCard`, `ProjectCard`, `TeamMemberCard`, `TestimonialCard`), all section components (`Hero`, `ServicesSection`, `PortfolioSection` with filter, `AboutSection`, `TestimonialsSection`, `ContactSection`), `Navbar` and `Footer`, and the composed `pages/index.astro`.
**Implements:** Islands architecture (filter-only JS); component section anatomy from ARCHITECTURE.md; WhatsApp pre-filled CTAs; floating WhatsApp button.
**Avoids:** React island for filter pitfall; single CTA pitfall (CTA placed in Hero, post-Portfolio, post-Testimonials, Footer); mobile touch target pitfall (44x44px minimum, mobile-first breakpoints).

### Phase 3: SEO, Performance, and Pre-Launch Hardening
**Rationale:** PITFALLS.md maps Open Graph and image optimization to a "launch gate" — these are not optional polish but required for the site to function correctly in the Brazilian market (WhatsApp link previews are essential for word-of-mouth). Performance must be validated on real mobile devices before launch.
**Delivers:** `astro-seo` integration with per-page meta tags, Open Graph (`og:locale=pt_BR`, `og:image` 1200x630), Twitter Card; `@astrojs/sitemap` sitemap.xml; PageSpeed Insights mobile score ≥ 80; LCP ≤ 2.5s; CLS ≤ 0.1; WhatsApp link preview verified on real device; all launch checklist items from PITFALLS.md cleared.
**Addresses:** Open Graph pitfall; LCP image pitfall; all "looks done but isn't" checklist items.
**Avoids:** Post-launch SEO remediation; invisible WhatsApp share preview failure.

### Phase 4: Case Studies and Post-Validation Enhancements
**Rationale:** FEATURES.md explicitly places deep case studies and conversion optimizations in v1.x (after validation), not v1 launch. The rationale: write case studies for the service types that generate the most inquiries first. This phase should be triggered by real lead data, not scheduled in advance.
**Delivers:** 2-3 deep case study pages (`pages/portfolio/[slug].astro`), process/how-we-work section, pricing tier section ("a partir de"), per-service pre-filled WhatsApp messages.
**Addresses:** Case studies (P2), process section (P2), pricing transparency (P2).
**Trigger:** After first 10-20 qualified leads — identify which service types they want, write case studies for those niches first.

### Phase Ordering Rationale

- Brand identity before all UI is the hardest constraint — PITFALLS.md rates a post-development brand redesign as HIGH recovery cost. There is no workaround.
- Content (copy, project data) before UI components prevents the common pattern of retrofitting prospect-focused copy into a layout built around company-centric placeholders.
- Data layer before section components follows ARCHITECTURE.md's explicit build dependency graph and ensures Zod schemas enforce required content fields (problem, outcome) from day one.
- Performance and SEO as a dedicated phase (not retrofitted post-launch) is justified by the Brazilian 4G mobile context — a slow first impression is a lost lead.
- Case studies deferred to post-validation is justified by FEATURES.md's analysis: writing them for the wrong service type wastes the highest content effort items in the backlog.

### Research Flags

Phases with standard patterns (research-phase not needed during planning):
- **Phase 1 (Foundation):** Astro + Tailwind v4 setup is thoroughly documented. Cloudflare Pages deployment is zero-config for Astro static output. Well-established.
- **Phase 3 (SEO/Performance):** astro-seo and sitemap integrations are official Astro packages with complete documentation.

Phases that may benefit from research during planning:
- **Phase 0 (Brand Identity):** Brand design methodology is outside the technical research scope. Specific brand direction decisions (visual identity for a Brazilian web agency in 2026) may warrant a targeted creative research pass before design work begins.
- **Phase 2 (Portfolio Filter UX):** If the vanilla JS filter approach proves insufficient (e.g., animated transitions between filter states, URL-persistent filter state for sharing), a lightweight upgrade path to Alpine.js (7KB) is documented in ARCHITECTURE.md. No separate research needed unless that feature is added.
- **Phase 4 (Case Studies):** Case study page design patterns are moderately documented; if the team wants advanced narrative layouts, a focused research pass on conversion-optimized case study page structures would be worthwhile.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core recommendations (Astro 5, Tailwind v4, Cloudflare Pages) verified against official documentation, release notes, and multiple industry comparisons. Version compatibility table confirmed. |
| Features | HIGH | Feature prioritization based on multiple agency portfolio analyses including Brazilian market sources (Clutch BR, DesignRush BR) and global conversion research. MVP definition is opinionated and well-supported. |
| Architecture | HIGH | Component structure and data flow patterns sourced directly from Astro official documentation. Build dependency order is internally consistent and validated against known anti-patterns. |
| Pitfalls | HIGH | All 10 pitfalls verified across multiple independent sources including official platform documentation, Brazilian SMB market research, and Core Web Vitals data. Warning signs are specific and actionable. |

**Overall confidence:** HIGH

### Gaps to Address

- **Real content availability:** PROJECT.md notes that project images, team photos, and testimonials must be provided by the client. This is the primary non-technical dependency. The development timeline for Phase 2 cannot be finalized without knowing when this content is available. Establish a content delivery deadline before Phase 1 begins.

- **Brand identity timeline:** The GMStudio brand (logo, palette, typography) does not exist yet and is in scope. Phase 0 duration depends on the design process being used (self-designed vs. commissioned). The roadmap should treat brand sign-off as a hard gate before Phase 1 starts.

- **WhatsApp phone number:** The actual business phone number for Web3Forms/WhatsApp CTAs is not documented in PROJECT.md. This is needed as a constant before ContactSection is built. Low risk but must be collected during Phase 0.

- **Web3Forms vs. WhatsApp-only contact:** PITFALLS.md notes that a contact form pointing to a PHP script is a security issue; Web3Forms resolves this. However, for the Brazilian SMB market, WhatsApp-only contact (no form) is also a valid and lower-friction choice. This decision should be made before Phase 2.

---

## Sources

### Primary (HIGH confidence)
- [Astro 5 official blog](https://astro.build/blog/astro-5/) — framework features, Islands Architecture
- [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/) — data layer patterns
- [Astro Project Structure docs](https://docs.astro.build/en/basics/project-structure/) — file organization
- [Cloudflare Pages limits docs](https://developers.cloudflare.com/pages/platform/limits/) — free tier confirmed
- [Motion docs — bundle size](https://motion.dev/docs/react-reduce-bundle-size) — LazyMotion details
- [shadcn/ui — Tailwind v4 support](https://ui.shadcn.com/docs/tailwind-v4) — v4 compatibility confirmation
- [Astro @astrojs/sitemap docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap integration

### Secondary (MEDIUM confidence)
- [Makersden.io — Next.js vs Astro 2025](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website) — framework performance comparison
- [Pagepro — Astro vs Next.js 2026](https://pagepro.co/blog/astro-nextjs/) — bundle size benchmarks
- [Web3Forms static site contact](https://web3forms.com/blog/working-contact-forms-static-websites) — contact form implementation
- [Unicorn Platform — Agency Portfolio Sites 2026](https://unicornplatform.com/blog/agency-portfolio-sites-in-2026/) — portfolio conversion patterns
- [Webflow Blog — Case study writing](https://webflow.com/blog/write-the-perfect-case-study) — case study structure
- [Clutch BR](https://clutch.co/br/web-developers) / [DesignRush BR](https://www.designrush.com/agency/website-design-development/br) — Brazilian agency portfolio analysis
- [CTA Placement Strategies 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages) — above-fold conversion data (304% advantage cited)
- [Core Web Vitals 2025 guide](https://mobileproxy.space/en/pages/core-web-vitals-2025-the-complete-guide-to-lcp-cls--inp-for-mobile-and-desktop.html) — LCP, CLS thresholds
- [Image optimization guide 2026](https://requestmetrics.com/web-performance/high-performance-images/) — WebP, srcset strategy
- [WhatsApp Business best practices 2025](https://www.zoko.io/post/whatsapp-business-best-practices-success) — CTA and message design
- [SEO Local para Pequenas Empresas 2026](https://agenciakaizen.com.br/melhores-praticas-em-seo-para-pequenas-empresas-em-2026/) — local SEO in Brazil

### Tertiary (LOW confidence)
- [Best One-Page Portfolio Templates — DevPortfolioTemplates](https://www.devportfoliotemplates.com/blog/best-one-page-portfolio-templates-for-web-developers) — portfolio patterns (single article, secondary source)

---

*Research completed: 2026-03-30*
*Ready for roadmap: yes*
