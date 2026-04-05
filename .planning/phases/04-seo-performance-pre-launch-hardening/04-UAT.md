---
status: testing
phase: 04-seo-performance-pre-launch-hardening
source: [04-01-SUMMARY.md, 05-05-SUMMARY.md]
started: 2026-04-04T00:00:00Z
updated: 2026-04-05T00:00:00Z
---

## Current Test

number: 1
name: robots.txt acessível em produção
expected: |
  Acessar https://gmstudio.pages.dev/robots.txt no navegador.
  Deve retornar texto simples com:
    User-agent: *
    Allow: /
    Sitemap: https://gmstudio.pages.dev/sitemap-index.xml
awaiting: user response

## Tests

### 1. robots.txt acessível em produção
expected: Acessar https://gmstudio.pages.dev/robots.txt — deve mostrar "User-agent: *", "Allow: /", e a diretiva Sitemap apontando para sitemap-index.xml
result: [pending — site not yet deployed to Cloudflare Pages]

### 2. OG image acessível em produção
expected: Acessar https://gmstudio.pages.dev/og-image.png — deve carregar uma imagem 1200x630 com fundo escuro, logo "GMStudio" e tagline visível
result: [pending — site not yet deployed to Cloudflare Pages]

### 3. Sitemap XML acessível
expected: Acessar https://gmstudio.pages.dev/sitemap-index.xml — deve retornar XML válido com entradas de sitemap
result: [pending — site not yet deployed to Cloudflare Pages]

### 4. Meta tags OG e Twitter no código-fonte
expected: Ver código-fonte da homepage (Ctrl+U ou DevTools). Buscar por "og:image" — deve encontrar og:type, og:url, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image
result: [pending — site not yet deployed to Cloudflare Pages]

### 5. Número WhatsApp corrigido
expected: Ver código-fonte da homepage e buscar por "wa.me" — deve mostrar https://wa.me/5543996142514 (não o placeholder 5511999999999)
result: [pending — site not yet deployed to Cloudflare Pages]

### 6. Preview OpenGraph (opengraph.xyz)
expected: Acessar https://www.opengraph.xyz e colar https://gmstudio.pages.dev — o preview deve mostrar: título "GMStudio — Presença digital para empresas", descrição em português, e a imagem escura do GMStudio
result: [pending — site not yet deployed to Cloudflare Pages]

### 7. PageSpeed Insights — Performance Score
expected: Score >= 90 no PageSpeed Insights (https://pagespeed.web.dev) para https://gmstudio.pages.dev
result: [pending deployment — cannot run PageSpeed on local build]
note: Static Astro build with LazyMotion + domAnimation feature set (~6KB extra JS for animated islands) is expected to maintain a high score. Islands use client:visible (below fold) so LCP is not affected.

## Phase 05 Animation Audit — Static Code Review Results

Audit performed on 2026-04-05 against source files. Build verified with `npm run build` — zero errors.

### HeroContent.tsx (05-02)

| Check | Result |
|-------|--------|
| LazyMotion + domAnimation feature set | PASS |
| Imports from `motion/react-m` (m.*) not full motion | PASS |
| useReducedMotion disables all animations | PASS |
| spring variants for headline words | PASS |
| staggerChildren 0.12s container | PASS |
| whileTap on primary CTA | PASS |
| No Three.js / @react-three / cannon imports | PASS |
| noscript fallback present in HeroSection.astro | PASS |

### ServicesAnimations.tsx (05-03)

| Check | Result |
|-------|--------|
| LazyMotion + domAnimation feature set | PASS |
| Imports from `motion/react-m` (m.*) | PASS |
| useReducedMotion omits all variant props | PASS |
| container/item variants pattern | PASS |
| staggerChildren 0.08s | PASS |
| whileInView + viewport.once | PASS |
| Mounted with client:visible in ServicesSection.astro | PASS |

### StatsCounter.tsx (05-03)

| Check | Result |
|-------|--------|
| LazyMotion + domAnimation feature set | PASS |
| useMotionValue + useTransform + useInView | PASS |
| animate() drives count 0 → target in 1.5s easeOut | PASS |
| Reduced motion via window.matchMedia (set final value immediately) | PASS |
| Mounted with client:visible in AboutSection.astro | PASS |
| No third-party counter library | PASS |

### PortfolioIsland.tsx (05-04)

| Check | Result |
|-------|--------|
| LazyMotion + domAnimation feature set | PASS |
| AnimatePresence mode="popLayout" | PASS |
| useReducedMotion disables layout + transitions | PASS |
| layout prop for grid reflow | PASS |
| whileHover y: -4 card lift | PASS |
| Stable key={project.id} (not array index) | PASS |
| Empty state rendered when no projects match | PASS |
| Mounted with client:load in PortfolioSection.astro | PASS |

### Overall Animation Audit Result

All 4 React islands PASS static code review. Build is clean. No accessibility regressions found. All islands respect `prefers-reduced-motion`.

## Summary

total: 7
passed: 0
issues: 0
pending: 7
skipped: 0
blocked: 0

## Gaps

- PageSpeed score pending deployment (tests 1-7 require live URL at gmstudio.pages.dev)
- Animation quality (smoothness, visual hierarchy, timing feel) requires browser verification after deployment
