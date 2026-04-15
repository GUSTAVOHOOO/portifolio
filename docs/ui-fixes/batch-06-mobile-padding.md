# BATCH 6 — Mobile padding lateral global

**Prioridade:** Alto  
**Arquivos:** `src/components/ServicesSection.astro`, `src/components/AboutSection.astro`, `src/components/PortfolioSection.astro`, `src/components/ContactSection.astro`, `src/components/FooterSection.astro`

---

## Problema

A maioria das seções usa `padding: var(--space-16) var(--space-4)` no mobile. O `var(--space-4)` = 16px é insuficiente — em mobile (375px) o conteúdo fica muito próximo das bordas da tela. O padrão correto para sites é 24px (`var(--space-6)`) de padding lateral.

---

## Tarefas

Em cada um dos arquivos abaixo, localizar onde o padding lateral está como `var(--space-4)` e substituir por `var(--space-6)`:

### `ServicesSection.astro`
```css
/* antes */
padding: var(--space-16) var(--space-4);

/* depois */
padding: var(--space-16) var(--space-6);
```

### `AboutSection.astro`
Mesma substituição. Atenção: seção pode ter múltiplos blocos com padding lateral — verificar todos.

### `PortfolioSection.astro`
Mesma substituição.

### `ContactSection.astro`
Mesma substituição.

### `FooterSection.astro`
```css
/* antes */
padding: var(--space-16) var(--space-4) var(--space-8);

/* depois */
padding: var(--space-16) var(--space-6) var(--space-8);
```

---

## Notas

- Manter o padding vertical (`var(--space-16)`) intacto — só alterar o lateral
- No desktop (>= 1024px), o padding lateral pode continuar maior (ex: `var(--space-8)` ou `var(--space-12)`) — não regredir

---

## Verificação

- Emular mobile 375px no browser DevTools
- Nenhum texto ou elemento deve tocar a borda lateral da tela
- Conteúdo deve ter ~24px de respiro em ambos os lados
