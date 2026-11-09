import { Instagram, Linkedin, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Instagram,
  LinkedIn: Linkedin,
  Twitter,
}

type SocialIconProps = { label: string; href: string; dark?: boolean }

export function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M2 5h5.3c2.4 0 3.9 1.2 3.9 3.3 0 1.2-.6 2.1-1.6 2.6 1.4.4 2.2 1.5 2.2 3.1 0 2.5-1.8 4-4.5 4H2V5Zm3 2.5v2.5h2.1c.8 0 1.3-.4 1.3-1.3 0-.8-.5-1.2-1.4-1.2H5Zm0 4.8v3.2h2.5c1 0 1.6-.5 1.6-1.6s-.6-1.6-1.6-1.6H5Zm10.2-7.1h5.1v1.6h-5.1V5.2Zm6.2 9.5h-6.1c.1 1.2.8 1.9 1.9 1.9.8 0 1.4-.4 1.6-1h2.5c-.5 2-2 3.1-4.2 3.1-2.8 0-4.5-1.8-4.5-4.6 0-2.7 1.8-4.6 4.5-4.6 2.8 0 4.4 1.9 4.4 4.6 0 .2 0 .4-.1.6Zm-6.1-1.7h3.5c-.1-1-.7-1.6-1.7-1.6-1 0-1.6.6-1.8 1.6Z"
      />
    </svg>
  )
}

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
      {label === 'Behance' ? <BehanceIcon className="h-[17px] w-[17px]" /> : <Icon size={17} strokeWidth={1.75} />}
    </a>
  )
}
