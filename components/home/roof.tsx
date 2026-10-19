import RoofMark from '@/components/home/roof-mark'
import { home } from '@/lib/content/home'
import type { Lang } from '@/lib/i18n'

const REGIONS = [
  { lon: -75, label: { tr: 'Amerika', en: 'Americas' } },
  { lon: 12, label: { tr: 'Avrupa', en: 'Europe' } },
  { lon: 35, label: { tr: 'Türkiye', en: 'Türkiye' }, primary: true },
  { lon: 103, label: { tr: 'Asya', en: 'Asia' } },
]
const DUBAI = 55.27
const lonToX = (lon: number) => 40 + ((lon + 95) / 215) * 920

export default function Roof({ lang }: { lang: Lang }) {
  const copy = home.roof
  const origin = lonToX(DUBAI)
  return (
    <section data-theme="light" aria-labelledby="roof-title" className="relative overflow-hidden bg-sand text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-ink/55" data-reveal>
              {copy.eyebrow[lang]}
            </p>
            <h2 id="roof-title" data-split className="text-[clamp(2.8rem,7vw,7rem)] leading-[0.92] tracking-[-0.035em]">
              {copy.title[lang]}
            </h2>
            <p data-illuminate className="mt-10 max-w-[34ch] font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.25] text-ink">
              {copy.body[lang]}
            </p>
          </div>
          <div className="self-end lg:col-span-5" data-reveal>
            <RoofMark lang={lang} />
          </div>
        </div>

        <ul className="mt-24 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {copy.focus.map((item, index) => (
            <li
              key={item.en}
              data-reveal
              className="flex items-baseline gap-5 border-b border-ink/15 py-6 sm:pr-8 lg:py-8"
            >
              <span className="font-display text-sm text-terracotta">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-xl sm:text-2xl">{item[lang]}</span>
            </li>
          ))}
        </ul>

        <div className="mt-28 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 data-split className="text-[clamp(2rem,4vw,3.6rem)] leading-[1] tracking-[-0.03em]">
              {copy.marketTitle[lang]}
            </h3>
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
              {copy.marketBody[lang]}
            </p>
          </div>
          <div className="lg:col-span-7">
            <svg viewBox="0 0 1000 300" className="w-full overflow-visible" role="img" aria-label={REGIONS.map((region) => region.label[lang]).join(', ')}>
              <line x1="0" x2="1000" y1="250" y2="250" stroke="#0e2725" strokeOpacity="0.2" />
              {REGIONS.map((region) => {
                const x = lonToX(region.lon)
                const lift = Math.min(220, Math.abs(x - origin) * 0.62 + 30)
                return (
                  <g key={region.label.en}>
                    <path
                      d={`M ${origin} 250 Q ${(origin + x) / 2} ${250 - lift} ${x} 250`}
                      fill="none"
                      stroke={region.primary ? '#b55d3b' : '#0e2725'}
                      strokeOpacity={region.primary ? 1 : 0.45}
                      strokeWidth={region.primary ? 3.2 : 1.6}
                      pathLength={1}
                      data-draw
                    />
                    <circle cx={x} cy="250" r={region.primary ? 6 : 4} fill={region.primary ? '#b55d3b' : '#0e2725'} />
                    <text
                      x={x}
                      y="292"
                      textAnchor="middle"
                      className="fill-ink font-sans text-[30px]"
                      fillOpacity={region.primary ? 1 : 0.6}
                    >
                      {region.label[lang]}
                    </text>
                  </g>
                )
              })}
              <circle cx={origin} cy="250" r="14" fill="#f2a65a" fillOpacity="0.25" />
              <circle cx={origin} cy="250" r="7" fill="#b55d3b" />
              <text x={origin} y="222" textAnchor="middle" className="fill-ink font-display text-[36px]">
                Dubai
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
