# Phase 5: Design Enhancement & Advanced Animations - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Transform the existing functional site into a premium, eye-catching portfolio that showcases GMStudio's own design quality. Add advanced animations, visual effects, and the portfolio category filter. The site itself must serve as proof of what GMStudio delivers to clients.

Requirements in scope: PORTF-03 (portfolio filter — promoted from v2 to Phase 5)

Out of scope: new sections, CMS, per-page case studies (PORTF-05), any server-side features.

</domain>

<decisions>
## Implementation Decisions

### Animation Libraries
- **D-LIB-01:** Install `motion` (formerly Framer Motion, v11.x) for scroll-triggered entrances, page-level sequencing, and layout animations. Use `LazyMotion` + `domAnimation` feature set to keep base bundle at ~6KB.
- **D-LIB-02:** Install ReactBits (from reactbits.dev) for premium visual components: particle backgrounds, aurora/mesh gradients, animated text effects. Use only components that don't break PageSpeed ≥80 mobile.
- **D-LIB-03:** Existing CSS fade-up animations (`section-animate`, `stagger-child`) are REPLACED by Motion equivalents — don't run both systems in parallel.

### Hero Visual Upgrade
- **D-HERO-01:** Replace the static radial-gradient background with a premium animated effect — either a particle field, animated mesh gradient, or aurora background from ReactBits. Must render as progressive enhancement (static fallback if JS not loaded).
- **D-HERO-02:** Headline ("Presença digital que converte") gets a Motion text reveal animation — staggered word or character entrance, not just a simple fade.
- **D-HERO-03:** Hero CTAs get entrance animation with Motion spring — slight bounce/overshoot on mount.

### All Sections Polished (Motion Scroll Reveals)
- **D-ANIM-01:** All section entrances use Motion `whileInView` + `viewport={{ once: true }}` — replaces the existing CSS IntersectionObserver approach. Fade-up with spring easing, not linear.
- **D-ANIM-02:** Service cards: staggered entrance using Motion `variants` with `staggerChildren`. Each card enters 80ms after the previous.
- **D-ANIM-03:** About stats section: number counters animate from 0 to final value on viewport entry (e.g., "47 projetos" counts up). Use Motion's `useMotionValue` + `useTransform` or a simple counter hook in a React island.
- **D-ANIM-04:** Testimonials marquee stays as pure CSS (`@keyframes scroll`) — already works, zero JS cost. Only upgrade if there's a specific ReactBits component that improves the effect.

### Portfolio Filter (PORTF-03)
- **D-PORTF-01:** Add category filter tabs/buttons above the portfolio grid. Categories derived from the existing `projects` content collection data — no hardcoding.
- **D-PORTF-02:** Filter implemented as a React island (`client:load`) replacing the current static `PortfolioSection.astro`. Uses Motion `AnimatePresence` + `layout` prop for smooth card enter/exit transitions when filtering.
- **D-PORTF-03:** "Todos" (All) is the default active filter. Active filter tab has accent color indicator.

### Micro-interactions on CTAs
- **D-MICRO-01:** Floating WhatsApp button: add a pulse/glow `@keyframes` animation (CSS, already in place context) to draw attention. Motion `whileHover` scale-up on hover.
- **D-MICRO-02:** Hero primary CTA: Motion `whileTap` scale-down feedback on click (press feel).
- **D-MICRO-03:** Project cards in portfolio: Motion `whileHover` lifts card (y: -4px) and brightens border. Replaces current CSS `transition` hover.

### Performance Guardrail
- **D-PERF-01:** PageSpeed mobile ≥80 must be maintained. After implementing animations, run a PageSpeed check on the deployed Cloudflare Pages URL.
- **D-PERF-02:** If score drops below 80: first candidate to reduce is ReactBits visual effects (particle field → revert to CSS gradient). Motion scroll animations stay as they're lightweight.
- **D-PERF-03:** `prefers-reduced-motion` media query must disable all Motion animations (Motion respects this natively when using `useReducedMotion` hook or via global CSS).

### Claude's Discretion
- Exact ReactBits component chosen for hero background (particles vs aurora vs mesh gradient)
- Animation durations and spring stiffness values
- Exact wording/styling of portfolio filter tabs
- Whether number counters use a custom hook or a library
- Order of animation entrances within sections

</decisions>

<specifics>
## Specific Ideas

- "Eu quero um design chamativo — o portfólio precisa ser um exemplo do nosso trabalho" — the site IS the portfolio. Prioritize visual impact over conservatism.
- User referenced portfolio sites and animation library APIs as inspiration — lean on ReactBits premium visual components for the hero especially.
- Reference aesthetic: Linear.app, Resend.com, Vercel.com (Phase 3 decision carried forward) — confident, detail-rich, not minimalist.
- The `sites` reference file at `.planning/phases/05-design-enhancement-advanced-animations/sites` was empty at context time — researcher should check if it gets populated before planning.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Animation System (to be replaced)
- `src/styles/global.css` — Current `.section-animate` and `.stagger-child` CSS classes; these get replaced by Motion
- `src/pages/index.astro` — Where Intersection Observer script lives; to be removed when Motion takes over

### Sections to Modify
- `src/components/HeroSection.astro` — Hero background + headline animation
- `src/components/ServicesSection.astro` — Staggered card entrance
- `src/components/PortfolioSection.astro` — Full replacement with React island for filter
- `src/components/AboutSection.astro` — Number counter animation
- `src/components/TestimonialsSection.astro` — Evaluate ReactBits upgrade; may stay CSS
- `src/layouts/BaseLayout.astro` — WhatsApp button pulse animation

### Data Layer (for filter implementation)
- `src/content/projects/` — Category values from existing project entries drive filter tabs
- `.planning/phases/03-ui-components-site-sections/03-CONTEXT.md` §Portfolio Grid — D-PORTF-01 to D-PORTF-04 (static grid decisions now superseded by filter requirement)

### Performance Reference
- `.planning/phases/04-seo-performance-pre-launch-hardening/04-CONTEXT.md` §Performance Strategy — D-PERF-01/02: measure first, fix only what fails ≥80

### Library Docs (researcher should verify current versions)
- Motion (motion.dev) — `LazyMotion`, `domAnimation`, `whileInView`, `AnimatePresence`, `layout`
- ReactBits (reactbits.dev) — Backgrounds: Particles, Aurora, AnimatedGradient; Text: TextReveal or SplitText equivalents

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/styles/tokens.css` — All brand tokens (`--color-bg`, `--color-accent`, `--color-surface`, etc.) available for animation styling
- `src/components/Nav.astro` + `src/components/NavHamburger.tsx` — React island pattern already established; reuse for portfolio filter island
- `src/content/projects/` — Category data already in content collections; no new data files needed for filter

### Established Patterns
- React island pattern: `.astro` wrapper → `client:load` React component for interactive parts
- `glass-card` CSS class — glassmorphism style used across service cards, portfolio cards, testimonial cards
- All sections use `id="section-name"` anchors for nav links — maintain these in any React replacements

### Integration Points
- `PortfolioSection.astro` → replace with `PortfolioSection.tsx` React island (filter state + Motion layout animations)
- `AboutSection.astro` → add a React island just for the stats counter, keep rest static Astro
- Hero background effect: if ReactBits component requires React, wrap hero background as a React island; headline and CTAs can stay Astro

</code_context>

<deferred>
## Deferred Ideas

- Case study pages (PORTF-05) — v2, requires individual routes per project
- Page transitions between routes — single-page site, not applicable
- Advanced scroll-scrubbing / parallax timelines — scope creep; out of Phase 5
- Upgrading to GSAP for timeline-sequencing — Motion is sufficient for Phase 5 goals

</deferred>

---

*Phase: 05-design-enhancement-advanced-animations*
*Context gathered: 2026-04-04*
