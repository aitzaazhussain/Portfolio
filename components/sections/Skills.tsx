import { SKILLS } from '@/lib/data'

// Pill badges only — explicitly no progress-bar "skill percentage" meters,
// per the brief's banned-patterns list.
export function Skills() {
  return (
    <section id="skills" className="py-16 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto text-center">
        <div className="section-label mb-6">Tools & Workflow</div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
