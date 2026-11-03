import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Dribbble, Instagram, Linkedin, Twitter, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { FREE_AUDIT, SITE, selectService } from '../data/site'

const ORANGE = '#FF6A00'

const HERO_LINKS = [
  { label: 'home', href: '#top' },
  { label: 'about', href: '#about' },
  { label: 'work', href: '#projects' },
  { label: 'services', href: '#services' },
  { label: 'testimonial', href: '#testimonials' },
  { label: 'contact', href: '#contact' },
]

const SOCIAL_ICONS: Record<string, LucideIcon> = { Instagram, Dribbble, LinkedIn: Linkedin, Twitter }

// Companies from Tooba's LinkedIn, set as simple wordmarks (not their official logos)
const COMPANIES = [
  { name: 'AnalyticXpert', className: 'font-exo font-bold tracking-tight' },
  { name: 'Digital Dubai Experts', className: 'font-exo font-semibold uppercase tracking-[0.12em] text-[0.8em]' },
  { name: 'fiverr.', className: 'font-inter font-semibold lowercase tracking-tight text-[1.15em]' },
  { name: 'DevZex', className: 'font-exo font-extrabold italic' },
  { name: 'FS Digi Tech', className: 'font-signature text-[1.7em] leading-none' },
]

// Portrait for the dark pill; hidden if the file is missing from /public
const PORTRAIT_SRC = '/tooba-portrait.webp'

function RotatingBadge() {
  return (
    <a
      href="#about"
      aria-label="About me"
      className="group relative block h-[72px] w-[72px] sm:h-[96px] sm:w-[96px] lg:h-[118px] lg:w-[118px]"
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]">
        <defs>
          <path id="badgeCircle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text className="fill-[#111] font-exo text-[11.5px] tracking-[0.18em]">
          <textPath href="#badgeCircle">• wordpress developer • wordpress developer</textPath>
        </text>
      </svg>
      <span
        className="absolute left-1/2 top-1/2 flex h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-[54px] sm:w-[54px] lg:h-[68px] lg:w-[68px]"
        style={{ background: ORANGE }}
      >
        <ArrowUpRight className="h-5 w-5 text-[#111] sm:h-6 sm:w-6 lg:h-8 lg:w-8" strokeWidth={1.75} />
      </span>
    </a>
  )
}

function HeroButtons() {
  const base = 'flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors sm:px-5 sm:text-[14px] lg:px-6 lg:py-3 lg:text-[15px]'
  return (
    <>
      <a
        href="#contact"
        onClick={() => selectService(FREE_AUDIT)}
        className={`${base} bg-white hover:bg-[#FFF3EB]`}
        style={{ color: ORANGE }}
      >
        Get Free SEO Audit
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
      </a>
      <a href="#projects" className={`${base} border border-[#111] text-[#111] hover:bg-[#111] hover:text-white`}>
        View My Work
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
      </a>
    </>
  )
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="#3A3A3A" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M24 3 C25.5 16 32 22.5 45 24 C32 25.5 25.5 32 24 45 C22.5 32 16 25.5 3 24 C16 22.5 22.5 16 24 3 Z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 28 20" className="h-[18px] w-[26px] lg:h-[20px] lg:w-[30px]" stroke="#111" strokeWidth="2" strokeLinecap="round">
      <line x1="2" y1="2" x2="26" y2="2" />
      <line x1="10" y1="10" x2="26" y2="10" />
      <line x1="2" y1="18" x2="26" y2="18" />
    </svg>
  )
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hasPortrait, setHasPortrait] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    window.addEventListener('mousedown', close)
    window.addEventListener('keydown', close)
    return () => {
      window.removeEventListener('mousedown', close)
      window.removeEventListener('keydown', close)
    }
  }, [menuOpen])

  return (
    <section id="top" className="relative bg-white font-exo text-[#111]">
      {/* Top bar: search, logo, menu */}
      <FadeIn delay={0} y={-20} className="relative z-30 grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-5 sm:px-8 lg:px-[5.6vw] lg:pt-7">
        {/* Empty left column keeps the logo centred */}
        <span />

        <a href="#top" className="font-exo text-[22px] font-bold tracking-[0.06em] lg:text-[26px]">
          {SITE.firstName.toUpperCase()}
          <span style={{ color: ORANGE }}>.</span>
        </a>

        <div ref={menuRef} className="relative justify-self-end">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center"
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={1.75} /> : <MenuIcon />}
          </button>
          {menuOpen && (
            <nav className="absolute right-0 top-full mt-2 flex w-52 flex-col border border-[#E8E8E8] bg-white py-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              {HERO_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-5 py-2.5 text-[15px] lowercase text-[#555] transition-colors hover:bg-[#F7F7F7] hover:text-[#111]"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" style={{ color: ORANGE }} />
                </a>
              ))}
            </nav>
          )}
        </div>
      </FadeIn>

      {/* Link row */}
      <FadeIn
        as="nav"
        delay={0.1}
        y={-10}
        className="relative z-20 mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 px-4 sm:gap-x-6 sm:px-5 lg:mt-5 lg:gap-x-7"
      >
        {HERO_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={`flex items-center gap-1 text-[12px] lowercase transition-colors duration-200 sm:text-[13px] lg:text-[15px] ${
              i === 0 ? 'text-[#111]' : 'text-[#555] hover:text-[#111]'
            }`}
          >
            {link.label}
            {i === 0 && <ArrowUpRight className="h-3.5 w-3.5" style={{ color: ORANGE }} strokeWidth={2} />}
          </a>
        ))}
      </FadeIn>

      {/* Main card */}
      <div className="mx-4 mt-6 sm:mx-8 lg:mx-[5.6vw] lg:mt-9">
        <div className="relative bg-[#F7F7F7] px-5 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-32 lg:px-14 lg:pb-16 lg:pt-32">
          <FadeIn delay={0.2} y={0} duration={0.9} className="absolute left-4 top-4 sm:left-6 sm:top-5 lg:left-9 lg:top-7">
            <RotatingBadge />
          </FadeIn>

          {/* Top-right from sm up; on phones the same buttons sit under the description */}
          <FadeIn delay={0.25} y={-10} className="absolute right-6 top-7 hidden gap-3 sm:flex lg:right-9 lg:top-9 lg:gap-4">
            <HeroButtons />
          </FadeIn>

          {/* "hello people / i am Creative" + portrait pill */}
          <div className="mt-4 flex flex-col items-center gap-6 sm:mt-6 sm:flex-row sm:justify-center sm:gap-[3vw]">
            <FadeIn delay={0.3} y={20} className="flex items-end gap-4 sm:gap-6">
              <div className="flex flex-col gap-[0.4em] pb-[0.9em] text-[13px] lg:text-[15px]">
                <span className="flex items-center gap-3 text-[#333]">
                  hello people
                  <span className="h-[1.5px] w-6 lg:w-8" style={{ background: ORANGE }} />
                </span>
                <span className="text-[#333]">i am</span>
              </div>
              <span className="font-exo font-normal leading-none text-[#111]" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 4rem)' }}>
                Creative
              </span>
            </FadeIn>

            <FadeIn delay={0.4} y={20} className="relative">
              <Sparkle className="absolute -right-4 -top-6 h-8 w-8 sm:-right-[1.6vw] sm:-top-[2.2vw] sm:h-[3.2vw] sm:w-[3.2vw] lg:max-h-[52px] lg:max-w-[52px]" />
              {/* Size container: the names below are measured in cqh (percent of this pill's height) */}
              <div className="relative h-[96px] w-[220px] [container-type:size] sm:h-[9.5vw] sm:w-[22vw] lg:max-h-[150px] lg:max-w-[340px]">
                <div
                  className="absolute inset-0 overflow-hidden rounded-full bg-[#1C1C1C]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                  }}
                >
                  {/* First name centred in the space left of the portrait, last name right of it.
                      The portrait is 112cqh tall at a 588:520 ratio, so it is ~126.6cqh wide (63.3cqh each side of centre). */}
                  {SITE.name.split(' ').map((part, i) => (
                    <span
                      key={part}
                      data-signature-part
                      className={`absolute inset-y-0 flex w-[calc(50%-63.3cqh)] items-center justify-center whitespace-nowrap font-signature text-[26cqh] text-[#BDBDBD] ${
                        i === 0 ? 'left-0 pl-[6cqh]' : 'right-0 pr-[6cqh]'
                      }`}
                    >
                      {part}
                    </span>
                  ))}
                </div>
                {hasPortrait && (
                  // Slightly taller than the pill so the head just clears the top, clipped flush at the pill's bottom
                  <div className="absolute inset-x-0 bottom-0 top-[-12cqh] overflow-hidden rounded-b-full">
                    <img
                      src={PORTRAIT_SRC}
                      alt={SITE.name}
                      onError={() => setHasPortrait(false)}
                      className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                      // Soft light rim so the black hijab still reads against the dark pill
                      style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.55)) drop-shadow(0 0 6px rgba(255,255,255,0.18))' }}
                    />
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Main title */}
          <FadeIn delay={0.5} y={30}>
            <h1
              className="mt-6 text-center font-exo leading-[1.05] tracking-tight text-[#111] sm:mt-8 sm:whitespace-nowrap lg:mt-10"
              style={{ fontSize: 'clamp(3rem, 7.4vw, 8rem)' }}
            >
              <span className="block font-extrabold sm:inline">WordPress</span>{' '}
              <span className="block font-normal sm:inline">
                Develo<span style={{ color: ORANGE }}>p</span>er
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.6} y={20}>
            <p
              className="mx-auto mt-6 max-w-[690px] text-center font-inter leading-[1.75] text-[#666] lg:mt-8"
              style={{ fontSize: 'clamp(0.85rem, 1.05vw, 1.05rem)' }}
            >
              A Freelance WordPress Developer and SEO Specialist based in {SITE.location}. I build fast, mobile-friendly
              websites that Google can find, index and rank.
            </p>
          </FadeIn>

          <FadeIn delay={0.65} y={10} className="mt-7 flex flex-wrap justify-center gap-2.5 sm:hidden">
            <HeroButtons />
          </FadeIn>

          <FadeIn delay={0.7} y={10} className="mt-6 flex items-center justify-center gap-4 lg:mt-8">
            <span className="font-inter text-[11px] font-semibold text-[#111] lg:text-[12px]">100+ Projects Delivered</span>
            <span className="h-4 w-px bg-[#BBBBBB]" />
            <div className="flex items-center gap-3.5">
              {SITE.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label] ?? Instagram
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-[#111] transition-colors hover:text-[#FF6A00]"
                  >
                    <Icon className="h-[15px] w-[15px] lg:h-[17px] lg:w-[17px]" strokeWidth={2} />
                  </a>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Companies row */}
      <FadeIn
        delay={0.2}
        y={20}
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 px-5 py-10 sm:gap-x-12 lg:gap-x-16 lg:py-14"
      >
        <span className="flex items-center gap-3 font-inter text-[13px] text-[#111] lg:text-[14px]">
          Companies I&apos;ve worked with
          <span className="h-[1.5px] w-7" style={{ background: ORANGE }} />
        </span>
        {COMPANIES.map((company) => (
          <span key={company.name} className={`text-[17px] text-[#1A1A1A] lg:text-[20px] ${company.className}`}>
            {company.name}
          </span>
        ))}
      </FadeIn>
    </section>
  )
}
