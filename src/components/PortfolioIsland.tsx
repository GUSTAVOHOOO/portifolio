import { useState, useEffect } from "react"
import { LazyMotion, domAnimation, AnimatePresence, useReducedMotion } from "motion/react"
import * as m from "motion/react-m"

interface Project {
  id: string
  title: string
  category: string
  thumbnail: string
  liveUrl: string
  featured: boolean
}

interface Props {
  projects: Project[]
}

export default function PortfolioIsland({ projects }: Props) {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const categories = ['Todos', ...Array.from(new Set(projects.map((p) => p.category)))]
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? projects
    : projects.filter((p) => p.category === active)

  // Label formatter: capitalize first letter
  const formatLabel = (cat: string) =>
    cat.charAt(0).toUpperCase() + cat.slice(1)

  return (
    <LazyMotion features={domAnimation}>
      {/* Filter tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: 'var(--space-10)',
          justifyContent: 'center',
        }}
      >
        {categories.map((cat) => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                background: isActive ? 'var(--color-accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--color-text-muted)',
                border: '1px solid',
                borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 20px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'var(--text-sm)',
                transition: 'all 180ms ease',
                minHeight: '36px',
              }}
            >
              {formatLabel(cat)}
            </button>
          )
        })}
      </div>

      {/* Portfolio grid with AnimatePresence */}
      <div className="portfolio-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <m.a
              key={project.id}
              layout={!prefersReduced}
              initial={(!mounted || prefersReduced) ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              suppressHydrationWarning
              exit={prefersReduced ? undefined : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.15 } }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar ${project.title} (abre em nova aba)`}
              className="project-card glass-card"
              style={{
                display: 'block',
                textDecoration: 'none',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              {/* Thumbnail */}
              <div style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-accent-surface) 100%)',
              }}>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>

              {/* Card body */}
              <div style={{ padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    margin: 0,
                  }}>
                    {project.title}
                  </h3>
                  {/* External link icon */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
                <span style={{
                  display: 'inline-block',
                  marginTop: 'var(--space-2)',
                  background: 'var(--color-accent-surface)',
                  color: 'var(--color-accent)',
                  borderRadius: 'var(--radius-full)',
                  padding: 'var(--space-1) var(--space-3)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                }}>
                  {project.category}
                </span>
              </div>
            </m.a>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p style={{
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          padding: 'var(--space-12) 0',
        }}>
          Nenhum projeto nesta categoria ainda.
        </p>
      )}
    </LazyMotion>
  )
}
