import { ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'
import SectionHeading, { Accent, SectionLabel } from '../components/SectionHeading'
import { SITE } from '../data/site'

// Drafted from Tooba's LinkedIn — edit freely
const STORY =
  "I started with a WordPress internship in 2022 and have since built and optimized websites for local businesses, agencies and e-commerce brands, including 100+ projects on Fiverr. Today I combine clean WordPress development with on-page and technical SEO, so your website doesn't just look good, it gets found."

const HIGHLIGHTS = [
  'SEO Specialist at AnalyticXpert',
  'WordPress Developer at Digital Dubai Experts',
  'BS Information Technology, Ghazi University',
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-20">
        <FadeIn delay={0.1} y={30} className="relative">
          <div className="relative overflow-hidden bg-[#F7F7F7]" style={{ aspectRatio: '4 / 4.8' }}>
            {/* Faint grid, like the hero pill */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            <img
              src="/tooba-about.webp"
              alt={`${SITE.name}, WordPress developer`}
              loading="lazy"
              className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-[96%] -translate-x-1/2 object-contain object-bottom"
            />
            <span className="absolute bottom-0 left-0 bg-[#111] px-5 py-3 font-signature text-[2.4rem] leading-none text-white">
              {SITE.name}
            </span>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-8">
          <SectionHeading
            label="about me"
            bold="About"
            regular={
              <>
                M<Accent>e</Accent>
              </>
            }
          />
          <AnimatedText
            text={STORY}
            className="font-exo font-normal leading-[1.5] text-[#111]"
            style={{ fontSize: 'clamp(1.15rem, 1.75vw, 1.65rem)' }}
          />
          <FadeIn delay={0.15} y={20} className="flex flex-col gap-3">
            <SectionLabel>experience</SectionLabel>
            <ul className="flex flex-col">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-[#EAEAEA] py-3 font-inter text-[15px] text-[#333]">
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#FF6A00]" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.2} y={20} className="flex flex-wrap gap-3">
            <ContactButton />
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-[#111] px-6 py-3 font-exo text-[14px] font-medium text-[#111] transition-colors duration-200 hover:bg-[#111] hover:text-white sm:px-7 sm:py-3.5 sm:text-[15px]"
            >
              View My Work
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
