import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fieldStyle: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--space-4)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  color: 'var(--color-text)',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
  color: 'var(--color-text-muted)',
  display: 'block',
  marginBottom: 'var(--space-2)',
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  if (status === 'success') {
    return (
      <div style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--text-base)', marginBottom: '8px' }}>
          Mensagem enviada! Entraremos em contato em breve.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setStatus(json.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={import.meta.env.PUBLIC_WEB3FORMS_KEY} />
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <label style={labelStyle}>Nome</label>
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          required
          aria-required="true"
          className="contact-input"
          style={fieldStyle}
        />
      </div>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <label style={labelStyle}>E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="seu@email.com"
          required
          aria-required="true"
          className="contact-input"
          style={fieldStyle}
        />
      </div>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <label style={labelStyle}>Tipo de projeto</label>
        <select
          name="subject"
          required
          aria-required="true"
          className="contact-input"
          style={fieldStyle}
          defaultValue=""
        >
          <option value="" disabled>Selecione o tipo</option>
          <option value="Landing Page">Landing Page</option>
          <option value="Loja Online">Loja Online</option>
          <option value="Cardápio Digital">Cardápio Digital</option>
          <option value="Site Institucional">Site Institucional</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <label style={labelStyle}>Mensagem</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Conte um pouco sobre o seu projeto..."
          required
          className="contact-input"
          style={{ ...fieldStyle, resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: 'var(--color-accent)',
          borderRadius: 'var(--radius-full)',
          minHeight: '44px',
          padding: '0 var(--space-8)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 'var(--text-base)',
          color: 'var(--color-text)',
          width: '100%',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          border: 'none',
          transition: 'all 200ms ease',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {status === 'error' && (
        <p role="alert" style={{ color: '#EF4444', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', marginTop: '8px' }}>
          Erro ao enviar. Verifique os campos e tente novamente, ou fale diretamente pelo WhatsApp.
        </p>
      )}
    </form>
  );
}
