import { ClipboardCheck, Code2, Rocket, Search } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import SectionHeading, { Accent } from '../components/SectionHeading'

// Drafted — edit to match how Tooba actually works
const STEPS = [
  {
    icon: Search,
    title: 'Discovery & Audit',
    description: 'We talk about your goals, and I audit your current website, speed and SEO to find what is holding it back.',
  },
  {
    icon: ClipboardCheck,
    title: 'Plan & Strategy',
    description: 'A clear plan: site structure, page layouts, target keywords and a timeline you can count on.',
  },
  {
    icon: Code2,
    title: 'Build & Optimize',
    description: 'I build or improve your WordPress site, then optimize speed, mobile layout and on-page SEO.',
  },
  {
    icon: Rocket,
    title: 'Launch & Grow',
    description: 'Launch with Search Console set up, rankings tracked, and ongoing support so the results keep growing.',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <SectionHeading
        label="how i work"
        bold="My"
        regular={
          <>
            Pr<Accent>o</Accent>cess
          </>
        }
        align="center"
        className="mb-12 lg:mb-16"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {STEPS.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.1} className="group relative flex flex-col bg-[#F7F7F7] p-7 lg:p-8">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center bg-white transition-colors duration-300 group-hover:bg-[#FF6A00]">
                {/* Colour via classes (not inline style) so the hover can turn it white on the orange square */}
                <step.icon className="h-5 w-5 text-[#FF6A00] transition-colors duration-300 group-hover:text-white" strokeWidth={1.75} />
              </span>
              <span className="font-exo text-[44px] font-light leading-none text-[#D5D5D5]">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-8 font-exo text-[21px] font-semibold text-[#111] lg:text-[22px]">{step.title}</h3>
            <p className="mt-3 font-inter text-[14px] leading-[1.75] text-[#666] lg:text-[15px]">{step.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
