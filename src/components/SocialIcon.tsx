import { Dribbble, Instagram, Linkedin, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Instagram,
  Dribbble,
  LinkedIn: Linkedin,
  Twitter,
}

type SocialIconProps = { label: string; href: string; dark?: boolean }

export default function SocialIcon({ label, href, dark = false }: SocialIconProps) {
  const Icon = ICONS[label] ?? Instagram

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center border transition-colors duration-200 hover:border-[#FF6A00] hover:bg-[#FF6A00] hover:text-white ${
        dark ? 'border-white/20 text-white' : 'border-[#DDDDDD] text-[#111]'
      }`}
    >
      <Icon size={17} strokeWidth={1.75} />
    </a>
  )
}
