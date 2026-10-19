'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { clips } from '@/lib/media'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion'
import { whatsappLink } from '@/lib/site'
import { createScrubber, isDesktop, sourceFor, videoAllowed, type Scrubber } from '@/lib/video'
import WhatsappMark from '@/components/whatsapp-mark'

export default function NightCta({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useGSAP(
    () => {
      const element = video.current!
      const q = gsap.utils.selector(root.current)
      if (!videoAllowed()) return
      const scrubbing = isDesktop()
      let scrubber: Scrubber | null = null
      let progress = 0
      const show = () => gsap.to(element, { opacity: 1, duration: 1, ease: 'power1.out' })

      ScrollTrigger.create({
        trigger: track.current,
        start: 'top bottom+=50%',
        end: 'bottom top',
        once: true,
        onEnter: () => {
          if (scrubbing) {
            scrubber = createScrubber(element, clips.creek.desktop, () => {
              show()
              scrubber?.seek(progress)
            })
          } else {
            element.src = sourceFor(clips.creek)
            element.addEventListener('playing', show, { once: true })
          }
        },
      })

      ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progress = self.progress
          scrubber?.seek(progress)
          gsap.set(q('.night-glow'), { opacity: progress })
        },
        onEnter: () => {
          if (!scrubbing) element.play().catch(() => {})
        },
      })

      return () => {
        scrubber?.destroy()
        element.pause()
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="night-title" className="relative bg-night text-sand">
      <div ref={track} className="relative h-[200svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <Image
            src={clips.creek.poster}
            alt={lang === 'tr' ? 'Gündüzden geceye geçerken Dubai Creek' : 'Dubai Creek as day turns into night'}
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: clips.creek.focus }}
          />
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            style={{ objectPosition: clips.creek.focus }}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,17,0.88)_0%,rgba(6,18,17,0.35)_40%,rgba(6,18,17,0.45)_70%,rgba(6,18,17,0.92)_100%)]" />
          <div className="night-glow starfield absolute inset-x-0 top-0 h-1/2 opacity-0" />

          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 sm:px-8 lg:px-12">
            <p className="eyebrow mb-8 text-clay/70" data-reveal>
              {home.night.eyebrow[lang]}
            </p>
            <h2 id="night-title" data-split className="max-w-[17ch] text-[clamp(2.4rem,6.4vw,6.6rem)] leading-[0.98] tracking-[-0.05em]">
              {home.night.title[lang]}
            </h2>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-clay/85 sm:text-lg" data-reveal>
              {home.night.body[lang]}
            </p>
            <div className="mt-12 flex flex-wrap gap-3" data-reveal>
              <a
                href={whatsappLink(ui.form.whatsappIntro[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-sand px-7 py-4 text-sm text-ink transition-colors duration-500 hover:bg-ember"
              >
                <WhatsappMark />
                {ui.whatsapp[lang]}
              </a>
              <Link
                href={href('contact', lang)}
                className="rounded-full border border-sand/30 px-7 py-4 text-sm backdrop-blur-sm transition-colors duration-500 hover:bg-sand hover:text-ink"
              >
                {ui.consult[lang]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
