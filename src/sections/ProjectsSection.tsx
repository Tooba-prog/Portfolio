import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Expand, X } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import SectionHeading, { Accent, SectionLabel } from '../components/SectionHeading'
import { SITE } from '../data/site'

type Score = { performance: number; seo: number }

type Project = {
  slug: string // screenshots live in /public/projects/<slug>-{desktop,desktop-second,mobile}.webp
  name: string
  url: string
  category: string
  description: string
  tech: string[]
  // Google PageSpeed Insights (desktop), measured on the live site
  score?: Score
}

// Screenshots and details taken from each live website
const PROJECTS: Project[] = [
  {
    slug: 'khaaliszaike',
    name: 'Khaalis Zaike',
    url: 'https://khaaliszaike.com/',
    category: 'e-commerce',
    description:
      'An online store for an organic desi food brand in Pakistan, selling pure ghee, panjeeri, jaggery and more with a full WooCommerce shop and product variations.',
    tech: ['WordPress', 'Elementor', 'WooCommerce', 'Rank Math'],
  },
  {
    slug: 'gulfgrowthstudio',
    name: 'Gulf Growth Studio',
    url: 'https://gulfgrowthstudio.com/',
    category: 'agency',
    description:
      'Website for a GCC digital marketing agency serving Qatar, the UAE, Saudi Arabia, Kuwait, Bahrain and Oman.',
    tech: ['WordPress', 'Elementor', 'Rank Math'],
  },
  {
    slug: 'carefirstlab',
    name: 'CareFirst Lab Test at Home',
    url: 'https://lab.carefirst.ae/',
    category: 'healthcare',
    description: 'Booking website for at-home lab tests across Dubai, with an instant booking form, services and FAQs.',
    tech: ['WordPress', 'Elementor', 'WooCommerce'],
  },
  {
    slug: 'pickuptruckrentalsajaa',
    name: 'Pickup Truck Rental Sajaa',
    url: 'https://pickuptruckrentalsajaa.com/',
    category: 'local business',
    description:
      'Lead-generation website for a truck rental company in Sajaa, Sharjah, with fleet pages for 1–10 ton trucks and click-to-call.',
    tech: ['WordPress', 'Elementor', 'Rank Math'],
  },
  {
    slug: 'fastpickuprentaldubai',
    name: 'Fast Pickup Rental Dubai',
    url: 'https://fastpickuprentaldubaicom.com/',
    category: 'local business',
    description: 'Moving and pickup truck rental website for Dubai with a quote form, service areas and local SEO pages.',
    tech: ['WordPress', 'Elementor', 'Rank Math'],
  },
]

// "View more on Behance" uses the Behance link from the social list; hidden if there isn't one
const BEHANCE = SITE.socials.find((social) => social.label === 'Behance')?.href

const shot = (slug: string, kind: 'desktop' | 'desktop-second' | 'mobile') => `/projects/${slug}-${kind}.webp`
const domain = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

// Desktop screenshot in a browser frame with the phone screenshot overlapping it
function Showcase({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[#F1F1F1] ${featured ? 'p-5 pb-10 sm:p-8 sm:pb-14' : 'p-4 pb-8 sm:p-6 sm:pb-10'}`}>
      <div className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(17,17,17,0.10)] transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-1.5 border-b border-[#ECECEC] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
          <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
          <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
          <span className="ml-2 truncate font-inter text-[11px] text-[#999]">{domain(project.url)}</span>
        </div>
        <img
          src={shot(project.slug, 'desktop')}
          alt={`${project.name} website on desktop`}
          loading="lazy"
          width={1280}
          height={800}
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>
      <div
        className={`absolute bottom-3 right-4 overflow-hidden rounded-[14px] border-[4px] border-[#111] bg-white shadow-[0_16px_36px_rgba(17,17,17,0.25)] transition-transform duration-500 group-hover:-translate-y-2 sm:bottom-5 sm:right-6 ${
          featured ? 'w-[22%] sm:rounded-[20px] sm:border-[6px]' : 'w-[24%]'
        }`}
      >
        <img
          src={shot(project.slug, 'mobile')}
          alt={`${project.name} website on mobile`}
          loading="lazy"
          width={520}
          height={1125}
          className="aspect-[9/17] w-full object-cover object-top"
        />
      </div>
    </div>
  )
}

function ScoreBadges({ score }: { score?: Score }) {
  if (!score) return null
  return (
    <div className="flex gap-2">
      {[
        { label: 'performance', value: score.performance },
        { label: 'seo', value: score.seo },
      ].map((s) => (
        <span key={s.label} className="flex items-center gap-2 bg-white px-3 py-1.5 font-inter text-[12px] text-[#666]">
          <span className="font-exo text-[15px] font-bold text-[#111]">{s.value}</span>
          {s.label}
        </span>
      ))}
    </div>
  )
}

function ProjectCard({ project, onPreview, featured = false }: { project: Project; onPreview: () => void; featured?: boolean }) {
  return (
    <FadeIn
      y={30}
      className={`group flex flex-col bg-[#F7F7F7] ${featured ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-center' : ''}`}
    >
      <button type="button" onClick={onPreview} aria-label={`Preview ${project.name}`} className="block w-full text-left">
        <Showcase project={project} featured={featured} />
      </button>

      <div className={`flex flex-1 flex-col gap-4 p-6 sm:p-8 ${featured ? 'lg:p-12' : ''}`}>
        <SectionLabel>{project.category}</SectionLabel>
        <h3
          className="font-exo font-semibold leading-tight text-[#111]"
          style={{ fontSize: featured ? 'clamp(1.6rem, 3vw, 2.6rem)' : 'clamp(1.3rem, 2vw, 1.75rem)' }}
        >
          {project.name}
        </h3>
        <p className="font-inter text-[15px] leading-[1.75] text-[#666]">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="border border-[#E2E2E2] bg-white px-3 py-1.5 font-exo text-[13px] font-medium text-[#111]">
              {t}
            </span>
          ))}
        </div>
        <ScoreBadges score={project.score} />
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#111] px-5 py-3 font-exo text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#FF6A00]"
          >
            Visit Website
            <ArrowUpRight className="h-4 w-4 text-[#FF6A00] transition-colors group-hover:text-current" strokeWidth={1.75} />
          </a>
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex items-center gap-2 border border-[#111] px-5 py-3 font-exo text-[14px] font-medium text-[#111] transition-colors duration-200 hover:bg-[#111] hover:text-white"
          >
            Preview
            <Expand className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </FadeIn>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111]/50 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <motion.div
        className="relative max-h-full w-full max-w-5xl overflow-y-auto bg-white p-5 sm:p-8 md:p-10"
        initial={{ y: 40, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-[#111] text-[#111] transition-colors duration-200 hover:bg-[#111] hover:text-white sm:right-8 sm:top-8"
        >
          <X size={20} strokeWidth={1.75} />
        </button>

        <SectionLabel>{project.category}</SectionLabel>
        <h3
          className="mt-3 pr-14 font-exo font-extrabold leading-[1.05] tracking-tight text-[#111]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
        >
          {project.name}
        </h3>
        <p className="mt-4 max-w-2xl font-inter leading-[1.75] text-[#666]">{project.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_0.42fr]">
          <div className="flex flex-col gap-4">
            <img src={shot(project.slug, 'desktop')} alt={`${project.name} homepage`} className="w-full border border-[#EEE]" />
            <img src={shot(project.slug, 'desktop-second')} alt={`${project.name} inner section`} className="w-full border border-[#EEE]" />
          </div>
          <img
            src={shot(project.slug, 'mobile')}
            alt={`${project.name} on mobile`}
            className="mx-auto w-[60%] self-start rounded-[18px] border-[6px] border-[#111] sm:w-full"
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 bg-[#F7F7F7] p-5 sm:flex-row sm:justify-between sm:p-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-exo text-[15px] font-medium text-[#111] hover:text-[#FF6A00]"
          >
            {domain(project.url)}
            <ArrowUpRight className="h-4 w-4 text-[#FF6A00]" strokeWidth={1.75} />
          </a>
          <ContactButton
            label="Start a Project"
            onClick={(e) => {
              // Close first so the page can scroll again, then glide to the form
              e.preventDefault()
              onClose()
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          label="my work"
          bold="Recent"
          regular={
            <>
              W<Accent>o</Accent>rk
            </>
          }
        />
        <FadeIn delay={0.2} y={20}>
          <p className="max-w-sm font-inter text-[15px] leading-[1.75] text-[#666] lg:text-right">
            Live websites for e-commerce brands, agencies, healthcare and local businesses across Pakistan and the UAE.
          </p>
        </FadeIn>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} featured={i === 0} onPreview={() => setOpenProject(project)} />
        ))}
      </div>

      {BEHANCE && (
        <FadeIn y={20} className="mt-10 flex justify-center">
          <a
            href={BEHANCE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#111] px-6 py-3.5 font-exo text-[15px] font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white"
          >
            View more on Behance
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </FadeIn>
      )}

      {/* Portal to body so the fixed modal escapes the section's stacking context */}
      {createPortal(
        <AnimatePresence>
          {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
