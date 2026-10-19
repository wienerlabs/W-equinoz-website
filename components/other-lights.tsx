import Image from 'next/image'
import Link from 'next/link'
import { brands, type BrandKey } from '@/lib/content/brands'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'

export default function OtherLights({ lang, current }: { lang: Lang; current?: BrandKey }) {
  const others = brands.filter((brand) => brand.key !== current)
  return (
    <section aria-labelledby="other-lights-title" className="bg-ink text-sand">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mb-14 grid gap-6 lg:grid-cols-12">
          <h2 id="other-lights-title" data-split className="text-[clamp(2.2rem,4.4vw,4rem)] leading-none tracking-[-0.03em] lg:col-span-5">
            {ui.otherLights[lang]}
          </h2>
          <p data-reveal className="max-w-lg self-end text-clay/75 lg:col-span-5 lg:col-start-8">
            {ui.otherLightsLead[lang]}
          </p>
        </div>
        <ul className={`grid gap-5 ${others.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {others.map((brand) => (
            <li key={brand.key} data-reveal>
              <Link href={href(brand.route, lang)} className="group block" data-cursor>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.imageAlt[lang]}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                    style={{ objectPosition: brand.focus }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,17,0)_40%,rgba(6,18,17,0.85)_100%)]" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: `radial-gradient(80% 60% at 50% 100%, ${brand.light.glow}55, transparent 70%)` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="flex items-center gap-2 text-sm" style={{ color: brand.light.glow }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.light.glow }} />
                      {brand.light.name[lang]} · {brand.light.time}
                    </p>
                    <p className="mt-3 font-display text-[1.9rem] leading-none">{brand.name}</p>
                    <p className="mt-1 text-xs text-clay/60">{ui.byEquinoz}</p>
                  </div>
                </div>
                <p className="mt-4 text-clay/75">{brand.tagline[lang]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
