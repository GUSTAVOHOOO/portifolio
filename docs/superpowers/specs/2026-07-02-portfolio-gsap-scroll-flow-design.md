# Spec de Design: Fluxo de Scroll e Animações GSAP no Portfólio

Data: 2026-07-02
Status: Aprovado pelo Usuário
Objetivo: Implementar animações de linhas SVG responsivas controladas por scroll e uma transição de scroll vertical para horizontal na seção de portfólio, utilizando GSAP e ScrollTrigger.

## 1. Arquitetura Geral do Sistema

O site manterá sua estrutura de ilhas do Astro 6 + React 19, adicionando o GSAP e ScrollTrigger para gerenciar o desenho reativo de vetores e o travamento (pinning) do viewport.

### Tecnologias Utilizadas:
- **GSAP (GreenSock Animation Platform)**: Motor principal de animação.
- **ScrollTrigger**: Plugin do GSAP para sincronizar animações com a rolagem.
- **@gsap/react**: Integração oficial para gerenciar o ciclo de vida das animações no React via hook `useGSAP()`.
- **Astro**: Para estruturas de seções estáticas e injeção do script global.

---

## 2. Componentes e Estrutura de Arquivos

Modificaremos ou criaremos os seguintes arquivos no projeto:

### 2.1. Conectores SVG (Desenho de Linha)
Criaremos componentes conectores individuais para criar a sensação de uma linha contínua que cruza as seções:

- **[NEW] `src/components/ui/LineConnector.astro`**:
  Um componente flexível para renderizar caminhos SVG que recebem propriedades de tamanho e coordenadas do path.
  - Receberá a definição do caminho (`d`), largura/altura e IDs de gatilhos.
  - Incluirá um script inline cliente para registrar a animação do ScrollTrigger que calcula a extensão do path com `.getTotalLength()` e controla o `stroke-dashoffset`.

- **[MODIFY] `src/components/sections/HeroSection.astro`**:
  - Adicionará o componente `LineConnector` apontando da base do conteúdo da Hero em direção ao início do Bento Grid.

- **[MODIFY] `src/components/sections/ServicesSection.astro`**:
  - Ajustará a integração do `MagicBento` e adicionará um `LineConnector` que contornará os cards ou guiará a linha do início da seção Bento até a entrada do Portfólio.

### 2.2. Portfólio Horizontal (Scroll Pinning)
Substituiremos a exibição tradicional em grade por um layout de trilho horizontal:

- **[NEW] `src/components/blocks/HorizontalPortfolio.tsx`**:
  - Um novo componente React que receberá os projetos serializados da coleção.
  - Estrutura:
    - Um container externo `.portfolio-horizontal-wrapper` de `height: 100vh` e `overflow: hidden`.
    - Um trilho flexível interno `.portfolio-track` de `display: flex; flex-direction: row; width: max-content;`.
  - Animação GSAP:
    - Usará `useGSAP()` para registrar o ScrollTrigger.
    - Fixará o wrapper com `pin: true`.
    - Transladará o `.portfolio-track` horizontalmente para a esquerda (`xPercent: -100` ou `x: -trilho.scrollWidth + window.innerWidth`) usando `ease: "none"` e `scrub: true`.

- **[MODIFY] `src/components/sections/PortfolioSection.astro`**:
  - Substituirá o `PortfolioIsland.tsx` antigo pelo novo `HorizontalPortfolio.tsx` e configurará os estilos de contêiner e espaçamento para permitir o travamento em tela cheia.

---

## 3. Comportamento e Detalhes de Animação

### 3.1. Desenho da Linha SVG
- A linha usará o gradiente de cores da identidade do site (`#6366F1` para `#a855f7`).
- A rolagem vertical direta (`scrub: true`) fará a linha desenhar-se à medida que avança na tela.

### 3.2. Scroll Horizontal
- Quando a borda superior da seção de portfólio atingir o topo do viewport (`start: "top top"`), a seção fica travada.
- O scroll do mouse continuará a mover os projetos para o lado.
- Quando o último projeto for visualizado, o scroll vertical destrava automaticamente para seguir para as seções finais (Contato e Rodapé).

---

## 4. Plano de Verificação

### Testes Manuais:
1. **Comportamento Responsivo**: Validar a linha SVG e a rolagem horizontal em diferentes larguras de tela (mobile vs. desktop). No mobile, decidir se desabilitamos o scroll horizontal ou se adaptamos o trilho.
2. **Performance**: Monitorar jank (travamentos) durante a rolagem rápida no Chrome e Firefox.
3. **Redirecionamento/Foco**: Verificar se âncoras de navegação (ex: clicar no menu "Serviços" ou "Portfólio") posicionam o scroll corretamente.
