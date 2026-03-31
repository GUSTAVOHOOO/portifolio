# Architecture Research

**Domain:** Web development agency portfolio site (static/JAMstack)
**Researched:** 2026-03-30
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Nav    │  │  Hero    │  │ Section  │  │ Footer   │    │
│  │ (sticky) │  │ + CTA    │  │ Sections │  │          │    │
│  └──────────┘  └──────────┘  └────┬─────┘  └──────────┘    │
│                                    │                         │
│                   ┌────────────────┼────────────────┐        │
│                   │                │                │        │
│             ┌─────▼──┐      ┌──────▼─┐      ┌──────▼─┐     │
│             │Services│      │Portfolio│      │ Contact│     │
│             │Section │      │  Grid  │      │Section │     │
│             └────────┘      └────────┘      └────────┘     │
└──────────────────────────────────────────────────────────────┘
                              │ Static HTML at CDN edge
┌─────────────────────────────────────────────────────────────┐
│                    Build Layer (Astro SSG)                    │
├─────────────────────────────────────────────────────────────┤
│  src/content/          │  src/components/                    │
│  ├── projects/*.md     │  ├── sections/  (Hero, Services…)   │
│  ├── services/*.json   │  ├── ui/        (Card, Button…)     │
│  └── team/*.json       │  └── layout/   (Nav, Footer)        │
├─────────────────────────────────────────────────────────────┤
│  src/pages/ (file-based routing → static HTML output)        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│  │ index.astro│  │portfolio/│  │ [slug].astro│                │
│  │(one-pager)│  │ index    │  │(case study) │                │
│  └──────────┘  └──────────┘  └──────────┘                    │
└─────────────────────────────────────────────────────────────┘
                              │ npm run build → dist/
┌─────────────────────────────────────────────────────────────┐
│            Hosting Layer (CDN / Static Host)                 │
│  Vercel / Netlify / Cloudflare Pages — zero server cost      │
└─────────────────────────────────────────────────────────────┘
```

### Page Section Anatomy (Recommended Order)

The section order follows a conversion funnel: attention → credibility → proof → action.

| Position | Section | Purpose | Key CTA |
|----------|---------|---------|---------|
| 1 | **Navbar** | Navigation anchor links + primary CTA button | "Fale Conosco" (WhatsApp) |
| 2 | **Hero** | Value proposition, who you are, what you do | WhatsApp button + "Ver Portfólio" scroll |
| 3 | **Services** | Types of sites delivered (landing pages, lojas, cardápios, institucionais) | None (builds context) |
| 4 | **Portfolio** | Filterable grid of real cases by category | Link to case detail or live project |
| 5 | **About** | Team story, humanize the agency | None |
| 6 | **Testimonials** | Social proof from real clients | None |
| 7 | **Contact** | WhatsApp, form, email, social links | Final conversion CTA |
| 8 | **Footer** | Links, legal, social | Reduced nav |

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `BaseLayout` | HTML shell, global `<head>`, meta tags, OG tags | All pages |
| `Navbar` | Sticky navigation, anchor scroll links, top-level CTA | `BaseLayout` |
| `Hero` | Headline, subheadline, CTA buttons, optional hero image | None (self-contained) |
| `ServicesSection` | Grid/list of service cards from static data | `ServiceCard` (child) |
| `ServiceCard` | Single service: icon, title, description | None (presentational) |
| `PortfolioSection` | Filterable project grid, category filter buttons | `ProjectCard`, filter state |
| `ProjectCard` | Project thumbnail, title, category badge, link | None (presentational) |
| `AboutSection` | Agency story text, team member cards | `TeamMemberCard` |
| `TeamMemberCard` | Photo, name, role of a team member | None (presentational) |
| `TestimonialsSection` | Carousel or grid of testimonial cards | `TestimonialCard` |
| `TestimonialCard` | Quote, client name, company/project reference | None (presentational) |
| `ContactSection` | WhatsApp link, email mailto, social links, optional form | Form handler (external service) |
| `Footer` | Copyright, repeat nav links, social icons | None |

### Filter Logic Boundary

The portfolio filter (category tabs) is the only piece of client-side JavaScript. It is isolated as an Astro Island or a small vanilla JS module — it does not affect any other section. All other sections are zero-JS static HTML.

```
PortfolioSection (Astro Island or <script>)
    │
    ├── Filter state: selected category (string)
    │       ↓ drives
    └── ProjectCard visibility (CSS class toggle or data-category attr)
```

## Recommended Project Structure

```
src/
├── content/                  # Astro Content Collections (data layer)
│   ├── projects/             # One .md file per portfolio project
│   │   ├── loja-abc.md
│   │   └── cardapio-xyz.md
│   └── content.config.ts     # Zod schemas for all collections
│
├── data/                     # Static JSON for smaller datasets
│   ├── services.json         # Service offerings list
│   ├── team.json             # Team member profiles
│   └── testimonials.json     # Client testimonials
│
├── pages/
│   ├── index.astro           # Single-page main site (all sections)
│   └── portfolio/
│       └── [slug].astro      # Optional: case study detail pages
│
├── components/
│   ├── layout/
│   │   ├── BaseLayout.astro  # <html>, <head>, meta, OG
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── sections/             # One file per page section
│   │   ├── Hero.astro
│   │   ├── ServicesSection.astro
│   │   ├── PortfolioSection.astro
│   │   ├── AboutSection.astro
│   │   ├── TestimonialsSection.astro
│   │   └── ContactSection.astro
│   └── ui/                   # Primitive reusable components
│       ├── ServiceCard.astro
│       ├── ProjectCard.astro
│       ├── TeamMemberCard.astro
│       ├── TestimonialCard.astro
│       └── Button.astro
│
├── styles/
│   ├── global.css            # CSS custom properties (tokens), resets
│   └── typography.css        # Font-face declarations
│
└── assets/
    ├── images/               # Processed by Astro image pipeline
    └── icons/                # SVG icons
```

### Structure Rationale

- **content/projects/**: Uses Astro Content Collections so project data is type-safe via Zod, supports frontmatter metadata, and allows markdown body for case study prose.
- **data/*.json**: Services, team, and testimonials are short flat lists that do not need markdown bodies. JSON is simpler and directly importable in .astro files.
- **sections/ vs ui/**: Sections own layout and business logic (which data to render). UI components are purely presentational and know nothing about data sourcing.
- **pages/portfolio/[slug].astro**: Optional case study detail pages generated statically from the content collection. Can be deferred to a later phase.

## Architectural Patterns

### Pattern 1: Content Collections for Portfolio Items

**What:** Store each project as a Markdown file in `src/content/projects/` with a Zod-validated frontmatter schema. Astro generates TypeScript types automatically.
**When to use:** When portfolio items have structured metadata (category, tech stack, image, client name, URL) plus optional descriptive prose (case study body).
**Trade-offs:** Adds a small learning curve for Zod schemas; payoff is full type safety, editor autocomplete, and build-time validation that catches missing fields before deploy.

**Example:**
```typescript
// src/content/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title:       z.string(),
    description: z.string(),
    category:    z.enum(['loja', 'cardapio', 'landing-page', 'institucional']),
    client:      z.string().optional(),
    year:        z.number(),
    tags:        z.array(z.string()),
    cover:       image(),                    // processed by Astro image pipeline
    liveUrl:     z.string().url().optional(),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { projects };
```

### Pattern 2: Static JSON Import for Flat Data

**What:** Import JSON files directly into Astro components for data that has no prose body (services, team members, testimonials).
**When to use:** Lists of 3–10 items that are entirely metadata, no markdown body needed.
**Trade-offs:** No schema validation at build time (add Zod manually if desired), but zero overhead and zero configuration.

**Example:**
```astro
---
// src/components/sections/ServicesSection.astro
import services from '../../data/services.json';
---
<section id="servicos">
  {services.map(s => <ServiceCard {...s} />)}
</section>
```

### Pattern 3: Astro Island for Filter Interactivity

**What:** Wrap only the portfolio filter controls in a client-side reactive component (or minimal vanilla JS `<script>`). Everything else remains zero-JS.
**When to use:** The filterable portfolio grid is the only interactive piece. Avoid pulling in a full React/Vue runtime for this.
**Trade-offs:** Vanilla JS approach is lightest (no framework overhead). If a framework island is needed later, Astro supports it without refactoring the rest of the site.

**Example (vanilla JS approach):**
```astro
<!-- PortfolioSection.astro -->
<div class="filter-buttons">
  <button data-filter="all" class="active">Todos</button>
  <button data-filter="loja">Lojas</button>
  <button data-filter="cardapio">Cardápios</button>
</div>
<div class="project-grid">
  {projects.map(p => (
    <div data-category={p.data.category}>
      <ProjectCard project={p} />
    </div>
  ))}
</div>

<script>
  const buttons = document.querySelectorAll('[data-filter]');
  const cards   = document.querySelectorAll('[data-category]');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    cards.forEach(c => {
      c.hidden = filter !== 'all' && c.dataset.category !== filter;
    });
  }));
</script>
```

## Data Flow

### Build-Time Flow (Static Generation)

```
src/content/projects/*.md       ← authored content
src/data/services.json          ← authored content
src/data/team.json              ← authored content
src/data/testimonials.json      ← authored content
         │
         ▼ (Astro build: getCollection() + JSON.parse)
src/pages/index.astro
  └── passes props to →  Section Components
                            └── passes props to → UI Components
                                                        │
                                                        ▼
                                              Static HTML output
                                              (dist/index.html)
                                                        │
                                                        ▼
                                              CDN / Static Host
                                              (served to browser)
```

### Runtime Data Flow (Browser)

```
Browser receives static HTML (zero JS on most sections)
         │
         ├── Navbar: anchor scroll (browser-native, no JS)
         ├── Portfolio filter: minimal <script> mutates data-category attr
         ├── WhatsApp CTA: <a href="https://wa.me/..."> (plain link, no JS)
         └── Contact form: POST to Formspree/Netlify Forms (external service)
                                │
                                ▼
                          Form confirmation (redirect or fetch response)
```

### Key Data Flows

1. **Project display:** `content/projects/*.md` → `getCollection('projects')` in `pages/index.astro` → `PortfolioSection` props → `ProjectCard` renders thumbnail + metadata.
2. **Portfolio filter:** User clicks filter button → `<script>` reads `data-filter` → toggles `hidden` attribute on `[data-category]` wrappers → cards show/hide without page reload.
3. **WhatsApp contact:** Any CTA button → `<a href="https://wa.me/{number}?text=...">` → opens WhatsApp directly — no backend involved.
4. **Contact form:** User submits → fetch POST to Formspree/Netlify Forms API → external service emails the agency — no server code needed.
5. **Case study page (optional):** `getStaticPaths()` in `portfolio/[slug].astro` → iterates `getCollection('projects')` → generates one static HTML file per project at build time.

## Data Structures

### PortfolioProject (Content Collection frontmatter)

```typescript
interface PortfolioProject {
  title:       string;            // "Cardápio Digital — Restaurante ABC"
  description: string;            // one-sentence summary for card
  category:    'loja' | 'cardapio' | 'landing-page' | 'institucional';
  client?:     string;            // optional client name
  year:        number;            // 2024
  tags:        string[];          // ["React", "Stripe", "Vercel"]
  cover:       ImageMetadata;     // processed by astro:assets
  liveUrl?:    string;            // live project URL
  featured:    boolean;           // show in hero or highlighted row
}
```

### Service (JSON)

```typescript
interface Service {
  id:          string;        // "landing-page"
  title:       string;        // "Landing Pages"
  description: string;        // benefit-oriented description
  icon:        string;        // SVG filename or inline path reference
  examples?:   string[];      // ["para profissionais liberais", "lançamentos"]
}
```

### TeamMember (JSON)

```typescript
interface TeamMember {
  name:   string;        // "Gabriel Mota"
  role:   string;        // "Desenvolvedor Full-Stack"
  photo:  string;        // path to image in src/assets/
  bio?:   string;        // short paragraph
  links?: {
    github?:   string;
    linkedin?: string;
  };
}
```

### Testimonial (JSON)

```typescript
interface Testimonial {
  quote:    string;        // the client's words
  author:   string;        // "Ana Lima"
  company?: string;        // "Pizzaria do Bairro"
  project?: string;        // links to the portfolio project by slug
  photo?:   string;        // optional client avatar
}
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–20 projects | Single-page site, all sections on `index.astro`, JSON data files sufficient |
| 20–50 projects | Add `portfolio/[slug].astro` case study pages; keep single-page index with featured projects only |
| 50+ projects | Consider adding a headless CMS (Sanity, Contentlayer) as a data source; Astro's loader API supports external sources without changing component code |

### Scaling Priorities

1. **First bottleneck:** Content maintenance — when editing JSON/Markdown becomes tedious for a non-developer client, introduce a headless CMS (Sanity is a natural next step; its free tier covers this use case).
2. **Second bottleneck:** Build time — Astro's incremental builds handle hundreds of content entries without issue; this is unlikely to be a concern in v1.

## Anti-Patterns

### Anti-Pattern 1: Putting All Content in Component Files

**What people do:** Hard-code services, testimonials, and team info directly inside `.astro` component files as inline arrays or JSX.
**Why it's wrong:** Content and presentation become coupled — updating a testimonial requires touching component code. Harder to hand off to a content editor later, and impossible to connect a CMS without a full refactor.
**Do this instead:** Store all content in `src/content/` (Markdown) or `src/data/` (JSON). Components only receive and render data.

### Anti-Pattern 2: One Giant index.astro File

**What people do:** Place all section markup inside a single `pages/index.astro` to "keep it simple."
**Why it's wrong:** Files become 500–1000+ lines. Adding a new section, reordering sections, or fixing a section layout becomes risky — every change is in the same file.
**Do this instead:** Each section is its own component in `src/components/sections/`. `index.astro` becomes a clean composition file: import and render section components in order.

### Anti-Pattern 3: React/Vue for the Filter Island

**What people do:** Install React just to handle the portfolio filter state, pulling in 40–100KB of framework JavaScript.
**Why it's wrong:** The filter is three lines of vanilla JS. A full framework runtime for a single interactive feature significantly hurts Lighthouse scores and defeats the purpose of choosing Astro.
**Do this instead:** Use an inline `<script>` block in the Astro component. If state complexity grows, use a micro-library like Alpine.js (7KB) before reaching for React.

### Anti-Pattern 4: Using a SPA Router for a Static Portfolio

**What people do:** Set up client-side routing (React Router, Vue Router) because it feels like "proper architecture."
**Why it's wrong:** A static portfolio site has 1–5 pages. SPA routing adds JavaScript weight, breaks native browser scroll restoration, and complicates SEO crawling with no benefit at this scale.
**Do this instead:** Use Astro's file-based routing. Each route is a static HTML file. Navigation between the main site and case study pages is standard `<a>` links.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| WhatsApp | `<a href="https://wa.me/{number}?text=Olá...">` — plain anchor link | Pre-fill message text via URL param; no API key needed |
| Formspree / Netlify Forms | HTML `<form action="...">` POST or `fetch()` to service endpoint | Handles form submission without a backend; free tier covers low volume |
| Vercel / Netlify / Cloudflare Pages | Deploy from Git; `npm run build` → `dist/` → served from CDN edge | Zero config needed for Astro static output |
| Google Fonts / Fontsource | CSS `@import` or `npm install @fontsource/...` | Self-host via Fontsource to avoid GDPR concerns and external request latency |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `pages/index.astro` ↔ `sections/*` | Props passed at build time; no runtime coupling | Sections are passive receivers — they render what they are given |
| `sections/PortfolioSection` ↔ filter `<script>` | DOM `data-*` attributes; script reads and mutates HTML attributes | No shared JS state object; DOM is the source of truth for filter state |
| `content/projects` ↔ `pages/portfolio/[slug].astro` | Astro `getCollection()` + `getStaticPaths()` at build time | One static HTML file generated per project entry |
| Any section ↔ external contact service | HTTP POST from browser to Formspree/Netlify Forms endpoint | No server-side code; error handling is client-side fetch with simple UI feedback |

## Build Order for Development

The dependency graph below dictates which pieces to build first.

```
Phase 1 — Foundation (no dependencies)
├── BaseLayout.astro          (HTML shell, meta tags)
├── global.css                (design tokens, reset)
├── Navbar.astro              (no data dependency)
└── Footer.astro              (no data dependency)

Phase 2 — Data Structures (must precede components that consume them)
├── content.config.ts         (Zod schemas)
├── services.json             (static data)
├── team.json                 (static data)
└── testimonials.json         (static data)

Phase 3 — UI Primitives (depend on Phase 1 styles only)
├── Button.astro
├── ServiceCard.astro
├── ProjectCard.astro
├── TeamMemberCard.astro
└── TestimonialCard.astro

Phase 4 — Section Components (depend on Phase 2 data + Phase 3 UI)
├── Hero.astro
├── ServicesSection.astro
├── PortfolioSection.astro    (+ filter <script>)
├── AboutSection.astro
├── TestimonialsSection.astro
└── ContactSection.astro

Phase 5 — Pages (depend on all above)
├── pages/index.astro         (composes all sections)
└── pages/portfolio/[slug].astro  (optional, depends on content collection)
```

## Sources

- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/) — HIGH confidence (official docs)
- [Astro Project Structure](https://docs.astro.build/en/basics/project-structure/) — HIGH confidence (official docs)
- [The Anatomy of a Perfect Portfolio Website — Kinsta](https://kinsta.com/blog/portfolio-website/) — MEDIUM confidence (industry article)
- [Top 5 Jamstack Frameworks in 2026 — FocusReactive](https://focusreactive.com/best-jamstack-frameworks/) — MEDIUM confidence (industry report)
- [Next.js Portfolio Build Guide — Kinsta](https://kinsta.com/blog/next-js-portfolio/) — MEDIUM confidence (practical tutorial, patterns generalize to Astro)
- [Webflow Blog — Portfolio Best Practices](https://webflow.com/blog/design-portfolio-examples) — MEDIUM confidence (community patterns)
- [Best One-Page Portfolio Templates — DevPortfolioTemplates](https://www.devportfoliotemplates.com/blog/best-one-page-portfolio-templates-for-web-developers) — LOW confidence (secondary source, single article)

---
*Architecture research for: GMStudio agency portfolio site (static/JAMstack)*
*Researched: 2026-03-30*
