import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { X } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import LiveProjectButton from '../components/LiveProjectButton'
import ContactButton from '../components/ContactButton'

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

const IMAGE_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

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
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.div
        className="w-full origin-top rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, top: `${index * 28}px`, position: 'relative' }}
      >
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 sm:mb-6 md:mb-8">
          <div className="flex items-end gap-4 sm:gap-6">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col pb-1 sm:pb-2">
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm md:text-base">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
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
              className={`w-full object-cover ${IMAGE_RADIUS}`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className={`w-full object-cover ${IMAGE_RADIUS}`}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.col2}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className={`h-full w-full object-cover ${IMAGE_RADIUS}`}
            />
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0C0C0C]/80 p-4 backdrop-blur-md sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <motion.div
        className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:rounded-[50px] sm:p-8 md:p-10"
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
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:right-8 sm:top-8"
        >
          <X size={20} />
        </button>

        <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">{project.category}</span>
        <h3
          className="hero-heading mt-1 pr-14 font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
        >
          {project.name}
        </h3>
        <p
          className="mt-5 max-w-2xl font-light leading-relaxed text-[#D7E2EA]/80"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
        >
          {project.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:gap-4">
          <img src={project.col2} alt={`${project.name} main`} className="w-full rounded-[30px] object-cover sm:rounded-[40px]" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {project.col1.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} detail ${i + 1}`}
                className="aspect-[4/3] w-full rounded-[30px] object-cover sm:rounded-[40px]"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center font-light text-[#D7E2EA]/60 sm:text-left">Want something like this for your brand?</p>
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
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-28 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-32 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-40 md:pt-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-6xl">
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
