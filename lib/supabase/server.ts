import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Server-side Supabase client for use inside Server Components and Route
 * Handlers. Still uses the anon key — never the service-role key — so RLS
 * policies remain the only line of defense. That's intentional: it forces
 * every table to be safe-by-default even if a route handler has a bug.
 */
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component with no writable cookie store —
            // safe to ignore since middleware refreshes sessions.
          }
        },
      },
    }
  )
}
