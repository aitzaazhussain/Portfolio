import { Calendar, Check } from 'lucide-react'
import { EXPERIENCE } from '@/lib/data'

// Sourced from lib/data.ts for now. To make this Supabase-driven per the
// spec: fetch from the `experience` table in a Server Component and pass
// the rows down as a prop with the same shape.
export function Experience() {
  return (
    <section id="experience" className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Experience</div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Proven Track Record
          </h2>
        </div>
        <div className="space-y-5">
          {EXPERIENCE.map((e) => (
            <div key={e.company} className="card p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                    <span className="font-mono-custom text-xs" style={{ color: e.color }}>{e.company}</span>
                  </div>
                  <h3 className="font-display font-semibold" style={{ fontSize: 18, color: 'var(--text)' }}>{e.role}</h3>
                </div>
                <span
                  className="px-3 py-1 rounded-lg font-mono-custom text-xs whitespace-nowrap"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <Calendar size={11} className="inline mr-1.5 align-middle" />
                  {e.period}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{e.desc}</p>
              <div className="flex flex-wrap gap-2">
                {e.achievements.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs"
                    style={{ background: `${e.color}10`, border: `1px solid ${e.color}22`, color: 'var(--text-muted)' }}
                  >
                    <Check size={11} style={{ color: e.color }} /> {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
