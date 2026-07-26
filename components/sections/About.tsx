'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { TIMELINE } from '@/lib/data'
import { Reveal } from '@/components/Reveal'

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

// Copy structured per the 7Cs of Communication: Clear, Concise, Concrete,
// Correct, Coherent, Complete, Courteous. Kept to 3 short paragraphs —
// this is a conversion section, not a long-form bio.
export function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="card gradient-border p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative rounded-2xl overflow-hidden flex-shrink-0" style={{ width: 64, height: 64, border: '1px solid var(--border-strong)' }}>
                <Image src="/photo.jpg" alt="Aitzaaz Hussain" fill sizes="64px" style={{ objectFit: 'cover' }} />
              </div>
              <div className="section-label">About Me</div>
            </div>
            <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
              A Developer Who Understands <span className="gradient-text">Business</span>
            </h2>
            <div className="space-y-4" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <p>
                I&apos;m Aitzaaz Hussain — a full-stack developer, Shopify specialist, and AI solutions engineer
                who builds for outcomes, not just features.
              </p>
              <p>
                I&apos;ve built complete, production websites for real local businesses — including Al Madina
                Fast Food in Abbottabad, Al Baik Savour &amp; BBQ, and Taj Mahal Banquet &amp; Shadi Hall —
                handling everything from planning through launch and ongoing support.
              </p>
              <p>
                Every project starts the same way: understand your business model and what success looks like,
                then let that shape the architecture, the UX, and every integration decision that follows.
                Full-stack, Shopify, and AI — all under one accountable, communicative partner.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {['Problem Solver', 'Business Minded', 'Fast Communicator', 'Detail Oriented', 'Long-Term Partner'].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => scrollTo('#case-studies')} className="btn-primary px-5 py-3 text-sm">
                See My Work <ArrowRight size={14} />
              </button>
              <button onClick={() => scrollTo('#contact')} className="btn-outline px-5 py-3 text-sm">
                Work With Me
              </button>
            </div>
          </div>

          <div>
            <div className="section-label mb-6">Journey</div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, var(--primary), var(--secondary))' }} />
              <div className="space-y-6">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.year} delay={i * 80} className="pl-12 relative">
                    <div
                      className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-custom font-bold"
                      style={{ background: 'var(--surface2)', border: '2px solid var(--primary)', color: 'var(--primary)', zIndex: 1, top: 2 }}
                    >
                      {i + 1}
                    </div>
                    <div className="font-mono-custom text-xs mb-1" style={{ color: 'var(--secondary)' }}>{t.year}</div>
                    <div className="font-display font-semibold mb-1" style={{ fontSize: 15, color: 'var(--text)' }}>{t.title}</div>
                    <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.desc}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
