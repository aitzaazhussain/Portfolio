'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type CaseStudyFormState = { error: string; success: boolean }

// Shared by create + update — pulls and lightly cleans the fields that are
// common to both. Tags are submitted as one comma-separated text input
// ("React, Full Stack") and turned into the text[] the DB column expects.
function readCaseStudyFields(formData: FormData) {
  const slug = String(formData.get('slug') || '').trim()
  const title = String(formData.get('title') || '').trim()
  const category = String(formData.get('category') || '').trim()
  const tags = String(formData.get('tags') || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  const problem = String(formData.get('problem') || '').trim()
  const solution = String(formData.get('solution') || '').trim()
  const result = String(formData.get('result') || '').trim()
  const img = String(formData.get('img') || '').trim() || null
  const live_url = String(formData.get('live_url') || '').trim() || null
  const github_url = String(formData.get('github_url') || '').trim() || null
  const featured = formData.get('featured') === 'on'
  const published = formData.get('published') === 'on'

  return { slug, title, category, tags, problem, solution, result, img, live_url, github_url, featured, published }
}

/**
 * Creates a new case study ("add a new project"). Bound to the form in
 * app/admin/case-studies/new/page.tsx via useFormState.
 */
export async function createCaseStudy(
  _prevState: CaseStudyFormState,
  formData: FormData
): Promise<CaseStudyFormState> {
  const fields = readCaseStudyFields(formData)

  if (!fields.slug || !fields.title || !fields.problem) {
    return { error: 'Slug, title, and problem are required.', success: false }
  }

  const supabase = createClient()
  const { error } = await supabase.from('case_studies').insert(fields)

  if (error) {
    // Postgres unique_violation on the slug column — give a specific,
    // actionable message instead of the raw DB error.
    if (error.code === '23505') {
      return { error: `A case study with slug "${fields.slug}" already exists.`, success: false }
    }
    console.error('case_studies insert error:', error.message)
    return { error: 'Could not save — please try again.', success: false }
  }

  revalidatePath('/')
  revalidatePath('/admin/case-studies')

  redirect('/admin/case-studies?saved=1')
}

/**
 * Updates an existing case study. Bound to the form in
 * app/admin/case-studies/[id]/edit/page.tsx via useFormState.
 */
export async function updateCaseStudy(
  id: string,
  _prevState: CaseStudyFormState,
  formData: FormData
): Promise<CaseStudyFormState> {
  const fields = readCaseStudyFields(formData)

  if (!fields.slug || !fields.title || !fields.problem) {
    return { error: 'Slug, title, and problem are required.', success: false }
  }

  const supabase = createClient()
  const { error } = await supabase.from('case_studies').update(fields).eq('id', id)

  if (error) {
    if (error.code === '23505') {
      return { error: `A case study with slug "${fields.slug}" already exists.`, success: false }
    }
    console.error('case_studies update error:', error.message)
    return { error: 'Could not save — please try again.', success: false }
  }

  revalidatePath('/')
  revalidatePath('/admin/case-studies')

  redirect('/admin/case-studies?saved=1')
}

/**
 * Deletes a case study. Called directly from a <form action={deleteCaseStudy.bind(null, id)}>
 * button in the admin list — no separate confirmation page, so keep the
 * "Delete" button itself easy to hit only on purpose in the UI.
 */
export async function deleteCaseStudy(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('case_studies').delete().eq('id', id)

  if (error) {
    console.error('case_studies delete error:', error.message)
    throw new Error('Could not delete — please try again.')
  }

  revalidatePath('/')
  revalidatePath('/admin/case-studies')
  redirect('/admin/case-studies?deleted=1')
}
