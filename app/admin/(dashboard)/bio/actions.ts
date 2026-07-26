'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type BioFormState = { error: string; success: boolean }

/**
 * Updates the single site_settings row. Bound to the <form action={...}>
 * in BioForm.tsx via useFormState, which is why the signature takes the
 * previous state as its first argument even though this action ignores it.
 */
export async function updateBio(_prevState: BioFormState, formData: FormData): Promise<BioFormState> {
  const tagline = String(formData.get('tagline') || '').trim()
  const paragraph1 = String(formData.get('about_paragraph_1') || '').trim()
  const paragraph2 = String(formData.get('about_paragraph_2') || '').trim()
  const paragraph3 = String(formData.get('about_paragraph_3') || '').trim()

  if (!tagline || !paragraph1) {
    return { error: 'Tagline and the first paragraph are required.', success: false }
  }

  const supabase = createClient()
  const { error } = await supabase
    .from('site_settings')
    .update({
      tagline,
      about_paragraph_1: paragraph1,
      about_paragraph_2: paragraph2,
      about_paragraph_3: paragraph3,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 'main')

  if (error) {
    console.error('site_settings update error:', error.message)
    return { error: 'Could not save — please try again.', success: false }
  }

  // This is the piece that satisfies "no hard refresh needed": revalidatePath
  // clears Next.js's cached render of "/" (the public homepage) and of this
  // admin page. The NEXT time either path renders — including the automatic
  // re-render Next triggers right after this action finishes for whoever
  // just submitted the form — it re-fetches from Supabase and shows the new
  // copy. No window.location.reload(), no manual client-side refetch.
  revalidatePath('/')
  revalidatePath('/admin/bio')

  return { error: '', success: true }
}
