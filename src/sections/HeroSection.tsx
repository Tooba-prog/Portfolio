import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { NAV_LINKS } from '../data/site'

const SPOTLIGHT_SIZE = 640

export default function HeroSection() {
  // Soft glow that trails the cursor behind the heading
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const y = useSpring(mouseY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    mouseX.set(window.innerWidth / 2 - SPOTLIGHT_SIZE / 2)
    mouseY.set(window.innerHeight / 2 - SPOTLIGHT_SIZE / 2)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - SPOTLIGHT_SIZE / 2)
      mouseY.set(e.clientY + window.scrollY - SPOTLIGHT_SIZE / 2)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section id="top" className="relative flex h-screen flex-col overflow-hidden">
      {/* Ambient glow behind the heading */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #7621B0 0%, #B600A8 35%, transparent 70%)' }}
      />
      {/* Cursor-following spotlight */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 rounded-full blur-[60px]"
        style={{
          x,
          y,
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          background: 'radial-gradient(circle, rgba(182, 0, 168, 0.16) 0%, rgba(118, 33, 176, 0.08) 40%, transparent 70%)',
        }}
      />

      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-10 flex justify-between px-6 pt-6 md:px-10 md:pt-8"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
        <div className="w-full overflow-hidden">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m jack
            </h1>
          </FadeIn>
        </div>

        <FadeIn delay={0.35} y={20} className="flex items-center gap-4 px-6 sm:gap-6">
          <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[#D7E2EA]/60 sm:block md:w-20" />
          <p
            className="max-w-[300px] text-center font-light uppercase leading-snug tracking-[0.2em] text-[#D7E2EA] sm:max-w-[480px] md:max-w-[640px]"
            style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.4rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
          <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[#D7E2EA]/60 sm:block md:w-20" />
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="mt-2 sm:mt-4">
          <ContactButton />
        </FadeIn>
      </div>

      <FadeIn delay={0.7} y={10} className="relative z-10 flex justify-center pb-7 sm:pb-8 md:pb-10">
        <a
          href="#showcase"
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/60 transition-opacity duration-200 hover:opacity-100"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} />
          </motion.span>
        </a>
      </FadeIn>
    </section>
  )
}
