'use client'

import { useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/lib/motion'

export default function Marquee({ items, tone = 'night' }: { items: string[]; tone?: 'night' | 'sand' }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const run = root.current!.querySelector<HTMLElement>('.marquee-run')!
      const setX = gsap.quickSetter(run, 'xPercent')
      let position = 0
      let direction = 1
      let boost = 0
      const tick = (_time: number, delta: number) => {
        boost *= 0.92
        position = gsap.utils.wrap(-50, 0, position - direction * (1 + boost) * delta * 0.0011)
        setX(position)
      }
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
        onUpdate: (self) => {
          direction = self.direction
          boost = Math.min(Math.abs(self.getVelocity()) / 260, 9)
        },
      })
      return () => {
        trigger.kill()
        gsap.ticker.remove(tick)
      }
    },
    { scope: root },
  )

  const colors = tone === 'night' ? 'bg-night text-sand' : 'bg-sand text-ink'
  return (
    <div ref={root} aria-hidden="true" className={`relative overflow-hidden border-y border-current/10 py-10 lg:py-14 ${colors}`}>
      <div className="marquee-run flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item, index) => (
              <li key={item} className="flex items-center">
                <span
                  className={`whitespace-nowrap px-[3.5vw] text-[clamp(2.2rem,6.4vw,6.4rem)] leading-none ${
                    index % 2 ? 'serif-accent text-[1.12em] text-ember' : 'font-extralight tracking-[-0.045em]'
                  }`}
                >
                  {item}
                </span>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ember/70 shadow-[0_0_24px_6px_rgba(242,166,90,0.35)]" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
