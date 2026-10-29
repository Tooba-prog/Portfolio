import { Quote, Star } from 'lucide-react'
import FadeIn from '../components/FadeIn'

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
    <section
      id="testimonials"
      className="relative z-30 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Reviews
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item, i) => (
          <FadeIn
            key={item.name}
            delay={i * 0.1}
            className="flex flex-col rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-8 sm:rounded-[50px] sm:p-10"
          >
            <Quote size={36} className="text-[#B600A8]" />
            <div className="mt-6 flex gap-1 text-[#BE4C00]">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star key={star} size={16} fill="currentColor" />
              ))}
            </div>
            <p
              className="mt-5 flex-1 font-light leading-relaxed text-[#D7E2EA]"
              style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)' }}
            >
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
                style={{ background: 'linear-gradient(123deg, #B600A8 0%, #7621B0 60%, #BE4C00 100%)' }}
              >
                {initials(item.name)}
              </span>
              <div>
                <p className="font-medium uppercase tracking-wider text-[#D7E2EA]">{item.name}</p>
                <p className="text-sm font-light text-[#D7E2EA]/50">{item.role}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
