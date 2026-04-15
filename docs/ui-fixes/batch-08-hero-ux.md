# BATCH 8 — Hero UX fixes

**Prioridade:** Médio  
**Arquivo:** `src/components/HeroContent.tsx`

---

## Problemas

1. **Secondary CTA "Ver portfolio" quase invisível**: `border: 1px solid var(--color-border)` onde `--color-border: rgba(248, 248, 248, 0.08)`. Com 8% de opacidade no fundo escuro, a borda é imperceptível.

2. **Sem scroll indicator**: Com hero fullscreen, muitos visitantes não scrollam por não saberem que há conteúdo abaixo.

3. **Container muito estreito**: `max-width: 48rem` (768px) em telas 1920px deixa o texto espremido e faz o headline parecer menor do que é.

---

## Tarefas

### 1. Fix borda do secondary CTA

Localizar o estilo do botão "Ver portfolio" e aumentar a opacidade da borda:

```tsx
// antes
border: '1px solid var(--color-border)'

// depois
border: '1px solid rgba(248, 248, 248, 0.25)'
```

### 2. Adicionar scroll indicator

Adicionar elemento animado no bottom do hero (dentro do container do `HeroContent.tsx`), abaixo dos CTAs:

```tsx
<div
  style={{
    position: 'absolute',
    bottom: 'var(--space-8)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2)',
    opacity: 0.5,
    animation: 'bounce 2s infinite',
  }}
  aria-hidden="true"
>
  <span style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
    scroll
  </span>
  {/* seta para baixo — SVG simples ou unicode ↓ */}
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12L2 6h12L8 12z"/>
  </svg>
</div>
```

Adicionar o keyframe `bounce` no CSS global ou via tag `<style>` inline:

```css
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}
```

### 3. Ampliar container do hero

```tsx
// antes
maxWidth: '48rem'

// depois
maxWidth: '56rem'  /* 896px */
```

---

## Verificação

- Secondary CTA "Ver portfolio" deve ter borda claramente visível
- Scroll indicator deve aparecer no bottom do hero e animar com bounce
- Hero content ocupa mais largura em telas grandes
