import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Runs before every request that matches `config.matcher` below (all
 * /admin/* routes). Checks for a real, still-valid Supabase Auth session —
 * not just "a cookie exists" — and bounces anyone without one to
 * /admin/login. This is the ONLY thing standing between the public
 * internet and your edit forms, so /admin must never be reachable without
 * it running.
 */
export async function middleware(request: NextRequest) {
  // Always let /admin/login itself through, or a logged-in user could
  // never reach the page that lets them log in.
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  // A middleware-specific Supabase client. It needs its own cookie adapter
  // (different from lib/supabase/server.ts) because middleware reads
  // cookies off the incoming request and must write any refreshed session
  // cookies onto the outgoing response for the browser to keep.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getUser() (not getSession()) because it re-verifies the session against
  // Supabase's servers instead of trusting whatever is in the cookie —
  // that matters in middleware since it's the actual gatekeeper.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  // Everything under /admin, including /admin itself. /admin/login is
  // excluded above inside the function (matcher patterns can't easily
  // express "this path but not that subpath").
  matcher: ['/admin/:path*'],
}
