import { WHY_CARDS } from '@/lib/data'
import { ICONS } from '@/lib/icon-map'

export function WhyChooseMe() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Why Businesses Choose Me</div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            I Solve Problems, Not Just Write Code
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CARDS.map((c) => {
            const Icon = ICONS[c.icon]
            return (
              <div key={c.title} className="card gradient-border p-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}
                >
                  <Icon size={20} style={{ color: c.color }} />
                </div>
                <h3 className="font-display font-semibold mb-2" style={{ fontSize: 16, color: 'var(--text)' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{c.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
