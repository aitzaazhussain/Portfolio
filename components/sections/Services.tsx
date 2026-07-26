import { Check } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { ICONS } from '@/lib/icon-map'

export function Services() {
  return (
    <section id="services" className="py-24 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">What I Do</div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Services Built Around Outcomes
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon]
            return (
              <div key={s.title} className="card p-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <h3 className="font-display font-semibold mb-2" style={{ fontSize: 17, color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Check size={12} style={{ color: s.color }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
