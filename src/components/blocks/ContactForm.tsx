import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

import './ContactForm.css';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  if (status === 'success') {
    return (
      <div className="contact-success">
        <p className="contact-success-title">
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
      <input type="checkbox" name="botcheck" className="contact-hidden" tabIndex={-1} autoComplete="off" title="botcheck" aria-hidden="true" />

      <div className="contact-group">
        <label htmlFor="name" className="contact-label">Nome</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Seu nome"
          required
          aria-required="true"
          className="contact-input"
        />
      </div>

      <div className="contact-group">
        <label htmlFor="email" className="contact-label">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="seu@email.com"
          required
          aria-required="true"
          className="contact-input"
        />
      </div>

      <div className="contact-group">
        <label htmlFor="subject" className="contact-label">Assunto</label>
        <select
          id="subject"
          name="subject"
          required
          aria-required="true"
          className="contact-input"
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

      <div className="contact-group">
        <label htmlFor="message" className="contact-label">Mensagem</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Conte um pouco sobre o seu projeto..."
          required
          className="contact-input contact-input--textarea"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`contact-submit ${status === 'loading' ? 'contact-submit--loading' : ''}`}
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {status === 'error' && (
        <p role="alert" className="contact-error">
          Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
        </p>
      )}
    </form>
  );
}
