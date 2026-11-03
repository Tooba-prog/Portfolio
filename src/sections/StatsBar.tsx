import FadeIn from '../components/FadeIn'
import { Accent } from '../components/SectionHeading'

// From Tooba's LinkedIn and Fiverr record — update when the numbers change
const STATS = [
  { value: '3', suffix: '+', label: 'years of experience' },
  { value: '100', suffix: '+', label: 'projects delivered' },
  { value: '98', suffix: '%', label: 'client satisfaction' },
  { value: '5', suffix: '★', label: 'fiverr rating' },
]

export default function StatsBar() {
  return (
    <section aria-label="Highlights" className="bg-white px-4 pb-6 sm:px-8 lg:px-[5.6vw]">
      <div className="grid grid-cols-2 border-y border-[#E6E6E6] lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn
            key={stat.label}
            delay={i * 0.08}
            y={20}
            className={`flex flex-col items-center gap-2 px-4 py-8 text-center lg:py-10 ${
              i % 2 === 1 ? 'border-l border-[#E6E6E6]' : ''
            } ${i >= 2 ? 'border-t border-[#E6E6E6] lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
          >
            <span className="font-exo font-extrabold leading-none text-[#111]" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}>
              {stat.value}
              <Accent>{stat.suffix}</Accent>
            </span>
            <span className="font-inter text-[13px] lowercase text-[#666] lg:text-[14px]">{stat.label}</span>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
