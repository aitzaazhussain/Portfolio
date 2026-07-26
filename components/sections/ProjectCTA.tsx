'use client'

import { ArrowRight } from 'lucide-react'

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export function ProjectCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
      <div className="orb" style={{ width: 600, height: 600, background: 'var(--primary-glow)', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', opacity: 0.5 }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--secondary-glow)', top: '50%', right: '10%', transform: 'translateY(-50%)', opacity: 0.4 }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="section-label mb-4">Have a Project in Mind?</div>
        <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
          Let&apos;s Build Something That <span className="gradient-text">Actually Works</span>
        </h2>
        <p className="mb-10 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Whether you&apos;re launching a new business, improving an existing website, building a Shopify store, or
          exploring AI solutions — I&apos;d be happy to discuss your goals and recommend the best approach.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => scrollTo('#contact')} className="btn-primary px-8 py-4 text-[15px]">
            Book Discovery Call <ArrowRight size={16} />
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-outline px-8 py-4 text-[15px]">
            Get a Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
