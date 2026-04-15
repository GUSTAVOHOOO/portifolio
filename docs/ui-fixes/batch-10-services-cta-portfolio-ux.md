# BATCH 10 — Services CTA + Portfolio filter UX

**Prioridade:** Médio/Baixo  
**Arquivos:** `src/components/ServicesSection.astro`, `src/components/PortfolioIsland.tsx`

---

## Problemas

1. **Sem CTA após serviços**: Após ler os serviços, o visitante não tem call-to-action imediato. O único caminho de conversão é scrollar até o fim da página.

2. **Filter tabs com touch target insuficiente**: `minHeight: 36px` está abaixo dos 44px recomendados pela WCAG 2.5.5 para alvos de toque.

3. **Sem estado vazio no portfólio**: Se uma categoria tiver 0 projetos, nenhuma mensagem de feedback é exibida.

---

## Tarefas

### 1. `ServicesSection.astro` — Adicionar CTA ao final da seção

Adicionar bloco de CTA após o grid de processo (`.process-steps`):

```html
<div class="services-cta">
  <p class="services-cta-text">Pronto para começar?</p>
  <a href="#contato" class="btn-primary">Solicitar orçamento</a>
</div>
```

Estilo (no `<style>` do componente ou global):
```css
.services-cta {
  text-align: center;
  margin-top: var(--space-16);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.services-cta-text {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}
```

### 2. `PortfolioIsland.tsx` — Fix filter tab touch target

Localizar o estilo dos filter tabs e garantir `minHeight: '44px'`:

```tsx
// antes
minHeight: '36px'

// depois
minHeight: '44px',
padding: '0 var(--space-4)',
```

### 3. `PortfolioIsland.tsx` — Adicionar estado vazio

Após o filtro de projetos, verificar se `filteredProjects.length === 0` e renderizar mensagem:

```tsx
{filteredProjects.length === 0 ? (
  <div style={{ textAlign: 'center', padding: 'var(--space-16) 0', color: 'var(--color-text-muted)' }}>
    <p>Nenhum projeto encontrado nesta categoria.</p>
  </div>
) : (
  // grid de projetos atual
)}
```

---

## Verificação

- CTA "Solicitar orçamento" visível ao final da seção de serviços
- Click no CTA deve scrollar para `#contato`
- Filter tabs têm pelo menos 44px de altura (verificar no DevTools)
- Selecionar uma categoria sem projetos deve mostrar a mensagem de estado vazio
