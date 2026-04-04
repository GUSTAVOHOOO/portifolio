# Pendências para Revisar Antes do Lançamento Final

## Fase 04 — SEO & Pre-launch

- [ ] **Deploy do fix do WhatsApp** — commit `68b69c7` corrigiu o número em HeroSection e ContactSection, mas ainda precisa buildar e deployar no Workers para entrar em produção.

- [ ] **Atualizar `site` no `astro.config.mjs`** — atualmente aponta para `https://gmstudio.pages.dev`, que não é o domínio real. OG image e sitemap estão gerando URLs erradas. Atualizar quando o domínio final for definido.

- [ ] **Verificar PageSpeed Insights (mobile)** — meta da fase 04 era score ≥ 80 no mobile. Ainda não foi medido em produção. Checar em: https://pagespeed.web.dev

- [ ] **Verificar preview OpenGraph (opengraph.xyz)** — colar a URL de produção em https://www.opengraph.xyz e confirmar título, descrição e imagem. A OG image aponta para `gmstudio.pages.dev/og-image.png` então depende do item acima.

## Conteúdo (pendente do cliente)

- [ ] **Fotos da equipe** — `team.json` tem 2 membros mas sem foto. Substituir pelos dados reais quando o cliente fornecer.

- [ ] **Projetos do portfólio** — os projetos atuais são placeholders. Substituir com thumbnails e links reais.

- [ ] **Domínio final** — definir e configurar o domínio definitivo (ex: gmstudio.com.br) no Cloudflare Workers + atualizar `astro.config.mjs`.
