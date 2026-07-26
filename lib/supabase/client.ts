import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client. Uses the public anon key only — this is safe
 * to ship to the client because Row Level Security policies (see
 * supabase/migrations) restrict what the anon role can do on every table.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
