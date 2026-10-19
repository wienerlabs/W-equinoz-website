'use client'

import Image, { type StaticImageData } from 'next/image'
import { useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP, whenIntroDone } from '@/lib/motion'
import { Stage, hexToRgb } from '@/lib/stage'

export default function LightHero({
  image,
  alt,
  focus,
  glow,
  eyebrow,
  title,
  children,
}: {
  image: StaticImageData
  alt: string
  focus: string
  glow: string
  eyebrow: ReactNode
  title: string
  children?: ReactNode
}) {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const section = root.current!
      const q = gsap.utils.selector(section)
      const [fx, fy] = focus.split(' ').map((part) => parseFloat(part) / 100)
      let stage: Stage | null = null
      if (Stage.supported()) {
        try {
          stage = new Stage(
            canvas.current!,
            [{ src: image.src, width: image.width, height: image.height, focus: [fx, fy] }],
            window.innerWidth > 900 ? 1920 : 1080,
          )
          stage.state.flare = 1
          stage.state.tint = hexToRgb(glow)
          stage.onReady = () => gsap.to(canvas.current, { opacity: 1, duration: 1.2 })
          stage.onLost = () => gsap.to(canvas.current, { opacity: 0, duration: 0.6 })
        } catch {
          stage = null
        }
      }
      const move = (event: PointerEvent) =>
        stage?.pointer((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1)
      window.addEventListener('pointermove', move, { passive: true })

      const split = SplitText.create(q('.hero-title'), { type: 'lines', mask: 'lines' })
      gsap.set(split.lines, { yPercent: 110 })
      gsap.set(q('.hero-title'), { visibility: 'visible' })
      const stop = whenIntroDone(() => {
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
      gsap.to(q('.hero-copy'), {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          if (stage) stage.state.night = self.progress * 0.7
        },
      })
      return () => {
        stop()
        window.removeEventListener('pointermove', move)
        stage?.destroy()
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-[92svh] min-h-[600px] overflow-hidden bg-night text-sand">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="scale-[1.06] object-cover"
        style={{ objectPosition: focus, transformOrigin: focus }}
      />
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,17,0.5)_0%,rgba(6,18,17,0.05)_35%,rgba(6,18,17,0.35)_65%,rgba(6,18,17,0.9)_100%)]" />
      <div
        aria-hidden="true"
        className="hero-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-0 mix-blend-screen"
        style={{ background: `linear-gradient(100deg, transparent 20%, ${glow}55 50%, transparent 80%)` }}
      />
      <div className="hero-copy relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <div className="hero-fade mb-6 text-sm">{eyebrow}</div>
        <h1 className="hero-title max-w-[16ch] text-[clamp(2.7rem,7.4vw,7.6rem)] leading-[0.92] tracking-[-0.035em]">{title}</h1>
        {children ? <div className="hero-fade mt-8 max-w-2xl">{children}</div> : null}
      </div>
    </section>
  )
}
