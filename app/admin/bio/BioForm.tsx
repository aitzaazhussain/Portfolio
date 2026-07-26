'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { updateBio, type BioFormState } from './actions'

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

type SiteSettings = {
  tagline: string
  about_paragraph_1: string
  about_paragraph_2: string
  about_paragraph_3: string
}

// Separate component so useFormStatus (which only reports the status of the
// nearest parent <form>) can see this form's pending state — it doesn't
// work if called in the same component that renders the <form> itself.
function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="btn-primary px-5 py-3 text-sm">
      {pending ? 'Saving…' : 'Save Changes'}
    </button>
  )
}

export function BioForm({ initial }: { initial: SiteSettings }) {
  const initialState: BioFormState = { error: '' }
  const [state, formAction] = useFormState(updateBio, initialState)

  return (
    <form action={formAction} className="card p-8 space-y-5">
      <div>
        <label style={labelStyle} htmlFor="tagline">Tagline</label>
        <input
          id="tagline"
          name="tagline"
          defaultValue={initial.tagline}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="about_paragraph_1">About — Paragraph 1</label>
        <textarea
          id="about_paragraph_1"
          name="about_paragraph_1"
          defaultValue={initial.about_paragraph_1}
          style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
          required
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="about_paragraph_2">About — Paragraph 2</label>
        <textarea
          id="about_paragraph_2"
          name="about_paragraph_2"
          defaultValue={initial.about_paragraph_2}
          style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="about_paragraph_3">About — Paragraph 3</label>
        <textarea
          id="about_paragraph_3"
          name="about_paragraph_3"
          defaultValue={initial.about_paragraph_3}
          style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
        />
      </div>

      {state.error && (
        <p style={{ fontSize: 13, color: '#F87171' }}>{state.error}</p>
      )}

      <SaveButton />
    </form>
  )
}
