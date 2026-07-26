import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react'
import { CASE_STUDIES, SITE } from '@/lib/data'
import { caseStudyJsonLd } from '@/lib/seo/jsonld'

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = CASE_STUDIES.find((c) => c.slug === params.slug)
  if (!study) return {}
  const url = `${SITE.url}/case-studies/${study.slug}`
  return {
    title: study.title,
    description: study.problem,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: study.title,
      description: study.problem,
      url,
      images: [{ url: study.img }],
    },
    twitter: {
      card: 'summary_large_image',
      title: study.title,
      description: study.problem,
      images: [study.img],
    },
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h2 className="font-display font-semibold mb-2" style={{ fontSize: 15, color: 'var(--text)' }}>{label}</h2>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{children}</p>
    </div>
  )
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const study = CASE_STUDIES.find((c) => c.slug === params.slug)
  if (!study) notFound()

  const gallery = study.gallery && study.gallery.length > 0 ? study.gallery : [study.img]

  return (
    <article className="pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd(study)) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <li><Link href="/" className="no-underline" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/case-studies" className="no-underline" style={{ color: 'var(--text-muted)' }}>Case Studies</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: 'var(--text)' }}>{study.title}</li>
          </ol>
        </nav>

        <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm mb-8 no-underline" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} /> All Case Studies
        </Link>

        <div className="flex items-center gap-2 mb-4">
          {study.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              {t}
            </span>
          ))}
        </div>

        <h1 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
          {study.title}
        </h1>

        <div className="relative rounded-2xl overflow-hidden mb-10" style={{ height: 360, background: 'var(--surface2)' }}>
          <Image src={study.img} alt={study.title} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Field label="Problem">{study.problem}</Field>
          <Field label="Research">{study.research}</Field>
          <Field label="Planning">{study.planning}</Field>
          <Field label="Design">{study.design}</Field>
          <Field label="Development">{study.development}</Field>
          <Field label="Challenges">{study.challenges}</Field>
        </div>
        <div className="mb-5">
          <Field label="Solutions">{study.solutions}</Field>
        </div>

        {study.technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display font-semibold mb-3" style={{ fontSize: 15, color: 'var(--text)' }}>Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.technologies.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {study.features.length > 0 && (
          <div className="card p-6 mb-8">
            <h2 className="font-display font-semibold mb-3" style={{ fontSize: 15, color: 'var(--text)' }}>Features</h2>
            <ul className="space-y-2">
              {study.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--secondary)', marginTop: 2, flexShrink: 0 }} /> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Business impact — only rendered if a real, verified figure exists. */}
        {study.businessImpact && (
          <div className="px-4 py-3 rounded-lg font-mono-custom text-sm mb-8" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--secondary)' }}>
            ↗ {study.businessImpact}
          </div>
        )}

        {/* Client testimonial — only rendered if the client actually gave one. */}
        {study.clientTestimonial && (
          <div className="card gradient-border p-6 mb-8">
            <p className="text-sm italic leading-relaxed mb-3" style={{ color: 'var(--text)' }}>
              &ldquo;{study.clientTestimonial.quote}&rdquo;
            </p>
            <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>— {study.clientTestimonial.author}</p>
          </div>
        )}

        {gallery.length > 1 && (
          <div className="mb-8">
            <h2 className="font-display font-semibold mb-3" style={{ fontSize: 15, color: 'var(--text)' }}>Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((src, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden" style={{ height: 160, background: 'var(--surface2)' }}>
                  <Image src={src} alt={`${study.title} screenshot ${i + 1}`} fill sizes="50vw" style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {study.futureImprovements && (
          <div className="mb-10">
            <Field label="Future Improvements">{study.futureImprovements}</Field>
          </div>
        )}

        <div className="flex gap-3">
          {study.liveUrl && (
            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-3 text-sm no-underline">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {study.githubUrl && (
            <a href={study.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline px-5 py-3 text-sm no-underline">
              <Github size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
