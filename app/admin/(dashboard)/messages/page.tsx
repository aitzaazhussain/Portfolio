import { getMessages } from '@/lib/cms'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <div>
      <h1 className="font-display font-bold mb-2" style={{ fontSize: 24, color: 'var(--text)' }}>
        Messages
      </h1>
      <p className="mb-8" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
        Contact form submissions from your portfolio site.
      </p>

      <div className="space-y-4">
        {messages.map((m) => (
          <article key={m.id} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display font-semibold" style={{ fontSize: 16, color: 'var(--text)' }}>
                  {m.name}
                </h2>
                <a href={`mailto:${m.email}`} className="text-sm no-underline" style={{ color: 'var(--primary)' }}>
                  {m.email}
                </a>
              </div>
              <time style={{ fontSize: 12, color: 'var(--text-subtle)' }} dateTime={m.created_at}>
                {formatDate(m.created_at)}
              </time>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="px-3 py-2 rounded-lg" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)' }} className="uppercase tracking-wide font-semibold mb-1">
                  Project Type
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{m.project_type || '—'}</div>
              </div>
              <div className="px-3 py-2 rounded-lg" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)' }} className="uppercase tracking-wide font-semibold mb-1">
                  Budget
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{m.budget || '—'}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)' }} className="uppercase tracking-wide font-semibold mb-2">
                Message
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
                {m.message}
              </p>
            </div>
          </article>
        ))}

        {messages.length === 0 && (
          <div className="card p-8 text-center">
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
