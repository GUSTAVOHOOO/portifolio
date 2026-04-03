# Phase 3: UI Components & Site Sections - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Build every section of the single-page portfolio site and compose them into a complete, shippable homepage. Sections in scope: Hero, Services, Portfolio, About, Testimonials, Contact. Navigation and floating WhatsApp button are also in scope.

Requirements in scope: HERO-01, PORTF-01, PORTF-02, SERV-01, SERV-02, ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, TESTI-01, CONT-01, CONT-02, CONT-03, CONT-04

Out of scope for this phase: portfolio filter by category (PORTF-03, v2), case study pages (PORTF-05, v2), SEO meta tags and Open Graph (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- **D-HERO-01:** Centered stack layout — large Space Grotesk bold headline, subtitle below, CTAs below that. No split layout.
- **D-HERO-02:** Full-width dark background with an indigo (#6366F1) radial glow/gradient behind the headline as the visual element. No device mockup or illustration required — zero content dependency.
- **D-HERO-03:** Two CTAs: primary = WhatsApp button (filled, accent color), secondary = "Ver portfólio" (ghost/outline). Primary CTA must be visible above the fold at 360px mobile width without scrolling.
- **D-HERO-04:** Hero copy is placeholder text until client provides final tagline and subtitle. Use "Presença digital que converte" as working headline placeholder.

### Navigation
- **D-NAV-01:** Sticky top nav — fixed to top on scroll, does not collapse.
- **D-NAV-02:** Desktop: logo left, anchor links right (Serviços · Portfólio · Sobre · Contato).
- **D-NAV-03:** Mobile: logo left, hamburger icon right → tapping opens a slide-down drawer with the same anchor links.
- **D-NAV-04:** Nav implemented as an Astro component (`src/components/Nav.astro`) with a small React island (`client:load`) only for the hamburger toggle state. Everything else is static HTML.

### Portfolio Grid
- **D-PORTF-01:** Static grid — no filter UI in Phase 3. Filter is v2 (PORTF-03).
- **D-PORTF-02:** Desktop: 3-column grid. Tablet: 2-column. Mobile: 1-column (full width).
- **D-PORTF-03:** Each card shows: project thumbnail, project name, category tag. Clicking the card opens the live site in a new tab (PORTF-02). Card uses glassmorphism style (subtle border + backdrop-filter blur or surface tint) consistent with Phase 1 D-05.
- **D-PORTF-04:** Data sourced from Astro content collection (`projects`) already wired in Phase 2.

### Testimonials
- **D-TESTI-01:** Auto-scrolling horizontal marquee — infinite loop, no user interaction required.
- **D-TESTI-02:** Pure CSS animation (`@keyframes scroll` + `animation: scroll linear infinite`) — no JavaScript, no Motion library. Zero bundle cost, no Core Web Vitals impact.
- **D-TESTI-03:** Each testimonial card shows: quote text, client name, client photo (if available), company/context. Glassmorphism card style.
- **D-TESTI-04:** Data sourced from `testimonials` content collection already wired in Phase 2.

### Contact Section
- **D-CONT-01:** WhatsApp-primary — large WhatsApp CTA button is the visual hero of the contact section. Form is secondary, placed below the WhatsApp block.
- **D-CONT-02:** Contact form fields (CONT-02): name, email, project type (select), message. Submitted via Web3Forms API (client-side POST, no backend needed).
- **D-CONT-03:** Contact section also shows: agency email displayed as plain text (CONT-04), social links — Instagram and LinkedIn (CONT-03).
- **D-CONT-04:** Contact form implemented as a React island (`client:load`) — form submission requires JS. The rest of the contact section is static Astro.
- **D-CONT-05:** Floating WhatsApp button (CONT-01) is a fixed-position element in `BaseLayout.astro` — visible on every section, pre-filled message in the WhatsApp URL.

### Scroll Animations
- **D-ANIM-01:** Fade-up entrance animation on all page sections as they enter the viewport.
- **D-ANIM-02:** Implementation: pure CSS `@keyframes` (opacity 0→1, translateY 20px→0) triggered by Intersection Observer API in a small inline script or Astro script tag. No Motion/Framer Motion library — keeps bundle at zero.
- **D-ANIM-03:** Hover animations on cards (subtle lift + border glow) implemented with Tailwind `transition` utilities only — no JS.

### Visual Style (carrying forward from Phase 1)
- **D-STYLE-01:** Dark premium aesthetic throughout — bg (#0A0A0F / `--color-bg`), surface (`--color-surface`), accent indigo #6366F1.
- **D-STYLE-02:** Cards use glassmorphism — `backdrop-filter: blur`, subtle `--color-border`, surface tint. No flat textureless surfaces.
- **D-STYLE-03:** Design references: Linear.app, Resend.com, Vercel.com — confident, polished, detail-rich. Not minimalist.
- **D-STYLE-04:** Fonts already loaded in `BaseLayout.astro`: Space Grotesk (headings, `font-heading`) and Inter (body, `font-body`).

### Component Architecture
- **D-ARCH-01:** One `.astro` component per section: `HeroSection.astro`, `ServicesSection.astro`, `PortfolioSection.astro`, `AboutSection.astro`, `TestimonialsSection.astro`, `ContactSection.astro`.
- **D-ARCH-02:** `src/pages/index.astro` composes all section components in order — this replaces the Phase 2 verification page.
- **D-ARCH-03:** React islands used only where JS is required: hamburger nav toggle, contact form submission. Everything else is static Astro.
- **D-ARCH-04:** All data comes from Astro content collections already wired in Phase 2 — no new data files needed.

### Claude's Discretion
- Exact spacing between sections (padding/margin values)
- SVG icons for service cards (from astro-icon or inline SVG)
- Exact wording of placeholder copy (hero tagline, service descriptions, about text)
- Number of "work process" steps in SERV-02 (briefing → desenvolvimento → entrega is the known flow)
- Exact glassmorphism values (blur amount, border opacity, surface opacity)
- Animation timing values (duration, easing, delay stagger between sections)

</decisions>

<specifics>
## Specific Ideas

- The site IS the portfolio — the design of the site itself must demonstrate the agency's craft. Every section is a showcase.
- Target audience is Brazilian empreendedores who communicate primarily via WhatsApp — the floating WhatsApp button and the WhatsApp-primary contact section reflect this reality.
- Mobile-first: 360px is the baseline. Every layout decision must work at that width first.
- The hero indigo glow is the visual anchor — it should feel like opening Linear or Vercel for the first time.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/REQUIREMENTS.md` — Full v1 requirements; HERO-01, PORTF-01/02, SERV-01/02, ABOUT-01–04, TESTI-01, CONT-01–04 definitions
- `.planning/ROADMAP.md` §"Phase 3" — Success criteria (5 items) defining what "done" means
- `.planning/phases/01-brand-identity-content-foundation/1-CONTEXT.md` — Brand decisions: colors, typography, glassmorphism cards, visual references (Linear/Resend/Vercel), logo paths
- `src/styles/tokens.css` — CSS custom properties: `--color-bg`, `--color-surface`, `--color-accent`, `--color-accent-hover`, `--color-text`, `--color-text-muted`, `--color-border`
- `src/layouts/BaseLayout.astro` — Existing layout shell with fonts loaded, body classes set, slot for page content
- `src/content.config.ts` — Content collection schemas (projects, services, team, testimonials) already validated
- `src/data/` — `services.json`, `team.json`, `testimonials.json` — populated data files
- `src/pages/index.astro` — Current Phase 2 verification page — this file gets replaced by the real homepage in Phase 3

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BaseLayout.astro` — Full HTML shell with Space Grotesk + Inter loaded via Google Fonts, Tailwind applied, `bg-bg text-text font-body` on body
- `src/styles/tokens.css` — All brand tokens as CSS custom properties, already mapped to Tailwind `@theme`
- `src/styles/global.css` — Global styles (imports tokens.css)
- `src/assets/logo/` — Logo SVGs (primary + favicon variant) from Phase 1
- `src/assets/projects/` — Project thumbnails (placeholder + real images from Phase 1)
- `src/assets/team/` — Team photos from Phase 1
- Content collections: `projects`, `services`, `team`, `testimonials` — all wired, schemas validated, data populated

### Established Patterns
- Content fetched via `getCollection()` from `astro:content`
- Images served via Astro `<Image />` component for WebP conversion + lazy loading (SEO-02)
- Tailwind utility classes with CSS custom property tokens (e.g., `bg-surface`, `text-accent`, `border-border`)
- `font-heading` and `font-body` utilities available via Tailwind theme

### Integration Points
- `src/pages/index.astro` — Replace Phase 2 verification content with real homepage composition
- `BaseLayout.astro` — Add floating WhatsApp button (fixed position) here so it appears on every page
- `src/components/` — Create all section components here (directory may not exist yet)

</code_context>

<deferred>
## Deferred Ideas

- Portfolio filter by category (PORTF-03) — v2 requirement, explicitly out of Phase 3 scope
- Individual case study pages (PORTF-04, PORTF-05) — v2, own phase
- Star ratings on testimonials (TESTI-02) — v2 requirement
- Detailed service pricing (SERV-04) — v2, client decision needed
- `/style-guide.astro` visual page — deferred from Phase 1, still out of scope (not blocking launch)

</deferred>

---

*Phase: 03-ui-components-site-sections*
*Context gathered: 2026-04-03*
