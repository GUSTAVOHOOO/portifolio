import { useEffect, useRef } from "react"
import { LazyMotion, domAnimation, useMotionValue, useTransform, useInView } from "motion/react"
import * as m from "motion/react-m"
import { animate } from "motion/react"

interface Stat {
  numericValue: number
  suffix: string
  label: string
}

interface Props {
  stats: Stat[]
}

function Counter({ numericValue, suffix, label }: Stat) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      count.set(numericValue)
    } else {
      animate(count, numericValue, { duration: 1.5, ease: 'easeOut' })
    }
  }, [isInView, count, numericValue])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div className="stat-value" style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--text-5xl)',
        fontWeight: 700,
        color: 'var(--color-accent)',
        lineHeight: 1,
      }}>
        <m.span>{rounded}</m.span>{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wide)',
        marginTop: 'var(--space-1)',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function StatsCounter({ stats }: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="stats-row" style={{
        display: 'flex',
        gap: 'var(--space-8)',
        justifyContent: 'center',
      }}>
        {stats.map((stat) => (
          <Counter key={stat.label} {...stat} />
        ))}
      </div>
    </LazyMotion>
  )
}
