# BATCH 4 — Semantics + About section fixes

**Prioridade:** Médio/Alto  
**Arquivo:** `src/components/AboutSection.astro`

---

## Problemas

1. **Dois `h2` na mesma seção**: `AboutSection.astro` tem múltiplos `<h2>` ("Sobre a GMStudio", "Nossos valores", "Nossa equipe"). Semanticamente incorreto — cada seção deve ter apenas um `<h2>` principal; os demais devem ser `<h3>`.

2. **Value cards sem separação visual**: Os cards de valores (Transparência, Qualidade, etc.) são divs com texto sem borda, background ou padding. No fundo escuro, não há separação visual entre eles.

3. **Possível bug de escopo CSS**: A classe `.stat-value` pode estar sofrendo o mesmo problema de escopo que `ServicesSection` — verificar e corrigir se necessário.

---

## Tarefas

### 1. Corrigir hierarquia semântica

```html
<!-- manter como h2 apenas o heading principal -->
<h2>Sobre a GMStudio</h2>

<!-- trocar para h3 os sub-headings -->
<h3>Nossos valores</h3>
<h3>Nossa equipe</h3>
```

### 2. Adicionar visual nos value cards

Adicionar estilos nos cards de valores (Transparência, Qualidade, Inovação, etc.):

```css
/* no <style> ou via classes inline */
.value-card {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
}
```

### 3. Verificar `.stat-value` no CSS escopado

Checar se `.stat-value` está em `<style>` escopado mas usado em `StatsCounter.tsx`. Se sim, mover essa classe para `src/styles/global.css` ou adicionar `is:global`.

---

## Verificação

- Inspeção HTML: apenas um `<h2>` por seção, sub-headings como `<h3>`
- Value cards devem ser visualmente separados no fundo escuro
- Stats numbers devem ter tamanho correto no desktop
