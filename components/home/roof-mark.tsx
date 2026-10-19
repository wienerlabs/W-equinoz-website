'use client'

import { useRef } from 'react'
import { MARK_LEFT, MARK_RIGHT } from '@/components/brand'
import { brands } from '@/lib/content/brands'
import type { Lang } from '@/lib/i18n'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/motion'

const ROOMS = [
  { x: 1, y: 1, w: 8, h: 3 },
  { x: 9.56, y: 1, w: 8, h: 3 },
  { x: 1, y: 5, w: 8, h: 3 },
  { x: 9.56, y: 5, w: 8, h: 3 },
]

export default function RoofMark({ lang }: { lang: Lang }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root.current)
      if (prefersReducedMotion()) {
        gsap.set(q('.room'), { opacity: 1 })
        gsap.set(q('.room-label'), { opacity: 1 })
        return
      }
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 40%', scrub: 0.6 } })
        .fromTo(q('.room'), { opacity: 0 }, { opacity: 1, stagger: 0.5, duration: 0.6, ease: 'power1.inOut' })
        .fromTo(q('.room-label'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.5, duration: 0.6 }, 0.2)
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative">
      <svg viewBox="-0.4 -0.4 19.36 9.8" className="w-full" role="img" aria-label={brands.map((brand) => brand.name).join(', ')}>
        {ROOMS.map((room, index) => (
          <rect
            key={brands[index].key}
            className="room"
            x={room.x}
            y={room.y}
            width={room.w}
            height={room.h}
            fill={brands[index].light.accent}
            opacity="0.15"
          />
        ))}
        <g fill="#0e2725" fillRule="evenodd">
          <path d={MARK_LEFT} />
          <path d={MARK_RIGHT} />
        </g>
      </svg>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:mt-8">
        {brands.map((brand) => (
          <li key={brand.key} className="room-label flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0" style={{ background: brand.light.accent }} />
            <span>
              {brand.name}
              <span className="ml-2 text-ink/50">{brand.light.name[lang]}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
