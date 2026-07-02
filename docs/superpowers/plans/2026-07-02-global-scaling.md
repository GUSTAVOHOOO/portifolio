# Global Sizing and Typography Scaling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scale all typography, spacing, and layout components proportionally to make the site elements feel larger and more readable.

**Architecture:** We will set responsive `font-size` percentages on the root `html` element. Because all components and style tokens use `rem` units, this will scale all text and space properties proportionally.

**Tech Stack:** Astro 6, Tailwind CSS v4, Vanilla CSS.

---

## Proposed Changes

### Styles Component

#### [MODIFY] [global.css](file:///c:/Users/Windows%2011/Documents/gastar-tokens/src/styles/global.css)

### Task 1: Modify global.css

**Files:**
- Modify: [global.css](file:///c:/Users/Windows%2011/Documents/gastar-tokens/src/styles/global.css)

- [ ] **Step 1: Apply global scaling CSS rule to html selector**

Update `src/styles/global.css` lines 28-31 to scale `html` root font-size:

```css
/* Smooth scroll + scroll-padding for fixed nav + global typography/spacing scale */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 4.5rem; /* Escala proporcionalmente ao tamanho base (72px em 16px base) */
  font-size: 106.25%; /* ~17px base para dispositivos móveis */
}

@media (min-width: 1024px) {
  html {
    font-size: 112.5%; /* ~18px base para desktop (aumento proporcional de 12.5%) */
  }
}
```

- [ ] **Step 2: Commit changes**

Run:
```bash
git add src/styles/global.css
git commit -m "feat: scale typography and layout globally by updating html root font-size"
```

---

## Verification Plan

### Automated Tests
- Run `npm run check` to verify Astro and TypeScript types remain correct.
- Run `npm run build` to ensure the production build finishes without any errors.

### Manual Verification
- Start local development server with `npm run dev`.
- Visit `http://localhost:4321` and verify that the layout and typography look slightly larger on both desktop and simulated mobile viewports.
- Check that the header navigation offsets scroll targets correctly with the new `scroll-padding-top: 4.5rem`.
