'use client'

export function IconLink({
  href,
  label,
  isExternal = true,
  size = 36,
  children,
}: {
  href: string
  label: string
  isExternal?: boolean
  size?: number
  children: React.ReactNode
}) {
  return (
    <span className="relative inline-flex group/tooltip">
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
        aria-label={label}
        className="rounded-lg flex items-center justify-center border transition-all hover:-translate-y-0.5 hover:scale-[1.05]"
        style={{
          width: size,
          height: size,
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        {children}
      </a>
      {/* Lightweight CSS-only tooltip — no extra JS, respects reduced-motion via the global override on `transition`. */}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 scale-95 transition-all duration-150 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100"
        style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
      >
        {label}
      </span>
    </span>
  )
}
