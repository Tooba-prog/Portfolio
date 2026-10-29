import { Dribbble, Instagram, Linkedin, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Instagram,
  Dribbble,
  LinkedIn: Linkedin,
  Twitter,
}

export default function SocialIcon({ label, href }: { label: string; href: string }) {
  const Icon = ICONS[label] ?? Instagram

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10"
    >
      <Icon size={18} />
    </a>
  )
}
