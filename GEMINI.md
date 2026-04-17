# GEMINI.md

Este arquivo fornece orientações e contexto técnico para interações com o Gemini CLI neste repositório.

## Visão Geral do Projeto
O **GMStudio Portfolio** é uma landing page de alta conversão e portfólio profissional desenvolvido para o GMStudio. O projeto utiliza uma arquitetura moderna e performática, focada em animações fluidas e design premium.

- **Tipo**: Landing Page / Portfólio (SSG)
- **Tecnologias Principais**: Astro 6+, React 19, Tailwind CSS v4, Framer Motion, GSAP.
- **Conceito**: Arquitetura de Ilhas (Islands Architecture) para carregamento otimizado de componentes interativos.

## Comandos de Desenvolvimento

```bash
npm run dev        # Inicia o servidor de desenvolvimento (http://localhost:4321)
npm run build      # Compila o site estático para a pasta dist/
npm run preview    # Visualiza o build de produção localmente
npm run check      # Executa verificação de tipos Astro/TypeScript
```

**Requisitos**: Node.js >= 22.12.0.
**Ambiente**: Requer a variável `PUBLIC_WEB3FORMS_KEY` no arquivo `.env` (baseado no `.env.example`).

## Arquitetura e Organização

### Estrutura de Diretórios
- `src/components/`: Organizado por responsabilidade visual:
  - `sections/`: Seções principais da página (arquivos `.astro`).
  - `layout/`: Componentes de estrutura (Nav, Footer).
  - `blocks/`: Ilhas interativas React (`.tsx`).
  - `ui/`: Efeitos visuais reutilizáveis (Backgrounds, Bento grids).
- `src/content/`: Conteúdo dinâmico (projetos em Markdown).
- `src/data/`: Dados estruturados em JSON para serviços, equipe e depoimentos.
- `src/styles/`: Centralização de design tokens e estilos globais.

### Convenções de Desenvolvimento
- **Hidratação de Componentes**: Componentes React interativos devem ser hidratados explicitamente no Astro usando diretivas como `client:load` ou `client:visible`.
- **Sistema de Estilo**: 
  - Utiliza **Tailwind CSS v4** via plugin Vite.
  - **Design Tokens**: Definidos em `src/styles/tokens.css` (HSL).
  - **Bridge Tailwind**: Os tokens são expostos ao Tailwind via bloco `@theme` em `src/styles/global.css`. **Nunca utilize hex codes diretamente nos componentes.**
  - **Co-location**: Arquivos `.css` de componentes devem residir na mesma pasta que seus respectivos arquivos `.tsx`.
- **Tipografia**: Utiliza as fontes Geist Sans e Geist Mono.
- **Design System**: Estética "Dark Premium" com uso extensivo de *glassmorphism* (classe `.glass-card`).

## Coleções de Conteúdo (Content Collections)
O schema está definido em `src/content.config.ts`:
- `projects`: Projetos do portfólio (Markdown).
- `services`: Serviços oferecidos (JSON).
- `team`: Membros da equipe (JSON).
- `testimonials`: Depoimentos de clientes (JSON).

## Fluxo de Contato
- Os formulários de contato são integrados ao **Web3Forms**.
- A chave pública `PUBLIC_WEB3FORMS_KEY` é necessária para o funcionamento do envio.

## Implantação
O site é gerado como um site estático puro e está configurado para deploy no **Cloudflare Pages** (`gmstudio.pages.dev`).
