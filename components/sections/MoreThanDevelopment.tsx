import { Rocket, Shield, Users } from 'lucide-react'

const PILLARS = [
  { icon: Rocket, title: 'Strategic Thinking', desc: 'Every build starts with your goals, not the tech stack.' },
  { icon: Shield, title: 'Transparent Process', desc: 'No surprises. Honest scoping, clear milestones, documented deliverables.' },
  { icon: Users, title: 'True Partnership', desc: 'Post-launch support, ongoing iterations, and scaling as your business grows.' },
]

export function MoreThanDevelopment() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--secondary-glow)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="section-label mb-4">More Than Development</div>
        <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
          I help businesses transform ideas into scalable digital products through modern development, automation,
          and strategic problem solving.
        </h2>
        <p className="mb-12 mx-auto" style={{ maxWidth: 560, color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.7 }}>
          This isn&apos;t just a freelance marketplace gig. It&apos;s a professional practice built around your
          outcomes — with communication, accountability, and growth thinking baked in from day one.
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {PILLARS.map((p) => (
            <div key={p.title} className="card p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                <p.icon size={18} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 className="font-display font-semibold mb-2" style={{ fontSize: 15, color: 'var(--text)' }}>{p.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
