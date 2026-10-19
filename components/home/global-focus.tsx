'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { brandByKey } from '@/lib/content/brands'
import { home } from '@/lib/content/home'
import { services } from '@/lib/content/services'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { gsap, useGSAP } from '@/lib/motion'

export default function GlobalFocus({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const global = brandByKey('global')

  useGSAP(
    () => {
      if (!window.matchMedia('(pointer: fine)').matches) return
      const section = root.current!
      const frame = media.current!
      const images = gsap.utils.toArray<HTMLElement>('.focus-image', frame)
      const x = gsap.quickTo(frame, 'x', { duration: 0.8, ease: 'power3.out' })
      const y = gsap.quickTo(frame, 'y', { duration: 0.8, ease: 'power3.out' })
      const move = (event: PointerEvent) => {
        const box = section.getBoundingClientRect()
        x(event.clientX - box.left)
        y(event.clientY - box.top)
      }
      section.addEventListener('pointermove', move)
      const rows = gsap.utils.toArray<HTMLElement>('.focus-row', section)
      const handlers = rows.map((row, index) => {
        const enter = () => {
          images.forEach((image, imageIndex) => gsap.to(image, { opacity: imageIndex === index ? 1 : 0, duration: 0.5 }))
          gsap.to(frame, { clipPath: 'circle(50% at 50% 50%)', duration: 0.9, ease: 'expo.out' })
        }
        const leave = () => gsap.to(frame, { clipPath: 'circle(0% at 50% 50%)', duration: 0.7, ease: 'expo.out' })
        row.addEventListener('pointerenter', enter)
        row.addEventListener('pointerleave', leave)
        return () => {
          row.removeEventListener('pointerenter', enter)
          row.removeEventListener('pointerleave', leave)
        }
      })
      return () => {
        section.removeEventListener('pointermove', move)
        handlers.forEach((dispose) => dispose())
      }
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="global-title"
      className="relative overflow-clip bg-[radial-gradient(120%_70%_at_80%_110%,#5b2a1a_0%,#2a1410_38%,#0d0a09_75%)] text-sand"
    >
      <div
        ref={media}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 -ml-[11rem] -mt-[11rem] hidden h-[22rem] w-[22rem] overflow-hidden rounded-full [clip-path:circle(0%_at_50%_50%)] lg:block"
      >
        {services.map((service, index) => (
          <Image
            key={service.key}
            src={service.image}
            alt=""
            fill
            sizes="22rem"
            className="focus-image object-cover"
            style={{ objectPosition: service.focus, opacity: index === 0 ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(242,166,90,0)_40%,rgba(242,166,90,0.35)_100%)] mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6 flex items-center gap-3" style={{ color: global.light.glow }} data-reveal>
              <span className="h-2 w-2 rounded-full" style={{ background: global.light.glow }} />
              {home.global.eyebrow[lang]} · {global.name}
            </p>
            <h2 id="global-title" data-split className="text-[clamp(2.6rem,6vw,6rem)] leading-[0.95] tracking-[-0.035em]">
              {home.global.title[lang]}
            </h2>
          </div>
          <p data-reveal className="self-end text-lg leading-relaxed text-clay/85 lg:col-span-5 lg:col-start-8">
            {home.global.body[lang]}
          </p>
        </div>

        <ol className="mt-20 border-t border-sand/15">
          {services.map((service) => (
            <li key={service.key} data-reveal>
              <Link
                href={href(service.route, lang)}
                data-cursor
                className="focus-row group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-b border-sand/15 py-7 transition-colors duration-500 hover:text-ember sm:grid-cols-[4rem_1fr_auto] lg:grid-cols-[6rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:py-9"
              >
                <span className="font-display text-sm text-clay/50">{service.number}</span>
                <span className="font-display text-[clamp(1.5rem,3.2vw,2.9rem)] leading-[1.05] tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3">
                  {service.title[lang]}
                </span>
                <span className="hidden text-clay/70 lg:block">{global.services.find((item) => item.route === service.route)?.text[lang]}</span>
                <span className="text-xl transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-6" data-reveal>
          <Link
            href={href('global', lang)}
            className="rounded-full bg-sand px-6 py-3.5 text-[0.9375rem] text-ink transition-colors duration-500 hover:bg-ember"
          >
            {global.name}
          </Link>
          <p className="text-sm text-clay/60">{ui.pricingNote[lang]}</p>
        </div>
      </div>
    </section>
  )
}
