import type { MouseEvent } from 'react'

type ContactButtonProps = {
  label?: string
  href?: string
  // When set, renders a real <button> (e.g. to submit a form) instead of a link
  type?: 'button' | 'submit'
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  disabled?: boolean
}

const STYLE = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid white',
  outlineOffset: '-3px',
}

const CLASSES =
  'inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]'

export default function ContactButton({
  label = 'Contact Me',
  href = '#contact',
  type,
  className = '',
  onClick,
  disabled,
}: ContactButtonProps) {
  if (type) {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`${CLASSES} disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100 ${className}`}
        style={STYLE}
      >
        {label}
      </button>
    )
  }

  return (
    <a href={href} onClick={onClick} className={`${CLASSES} ${className}`} style={STYLE}>
      {label}
    </a>
  )
}
