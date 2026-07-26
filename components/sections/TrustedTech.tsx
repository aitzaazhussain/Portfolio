import { TECHS } from '@/lib/data'

// Infinite horizontal marquee, logo + name together, pause on hover.
// Next.js gets a small dark chip behind its dot so the white mark stays
// visible in light mode (audit bug: "white Next.js dot invisible on light
// backgrounds").
export function TrustedTech() {
  const loop = [...TECHS, ...TECHS]

  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-5">
          <span className="section-label whitespace-nowrap">Trusted Technologies</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>
      </div>
      <div className="marquee-track relative overflow-hidden">
        <div className="flex gap-3 w-max animate-marquee px-3">
          {loop.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              tabIndex={0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium grayscale opacity-70 hover:grayscale-0 hover:opacity-100 focus-visible:grayscale-0 focus-visible:opacity-100 transition-all"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  background: t.name === 'Next.js' ? '#000' : t.color,
                  outline: t.name === 'Next.js' ? '1px solid rgba(255,255,255,0.4)' : 'none',
                }}
              />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
