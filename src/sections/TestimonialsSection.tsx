import { Quote, Star } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import SectionHeading, { Accent, ORANGE } from '../components/SectionHeading'

// Sample reviews — replace with real client feedback
const TESTIMONIALS = [
  {
    quote:
      'Jack turned a rough product sketch into renders that looked better than the real thing. Our launch campaign got twice the engagement we expected.',
    name: 'Sarah Mitchell',
    role: 'Marketing Lead, Nextlevel Studio',
  },
  {
    quote:
      'Fast, communicative and incredibly detailed. The motion pieces gave our brand an energy we could never get from stock visuals.',
    name: 'Daniel Okafor',
    role: 'Founder, Solaris Digital',
  },
  {
    quote:
      'From the first call to final delivery the whole process felt effortless. Every revision came back sharper than we imagined.',
    name: 'Lena Fischer',
    role: 'Creative Director, Aura',
  },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <SectionHeading
        label="testimonial"
        bold="Client"
        regular={
          <>
            Re<Accent>v</Accent>iews
          </>
        }
        align="center"
        className="mb-12 lg:mb-16"
      />

      <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
        {TESTIMONIALS.map((item, i) => (
          <FadeIn
            key={item.name}
            delay={i * 0.1}
            className="flex flex-col bg-[#F7F7F7] p-7 transition-colors duration-300 hover:bg-[#F1F1F1] sm:p-9"
          >
            <div className="flex items-center justify-between">
              <Quote size={34} strokeWidth={1.5} style={{ color: ORANGE }} />
              <div className="flex gap-1" style={{ color: ORANGE }}>
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </div>
            <p className="mt-6 flex-1 font-inter leading-[1.8] text-[#333]" style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)' }}>
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-[#E2E2E2] pt-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#111] font-exo text-sm font-semibold text-white">
                {initials(item.name)}
              </span>
              <div>
                <p className="font-exo text-[17px] font-semibold text-[#111]">{item.name}</p>
                <p className="font-inter text-[13px] text-[#888]">{item.role}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
