'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { CASE_STUDIES, CASE_STUDY_FILTERS, type CaseStudy } from '@/lib/data'
import { Reveal } from '@/components/Reveal'

export function CaseStudies({ caseStudies = CASE_STUDIES }: { caseStudies?: CaseStudy[] }) {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All'
      ? caseStudies
      : caseStudies.filter((c) => c.tags.includes(active) || c.category === active)

  return (
    <section id="case-studies" className="py-24 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="section-label mb-3">Featured Case Studies</div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Real Projects, Real Businesses
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto', fontSize: 15 }}>
            Every project below is a real, named client — not a demo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CASE_STUDY_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: active === f ? 'var(--primary)' : 'var(--surface2)',
                color: active === f ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${active === f ? 'transparent' : 'var(--border)'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <div className="card overflow-hidden flex flex-col h-full group">
                {c.featured && (
                  <div className="px-4 pt-3 flex justify-end">
                    <span
                      className="px-2 py-0.5 rounded-md text-xs font-mono-custom font-medium"
                      style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', color: '#60A5FA' }}
                    >
                      ★ Featured
                    </span>
                  </div>
                )}

                {/* Image zoom on hover + action-button overlay — restrained motion,
                    per the case-studies animation spec (this section does the
                    most trust-building work, so nothing aggressive here). */}
                <Link href={`/case-studies/${c.slug}`} className="relative block overflow-hidden" style={{ height: 200, background: 'var(--surface2)' }}>
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 55%, var(--surface))' }} />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(2,6,23,0.55)' }}>
                    {c.liveUrl && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
                        <ExternalLink size={12} /> Live Demo
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium btn-primary">
                      View Case Study <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {c.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link href={`/case-studies/${c.slug}`} className="no-underline">
                    <h3 className="font-display font-semibold mb-3" style={{ fontSize: 16, color: 'var(--text)' }}>{c.title}</h3>
                  </Link>
                  <div className="text-xs mb-4 flex-1" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--text-subtle)' }}>Problem: </span>{c.problem}
                  </div>
                  <div className="flex gap-2">
                    {c.liveUrl && (
                      <a
                        href={c.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                      >
                        <ExternalLink size={12} /> Live Demo
                      </a>
                    )}
                    {c.githubUrl && (
                      <a
                        href={c.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                      >
                        <Github size={12} /> GitHub
                      </a>
                    )}
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium no-underline"
                      style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
