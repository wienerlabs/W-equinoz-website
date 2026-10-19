'use client'

import Link from 'next/link'
import { useRef } from 'react'
import AmbientVideo from '@/components/ambient-video'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { clips } from '@/lib/media'
import { gsap, prefersReducedMotion, SplitText, useGSAP, whenIntroDone } from '@/lib/motion'
import { site, whatsappLink } from '@/lib/site'
import WhatsappMark from '@/components/whatsapp-mark'

export default function Hero({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const section = root.current!
      const q = gsap.utils.selector(section)
      const entrance = gsap.context(() => {}, section)
      let stop = () => {}
      let cancelled = false
      gsap.set(q('.hero-media'), { scale: 1.08 })
      document.fonts.ready.then(() => {
        if (cancelled) return
        entrance.add(() => {
          const title = SplitText.create(q('.hero-title'), { type: 'lines', mask: 'lines' })
          gsap.set(title.lines, { yPercent: 110 })
          gsap.set(q('.hero-title'), { visibility: 'visible' })
          stop = whenIntroDone(() => {
            gsap.to(q('.hero-media'), { scale: 1, duration: 2.6, ease: 'expo.out' })
            gsap.to(title.lines, { yPercent: 0, duration: 1.6, ease: 'expo.out', stagger: 0.12, delay: 0.1 })
            gsap.fromTo(
              q('.hero-fade'),
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.1, delay: 0.45 },
            )
          })
        })
      })
      const scroll = { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('.hero-parallax'), { yPercent: 14, ease: 'none', scrollTrigger: scroll })
      gsap.to(q('.hero-dusk'), { opacity: 0.75, ease: 'none', scrollTrigger: scroll })
      gsap.to(q('.hero-copy'), { yPercent: -24, opacity: 0, ease: 'none', scrollTrigger: scroll })
      return () => {
        cancelled = true
        stop()
        entrance.revert()
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-svh min-h-[620px] overflow-hidden bg-night">
      <div className="hero-parallax absolute inset-0">
        <div className="hero-media absolute inset-0">
          <AmbientVideo
            clip={clips.hero}
            priority
            alt={
              lang === 'tr'
                ? 'Güneşin ufka oturduğu anda Dubai silueti ve Burj Khalifa'
                : 'The Dubai skyline and the Burj Khalifa as the sun sits on the horizon'
            }
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,17,0.55)_0%,rgba(6,18,17,0)_30%,rgba(6,18,17,0)_55%,rgba(6,18,17,0.85)_100%),linear-gradient(90deg,rgba(6,18,17,0.45)_0%,rgba(6,18,17,0.12)_45%,rgba(6,18,17,0)_65%)]" />
      <div className="hero-dusk pointer-events-none absolute inset-0 bg-night opacity-0" />

      <div className="hero-copy relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-36">
        <div>
          <p className="hero-fade eyebrow mb-6 text-clay/80">{home.hero.eyebrow[lang]}</p>
          <h1
            lang="en"
            className="hero-title text-[clamp(2.9rem,8.4vw,8.6rem)] leading-[0.92] tracking-[-0.055em] text-sand"
          >
            Global Vision.
            <br />
            <span className="serif-accent text-[1.08em] text-[#fde9cf] [text-shadow:0_2px_40px_rgba(6,18,17,0.5)]">
              Preserving Legacy.
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="hero-fade text-base leading-relaxed text-sand/90 [text-shadow:0_1px_24px_rgba(6,18,17,0.6)] sm:text-[1.0625rem]">
              {home.hero.lead[lang]}
            </p>
            <div className="hero-fade mt-8 flex flex-wrap gap-3">
              <Link
                href={href('contact', lang)}
                className="rounded-full bg-sand px-6 py-3.5 text-sm text-ink transition-colors duration-500 hover:bg-ember"
              >
                {ui.consult[lang]}
              </Link>
              <a
                href={whatsappLink(ui.form.whatsappIntro[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-sand/30 px-6 py-3.5 text-sm text-sand backdrop-blur-sm transition-colors duration-500 hover:bg-sand hover:text-ink"
              >
                <WhatsappMark />
                {ui.whatsapp[lang]}
              </a>
            </div>
          </div>
          <div className="hero-fade flex items-center gap-4 text-[0.6875rem] text-clay/70">
            <span className="tabular">25.20° N, 55.27° E</span>
            <span className="h-px w-10 bg-clay/40" />
            <span>{ui.scroll[lang]}</span>
          </div>
        </div>
      </div>
      <span className="sr-only">{site.legalName}</span>
    </section>
  )
}
