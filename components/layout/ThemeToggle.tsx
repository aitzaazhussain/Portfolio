'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  // Server always renders assuming no theme is known yet (no `document`
  // there), but the blocking init script in layout.tsx may have already
  // flipped <html> to the visitor's real theme before React hydrates. If
  // this button picked its icon from `theme` immediately, the client's
  // first render could pick a different icon than the server did —
  // exactly the "Expected server HTML to contain a matching <path>"
  // hydration error. Rendering a neutral placeholder until *after* mount
  // guarantees the first client render matches the server, then swaps to
  // the correct icon a moment later — imperceptible, and standard practice
  // for any theme-dependent UI (this is what next-themes does internally).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all border"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
      aria-label="Toggle theme"
    >
      {mounted ? theme === 'dark' ? <Sun size={16} /> : <Moon size={16} /> : <span style={{ width: 16, height: 16 }} />}
    </button>
  )
}
