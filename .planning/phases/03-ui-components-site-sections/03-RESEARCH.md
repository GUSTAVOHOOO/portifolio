# Phase 3: UI Components & Site Sections — Research

**Researched:** 2026-04-03
**Domain:** Astro 5 component authoring, CSS animation, React islands, Web3Forms API
**Confidence:** HIGH (decisions already locked in CONTEXT.md + UI-SPEC.md; research validates implementation patterns)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero:** Centered stack, indigo radial glow, two CTAs (WhatsApp primary + ghost "Ver portfólio"), placeholder copy "Presença digital que converte".

**Navigation:** Fixed top, logo left / anchor links right. Mobile: hamburger → slide-down drawer. React island (`client:load`) for toggle state only.

**Portfolio:** Static grid — 3col desktop / 2col tablet / 1col mobile. Glassmorphism cards. Data from `projects` content collection.

**Testimonials:** CSS `@keyframes scroll` marquee, `animation: scroll 30s linear infinite`, no JavaScript, no Motion library.

**Contact:** WhatsApp-primary block + Web3Forms contact form as React island. Floating WhatsApp button in BaseLayout.astro.

**Scroll animations:** Intersection Observer inline script (no Motion). Fade-up: opacity 0→1, translateY 20px→0. `once: true`. CSS `.visible` class trigger.

**Cards:** Glassmorphism everywhere — `--glass-bg`, `--glass-border`, `--glass-blur` tokens.

**Stack:** Astro 5, Tailwind v4 CSS-first, TypeScript, no external animation libraries.

### Claude's Discretion

- Exact section padding/margin values (use spacing scale from UI-SPEC)
- SVG icons for service cards (astro-icon or inline SVG)
- Exact placeholder copy wording
- Number of process steps detail text
- Exact glassmorphism values (blur, border, surface opacity) — tokens.css provides canonical values
- Animation timing/stagger values — UI-SPEC provides canonical values

### Deferred Ideas (OUT OF SCOPE)

- Portfolio filter by category (PORTF-03)
- Individual case study pages (PORTF-04, PORTF-05)
- Star ratings on testimonials (TESTI-02)
- Detailed service pricing (SERV-04)
- `/style-guide.astro` visual page
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HERO-01 | Hero section with clear value proposition and visible contact CTA | D-HERO-01–04; CSS radial glow pattern; CTA button patterns |
| PORTF-01 | Project grid with thumbnail, name, category | getCollection pattern; Astro Image component |
| PORTF-02 | Each project links to live site in new tab | anchor card pattern; rel="noopener noreferrer" |
| SERV-01 | Service cards with icon and description | astro-icon integration; glassmorphism card pattern |
| SERV-02 | Work process steps (briefing → dev → delivery) | Horizontal stepper CSS pattern |
| ABOUT-01 | Agency story section | Static Astro markup |
| ABOUT-02 | Team cards with photo, name, role | getCollection('team'); Astro Image; circle crop |
| ABOUT-03 | Stats numbers (projects, clients, years) | Static markup; Display role typography |
| ABOUT-04 | Agency values | Static markup |
| TESTI-01 | Testimonial carousel/slider with name and photo | CSS marquee pattern (Section 1) |
| CONT-01 | Fixed floating WhatsApp button with pre-filled message | wa.me deep link format (Section 6) |
| CONT-02 | Contact form (name, email, project type, message) | Web3Forms POST pattern (Section 4) |
| CONT-03 | Social links (Instagram, LinkedIn) in contact/footer | astro-icon; anchor tags |
| CONT-04 | Agency email displayed in contact section | mailto: anchor; accent color |
</phase_requirements>

---

## Planner Summary

**Five most important insights for the planner:**

1. **CSS marquee requires two identical sets of cards, not one.** The seamless loop trick is: render the card list twice inside `.marquee-track`, then animate the track by `-50%` of its total width. The keyframe is `from { transform: translateX(0) } to { transform: translateX(-50%) }`. This is the only way to make it loop without a visible jump. Card set width must be fixed (`320px` per card + `24px` gap) or the `50%` calculation breaks.

2. **FOUC on scroll animations is prevented by setting `opacity: 0; transform: translateY(20px)` in a `<style>` tag inside the Astro component (not in global CSS), and adding `.visible` via IntersectionObserver. The initial hidden state must be applied before the browser paints.** Using `is:global` or a `.js-loaded` class guard is NOT needed in Astro because the `<style>` tag is scoped and applied synchronously.

3. **React island for hamburger must receive nav links as props from the parent `.astro` file** — it cannot call `getCollection()` itself (that is server-only). Pass links as a typed array prop. The drawer open/close should use a CSS `max-height` transition (`max-height: 0` → `max-height: 400px`, `overflow: hidden`) — no JS animation library needed.

4. **Web3Forms requires exactly one hidden `access_key` input field**. The form POSTs as `application/json` to `https://api.web3forms.com/submit`. hCaptcha is opt-in (add `data-hcaptcha` attribute). CORS is open — no proxy needed. Success/error state is managed with `useState` in the React island; on success, replace the form JSX with a success message div.

5. **`getCollection('projects')` import path in Astro 5 is `astro:content`** — confirmed by `src/content.config.ts` which uses `import { defineCollection, z } from 'astro:content'`. The `projects` collection uses `glob` loader so each entry has an `id` (slug derived from filename) and a `data` object. Astro `<Image />` for thumbnails requires `import.meta.env` or a static path — since `thumbnail` in the schema is a string path, use the `src` prop with the path string and Astro will optimize it at build time if the path resolves to a local asset.

---

## Section 1: CSS Marquee for Testimonials

### The Seamless Loop Trick

The core pattern requires duplicating the card list so the track is twice as wide as one full set. The `@keyframes` animates `-50%` of total track width — when it reaches the halfway point, it has scrolled exactly one full set, which is visually identical to the start position.

```css
/* In TestimonialsSection.astro <style> tag */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-wrapper {
  overflow: hidden;
  /* Edge fade masks — CSS only, no JS */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.marquee-track {
  display: flex;
  gap: 24px;          /* --space-6 */
  width: max-content; /* grows to fit all cards */
  animation: marquee-scroll 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    overflow-x: auto;
    flex-wrap: wrap;
  }
}
```

**Astro template structure:**

```astro
---
// TestimonialsSection.astro
import { getCollection } from 'astro:content';
const testimonials = await getCollection('testimonials');
---
<section>
  <div class="marquee-wrapper">
    <div class="marquee-track">
      {/* First set */}
      {testimonials.map(t => <TestimonialCard entry={t} />)}
      {/* Duplicate set — identical, enables seamless loop */}
      {testimonials.map(t => <TestimonialCard entry={t} aria-hidden="true" />)}
    </div>
  </div>
</section>
```

**Gotchas:**
- The duplicate set must have `aria-hidden="true"` so screen readers do not read cards twice.
- `width: max-content` on `.marquee-track` is required — `flex` without it will wrap or compress cards.
- Fixed card width (`320px`, `flex-shrink: 0`) is required for the math to work. If cards are variable width, the `-50%` offset will not land at exactly the seam.
- Tailwind v4 does not have a built-in `marquee` animation — define the `@keyframes` in the component `<style>` tag or in `global.css`. Do NOT put it in `@theme {}` (that is for design tokens only).
- The `mask-image` edge fade is a UX improvement that costs zero JS; include it.

**Confidence:** HIGH — standard CSS technique, no library dependencies.

---

## Section 2: IntersectionObserver Scroll Animations

### Preventing FOUC

FOUC (flash of unstyled content) occurs if the element is visible before the script runs. Prevention: set the hidden state in the same component's `<style>` tag, which Astro injects synchronously into the HTML. The element is hidden before any paint.

```astro
<!-- Inside each section .astro file — e.g. ServicesSection.astro -->
<section class="section-animate" id="services">
  <!-- content -->
</section>

<style>
  .section-animate {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .section-animate.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Staggered children */
  .stagger-child {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    transition-delay: calc(var(--stagger-i, 0) * 80ms);
  }
  .stagger-child.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .section-animate,
    .stagger-child {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>

<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // once: true equivalent — stop observing after trigger
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Observe the section itself
  document.querySelectorAll('.section-animate').forEach((el) => {
    observer.observe(el);
  });

  // Observe staggered children
  document.querySelectorAll('.stagger-child').forEach((el, i) => {
    (el as HTMLElement).style.setProperty('--stagger-i', String(i));
    observer.observe(el);
  });
</script>
```

**Gotchas:**
- Astro `<script>` tags are bundled and deferred by default — they run after DOM is ready. No `DOMContentLoaded` wrapper needed.
- Multiple section components each containing `<script>` with `document.querySelectorAll('.section-animate')` will each independently query and observe. This works correctly because Astro deduplicates identical `<script>` blocks. However, if the same script text appears in multiple components, Astro may include it once. **Safer pattern:** put the IntersectionObserver script in `BaseLayout.astro` once, and use a shared `.section-animate` class in every section component. This is the recommended approach for Phase 3.
- `once: true` is NOT a native IntersectionObserver option — `observer.unobserve(entry.target)` is the correct manual equivalent.
- The `<style>` in each component is scoped to that component by Astro. The `.section-animate` class will be scoped. To use a single observer script in BaseLayout, either: (a) use `<style is:global>` for `.section-animate` and `.visible` — this adds them to the global stylesheet, or (b) use `is:inline` on the `<script>` so it runs per-component. **Recommended:** use `is:global` on the animation styles in `global.css`, and a single `<script>` in BaseLayout.

**Confidence:** HIGH — standard browser API, Astro script behavior documented.

---

## Section 3: React Island for Hamburger Nav Toggle

### Minimal Pattern

The React island handles only `isOpen` state. Nav links are passed as props from `Nav.astro` (server-side). The drawer animation uses a CSS `max-height` transition — zero JS animation needed.

```tsx
// src/components/NavHamburger.tsx
import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
}

export default function NavHamburger({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        className="hamburger-btn"
      >
        {/* Toggle between hamburger and X icon */}
        {isOpen ? <IconX /> : <IconMenu />}
      </button>

      <nav
        role="navigation"
        aria-label="Menu mobile"
        className={`mobile-drawer ${isOpen ? 'drawer-open' : ''}`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
```

**Nav.astro integration:**

```astro
---
// src/components/Nav.astro
import NavHamburger from './NavHamburger.tsx';

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];
---
<header class="nav-header">
  <a href="/" class="nav-logo"><!-- logo SVG --></a>

  <!-- Desktop links — static Astro, zero JS -->
  <nav class="desktop-links" aria-label="Menu principal">
    {navLinks.map(link => <a href={link.href}>{link.label}</a>)}
  </nav>

  <!-- React island — only for mobile toggle -->
  <div class="lg:hidden">
    <NavHamburger links={navLinks} client:load />
  </div>
</header>
```

**Drawer CSS (in Nav.astro `<style>` or global.css):**

```css
.mobile-drawer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease;
  background: var(--color-surface-raised);
}

.mobile-drawer.drawer-open {
  max-height: 400px; /* larger than actual content height */
}

.mobile-drawer a {
  display: block;
  min-height: 48px;
  line-height: 48px;
  padding: 0 24px;
}
```

**Gotchas:**
- `client:load` hydrates the React island immediately on page load — appropriate for nav since it must be interactive before user interaction. Do not use `client:visible` (drawer would not respond until scrolled into view).
- `max-height` transition requires setting a value larger than the actual content. For 4 links at 48px each = 192px, setting 400px gives comfortable headroom. Actual height does not matter for the animation smoothness.
- Icon components (`<IconX />`, `<IconMenu />`) can be inline SVG literals inside the component or imported from `astro-icon`. Since this is a React island, use inline SVG directly (astro-icon is an Astro component and cannot be used inside React).
- Clicking a drawer link should close the menu: `onClick={() => setIsOpen(false)}` on each `<a>`.
- The desktop nav links in the `.astro` file and the mobile links passed as props must stay in sync. Use a single `navLinks` const in `Nav.astro` and pass it to both.

**Confidence:** HIGH — standard Astro React island pattern documented in Astro docs.

---

## Section 4: Web3Forms Contact Form

### POST Pattern

Web3Forms accepts `application/json` POST to `https://api.web3forms.com/submit`. No CORS restriction. No backend required. The `access_key` is a public key — safe to commit to source.

```tsx
// src/components/ContactForm.tsx
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  if (status === 'success') {
    return <p>Mensagem enviada! Entraremos em contato em breve.</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Required hidden field */}
      <input type="hidden" name="access_key" value={import.meta.env.PUBLIC_WEB3FORMS_KEY} />
      {/* Honeypot — spam prevention */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      <input name="name" type="text" placeholder="Seu nome" required aria-required="true" />
      <input name="email" type="email" placeholder="seu@email.com" required aria-required="true" />
      <select name="subject" required aria-required="true">
        <option value="">Selecione o tipo de projeto</option>
        <option value="Landing Page">Landing Page</option>
        <option value="Loja Online">Loja Online</option>
        <option value="Cardápio Digital">Cardápio Digital</option>
        <option value="Site Institucional">Site Institucional</option>
        <option value="Outro">Outro</option>
      </select>
      <textarea name="message" rows={4} placeholder="Conte um pouco sobre o seu projeto..." required />

      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {status === 'error' && (
        <p role="alert">
          Erro ao enviar. Verifique os campos e tente novamente, ou fale diretamente pelo WhatsApp.
        </p>
      )}
    </form>
  );
}
```

**Environment variable setup:**

```
# .env (committed as .env.example, real key in .env which is gitignored)
PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

In Astro 5, public env vars accessible in client-side code (React islands) must be prefixed `PUBLIC_`. Access as `import.meta.env.PUBLIC_WEB3FORMS_KEY`.

**Gotchas:**
- **access_key is NOT a secret** — Web3Forms explicitly documents that it is a public key meant to be in client-side HTML. Do not put it in a server-only env var (no `PUBLIC_` prefix). However, using an env var (even public) is better practice than hardcoding in source.
- **hCaptcha:** Web3Forms does NOT inject hCaptcha by default. To enable it, add `data-hcaptcha="true"` to a div and include the hCaptcha script. For Phase 3, this is optional — the honeypot (`botcheck` checkbox) provides basic spam protection without the UX friction of a CAPTCHA. Decision: use honeypot only in Phase 3.
- **CORS:** Web3Forms API has `Access-Control-Allow-Origin: *` — no proxy, no server function needed.
- **Field naming:** Web3Forms uses field `name` attributes as column headers in the email notification. Use descriptive names (`name`, `email`, `subject`, `message`) for a readable email format.
- The `subject` field name (not a real `<input type="hidden" name="subject">`) controls the email subject line in Web3Forms. Using the select field as `name="subject"` sends the project type as the email subject — useful for triage.
- **Form validation:** Use browser-native validation (`required`, `type="email"`) plus `noValidate` on the form to allow custom error display. The `aria-required` and `aria-describedby` for error messages are documented in the Accessibility Contract.

**Confidence:** HIGH — Web3Forms API is simple and well-documented.

---

## Section 5: Astro Content Collections — getCollection Pattern

### Import Path and Data Shape

```astro
---
// src/components/PortfolioSection.astro
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

const projects = await getCollection('projects');
// Each entry: { id: string, data: { title, category, thumbnail, liveUrl, featured } }
---

{projects.length === 0 ? (
  <p>Em breve novos projetos aqui.</p>
) : (
  <div class="portfolio-grid">
    {projects.map(project => (
      <a
        href={project.data.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visitar ${project.data.title} (abre em nova aba)`}
        class="project-card"
      >
        <Image
          src={project.data.thumbnail}
          alt={project.data.title}
          width={640}
          height={360}
          class="card-thumbnail"
        />
        <div class="card-content">
          <h3>{project.data.title}</h3>
          <span class="category-tag">{project.data.category}</span>
        </div>
      </a>
    ))}
  </div>
)}
```

**Important schema notes from `src/content.config.ts`:**
- `projects` uses `glob` loader — entries are `.md` files in `src/content/projects/`
- `thumbnail` is a `z.string()` (file path), not a `z.image()` Zod type. This means Astro's `<Image />` component cannot automatically process it as an imported asset — the path is a raw string
- For `<Image src={string}>` to work, the thumbnail paths must be absolute paths to files in the `public/` directory (served as-is) or the schema must be changed to `z.image()` (which enables automatic optimization)
- **Recommendation for planner:** The current schema uses `z.string()` for thumbnail. The safest path for Phase 3 is to store thumbnails in `public/images/projects/` and use path strings like `/images/projects/project-name.jpg`. This bypasses the Astro image optimization pipeline but avoids a schema migration. Alternatively, store in `src/assets/projects/` and change the schema field to use dynamic `import()` at content load time — but this is complex. **Simplest path: serve from `public/`, use `<img>` tag with manual `loading="lazy"` and `decoding="async"` instead of `<Image />`** for the thumbnail string-path scenario.
- For `services`, `team`, and `testimonials` — these use `file` loader from JSON. Same `getCollection()` call, same `entry.data` access pattern.

**Sorting projects (featured first):**

```astro
const projects = (await getCollection('projects'))
  .sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
```

**Confidence:** HIGH — verified against `src/content.config.ts` in this project.

---

## Section 6: WhatsApp Deep Link Format

### Canonical URL Format

```
https://wa.me/{phone}?text={url-encoded-message}
```

- `{phone}` — international format, no `+`, no spaces, no dashes. Brazilian number: `5511999999999` (55 = country code, 11 = area code, 9-digit mobile).
- `{url-encoded-message}` — the pre-filled message text, URL-encoded. Spaces as `%20` (not `+`).

**Correct format:**

```
https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20GMStudio
```

Decoded: `Olá, vim pelo site da GMStudio`

**URL encoding notes:**
- `á` → `%C3%A1`
- `,` → `%2C`
- space → `%20`
- `!` → `%21`

**In Astro template** — use `encodeURIComponent()` at build time:

```astro
---
const phone = '5511999999999'; // placeholder — replace with real number
const message = 'Olá, vim pelo site da GMStudio';
const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
---
<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
  <!-- WhatsApp icon -->
</a>
```

This runs at build time in Astro — zero client JS. The output HTML contains the pre-encoded URL.

**Floating button in BaseLayout.astro:**

```astro
---
const phone = '5511999999999';
const message = 'Olá, vim pelo site da GMStudio';
const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
---
<!-- Inside <body>, before </body> -->
<a
  href={whatsappUrl}
  class="whatsapp-float"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Falar no WhatsApp"
>
  <!-- WhatsApp SVG icon, 28px, white fill -->
</a>
```

**Gotchas:**
- `wa.me` links work on both mobile (opens WhatsApp app) and desktop (opens WhatsApp Web). No platform detection needed.
- The phone number is currently a placeholder — document as `TODO: replace with real number` in the component comment.
- Do NOT use `api.whatsapp.com/send?phone=` — that is a deprecated format. `wa.me/` is the canonical modern format (confidence: HIGH, official WhatsApp FAQ).
- The floating button uses `#25D366` (WhatsApp vendor brand green) per the UI-SPEC Color table — NOT the GMStudio `--color-accent` indigo.

**Confidence:** HIGH — official WhatsApp documentation confirms `wa.me` format.

---

## Architecture Patterns

### Recommended Component Structure

```
src/
├── components/
│   ├── Nav.astro                 # Fixed nav shell — static Astro
│   ├── NavHamburger.tsx          # React island — toggle only
│   ├── HeroSection.astro
│   ├── ServicesSection.astro
│   ├── PortfolioSection.astro
│   ├── AboutSection.astro
│   ├── TestimonialsSection.astro
│   └── ContactSection.astro
│       └── ContactForm.tsx       # React island — form only
├── pages/
│   └── index.astro               # Composes all sections
└── layouts/
    └── BaseLayout.astro          # Adds floating WhatsApp button
```

### index.astro Composition Pattern

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import HeroSection from '../components/HeroSection.astro';
import ServicesSection from '../components/ServicesSection.astro';
import PortfolioSection from '../components/PortfolioSection.astro';
import AboutSection from '../components/AboutSection.astro';
import TestimonialsSection from '../components/TestimonialsSection.astro';
import ContactSection from '../components/ContactSection.astro';
---
<BaseLayout title="GMStudio — Presença digital que converte">
  <Nav />
  <main>
    <HeroSection />
    <ServicesSection />
    <PortfolioSection />
    <AboutSection />
    <TestimonialsSection />
    <ContactSection />
  </main>
</BaseLayout>
```

### Glassmorphism Card Pattern (Tailwind v4 + CSS vars)

With Tailwind v4 CSS-first config, CSS custom properties from `tokens.css` are accessible directly in utility classes via the `@theme` mapping established in Phase 2. Use inline styles for values not mapped to utilities:

```astro
<div
  class="rounded-lg border transition-all duration-200
         hover:-translate-y-0.5"
  style="
    background: var(--glass-bg);
    border-color: var(--glass-border);
    backdrop-filter: var(--glass-blur);
    box-shadow: var(--shadow-md);
  "
>
  <!-- content -->
</div>
```

Hover border and shadow upgrades require either Tailwind `group-hover:` utilities (if parent has `group`) or a CSS `&:hover` rule in a `<style>` block — since CSS vars cannot be toggled with Tailwind utilities directly.

**Recommended for hover on cards:**

```css
/* In component <style> tag */
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}
.glass-card:hover {
  border-color: var(--color-border-accent);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
  transform: translateY(-2px);
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Infinite marquee | Custom JS scroll loop with `requestAnimationFrame` | CSS `@keyframes` + duplicate DOM | JS scroll loops drop frames, pause on tab blur, interact badly with reduced-motion. CSS GPU-accelerated. |
| Form POST and state | Custom fetch abstraction or form library | Direct `fetch` in React `useState` handler | Only 3 states (idle/loading/success/error). A form library adds 15KB+ for no benefit here. |
| Icon management | Inline SVG copy-paste per icon | astro-icon (already in CLAUDE.md stack) | astro-icon tree-shakes unused icons, generates inline SVG, eliminates HTTP requests. |
| Image optimization | Manual WebP conversion + `<img>` with srcset | Astro `<Image />` (when using `z.image()` schema) or `public/` + manual `loading="lazy"` | Astro `<Image />` handles WebP, sizing, and lazy loading automatically |
| Smooth scroll to section | JS `scrollIntoView()` wiring | CSS `scroll-behavior: smooth` on `html` element | Zero JS, works with anchor links. Add `html { scroll-behavior: smooth; scroll-padding-top: 64px; }` to global.css to account for fixed nav height. |

---

## Common Pitfalls

### Pitfall 1: Marquee gaps at seam point
**What goes wrong:** A visible gap or jump appears when the animation loops.
**Why it happens:** The total track width is not exactly `2 × (card-width + gap) × count`. Rounding errors or variable-width cards break the `-50%` math.
**How to avoid:** Use `flex` + `gap` (not `margin`) on cards with fixed `width: 320px; flex-shrink: 0`. The gap is included in `max-content` width calculation by the browser. Test by setting `animation-duration: 3s` to see the loop rapidly.

### Pitfall 2: React island renders on server — `window` not available
**What goes wrong:** `typeof window` errors or hydration mismatch if IntersectionObserver or other browser APIs are referenced in a React component that renders on the server.
**Why it happens:** Astro pre-renders React islands as HTML on the server. Code in the component body runs on the server.
**How to avoid:** IntersectionObserver is in the Astro `<script>` tag (client-only by nature), not in React. The React islands (NavHamburger, ContactForm) do not use browser APIs directly — they use React `useState` and event handlers, which are safe.

### Pitfall 3: Scroll padding missing — anchor links land behind fixed nav
**What goes wrong:** Clicking "Serviços" scrolls to `#servicos` but the section heading is hidden behind the 64px fixed nav.
**Why it happens:** Native anchor scroll does not account for fixed headers.
**How to avoid:** Add to `global.css`:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 72px; /* 64px nav height + 8px breathing room */
}
```

### Pitfall 4: `getCollection` called in React island
**What goes wrong:** `import { getCollection } from 'astro:content'` fails to resolve in a `.tsx` file.
**Why it happens:** `astro:content` is a server-only virtual module. React islands are client-side code.
**How to avoid:** Always call `getCollection()` in the parent `.astro` file and pass data as props to React islands. Demonstrated in the NavHamburger pattern above.

### Pitfall 5: astro-icon used inside React component
**What goes wrong:** `<Icon name="..." />` from astro-icon throws an error inside a `.tsx` file.
**Why it happens:** astro-icon exports Astro components, not React components.
**How to avoid:** For icons inside React islands (NavHamburger hamburger/X icon, WhatsApp icon in ContactForm), use inline SVG literals directly. For icons in `.astro` files, use astro-icon normally.

### Pitfall 6: Tailwind v4 — no `tailwind.config.js`, @apply with custom vars
**What goes wrong:** Attempting to use `@apply bg-surface` where `surface` is a CSS var not defined as a Tailwind color utility.
**Why it happens:** Tailwind v4 CSS-first config uses `@theme {}` to define utilities. If the Phase 2 setup mapped `--color-surface` to a Tailwind `surface` color, `bg-surface` works. If not, it silently produces no style.
**How to avoid:** For safety, use inline `style="background: var(--color-surface)"` for any token-based values that are uncertain to be mapped as Tailwind utilities. Check the existing `global.css` / tokens setup — the `BaseLayout.astro` uses `bg-bg text-text font-body` successfully, confirming those utilities ARE mapped.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 3 has no new external service dependencies beyond what Phase 2 established. Web3Forms is a client-side HTTP call, no CLI tool required. Cloudflare Pages deploy is Phase 4 scope.

One soft dependency to note: **Web3Forms access key** — the form will not submit successfully without a real key. For development and verification, use the key from [web3forms.com](https://web3forms.com) (free, no credit card). Store as `PUBLIC_WEB3FORMS_KEY` in `.env`.

---

## Validation Architecture

`nyquist_validation` is explicitly `false` in `.planning/config.json`. This section is skipped.

---

## Sources

### Primary (HIGH confidence)
- `src/content.config.ts` — verified `getCollection` import path, schema shapes, loader types
- `src/styles/tokens.css` — all CSS custom property names and values confirmed
- `src/layouts/BaseLayout.astro` — confirmed font loading, body classes, slot structure
- `.planning/phases/03-ui-components-site-sections/03-UI-SPEC.md` — canonical animation values, component dimensions, copy
- `.planning/phases/03-ui-components-site-sections/03-CONTEXT.md` — all locked decisions
- Astro 5 docs (confirmed in CLAUDE.md): `astro:content` import path, `client:load` directive, `<script>` behavior
- WhatsApp official FAQ: `wa.me/{phone}?text=` format confirmed canonical

### Secondary (MEDIUM confidence)
- Web3Forms documentation pattern (simple POST to `api.web3forms.com/submit` with `access_key`)
- CSS `max-height` drawer animation — well-established pattern across multiple sources

### Tertiary (LOW confidence)
- None — all findings verified against project source or official documentation

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed from existing project files
- Architecture: HIGH — all decisions locked in CONTEXT.md and UI-SPEC.md
- CSS patterns: HIGH — standard browser APIs and CSS features
- Web3Forms: MEDIUM-HIGH — API is simple; exact field behavior confirmed from docs

**Research date:** 2026-04-03
**Valid until:** 2026-05-03 (30 days — stable technologies)
