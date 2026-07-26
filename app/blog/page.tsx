import type { Metadata } from 'next'
import { Blog } from '@/components/sections/Blog'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on Shopify conversion, practical AI integration, and running a freelance development practice.',
  alternates: { canonical: `${SITE.url}/blog` },
}

export default function BlogPage() {
  return (
    <div className="pt-24">
      <Blog />
    </div>
  )
}
