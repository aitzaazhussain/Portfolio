'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animates an element in the first time it enters the viewport, then stops
 * observing — it never re-triggers on scroll-up/scroll-down repeats. Pair
 * with the `.reveal` / `.reveal-in` classes in globals.css.
 *
 * Respects prefers-reduced-motion automatically via the CSS (`.reveal`
 * becomes fully visible with no transition under that media query), so no
 * extra branching is needed here.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
