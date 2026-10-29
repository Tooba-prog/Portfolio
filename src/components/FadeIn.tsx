import { motion } from 'framer-motion'
import type { ElementType, ReactNode, CSSProperties } from 'react'

type FadeInProps = {
  children?: ReactNode
  as?: ElementType
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  x?: number
  y?: number
}

// Cache motion components per element type so they aren't recreated each render
const motionCache = new Map<ElementType, ElementType>()

function getMotionComponent(as: ElementType): ElementType {
  let component = motionCache.get(as)
  if (!component) {
    component = motion.create(as as never) as ElementType
    motionCache.set(as, component)
  }
  return component
}

export default function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const Component = getMotionComponent(as)

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  )
}
