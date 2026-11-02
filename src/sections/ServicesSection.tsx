import FadeIn from '../components/FadeIn'

const SERVICES = [
  {
    name: 'WordPress Development',
    description:
      'Custom WordPress websites with theme setup, layout building, and plugin customization — modern, responsive, and easy to manage without technical skills.',
  },
  {
    name: 'WooCommerce Stores',
    description:
      'WooCommerce store development, from product pages and checkout customization to payment gateway configuration.',
  },
  {
    name: 'Speed Optimization',
    description:
      'Website redesign and speed optimization so your site loads fast and works seamlessly across all devices.',
  },
  {
    name: 'On-Page & Technical SEO',
    description:
      'Keyword research, meta titles and descriptions, content optimization, and fixing indexing and crawling issues so Google can find you.',
  },
  {
    name: 'Maintenance & Support',
    description:
      'Bug fixing, security improvements, updates, backups, and monthly maintenance, plus website migration and domain transfer.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.name}
            delay={i * 0.1}
            className="flex items-center gap-6 py-8 text-[#0C0C0C] sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{
              borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
            }}
          >
            <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed opacity-60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
