'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { brands } from '@/lib/content/brands'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { gsap, ScrollTrigger, scrollToY, useGSAP } from '@/lib/motion'
import { formatClock, sunOnArc } from '@/lib/sun'
import { createScrubber, isDesktop, sourceFor, videoAllowed, type Scrubber } from '@/lib/video'

const FORWARD_HOURS = [18.33, 32.5, 36.33, 53.83]
const NIGHT_DEPTH = [0.92, 0, 0.85]
const NOON_FLASH = [0, 0.32, 0]

const DIAL = { left: 24, right: 576, base: 112, height: 88 }
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const dialPoint = (hour: number) => {
  const { x, y } = sunOnArc(hour)
  return { x: DIAL.left + x * (DIAL.right - DIAL.left), y: DIAL.base - y * DIAL.height }
}

const screenSun = (hour: number) => {
  const { x, y } = sunOnArc(hour)
  return { x: clamp(8 + x * 84, -20, 120), y: clamp(70 - y * 48, 10, 120) }
}

export default function FourLights({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = root.current!
      const q = gsap.utils.selector(section)
      const layers = q('.light-layer') as HTMLElement[]
      const videos = q('.light-video') as HTMLVideoElement[]
      const panels = q('.light-panel') as HTMLElement[]
      const markers = q('.dial-marker') as HTMLElement[]
      const night = q('.light-night')[0] as HTMLElement
      const flash = q('.light-flash')[0] as HTMLElement
      const sun = section.querySelector<SVGGElement>('.dial-sun')!
      const clock = q('.light-clock') as HTMLElement[]
      const counter = q('.light-index')[0] as HTMLElement

      const motion = videoAllowed()
      const scrubbing = motion && isDesktop()
      const scrubbers: Scrubber[] = []
      let loaded = false
      let current = -1
      let visible = false
      let raw = 0

      const show = (video: HTMLVideoElement) => gsap.to(video, { opacity: 1, duration: 0.9, ease: 'power1.out' })

      const load = () => {
        if (loaded || !motion) return
        loaded = true
        videos.forEach((video, index) => {
          if (scrubbing) {
            scrubbers[index] = createScrubber(video, brands[index].clip.desktop, () => {
              show(video)
              scrubbers[index].seek(clamp(raw - index + 0.5))
            })
          } else {
            video.src = sourceFor(brands[index].clip)
            video.loop = true
            video.addEventListener('playing', () => show(video), { once: true })
          }
        })
        syncLoops()
      }

      const syncLoops = () => {
        if (scrubbing || !loaded) return
        videos.forEach((video, index) => {
          if (visible && index === current) video.play().catch(() => {})
          else video.pause()
        })
      }

      const update = (progress: number) => {
        raw = progress * 3
        const segment = Math.min(2, Math.floor(raw))
        const local = raw - segment
        const hold = 0.22
        const t = gsap.parseEase('power2.inOut')(clamp((local - hold) / (1 - hold * 2)))
        const active = segment + t
        const hour = FORWARD_HOURS[segment] + (FORWARD_HOURS[segment + 1] - FORWARD_HOURS[segment]) * t
        const bump = Math.sin(Math.PI * t)
        const origin = screenSun(hour)

        layers.forEach((layer, index) => {
          if (index === segment) {
            layer.style.visibility = 'visible'
            layer.style.zIndex = '1'
            layer.style.clipPath = 'none'
          } else if (index === segment + 1 && t > 0) {
            layer.style.visibility = 'visible'
            layer.style.zIndex = '2'
            layer.style.clipPath = `circle(${(t * 160).toFixed(2)}% at ${origin.x.toFixed(1)}% ${origin.y.toFixed(1)}%)`
          } else {
            layer.style.visibility = 'hidden'
          }
        })
        night.style.opacity = (NIGHT_DEPTH[segment] * Math.pow(bump, 1.2)).toFixed(3)
        flash.style.opacity = (NOON_FLASH[segment] * bump).toFixed(3)

        if (scrubbing) scrubbers.forEach((scrubber, index) => scrubber?.seek(clamp(raw - index + 0.5)))

        const nearest = Math.round(active)
        if (nearest !== current) {
          current = nearest
          syncLoops()
          counter.textContent = `0${nearest + 1}`
          section.style.setProperty('--light', brands[nearest].light.glow)
          markers.forEach((marker, index) => {
            marker.dataset.active = index === nearest ? 'true' : 'false'
          })
        }

        panels.forEach((panel, index) => {
          const distance = active - index
          const visibility = clamp(1 - Math.abs(distance) * 2.4)
          panel.style.opacity = visibility.toFixed(3)
          panel.style.transform = `translate3d(0, ${(-distance * 48).toFixed(1)}px, 0)`
          panel.inert = visibility <= 0.6
        })

        const point = dialPoint(hour)
        sun.setAttribute('transform', `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`)
        const time = formatClock(hour)
        for (const node of clock) node.textContent = time
      }

      update(0)
      ScrollTrigger.create({
        trigger: track.current,
        start: 'top bottom+=60%',
        end: 'bottom top',
        onToggle: (self) => {
          visible = self.isActive
          if (visible) load()
          syncLoops()
        },
      })
      ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => update(self.progress),
      })

      return () => {
        scrubbers.forEach((scrubber) => scrubber?.destroy())
        videos.forEach((video) => {
          video.pause()
          video.removeAttribute('src')
          video.load()
        })
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
      <div ref={track} className="light-track relative h-[420svh]">
        <div className="light-stage sticky top-0 h-svh overflow-hidden">
          {brands.map((brand, index) => (
            <div
              key={brand.key}
              className="light-layer absolute inset-0"
              style={{ visibility: index === 0 ? 'visible' : 'hidden', zIndex: index === 0 ? 1 : 0 }}
            >
              <Image
                src={brand.clip.poster}
                alt={brand.imageAlt[lang]}
                fill
                sizes="100vw"
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: brand.clip.focus }}
              />
              <video
                className="light-video absolute inset-0 h-full w-full object-cover opacity-0"
                style={{ objectPosition: brand.clip.focus }}
                muted
                playsInline
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          ))}
          <div className="light-flash pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(80%_70%_at_50%_30%,rgba(255,252,240,0.9),rgba(255,246,225,0.4)_45%,transparent_75%)] opacity-0 mix-blend-screen" />
          <div className="light-night pointer-events-none absolute inset-0 z-[3] opacity-0">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#030a14_0%,#071623_55%,#0c1f24_100%)] opacity-90" />
            <div className="starfield absolute inset-0" />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(90deg,rgba(6,18,17,0.72)_0%,rgba(6,18,17,0.3)_45%,rgba(6,18,17,0)_70%),linear-gradient(0deg,rgba(6,18,17,0.78)_0%,rgba(6,18,17,0)_45%),linear-gradient(180deg,rgba(6,18,17,0.5)_0%,rgba(6,18,17,0)_22%)]" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-5 pb-8 pt-22 sm:px-8 lg:px-12 lg:pb-12 lg:pt-28">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
              <div>
                <p className="eyebrow text-clay/75">{home.lights.eyebrow[lang]}</p>
                <h2 id="lights-title" className="mt-3 max-w-[22ch] text-[clamp(1.3rem,2.2vw,2.1rem)] leading-tight text-sand/95">
                  {home.lights.title[lang]}
                </h2>
              </div>
              <div className="w-full shrink-0 md:w-[min(44vw,460px)]">
                <div className="flex items-baseline justify-between text-[0.6875rem] text-clay/60">
                  <span>
                    {home.lights.place[lang]} <span className="light-clock tabular ml-1 text-base text-sand">18:20</span>
                  </span>
                  <span className="tabular text-base text-clay/80">
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
                        className="dial-marker group absolute top-0 -translate-x-1/2 whitespace-nowrap text-[0.6875rem] text-clay/55 transition-colors hover:text-sand data-[active=true]:text-sand"
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

            <div className="light-panels relative mt-4 flex-1">
              {brands.map((brand, index) => (
                <article
                  key={brand.key}
                  className="light-panel absolute inset-x-0 bottom-0 max-w-2xl will-change-transform"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                  inert={index !== 0}
                >
                  <p className="flex items-center gap-3 text-xs" style={{ color: brand.light.glow }}>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: brand.light.glow, boxShadow: `0 0 18px 4px ${brand.light.glow}66` }}
                    />
                    {brand.light.name[lang]}
                    <span className="tabular text-clay/60">{brand.light.time}</span>
                  </p>
                  <h3 className="mt-3 text-[clamp(2.2rem,min(6.6vw,10svh),6.4rem)] leading-[0.95] tracking-[-0.055em]">
                    {brand.name}
                  </h3>
                  <p className="mt-2 text-xs text-clay/70">{ui.byEquinoz}</p>
                  <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-clay/90 sm:text-base">{brand.tagline[lang]}</p>
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
