import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import StatsCounter from '../ui/StatsCounter.tsx';
import './HorizontalAbout.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TeamMember {
  id: string;
  data: {
    name: string;
    role: string;
    photo?: string;
    bio?: string;
  }
}

interface Props {
  team: TeamMember[];
}

export default function HorizontalAbout({ team }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const statsData = [
    { numericValue: 20, suffix: '+', label: 'Projetos' },
    { numericValue: 15, suffix: '+', label: 'Clientes' },
    { numericValue: 2,  suffix: '+', label: 'Anos' },
  ];

  const values = [
    { name: 'Transparência', description: 'Sem surpresas, sem enrolação. Você sabe exatamente o que está sendo feito e quando — do briefing à entrega.' },
    { name: 'Qualidade', description: 'Cada pixel importa. Fazemos menos para fazer muito melhor, e o resultado aparece no design e na performance.' },
    { name: 'Resultado', description: 'Bonito não é suficiente. O site precisa ser rápido, aparecer no Google e trazer clientes de verdade.' },
    { name: 'Parceria', description: 'Você fala direto com quem cria. Sem intermediários, sem call center — somos o parceiro que você chama quando quer crescer.' },
  ];

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    const mm = gsap.matchMedia();

    // Only apply horizontal scroll pinning on screens >= 1024px
    mm.add('(min-width: 1024px)', () => {
      gsap.to(track, {
        xPercent: -66.666,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${window.innerWidth * 2}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="horizontal-about-wrapper">
      {/* Background Outline Watermark Elements */}
      <div className="about-watermark watermark-story">Studio</div>
      <div className="about-watermark watermark-values">Cultura</div>
      <div className="about-watermark watermark-team">Equipe</div>

      <div ref={trackRef} className="about-track">
        {/* Slide 1: História & Stats */}
        <div className="about-slide slide-story">
          <div className="slide-content">
            <span className="eyebrow-label">Quem somos</span>
            <h2 className="section-heading text-left" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>Criatividade <em className="accent-italic">com propósito</em></h2>
            <div className="story-layout">
              <div className="story-text">
                <p>A GMStudio nasceu da vontade de criar coisas que impressionam — e de levar isso para empreendedores que merecem uma presença digital à altura do que constroem.</p>
                <p>Unimos design fora do comum com tecnologia moderna. Você fala direto com quem faz, sem intermediários — e o resultado é um site que representa de verdade o seu negócio.</p>
              </div>
              <div className="story-stats">
                <StatsCounter stats={statsData} />
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Nossos Valores (Staggered Layout) */}
        <div className="about-slide slide-values">
          <div className="slide-content">
            <span className="eyebrow-label">Cultura</span>
            <h2 className="section-heading text-left" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>Nossos <em className="accent-italic">valores</em></h2>
            <div className="values-layout">
              {values.map((value, idx) => (
                <div key={value.name} className={`value-card value-card-${idx}`}>
                  <div className="value-number">
                    <span>/</span>
                    <span>0{idx + 1}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 var(--space-2)' }}>{value.name}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', margin: 0, lineHeight: 'var(--leading-normal)' }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 3: Nossa Equipe (Art Gallery Portrait Layout) */}
        <div className="about-slide slide-team">
          <div className="slide-content">
            <span className="eyebrow-label">Time</span>
            <h2 className="section-heading text-left" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>Nossa <em className="accent-italic">equipe</em></h2>
            {team.length > 0 ? (
              <div className="team-layout">
                {team.map((member, idx) => {
                  // Fallback high-end monochrome images for team members using Picsum with custom seeds
                  const photoUrl = member.data.photo || (
                    member.id === 'gustavo'
                      ? 'https://picsum.photos/seed/gustavo-studio-portrait/400/600'
                      : 'https://picsum.photos/seed/designer-studio-portrait/400/600'
                  );

                  return (
                    <div key={member.id} className={`team-card team-card-${idx}`}>
                      <div className="team-image-wrapper">
                        <img src={photoUrl} alt={member.data.name} loading="lazy" decoding="async" />
                        <div className="team-info-overlay">
                          <span className="team-role">{member.data.role}</span>
                          <h3>{member.data.name}</h3>
                          {member.data.bio && <p className="team-bio">{member.data.bio}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-team-text" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>Conheça o nosso estúdio.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
