import Link from 'next/link'
import { signOut } from '@/app/admin/actions'

/**
 * Shared shell for every /admin/* page (login excluded — see its own
 * app/admin/login/page.tsx which renders full-screen with no nav).
 *
 * Auth is already enforced by middleware.ts before any request gets this
 * far, so this layout doesn't need to check the session itself — it only
 * has to render the nav.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <nav className="flex items-center gap-5">
          <Link href="/admin" className="font-display font-semibold" style={{ fontSize: 15, color: 'var(--text)' }}>
            Admin
          </Link>
          <Link href="/admin/bio" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Bio
          </Link>
          <Link href="/admin/case-studies" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Case Studies
          </Link>
          <Link href="/" target="_blank" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            View Site ↗
          </Link>
        </nav>

        <form action={signOut}>
          <button type="submit" className="btn-outline px-4 py-2 text-xs">
            Sign Out
          </button>
        </form>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
