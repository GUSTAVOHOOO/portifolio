# UI/UX Fixes — Plano de Execução

Melhorias derivadas da auditoria `docs/UI-AUDIT.md`, divididas em batches pequenos para execução um por vez sem exceder limite de tokens.

## Como executar

1. Abrir o arquivo do batch
2. Rodar `/gsd:quick` com a descrição das tarefas
3. Verificar no browser antes de passar para o próximo
4. Não misturar batches

---

## Batches

| Batch | Arquivo | Foco | Prioridade |
|-------|---------|------|-----------|
| 01 | [batch-01-vite-css-scope.md](./batch-01-vite-css-scope.md) | Vite override + CSS scope fix | 🔴 CRÍTICO |
| 02 | [batch-02-footer-logo-token.md](./batch-02-footer-logo-token.md) | Footer logo + token `--space-10` | 🔴 CRÍTICO |
| 03 | [batch-03-contact-form-accessibility.md](./batch-03-contact-form-accessibility.md) | ContactForm labels + error state | 🟠 Alto |
| 04 | [batch-04-about-semantics-value-cards.md](./batch-04-about-semantics-value-cards.md) | h2→h3 + value cards visuais | 🟠 Alto |
| 05 | [batch-05-typography-scale.md](./batch-05-typography-scale.md) | Escala tipográfica geral | 🟠 Alto |
| 06 | [batch-06-mobile-padding.md](./batch-06-mobile-padding.md) | Padding lateral mobile (16px → 24px) | 🟠 Alto |
| 07 | [batch-07-nav-improvements.md](./batch-07-nav-improvements.md) | CTA + logo + links na Nav | 🟠 Alto |
| 08 | [batch-08-hero-ux.md](./batch-08-hero-ux.md) | Hero: borda CTA + scroll indicator | 🟡 Médio |
| 09 | [batch-09-visual-hierarchy.md](./batch-09-visual-hierarchy.md) | Separadores + eyebrow labels | 🟡 Médio |
| 10 | [batch-10-services-cta-portfolio-ux.md](./batch-10-services-cta-portfolio-ux.md) | CTA serviços + portfolio UX | 🟡 Médio |

---

## Ordem recomendada

```
BATCH 01 → BATCH 02 → npm install → verificar browser
BATCH 03 → BATCH 04
BATCH 05 → BATCH 06
BATCH 07 → BATCH 08
BATCH 09 → BATCH 10
```
