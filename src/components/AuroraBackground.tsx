import { useState, useEffect } from "react"

/**
 * AuroraBackground — premium animated gradient background for the hero section.
 *
 * Design: 3 large radial gradient blobs (indigo, violet, cyan) that slowly drift
 * using CSS keyframe animations. Pure CSS — no requestAnimationFrame, no canvas,
 * no WebGL. Respects prefers-reduced-motion via CSS media query.
 *
 * Threat model compliance:
 *   T-05-07-01: CSS animations only, ≤3 blobs, reduced-motion via CSS media query
 *   T-05-07-02: No external fetches, no script tags, no localStorage access
 */
export default function AuroraBackground() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-25px, 20px) scale(1.08); }
          66%       { transform: translate(15px, -25px) scale(0.92); }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(20px, 15px) scale(1.03); }
          66%       { transform: translate(-15px, -20px) scale(0.97); }
        }
        .aurora-blob-1.aurora-animate { animation: aurora-drift-1 15s ease-in-out infinite; }
        .aurora-blob-2.aurora-animate { animation: aurora-drift-2 18s ease-in-out infinite; }
        .aurora-blob-3.aurora-animate { animation: aurora-drift-3 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aurora-animate { animation: none !important; }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {/* Blob 1 — indigo, top-left */}
        <div
          className={`aurora-blob aurora-blob-1${mounted ? ' aurora-animate' : ''}`}
          style={{
            position: 'absolute',
            width: '60vw',
            height: '60vw',
            maxWidth: '800px',
            maxHeight: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
            filter: 'blur(80px)',
          }}
        />

        {/* Blob 2 — violet, bottom-right */}
        <div
          className={`aurora-blob aurora-blob-2${mounted ? ' aurora-animate' : ''}`}
          style={{
            position: 'absolute',
            width: '50vw',
            height: '50vw',
            maxWidth: '700px',
            maxHeight: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
            filter: 'blur(80px)',
          }}
        />

        {/* Blob 3 — cyan, center-right */}
        <div
          className={`aurora-blob aurora-blob-3${mounted ? ' aurora-animate' : ''}`}
          style={{
            position: 'absolute',
            width: '40vw',
            height: '40vw',
            maxWidth: '500px',
            maxHeight: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, transparent 70%)',
            top: '30%',
            right: '20%',
            filter: 'blur(60px)',
          }}
        />
      </div>
    </>
  )
}
