import { useState, useEffect } from "react"
import { useReducedMotion, LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

const whatsappPhone = '5543996142514'
const whatsappMessage = encodeURIComponent('Olá, vim pelo site da GMStudio')
const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`

const headlineWords = ['Presença', 'digital', 'que', 'converte']

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Enhanced 3D word-reveal: blur + scale + rotateX flip-in (React Bits style)
const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.8, rotateX: 40 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 25 },
  },
}

const ctaVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
}

export default function HeroContent() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Key fix: initial is ALWAYS 'hidden' for both SSR and client (no mismatch).
  // animate is 'show' only after mounted (so animation triggers post-hydration).
  // For reduced motion users, skip animation entirely — show immediately.
  const getInitial = () => {
    if (prefersReduced) return false // no animation, show immediately
    return 'hidden' as const
  }

  const getAnimate = () => {
    if (prefersReduced) return undefined // already visible via initial=false
    return mounted ? 'show' as const : 'hidden' as const
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* Headline with word-by-word reveal */}
      <m.h1
        className="hero-heading text-4xl lg:text-6xl font-bold"
        variants={containerVariants}
        initial={getInitial()}
        animate={getAnimate()}
        aria-label="Presença digital que converte"
        suppressHydrationWarning
        style={{
          fontFamily: 'var(--font-heading)',
          lineHeight: 'var(--leading-tight)',
          letterSpacing: 'var(--tracking-tight)',
          color: 'var(--color-text)',
          margin: 0,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 0.28em',
          perspective: '600px',
        }}
      >
        {headlineWords.map((word) => (
          <m.span
            key={word}
            variants={wordVariants}
            style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
          >
            {word}
          </m.span>
        ))}
      </m.h1>

      {/* Subtitle */}
      <m.p
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        animate={prefersReduced ? undefined : (mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 })}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xl)',
          fontWeight: 400,
          color: 'var(--color-text-muted)',
          lineHeight: 'var(--leading-normal)',
          maxWidth: '560px',
          margin: 'var(--space-6) auto 0',
        }}
      >
        Criamos sites e lojas online que geram resultados reais para o seu negócio.
      </m.p>

      {/* CTA buttons */}
      <m.div
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.72 } },
        }}
        initial={getInitial()}
        animate={getAnimate()}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          justifyContent: 'center',
          marginTop: 'var(--space-8)',
        }}
      >
        {/* Primary CTA: WhatsApp */}
        <m.a
          variants={ctaVariants}
          whileTap={prefersReduced ? undefined : { scale: 0.95 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'var(--color-accent)',
            borderRadius: 'var(--radius-full)',
            minHeight: '44px',
            padding: '0 var(--space-8)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'var(--text-base)',
            color: 'var(--color-text)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            transition: 'background var(--transition-base), box-shadow var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'var(--color-accent-hover)'
            el.style.boxShadow = 'var(--shadow-glow)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'var(--color-accent)'
            el.style.boxShadow = 'none'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar no WhatsApp
        </m.a>

        {/* Secondary CTA: Ver portfolio */}
        <m.a
          variants={ctaVariants}
          href="#portfolio"
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            minHeight: '44px',
            padding: '0 var(--space-8)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'var(--text-base)',
            background: 'transparent',
            color: 'var(--color-text)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'border-color var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-accent)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)'
          }}
        >
          Ver portfolio
        </m.a>
      </m.div>
    </LazyMotion>
  )
}
