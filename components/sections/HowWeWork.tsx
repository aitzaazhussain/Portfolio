'use client'

import { ArrowRight } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/data'
import { ICONS } from '@/lib/icon-map'
import { Reveal } from '@/components/Reveal'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export function HowWeWork() {
  const { ref, inView } = useScrollReveal(0.3)

  return (
    <section id="how-we-work" className="py-24 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">How We Work Together</div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            A Clear Process, No Surprises
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Here&apos;s exactly what happens after you reach out. Transparency at every step.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Connecting line draws on progressively (scaleX 0 → 1, left-anchored)
              the first time this section enters view — not an instant static line. */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, var(--primary), var(--secondary), transparent)',
              opacity: 0.4,
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 1.1s ease-out',
            }}
          />
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = ICONS[s.icon]
              return (
                <Reveal key={s.n} delay={i * 100} className="group">
                  <div className="card p-5 flex flex-col items-start lg:items-center lg:text-center h-full">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-mono-custom font-bold text-sm relative z-10 transition-colors duration-300 group-hover:border-[color:var(--primary)]"
                      style={{ background: 'var(--surface2)', border: '2px solid var(--border)', color: 'var(--primary)' }}
                    >
                      {s.n}
                    </div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                      <Icon size={16} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <h3 className="font-display font-semibold mb-2" style={{ fontSize: 14, color: 'var(--text)' }}>{s.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-10">
          <button onClick={() => scrollTo('#contact')} className="btn-primary px-7 py-3.5 text-[15px]">
            Start with a Discovery Call <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
