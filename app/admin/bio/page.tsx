import { createClient } from '@/lib/supabase/server'
import { BioForm } from './BioForm'

export default async function AdminBioPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('tagline, about_paragraph_1, about_paragraph_2, about_paragraph_3')
    .eq('id', 'main')
    .single()

  return (
    <div>
      <h1 className="font-display font-bold mb-6" style={{ fontSize: 24, color: 'var(--text)' }}>
        Edit Bio
      </h1>
      <BioForm
        initial={{
          tagline: data?.tagline || '',
          about_paragraph_1: data?.about_paragraph_1 || '',
          about_paragraph_2: data?.about_paragraph_2 || '',
          about_paragraph_3: data?.about_paragraph_3 || '',
        }}
      />
    </div>
  )
}
