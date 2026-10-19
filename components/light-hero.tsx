'use client'

import Image, { type StaticImageData } from 'next/image'
import { useRef, type ReactNode } from 'react'
import AmbientVideo from '@/components/ambient-video'
import type { Clip } from '@/lib/media'
import { gsap, prefersReducedMotion, SplitText, useGSAP, whenIntroDone } from '@/lib/motion'

export default function LightHero({
  clip,
  image,
  alt,
  focus = '50% 50%',
  glow,
  eyebrow,
  title,
  children,
}: {
  clip?: Clip
  image?: StaticImageData
  alt: string
  focus?: string
  glow: string
  eyebrow: ReactNode
  title: string
  children?: ReactNode
}) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const section = root.current!
      const q = gsap.utils.selector(section)
      const entrance = gsap.context(() => {}, section)
      let stop = () => {}
      let cancelled = false
      gsap.set(q('.hero-media'), { scale: 1.1 })
      document.fonts.ready.then(() => {
        if (cancelled) return
        entrance.add(() => {
          const split = SplitText.create(q('.hero-title'), { type: 'lines', mask: 'lines' })
          gsap.set(split.lines, { yPercent: 110 })
          gsap.set(q('.hero-title'), { visibility: 'visible' })
          stop = whenIntroDone(() => {
            gsap.to(q('.hero-media'), { scale: 1, duration: 2.4, ease: 'expo.out' })
            gsap.to(split.lines, { yPercent: 0, duration: 1.5, ease: 'expo.out', stagger: 0.1, delay: 0.1 })
            gsap.fromTo(
              q('.hero-fade'),
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: 0.08, delay: 0.3 },
            )
            gsap.fromTo(
              q('.hero-sweep'),
              { xPercent: -120, opacity: 0.7 },
              { xPercent: 220, opacity: 0, duration: 2.4, ease: 'power2.inOut', delay: 0.2 },
            )
          })
        })
      })
      const scroll = { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('.hero-parallax'), { yPercent: 16, ease: 'none', scrollTrigger: scroll })
      gsap.to(q('.hero-dusk'), { opacity: 0.7, ease: 'none', scrollTrigger: scroll })
      gsap.to(q('.hero-copy'), { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: scroll })
      return () => {
        cancelled = true
        stop()
        entrance.revert()
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-[92svh] min-h-[600px] overflow-hidden bg-night text-sand">
      <div className="hero-parallax absolute inset-0">
        <div className="hero-media absolute inset-0">
          {clip ? (
            <AmbientVideo clip={clip} alt={alt} priority />
          ) : image ? (
            <Image
              src={image}
              alt={alt}
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: focus }}
            />
          ) : null}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,17,0.5)_0%,rgba(6,18,17,0.05)_35%,rgba(6,18,17,0.35)_65%,rgba(6,18,17,0.92)_100%)]" />
      <div className="hero-dusk pointer-events-none absolute inset-0 bg-night opacity-0" />
      <div
        aria-hidden="true"
        className="hero-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-0 mix-blend-screen"
        style={{ background: `linear-gradient(100deg, transparent 20%, ${glow}55 50%, transparent 80%)` }}
      />
      <div className="hero-copy relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <div className="hero-fade mb-6 text-xs">{eyebrow}</div>
        <h1 className="hero-title max-w-[18ch] text-[clamp(2.4rem,6.6vw,6.8rem)] leading-[0.96] tracking-[-0.055em]">{title}</h1>
        {children ? <div className="hero-fade mt-8 max-w-2xl">{children}</div> : null}
      </div>
    </section>
  )
}
