'use client'

import { useRef } from 'react'
import { home } from '@/lib/content/home'
import type { Lang } from '@/lib/i18n'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/motion'

export default function RequestFlow({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const copy = home.contact.flow

  useGSAP(
    () => {
      const section = root.current!
      const steps = gsap.utils.toArray<HTMLElement>('.flow-step', section)
      const light = (progress: number) =>
        steps.forEach((step, index) => step.toggleAttribute('data-on', progress >= index / steps.length + 0.01))
      if (prefersReducedMotion()) {
        section.style.setProperty('--p', '1')
        light(1)
        return
      }
      section.setAttribute('data-staged', '')
      light(0)
      gsap.fromTo(
        section,
        { '--p': 0 },
        {
          '--p': 1,
          ease: 'none',
          scrollTrigger: { trigger: section.querySelector('.flow-rail'), start: 'top 78%', end: 'bottom 40%', scrub: 0.8 },
          onUpdate() {
            light(this.progress())
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} data-theme="light" aria-labelledby="flow-title" className="flow relative overflow-clip bg-clay text-ink [--p:1]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <p className="eyebrow mb-6 text-ink/55" data-reveal>
          {copy.eyebrow[lang]}
        </p>
        <h2 id="flow-title" data-split className="max-w-[18ch] text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.045em]">
          {copy.title[lang]}
        </h2>
        <div className="flow-rail relative mt-16 pl-10 lg:mt-24 lg:pl-0 lg:pt-14">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-ink/15 lg:inset-x-0 lg:bottom-auto lg:top-[5px] lg:h-px lg:w-auto" />
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-terracotta [transform:scaleY(var(--p))] lg:inset-x-0 lg:bottom-auto lg:top-[5px] lg:h-px lg:w-auto lg:origin-left lg:[transform:scaleX(var(--p))]"
          />
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-[calc(var(--p)*100%)] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_24px_8px_rgba(242,166,90,0.45)] lg:left-[calc(var(--p)*100%)] lg:top-[5px]"
          />
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {copy.steps.map((step, index) => (
              <li key={step.title.en} className="flow-step relative transition-opacity duration-700">
                <span
                  aria-hidden="true"
                  className="flow-node absolute -left-10 top-1 h-[11px] w-[11px] rounded-full border border-ink/30 bg-clay transition-colors duration-500 lg:-top-14 lg:left-0"
                />
                <span className="tabular text-sm text-terracotta">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight">{step.title[lang]}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-ink/70">{step.text[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
