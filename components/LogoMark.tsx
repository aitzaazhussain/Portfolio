'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/data'

/**
 * Theme-aware logo mark. No pixel-offset cropping — the source image is a
 * transparent PNG monogram (derived from the client's supplied photos; swap
 * for a true vector export from Figma — logo-dark-full.svg / logo-light-full.svg
 * — the moment it's available, and this component's `src` is the only line
 * that needs to change).
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/monogram-only.png"
      alt=""
      width={size}
      height={size}
      priority
      aria-hidden
      style={{ height: size, width: 'auto', flexShrink: 0 }}
    />
  )
}

export function Logo({ size = 38, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label={`${SITE.name} — home`}>
      <LogoMark size={size} />
      {withText && (
        <span
          className="font-display font-semibold"
          style={{ fontSize: size * 0.43, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
        >
          {SITE.name}
        </span>
      )}
    </Link>
  )
}
