'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { brands, type SunEvent } from '@/lib/content/brands'
import { home } from '@/lib/content/home'
import { clockIn, hoursBetween, useMinute } from '@/lib/clock'
import { href, type Lang } from '@/lib/i18n'
import { dubaiDayNumber, dubaiHour, elevationAt, equinox, formatClock, nextEquinox, solarDay, type SolarDay } from '@/lib/sun'

const DAY_MS = 86_400_000
const EVENTS: SunEvent[] = ['dawn', 'sunrise', 'noon', 'sunset']
const SYMBOLIC_INSTANT = equinox(2026, 'march')

type Frame = {
  id: string
  width: number
  height: number
  horizon: number
  up: number
  down: number
  from: number
  to: number
  ticks: number[]
  label: string
  className: string
}

const WIDE: Frame = {
  id: 'wide',
  width: 1200,
  height: 250,
  horizon: 186,
  up: 1.62,
  down: 0.42,
  from: 0,
  to: 24,
  ticks: [0, 6, 12, 18, 24],
  label: 'text-[16px]',
  className: 'hidden md:block',
}

const TALL: Frame = {
  id: 'tall',
  width: 600,
  height: 330,
  horizon: 262,
  up: 2.6,
  down: 0.9,
  from: 4,
  to: 20,
  ticks: [6, 12, 18],
  label: 'text-[22px]',
  className: 'md:hidden',
}

function DayChart({ frame, day, hour, live }: { frame: Frame; day: SolarDay; hour: number; live: boolean }) {
  const x = (h: number) => 24 + ((h - frame.from) / (frame.to - frame.from)) * (frame.width - 48)
  const y = (elevation: number) => frame.horizon - elevation * (elevation > 0 ? frame.up : frame.down)
  const points: string[] = []
  for (let minute = frame.from * 60; minute <= frame.to * 60; minute += 10) {
    const h = minute / 60
    points.push(`${x(h).toFixed(1)},${y(elevationAt(day, h)).toFixed(1)}`)
  }
  const path = `M${points.join('L')}`
  const at = Math.min(frame.to, Math.max(frame.from, hour))
  const elevation = elevationAt(day, at)
  const ids = { sky: `sky-${frame.id}`, glow: `glow-${frame.id}`, above: `above-${frame.id}`, below: `below-${frame.id}` }

  return (
    <svg viewBox={`0 0 ${frame.width} ${frame.height}`} className={`w-full overflow-visible ${frame.className}`} aria-hidden="true">
      <defs>
        <linearGradient id={ids.sky} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f2a65a" stopOpacity="0.32" />
          <stop offset="1" stopColor="#f2a65a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ids.glow}>
          <stop offset="0" stopColor="#ffe6bd" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#f2a65a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f2a65a" stopOpacity="0" />
        </radialGradient>
        <clipPath id={ids.above}>
          <rect x="0" y="-60" width={frame.width} height={frame.horizon + 60} />
        </clipPath>
        <clipPath id={ids.below}>
          <rect x="0" y={frame.horizon} width={frame.width} height={frame.height - frame.horizon} />
        </clipPath>
      </defs>
      <path
        d={`${path}L${x(frame.to)},${frame.horizon}L${x(frame.from)},${frame.horizon}Z`}
        fill={`url(#${ids.sky})`}
        clipPath={`url(#${ids.above})`}
      />
      <path d={path} fill="none" stroke="#f6f1ec" strokeOpacity="0.85" strokeWidth="1.5" clipPath={`url(#${ids.above})`} />
      <path d={path} fill="none" stroke="#f6f1ec" strokeOpacity="0.28" strokeDasharray="2 7" clipPath={`url(#${ids.below})`} />
      <line x1={x(frame.from)} x2={x(frame.to)} y1={frame.horizon} y2={frame.horizon} stroke="#f6f1ec" strokeOpacity="0.3" />
      {frame.ticks.map((tick) => (
        <text key={tick} x={x(tick)} y={frame.height - 2} textAnchor="middle" className={`fill-clay/45 ${frame.label}`}>
          {String(tick).padStart(2, '0')}
        </text>
      ))}
      {brands.map((brand) => {
        const time = day[brand.light.event]
        const top = Math.min(y(elevationAt(day, time)), frame.horizon)
        return (
          <g key={brand.key}>
            <line
              x1={x(time)}
              x2={x(time)}
              y1={top}
              y2={frame.horizon + 22}
              stroke={brand.light.glow}
              strokeOpacity="0.55"
              strokeDasharray="2 4"
            />
            <circle cx={x(time)} cy={top} r="4.5" fill={brand.light.glow} />
          </g>
        )
      })}
      {live ? (
        <g transform={`translate(${x(at).toFixed(1)} ${y(elevation).toFixed(1)})`}>
          <circle r="46" fill={`url(#${ids.glow})`} opacity={elevation > 0 ? 1 : 0.18} />
          <circle r="8" fill={elevation > 0 ? '#fff4e0' : '#ded5d1'} opacity={elevation > 0 ? 1 : 0.55} />
        </g>
      ) : null}
    </svg>
  )
}

function span(hours: number, lang: Lang) {
  const total = Math.max(0, Math.round(hours * 60))
  const h = Math.floor(total / 60)
  const m = total % 60
  return lang === 'tr' ? `${h} sa ${m} dk` : `${h} h ${m} min`
}

const longDate = (instant: number, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dubai',
  }).format(instant)

export default function DubaiToday({ lang }: { lang: Lang }) {
  const minute = useMinute()
  const live = minute > 0
  const now = live ? minute * 60_000 : SYMBOLIC_INSTANT
  const dayNumber = dubaiDayNumber(now)
  const copy = home.today

  const day = useMemo(() => solarDay(dayNumber * DAY_MS), [dayNumber])

  const hour = dubaiHour(now)
  const elevation = elevationAt(day, hour)
  const upcoming = EVENTS.find((event) => day[event] > hour)
  const nextEvent = upcoming ?? 'dawn'
  const untilNext = upcoming ? day[upcoming] - hour : 24 + solarDay((dayNumber + 1) * DAY_MS).dawn - hour
  const dubai = clockIn('Asia/Dubai', now)
  const istanbul = clockIn('Europe/Istanbul', now)
  const ahead = hoursBetween(dubai, istanbul)
  const equinoxAt = nextEquinox(dayNumber * DAY_MS - 4 * 3_600_000)
  const daysLeft = dubaiDayNumber(equinoxAt) - dayNumber
  const lit = Math.max(0, Math.min(1, elevation / 60))
  const show = (value: string) => (live ? value : '--:--')

  return (
    <section aria-labelledby="today-title" className="relative overflow-clip bg-night text-sand">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-[background] duration-[2s]"
        style={{
          background: `radial-gradient(55% 60% at ${((hour / 24) * 100).toFixed(1)}% 8%, rgba(242,166,90,${(0.04 + lit * 0.16).toFixed(3)}), transparent 70%)`,
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-clay/60" data-reveal>
              {copy.eyebrow[lang]}
            </p>
            <h2 id="today-title" data-split className="max-w-[16ch] text-[clamp(2.4rem,5.2vw,5rem)] leading-[0.98] tracking-[-0.045em]">
              {copy.title[lang]}
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-clay/75" data-reveal>
              {copy.lead[lang]}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-right" data-reveal>
            <p className="text-sm text-clay/60">{copy.clock[lang]}</p>
            <p className="tabular mt-2 text-[clamp(4rem,9vw,8.5rem)] font-extralight leading-[0.85] tracking-[-0.06em]">
              {show(dubai)}
            </p>
            <p className="mt-4 text-sm text-clay/70">
              {copy.istanbul[lang]} <span className="tabular text-sand">{show(istanbul)}</span>
              {live && ahead > 0 ? (
                <span className="text-clay/55">
                  {' · '}
                  {lang === 'tr' ? `Türkiye’den ${ahead} saat ileride` : `${ahead} ${ahead === 1 ? 'hour' : 'hours'} ahead of Türkiye`}
                </span>
              ) : null}
            </p>
          </div>
        </div>

        <div className="mt-14 lg:mt-20" data-reveal>
          <DayChart frame={WIDE} day={day} hour={hour} live={live} />
          <DayChart frame={TALL} day={day} hour={hour} live={live} />
        </div>

        <ol className="mt-12 grid grid-cols-2 gap-px bg-sand/10 lg:grid-cols-4">
          {EVENTS.map((event) => {
            const brand = brands.find((item) => item.light.event === event)!
            const isNext = live && event === nextEvent
            return (
              <li key={event} className="bg-night" data-reveal>
                <Link
                  href={href(brand.route, lang)}
                  className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden p-5 sm:p-6 lg:gap-10 lg:p-8"
                  data-cursor
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: `radial-gradient(80% 70% at 50% 110%, ${brand.light.glow}2e, transparent 70%)` }}
                  />
                  <span className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
                    <span className="flex items-center gap-3 text-clay/80">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: brand.light.glow, boxShadow: `0 0 14px 3px ${brand.light.glow}66` }}
                      />
                      {copy.events[event][lang]}
                    </span>
                    {isNext ? <span style={{ color: brand.light.glow }}>{copy.next[lang]}</span> : null}
                  </span>
                  <span className="relative block">
                    <span className="tabular block text-[clamp(2.2rem,4.2vw,3.8rem)] font-extralight leading-none tracking-[-0.05em]">
                      {show(formatClock(day[event]))}
                    </span>
                    <span className="mt-4 block text-sm text-clay/65">
                      {brand.light.name[lang]} ·{' '}
                      <span className="text-sand transition-colors duration-500 group-hover:text-ember">{brand.name}</span>
                    </span>
                    {isNext ? (
                      <span className="mt-2 block text-sm" style={{ color: brand.light.glow }}>
                        {span(untilNext, lang)} {copy.after[lang]}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>

        <div className="mt-10 flex flex-col gap-3 text-sm text-clay/70 sm:flex-row sm:flex-wrap sm:justify-between" data-reveal>
          <p>
            {copy.dayLength[lang]}: <span className="tabular text-sand">{live ? span(day.sunset - day.sunrise, lang) : '--'}</span>
          </p>
          <p>
            {daysLeft === 0 && live ? (
              <span className="text-ember">{copy.equinoxToday[lang]}</span>
            ) : (
              <>
                {copy.equinox[lang]}:{' '}
                <span className="text-sand">{live ? longDate(equinoxAt, lang) : '--'}</span>
                {live ? (
                  <>
                    {', '}
                    {copy.dubaiTime[lang]} <span className="tabular text-sand">{clockIn('Asia/Dubai', equinoxAt)}</span>
                    {' · '}
                    <span className="tabular text-ember">{daysLeft}</span> {copy.daysLeft[lang]}
                  </>
                ) : null}
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
