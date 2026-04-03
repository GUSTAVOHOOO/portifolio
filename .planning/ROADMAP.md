# Roadmap: GMStudio — Site Portfólio

## Overview

GMStudio builds its portfolio and lead-generation site in four sequential phases. The journey starts with brand identity — the single hard dependency that blocks all UI work — then establishes the technical foundation, assembles all site sections, and finally hardens SEO and performance for launch in the Brazilian mobile market. Each phase gate is an observable state: design tokens exist, the project deploys, the full site is live, the site passes WhatsApp preview and PageSpeed checks.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Brand Identity & Content Foundation** - Create logo, design tokens, and gather all content before any UI work starts
- [ ] **Phase 2: Project Foundation & Data Layer** - Initialize Astro 5 + Tailwind v4, deploy to Cloudflare Pages, and wire up all content schemas and data files
- [ ] **Phase 3: UI Components & Site Sections** - Build all section components and compose the full single-page site
- [ ] **Phase 4: SEO, Performance & Pre-launch Hardening** - Validate Open Graph, Core Web Vitals, sitemap, and launch checklist

## Phase Details

### Phase 1: Brand Identity & Content Foundation
**Goal**: GMStudio has a locked visual identity and all content ready before any UI component is written
**Depends on**: Nothing (first phase)
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04
**Success Criteria** (what must be TRUE):
  1. Logo SVG exists in at least two variations (primary and monochrome) and a favicon file
  2. Color palette is expressed as named CSS custom properties (`--color-primary`, `--color-secondary`, etc.) in a single file
  3. Typography choices (heading font and body font) are documented with weights and line-height scale
  4. A one-page style guide documents correct and incorrect usage of logo, colors, and fonts
**Plans**: 4 plans

Plans:
- [ ] 01-02-PLAN.md — CSS design token file (src/styles/tokens.css)
- [ ] 01-03-PLAN.md — Logo design and production (src/assets/logo/)
- [ ] 01-04-PLAN.md — Brand style guide (docs/STYLE-GUIDE.md)
- [ ] 01-05-PLAN.md — Content asset structure and gathering checklist

### Phase 2: Project Foundation & Data Layer
**Goal**: A deployable Astro 5 project exists on Cloudflare Pages with brand tokens integrated, all content schemas validated, and all data files populated
**Depends on**: Phase 1
**Requirements**: HERO-02, SEO-02
**Success Criteria** (what must be TRUE):
  1. Running `npm run build` produces a clean static output and deploys automatically to Cloudflare Pages on every git push
  2. The site is accessible at the production URL on mobile at 360px width without horizontal scroll
  3. An image added to the project is served as WebP with correct dimensions and lazy loading applied via the Astro `<Image />` component
  4. All content data files (`services.json`, `team.json`, `testimonials.json`, project `.md` files) pass Zod schema validation at build time
**Plans**: TBD
**UI hint**: yes

### Phase 3: UI Components & Site Sections
**Goal**: The full single-page portfolio site is live with all sections — Hero, Services, Portfolio, About, Testimonials, Contact — assembled and functional
**Depends on**: Phase 2
**Requirements**: HERO-01, PORTF-01, PORTF-02, SERV-01, SERV-02, ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, TESTI-01, CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. A visitor landing on the site can read the agency's value proposition and tap a WhatsApp CTA without scrolling on a 360px mobile screen
  2. The portfolio grid displays all project thumbnails with name and category; clicking a project card opens the live site in a new tab
  3. The floating WhatsApp button is visible and tappable on every section with a pre-filled message
  4. A visitor can submit the contact form (name, email, project type, message) and reach the agency via the form, WhatsApp, email, and social links
  5. The services section lists all four service types (landing page, loja, cardápio, institucional) with icons and descriptions, and the work process steps are visible
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — Navigation + Hero + Services + About + global animation infrastructure
- [ ] 03-02-PLAN.md — Portfolio + Testimonials + Contact + page composition (replaces index.astro)

### Phase 4: SEO, Performance & Pre-launch Hardening
**Goal**: The site passes every launch gate: WhatsApp link preview shows the correct image, PageSpeed mobile score is at or above 80, sitemap is indexed, and all Core Web Vitals are within threshold
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-03
**Success Criteria** (what must be TRUE):
  1. Sharing the site URL in WhatsApp shows a correctly sized preview image (1200x630), the site title in Portuguese, and the meta description
  2. PageSpeed Insights mobile score is 80 or above with LCP at or below 2.5s and CLS at or below 0.1
  3. `sitemap.xml` and `robots.txt` are accessible at the production URL and `robots.txt` does not block indexing
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Brand Identity & Content Foundation | 0/4 | Not started | - |
| 2. Project Foundation & Data Layer | 1/3 | In Progress|  |
| 3. UI Components & Site Sections | 0/2 | Not started | - |
| 4. SEO, Performance & Pre-launch Hardening | 0/? | Not started | - |
