# UI/UX Audit — GMStudio Site
**Data:** 2026-04-05  
**Método:** Inspeção de código (100% dos componentes) + Chrome browser automation  
**Branch:** master  

---

## Resumo Executivo

O site possui uma base de código bem estruturada com boas escolhas de tokens e componentes, mas tem **problemas críticos de visibilidade** que precisam ser resolvidos antes de qualquer ajuste visual. A maioria do conteúdo está **invisível** para o usuário real devido a um bug de hydratação, e quando visível, sofre de espaçamento inconsistente, tipografia subdimensionada e falta de hierarquia visual entre seções.

**Status atual:** O site está quebrado em produção equivalente. Prioridade máxima é corrigir o bug de hydratação.

---

## 🔴 CRÍTICO — Bug: Conteúdo Invisível

### Problema raiz
O projeto tem **Vite 8.0.3 instalado**, mas o Astro requer **Vite 7**. Isso quebra a hydratação de todas as ilhas React (`client:load` e `client:visible`).

**Consequência:**  
Todas as ilhas React (`HeroContent`, `ServicesAnimations`, `PortfolioIsland`, `StatsCounter`, `AuroraBackground`, `ContactForm`, `NavHamburger`) inicializam com `mounted = false`. O hook `useEffect(() => setMounted(true), [])` nunca dispara corretamente, então todos os elementos animados ficam travados no estado `hidden` com `opacity: 0`.

**Resultado visual:** O visitante vê apenas o fundo preto do Aurora e a navbar. Todo o conteúdo abaixo fica invisível.

**Fix:**  
```json
// package.json — adicionar:
"overrides": {
  "vite": "^7"
}
```
Então: `npm install`

### Arquivos afetados
- `src/components/HeroContent.tsx` — hero inteiro invisível
- `src/components/ServicesAnimations.tsx` — cards de serviços e processo invisíveis
- `src/components/PortfolioIsland.tsx` — portfólio invisível
- `src/components/StatsCounter.tsx` — contadores invisíveis
- `src/components/AuroraBackground.tsx` — background renderiza mas blobs não animam
- `src/components/ContactForm.tsx` — formulário invisível
- `src/components/NavHamburger.tsx` — menu mobile invisível

---

## 🔴 CRÍTICO — Bug: Estilos CSS Escopados Não Aplicados no React Island

### Problema
Os estilos CSS para `.services-grid`, `.process-steps` e `.process-step` são definidos em `ServicesSection.astro` **sem `is:global`**, portanto ficam escopados com hash (ex: `.services-grid.astro-abc123`). Porém, essas classes são usadas em `ServicesAnimations.tsx` (React island) — elementos renderizados fora do escopo Astro não recebem o hash, logo **os estilos de layout nunca se aplicam**.

**Resultado:** Grid de serviços renderiza como coluna única em todos os tamanhos. Steps de processo nunca ficam horizontais no desktop.

**Fix:** Mover esses estilos para `global.css` ou adicionar `is:global` no `<style>` de `ServicesSection.astro` para as classes que são usadas no island.

---

## 🟠 GRAVE — Tipografia: Tamanhos Subdimensionados

| Elemento | Atual | Recomendado | Por quê |
|---|---|---|---|
| Hero headline | `text-5xl` (48px) | `text-6xl` (60px) desktop / `text-4xl` mobile | 48px está pequeno num viewport 1920px. Não impacta. |
| Hero subtitle | `text-base` (16px) | `text-lg` ou `text-xl` (18–20px) | Contraste hierárquico insuficiente com o headline |
| Section headings | `text-3xl`/`text-4xl` | `text-4xl`/`text-5xl` | As seções parecem ter o mesmo peso visual que conteúdo |
| Service card title | `text-xl` (20px) | `text-2xl` (24px) | Muito pequeno para títulos de card premium |
| Process step title | `text-xl` (20px) | `text-xl` OK, mas `font-weight: 600` seria melhor que 700 (menos pesado) | — |
| Stats numbers | `text-5xl` (48px) | `text-6xl` (60px) | Números devem impactar visualmente |
| Section labels | `text-sm` uppercase no footer | OK | — |

---

## 🟠 GRAVE — Espaçamento: Seções Coladas e Mal Proporcionadas

### Hero Section
- **Conteúdo posicionado muito baixo**: Com `min-height: 100vh`, `padding-top: 80px`, `padding-bottom: 96px` e `align-items: center`, o conteúdo visual fica no terço inferior da tela, deixando o topo sem propósito. O espaço acima do headline parece desperdiçado.
- **Assimetria**: `padding-top: 80px` vs `padding-bottom: 96px` sem justificativa. Usar `padding: 120px var(--space-4) 80px` equilibra melhor.
- **Container muito estreito**: `max-width: 48rem` (768px) para um hero de 1920px deixa todo o texto espremido no centro e muda o tamanho do font para parecer menor do que é.
- **Gap entre headline e subtitle**: `margin-top: var(--space-6)` = 24px. Muito próximo. Deveria ser `var(--space-8)` = 32px.

### Services Section
- **Heading sem eyebrow/subtexto**: O heading "O que fazemos" não tem contexto de apoio (subtítulo pequeno acima ou abaixo) — parece solto.
- **Gap entre heading e grid**: `margin-bottom: var(--space-12)` = 48px. OK mas podia ser `var(--space-16)` para respirar mais.
- **Process steps sem separação visual**: No mobile, os 3 steps têm `gap: var(--space-8)` = 32px entre si, mas sem qualquer divisória, linha ou background diferenciado, tudo parece uma lista de texto corrido. Em desktop (quando funcionando), os steps horizontais com linha pontilhada são bons, mas a linha só aparece via `::after` no `.process-step` escopado (bug citado acima).

### Portfolio Section  
- **Padding horizontal**: `var(--space-4)` = 16px em mobile. Muito apertado — cards quase sem margem nas bordas da tela.
- **`var(--space-10)` (`50px`) não existe nos tokens**: O `PortfolioIsland.tsx` usa `marginBottom: 'var(--space-10)'` para os filter tabs, mas `--space-10` não está definido em `tokens.css`. Vai resolver para `0` ou valor herdado do browser.

### About Section
- **Dois `h2` na mesma seção**: `AboutSection.astro` tem `h2 "Sobre a GMStudio"`, depois `h2 "Nossos valores"`, depois `h2 "Nossa equipe"`. Semanticamente incorreto (só pode haver um `h2` como heading principal de seção; os outros devem ser `h3`).
- **Bloco de valores sem padding interno**: Os value cards (`Transparência`, `Qualidade`, etc.) são apenas divs com texto, sem borda ou background. No fundo preto, ficam invisíveis enquanto o contexto não for lido — não há separação visual entre os 4 valores.
- **Espaçamento `story-grid`**: `gap: var(--space-16)` = 64px no desktop é muito generoso comparado ao gap de `var(--space-12)` do mobile. Inconsistência perceptível.

### Testimonials Section
- **Padding lateral `0`**: `section#depoimentos { padding: var(--space-24) 0 }` — sem padding horizontal na seção. O marquee-wrapper tem `overflow: hidden` então o fade lateral funciona, mas em telas pequenas o efeito fica cortado.
- **Cards fixos em 320px**: No mobile (375px), cards de 320px mais gap de 24px = 344px → overflow horizontal possível.

### Contact Section
- **Padding horizontal mobile**: `var(--space-4)` = 16px — muito justo.
- **Formulário sem feedback de erro inline**: `ContactForm.tsx` tem estado `'error'` mas não mostra mensagem de erro no DOM (nenhum elemento de erro renderizado).

### Footer
- **`padding: var(--space-16) var(--space-4) var(--space-8)`**: padding top 64px, lateral 16px, bottom 32px. O padding lateral 16px é insuficiente no mobile.

---

## 🟡 MODERADO — Componentes: Problemas Específicos

### Nav
- **Sem CTA no header**: Agências sérias sempre têm um botão "Solicitar orçamento" ou "WhatsApp" no header. Atualmente, o visitor precisa scrollar até o footer para encontrar contato.
- **Logo 32px de altura**: Muito pequeno. Recomendado 40px de altura.
- **Nav links `text-sm` (14px)**: No limite de legibilidade para texto de navegação. `text-base` (16px) seria mais confortável.
- **Sem indicador de seção ativa**: Ao scrollar, nenhum link da nav fica "ativo" (seria um `IntersectionObserver` simples mas muito relevante para UX).

### Hero
- **"Ver portfolio" quase invisível**: O secondary CTA tem `border: 1px solid var(--color-border)` onde `--color-border: rgba(248, 248, 248, 0.08)`. Com 8% de opacidade em background escuro, a borda é praticamente imperceptível. Usar `rgba(248, 248, 248, 0.25)` ou `var(--color-border-accent)`.
- **Sem scroll indicator**: Nenhuma indicação visual de que há conteúdo abaixo (seta animada, texto "scroll", etc.). Com hero fullscreen, muitos visitantes não scrollam.
- **WhatsApp CTA sem número aparente**: O botão leva direto ao WhatsApp mas não mostra o número de referência. Considerar um badge ou texto de apoio.

### Services
- **Sem CTA após serviços**: Após ler os serviços, o visitante não tem call-to-action imediato ("Quero um orçamento", "Falar sobre meu projeto"). O único CTA é o hero e o footer.
- **Icon container shadow muito sutil**: `boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)'` — quase imperceptível. Pode ser `rgba(99, 102, 241, 0.35)`.

### Portfolio
- **`--space-10` undefined**: `marginBottom: 'var(--space-10)'` nos filter tabs — token inexistente, vai ser 0px. Os filter tabs ficam sem espaço do grid abaixo.
- **Filter tabs minHeight `36px`**: Abaixo dos 44px recomendados para touch targets (WCAG 2.5.5). Usar `minHeight: '44px'`.
- **Sem estado empty visível**: Se todos os projetos de uma categoria forem filtrados, nenhuma mensagem de feedback.

### About
- **Stats layout hardcoded no TSX**: `StatsCounter` renderiza os números com `--text-5xl` (48px) hardcoded no JSX — ignorando o `@media` definido no CSS (que tenta `text-6xl` no desktop via `.stat-value`). A classe `.stat-value` está no CSS escopado de `AboutSection.astro`, logo o mesmo bug de escopo se aplica.

### Contact Form
- **Sem feedback de erro inline**: O estado `'error'` existe mas não renderiza nenhum elemento no DOM — o usuário fica sem saber o que deu errado.
- **Labels sem `htmlFor`**: As labels em `ContactForm.tsx` não têm atributo `htmlFor` correspondendo ao `id` do input. Isso quebra acessibilidade (click na label não foca o input, leitores de tela não fazem a associação).
- **Inputs sem `id`**: Os inputs não têm `id`, o que é requerido para o `htmlFor` funcionar.
- **Botão de submit sem min-height 44px**: `padding: var(--space-4) var(--space-8)` mas sem `min-height: 44px` garantido.

### Footer
- **Logo do footer quebrado**: `<img src="/logo.svg" ...>` usa caminho estático `/logo.svg` que não existe (o logo real está em `/src/assets/logo/`). O `onerror="this.style.display='none'"` esconde o erro mas deixa o footer sem logo. Usar `import logoUrl from '../assets/logo/gmstudio-logo.svg?url'` como feito no Nav.

---

## 🟡 MODERADO — Hierarquia Visual e Ritmo

### Falta de separadores visuais entre seções
Todas as seções têm `background: var(--color-bg)` = `#0A0A0F` idêntico. O visitor não consegue perceber onde uma seção termina e outra começa. Soluções:
- Alternar surface color entre seções: `--color-bg` e `--color-surface` (`#13131A`)
- Adicionar `border-top: 1px solid var(--color-border)` sutil entre seções
- Usar um gradiente radial decorativo sutil no topo de seções alternadas

### Falta de eyebrow labels nas seções
Seções como "O que fazemos", "Nossos projetos", "Sobre a GMStudio" não têm um label de contexto acima (ex: `SERVIÇOS · O que fazemos`). Isso é padrão em sites de agência e melhora muito a escaneabilidade.

### Proporção Mobile Inadequada
A maioria das seções usa `padding: var(--space-16) var(--space-4)` = `64px 16px` no mobile. O `var(--space-4)` = 16px é apertado para conteúdo de texto em mobile. O padrão correto seria `24px` (`var(--space-6)`) de padding lateral em mobile.

---

## 🟢 BOM — O que está funcionando bem

- **Design tokens** bem organizados e consistentes (`tokens.css`)
- **Glassmorphism** implementado corretamente com `backdrop-filter`, `glass-card` class útil
- **Cores** — paleta escura com accent indigo é coerente e profissional
- **Tipografia** — Space Grotesk + Inter é uma combinação excelente para agência tech
- **Aurora Background** — conceito visual premium, funciona bem quando a hydratação funciona
- **Marquee de testimonials** — boa solução para conteúdo contínuo, com pause-on-hover
- **WhatsApp integration** — presente em múltiplos pontos de contato (nav, hero, contact, footer)
- **SEO base** — uso do `astro-seo` com meta adequadas
- **Scroll smooth** + `scroll-padding-top` correto para a nav fixa
- **Acessibilidade parcial** — `aria-label` nos links de ícone, `alt` nos logos, `aria-hidden` nas decorações

---

## Prioridade de Correção

| # | Item | Impacto | Esforço |
|---|---|---|---|
| 1 | Fix Vite 8→7 (`overrides` no package.json) | CRÍTICO | Baixo |
| 2 | Fix escopo CSS das classes do React island | CRÍTICO | Baixo |
| 3 | Fix logo do footer (`/logo.svg` → import correto) | Alto | Baixo |
| 4 | Adicionar `htmlFor`+`id` nos inputs do formulário | Alto | Baixo |
| 5 | Aumentar tamanhos tipográficos (hero, section headings) | Alto | Médio |
| 6 | Fix `--space-10` inexistente no PortfolioIsland | Alto | Baixo |
| 7 | Aumentar padding lateral mobile para `var(--space-6)` | Alto | Baixo |
| 8 | Adicionar CTA na navbar | Alto | Médio |
| 9 | Fix border do secondary CTA "Ver portfolio" | Médio | Baixo |
| 10 | Adicionar scroll indicator no hero | Médio | Baixo |
| 11 | Corrigir h2→h3 nos sub-headings de AboutSection | Médio | Baixo |
| 12 | Adicionar separadores visuais entre seções | Médio | Médio |
| 13 | Adicionar eyebrow labels nas seções | Médio | Médio |
| 14 | Feedback de erro inline no ContactForm | Médio | Baixo |
| 15 | Adicionar CTA após seção de serviços | Médio | Médio |
| 16 | Aumentar filter tab height para 44px | Baixo | Baixo |

---

## Screenshots Capturadas

- **Hero (forçado visível):** conteúdo centrado na tela, aurora ativa, CTAs visíveis
- **Services (parcial):** "Como trabalhamos" visível, steps verticais (bug de escopo CSS)
- **Demais seções:** invisíveis durante auditoria devido ao bug Vite 8
