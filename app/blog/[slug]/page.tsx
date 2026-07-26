import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { BLOG_POSTS, SITE } from '@/lib/data'
import { blogPostJsonLd } from '@/lib/seo/jsonld'

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}
  const url = `${SITE.url}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      images: [{ url: post.img }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.img],
    },
  }
}

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <article className="pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post)) }}
      />
      <div className="max-w-2xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <li><Link href="/" className="no-underline" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="no-underline" style={{ color: 'var(--text-muted)' }}>Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: 'var(--text)' }}>{post.title}</li>
          </ol>
        </nav>
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-8 no-underline" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} /> All Posts
        </Link>

        <span
          className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium mb-4"
          style={{ background: `${post.color}20`, border: `1px solid ${post.color}35`, color: post.color }}
        >
          {post.category}
        </span>

        <h1 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}>
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} read</span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-10" style={{ height: 280, background: 'var(--surface2)' }}>
          <Image src={post.img} alt={post.title} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>

        <div className="space-y-5" style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.8 }}>
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
