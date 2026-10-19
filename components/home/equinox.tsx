'use client'

import { useRef } from 'react'
import { Mark } from '@/components/brand'
import { home } from '@/lib/content/home'
import type { Lang } from '@/lib/i18n'
import { gsap, ScrollTrigger, prefersReducedMotion, useGSAP } from '@/lib/motion'
import { dayLength } from '@/lib/sun'

const START_SHARE = 0.72

const stars = Array.from({ length: 90 }, (_, index) => {
  const seed = Math.sin(index * 127.1 + 311.7) * 43758.5453
  const r = seed - Math.floor(seed)
  const seed2 = Math.sin(index * 269.5 + 183.3) * 43758.5453
  const r2 = seed2 - Math.floor(seed2)
  return { x: 50 + r * 50, y: r2 * 62, size: r * r2 > 0.5 ? 1.6 : 0.9, delay: (r + r2) * 3 }
})

const format = (share: number, lang: Lang) => {
  const { hours, minutes } = dayLength(share)
  return lang === 'tr' ? `${hours} sa ${String(minutes).padStart(2, '0')} dk` : `${hours} h ${String(minutes).padStart(2, '0')} min`
}

function Layer({ lang, tone, hidden }: { lang: Lang; tone: 'day' | 'night'; hidden?: boolean }) {
  const copy = home.equinox
  const dark = tone === 'night'
  return (
    <div
      aria-hidden={hidden}
      className={`absolute inset-0 flex flex-col items-center justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-32 ${
        dark ? 'text-clay' : 'text-ink'
      }`}
    >
      <div className="text-center">
        <p className="eyebrow mb-5 opacity-70">{copy.eyebrow[lang]}</p>
        {hidden ? (
          <p className="mx-auto max-w-[18ch] font-display text-[clamp(2.1rem,5vw,4.6rem)] leading-[1] tracking-[-0.025em] [text-wrap:balance]">
            {copy.title[lang]}
          </p>
        ) : (
          <h2 id="equinox-title" className="mx-auto max-w-[18ch] font-display text-[clamp(2.1rem,5vw,4.6rem)] leading-[1] tracking-[-0.025em] [text-wrap:balance]">
            {copy.title[lang]}
          </h2>
        )}
      </div>
      <Mark className="eq-mark w-[min(68vw,680px)] opacity-90" />
      <div className="grid w-full max-w-[1440px] grid-cols-3 items-end text-sm">
        <div>
          <p className="opacity-60">{copy.day[lang]}</p>
          <p className="eq-day mt-1 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-none">{format(START_SHARE, lang)}</p>
        </div>
        <div className="text-center">
          <p className="eq-balance opacity-0">
            <span className="mx-auto mb-3 block h-px w-14 bg-current" />
            {copy.balance[lang]}
          </p>
          <p className="eq-hint opacity-60">{copy.hint[lang]}</p>
        </div>
        <div className="text-right">
          <p className="opacity-60">{copy.night[lang]}</p>
          <p className="eq-night mt-1 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-none">{format(1 - START_SHARE, lang)}</p>
        </div>
      </div>
    </div>
  )
}

export default function Equinox({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = stage.current!
      const q = gsap.utils.selector(root.current)
      const days = q('.eq-day')
      const nights = q('.eq-night')
      let shown = -1
      const setSplit = (share: number) => {
        if (Math.abs(share - shown) < 0.0002) return
        shown = share
        element.style.setProperty('--split', `${(share * 100).toFixed(3)}%`)
        const day = format(share, lang)
        const night = format(1 - share, lang)
        for (const node of days) if (node.textContent !== day) node.textContent = day
        for (const node of nights) if (node.textContent !== night) node.textContent = night
      }
      if (prefersReducedMotion()) {
        setSplit(0.5)
        gsap.set(q('.eq-balance'), { opacity: 1 })
        gsap.set(q('.eq-hint'), { opacity: 0 })
        return
      }
      let scrollShare = START_SHARE
      let wobble = 0
      let wobbleTarget = 0
      const render = () => {
        wobble += (wobbleTarget - wobble) * 0.08
        setSplit(Math.min(0.92, Math.max(0.08, scrollShare + wobble)))
      }
      ScrollTrigger.create({
        trigger: track.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? gsap.ticker.add(render) : gsap.ticker.remove(render)),
      })
      const move = (event: PointerEvent) => {
        wobbleTarget = ((event.clientX / window.innerWidth) * 2 - 1) * 0.035
      }
      const leave = () => {
        wobbleTarget = 0
      }
      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', leave)

      const balanced = gsap.timeline({ paused: true })
      balanced
        .to(q('.eq-balance'), { opacity: 1, duration: 0.6 }, 0)
        .to(q('.eq-hint'), { opacity: 0, duration: 0.4 }, 0)
        .fromTo(q('.eq-glow'), { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 0)

      ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const t = Math.min(1, self.progress / 0.62)
          scrollShare = START_SHARE + (0.5 - START_SHARE) * gsap.parseEase('power2.inOut')(t)
          if (t >= 1 && balanced.progress() === 0) balanced.play()
          if (t < 1 && balanced.progress() > 0) balanced.reverse()
        },
      })
      gsap.fromTo(
        q('.eq-sun'),
        { yPercent: 40 },
        { yPercent: -20, ease: 'none', scrollTrigger: { trigger: track.current, start: 'top top', end: 'bottom bottom', scrub: true } },
      )

      return () => {
        gsap.ticker.remove(render)
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', leave)
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="equinox-title" className="relative bg-night">
      <div ref={track} className="relative h-[240svh]">
      <div
        ref={stage}
        className="sticky top-0 h-svh overflow-hidden"
        style={{ ['--split' as string]: `${START_SHARE * 100}%` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#e7efed_0%,#f6efe6_42%,#f4d6b2_78%,#eab183_100%)]">
          <div className="eq-sun absolute left-[12%] top-[16%] h-[22vmin] w-[22vmin] rounded-full bg-[radial-gradient(circle,#fff8ec_0%,#ffd9a3_45%,rgba(242,166,90,0)_72%)]" />
          <Layer lang={lang} tone="day" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,#040d11_0%,#0a1c22_55%,#12313a_100%)]"
          style={{ clipPath: 'inset(0 0 0 var(--split))' }}
        >
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {stars.map((star, index) => (
              <circle
                key={index}
                cx={star.x}
                cy={star.y}
                r={star.size * 0.12}
                fill="#e8eef2"
                className="animate-pulse"
                style={{ animationDelay: `${star.delay}s`, animationDuration: '3.6s' }}
              />
            ))}
          </svg>
          <div className="absolute right-[13%] top-[15%] h-[12vmin] w-[12vmin] rounded-full shadow-[inset_-2.4vmin_1.2vmin_0_0_#e9e4da]" />
          <Layer lang={lang} tone="night" hidden />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,236,210,0.9)_30%,rgba(255,236,210,0.9)_70%,transparent)] shadow-[0_0_24px_6px_rgba(242,166,90,0.35)]"
          style={{ left: 'var(--split)' }}
        />
        <div
          aria-hidden="true"
          className="eq-glow pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,166,90,0.28),transparent_65%)] opacity-0"
        />
      </div>
      </div>
      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-36">
        {home.equinox.body.map((paragraph, index) => (
          <p
            key={index}
            data-reveal
            className={`text-lg leading-relaxed text-clay/90 lg:col-span-5 lg:text-xl ${index === 0 ? 'lg:col-start-2' : 'lg:col-start-7'}`}
          >
            {paragraph[lang]}
          </p>
        ))}
      </div>
    </section>
  )
}
