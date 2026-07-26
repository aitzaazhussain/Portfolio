import Link from 'next/link'

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="font-display font-bold mb-6" style={{ fontSize: 24, color: 'var(--text)' }}>
        Dashboard
      </h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/bio" className="card p-6 no-underline">
          <h2 className="font-display font-semibold mb-1" style={{ fontSize: 16, color: 'var(--text)' }}>
            Bio
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Edit your tagline and the 3 About-section paragraphs.
          </p>
        </Link>
        <Link href="/admin/case-studies" className="card p-6 no-underline">
          <h2 className="font-display font-semibold mb-1" style={{ fontSize: 16, color: 'var(--text)' }}>
            Case Studies
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Add, edit, or remove client projects shown on the homepage.
          </p>
        </Link>
      </div>
    </div>
  )
}
