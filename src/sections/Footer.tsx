import { ArrowUp } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import SocialIcon from '../components/SocialIcon'
import { NAV_LINKS, SITE } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] px-5 pb-8 sm:px-8 md:px-10">
      <div className="border-t border-[#D7E2EA]/15 pt-12 sm:pt-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            {SITE.socials.map((social) => (
              <SocialIcon key={social.label} {...social} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <FadeIn delay={0} y={60}>
            <p
              className="hero-heading mt-10 w-full select-none whitespace-nowrap text-center font-black uppercase leading-none tracking-tight sm:mt-14"
              style={{ fontSize: 'clamp(4rem, 22vw, 340px)' }}
              aria-hidden="true"
            >
              {SITE.name}
            </p>
          </FadeIn>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm font-light uppercase tracking-wider text-[#D7E2EA]/50">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D7E2EA]">
              <ArrowUp size={16} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
