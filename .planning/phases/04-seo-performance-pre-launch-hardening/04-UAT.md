---
status: testing
phase: 04-seo-performance-pre-launch-hardening
source: [04-01-SUMMARY.md]
started: 2026-04-04T00:00:00Z
updated: 2026-04-04T00:00:00Z
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
result: [pending]

### 2. OG image acessível em produção
expected: Acessar https://gmstudio.pages.dev/og-image.png — deve carregar uma imagem 1200x630 com fundo escuro, logo "GMStudio" e tagline visível
result: [pending]

### 3. Sitemap XML acessível
expected: Acessar https://gmstudio.pages.dev/sitemap-index.xml — deve retornar XML válido com entradas de sitemap
result: [pending]

### 4. Meta tags OG e Twitter no código-fonte
expected: Ver código-fonte da homepage (Ctrl+U ou DevTools). Buscar por "og:image" — deve encontrar og:type, og:url, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image
result: [pending]

### 5. Número WhatsApp corrigido
expected: Ver código-fonte da homepage e buscar por "wa.me" — deve mostrar https://wa.me/5543996142514 (não o placeholder 5511999999999)
result: [pending]

### 6. Preview OpenGraph (opengraph.xyz)
expected: Acessar https://www.opengraph.xyz e colar https://gmstudio.pages.dev — o preview deve mostrar: título "GMStudio — Presença digital para empresas", descrição em português, e a imagem escura do GMStudio
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps

[none yet]
