import { ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import SectionHeading, { Accent } from '../components/SectionHeading'
import { selectService } from '../data/site'

const SERVICES = [
  {
    name: 'WordPress Development',
    description:
      'Custom WordPress and WooCommerce websites built with Elementor — fast, responsive, and easy to manage without technical skills.',
  },
  {
    name: 'Website Redesign',
    description:
      'A modern refresh for an outdated site: cleaner layout, faster load times, and a structure that turns visitors into customers.',
  },
  {
    name: 'On-Page SEO',
    description:
      'Keyword research, meta titles and descriptions, headings, internal links, and content optimization for every important page.',
  },
  {
    name: 'Technical SEO',
    description:
      'Site audits, crawling and indexing fixes, speed and Core Web Vitals, and tracking in Google Search Console.',
  },
  {
    name: 'Off-Page SEO',
    description:
      'Building authority with quality backlinks, local listings, and brand mentions that help your site rank higher.',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <div className="bg-[#F7F7F7] px-5 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="services"
            bold="My"
            regular={
              <>
                Ser<Accent>v</Accent>ices
              </>
            }
          />
          <FadeIn delay={0.2} y={20}>
            <p className="max-w-sm font-inter text-[15px] leading-[1.75] text-[#666] lg:text-right">
              Everything your business needs to look modern, load fast and rank better on Google.
            </p>
          </FadeIn>
        </div>

        <div>
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.name}
              delay={i * 0.08}
              className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-t border-[#E2E2E2] py-7 last:border-b sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-x-10 lg:py-9"
            >
              <span
                className="font-exo font-light leading-none text-[#BBBBBB] transition-colors duration-300 group-hover:text-[#FF6A00]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-exo font-semibold text-[#111]" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.85rem)' }}>
                  {service.name}
                </h3>
                <p className="max-w-2xl font-inter text-[14px] leading-[1.75] text-[#666] lg:text-[15px]">{service.description}</p>
              </div>
              <a
                href="#contact"
                onClick={() => selectService(service.name)}
                aria-label={`Ask about ${service.name}`}
                className="col-start-2 flex h-11 w-11 items-center justify-center border border-[#111] text-[#111] transition-colors duration-200 hover:border-[#FF6A00] hover:bg-[#FF6A00] hover:text-white sm:col-start-auto lg:h-14 lg:w-14"
              >
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
