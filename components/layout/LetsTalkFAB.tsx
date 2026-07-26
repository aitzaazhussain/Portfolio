'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Calendar } from 'lucide-react'
import { CALENDLY_URL } from '@/lib/data'

// Persistent booking shortcut. Appears only after the hero has scrolled past
// so it doesn't compete with the hero CTAs. Deliberately no bounce/pulse —
// restraint reads as seniority, per brief. Links straight to Calendly per
// the "Floating CTA (Desktop & Mobile) → Book a Call" requirement.
export function LetsTalkFAB() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname.startsWith('/admin')) return null
  if (!visible) return null

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a free consultation on Calendly (opens in a new tab)"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg no-underline"
      style={{
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        color: '#fff',
        boxShadow: '0 8px 24px var(--primary-glow)',
      }}
    >
      <Calendar size={16} />
      Book a Call
    </a>
  )
}
