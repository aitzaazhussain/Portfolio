import type { Metadata } from 'next'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real client projects by Aitzaaz Hussain — full-stack websites and digital systems built for local businesses, from planning through launch and support.',
  alternates: { canonical: `${SITE.url}/case-studies` },
}

export default function CaseStudiesPage() {
  return (
    <div className="pt-24">
      <CaseStudies />
    </div>
  )
}
