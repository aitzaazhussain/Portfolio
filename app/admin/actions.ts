'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Signs the current admin out and sends them back to the login screen.
 * Wired to the "Sign Out" button in app/admin/layout.tsx via a <form
 * action={signOut}>.
 */
export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
