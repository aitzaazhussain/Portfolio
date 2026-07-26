/**
 * Root admin layout — intentionally minimal. The authenticated dashboard
 * shell (nav, sign out) lives in app/admin/(dashboard)/layout.tsx so
 * /admin/login renders without it.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
