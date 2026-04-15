# BATCH 7 — Nav improvements

**Prioridade:** Alto  
**Arquivo:** `src/components/Nav.astro`

---

## Problemas

1. **Sem CTA no header**: O visitante precisa scrollar até o footer para encontrar contato. Agências sérias sempre têm botão de contato na nav.
2. **Logo muito pequeno**: 32px de altura é pouco para um logo de agência.
3. **Nav links em `text-sm`**: 14px está no limite de legibilidade para texto de navegação.

---

## Tarefas

### 1. Adicionar CTA "Solicitar orçamento" no header desktop

Adicionar botão na nav desktop que ancora para `#contato`:

```html
<a href="#contato" class="nav-cta">
  Solicitar orçamento
</a>
```

Estilo sugerido (adicionar no `<style>` do Nav.astro):
```css
.nav-cta {
  padding: var(--space-2) var(--space-5);
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-base);
  white-space: nowrap;
}

.nav-cta:hover {
  background: var(--color-accent-hover, var(--color-accent));
  box-shadow: var(--shadow-glow);
}
```

Posicionar após os links de navegação, antes do hamburger mobile.

### 2. Aumentar logo

```html
<!-- antes -->
<img ... height="32" style="height: 32px">

<!-- depois -->
<img ... height="40" style="height: 40px">
```

### 3. Nav links: `text-sm` → `text-base`

Localizar onde os links da nav têm `font-size: var(--text-sm)` ou classe `text-sm` e trocar por `var(--text-base)` / `text-base`.

---

## Verificação

- Botão "Solicitar orçamento" visível no header no desktop
- Click no botão deve scrollar para a seção de contato
- Logo visivelmente maior
- Links de navegação mais legíveis
