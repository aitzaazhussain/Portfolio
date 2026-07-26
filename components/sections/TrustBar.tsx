import { Check } from 'lucide-react'
import { TRUST_ITEMS } from '@/lib/data'

export function TrustBar() {
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <Check size={14} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
