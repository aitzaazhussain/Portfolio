import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { CaseStudyRow } from '@/lib/data'
import { deleteCaseStudy } from './actions'

function FlashMessage({ saved, deleted }: { saved?: string; deleted?: string }) {
  if (saved === '1') {
    return (
      <p
        className="mb-4 px-4 py-3 rounded-lg"
        style={{ fontSize: 13, color: 'var(--secondary)', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.25)' }}
        role="status"
      >
        Case study saved successfully
      </p>
    )
  }

  if (deleted === '1') {
    return (
      <p
        className="mb-4 px-4 py-3 rounded-lg"
        style={{ fontSize: 13, color: 'var(--secondary)', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.25)' }}
        role="status"
      >
        Case study deleted successfully
      </p>
    )
  }

  return null
}

export default async function AdminCaseStudiesPage({
  searchParams,
}: {
  searchParams: { saved?: string; deleted?: string }
}) {
  const supabase = createClient()
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<CaseStudyRow[]>()

  return (
    <div>
      <FlashMessage saved={searchParams.saved} deleted={searchParams.deleted} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold" style={{ fontSize: 24, color: 'var(--text)' }}>
          Case Studies
        </h1>
        <Link href="/admin/case-studies/new" className="btn-primary px-4 py-2 text-sm no-underline">
          + Add Project
        </Link>
      </div>

      <div className="space-y-3">
        {(caseStudies || []).map((c) => (
          <div key={c.id} className="card p-4 flex items-center justify-between gap-4">
            <div>
              <div className="font-display font-semibold" style={{ fontSize: 14, color: 'var(--text)' }}>
                {c.title}{' '}
                {!c.published && (
                  <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>(draft)</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>/{c.slug}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={`/admin/case-studies/${c.id}/edit`}
                className="btn-outline px-3 py-1.5 text-xs no-underline"
              >
                Edit
              </Link>
              <form action={deleteCaseStudy.bind(null, c.id)}>
                <button type="submit" className="px-3 py-1.5 text-xs rounded-lg" style={{ color: '#F87171', border: '1px solid rgba(248,113,113,0.3)' }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {(!caseStudies || caseStudies.length === 0) && (
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>No case studies yet.</p>
        )}
      </div>
    </div>
  )
}
