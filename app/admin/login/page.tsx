'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const inputStyle: React.CSSProperties = {
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  color: 'var(--text)',
  padding: '12px 14px',
  width: '100%',
  fontSize: 14,
  outline: 'none',
}
const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--text-muted)',
  display: 'block',
  marginBottom: 6,
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      // Deliberately vague — don't tell a guesser whether the email or the
      // password was the wrong part.
      setError('Invalid email or password.')
      return
    }

    // router.refresh() re-runs the middleware + any server components on
    // the current tree with the new session cookie, then router.push
    // navigates to the dashboard. Without refresh() first, the very next
    // page load can briefly still look logged-out.
    router.refresh()
    router.push('/admin')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'var(--bg)' }}
    >
      <form onSubmit={handleSubmit} className="card gradient-border p-8 w-full" style={{ maxWidth: 380 }}>
        <h1 className="font-display font-bold mb-1" style={{ fontSize: 22, color: 'var(--text)' }}>
          Admin Login
        </h1>
        <p className="mb-6" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Sign in to edit your site content.
        </p>

        <div className="mb-4">
          <label style={labelStyle} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            autoComplete="email"
          />
        </div>

        <div className="mb-6">
          <label style={labelStyle} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="mb-4" style={{ fontSize: 13, color: '#F87171' }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center px-5 py-3 text-sm">
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
