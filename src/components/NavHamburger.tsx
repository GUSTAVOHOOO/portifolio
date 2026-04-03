import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
}

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function NavHamburger({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '44px',
          minWidth: '44px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-text)',
        }}
      >
        {isOpen ? <IconX /> : <IconMenu />}
      </button>

      <nav
        role="navigation"
        aria-label="Menu mobile"
        className="mobile-drawer"
        data-open={String(isOpen)}
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
