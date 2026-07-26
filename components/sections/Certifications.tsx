import { Award, ExternalLink } from 'lucide-react'
import { CERTS } from '@/lib/data'

export function Certifications() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label mb-3">Certifications</div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Verified Credentials
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {CERTS.map((c) => (
            <div key={c.title} className="card p-5 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.color}15`, border: `1px solid ${c.color}28` }}
              >
                <Award size={22} style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold text-sm mb-0.5" style={{ color: 'var(--text)' }}>{c.title}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.issuer} · {c.date}</div>
              </div>
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all no-underline"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                Verify <ExternalLink size={10} className="inline ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
