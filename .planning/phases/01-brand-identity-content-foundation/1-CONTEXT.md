# Phase 1: Brand Identity & Content Foundation - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Create GMStudio's locked visual identity (logo, color tokens, typography, style guide) and gather core content assets (portfolio project images, team photos) before any UI code is written. This phase is a hard gate — Phase 2 cannot begin until brand is signed off.

Requirements in scope: BRAND-01, BRAND-02, BRAND-03, BRAND-04

Out of scope for this phase: site code, Astro setup, copy/testimonials (Phase 3), /style-guide Astro page (Phase 2).

</domain>

<decisions>
## Implementation Decisions

### Brand Personality & Visual Direction
- **D-01:** Dark mode premium aesthetic — near-black background (~#0A0A0F), white text (~#F8F8F8), electric accent
- **D-02:** Accent color: Indigo #6366F1 (hover: #4F46E5; surface tint: #1E1B4B at ~10% opacity)
- **D-03:** The site itself is the portfolio — design must be elaborate and showcase UI/UX quality, not just describe it. Minimalism for minimalism's sake is the wrong direction; the design should be RICH and detailed.
- **D-04:** Visual references: Resend.com, Linear.app, Vercel.com — confident, polished, detail-oriented
- **D-05:** Cards use glassmorphism and/or subtle borders — avoid flat, textureless surfaces

### Logo Production
- **D-06:** Logo created by Claude as SVG directly — no external design tool required
- **D-07:** Logo style: wordmark typographic — "GMStudio" in custom bold lettering with accent color (#6366F1) on "GM" or a geometric accent detail
- **D-08:** Two required variations: full wordmark ("GMStudio" or "GM Studio") + icon/favicon variant ("GM" initials)
- **D-09:** Workflow: Claude proposes 3 SVG concepts → user approves or requests iteration → final saved to `src/assets/logo/`

### Typography
- **D-10:** Heading font: geometric sans-serif (e.g., Inter, Space Grotesk, or similar — Claude's discretion within this style)
- **D-11:** Body font: neutral sans-serif, highly readable (Claude's discretion)
- **D-12:** Both fonts must be available via Google Fonts (free, self-hostable)

### Color Tokens
- **D-13:** Tokens expressed as CSS custom properties in a single file (`src/styles/tokens.css`)
- **D-14:** Token naming follows the pattern: `--color-bg`, `--color-surface`, `--color-accent`, `--color-accent-hover`, `--color-text`, `--color-text-muted`, `--color-border`
- **D-15:** Full token set includes: background, surface (card/panel), accent, accent-hover, accent-surface, text-primary, text-muted, border

### Style Guide Format & Phasing
- **D-16:** Phase 1 deliverable: `docs/STYLE-GUIDE.md` — Markdown file documenting logo paths, color tokens (hex + CSS var), typography scale, and correct/incorrect usage rules
- **D-17:** Phase 2 deliverable: `src/pages/style-guide.astro` — visual Astro page that renders the tokens live in the browser (note for Phase 2 planner: build this from STYLE-GUIDE.md as source of truth)

### Content Scope
- **D-18:** Portfolio project images ARE in scope for Phase 1 — thumbnails and screenshots of real client cases must be gathered and added to `src/assets/projects/` before Phase 3
- **D-19:** Team photos ARE in scope for Phase 1 — photos of agency members must be gathered and added to `src/assets/team/` before Phase 3
- **D-20:** Copy (hero text, services copy, about text) and testimonials are NOT in scope for Phase 1 — they will be written/gathered during Phase 3

### Claude's Discretion
- Exact font weights and line-height scale (within the geometric/neutral sans direction)
- Specific SVG construction of the wordmark logo (letter-spacing, weight, exact proportions)
- Number of type size steps in the scale (e.g., xs/sm/base/lg/xl/2xl/3xl)
- Exact spacing between logo mark and wordmark text in the lockup

</decisions>

<specifics>
## Specific Ideas

- "O face do site tem que refletir o nosso trabalho" — the site is a direct demonstration of design craft, not just a description
- "Queremos focar bastante na UI/UX pois o design é o nosso foco" — UI/UX quality is the primary differentiator for GMStudio
- Dark mode + indigo accent combination mirrors premium SaaS tools (Linear, Resend, Vercel) — this is intentional positioning: GMStudio builds at that quality level
- The wordmark logo should feel like it belongs next to Linear or Vercel in a tools list — confident, geometric, contemporary

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements and scope
- `.planning/REQUIREMENTS.md` — Full v1 requirements with BRAND-01 through BRAND-04 definitions; traceability table showing which reqs are Phase 1 vs later
- `.planning/PROJECT.md` — Core value, constraints (especially "brand is a hard gate before Phase 2"), key decisions

### Roadmap and phase gate
- `.planning/ROADMAP.md` §"Phase 1" — Success criteria defining what "done" means (logo SVG with variations, CSS custom properties file, typography documented, one-page style guide)

No external specs or ADRs exist yet — all requirements are captured in the files above and in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — project directory is empty. No existing components, hooks, or utilities.

### Established Patterns
- None yet — Phase 1 is the first phase. Patterns will be established starting Phase 2.

### Integration Points
- `src/assets/logo/` — Logo SVGs created here will be imported by Astro in Phase 2
- `src/styles/tokens.css` — CSS token file created here will be imported globally in Phase 2's Astro layout
- `docs/STYLE-GUIDE.md` — Will be used as source of truth for Phase 2's `/style-guide.astro` page

</code_context>

<deferred>
## Deferred Ideas

- `/style-guide.astro` visual page — explicitly deferred to Phase 2 (Astro project must exist first)
- Copy and testimonials — deferred to Phase 3 (will be gathered alongside component development)
- CMS for brand assets — deferred to post-launch milestone (out of scope per PROJECT.md)

</deferred>

---

*Phase: 01-brand-identity-content-foundation*
*Context gathered: 2026-03-30*
