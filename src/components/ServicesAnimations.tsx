import { useReducedMotion, LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

interface ProcessStep {
  number: number
  title: string
  description: string
}

interface Props {
  services: Service[]
  processSteps: ProcessStep[]
}

const iconPaths: Record<string, string> = {
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zm8.5-10L21 3l-3.5 8.5L12 15l-3-3 3.5-8.5zM12 15l-3-3 5.5-1.5L12 15zm-3-3L6.5 14 3 17l4-2 2-3z M15 9a4 4 0 0 0-4 4',
  'shopping-bag': 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
  utensils: 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7',
  building: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
}

export default function ServicesAnimations({ services, processSteps }: Props) {
  const prefersReduced = useReducedMotion()

  const containerProps = prefersReduced
    ? {}
    : { variants: container, initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -60px 0px' } }

  const itemProps = prefersReduced
    ? {}
    : { variants: item }

  return (
    <LazyMotion features={domAnimation}>
      {/* Services grid */}
      <m.div className="services-grid" {...containerProps}>
        {services.map((service) => (
          <m.div
            key={service.id}
            {...itemProps}
            className="glass-card"
            style={{ padding: 'var(--space-8)' }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={iconPaths[service.icon] ?? iconPaths['building']} />
            </svg>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginTop: 'var(--space-4)',
              marginBottom: 0,
            }}>
              {service.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-muted)',
              marginTop: 'var(--space-2)',
              marginBottom: 0,
            }}>
              {service.description}
            </p>
          </m.div>
        ))}
      </m.div>

      {/* Process steps */}
      <div style={{ marginTop: 'var(--space-16)' }}>
        <h2 className="section-heading" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 700,
          lineHeight: 'var(--leading-snug)',
          letterSpacing: 'var(--tracking-tight)',
          color: 'var(--color-text)',
          textAlign: 'center',
          marginBottom: 'var(--space-12)',
          marginTop: 0,
        }}>
          Como trabalhamos
        </h2>
        <m.div className="process-steps" {...containerProps}>
          {processSteps.map((step) => (
            <m.div key={step.number} className="process-step" {...itemProps}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '9999px',
                background: 'var(--color-accent-surface)', color: 'var(--color-accent)',
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'var(--text-sm)', flexShrink: 0,
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)',
                fontWeight: 700, lineHeight: 'var(--leading-snug)',
                color: 'var(--color-text)', marginTop: 'var(--space-4)', marginBottom: 0,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)', marginTop: 'var(--space-2)', marginBottom: 0,
              }}>
                {step.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </LazyMotion>
  )
}
