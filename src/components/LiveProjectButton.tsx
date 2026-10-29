type LiveProjectButtonProps = {
  // Opens this URL in a new tab when set, otherwise calls onClick
  href?: string
  onClick?: () => void
}

const CLASSES =
  'inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10'

export default function LiveProjectButton({ href, onClick }: LiveProjectButtonProps) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={CLASSES}>
        Live Project
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={CLASSES}>
      Live Project
    </button>
  )
}
