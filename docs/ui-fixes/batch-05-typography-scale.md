# BATCH 5 — Typography scale

**Prioridade:** Alto  
**Arquivos:** `src/components/HeroContent.tsx`, `src/components/ServicesSection.astro`, `src/components/ServicesAnimations.tsx`, `src/components/AboutSection.astro`, `src/components/PortfolioSection.astro`, `src/components/ContactSection.astro`, `src/components/StatsCounter.tsx`

---

## Problema

Tamanhos tipográficos subdimensionados em todo o site. O hero headline em `text-5xl` (48px) num viewport de 1920px não impacta. Section headings têm o mesmo peso visual que o conteúdo abaixo deles.

---

## Tarefas por arquivo

### `HeroContent.tsx`

| Elemento | Atual | Novo |
|----------|-------|------|
| Hero headline | `text-5xl` | `text-6xl` desktop / `text-4xl` mobile |
| Hero subtitle | `text-base` (16px) | `text-xl` (20px) |

### `ServicesSection.astro`

| Elemento | Atual | Novo |
|----------|-------|------|
| Section heading "O que fazemos" | `text-3xl` ou `text-4xl` | `text-4xl` mobile / `text-5xl` desktop |

### `ServicesAnimations.tsx`

| Elemento | Atual | Novo |
|----------|-------|------|
| Service card title | `text-xl` (20px) | `text-2xl` (24px) |

### `AboutSection.astro`

| Elemento | Atual | Novo |
|----------|-------|------|
| Section heading | `text-3xl` ou `text-4xl` | `text-4xl` mobile / `text-5xl` desktop |

### `PortfolioSection.astro`

| Elemento | Atual | Novo |
|----------|-------|------|
| Section heading | `text-3xl` ou `text-4xl` | `text-4xl` mobile / `text-5xl` desktop |

### `ContactSection.astro`

| Elemento | Atual | Novo |
|----------|-------|------|
| Section heading | `text-3xl` ou `text-4xl` | `text-4xl` mobile / `text-5xl` desktop |

### `StatsCounter.tsx`

| Elemento | Atual | Novo |
|----------|-------|------|
| Stats numbers | `text-5xl` (48px) | `text-6xl` (60px) desktop |

---

## Padrão responsivo a seguir

```tsx
// Para section headings
className="text-4xl lg:text-5xl font-bold"

// Para hero headline
className="text-4xl lg:text-6xl font-bold"
```

---

## Verificação

- Hero headline deve ser visivelmente maior e mais impactante
- Section headings devem ter peso visual claramente superior ao conteúdo da seção
- Stats numbers devem impactar no desktop
