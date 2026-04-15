# BATCH 2 — Critical: Footer logo + token --space-10

**Prioridade:** CRÍTICO/Alto  
**Arquivos:** `src/components/FooterSection.astro`, `src/styles/tokens.css`

---

## Problemas

1. **Logo do footer quebrado**: `<img src="/logo.svg">` usa caminho estático que não existe. O `onerror` esconde o erro silenciosamente, deixando o footer sem logo.

2. **Token `--space-10` inexistente**: `PortfolioIsland.tsx` usa `marginBottom: 'var(--space-10)'` nos filter tabs, mas esse token não está definido em `tokens.css`. Resolve para `0px` — filter tabs ficam colados ao grid abaixo.

---

## Tarefas

### 1. `FooterSection.astro` — Fix logo

Trocar o `<img src="/logo.svg">` estático por import correto, igual ao feito no `Nav.astro`:

```astro
---
import logoUrl from '../assets/logo/gmstudio-logo.svg?url';
---

<!-- trocar isso: -->
<img src="/logo.svg" alt="GMStudio" ...>

<!-- por isso: -->
<img src={logoUrl} alt="GMStudio" ...>
```

### 2. `src/styles/tokens.css` — Adicionar token faltante

Adicionar `--space-10` na escala de espaçamento:

```css
--space-10: 2.5rem; /* 40px */
```

Inserir em ordem na escala (entre `--space-8` e `--space-12`).

---

## Verificação

- Footer deve exibir o logo da GMStudio
- Filter tabs do portfólio devem ter 40px de margem abaixo antes do grid de projetos
