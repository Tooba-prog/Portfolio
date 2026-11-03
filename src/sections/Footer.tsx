import { ArrowUp, ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import SocialIcon from '../components/SocialIcon'
import { ORANGE } from '../components/SectionHeading'
import { NAV_LINKS, SITE } from '../data/site'

// Dark block, like the portrait pill in the hero
export default function Footer() {
  return (
    <footer className="bg-white px-4 pb-4 sm:px-8 sm:pb-8 lg:px-[5.6vw]">
      <div className="bg-[#111] px-5 pb-8 pt-14 text-white sm:px-10 lg:px-14 lg:pt-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn delay={0} y={20}>
            <p className="font-exo leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.25rem, 5vw, 4.75rem)' }}>
              <span className="font-extrabold">Let&apos;s build</span>{' '}
              <span className="font-normal">
                something gr<span style={{ color: ORANGE }}>e</span>at
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={0.1} y={20}>
            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-2 font-exo text-[17px] font-medium text-white transition-colors hover:text-[#FF6A00] lg:text-[20px]"
            >
              {SITE.email}
              <ArrowUpRight className="h-5 w-5 text-[#FF6A00]" strokeWidth={1.75} />
            </a>
          </FadeIn>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 border-t border-white/10 pt-10 md:flex-row md:justify-between">
          <a href="#top" className="font-exo text-[24px] font-bold tracking-[0.06em]">
            {SITE.firstName.toUpperCase()}
            <span style={{ color: ORANGE }}>.</span>
          </a>
          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-exo text-[15px] lowercase text-white/60 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            {SITE.socials.map((social) => (
              <SocialIcon key={social.label} {...social} dark />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-inter text-[13px] text-white/40">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="flex items-center gap-3 font-exo text-[14px] lowercase text-white/80 transition-colors duration-200 hover:text-white"
          >
            back to top
            <span className="flex h-9 w-9 items-center justify-center bg-[#FF6A00] text-white">
              <ArrowUp size={16} strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
