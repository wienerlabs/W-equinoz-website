'use client'

import { useRef } from 'react'
import { home } from '@/lib/content/home'
import type { Lang } from '@/lib/i18n'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/lib/motion'

const GLOWS = ['#ffcf8f', '#f2a65a', '#9eb5a4', '#e9b7b0']

export default function Values({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const copy = home.values

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const section = root.current!
      const media = gsap.matchMedia()
      media.add('(min-width: 1024px)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.value-row', section)
        let active = -1
        const activate = (index: number) => {
          if (index === active) return
          active = index
          rows.forEach((row, i) => row.toggleAttribute('data-active', i === index))
          section.style.setProperty('--value-glow', GLOWS[index])
        }
        section.setAttribute('data-staged', '')
        activate(0)
        const trigger = ScrollTrigger.create({
          trigger: section.querySelector('.values-track'),
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => activate(Math.min(rows.length - 1, Math.floor(self.progress * rows.length))),
        })
        return () => {
          trigger.kill()
          section.removeAttribute('data-staged')
          rows.forEach((row) => row.removeAttribute('data-active'))
        }
      })
      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="values-title"
      className="values relative bg-ink text-sand [--value-glow:#ffcf8f]"
    >
      <div className="values-track relative lg:h-[300svh]">
        <div className="relative overflow-clip lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[20vw] top-1/2 hidden h-[80vmin] w-[80vmin] -translate-y-1/2 rounded-full opacity-30 blur-3xl transition-[background] duration-1000 lg:block"
            style={{ background: 'radial-gradient(circle, var(--value-glow), transparent 65%)' }}
          />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-0">
            <p className="eyebrow mb-6 text-clay/60" data-reveal>
              {copy.eyebrow[lang]}
            </p>
            <h2 id="values-title" data-split className="mb-14 max-w-[16ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-none tracking-[-0.04em] lg:mb-16">
              {copy.title[lang]}
            </h2>
            <ol className="grid gap-10 lg:gap-3">
              {copy.items.map((value, index) => (
                <li key={value.title.en} className="value-row transition-opacity duration-700">
                  <div className="grid gap-3 lg:grid-cols-12 lg:items-baseline" data-reveal>
                    <span className="tabular text-sm text-clay/50 lg:col-span-1">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-[clamp(2.4rem,6.2vw,6.2rem)] font-extralight leading-[0.95] tracking-[-0.055em] lg:col-span-7">
                      {value.title[lang]}
                    </h3>
                    <p className="max-w-md text-lg leading-relaxed text-clay/80 lg:col-span-4">{value.text[lang]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
