import type { MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

type ContactButtonProps = {
  label?: string
  href?: string
  // When set, renders a real <button> (e.g. to submit a form) instead of a link
  type?: 'button' | 'submit'
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  disabled?: boolean
}

// Solid black button with an orange arrow; turns orange on hover
const CLASSES =
  'group inline-flex items-center justify-center gap-2 bg-[#111] px-6 py-3 font-exo text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#FF6A00] sm:px-7 sm:py-3.5 sm:text-[15px] disabled:cursor-wait disabled:opacity-60'

function Arrow() {
  return (
    <ArrowUpRight
      className="h-4 w-4 text-[#FF6A00] transition-colors duration-200 group-hover:text-white"
      strokeWidth={1.75}
    />
  )
}

export default function ContactButton({
  label = "Let's Talk",
  href = '#contact',
  type,
  className = '',
  onClick,
  disabled,
}: ContactButtonProps) {
  if (type) {
    return (
      <button type={type} disabled={disabled} className={`${CLASSES} ${className}`}>
        {label}
        <Arrow />
      </button>
    )
  }

  return (
    <a href={href} onClick={onClick} className={`${CLASSES} ${className}`}>
      {label}
      <Arrow />
    </a>
  )
}
