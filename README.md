# Aitzaaz Hussain — Portfolio 

Rebuilt per the Master Build Prompt v2 spec: Next.js 14 App Router, Supabase-backed
contact form, SEO-complete, rounded/blurred scroll-spy nav, marquee tech strip,
consolidated footer socials.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your real Supabase project URL + anon key
npm run dev
```

## Supabase setup

1. Create a project at supabase.com.
2. Run the SQL files in `supabase/migrations/` in order (SQL editor or CLI:
   `supabase db push`). Each one enables Row Level Security and adds the
   correct policy — `messages` is insert-only for the public `anon` role;
   `case_studies`, `experience`, `blog_posts`, `certifications` are public-read.
3. Copy your project URL and anon key into `.env.local`. Never use the
   service-role key here — the anon key + RLS is the intended security model.

## What's real vs. placeholder right now

- **Logo**: `public/monogram-only.png` is a transparent PNG derived from the
  two JPEG photos you supplied — it's a good stopgap but is still a raster
  export. For true crispness at every size, re-export `logo-dark-full.svg`,
  `logo-light-full.svg`, and `monogram-only.svg` from Figma and drop them in
  `public/`, then point `components/LogoMark.tsx` at them. The originals you
  uploaded are kept at `public/logo-source-*.jpeg` for reference.
- **Case study / blog images**: `public/case-studies/*.jpg` and
  `public/blog/*.jpg` are original placeholder graphics (not stock photos) —
  swap them for real project screenshots before launch (audit bug #3).
- **Content**: services, case studies, testimonials, experience, certs, and
  blog posts live in `lib/data.ts`. Migrations exist for `case_studies`,
  `experience`, `blog_posts`, and `certifications` so you can move this data
  into Supabase and fetch it server-side whenever you're ready — the shapes
  already match.
- **Calendly / socials / verify links**: URLs in `lib/data.ts` and
  `NEXT_PUBLIC_CALENDLY_URL` are placeholders — replace with your real profile
  links before launch (audit bug #10: no `href="#"` in production).

## Structure

See the module comments in `lib/data.ts`, `lib/supabase/`, and
`app/api/contact/route.ts` for the reasoning behind the security and data
choices (RLS-only, honeypot + time-trap spam checks, server-side zod
validation).
