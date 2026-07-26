import Link from 'next/link'
import { FileText, FolderKanban, LayoutDashboard, Mail, ExternalLink } from 'lucide-react'
import { signOut } from '@/app/admin/actions'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/bio', label: 'Bio', icon: FileText },
  { href: '/admin/case-studies', label: 'Case Studies', icon: FolderKanban },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
]

/**
 * Shared shell for authenticated /admin/* pages. Login lives outside this
 * group at app/admin/login/page.tsx so it renders without this nav.
 */
export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-md"
        style={{ borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}
      >
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/admin"
            className="font-display font-semibold mr-2 sm:mr-4"
            style={{ fontSize: 15, color: 'var(--text)' }}
          >
            Admin
          </Link>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--surface2)]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm ml-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">View Site</span>
          </Link>
        </nav>

        <form action={signOut}>
          <button type="submit" className="btn-outline px-4 py-2 text-xs">
            Sign Out
          </button>
        </form>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
