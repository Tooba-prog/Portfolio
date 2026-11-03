import { ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import SectionHeading, { Accent, SectionLabel } from '../components/SectionHeading'
import { FREE_AUDIT, selectService } from '../data/site'

// From Tooba's LinkedIn plus standard tools for WordPress + SEO work — remove any she doesn't use
const GROUPS = [
  {
    title: 'wordpress & development',
    tools: [
      'WordPress',
      'Elementor',
      'WooCommerce',
      'Gutenberg',
      'ACF',
      'Custom Post Types',
      'Custom Theme Design',
      'Theme Customization',
      'Plugin Customization',
      'Figma to WordPress',
      'Responsive Design',
      'Website Migration',
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
    ],
  },
  {
    title: 'seo & keyword research',
    tools: ['Semrush', 'Ahrefs', 'Rank Math', 'Yoast SEO', 'Screaming Frog', 'Keyword Planner'],
  },
  {
    title: 'analytics & tracking',
    tools: ['Google Search Console', 'Google Analytics 4', 'Google Tag Manager'],
  },
  {
    title: 'speed & performance',
    tools: ['PageSpeed Insights', 'GTmetrix', 'WP Rocket', 'LiteSpeed Cache', 'Cloudflare'],
  },
  {
    title: 'design & workflow',
    tools: ['Figma', 'Canva', 'Git', 'cPanel', 'FileZilla'],
  },
]

const TOOL_COUNT = GROUPS.reduce((sum, group) => sum + group.tools.length, 0)

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <div className="grid gap-12 bg-[#F7F7F7] px-5 py-14 sm:px-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-16 lg:px-14 lg:py-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            label="skills & tools"
            bold="My"
            regular={
              <>
                To<Accent>o</Accent>lkit
              </>
            }
          />
          <FadeIn delay={0.15} y={20}>
            <p className="max-w-sm font-inter text-[15px] leading-[1.75] text-[#666]">
              The tools I use every day to build fast WordPress websites, fix technical SEO and grow rankings on Google.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} y={20} className="grid grid-cols-2 gap-3">
            <div className="bg-white p-5">
              <p className="font-exo text-[40px] font-extrabold leading-none text-[#111]">
                {TOOL_COUNT}
                <Accent>+</Accent>
              </p>
              <p className="mt-2 font-inter text-[13px] lowercase text-[#666]">tools &amp; skills</p>
            </div>
            <div className="bg-white p-5">
              <p className="font-exo text-[40px] font-extrabold leading-none text-[#111]">
                {GROUPS.length}
              </p>
              <p className="mt-2 font-inter text-[13px] lowercase text-[#666]">areas of expertise</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25} y={20} className="flex flex-col gap-5 bg-[#111] p-6 text-white lg:p-7">
            <p className="font-exo text-[20px] font-semibold leading-snug lg:text-[22px]">
              Want to see these tools at work on your website?
            </p>
            <a
              href="#contact"
              onClick={() => selectService(FREE_AUDIT)}
              className="group inline-flex items-center gap-2 self-start bg-white px-5 py-3 font-exo text-[14px] font-medium text-[#FF6A00] transition-colors hover:bg-[#FF6A00] hover:text-white"
            >
              Get Free SEO Audit
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </FadeIn>
        </div>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          {GROUPS.map((group, g) => (
            <FadeIn
              key={group.title}
              delay={0.1 + g * 0.08}
              y={20}
              className={`flex flex-col gap-4 ${g === 0 ? 'md:col-span-2' : ''}`}
            >
              <SectionLabel>{group.title}</SectionLabel>
              <div className="flex flex-wrap gap-2.5">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-[#E2E2E2] bg-white px-4 py-2.5 font-exo text-[14px] font-medium text-[#111] transition-colors duration-200 hover:border-[#FF6A00] hover:text-[#FF6A00] lg:text-[15px]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
