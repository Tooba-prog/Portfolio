import type { ReactNode } from 'react'
import FadeIn from './FadeIn'

export const ORANGE = '#FF6A00'

// The one orange letter in a heading, like the "p" in "Developer"
export function Accent({ children }: { children: ReactNode }) {
  return <span style={{ color: ORANGE }}>{children}</span>
}

// Small lowercase label followed by a short orange line: "about me —"
export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`flex items-center gap-3 font-inter text-[13px] lowercase text-[#333] lg:text-[15px] ${className}`}>
      {children}
      <span className="h-[1.5px] w-6 lg:w-8" style={{ background: ORANGE }} />
    </span>
  )
}

type SectionHeadingProps = {
  label: string
  bold: string
  // Regular-weight word(s); wrap one letter in <Accent> for the orange letter
  regular: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({ label, bold, regular, align = 'left', className = '' }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={`flex flex-col gap-4 ${centered ? 'items-center text-center' : ''} ${className}`}>
      <FadeIn delay={0} y={20}>
        <SectionLabel>{label}</SectionLabel>
      </FadeIn>
      <FadeIn delay={0.1} y={30}>
        <h2
          className="font-exo leading-[1.05] tracking-tight text-[#111]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
        >
          <span className="font-extrabold">{bold}</span> <span className="font-normal">{regular}</span>
        </h2>
      </FadeIn>
    </div>
  )
}
