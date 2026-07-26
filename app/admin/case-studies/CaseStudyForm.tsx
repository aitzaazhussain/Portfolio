'use client'

import { useFormState, useFormStatus } from 'react-dom'
import type { CaseStudyFormState } from './actions'

const inputStyle: React.CSSProperties = {
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  color: 'var(--text)',
  padding: '12px 14px',
  width: '100%',
  fontSize: 14,
  outline: 'none',
}
const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--text-muted)',
  display: 'block',
  marginBottom: 6,
}

type CaseStudyFormValues = {
  slug: string
  title: string
  category: string
  tags: string[]
  problem: string
  solution: string
  result: string
  img: string | null
  live_url: string | null
  github_url: string | null
  featured: boolean
  published: boolean
}

// Matches useFormState's expected action shape: (prevState, formData) => Promise<state>.
// The page that renders this form passes in either `createCaseStudy` as-is
// (new/page.tsx) or `updateCaseStudy.bind(null, id)` ([id]/edit/page.tsx) —
// binding the id ahead of time is what lets one form component serve both.
type BoundAction = (prevState: CaseStudyFormState, formData: FormData) => Promise<CaseStudyFormState>

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="btn-primary px-5 py-3 text-sm">
      {pending ? 'Saving…' : label}
    </button>
  )
}

export function CaseStudyForm({
  action,
  initial,
  submitLabel,
}: {
  action: BoundAction
  initial: CaseStudyFormValues
  submitLabel: string
}) {
  const initialState: CaseStudyFormState = { error: '' }
  const [state, formAction] = useFormState(action, initialState)

  return (
    <form action={formAction} className="card p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="slug">
            Slug <span style={{ color: 'var(--text-subtle)' }}>(used in the URL, e.g. my-project-name)</span>
          </label>
          <input id="slug" name="slug" defaultValue={initial.slug} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle} htmlFor="title">Title</label>
          <input id="title" name="title" defaultValue={initial.title} style={inputStyle} required />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={initial.category} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="tags">
            Tags <span style={{ color: 'var(--text-subtle)' }}>(comma-separated)</span>
          </label>
          <input id="tags" name="tags" defaultValue={initial.tags.join(', ')} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="problem">Problem</label>
        <textarea id="problem" name="problem" defaultValue={initial.problem} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} required />
      </div>
      <div>
        <label style={labelStyle} htmlFor="solution">Solution</label>
        <textarea id="solution" name="solution" defaultValue={initial.solution} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} />
      </div>
      <div>
        <label style={labelStyle} htmlFor="result">Result</label>
        <textarea id="result" name="result" defaultValue={initial.result} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="img">
          Image path <span style={{ color: 'var(--text-subtle)' }}>(e.g. /case-studies/my-project.jpg)</span>
        </label>
        <input id="img" name="img" defaultValue={initial.img || ''} style={inputStyle} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="live_url">Live URL</label>
          <input id="live_url" name="live_url" defaultValue={initial.live_url || ''} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="github_url">GitHub URL</label>
          <input id="github_url" name="github_url" defaultValue={initial.github_url || ''} style={inputStyle} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          <input type="checkbox" name="featured" defaultChecked={initial.featured} />
          Featured
        </label>
        <label className="flex items-center gap-2" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          <input type="checkbox" name="published" defaultChecked={initial.published} />
          Published (visible on the public site)
        </label>
      </div>

      {state.error && <p style={{ fontSize: 13, color: '#F87171' }}>{state.error}</p>}

      <SaveButton label={submitLabel} />
    </form>
  )
}
