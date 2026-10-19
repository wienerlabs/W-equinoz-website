'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import hero from '@/assets/media/hero-horizon.jpg'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion, useGSAP, whenIntroDone } from '@/lib/motion'
import { site, whatsappLink } from '@/lib/site'
import { Stage } from '@/lib/stage'

const FOCUS: [number, number] = [0.42, 0.5]
const SUN: [number, number] = [0.37, 0.538]
const HORIZON = 0.662

export default function Hero({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useGSAP(
    () => {
      const section = root.current!
      const q = gsap.utils.selector(section)
      let stage: Stage | null = null
      if (prefersReducedMotion()) return

      if (Stage.supported()) {
        try {
          stage = new Stage(
            canvas.current!,
            [{ src: hero.src, width: hero.width, height: hero.height, focus: FOCUS, horizon: HORIZON, water: 1, sun: [...SUN, 0.55] }],
            window.innerWidth > 900 ? 1920 : 1080,
          )
          stage.state.flare = 1
          stage.state.sunPulse = 1
          stage.state.tint = [1, 0.8, 0.58]
          stage.onReady = () => gsap.to(canvas.current, { opacity: 1, duration: 1.4, ease: 'power2.out' })
          stage.onLost = () => gsap.to(canvas.current, { opacity: 0, duration: 0.6 })
        } catch {
          stage = null
        }
      }

      const move = (event: PointerEvent) => {
        stage?.pointer((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1)
      }
      window.addEventListener('pointermove', move, { passive: true })

      const title = SplitText.create(q('.hero-title'), { type: 'lines', mask: 'lines' })
      gsap.set(title.lines, { yPercent: 110 })
      gsap.set(q('.hero-title'), { visibility: 'visible' })
      const stopWaiting = whenIntroDone(() => {
        gsap.to(title.lines, { yPercent: 0, duration: 1.6, ease: 'expo.out', stagger: 0.12 })
        gsap.fromTo(
          q('.hero-fade'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.1, delay: 0.35 },
        )
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (stage) stage.state.night = self.progress * 0.8
        },
      })
      gsap.to(q('.hero-copy'), {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })

      return () => {
        stopWaiting()
        window.removeEventListener('pointermove', move)
        stage?.destroy()
      }
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      data-intro-anchor={`${hero.width},${hero.height},${FOCUS[0]},${FOCUS[1]},${SUN[0]},${SUN[1]}`}
      className="relative h-svh min-h-[620px] overflow-hidden bg-night"
    >
      <Image
        src={hero}
        alt={
          lang === 'tr'
            ? 'Güneşin ufka oturduğu anda Dubai silueti ve Burj Khalifa'
            : 'The Dubai skyline and the Burj Khalifa as the sun sits on the horizon'
        }
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="scale-[1.06] object-cover"
        style={{ objectPosition: `${FOCUS[0] * 100}% ${FOCUS[1] * 100}%`, transformOrigin: `${FOCUS[0] * 100}% ${FOCUS[1] * 100}%` }}
      />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full opacity-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,17,0.6)_0%,rgba(6,18,17,0)_34%,rgba(6,18,17,0.05)_58%,rgba(6,18,17,0.82)_100%),linear-gradient(90deg,rgba(6,18,17,0.5)_0%,rgba(6,18,17,0.18)_42%,rgba(6,18,17,0)_62%)]" />

      <div className="hero-copy relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-36">
        <div>
          <p className="hero-fade eyebrow mb-6 text-clay/80">{home.hero.eyebrow[lang]}</p>
          <h1 lang="en" className="hero-title max-w-[11ch] text-[clamp(3.1rem,9.2vw,9.75rem)] leading-[0.88] tracking-[-0.035em] text-sand">
            Global Vision.
            <br />
            <em className="font-light italic text-[#fde9cf] [text-shadow:0_2px_40px_rgba(6,18,17,0.55)]">Preserving Legacy.</em>
          </h1>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="hero-fade text-[1.0625rem] leading-relaxed text-sand/90 [text-shadow:0_1px_24px_rgba(6,18,17,0.6)] sm:text-lg">{home.hero.lead[lang]}</p>
            <div className="hero-fade mt-8 flex flex-wrap gap-3">
              <Link
                href={href('contact', lang)}
                className="rounded-full bg-sand px-6 py-3.5 text-[0.9375rem] text-ink transition-colors duration-500 hover:bg-ember"
              >
                {ui.consult[lang]}
              </Link>
              <a
                href={whatsappLink(ui.form.whatsappIntro[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-sand/30 px-6 py-3.5 text-[0.9375rem] text-sand backdrop-blur-sm transition-colors duration-500 hover:bg-sand hover:text-ink"
              >
                {ui.whatsapp[lang]}
              </a>
            </div>
          </div>
          <div className="hero-fade flex items-center gap-4 text-xs text-clay/70">
            <span>25.20° N, 55.27° E</span>
            <span className="h-px w-10 bg-clay/40" />
            <span>{ui.scroll[lang]}</span>
          </div>
        </div>
      </div>
      <span className="sr-only">{site.legalName}</span>
    </section>
  )
}
