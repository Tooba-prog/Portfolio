import { Check } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'

type Plan = {
  name: string
  price: string
  note: string
  description: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$499',
    note: 'per project',
    description: 'A single polished 3D asset or render, perfect for a product launch or social post.',
    features: ['1 detailed 3D model', '2 high-res renders', 'Custom lighting & materials', '2 rounds of revisions', 'Delivery in 5 days'],
  },
  {
    name: 'Pro',
    price: '$1,499',
    note: 'per project',
    description: 'A complete visual package with motion — the best fit for brands and campaigns.',
    features: [
      'Up to 5 3D models',
      '10 high-res renders',
      '15s motion / animation clip',
      'Source files included',
      '4 rounds of revisions',
      'Priority delivery in 10 days',
    ],
    featured: true,
  },
  {
    name: 'Studio',
    price: 'Custom',
    note: 'tailored quote',
    description: 'Ongoing creative partnership for teams that need 3D, branding and web on demand.',
    features: ['Unlimited requests', 'Dedicated creative direction', 'Branding & web design', 'Weekly progress calls', 'Commercial usage rights'],
  },
]

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-20 -mt-10 rounded-t-[40px] bg-white px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="mb-6 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Pricing
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p
          className="mx-auto mb-16 max-w-xl text-center font-light leading-relaxed text-[#0C0C0C]/60 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
        >
          Simple, transparent packages. Not sure which fits? Get in touch and I&apos;ll put together a custom quote.
        </p>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3 lg:items-stretch">
        {PLANS.map((plan, i) => (
          <FadeIn
            key={plan.name}
            delay={i * 0.1}
            className={`relative flex flex-col rounded-[40px] p-8 sm:p-10 ${
              plan.featured ? 'bg-[#0C0C0C] text-[#D7E2EA] lg:-my-4' : 'border border-[#0C0C0C]/15 text-[#0C0C0C]'
            }`}
          >
            {plan.featured && (
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-5 py-1.5 text-xs font-medium uppercase tracking-widest text-white"
                style={{ background: 'linear-gradient(123deg, #B600A8 0%, #7621B0 60%, #BE4C00 100%)' }}
              >
                Most popular
              </span>
            )}

            <h3 className="font-medium uppercase tracking-wider" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
              {plan.name}
            </h3>
            <div className="mt-6 flex min-w-0 flex-col gap-2">
              <span
                className={`break-words font-black leading-none ${plan.featured ? 'hero-heading' : ''}`}
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)' }}
              >
                {plan.price}
              </span>
              <span className="text-sm font-light uppercase tracking-wider opacity-60">{plan.note}</span>
            </div>
            <p className="mt-5 font-light leading-relaxed opacity-60">{plan.description}</p>

            <ul className="mt-8 flex flex-1 flex-col gap-3.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 font-light">
                  <Check size={20} className={`mt-0.5 shrink-0 ${plan.featured ? 'text-[#B600A8]' : 'text-[#0C0C0C]'}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              {plan.featured ? (
                <ContactButton label="Get Started" className="w-full text-center" />
              ) : (
                <a
                  href="#contact"
                  className="block w-full rounded-full border-2 border-[#0C0C0C] px-8 py-3 text-center text-xs font-medium uppercase tracking-widest transition-colors duration-200 hover:bg-[#0C0C0C] hover:text-white sm:py-3.5 sm:text-sm md:py-4 md:text-base"
                >
                  {plan.price === 'Custom' ? 'Request a Quote' : 'Get Started'}
                </a>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
