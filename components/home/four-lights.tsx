'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { brands } from '@/lib/content/brands'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToY, useGSAP } from '@/lib/motion'
import { Stage } from '@/lib/stage'
import { formatClock, sunOnArc } from '@/lib/sun'

const FORWARD_HOURS = [18.33, 32.5, 36.33, 53.83]
const SEGMENTS = [
  { night: 0.92, tint: [0.62, 0.7, 1] as [number, number, number], bloom: 0 },
  { night: 0, tint: [1, 0.97, 0.9] as [number, number, number], bloom: 0.16 },
  { night: 0.85, tint: [0.95, 0.62, 0.55] as [number, number, number], bloom: 0 },
]
const SCENE = {
  global: { horizon: 0.71, water: 0.8 },
  consulting: { horizon: -1, water: 0 },
  accounting: { horizon: -1, water: 0 },
  education: { horizon: 0.93, water: 0 },
} as const

const DIAL = { left: 24, right: 576, base: 112, height: 88 }
const dialPoint = (hour: number) => {
  const { x, y } = sunOnArc(hour)
  return { x: DIAL.left + x * (DIAL.right - DIAL.left), y: DIAL.base - y * DIAL.height }
}

const parseFocus = (focus: string): [number, number] => {
  const [x, y] = focus.split(' ').map((part) => parseFloat(part) / 100)
  return [x, y]
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export default function FourLights({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root.current)
      const panels = q('.light-panel') as HTMLElement[]
      const photos = q('.light-photo') as HTMLElement[]
      const sun = root.current!.querySelector<SVGGElement>('.dial-sun')!
      const clock = q('.light-clock') as HTMLElement[]
      const counter = q('.light-index')[0] as HTMLElement
      const markers = q('.dial-marker') as HTMLElement[]
      let stage: Stage | null = null

      if (!prefersReducedMotion() && Stage.supported()) {
        try {
          stage = new Stage(
            canvas.current!,
            brands.map((brand) => ({
              src: brand.image.src,
              width: brand.image.width,
              height: brand.image.height,
              focus: parseFocus(brand.focus),
              horizon: SCENE[brand.key].horizon,
              water: SCENE[brand.key].water,
            })),
            window.innerWidth > 900 ? 1920 : 1080,
          )
          stage.zoom = 1.08
          stage.onReady = () => {
            gsap.to(canvas.current, { opacity: 1, duration: 1.2 })
            gsap.to(photos, { opacity: 0, duration: 1.2, delay: 0.4 })
          }
        } catch {
          stage = null
        }
      }

      const move = (event: PointerEvent) =>
        stage?.pointer((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1)
      window.addEventListener('pointermove', move, { passive: true })

      const update = (progress: number) => {
        const raw = progress * 3
        const segment = Math.min(2, Math.floor(raw))
        const local = raw - segment
        const hold = 0.22
        const t = gsap.parseEase('power2.inOut')(clamp((local - hold) / (1 - hold * 2)))
        const active = segment + t
        const hour = FORWARD_HOURS[segment] + (FORWARD_HOURS[segment + 1] - FORWARD_HOURS[segment]) * t
        const bump = Math.sin(Math.PI * t)

        if (stage) {
          stage.state.a = segment
          stage.state.b = segment + 1
          stage.state.mix = t
          stage.state.night = SEGMENTS[segment].night * Math.pow(bump, 1.2)
          stage.state.tint = SEGMENTS[segment].tint
          stage.state.tintAmount = SEGMENTS[segment].bloom * bump
        } else {
          photos.forEach((photo, index) => {
            photo.style.opacity = String(clamp(1 - Math.abs(active - index)))
          })
        }

        panels.forEach((panel, index) => {
          const distance = active - index
          const visibility = clamp(1 - Math.abs(distance) * 2.4)
          panel.style.opacity = String(visibility)
          panel.style.transform = `translate3d(0, ${(-distance * 48).toFixed(1)}px, 0)`
          panel.style.pointerEvents = visibility > 0.6 ? 'auto' : 'none'
          panel.setAttribute('aria-hidden', visibility > 0.6 ? 'false' : 'true')
        })

        markers.forEach((marker, index) => {
          marker.dataset.active = Math.round(active) === index ? 'true' : 'false'
        })

        const point = dialPoint(hour)
        sun.setAttribute('transform', `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`)
        const time = formatClock(hour)
        for (const node of clock) node.textContent = time
        counter.textContent = `0${Math.round(active) + 1}`
        root.current!.style.setProperty('--light', brands[Math.round(active)].light.glow)
      }

      update(0)
      ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => update(self.progress),
      })

      return () => {
        window.removeEventListener('pointermove', move)
        stage?.destroy()
      }
    },
    { scope: root },
  )

  const goTo = (index: number) => {
    const element = track.current
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    scrollToY(top + (index / 3) * (element.offsetHeight - window.innerHeight))
  }

  return (
    <section
      ref={root}
      aria-labelledby="lights-title"
      className="relative bg-night text-sand"
      style={{ ['--light' as string]: brands[0].light.glow }}
    >
      <div ref={track} className="relative h-[420svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          {brands.map((brand, index) => (
            <Image
              key={brand.key}
              src={brand.image}
              alt={brand.imageAlt[lang]}
              fill
              sizes="100vw"
              placeholder="blur"
              className="light-photo object-cover"
              style={{ objectPosition: brand.focus, opacity: index === 0 ? 1 : 0 }}
            />
          ))}
          <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-0" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,18,17,0.78)_0%,rgba(6,18,17,0.35)_45%,rgba(6,18,17,0)_70%),linear-gradient(0deg,rgba(6,18,17,0.75)_0%,rgba(6,18,17,0)_42%)]" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-5 pb-8 pt-22 sm:px-8 lg:px-12 lg:pb-12 lg:pt-28">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
              <div>
                <p className="eyebrow text-clay/75">{home.lights.eyebrow[lang]}</p>
                <h2 id="lights-title" className="mt-3 max-w-[22ch] text-[clamp(1.4rem,2.4vw,2.3rem)] leading-tight text-sand/95">
                  {home.lights.title[lang]}
                </h2>
              </div>
              <div className="w-full shrink-0 md:w-[min(44vw,460px)]">
                <div className="flex items-baseline justify-between text-xs text-clay/60">
                  <span>
                    {home.lights.place[lang]} <span className="light-clock ml-1 font-display text-lg text-sand">18:20</span>
                  </span>
                  <span className="font-display text-lg text-clay/80">
                    <span className="light-index">01</span>
                    <span className="text-clay/40"> / 04</span>
                  </span>
                </div>
                <svg viewBox="0 0 600 132" className="mt-1 w-full overflow-visible" aria-hidden="true">
                  <defs>
                    <clipPath id="dial-sky">
                      <rect x="0" y="-30" width="600" height="158" />
                    </clipPath>
                    <radialGradient id="dial-glow">
                      <stop offset="0%" stopColor="#fff6e6" />
                      <stop offset="45%" style={{ stopColor: 'var(--light)' }} />
                      <stop offset="100%" style={{ stopColor: 'var(--light)', stopOpacity: 0 }} />
                    </radialGradient>
                  </defs>
                  <path
                    d={`M ${DIAL.left} ${DIAL.base} A ${(DIAL.right - DIAL.left) / 2} ${DIAL.height} 0 0 1 ${DIAL.right} ${DIAL.base}`}
                    fill="none"
                    stroke="rgba(222,213,209,0.4)"
                    strokeDasharray="2 6"
                  />
                  <line x1="0" x2="600" y1={DIAL.base} y2={DIAL.base} stroke="rgba(222,213,209,0.5)" />
                  <g clipPath="url(#dial-sky)">
                    <g className="dial-sun" transform={`translate(${DIAL.right} ${DIAL.base})`}>
                      <circle r="26" fill="url(#dial-glow)" opacity="0.75" />
                      <circle r="7" fill="#fff4e2" />
                    </g>
                  </g>
                </svg>
                <div className="relative h-9">
                  {brands.map((brand, index) => {
                    const point = dialPoint(brand.light.hour)
                    return (
                      <button
                        key={brand.key}
                        type="button"
                        onClick={() => goTo(index)}
                        data-active={index === 0 ? 'true' : 'false'}
                        aria-label={`${brand.name}, ${brand.light.name[lang]} ${brand.light.time}`}
                        className="dial-marker group absolute top-0 -translate-x-1/2 whitespace-nowrap text-[0.75rem] text-clay/55 transition-colors hover:text-sand data-[active=true]:text-sand"
                        style={{ left: `${(clamp(point.x, 36, 564) / 600) * 100}%` }}
                      >
                        <span
                          className="mx-auto mb-1 block h-1.5 w-1.5 rounded-full transition-transform group-data-[active=true]:scale-150"
                          style={{ background: brand.light.glow }}
                        />
                        <span className="hidden sm:inline">{brand.short}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="relative mt-4 flex-1">
              {brands.map((brand, index) => (
                <article
                  key={brand.key}
                  className="light-panel absolute inset-x-0 bottom-0 max-w-2xl will-change-transform"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                  aria-hidden={index === 0 ? 'false' : 'true'}
                >
                  <p className="flex items-center gap-3 text-sm" style={{ color: brand.light.glow }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: brand.light.glow, boxShadow: `0 0 18px 4px ${brand.light.glow}66` }} />
                    {brand.light.name[lang]}
                    <span className="text-clay/60">{brand.light.time}</span>
                  </p>
                  <h3 className="mt-3 text-[clamp(2.4rem,min(7.4vw,11svh),7rem)] leading-[0.92] tracking-[-0.035em]">
                    {brand.name}
                  </h3>
                  <p className="mt-2 text-sm text-clay/70">{ui.byEquinoz}</p>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-clay/90 sm:text-lg">{brand.tagline[lang]}</p>
                  <Link
                    href={href(brand.route, lang)}
                    className="group mt-6 inline-flex items-center gap-3 rounded-full border border-sand/30 py-3 pl-5 pr-4 text-sm backdrop-blur-sm transition-colors duration-500 hover:bg-sand hover:text-ink"
                  >
                    {ui.explore[lang]}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
