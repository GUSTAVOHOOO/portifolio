import { useState, useEffect } from "react"
import { useReducedMotion, LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"
import './HeroContent.css'
import ShinyText from '../ui/ShinyText.jsx'
import Magnet from '../ui/Magnet.tsx'

const whatsappPhone = '5543996142514'
const whatsappMessage = encodeURIComponent('Olá, vim pelo site da GMStudio')
const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`

// Palavras com accent: true recebem bold italic gradient
const headlineWords = [
  { text: 'Seu', accent: false },
  { text: 'concorrente', accent: true, shinyType: 'primary' },
  { isBreak: true },
  { text: 'já', accent: false },
  { text: 'vende', accent: false },
  { text: 'online.', accent: false },
  { isBreak: true },
  { text: 'E', accent: false },
  { text: 'você?', accent: true, shinyType: 'accent' },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: 40 },
  show: {
    opacity: 1,
    y: 0,
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

  const getInitial = () => {
    if (prefersReduced) return false
    return 'hidden' as const
  }

  const getAnimate = () => {
    if (prefersReduced) return undefined
    return mounted ? 'show' as const : 'hidden' as const
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* Headline with word-by-word reveal */}
      <m.h1
        className="hero-heading"
        variants={containerVariants}
        initial={getInitial()}
        animate={getAnimate()}
        aria-label="Se o site não vende, não é um site."
        suppressHydrationWarning
      >
        {headlineWords.map((item, i) =>
          item.isBreak ? (
            <span key={i} className="hero-heading__break" aria-hidden="true" />
          ) : (
            <m.span
              key={i}
              variants={wordVariants}
              className={`hero-heading__word${item.accent ? ' hero-heading__word--italic' : ''}`}
            >
              {item.shinyType === 'primary' ? (
                <ShinyText
                  text={item.text}
                  disabled={false}
                  speed={4}
                  color="var(--color-accent)"
                  shineColor="#ffffff"
                  spread={140}
                  pauseOnHover={true}
                />
              ) : item.shinyType === 'accent' ? (
                <ShinyText
                  text={item.text}
                  disabled={false}
                  speed={3}
                  color="#ffffff"
                  shineColor="var(--color-accent)"
                  spread={110}
                  pauseOnHover={true}
                />
              ) : (
                item.text
              )}
            </m.span>
          )
        )}
      </m.h1>

      {/* Subtitle */}
      <m.p
        className="hero-subtitle"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } },
        }}
        initial={getInitial()}
        animate={getAnimate()}
        suppressHydrationWarning
      >
        Sites, lojas e landing pages feitos para converter. <br />
        Entregamos em até 30 dias — e você aprova cada etapa.
      </m.p>

      {/* CTA buttons */}
      <m.div
        className="hero-cta-row"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 1.5 } },
        }}
        initial={getInitial()}
        animate={getAnimate()}
      >
        {/* Primary CTA: WhatsApp */}
        <Magnet padding={40} magnetStrength={8} wrapperClassName="inline-flex">
          <m.a
            variants={ctaVariants}
            whileTap={prefersReduced ? undefined : { scale: 0.95 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </m.a>
        </Magnet>
      </m.div>

      {/* Scroll indicator */}
      <m.div
        className="hero-scroll-indicator"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={prefersReduced ? undefined : (mounted ? { opacity: 0.5 } : { opacity: 0 })}
        transition={{ delay: 1.9, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="hero-scroll-label">scroll</span>
        <m.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          animate={!prefersReduced ? { y: [0, 6, 0] } : undefined}
          transition={!prefersReduced ? { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } : undefined}
        >
          <path d="M8 12L2 6h12L8 12z" />
        </m.svg>
      </m.div>
    </LazyMotion>
  )
}
