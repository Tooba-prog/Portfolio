import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { X } from 'lucide-react'
import LiveProjectButton from '../components/LiveProjectButton'
import ContactButton from '../components/ContactButton'
import SectionHeading, { Accent, SectionLabel } from '../components/SectionHeading'

const img = (file: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${file}.png&w=1280&q=85`

type Project = {
  name: string
  category: string
  description: string
  // Set a URL to make "Live Project" open the real site; otherwise it opens the preview
  liveUrl?: string
  col1: [string, string]
  col2: string
}

const PROJECTS: Project[] = [
  {
    name: 'Nextlevel Studio',
    category: 'Client',
    description:
      'A full 3D visual identity for a creative studio — hero renders, product scenes and motion loops built to stand out across web and social.',
    col1: [
      img('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db'),
      img('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8'),
    ],
    col2: img('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327'),
  },
  {
    name: 'Aura Brand Identity',
    category: 'Personal',
    description:
      'A personal exploration of soft, organic brand worlds — custom materials, lighting studies and a cohesive visual system.',
    col1: [
      img('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f'),
      img('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1'),
    ],
    col2: img('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea'),
  },
  {
    name: 'Solaris Digital',
    category: 'Client',
    description:
      'Photorealistic environment renders and campaign visuals for a digital agency launch, from concept sketches to final delivery.',
    col1: [
      img('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f'),
      img('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b'),
    ],
    col2: img('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee'),
  },
]

function ProjectCard({
  project,
  index,
  total,
  progress,
  onOpen,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  onOpen: () => void
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    // min-h (not h) plus bottom padding for the stacking offset: on tall screens the card can be taller than
    // 85vh, and a fixed-height slot would let it spill into the next section. The last card has nothing
    // stacking after it, so its slot just fits the card instead of leaving empty space below.
    <div
      className={`sticky top-24 flex items-start justify-center md:top-32 ${index < total - 1 ? 'min-h-[85vh]' : ''}`}
      style={{ paddingBottom: `${index * 28}px` }}
    >
      <motion.div
        className="w-full origin-top border border-[#E6E6E6] bg-[#F7F7F7] p-4 shadow-[0_-12px_40px_rgba(0,0,0,0.04)] sm:p-6 md:p-8"
        style={{ scale, top: `${index * 28}px`, position: 'relative' }}
      >
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 sm:mb-6 md:mb-8">
          <div className="flex items-end gap-4 sm:gap-6">
            <span className="font-exo font-light leading-none text-[#BBBBBB]" style={{ fontSize: 'clamp(3rem, 8vw, 110px)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1.5 pb-1 sm:pb-2">
              <SectionLabel>{project.category}</SectionLabel>
              <h3 className="font-exo font-semibold text-[#111]" style={{ fontSize: 'clamp(1.15rem, 2.2vw, 2.1rem)' }}>
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.liveUrl} onClick={onOpen} />
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <img
              src={project.col1[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full object-cover"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full object-cover"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="w-[60%]">
            <img src={project.col2} alt={`${project.name} preview 3`} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
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
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {project.name}
        </h3>
        <p className="mt-5 max-w-2xl font-inter leading-[1.75] text-[#666]" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>
          {project.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:gap-4">
          <img src={project.col2} alt={`${project.name} main`} className="w-full object-cover" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {project.col1.map((src, i) => (
              <img key={src} src={src} alt={`${project.name} detail ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 bg-[#F7F7F7] p-5 sm:flex-row sm:justify-between sm:p-6">
          <p className="text-center font-inter text-[#666] sm:text-left">Want something like this for your brand?</p>
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="projects" className="relative bg-white px-4 pb-20 pt-10 sm:px-8 lg:px-[5.6vw] lg:pb-28">
      <SectionHeading
        label="my work"
        bold="Recent"
        regular={
          <>
            W<Accent>o</Accent>rk
          </>
        }
        className="mb-10 lg:mb-14"
      />

      <div ref={containerRef}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
            onOpen={() => setOpenProject(project)}
          />
        ))}
      </div>

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
