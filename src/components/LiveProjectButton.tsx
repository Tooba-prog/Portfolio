import { ArrowUpRight } from 'lucide-react'

type LiveProjectButtonProps = {
  // Opens this URL in a new tab when set, otherwise calls onClick
  href?: string
  onClick?: () => void
}

// Outlined black button, same as "My Work" in the hero
const CLASSES =
  'inline-flex items-center gap-2 border border-[#111] px-5 py-2.5 font-exo text-[14px] font-medium text-[#111] transition-colors duration-200 hover:bg-[#111] hover:text-white sm:px-6 sm:py-3 sm:text-[15px]'

export default function LiveProjectButton({ href, onClick }: LiveProjectButtonProps) {
  const content = (
    <>
      Live Project
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={CLASSES}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={CLASSES}>
      {content}
    </button>
  )
}
