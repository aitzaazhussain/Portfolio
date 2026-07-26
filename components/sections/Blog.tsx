import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'

export function Blog() {
  return (
    <section id="blog" className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label mb-3">Blog</div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Thinking Out Loud
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card overflow-hidden group no-underline block">
              <div className="relative" style={{ height: 180, background: 'var(--surface2)' }}>
                <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{ background: `${p.color}30`, border: `1px solid ${p.color}50`, color: '#fff', backdropFilter: 'blur(8px)' }}
                >
                  {p.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1"><Clock size={11} /> {p.readTime} read</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(p.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-display font-semibold leading-snug" style={{ fontSize: 15, color: 'var(--text)' }}>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
