import { SITE, SERVICES, TESTIMONIALS, type CaseStudy } from '@/lib/data'

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    jobTitle: 'Full-Stack Developer, Shopify Expert & AI Solutions Engineer',
    email: `mailto:${SITE.email}`,
    sameAs: [
      'https://github.com/aitzaazhussain',
      'https://linkedin.com/in/aitzaazhussain',
      'https://instagram.com/aitzaazhussain',
      'https://fiverr.com/aitzaazhussain',
      'https://upwork.com/freelancers/aitzaazhussain',
    ],
  }
}

export function servicesJsonLd() {
  return SERVICES.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: s.title,
    description: s.desc,
    provider: {
      '@type': 'Person',
      name: SITE.name,
    },
  }))
}

export function blogPostJsonLd(post: { title: string; excerpt: string; slug: string; img: string; date: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE.url}/blog/${post.slug}`,
    image: `${SITE.url}${post.img}`,
    datePublished: post.date,
    author: { '@type': 'Person', name: SITE.name },
  }
}

export function caseStudyJsonLd(study: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.title,
    description: study.problem,
    url: `${SITE.url}/case-studies/${study.slug}`,
    image: `${SITE.url}${study.img}`,
    creator: { '@type': 'Person', name: SITE.name },
    keywords: study.tags.join(', '),
  }
}

export function aggregateRatingJsonLd() {
  if (TESTIMONIALS.length === 0) return null
  const avg =
    TESTIMONIALS.reduce((sum, t) => sum + t.stars, 0) / TESTIMONIALS.length
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: TESTIMONIALS.length,
    },
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: t.stars, bestRating: 5 },
      reviewBody: t.quote,
    })),
  }
}
