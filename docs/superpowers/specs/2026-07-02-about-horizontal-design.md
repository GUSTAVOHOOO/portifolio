# Spec de Design: Seção "Quem Somos" Horizontal Fullscreen

Data: 2026-07-02
Status: Aprovado pelo Usuário
Objetivo: Transformar a seção "Quem Somos" (About) em uma experiência imersiva de rolagem horizontal em tela cheia (fullscreen) utilizando GSAP ScrollTrigger.

## 1. Arquitetura Geral

Reconstruiremos a seção `AboutSection` utilizando um componente React hidratado para controlar a transição suave de 3 painéis (slides) horizontais, cada um ocupando 100% da viewport (`100vw` e `100vh`).

---

## 2. Componentes e Estrutura de Arquivos

### 2.1. Novo Componente React `HorizontalAbout.tsx`
- **[NEW] `src/components/blocks/HorizontalAbout.tsx`**:
  Este componente encapsula a lógica e renderização dos painéis em tela cheia:
  - **Slide 1: História & Stats**: Mostra o texto institucional e o componente `StatsCounter` de forma integrada.
  - **Slide 2: Nossos Valores**: Exibe em uma grade limpa e elegante os 4 valores institucionais (Transparência, Qualidade, Resultado, Parceria).
  - **Slide 3: Nossa Equipe**: Lista os membros da equipe (se cadastrados no Astro content collection).
  
  **Animação GSAP**:
  - Pinará a seção (`pin: true`) ao atingir `top top` do viewport.
  - Rotacionará horizontalmente o contêiner interno (`.about-track`) transladando `xPercent: -66.666%` (são 3 painéis, logo precisamos rolar a distância de 2 painéis).
  - Comprimento da rolagem configurado como `end: () => "+=" + (window.innerWidth * 2)`.

### 2.2. Atualização de `AboutSection.astro`
- **[MODIFY] `src/components/sections/AboutSection.astro`**:
  - Modificado para ler os dados das coleções Astro (equipe) e repassá-los como propriedade (props) para o componente React `HorizontalAbout.tsx` com a diretiva `client:load`.
  - Terá a classe e os invólucros CSS necessários para acomodar a tela cheia.

---

## 3. Plano de Verificação

### Testes Manuais:
1. **Rolagem e Pinning**: Rolar até a seção e certificar que a tela trava e translada horizontalmente os 3 painéis perfeitamente de forma síncrona com o scroll.
2. **Responsividade**: Verificar o comportamento em resoluções menores. Em smartphones, os painéis podem empilhar verticalmente de forma tradicional (usando `gsap.matchMedia()` para desativar a rolagem horizontal em telas < 1024px).
3. **Build e Tipos**: Garantir que `npm run build` e `npm run check` completem sem erros.
