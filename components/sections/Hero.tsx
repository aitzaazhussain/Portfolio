'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, Mail } from 'lucide-react'
import { STATS, SOCIALS, CALENDLY_URL, SITE } from '@/lib/data'
import { IconLink } from '@/components/IconLink'
import { SOCIAL_ICON_MAP } from '@/lib/social-icons'

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

// Page-load animation: Badge → Heading → Description → Buttons → Photo,
// each staggered ~90ms, subtle fade + 14px rise. Runs once per page load
// (no re-trigger on scroll-back). Respects prefers-reduced-motion via
// useReducedMotion — variants collapse to an instant, no-motion reveal.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const v = reduceMotion ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : item

  // The floating idle animation lives on the OUTER wrapper (CSS `photo-float`
  // class). Parallax + hover-scale are managed together via JS on the INNER
  // card so the two never fight over the same element's `transform`.
  const cardRef = useRef<HTMLDivElement>(null)
  const hovered = useRef(false)

  function applyTransform(x: number, y: number) {
    if (!cardRef.current) return
    const scale = hovered.current ? 1.02 : 1
    cardRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }

  // Gentle desktop-only mouse parallax on the photo — a few px max, no-op
  // under reduced-motion or on touch (no reliable hover/mousemove there).
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return
    if (window.matchMedia('(hover: none)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 6
    const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 6
    applyTransform(x, y)
  }
  function handleMouseEnter() {
    hovered.current = true
    applyTransform(0, 0)
  }
  function handleMouseLeave() {
    hovered.current = false
    applyTransform(0, 0)
  }

  return (
    <section id="home" className="relative flex items-center overflow-hidden pt-24" style={{ minHeight: '100dvh' }}>
      <div className="orb" style={{ width: 600, height: 600, background: 'var(--primary-glow)', top: -100, left: -100, opacity: 0.6 }} />
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--secondary-glow)', bottom: -50, right: -50, opacity: 0.5 }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-6 w-full py-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mobile: photo first. Desktop: photo moves to the right column via lg:order-2. */}
          <motion.div variants={v} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative photo-float" style={{ width: 'min(78vw, 320px)' }}>
              <div className="photo-glow" aria-hidden="true" />
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-[2rem] overflow-hidden"
                style={{
                  aspectRatio: '3 / 4',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
                  border: '1px solid var(--border-strong)',
                  transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
                }}
              >
                <Image
                  src="/photo.jpg"
                  alt="Aitzaaz Hussain, Full Stack Developer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 78vw, 320px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </motion.div>

          <div className="order-2 lg:order-1">
            <motion.div variants={v} className="flex items-center gap-2 mb-6">
              <span className="section-label">Available for Projects</span>
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--success)' }} />
            </motion.div>

            <motion.h1
              variants={v}
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}
            >
              Building Modern Websites, Shopify Stores &{' '}
              <span className="gradient-text">AI-Powered Solutions</span> That Help Businesses Grow
            </motion.h1>

            <motion.p variants={v} className="mb-8 leading-relaxed" style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 540 }}>
              I help startups, businesses, and entrepreneurs create modern digital experiences that increase
              conversions, improve efficiency, and solve real business challenges.
            </motion.p>

            <motion.div variants={v} className="flex flex-wrap gap-3 mb-6">
              <button onClick={() => scrollTo('#case-studies')} className="btn-primary px-6 py-3.5 text-[15px]">
                View Case Studies <ArrowRight size={16} />
              </button>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a free consultation on Calendly (opens in a new tab)"
                className="btn-outline px-6 py-3.5 text-[15px] no-underline"
              >
                <Calendar size={16} /> Book a Free Consultation
              </a>
            </motion.div>

            {/* Small professional-platform icons — same destinations as Contact/Footer. */}
            <motion.div variants={v} className="flex items-center gap-2 mb-8">
              {SOCIALS.filter((s) => s.href && s.label !== 'Instagram').map((s) => {
                const Icon = SOCIAL_ICON_MAP[s.label]
                return (
                  <IconLink key={s.label} href={s.href} label={`${s.label} — Aitzaaz Hussain`} size={34}>
                    <Icon size={15} />
                  </IconLink>
                )
              })}
              <IconLink href={`mailto:${SITE.email}`} label="Email Aitzaaz Hussain" isExternal={false} size={34}>
                <Mail size={15} />
              </IconLink>
            </motion.div>

            <motion.div variants={v} className="grid grid-cols-3 gap-4" style={{ maxWidth: 420 }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold gradient-text" style={{ fontSize: 24, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
