// ─── Centralized content ────────────────────────────────────────────────────
// Edit copy here. Long term, move CASE_STUDIES / BLOG_POSTS / EXPERIENCE /
// CERTS / TESTIMONIALS to Supabase tables (see supabase/migrations) and fetch
// server-side instead of importing this static file.

export const SITE = {
  // Display name is always "Aitzaaz Hussain" — never render a handle anywhere.
  name: 'Aitzaaz Hussain',
  tagline: 'Full-stack developer, Shopify expert & AI solutions engineer',
  // Real inbox, already in active use — Aitzaaz confirmed this one is fine
  // to display publicly. Swap to a real hello@aitzaazhussain.com once that
  // business email is purchased and actually receiving mail — don't switch
  // to it just because it looks more polished; an unmonitored domain email
  // silently loses real leads, a checked Gmail inbox doesn't.
  email: 'helloaitzaazhussain@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aitzaazhussain.com',
}

// The real Calendly link. Note: the message this was supplied in contained a
// markdown link where the visible text and the actual href didn't match
// (text said ".../aitzaazhussain/30min", href said ".../aitzaazhussain/30min").
// The href is what a browser actually follows, so that's the one used here —
// flagged to Aitzaaz directly to double-check. This URL is meant to be
// public/clickable (that's the point of a Calendly link), unlike a personal
// inbox address, so no redaction needed here.
export const CALENDLY_URL = 'https://calendly.com/aitzaazhussain/30min'

// Exact usernames/display names confirmed by Aitzaaz. Upwork now has a
// real profile URL — equal footing with GitHub/LinkedIn/Fiverr everywhere
// professional platforms are shown; never hidden behind a menu.
export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/aitzaazhussain' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aitzaazhussain' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~017909d227afb10dfb' },
  { label: 'Fiverr', href: 'https://fiverr.com/aitzaazhussain' },
  { label: 'Instagram', href: 'https://instagram.com/aitzaazhussain' },
]

// Strict order — the nav MUST match the actual scroll order of these
// anchor sections exactly (non-anchor filler sections like TrustBar or
// Testimonials can sit between them, but these 9 must appear in this
// relative order down the page). See app/page.tsx for the section order.
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'How We Work Together', href: '#how-we-work' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

// Only claims that are true today. No invented project counts or
// satisfaction percentages — update as real numbers grow.
export const STATS = [
  { value: '3', label: 'Real Client Projects' },
  { value: '8+', label: 'Core Technologies' },
  { value: 'FS+AI', label: 'Full Stack · Shopify · AI' },
]

export const TRUST_ITEMS = [
  'Responsive Websites', 'Shopify Solutions', 'AI Integrations',
  'SEO Optimization', 'Fast Communication', 'Ongoing Support',
]

export const WHY_CARDS = [
  { icon: 'MessageCircle', title: 'Communication First', desc: "Clear, proactive updates at every stage. You'll never be left wondering what's happening with your project.", color: '#2563EB' },
  { icon: 'TrendingUp', title: 'Business Focused', desc: 'Every technical decision ties back to your goals: conversions, efficiency, or growth — not just clean code.', color: '#14B8A6' },
  { icon: 'Clock', title: 'Reliable Delivery', desc: 'Honest timelines, respected deadlines, and transparent scope management — no surprises after kick-off.', color: '#8B5CF6' },
  { icon: 'HeartHandshake', title: 'Long-Term Support', desc: "I don't disappear after launch. Post-launch support, iterations, and scaling are built into how I work.", color: '#F59E0B' },
] as const

// TODO: replace years with your real timeline once confirmed.
export const TIMELINE = [
  { year: '2022', title: 'Started the Journey', desc: 'Began building real projects — websites and small business systems — rather than tutorials.' },
  { year: '2023', title: 'Shopify Specialization', desc: 'Expanded into Shopify development and custom theme engineering.' },
  { year: '2024', title: 'Full Stack + AI', desc: 'Adopted Next.js, Supabase, and AI APIs to build more capable, data-driven products.' },
  { year: '2025+', title: 'Independent Practice', desc: 'Running freelance development as a professional practice — full builds for real local businesses, end to end.' },
]

export const SERVICES = [
  { icon: 'Code2', title: 'Full Stack Development', desc: 'Custom web applications built with React, Next.js, Node.js, and Supabase — scalable, performant, and production-ready.', benefits: ['React & Next.js', 'REST & GraphQL APIs', 'Database Design', 'Performance Optimization'], color: '#2563EB' },
  { icon: 'ShoppingBag', title: 'Shopify Development', desc: 'Custom Shopify stores, theme engineering, app integrations, and conversion optimization for e-commerce brands.', benefits: ['Custom Themes', 'App Integration', 'Checkout Optimization', 'Speed & SEO'], color: '#10B981' },
  { icon: 'Cpu', title: 'AI Integration', desc: 'Embed intelligent automation into your business — AI chatbots, content pipelines, and custom LLM-powered workflows.', benefits: ['OpenAI & LangChain', 'Custom Chatbots', 'Workflow Automation', 'Data Processing'], color: '#8B5CF6' },
  { icon: 'Layers', title: 'UI/UX Development', desc: 'Pixel-perfect interfaces designed for conversion — clean, intuitive, and built to match your brand identity.', benefits: ['Design Systems', 'Figma to Code', 'Accessibility', 'Responsive Design'], color: '#EC4899' },
  { icon: 'Search', title: 'SEO Optimization', desc: 'Technical SEO audits, Core Web Vitals optimization, and structured data implementation to rank and convert.', benefits: ['Technical SEO', 'Core Web Vitals', 'Schema Markup', 'Performance Tuning'], color: '#F59E0B' },
  { icon: 'Zap', title: 'API Integration', desc: 'Connect your stack — payment gateways, CRMs, marketing tools, and third-party APIs integrated seamlessly.', benefits: ['Payment Systems', 'CRM Integration', 'Webhook Automation', 'Data Sync'], color: '#14B8A6' },
] as const

export const SKILLS = ['Git', 'GitHub', 'Figma', 'VS Code', 'Postman', 'Technical SEO', 'Core Web Vitals', 'GTM']

export const TECHS = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'Shopify', color: '#96BF48' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'OpenAI', color: '#74AA9C' },
  { name: 'Node.js', color: '#8CC84B' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Google', color: '#4285F4' },
]

export const PROCESS_STEPS = [
  { n: '01', title: 'Discovery Call', desc: 'A 30-minute call to understand your business, goals, technical requirements, timeline, and budget — no hard sell.', icon: 'MessageCircle' },
  { n: '02', title: 'Strategy & Planning', desc: 'A detailed proposal: scope of work, architecture choices, milestones, and timeline — agreed before development starts.', icon: 'Layers' },
  { n: '03', title: 'Development', desc: 'Iterative development with regular previews. You see progress every week and give feedback before final delivery.', icon: 'Code2' },
  { n: '04', title: 'Testing & Launch', desc: 'Full QA across devices and browsers, performance testing, and a structured go-live process with zero downtime.', icon: 'Rocket' },
  { n: '05', title: 'Support & Growth', desc: 'Post-launch support, bug fixes, feature iterations, and strategic advice as your business grows and needs evolve.', icon: 'TrendingUp' },
] as const

// Real content only. This replaces a previous fabricated multi-employer
// history — only the confirmed, real work is listed. Add real prior roles
// here if any exist; don't leave invented company names in their place.
export const EXPERIENCE = [
  {
    company: 'Independent Freelance Practice',
    role: 'Full-Stack Developer, Shopify Expert & AI Solutions Engineer',
    period: '2024 — Present', // TODO: confirm real start date
    desc: 'Designing and building complete websites and digital systems for local businesses — from Al Madina Fast Food (Abbottabad) to Al Baik Savour & BBQ and Taj Mahal Banquet & Shadi Hall — handling everything from discovery through launch and support.',
    achievements: ['3 real client projects delivered', 'Full-stack, Shopify & AI capability', 'End-to-end client management'],
    color: '#2563EB',
  },
]

export type CaseStudy = {
  slug: string
  title: string
  category: string
  tags: string[]
  problem: string
  research: string
  planning: string
  design: string
  development: string
  technologies: string[]
  features: string[]
  challenges: string
  solutions: string
  businessImpact?: string
  clientTestimonial?: { quote: string; author: string }
  futureImprovements?: string
  img: string
  gallery?: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

// ── REAL CONTENT, NEEDS YOUR INPUT ──────────────────────────────────────────
// These are your 3 real projects. The structure below is fully built and
// wired up — but the field text is honest placeholder copy describing
// typical scope for this kind of business, not verified specifics, because
// I don't have the real details of what happened on each build. Replace
// every bracketed line with what actually happened before this goes live —
// especially businessImpact and clientTestimonial, which should only ever
// contain something real or be left out entirely (the components already
// handle both fields being absent).
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'al-madina-fast-food-abbottabad',
    title: 'Al Madina Fast Food — Abbottabad',
    category: 'Full Stack',
    tags: ['React', 'Full Stack'],
    problem: '[Add: what problem did Al Madina Fast Food have before this site/system — e.g. no online presence, no way for customers to see the menu or place orders?]',
    research: '[Add: what you learned about their customers, competitors, or ordering habits before building.]',
    planning: '[Add: the scope you agreed on and why — e.g. menu display, WhatsApp/phone ordering, branch info.]',
    design: '[Add: key UI/UX decisions specific to this client — menu layout, mobile-first ordering flow, etc.]',
    development: '[Add: what was actually built — pages, features, integrations.]',
    technologies: ['Next.js', 'Tailwind CSS'],
    features: ['[Add real feature]', '[Add real feature]'],
    challenges: '[Add: a real obstacle you hit on this build.]',
    solutions: '[Add: how you solved it.]',
    // businessImpact: only add this once you have a real, defensible number.
    // clientTestimonial: only add once the client has actually given one.
    img: '/case-studies/al-madina-fast-food.jpg', // TODO: replace with a real screenshot
    liveUrl: '', // TODO: add if live
    githubUrl: '', // TODO: add only if the repo is public
    featured: true,
  },
  {
    slug: 'al-baik-savour-bbq',
    title: 'Al Baik Savour & BBQ',
    category: 'Full Stack',
    tags: ['React', 'Full Stack'],
    problem: '[Add: what problem did Al Baik Savour & BBQ have before this build?]',
    research: '[Add: research/market context for this client.]',
    planning: '[Add: agreed scope and reasoning.]',
    design: '[Add: key design decisions for this client.]',
    development: '[Add: what was actually built.]',
    technologies: ['Next.js', 'Tailwind CSS'],
    features: ['[Add real feature]', '[Add real feature]'],
    challenges: '[Add: a real obstacle on this build.]',
    solutions: '[Add: how it was solved.]',
    img: '/case-studies/al-baik-savour-bbq.jpg', // TODO: replace with a real screenshot
    liveUrl: '',
    githubUrl: '',
    featured: true,
  },
  {
    slug: 'taj-mahal-banquet-shadi-hall',
    title: 'Taj Mahal Banquet & Shadi Hall',
    category: 'Full Stack',
    tags: ['React', 'Full Stack'],
    problem: '[Add: what problem did Taj Mahal Banquet & Shadi Hall have — e.g. no way for prospective clients to see the venue or check availability?]',
    research: '[Add: research/market context for this client.]',
    planning: '[Add: agreed scope — gallery, booking inquiry form, package details, etc.]',
    design: '[Add: key design decisions — gallery-led layout for a venue, for example.]',
    development: '[Add: what was actually built.]',
    technologies: ['Next.js', 'Tailwind CSS'],
    features: ['[Add real feature]', '[Add real feature]'],
    challenges: '[Add: a real obstacle on this build.]',
    solutions: '[Add: how it was solved.]',
    img: '/case-studies/taj-mahal-banquet.jpg', // TODO: replace with a real screenshot
    liveUrl: '',
    githubUrl: '',
    featured: false,
  },
]

export const CASE_STUDY_FILTERS = ['All', 'React', 'Shopify', 'AI', 'Full Stack', 'Marketing']

// No fake reviews. Populate via the admin panel / Supabase `reviews` table
// (supabase/migrations/006_reviews.sql) once real, approved reviews exist —
// the Testimonials component already renders an honest empty state when
// this array is empty.
export const TESTIMONIALS: {
  name: string
  role: string
  company: string
  quote: string
  stars: number
  avatar: string
  color: string
}[] = []

// Hidden until real certifications exist — see SHOW_CERTIFICATIONS below.
// The section won't render at all while this stays false, so re-enabling
// later (once CERTS has real entries) is a one-line change.
export const SHOW_CERTIFICATIONS = false
export const CERTS: { title: string; issuer: string; date: string; color: string; verifyUrl: string }[] = []

export type BlogPost = {
  slug: string
  title: string
  category: string
  readTime: string
  date: string
  img: string
  color: string
  excerpt: string
  body: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'shopify-store-losing-mobile-sales',
    title: 'Why Your Shopify Store Is Losing Mobile Sales (And How to Fix It)',
    category: 'Shopify',
    readTime: '5 min',
    date: '2025-06-12',
    img: '/blog/mobile-sales.jpg',
    color: '#10B981',
    excerpt: 'Mobile checkout friction is quietly costing DTC brands revenue. Here are the fixes that move the needle.',
    body: [
      'Most Shopify stores are designed on a desktop and tested on a desktop, even though the majority of traffic now arrives on a phone. That mismatch shows up first at checkout, where a slow-loading page or an awkward tap target is enough to lose a sale that was already won.',
      'The highest-leverage fixes are rarely dramatic: lazy-loading below-the-fold images, trimming third-party scripts that block rendering, and adding trust signals (reviews, guarantees, secure-checkout badges) right at the point of friction rather than buried in a footer.',
      'None of these fixes require a redesign — they require actually testing your own checkout on a mid-range phone over a normal mobile connection, which is the step most stores skip.',
    ],
  },
  {
    slug: 'ai-workflows-without-ml-background',
    title: 'Building AI-Powered Workflows Without a Machine Learning Background',
    category: 'AI',
    readTime: '7 min',
    date: '2025-05-08',
    img: '/blog/ai-workflows.jpg',
    color: '#8B5CF6',
    excerpt: 'You do not need to train models to ship useful AI features. A practical guide to API-first AI integration.',
    body: [
      "Most businesses don't need a custom-trained model — they need an existing model wired into a real workflow with the right context and guardrails. That's an engineering problem, not a machine-learning research problem.",
      'A practical pattern: define the exact input a business user already has (a support ticket, a spreadsheet row, a customer message), decide what output actually saves them time, and build the smallest possible pipeline — API call, validation, human review where it matters — that connects the two.',
      'Start with the smallest workflow that removes one real chore, ship it, and only then decide whether it is worth expanding — most AI feature requests turn out to be smaller than they first sound.',
    ],
  },
  {
    slug: 'discovery-call-checklist',
    title: 'The Discovery Call Checklist: What to Ask Before Hiring a Developer',
    category: 'Business',
    readTime: '4 min',
    date: '2025-04-02',
    img: '/blog/discovery-call.jpg',
    color: '#2563EB',
    excerpt: 'The questions that separate a good client-developer fit from a project that goes sideways.',
    body: [
      "A discovery call is the cheapest place to catch a bad fit — before either side has spent time or money. The goal isn't to sell or to be sold; it's to get honest answers to a handful of specific questions.",
      'Ask how they scope work (fixed price vs. milestones), how they handle changes mid-project, and what a typical week of communication looks like. Ask for a recent example where something went wrong and how it was handled — the answer matters more than the project itself.',
      "If a developer can't give a straight answer about timeline, budget assumptions, or what happens after launch, that's the signal to keep looking, not the fee.",
    ],
  },
]

export const BUDGETS = ['< $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000+', "Let's discuss"]
export const PROJECT_TYPES = ['Website / Landing Page', 'Shopify Store', 'Full Stack App', 'AI Integration', 'SEO / Optimization', 'Other']

// Quick-action buttons for the Contact section. `href: ''` (Upwork) means
// "not linkable yet" — the button still renders, visibly, in a disabled
// state; it must never just disappear (see Contact.tsx).
export const QUICK_CONTACT_ACTIONS = [
  { label: 'Email Me', icon: 'Mail', href: `mailto:${SITE.email}`, external: false },
  { label: 'Book a Meeting', icon: 'Calendar', href: CALENDLY_URL, external: true },
  { label: 'Hire Me on Upwork', icon: 'Upwork', href: SOCIALS.find((s) => s.label === 'Upwork')?.href || '', external: true },
  { label: 'Hire Me on Fiverr', icon: 'Fiverr', href: SOCIALS.find((s) => s.label === 'Fiverr')?.href || '', external: true },
  { label: 'View GitHub', icon: 'Github', href: SOCIALS.find((s) => s.label === 'GitHub')?.href || '', external: true },
  { label: 'Connect on LinkedIn', icon: 'Linkedin', href: SOCIALS.find((s) => s.label === 'LinkedIn')?.href || '', external: true },
] as const
