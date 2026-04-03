---
phase: 02-project-foundation-data-layer
plan: 02
subsystem: data
tags: [astro, content-collections, zod, typescript]

requires:
  - phase: 02-project-foundation-data-layer
    plan: 01
    provides: Astro project with tsconfig strict, src/styles/global.css, BaseLayout

provides:
  - src/content.config.ts with 4 Zod-validated collection schemas
  - src/data/services.json (4 service entries)
  - src/data/team.json (2 team entries)
  - src/data/testimonials.json (2 testimonial entries)
  - src/content/projects/padaria-do-joao.md
  - src/content/projects/barbearia-style.md
  - src/assets/projects/placeholder-600x400.jpg
  - src/assets/team/placeholder-400x400.jpg

affects: [02-03, 03-ui-components]

tech-stack:
  added: []
  patterns:
    - "Astro Content Layer: file() loader for JSON arrays, glob() loader for .md frontmatter"
    - "z from astro:content — not standalone zod — to avoid version conflicts"
    - "JSON data files as top-level arrays (not objects with nested arrays)"

key-files:
  created:
    - src/content.config.ts
    - src/data/services.json
    - src/data/team.json
    - src/data/testimonials.json
    - src/content/projects/padaria-do-joao.md
    - src/content/projects/barbearia-style.md
    - src/assets/projects/placeholder-600x400.jpg
    - src/assets/team/placeholder-400x400.jpg
  modified: []

key-decisions:
  - "Import z from astro:content (not zod) to avoid version mismatch per RESEARCH.md anti-patterns"
  - "JSON data files as top-level arrays — Astro file() loader requirement"
  - "Placeholder images generated with sharp at exact contract dimensions (600x400, 400x400)"

requirements-completed: [SEO-02]

duration: 10min
completed: 2026-04-03
---

# Phase 02 Plan 02: Content Collections and Data Layer Summary

**4 Zod-validated Astro content collections defined (services, team, testimonials, projects) with populated JSON/MD data files and sharp-generated placeholder images; build passes without errors.**

## Performance

- **Duration:** ~10 min
- **Completed:** 2026-04-03
- **Tasks:** 2/2
- **Files modified:** 8

## Accomplishments

### Task 1: Create content.config.ts with all collection schemas

- Defined 4 collections using Astro Content Layer API
- services, team, testimonials: file() loader targeting JSON arrays in src/data/
- projects: glob() loader targeting src/content/projects/**/*.md
- category enum enforced: loja, cardapio, landing-page, institucional
- Used z from astro:content to avoid standalone zod version conflicts
- Commit: 408a620

### Task 2: Populate data files, project markdown, and placeholder images

- services.json: 4 entries matching SERV-01 service types (landing-page, loja, cardapio, institucional)
- team.json: 2 placeholder entries (gustavo, membro-2)
- testimonials.json: 2 placeholder entries (João Silva, Maria Santos)
- padaria-do-joao.md: category=loja, featured=true
- barbearia-style.md: category=institucional, featured=false
- Placeholder images generated via sharp: 600x400 and 400x400 dark gray (#1A1A24) JPGs
- `npx astro build` passes — all 4 collections Zod-validated, 1 page built
- Commit: 498455d

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- src/data/team.json: "membro-2" entry is a placeholder (name "Membro da Equipe", role "Designer") — must be replaced with real team member data before Phase 3 finalizes the About section
- src/assets/projects/placeholder-600x400.jpg: solid-color placeholder — must be replaced with real project screenshots before launch
- src/assets/team/placeholder-400x400.jpg: solid-color placeholder — must be replaced with real team photos before launch
- liveUrl values in project .md files point to example.com — must be updated with real URLs

These stubs are intentional and documented. Phase 3 components can render against them for layout development; real content is a Phase 1 deliverable dependency.

## Self-Check: PASSED

- src/content.config.ts: FOUND
- src/data/services.json: FOUND (4 entries, top-level array)
- src/data/team.json: FOUND
- src/data/testimonials.json: FOUND
- src/content/projects/padaria-do-joao.md: FOUND
- src/content/projects/barbearia-style.md: FOUND
- src/assets/projects/placeholder-600x400.jpg: FOUND
- src/assets/team/placeholder-400x400.jpg: FOUND
- Build: PASSED (1 page, no Zod errors)
- Commits: 408a620, 498455d
