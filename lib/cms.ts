import { createClient } from '@/lib/supabase/server'
import { CASE_STUDIES, SITE, type CaseStudy } from '@/lib/data'
import type { CaseStudyRow } from '@/lib/data'

export type SiteSettingsContent = {
  tagline: string
  about_paragraph_1: string
  about_paragraph_2: string
  about_paragraph_3: string
}

const STATIC_BIO: SiteSettingsContent = {
  tagline: SITE.tagline,
  about_paragraph_1:
    "I'm Aitzaaz Hussain — a full-stack developer, Shopify specialist, and AI solutions engineer who builds for outcomes, not just features.",
  about_paragraph_2:
    "I've built complete, production websites for real local businesses — including Al Madina Fast Food in Abbottabad, Al Baik Savour & BBQ, and Taj Mahal Banquet & Shadi Hall — handling everything from planning through launch and ongoing support.",
  about_paragraph_3:
    'Every project starts the same way: understand your business model and what success looks like, then let that shape the architecture, the UX, and every integration decision that follows. Full-stack, Shopify, and AI — all under one accountable, communicative partner.',
}

function rowToCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    tags: row.tags ?? [],
    problem: row.problem,
    research: row.solution || '',
    planning: '',
    design: '',
    development: row.result || '',
    technologies: row.tags ?? [],
    features: [],
    challenges: '',
    solutions: row.solution || '',
    img: row.img || '/case-studies/placeholder.jpg',
    liveUrl: row.live_url || undefined,
    githubUrl: row.github_url || undefined,
    featured: row.featured,
  }
}

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('tagline, about_paragraph_1, about_paragraph_2, about_paragraph_3')
      .eq('id', 'main')
      .single()

    if (error || !data?.about_paragraph_1) {
      return STATIC_BIO
    }

    return {
      tagline: data.tagline || STATIC_BIO.tagline,
      about_paragraph_1: data.about_paragraph_1,
      about_paragraph_2: data.about_paragraph_2 || '',
      about_paragraph_3: data.about_paragraph_3 || '',
    }
  } catch {
    return STATIC_BIO
  }
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .returns<CaseStudyRow[]>()

    if (error || !data?.length) {
      return CASE_STUDIES
    }

    return data.map(rowToCaseStudy)
  } catch {
    return CASE_STUDIES
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single<CaseStudyRow>()

    if (error || !data) {
      return CASE_STUDIES.find((c) => c.slug === slug) ?? null
    }

    return rowToCaseStudy(data)
  } catch {
    return CASE_STUDIES.find((c) => c.slug === slug) ?? null
  }
}

export async function getAllPublishedCaseStudySlugs(): Promise<string[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('slug')
      .eq('published', true)

    if (error || !data?.length) {
      return CASE_STUDIES.map((c) => c.slug)
    }

    return data.map((row) => row.slug)
  } catch {
    return CASE_STUDIES.map((c) => c.slug)
  }
}

export type MessageRow = {
  id: string
  created_at: string
  name: string
  email: string
  budget: string | null
  project_type: string | null
  message: string
}

export async function getMessages(): Promise<MessageRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('messages fetch error:', error.message)
    return []
  }

  return data ?? []
}

export async function getAdminStats() {
  const supabase = createClient()

  const [caseStudies, messages, settings] = await Promise.all([
    supabase.from('case_studies').select('id', { count: 'exact', head: true }),
    supabase.from('messages').select('id', { count: 'exact', head: true }),
    supabase.from('site_settings').select('updated_at').eq('id', 'main').single(),
  ])

  return {
    caseStudyCount: caseStudies.count ?? 0,
    messageCount: messages.count ?? 0,
    bioUpdatedAt: settings.data?.updated_at ?? null,
  }
}
