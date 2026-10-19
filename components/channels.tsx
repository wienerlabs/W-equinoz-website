'use client'

import WhatsappMark from '@/components/whatsapp-mark'
import { clockIn, useMinute } from '@/lib/clock'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { site, whatsappLink } from '@/lib/site'

const card =
  'group relative flex h-full flex-col justify-between gap-8 overflow-hidden bg-sand p-7 transition-colors duration-700 hover:bg-[#fbf8f5] sm:min-h-[15rem] sm:gap-10 lg:p-9'

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
      →
    </span>
  )
}

export default function Channels({ lang }: { lang: Lang }) {
  const minute = useMinute()
  const copy = home.contact.channels
  const source = new URL(href('contact', lang), site.url).toString()
  const message = `${ui.form.whatsappIntro[lang]}\n${ui.form.sourceLabel[lang]}: ${source}`
  const time = (zone: string) => (minute > 0 ? clockIn(zone, minute * 60_000) : '--:--')

  return (
    <section data-theme="light" aria-label={copy.eyebrow[lang]} className="bg-sand text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <p className="eyebrow mb-10 text-ink/55" data-reveal>
          {copy.eyebrow[lang]}
        </p>
        <ul className="grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 xl:grid-cols-4">
          <li data-reveal>
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={card}>
              <span className="flex items-center justify-between">
                <WhatsappMark className="h-7 w-7" />
                <Arrow />
              </span>
              <span>
                <span className="block text-sm text-ink/55">WhatsApp</span>
                <span className="tabular mt-2 block whitespace-nowrap text-[1.5rem] leading-tight tracking-[-0.03em]">
                  {site.whatsapp.display}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-ink/60">{copy.whatsapp[lang]}</span>
              </span>
            </a>
          </li>
          <li data-reveal>
            <a href="#consultation" className={card}>
              <span className="flex items-center justify-between">
                <span aria-hidden="true" className="h-7 w-7 rounded-full border border-ink/25" />
                <Arrow />
              </span>
              <span>
                <span className="block text-sm text-ink/55">{copy.form[lang]}</span>
                <span className="mt-2 block text-[1.5rem] leading-tight tracking-[-0.03em]">
                  {ui.consultShort[lang]}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-ink/60">{copy.formText[lang]}</span>
              </span>
            </a>
          </li>
          <li data-reveal>
            <a href={`mailto:${site.email}`} className={card}>
              <span className="flex items-center justify-between">
                <span aria-hidden="true" className="text-[1.6rem] leading-none text-ink/40">@</span>
                <Arrow />
              </span>
              <span>
                <span className="block text-sm text-ink/55">{ui.email[lang]}</span>
                <span className="mt-2 block break-words text-[1.5rem] leading-tight tracking-[-0.03em]">
                  {site.email}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-ink/60">{copy.email[lang]}</span>
              </span>
            </a>
          </li>
          <li data-reveal>
            <div className={card}>
              <span className="flex items-center gap-3 text-sm text-ink/55">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ember/60 motion-reduce:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-ember" />
                </span>
                {site.city[lang]}
              </span>
              <span>
                <span className="block text-sm text-ink/55">{copy.time[lang]}</span>
                <span className="tabular mt-2 block text-[clamp(2.4rem,3.6vw,3.2rem)] font-extralight leading-none tracking-[-0.05em]">
                  {time('Asia/Dubai')}
                </span>
                <span className="mt-3 block text-sm text-ink/60">
                  {home.today.istanbul[lang]} <span className="tabular text-ink">{time('Europe/Istanbul')}</span>
                </span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
