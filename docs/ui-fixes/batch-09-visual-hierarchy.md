# BATCH 9 — Visual hierarchy: separadores + eyebrow labels

**Prioridade:** Médio  
**Arquivos:** `src/components/ServicesSection.astro`, `src/components/AboutSection.astro`, `src/components/PortfolioSection.astro`, `src/components/ContactSection.astro`, `src/components/TestimonialsSection.astro`

---

## Problemas

1. **Sem separação entre seções**: Todas as seções têm `background: var(--color-bg)` idêntico. O visitante não percebe onde uma seção termina e outra começa.

2. **Sem eyebrow labels**: Seções como "O que fazemos", "Nossos projetos", "Sobre a GMStudio" não têm label de contexto acima do heading. Isso é padrão em sites de agência e melhora muito a escaneabilidade.

---

## Tarefas

### 1. Separadores visuais entre seções

Adicionar `border-top` sutil em seções alternadas. Sugestão: alternar entre `background: var(--color-bg)` e `background: var(--color-surface)`:

```css
/* seções ímpares — bg padrão */
#servicos, #portfolio, #contato {
  background: var(--color-bg);
}

/* seções pares — surface levemente diferente */
#sobre, #depoimentos {
  background: var(--color-surface);
}
```

Ou, alternativa mais simples (border-top):
```css
section:not(:first-of-type) {
  border-top: 1px solid var(--color-border);
}
```

### 2. Eyebrow labels

Adicionar label de contexto acima do heading principal de cada seção. Padrão de markup:

```html
<span class="eyebrow-label">SERVIÇOS</span>
<h2>O que fazemos</h2>
```

Estilo a adicionar em `src/styles/global.css`:
```css
.eyebrow-label {
  display: block;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}
```

Labels por seção:
| Seção | Eyebrow label |
|-------|--------------|
| ServicesSection | `SERVIÇOS` |
| PortfolioSection | `PORTFÓLIO` |
| AboutSection | `SOBRE NÓS` |
| TestimonialsSection | `DEPOIMENTOS` |
| ContactSection | `CONTATO` |

---

## Verificação

- Cada seção deve ter eyebrow label em accent color acima do heading
- Separação visual perceptível entre seções (scroll pela página deve revelar ritmo claro)
