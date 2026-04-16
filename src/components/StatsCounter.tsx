import { useEffect, useRef } from "react"
import { LazyMotion, domAnimation, useMotionValue, useTransform, useInView } from "motion/react"
import * as m from "motion/react-m"
import { animate } from "motion/react"
import "./StatsCounter.css"

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
    <div ref={ref} className="stat-item">
      <div className="stat-value text-5xl lg:text-6xl">
        <m.span>{rounded}</m.span>{suffix}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  )
}

export default function StatsCounter({ stats }: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="stats-row">
        {stats.map((stat) => (
          <Counter key={stat.label} {...stat} />
        ))}
      </div>
    </LazyMotion>
  )
}
