import { useState, useEffect } from "react"
import "./AuroraBackground.css"

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
    <div
      className="aurora-bg-container"
      aria-hidden="true"
    >
      {/* Blob 1 — indigo, top-left */}
      <div className={`aurora-blob aurora-blob-1${mounted ? ' aurora-animate' : ''}`} />

      {/* Blob 2 — violet, bottom-right */}
      <div className={`aurora-blob aurora-blob-2${mounted ? ' aurora-animate' : ''}`} />

      {/* Blob 3 — cyan, center-right */}
      <div className={`aurora-blob aurora-blob-3${mounted ? ' aurora-animate' : ''}`} />
    </div>
  )
}
