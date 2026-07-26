import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Fiverr/Upwork have no lucide icon — official-shape SVGs instead.
export function FiverrIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
      <path d="M22.328 8.784h-3.61v-.363c0-.87.462-1.155 1.088-1.155h1.111V4.16h-.968c-2.135 0-3.61.968-3.61 3.334v1.29H8.972V4.472c0-1.155-.34-1.717-1.155-1.717-.4 0-.87.11-1.156.22V0c.517-.11 1.328-.22 2.002-.22 1.717 0 3.146 1.155 3.146 3.334v5.67h3.61V.55h3.234v8.234h2.246v2.85h-2.246v10.386h-3.234V11.634H10.81v10.386H7.576V11.634h-1.79v-2.85h1.79V7.806C7.576 4.472 9.578 2.755 12.372 2.755c.517 0 1.328.11 1.717.22" />
    </svg>
  )
}
export function UpworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06a2.836 2.836 0 0 1 0 5.405Zm0-7.916c-2.44 0-4.34 1.577-5.121 4.19-1.166-1.75-2.056-3.85-2.578-5.62H8.409v6.44c-.002 1.278-1.043 2.315-2.322 2.315-1.278 0-2.319-1.037-2.322-2.315V3.812H1.313v6.44c0 2.807 2.28 5.107 5.087 5.107 2.807 0 5.087-2.3 5.087-5.107v-1.08c.51 1.06 1.13 2.135 1.883 3.09l-1.598 7.517h2.554l1.16-5.464c1.048.685 2.26 1.13 3.633 1.13a5.36 5.36 0 0 0 5.359-5.36 5.36 5.36 0 0 0-5.36-5.36" />
    </svg>
  )
}

export type SocialIconComponent = (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element

export const SOCIAL_ICON_MAP: Record<string, SocialIconComponent | LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Fiverr: FiverrIcon,
  Upwork: UpworkIcon,
  Email: Mail,
}
