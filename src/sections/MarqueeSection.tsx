import { useEffect, useRef, useState } from 'react'

// Short looping videos in /public/marquee (converted from the original GIFs: ~95% smaller).
// Each has a .mp4 and a .webp poster frame shown until the video plays.
const CLIPS = [
  'space-voyage',
  'codenest',
  'vex-ventures',
  'stellar-ai-v2',
  'asme',
  'transform-data',
  'vitara',
  'terra',
  'skyelite',
  'aethera',
  'designpro',
  'stellar-ai',
  'xportfolio',
  'orbit-web3',
  'nexora',
  'evr-ventures',
  'planet-orbit',
  'new-era',
  'wealth',
  'luminex',
]

const ROW_ONE = [...CLIPS.slice(0, 11), ...CLIPS.slice(0, 11), ...CLIPS.slice(0, 11)]
const ROW_TWO = [...CLIPS.slice(11), ...CLIPS.slice(11), ...CLIPS.slice(11)]

function Row({ clips, transform }: { clips: string[]; transform: string }) {
  return (
    <div className="flex w-max gap-3" style={{ transform, willChange: 'transform' }}>
      {clips.map((clip, i) => (
        <video
          key={i}
          data-src={`/marquee/${clip}.mp4`}
          poster={`/marquee/${clip}.webp`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="h-[270px] w-[420px] shrink-0 bg-[#F7F7F7] object-cover"
        />
      ))}
    </div>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Only tiles on (or near) the screen load and play; the rest stay as posters and pause
  useEffect(() => {
    const videos = sectionRef.current?.querySelectorAll<HTMLVideoElement>('video[data-src]') ?? []
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          const video = target as HTMLVideoElement
          if (isIntersecting) {
            if (!video.src) video.src = video.dataset.src ?? ''
            video.play().catch(() => {})
          } else if (!video.paused) {
            video.pause()
          }
        }
      },
      { rootMargin: '200px' },
    )
    videos.forEach((video) => observer.observe(video))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="showcase" ref={sectionRef} className="flex flex-col gap-3 overflow-hidden bg-white pb-10 pt-4 sm:pt-6 lg:pt-8">
      <Row clips={ROW_ONE} transform={`translateX(${offset - 200}px)`} />
      <Row clips={ROW_TWO} transform={`translateX(${-(offset - 200)}px)`} />
    </section>
  )
}
