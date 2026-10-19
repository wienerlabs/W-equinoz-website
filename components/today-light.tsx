'use client'

import type { Brand } from '@/lib/content/brands'
import { home } from '@/lib/content/home'
import { useMinute } from '@/lib/clock'
import type { Lang } from '@/lib/i18n'
import { formatClock, solarDay } from '@/lib/sun'

export default function TodayLight({ brand, lang }: { brand: Brand; lang: Lang }) {
  const minute = useMinute()
  const event = brand.light.event
  const time = minute > 0 ? formatClock(solarDay(minute * 60_000)[event]) : '--:--'
  const rows = [
    { label: home.today.todayIn[lang], value: time, color: undefined },
    { label: home.today.onEquinox[lang], value: brand.light.time, color: brand.light.accent },
  ]
  return (
    <div className="mt-10 max-w-[17rem]" data-reveal>
      <p className="flex items-center gap-2.5 text-sm text-ink/70">
        <span className="h-2 w-2 rounded-full" style={{ background: brand.light.glow, boxShadow: `0 0 12px 3px ${brand.light.glow}88` }} />
        {home.today.events[event][lang]}
      </p>
      <dl className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="text-sm text-ink/55">{row.label}</dt>
            <dd className="tabular text-[1.75rem] font-extralight leading-none tracking-[-0.04em]" style={{ color: row.color }}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
