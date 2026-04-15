# BATCH 3 — Accessibility: ContactForm labels + error state

**Prioridade:** Alto  
**Arquivo:** `src/components/ContactForm.tsx`

---

## Problemas

1. **Labels sem `htmlFor`**: As labels não têm atributo `htmlFor` correspondendo ao `id` do input. Click na label não foca o input; leitores de tela não fazem a associação.

2. **Inputs sem `id`**: Os inputs não têm `id`, necessário para o `htmlFor` funcionar.

3. **Sem feedback de erro inline**: O estado `'error'` existe no componente mas não renderiza nenhum elemento no DOM. O usuário não sabe o que deu errado.

4. **Botão de submit sem `min-height` garantido**: Risco de área de toque abaixo de 44px (WCAG 2.5.5).

---

## Tarefas

### 1. Adicionar `id` nos inputs

```tsx
<input id="name" name="name" ... />
<input id="email" name="email" ... />
<select id="subject" name="subject" ... />
<textarea id="message" name="message" ... />
```

### 2. Adicionar `htmlFor` nas labels

```tsx
<label htmlFor="name">Nome</label>
<label htmlFor="email">Email</label>
<label htmlFor="subject">Assunto</label>
<label htmlFor="message">Mensagem</label>
```

### 3. Renderizar mensagem de erro inline

Quando `status === 'error'`, exibir mensagem abaixo do botão de submit:

```tsx
{status === 'error' && (
  <p role="alert" style={{ color: 'var(--color-error, #f87171)', marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
    Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
  </p>
)}
```

### 4. Garantir `min-height` no botão

```tsx
<button
  type="submit"
  style={{ minHeight: '44px', ... }}
>
```

---

## Verificação

- Clicar em qualquer label deve focar o input correspondente
- Testar submit com access_key inválida → mensagem de erro deve aparecer no DOM
- Inspeção: todos os inputs têm `id`, todas as labels têm `htmlFor`
