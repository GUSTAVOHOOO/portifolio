# Spec: Global Sizing and Typography Scaling

## Goal
Scale up all typography, spacing, and component sizes proportionally to address the feedback that the site feels too small (like it is rendered at 90% screen zoom).

## Approach
By setting a custom font-size on the root `html` element, we scale the baseline unit (`1rem`). Because the GMStudio codebase uses `rem` for typography scale, paddings, and margins, all components will scale up proportionally.

## Proposed Changes
We will modify the root `html` selector in `src/styles/global.css`:

1. Set `font-size: 106.25%` (equivalent to 17px base) for mobile and tablet views.
2. Set `font-size: 112.5%` (equivalent to 18px base) for desktop screens (`@media (min-width: 1024px)`).
3. Convert hardcoded pixel `scroll-padding-top` value from `72px` to `4.5rem` so it scales automatically with the menu height.

## Verification
- Start the local development server with `npm run dev`.
- Inspect the landing page at multiple screen resolutions (mobile, tablet, desktop).
- Verify that text, padding, and layout scale up cleanly and no elements overflow their containers.
