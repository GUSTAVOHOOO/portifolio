# Phase 5: Design Enhancement & Advanced Animations - Research

**Researched:** 2026-04-04
**Domain:** React animation (Motion v11+), ReactBits visual components, Astro 5 island architecture
**Confidence:** HIGH (Motion/Astro patterns), MEDIUM (ReactBits specifics), HIGH (codebase findings)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-LIB-01:** Install `motion` (v11.x) with `LazyMotion` + `domAnimation` feature set (~4.6KB base + ~15KB features).
- **D-LIB-02:** Install ReactBits (reactbits.dev) for premium visual components. Use only components that don't break PageSpeed ≥80 mobile.
- **D-LIB-03:** Existing CSS fade-up animations (`section-animate`, `stagger-child`) are REPLACED by Motion equivalents — do not run both systems in parallel.
- **D-HERO-01:** Replace static radial-gradient background with animated effect from ReactBits. Must render as progressive enhancement (static fallback if JS not loaded).
- **D-HERO-02:** Headline gets a Motion text reveal animation — staggered word or character entrance, not a simple fade.
- **D-HERO-03:** Hero CTAs get entrance animation with Motion spring — slight bounce/overshoot on mount.
- **D-ANIM-01:** All section entrances use Motion `whileInView` + `viewport={{ once: true }}` — replaces existing CSS IntersectionObserver. Fade-up with spring easing.
- **D-ANIM-02:** Service cards: staggered entrance using Motion `variants` with `staggerChildren`. Each card 80ms after previous.
- **D-ANIM-03:** About stats: number counters animate from 0 to final value on viewport entry. Use Motion `useMotionValue` + `useTransform` or a simple counter hook in a React island.
- **D-ANIM-04:** Testimonials marquee stays as pure CSS — only upgrade if a specific ReactBits component improves the effect.
- **D-PORTF-01:** Category filter tabs above portfolio grid. Categories from `projects` content collection — no hardcoding.
- **D-PORTF-02:** Portfolio filter as React island (`client:load`), replacing static `PortfolioSection.astro`. Uses Motion `AnimatePresence` + `layout` prop.
- **D-PORTF-03:** "Todos" is default active filter. Active tab has accent color indicator.
- **D-MICRO-01:** WhatsApp floating button: CSS pulse/glow `@keyframes`. Motion `whileHover` scale-up.
- **D-MICRO-02:** Hero primary CTA: Motion `whileTap` scale-down press feedback.
- **D-MICRO-03:** Project cards: Motion `whileHover` lifts card (y: -4px) and brightens border. Replaces current CSS transition hover.
- **D-PERF-01:** PageSpeed mobile ≥80 must be maintained after animations.
- **D-PERF-02:** If score drops below 80: first candidate to reduce is ReactBits visual effects. Motion scroll animations stay.
- **D-PERF-03:** `prefers-reduced-motion` must disable all Motion animations.

### Claude's Discretion

- Exact ReactBits component for hero background (particles vs aurora vs mesh gradient)
- Animation durations and spring stiffness values
- Exact wording/styling of portfolio filter tabs
- Whether number counters use a custom hook or a library
- Order of animation entrances within sections

### Deferred Ideas (OUT OF SCOPE)

- Case study pages (PORTF-05)
- Page transitions between routes
- Advanced scroll-scrubbing / parallax timelines
- Upgrading to GSAP
</user_constraints>

---

## Summary

Phase 5 transforms a functional but static portfolio into a premium animated showcase. The existing codebase uses a CSS IntersectionObserver approach (`section-animate` / `stagger-child` classes activated by a `<script>` block in `BaseLayout.astro`) — this entire system must be removed and replaced by Motion's `whileInView` prop. The site uses Astro 6.1.3 (slightly ahead of the CLAUDE.md reference to 5.x, but same island architecture), React 19, and Tailwind v4.

The primary technical challenge is the Astro island boundary: Motion animations that need `whileInView` or state (number counters, portfolio filter) must live inside React islands with a `client:load` or `client:only` directive. Pure `.astro` components cannot use Motion hooks. For ReactBits background components, a React island wrapper is required.

**Primary recommendation:** Install `motion` v12.x (current latest is 12.38.0 — the package was renamed from `framer-motion` to `motion`; "v11" in CONTEXT.md is an older reference; current stable is v12, same API). Use `LazyMotion` + `domAnimation` in island wrappers. For ReactBits, use copy-paste pattern (not npm) to avoid pulling unused components.

---

## Codebase Findings

### Current Animation System (to be fully removed)

**File:** `src/styles/global.css` lines 31–61
- `.section-animate`: opacity 0 → 1, translateY 20px → 0, linear 0.5s
- `.stagger-child`: same with `calc(var(--stagger-i, 0) * 80ms)` delay
- `prefers-reduced-motion` block disables both — this block stays but the classes get removed

**File:** `src/layouts/BaseLayout.astro` lines 88–109
- Inline `<script>` block creates an `IntersectionObserver`, adds `visible` class to `.section-animate` and `.stagger-child` elements
- **This entire `<script>` block must be deleted in Wave 0 of Phase 5**
- `--stagger-i` CSS variable is set per `.stagger-child` element

### Components and What They Become

| File | Current Pattern | Phase 5 Change |
|------|----------------|----------------|
| `HeroSection.astro` | Static `.section-animate` section | Add ReactBits background island; headline becomes React island or CSS animation; CTAs get Motion spring (React island) |
| `ServicesSection.astro` | `.stagger-child` on each `glass-card` | Convert to React island or use `whileInView` on `motion.div` wrappers — either full island or keep `.astro` shell with `<MotionWrapper client:load>` |
| `PortfolioSection.astro` | Static grid, `.stagger-child` cards | Full replacement: `PortfolioSection.tsx` React island with filter state + AnimatePresence |
| `AboutSection.astro` | Static stats display, `.stagger-child` | Add `StatsCounter.tsx` React island for the 3 stat values; rest stays `.astro` |
| `TestimonialsSection.astro` | Pure CSS marquee | Evaluate only — likely stays as-is (D-ANIM-04) |
| `BaseLayout.astro` | WhatsApp button with inline JS hover | Replace JS hover with CSS; add CSS pulse keyframe; Motion `whileHover` requires React island |
| `index.astro` | Static composition | No changes needed |

### Existing Patterns to Reuse

- **React island pattern established:** `NavHamburger.tsx` with `client:load` — confirmed working; same pattern applies to all new islands
- **`glass-card` CSS class** — keep this; Motion `whileHover` adds behavior on top, doesn't replace the class
- **`src/styles/tokens.css`** — all CSS custom properties available as animation targets (accent colors for counter display)
- **Content schema:** `projects` collection has `category` field (confirmed: "institucional", "loja" — values used for filter tabs)

### Project Data Structure

Two project entries exist currently:
- `barbearia-style.md` — category: "institucional"
- `padaria-do-joao.md` — category: (assumed "loja" or similar based on name) [ASSUMED]

Filter categories are derived dynamically: `[...new Set(projects.map(p => p.data.category))]` — no hardcoding needed.

---

## Library Integration

### Motion (formerly Framer Motion)

**Current version:** 12.38.0 [VERIFIED: npm registry]
Note: CONTEXT.md refers to "v11.x" — the package was `framer-motion` v11, rebranded to `motion`. The current `motion` package is v12. API is backward-compatible. `import { motion } from "motion/react"` is the correct import for v12. [VERIFIED: motion.dev docs]

**Installation:**
```bash
npm install motion
```

**LazyMotion pattern for bundle optimization:** [VERIFIED: motion.dev/docs/react-reduce-bundle-size]

```tsx
// In each React island file that uses motion:
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

// Wrap the island root:
export function MyIsland() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* content */}
      </m.div>
    </LazyMotion>
  )
}
```

**Bundle sizes:** [VERIFIED: motion.dev docs]
- `m` component base: ~4.6KB
- `domAnimation` feature set: ~15KB additional
- Full `motion` (unoptimized): ~34KB
- Verdict: Use LazyMotion for every island

**Key Motion APIs needed in Phase 5:**

| API | Import | Use |
|-----|--------|-----|
| `m.div` | `motion/react-m` | All animated elements |
| `LazyMotion` | `motion/react` | Island root wrapper |
| `domAnimation` | `motion/react` | Feature bundle |
| `AnimatePresence` | `motion/react` | Portfolio filter card exit/enter |
| `whileInView` | prop on `m.*` | Scroll-triggered entrances |
| `whileHover` | prop on `m.*` | Card lift, WhatsApp button |
| `whileTap` | prop on `m.*` | Hero CTA press feel |
| `useInView` | `motion/react` | Number counter trigger |
| `useMotionValue` | `motion/react` | Counter value tracking |
| `useTransform` | `motion/react` | Round counter output |
| `animate` | `motion/react` | Counter tween from 0 → target |

### Astro Island Wiring — Critical Pattern

**The key rule:** Any component using Motion hooks (`whileInView`, `animate`, `useMotionValue`) must be a React component with `client:load` or `client:visible` on the Astro usage site. [VERIFIED: Astro docs + community sources]

**Hydration risk:** Motion's `initial` prop causes a flash on SSR because Astro renders the component to static HTML first (showing the `initial` state — opacity 0), then hydrates. [CITED: github.com/withastro/astro/issues/7709]

**Solutions:**
1. **`client:only="react"`** — skips SSR entirely. Component renders blank on server, full React on client. Use for hero background (ReactBits) and portfolio filter where SSR output has no value.
2. **`client:load` with `initial={false}`** — renders full visible state on server, no entrance animation on first load, then hydrates for interactions (`whileHover`, `whileTap`). Use for micro-interactions on elements that must be visible before JS loads.
3. **`client:visible`** — hydrates when element enters viewport. Good fit for below-fold islands (stats counter, services section). Pairs naturally with `whileInView` behavior.

**Recommended directive per island:**

| Island | Directive | Reason |
|--------|-----------|--------|
| HeroBackground (ReactBits) | `client:only="react"` | Canvas/WebGL, no SSR value, hides blank flash |
| HeroContent (CTAs + headline Motion) | `client:load` | Above the fold, must hydrate fast |
| PortfolioSection | `client:load` | Filter needs to be ready immediately |
| StatsCounter | `client:visible` | Below fold, lazy hydrate is fine |
| ServicesAnimations | `client:visible` | Below fold |

**Data passing from Astro to React island:**

```astro
---
// PortfolioSection.astro
import { getCollection } from 'astro:content';
import PortfolioIsland from './PortfolioIsland.tsx';

const projects = (await getCollection('projects'))
  .sort((a, b) => Number(b.data.featured) - Number(a.data.featured));

// Serialize to plain object — Astro content entries are NOT plain JSON
const projectData = projects.map(p => ({
  id: p.id,
  title: p.data.title,
  category: p.data.category,
  thumbnail: p.data.thumbnail,
  liveUrl: p.data.liveUrl,
  featured: p.data.featured,
}));
---
<PortfolioIsland projects={projectData} client:load />
```

**Critical:** Pass serialized plain objects as props, not the raw Astro content entry objects. Content entries contain non-serializable internal fields that break prop passing to React islands. [CITED: community pattern, Astro docs on island props]

---

### ReactBits

**Installation model:** Copy-paste components (no npm package to install for core library). ReactBits uses shadcn-style CLI or direct copy-paste: [VERIFIED: github.com/DavidHDev/react-bits]

```bash
npx shadcn@latest add "https://reactbits.dev/r/[component-name]"
```

or manual copy-paste from the component page.

**Heavy component warning:** Aurora and Particles background components require `three`, `@react-three/fiber`, and `@react-three/drei`. [VERIFIED: WebSearch cross-referenced against npm peer deps]

These Three.js dependencies are very heavy for a mobile PageSpeed ≥80 target:
- `three`: ~580KB minified, ~160KB gzip [ASSUMED — based on known bundle size]
- `@react-three/fiber`: additional ~80KB [ASSUMED]
- Total WebGL stack: ~240KB+ gzip — almost certainly breaks PageSpeed ≥80 mobile

**Recommendation (Claude's Discretion):** Avoid Three.js-based ReactBits components (Aurora WebGL, Particles WebGL). Instead use:

1. **CSS-only animated gradient (mesh/aurora aesthetic without Three.js):** Custom CSS `@keyframes` animation on a `conic-gradient` or `radial-gradient` background. Zero JS cost. Achieves aurora/mesh aesthetic with no bundle impact.

2. **ReactBits `Particles` (canvas-based, no Three.js):** If the ReactBits Particles component uses HTML Canvas (not WebGL/Three.js), it's much lighter. **Verify** this before implementation by inspecting the copy-pasted component source for `three` imports.

3. **ReactBits `AnimatedGradient` or CSS blur mesh:** A blurred div-based gradient with animation via CSS or Motion spring — very lightweight, polished aesthetic similar to Linear.app.

**Decision guidance:** Start with the CSS animated gradient approach for the hero background. This gives the premium aesthetic at zero JS cost and guarantees PageSpeed ≥80. Only escalate to a ReactBits canvas component if the CSS approach is rejected on visual grounds.

---

## Portfolio Filter Implementation

### Complete Pattern

```tsx
// src/components/PortfolioIsland.tsx
import { useState } from "react"
import { LazyMotion, domAnimation, AnimatePresence } from "motion/react"
import * as m from "motion/react-m"

interface Project {
  id: string
  title: string
  category: string
  thumbnail: string
  liveUrl: string
  featured: boolean
}

interface Props {
  projects: Project[]
}

export default function PortfolioIsland({ projects }: Props) {
  const categories = ["Todos", ...new Set(projects.map(p => p.category))]
  const [active, setActive] = useState("Todos")

  const filtered = active === "Todos"
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <LazyMotion features={domAnimation}>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "var(--space-8)" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              background: active === cat ? "var(--color-accent)" : "transparent",
              color: active === cat ? "var(--color-text)" : "var(--color-text-muted)",
              border: "1px solid",
              borderColor: active === cat ? "var(--color-accent)" : "var(--color-border)",
              borderRadius: "var(--radius-full)",
              padding: "6px 16px",
              cursor: "pointer",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "var(--text-sm)",
              transition: "all 200ms ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid with AnimatePresence */}
      <div className="portfolio-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map(project => (
            <m.a
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card glass-card"
              style={{ display: "block", textDecoration: "none", overflow: "hidden" }}
            >
              {/* card content */}
            </m.a>
          ))}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
```

**Key details:**
- `mode="popLayout"` on `AnimatePresence`: exiting elements are popped from layout flow immediately, preventing layout thrash. [VERIFIED: motion.dev/docs/react-animate-presence]
- `layout` prop on each `m.a`: enables smooth position reflow when cards reorder after filter.
- Stable `key={project.id}` — do not use array index. AnimatePresence tracks presence by key.
- The `portfolio-grid` CSS class can be declared in a `<style>` block in the parent `.astro` wrapper or in `global.css` — the React island inherits it.

**Grid CSS stays in Astro:** Keep the `.portfolio-grid` CSS class definition in `PortfolioSection.astro` (the wrapper), not inside the React component. This avoids duplicating CSS.

---

## Number Counter Animation

**Recommended approach:** Motion's `useMotionValue` + `useTransform` + `animate` — no extra library needed. [VERIFIED: motion.dev docs]

AnimateNumber (Motion+) is paid; the manual hook approach is free and ~same code size.

```tsx
// src/components/StatsCounter.tsx
import { useEffect, useRef } from "react"
import { LazyMotion, domAnimation, useMotionValue, useTransform, useInView } from "motion/react"
import * as m from "motion/react-m"
import { animate } from "motion/react"

interface Stat {
  value: number   // numeric part only
  suffix: string  // "+" or " Anos"
  label: string
}

function Counter({ value, suffix, label }: Stat) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" })
    }
  }, [isInView, count, value])

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div className="stat-value">
        <m.span>{rounded}</m.span>{suffix}
      </div>
      <div style={{ /* label styles */ }}>{label}</div>
    </div>
  )
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="stats-row">
        {stats.map((stat) => (
          <Counter key={stat.label} {...stat} />
        ))}
      </div>
    </LazyMotion>
  )
}
```

**Parsing stat values from AboutSection.astro:** Current stats are `"20+"`, `"15+"`, `"2+"`. The island needs the numeric part and suffix separately. Either:
a. Pass `{ value: 20, suffix: "+", label: "Projetos" }` as props from the Astro wrapper, or
b. Parse the string inside the island with a regex.

Option (a) is cleaner and keeps data concerns in Astro.

**`prefers-reduced-motion` handling:** Wrap `animate()` call with a check:
```tsx
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
if (isInView && !prefersReduced) {
  animate(count, value, { duration: 1.5, ease: "easeOut" })
} else if (isInView) {
  count.set(value) // jump to final value instantly
}
```

---

## Performance Analysis

### Expected Bundle Impact

| Addition | Gzip Size | Notes |
|----------|-----------|-------|
| `motion` LazyMotion + domAnimation | ~19KB | 4.6KB base + ~15KB features [VERIFIED: motion.dev] |
| ReactBits CSS-only hero background | 0KB | Pure CSS keyframes, no JS |
| ReactBits Canvas Particles (if used) | ~15–30KB | [ASSUMED — depends on implementation] |
| ReactBits Three.js Aurora (if used) | ~240KB+ | **Do not use** — kills PageSpeed mobile |
| PortfolioIsland.tsx | ~3–5KB | Component code, tiny |
| StatsCounter.tsx | ~1–2KB | Component code, tiny |

**Verdict:** Motion via LazyMotion adds ~19KB gzip. This is acceptable for a portfolio site. CSS-only hero effect adds zero. Three.js-based ReactBits backgrounds are the only real risk.

### PageSpeed Risk Items

1. **Three.js/WebGL from ReactBits:** ~240KB additional parse/execute cost — skip entirely if mobile PageSpeed ≥80 matters (D-LIB-02 decision). [HIGH RISK if used]
2. **`client:load` for all islands:** Increases Time to Interactive if many islands load on first paint. Mitigate by using `client:visible` for below-fold islands. [MEDIUM RISK]
3. **Animation-induced Layout Shift (CLS):** `whileInView` with `initial={{ opacity: 0, y: 20 }}` causes elements to start invisible — no layout shift if height is reserved. BUT: elements starting at `opacity: 0` mean their size is already in the layout. CLS risk is LOW with Motion (it doesn't remove elements from flow). [LOW RISK]
4. **Fonts already loading:** Google Fonts (Space Grotesk + Inter) load in `BaseLayout.astro` via preconnect — already optimized. No change in Phase 5.

### Mitigation Strategy

Follow D-PERF-02: if PageSpeed mobile drops below 80 after implementation, the first removal target is the ReactBits hero background effect. Motion scroll animations (~19KB) stay because they're lightweight and don't block rendering.

---

## prefers-reduced-motion Support

Motion respects `prefers-reduced-motion` **if explicitly handled**. There are two approaches: [VERIFIED: motion.dev docs + MDN]

**Approach A — Global CSS (handles CSS animations, not Motion):**
The existing `global.css` block (lines 53–61) handles `.section-animate` and `.stagger-child`. Once those classes are removed, this block can be repurposed for the CSS hero background animation:
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable CSS animated gradient on hero */
  .hero-bg-animated { animation: none; }
}
```

**Approach B — Motion `useReducedMotion` hook (handles Motion animations):**
```tsx
import { useReducedMotion } from "motion/react"

function AnimatedSection({ children }) {
  const prefersReduced = useReducedMotion()
  return (
    <m.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </m.div>
  )
}
```

**Recommendation:** Use `useReducedMotion()` inside each island. Pass `initial={false}` when reduced motion is preferred (skips initial hidden state, element renders fully visible immediately). This handles both the "no animation" requirement and prevents blank flashes for users with reduced motion enabled.

---

## Implementation Order

Recommended order to avoid regressions:

**Wave 0 — Remove old system (no new features, just clean slate):**
1. Delete the `<script>` IntersectionObserver block from `BaseLayout.astro`
2. Remove `.section-animate` and `.stagger-child` CSS classes from `global.css` (keep `prefers-reduced-motion` wrapper)
3. Remove `.section-animate` class from all section components (`HeroSection.astro`, `ServicesSection.astro`, `PortfolioSection.astro`, `AboutSection.astro`)
4. Remove `.stagger-child` classes from service cards, project cards, stats
5. Install `motion`: `npm install motion`
6. **Build and verify site still renders** (elements visible, no JS errors, just no animations)

**Wave 1 — Hero upgrade:**
7. Add hero background effect (CSS animated gradient or ReactBits canvas component)
8. Create `HeroContent.tsx` island (headline word-reveal + CTA spring entrance) — or wrap headline in `m.h1` inside a small island
9. Verify PageSpeed after hero change

**Wave 2 — Portfolio filter (highest complexity):**
10. Create `PortfolioIsland.tsx` with filter state + AnimatePresence
11. Update `PortfolioSection.astro` to fetch + serialize data, render island
12. Verify filter tabs work, card transitions smooth

**Wave 3 — Remaining sections:**
13. Add Motion `whileInView` to ServicesSection (either via React island or by converting to `.tsx`)
14. Create `StatsCounter.tsx` island for AboutSection stats
15. Add `whileHover` lift to project cards (inside PortfolioIsland already)

**Wave 4 — Micro-interactions + polish:**
16. Add CSS pulse `@keyframes` to WhatsApp floating button
17. Add Motion `whileTap` to hero primary CTA
18. Final PageSpeed audit on deployed Cloudflare URL

---

## Key Risks & Mitigations

### Risk 1: SSR Hydration Flash (opacity: 0 on initial state)
**What goes wrong:** Astro renders the component to HTML with `style="opacity: 0; transform: translateY(20px)"` (from `initial` prop). For ~100–300ms before JS hydrates, the element is invisible. On slow mobile connections, this is a visible flash.

**Mitigation:** Use `client:only="react"` for purely decorative animation islands (hero background). For functional content (section text, portfolio cards), use `client:visible` which defers hydration until the element is near viewport — by the time the user scrolls to it, JS has loaded. Alternatively, set `initial={false}` and use `whileInView` only for spring/hover behavior, keeping content always visible in static HTML.

### Risk 2: Three.js from ReactBits Breaks PageSpeed
**What goes wrong:** Aurora and Particles components from ReactBits require `three` (~160KB gzip) + `@react-three/fiber`. This likely drops PageSpeed mobile below 70.

**Mitigation (decision for planner):** Default to CSS animated gradient for hero. Only use ReactBits backgrounds that are confirmed to NOT import `three`. Check the copy-pasted component source for `import * from 'three'` before committing.

### Risk 3: AnimatePresence + layout Causes CLS
**What goes wrong:** When portfolio filter activates, cards animate position changes. If grid height changes abruptly before the transition completes, CLS score increases.

**Mitigation:** Set a `min-height` on the portfolio grid container based on the expected number of visible rows. Use `mode="popLayout"` (not `"wait"`) so exiting elements don't hold layout space during transition.

### Risk 4: `getCollection` Data Not Serializable as Island Props
**What goes wrong:** Passing raw Astro content entries (which include internal `_` fields) to a React island can cause Astro to throw a serialization error at build time.

**Mitigation:** Always map content entries to plain objects before passing as props (see Portfolio Filter Implementation section above). This is the established pattern in the Astro community. [CITED: Astro troubleshooting docs]

### Risk 5: Both Animation Systems Running in Parallel During Development
**What goes wrong:** If `section-animate` and `stagger-child` CSS classes are not fully removed before Motion is added, both systems compete. An element with `opacity: 0` from CSS and a separate Motion animation may conflict, causing elements to stay invisible.

**Mitigation:** Wave 0 must be a complete removal of the old system BEFORE any new Motion code is added. Build and verify the site renders (unanimated) after Wave 0 before proceeding to Wave 1.

---

## Code Examples

### Section whileInView with Spring (general pattern)
```tsx
// Source: motion.dev/docs/react-animation
<m.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
  {children}
</m.div>
```

### Staggered Children (services cards)
```tsx
// Source: motion.dev/docs/react-animation#orchestration
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
}

<m.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {cards.map(card => (
    <m.div key={card.id} variants={item} className="glass-card">
      {/* card content */}
    </m.div>
  ))}
</m.div>
```

### Hero CTA Spring Entrance
```tsx
// Source: motion.dev/docs/react-animation
<m.a
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.4 }}
  whileTap={{ scale: 0.95 }}
  href={whatsappUrl}
>
  Falar no WhatsApp
</m.a>
```

### CSS Pulse for WhatsApp Button (no JS required)
```css
/* In global.css or BaseLayout.astro <style> */
@keyframes whatsapp-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  50%       { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
}

.whatsapp-float {
  animation: whatsapp-pulse 2.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-float { animation: none; }
}
```

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | ReactBits Aurora and Particles require Three.js (~240KB gzip total) | Performance Analysis | If they're CSS/canvas-only, they'd be safe to use — plan should verify component source on copy-paste |
| A2 | `padaria-do-joao.md` has category "loja" or similar | Codebase Findings | Low impact — filter categories are derived dynamically from data |
| A3 | ReactBits CSS-animated gradient component exists without Three.js dependency | Library Integration | If no such component exists, fallback is hand-rolled CSS `@keyframes` on gradient — easy to implement |
| A4 | Motion `useReducedMotion` hook works correctly inside Astro React islands | prefers-reduced-motion | Low risk — well-documented React hook, no Astro-specific behavior |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm install | ✓ | ≥22.12.0 (per engines field) | — |
| npm | Package installation | ✓ | bundled with Node | — |
| `motion` package | All animations | ✗ (not installed) | — | Install: `npm install motion` |
| `three` / `@react-three/fiber` | ReactBits Aurora/Particles (WebGL) | ✗ | — | Use CSS-only hero background — recommended anyway |
| Cloudflare Pages | PageSpeed audit | ✓ (prod URL exists) | — | localhost lighthouse for dev checks |

**Missing dependencies with fallback:**
- `motion` — install via npm before any Wave 1 work
- Three.js stack — not needed if CSS hero background is chosen (recommended)

---

## Open Questions

1. **Which ReactBits background component to use for hero**
   - What we know: Aurora/Particles require Three.js (~240KB gzip), likely breaking PageSpeed ≥80 mobile
   - What's unclear: Whether ReactBits has CSS-only or Canvas-only (non-WebGL) background components that are safe for mobile PageSpeed
   - Recommendation: Default plan to CSS animated gradient (zero cost). Planner should add a step to inspect the copy-pasted ReactBits component source for `three` imports before proceeding.

2. **How many React islands will affect Time to Interactive**
   - What we know: `client:load` islands block interactivity until JS loads. With 3–4 `client:load` islands on the page, total JS bundle increases.
   - What's unclear: Exact TTI impact on a 3G mobile connection given current bundle baseline
   - Recommendation: Use `client:visible` for below-fold islands (StatsCounter, ServicesSection animation). Use `client:load` only for HeroContent and PortfolioSection (filter must be ready on load).

3. **Whether to convert ServicesSection to a React island or keep it as Astro**
   - What we know: Staggered card entrance needs Motion. Options: (a) full `.tsx` island, (b) a thin `<AnimatedSection client:visible>` wrapper that wraps each card
   - What's unclear: D-LIB-03 says replace CSS with Motion — unclear if this requires full island conversion
   - Recommendation: Use a thin wrapper island that accepts children-like data as props. Avoids rewriting all the Astro HTML.

---

## Sources

### Primary (HIGH confidence)
- [motion.dev/docs/react-reduce-bundle-size](https://motion.dev/docs/react-reduce-bundle-size) — LazyMotion + domAnimation bundle sizes verified
- [motion.dev/docs/react-animate-presence](https://motion.dev/docs/react-animate-presence) — AnimatePresence mode="popLayout" + layout prop pattern
- [motion.dev/docs/react-quick-start](https://motion.dev/docs/react-quick-start) — Current version 12.x, install command
- [npm registry: `motion` package](https://registry.npmjs.org/) — version 12.38.0 verified
- Codebase direct read — all component files, global.css, BaseLayout.astro, package.json

### Secondary (MEDIUM confidence)
- [github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) — Installation model (copy-paste/shadcn CLI), not npm package
- [thevalleyofcode.com — Adding Framer Motion to Astro](https://thevalleyofcode.com/lesson/astro-integrations/adding-react-framer-motion-animations-to-an-astro-site/) — client:load hydration pattern confirmed
- WebSearch results — ReactBits Aurora/Particles Three.js dependency (cross-referenced from multiple sources)

### Tertiary (LOW confidence)
- Three.js bundle size ~580KB minified / ~160KB gzip — training knowledge, not measured in this session [ASSUMED]
- ReactBits canvas Particles (non-WebGL) bundle size — unverified, check component source on copy-paste

---

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — Motion version verified via npm, LazyMotion API verified via official docs
- Architecture: HIGH — Island pattern verified against existing codebase (NavHamburger.tsx precedent), Astro docs
- ReactBits specifics: MEDIUM — Installation model confirmed, specific component internals (Three.js deps) cross-verified but not source-inspected
- Performance numbers: MEDIUM (Motion), LOW (ReactBits background size) — Motion sizes from official docs, ReactBits bundle from assumed knowledge

**Research date:** 2026-04-04
**Valid until:** 2026-05-04 (Motion API is stable; ReactBits is actively developed, verify any specific component code before copy-paste)
