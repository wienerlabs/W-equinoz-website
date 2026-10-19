'use client'

import { useRef } from 'react'
import { home } from '@/lib/content/home'
import type { Lang } from '@/lib/i18n'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/motion'

export default function Approach({ lang, accent = '#b55d3b' }: { lang: Lang; accent?: string }) {
  const root = useRef<HTMLElement>(null)
  const rail = useRef<HTMLOListElement>(null)
  const copy = home.approach

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const media = gsap.matchMedia()
      media.add('(min-width: 1024px)', () => {
        const section = root.current!
        const track = rail.current!
        const distance = () => track.scrollWidth - track.clientWidth
        const sun = section.querySelector<SVGCircleElement>('.approach-sun')!
        const arc = section.querySelector<SVGPathElement>('.approach-arc')!
        const length = arc.getTotalLength()
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const point = arc.getPointAtLength(length * self.progress)
              sun.setAttribute('cx', point.x.toFixed(1))
              sun.setAttribute('cy', point.y.toFixed(1))
            },
          },
        })
      })
      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} data-theme="light" aria-labelledby="approach-title" className="relative overflow-hidden bg-clay text-ink">
      <div className="mx-auto flex min-h-svh max-w-[1440px] flex-col justify-center px-5 py-28 sm:px-8 lg:px-12 lg:py-20">
        <div className="relative">
          <svg viewBox="0 0 1000 120" className="pointer-events-none absolute -top-10 right-0 hidden w-[46%] lg:block" aria-hidden="true">
            <path className="approach-arc" d="M 10 110 Q 500 -60 990 110" fill="none" stroke="#0e2725" strokeOpacity="0.25" strokeDasharray="3 7" />
            <line x1="0" x2="1000" y1="110" y2="110" stroke="#0e2725" strokeOpacity="0.2" />
            <circle className="approach-sun" cx="10" cy="110" r="9" fill={accent} />
          </svg>
          <p className="eyebrow mb-6 text-ink/55" data-reveal>
            {copy.eyebrow[lang]}
          </p>
          <h2 id="approach-title" data-split className="max-w-[18ch] text-[clamp(2.4rem,5.4vw,5.4rem)] leading-[0.95] tracking-[-0.035em]">
            {copy.title[lang]}
          </h2>
        </div>
        <ol
          ref={rail}
          className="mt-16 grid gap-px overflow-hidden bg-ink/10 lg:mt-20 lg:flex lg:gap-0 lg:overflow-visible lg:bg-transparent"
        >
          {copy.steps.map((step, index) => (
            <li
              key={step.title.en}
              data-reveal
              className="flex min-h-[15rem] flex-col justify-between bg-clay py-8 lg:min-h-[22rem] lg:w-[34vw] lg:max-w-[30rem] lg:shrink-0 lg:border-l lg:border-ink/15 lg:px-10 lg:py-4"
            >
              <span className="font-display text-[clamp(3rem,6vw,5.5rem)] font-extralight leading-none opacity-85" style={{ color: accent }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="mt-10">
                <h3 className="text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight">{step.title[lang]}</h3>
                <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-ink/70">{step.text[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
