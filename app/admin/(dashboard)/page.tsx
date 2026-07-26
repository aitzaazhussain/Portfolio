import Link from 'next/link'
import { FileText, FolderKanban, Mail, ArrowRight } from 'lucide-react'
import { getAdminStats } from '@/lib/cms'

export default async function AdminHomePage() {
  const stats = await getAdminStats()

  const cards = [
    {
      href: '/admin/bio',
      title: 'Bio',
      description: 'Edit your tagline and the 3 About-section paragraphs.',
      icon: FileText,
      stat: stats.bioUpdatedAt
        ? `Updated ${new Date(stats.bioUpdatedAt).toLocaleDateString()}`
        : 'Not updated yet',
    },
    {
      href: '/admin/case-studies',
      title: 'Case Studies',
      description: 'Add, edit, or remove client projects shown on the homepage.',
      icon: FolderKanban,
      stat: `${stats.caseStudyCount} project${stats.caseStudyCount === 1 ? '' : 's'}`,
    },
    {
      href: '/admin/messages',
      title: 'Messages',
      description: 'Read contact form submissions from your portfolio site.',
      icon: Mail,
      stat: `${stats.messageCount} message${stats.messageCount === 1 ? '' : 's'}`,
    },
  ]

  return (
    <div>
      <h1 className="font-display font-bold mb-2" style={{ fontSize: 24, color: 'var(--text)' }}>
        Dashboard
      </h1>
      <p className="mb-8" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
        Manage your portfolio content. Changes appear on the public site without a hard refresh.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="card p-5">
          <div style={{ fontSize: 12, color: 'var(--text-subtle)' }} className="mb-1 uppercase tracking-wide font-semibold">
            Case Studies
          </div>
          <div className="font-display font-bold" style={{ fontSize: 28, color: 'var(--text)' }}>
            {stats.caseStudyCount}
          </div>
        </div>
        <div className="card p-5">
          <div style={{ fontSize: 12, color: 'var(--text-subtle)' }} className="mb-1 uppercase tracking-wide font-semibold">
            Messages
          </div>
          <div className="font-display font-bold" style={{ fontSize: 28, color: 'var(--text)' }}>
            {stats.messageCount}
          </div>
        </div>
        <div className="card p-5">
          <div style={{ fontSize: 12, color: 'var(--text-subtle)' }} className="mb-1 uppercase tracking-wide font-semibold">
            Bio Status
          </div>
          <div className="font-display font-semibold" style={{ fontSize: 15, color: 'var(--text)' }}>
            {stats.bioUpdatedAt ? 'Up to date' : 'Needs review'}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ href, title, description, icon: Icon, stat }) => (
          <Link key={href} href={href} className="card p-6 no-underline group hover:border-[var(--border-strong)] transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--primary)' }}
              >
                <Icon size={18} />
              </div>
              <ArrowRight size={16} style={{ color: 'var(--text-subtle)' }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-display font-semibold mb-1" style={{ fontSize: 16, color: 'var(--text)' }}>
              {title}
            </h2>
            <p className="mb-3" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {description}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{stat}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
