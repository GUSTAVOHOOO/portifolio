import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  liveUrl: string;
  featured: boolean;
}

interface Props {
  projects: Project[];
}

export default function HorizontalPortfolio({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    // Calculate how much we need to translate horizontally
    const scrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const amountToScroll = scrollWidth - viewportWidth;

    if (amountToScroll <= 0) return;

    // Pin the main container and translate the inner track left
    gsap.to(track, {
      x: -amountToScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${amountToScroll}`,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="horizontal-portfolio-wrapper" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '0 var(--space-6) var(--space-8)' }}>
        <span className="eyebrow-label">Portfólio</span>
        <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)', lineHeight: 'var(--leading-snug)', letterSpacing: 'var(--tracking-tight)', textAlign: 'center', marginBottom: 'var(--space-12)', marginTop: 0, color: 'var(--color-text)' }}>
          Nossos projetos
        </h2>
      </div>
      <div ref={trackRef} className="portfolio-track" style={{ display: 'flex', gap: 'var(--space-6)', padding: '0 var(--space-6)', width: 'max-content', paddingBottom: '24px' }}>
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card glass-card"
            style={{
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
              width: '350px',
              flexShrink: 0,
            }}
          >
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
              />
            </div>
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
          </a>
        ))}
      </div>
    </div>
  );
}
