# BATCH 1 — Critical: Vite override + CSS scope fix

**Prioridade:** CRÍTICO — site está quebrado sem isso  
**Arquivos:** `package.json`, `src/components/ServicesSection.astro`

---

## Problema

1. **Vite incompatível**: O projeto tem Vite 8.0.3 instalado, mas o Astro requer Vite 7. Isso quebra a hydratação de todas as ilhas React — todos os componentes ficam com `opacity: 0` permanente.

2. **CSS scoped em React island**: As classes `.services-grid`, `.process-steps` e `.process-step` são definidas no `<style>` escopado do `ServicesSection.astro`, mas são usadas dentro de `ServicesAnimations.tsx` (React island). Elementos renderizados pelo React não recebem o hash de escopo do Astro, logo os estilos nunca se aplicam.

---

## Tarefas

### 1. `package.json` — Forçar Vite 7

Adicionar campo `overrides` no `package.json`:

```json
"overrides": {
  "vite": "^7"
}
```

Depois rodar:
```bash
npm install
```

### 2. `ServicesSection.astro` — Fix CSS scope

As classes `.services-grid`, `.process-steps` e `.process-step` devem ser globais.

**Opção A (recomendada):** Adicionar `is:global` no bloco `<style>` do `ServicesSection.astro` somente para essas classes.

**Opção B:** Mover essas classes para `src/styles/global.css`.

---

## Verificação

- `npm run build` deve completar sem erros
- Browser: hero e todos os conteúdos abaixo devem estar visíveis
- Services grid deve renderizar em 2 colunas no desktop
- Process steps devem ficar horizontais no desktop
