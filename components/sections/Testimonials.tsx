'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, MessageSquareText } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data'

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const n = TESTIMONIALS.length
  const t = TESTIMONIALS[idx]

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label mb-3">Testimonials</div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            What Clients Say
          </h2>
        </div>

        {n === 0 ? (
          // Honest empty state — no fabricated quotes. This fills in
          // automatically once real, approved reviews exist in Supabase.
          <div className="card gradient-border p-10 md:p-12 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
            >
              <MessageSquareText size={22} style={{ color: 'var(--secondary)' }} />
            </div>
            <h3 className="font-display font-semibold mb-2" style={{ fontSize: 18, color: 'var(--text)' }}>
              Client reviews coming soon
            </h3>
            <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
              Real reviews from real clients will appear here as projects wrap up — nothing fabricated in the
              meantime.
            </p>
            <button onClick={() => scrollTo('#contact')} className="btn-outline px-5 py-2.5 text-sm mx-auto">
              Be the First to Work With Me
            </button>
          </div>
        ) : (
          <>
            <div className="card gradient-border p-8 md:p-10 text-center">
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="mb-6 leading-relaxed" style={{ fontSize: 17, color: 'var(--text)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-display font-semibold text-sm"
                  style={{ background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div className="text-left">
                  <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setIdx((i) => (i - 1 + n) % n)}
                className="w-9 h-9 rounded-full flex items-center justify-center border"
                style={{ background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: i === idx ? 'var(--primary)' : 'var(--border-strong)' }}
                  />
                ))}
              </div>
              <button
                onClick={() => setIdx((i) => (i + 1) % n)}
                className="w-9 h-9 rounded-full flex items-center justify-center border"
                style={{ background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
