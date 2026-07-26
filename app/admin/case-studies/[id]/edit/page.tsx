import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { CaseStudyRow } from '@/lib/data'
import { CaseStudyForm } from '../../CaseStudyForm'
import { updateCaseStudy } from '../../actions'

export default async function EditCaseStudyPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select('*')
    .eq('id', params.id)
    .single<CaseStudyRow>()

  if (!caseStudy) notFound()

  // Binding the id here (server-side, before the function ever reaches the
  // browser) is what lets the SAME CaseStudyForm component work for both
  // create and edit — the form itself doesn't need to know the id exists.
  const updateWithId = updateCaseStudy.bind(null, caseStudy.id)

  return (
    <div>
      <h1 className="font-display font-bold mb-6" style={{ fontSize: 24, color: 'var(--text)' }}>
        Edit Project
      </h1>
      <CaseStudyForm action={updateWithId} submitLabel="Save Changes" initial={caseStudy} />
    </div>
  )
}
