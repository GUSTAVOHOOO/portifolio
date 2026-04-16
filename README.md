# GMStudio Portfolio

Uma landing page e portfólio de alta conversão para o GMStudio. Desenvolvido com uma arquitetura híbrida de Astro e React, possui animações ricas, tipografia moderna (Geist) e efeitos interativos focados em retenção de usuários e conversão.

## Key Features

- **Performance Híbrida**: Arquitetura Astro com hidratação seletiva (Islands) para os componentes React
- **Animações Fluidas**: Micro-interações premium construídas com Framer Motion, GSAP e componentes customizados
- **Design System Dinâmico**: Paleta de cores centralizada com suporte a *Glassmorphism*, gradientes adaptativos e tipografia Geist
- **Formulário de Contato Direto**: Integrado com Web3Forms para facilitar captação de leads

---

## Tech Stack

- **Framework Principal**: Astro 6+
- **Livraria de UI**: React 19
- **Animações (UX/UI)**: Framer Motion, GSAP, react-bits (ShinyText, MagicRings, RippleGrid)
- **Styling**: Tailwind CSS v4, Vanilla CSS (Variáveis HSL)
- **Tipografia**: Geist Sans & Geist Mono
- **Gestão de Formulários**: Web3Forms

---

## Prerequisites

- Node.js 22.12.0 ou superior (conforme o _engines_ spec do `package.json`)
- NPM (ou gerenciador equivalente, como pnpm ou yarn)

---

## Getting Started

### 1. Clone o Repositório

```bash
git clone https://github.com/GUSTAVOHOOO/portifolio.git
cd portifolio
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Environment Setup

O site necessita de uma API key do **Web3Forms** para o processamento de envios do formulário de contato.

Copie o arquivo de exemplo de ambiente:

```bash
cp .env.example .env
```

Abra o arquivo `.env` e configure suas chaves:

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `PUBLIC_WEB3FORMS_KEY` | Chave de Acesso Pública do Web3Forms | `sua-chave-de-acesso` |

_Você pode conseguir essa chave gratuitamente [neste link do Web3Forms](https://web3forms.com)._

### 4. Start Development Server

Inicie o servidor local do Astro em seu terminal:

```bash
npm run dev
```

Abra `http://localhost:4321` (ou a porta informada pelo Astro) no seu navegador. Os componentes isolados do React aparecerão dinamicamente graças ao framework Astro.

---

## Architecture

### Directory Structure

```text
├── public/                 # Assets estáticos servidos diretamente na raíz
├── src/
│   ├── assets/             # Logos, ícones base e SVGs
│   ├── components/         # Módulos de Interface (.astro, .tsx, .jsx e estilos associados)
│   ├── content/            # Coleções otimizadas (schema logic no content.config.ts)
│   ├── data/               # Configuração ou hardcoded data (opcional)
│   ├── layouts/            # BaseLayout.astro (esqueleto HTML e head meta tag setup)
│   ├── pages/              # Rotas da web do Astro baseadas no filesystem
│   └── styles/             # Arquivos globais de CSS: global.css, tokens.css (Design System)
├── .env.example            # Molde de variáveis de ambiente
├── astro.config.mjs        # Arquivo principal de configuração do SSG (Astro)
├── package.json            # Dependências e scripts
└── tsconfig.json           # Configuração de transpilador TypeScript
```

### Key Components

O frontend é dividido logicamente em componentes visuais:

**`HeroSection.astro` / `HeroContent.tsx`**
Componente principal para atrair o usuário inicial, apresentando quebra de linha em cascata animada, _Shiny Text_ com reflexão baseada nas palavras ativas e efeito de fundo pelo `MagicRings.jsx`.

**`MagicBento.tsx`**
Um grid expansível de exibição de Serviços / Stats inspirado no layout Bento moderno, operando sobre animações com o `framer-motion`.

**`PortfolioIsland.tsx`**
Interface fluida que pode hospedar galerias modais e cases demonstrando proficiência de UX/UI.

---

## Environment Variables

### Required

| Variable               | Description                       | How to Get                             |
| ---------------------- | --------------------------------- | -------------------------------------- |
| `PUBLIC_WEB3FORMS_KEY` | Autenticação no Form da UI        | Cadastre um site em https://web3forms.com |

---

## Available Scripts

| Command                       | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| `npm run dev`                 | Inicializa o servidor Astro local                   |
| `npm run build`               | Compila as dependências e gera o site estático para produção         |
| `npm run preview`             | Roda a cópia exata do site estático final p/ teste de performance |
| `npm run check`               | Verifica os tipos nas páginas `.astro`                  |

---

## Deployment

Sendo o Astro configurado por padrão como _Static Site Generator (SSG)_, ele se empacotará numa página de HTML pura com JS e CSS comprimidos ao final do Build, perfeitamente prontas para Edge Networks.

### Vercel / Netlify

Se você conectar seu repositório no Vercel ou Netlify, tudo funcionará de forma natural (zero config). Se for necessário preencher de configurações de Build manualmente na plataforma:

1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. Inclua a Variável de Ambiente `PUBLIC_WEB3FORMS_KEY` correspondente no painel de settings do deploy final.

### Manual / VPS Deployment

```bash
# Baixe a branch
git pull origin master

# Instale dependências
npm install

# Build
npm run build 

# O seu HTML, CSS e JS enxutos estarão prontos na pasta 'dist/'. Copie-os para o root do servidor (Nginx/Apache)
cp -r dist/* /var/www/html/
```

---

## Troubleshooting

### Animações ou estilos parando de computar ao alterar uma classe

Sempre que utilizar **Astro** com **Tailwind CSS v4()**, o JIT rastreia os componentes integrados em `.tsx`. Se um componente novo sumir da tela por falta de estilos, verifique se você o importou nos layouts globais ou tente matar o processo, depois rodar:

```bash
npm run dev
```

### Componente React não reagindo no DOM

Sempre preste atenção às ilhas (*Island Architecture*)! Se um de seus novos arquivos `.tsx` usar hooks como `useState` ou animações do componente de `<motion.div>`, você precisará sinalizar ao componente `.astro` para hidratá-lo com a diretiva correta (Exemplo: `client:load`, `client:idle` ou `client:visible`).

```astro
<!-- Correto ✅ -->
<MagicBento client:load />

<!-- Errado ❌ O estado interativo nulo não rodará em tempo real. -->
<MagicBento />
```

---

## Contribuições

Sendo este um projeto pessoal focado em portfolio comercial, sinta-se à vontade para se basear ou fazer Fork, mas restrinja informações referentes aos contatos.

---

[Desenvolvido por Gustavo](https://github.com/GUSTAVOHOOO)
