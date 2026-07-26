import { CaseStudyForm } from '../CaseStudyForm'
import { createCaseStudy } from '../actions'

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="font-display font-bold mb-6" style={{ fontSize: 24, color: 'var(--text)' }}>
        Add Project
      </h1>
      <CaseStudyForm
        action={createCaseStudy}
        submitLabel="Create Case Study"
        initial={{
          slug: '',
          title: '',
          category: '',
          tags: [],
          problem: '',
          solution: '',
          result: '',
          img: '',
          live_url: '',
          github_url: '',
          featured: false,
          published: true,
        }}
      />
    </div>
  )
}
