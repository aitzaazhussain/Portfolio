import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { WhyChooseMe } from '@/components/sections/WhyChooseMe'
import { About } from '@/components/sections/About'
import { MoreThanDevelopment } from '@/components/sections/MoreThanDevelopment'
import { Services } from '@/components/sections/Services'
import { Skills } from '@/components/sections/Skills'
import { TrustedTech } from '@/components/sections/TrustedTech'
import { Experience } from '@/components/sections/Experience'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { Testimonials } from '@/components/sections/Testimonials'
import { Certifications } from '@/components/sections/Certifications'
import { Blog } from '@/components/sections/Blog'
import { ProjectCTA } from '@/components/sections/ProjectCTA'
import { Contact } from '@/components/sections/Contact'
import { SHOW_CERTIFICATIONS } from '@/lib/data'

// Section order here MUST match NAV_LINKS in lib/data.ts exactly for the 9
// anchor sections (Home/About/Services/Skills/Experience/Case Studies/
// How We Work Together/Blog/Contact) — non-anchor filler sections (TrustBar,
// WhyChooseMe, MoreThanDevelopment, TrustedTech, Testimonials, Certifications,
// ProjectCTA) can sit between them freely.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyChooseMe />
      <About />
      <MoreThanDevelopment />
      <Services />
      <Skills />
      <TrustedTech />
      <Experience />
      <CaseStudies />
      <HowWeWork />
      <Testimonials />
      {SHOW_CERTIFICATIONS && <Certifications />}
      <Blog />
      <ProjectCTA />
      <Contact />
    </>
  )
}
