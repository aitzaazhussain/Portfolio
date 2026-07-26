import type { Metadata } from 'next'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { SITE } from '@/lib/data'
import { getPublishedCaseStudies } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real client projects by Aitzaaz Hussain — full-stack websites and digital systems built for local businesses, from planning through launch and support.',
  alternates: { canonical: `${SITE.url}/case-studies` },
}

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies()

  return (
    <div className="pt-24">
      <CaseStudies caseStudies={caseStudies} />
    </div>
  )
}
