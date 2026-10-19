import Image from 'next/image'
import Link from 'next/link'
import Consult from '@/components/consult'
import FaqSection from '@/components/faq'
import Approach from '@/components/home/approach'
import JsonLd from '@/components/json-ld'
import LightHero from '@/components/light-hero'
import LightLabel from '@/components/light-label'
import OtherLights from '@/components/other-lights'
import TodayLight from '@/components/today-light'
import type { Brand } from '@/lib/content/brands'
import { brandFaq } from '@/lib/content/faq'
import { serviceByRoute } from '@/lib/content/services'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { breadcrumbLd, serviceLd } from '@/lib/seo'

export default function BrandPage({ brand, lang }: { brand: Brand; lang: Lang }) {
  const [lead, ...rest] = brand.intro
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [
            { name: ui.home[lang], key: 'home' },
            { name: brand.name, key: brand.route },
          ]),
          serviceLd(lang, brand.route, brand.name, brand.seo.description[lang], brand.name),
        ]}
      />
      <LightHero
        clip={brand.clip}
        alt={brand.imageAlt[lang]}
        glow={brand.light.glow}
        eyebrow={<LightLabel brand={brand} lang={lang} />}
        title={brand.headline[lang]}
      >
        <p className="text-lg leading-relaxed text-clay/90">{brand.tagline[lang]}</p>
      </LightHero>

      <section data-theme="light" className="bg-sand text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-36">
          <div className="lg:col-span-3">
            <p className="eyebrow text-ink/55" data-reveal>
              {brand.name}
              <br />
              <span className="text-ink/40">{ui.byEquinoz}</span>
            </p>
            <TodayLight brand={brand} lang={lang} />
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <p data-illuminate className="font-display text-[clamp(1.6rem,3vw,2.7rem)] leading-[1.22]">
              {lead[lang]}
            </p>
            {rest.map((paragraph) => (
              <p key={paragraph.en} data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70">
                {paragraph[lang]}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="services-title" className="relative overflow-clip bg-night text-sand">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{ background: `radial-gradient(70% 60% at 85% 0%, ${brand.light.accent}33, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
          <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="services-title" data-split className="text-[clamp(2.4rem,5vw,4.8rem)] leading-none tracking-[-0.03em]">
              {ui.services[lang]}
            </h2>
            <p className="max-w-md text-clay/70" data-reveal>
              {ui.pricingNote[lang]}
            </p>
          </div>
          {brand.key === 'global' ? (
            <ul className="grid gap-px bg-sand/10 md:grid-cols-2 lg:grid-cols-4">
              {brand.services.map((item, index) => {
                const service = item.route ? serviceByRoute(item.route) : undefined
                return (
                  <li key={item.title.en} data-reveal className={`bg-night ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                    <Link href={href(item.route!, lang)} className="group flex h-full flex-col" data-cursor>
                      {service ? (
                        <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/10] lg:aspect-auto lg:flex-1' : 'aspect-[16/10]'}`}>
                          <Image
                            src={service.image}
                            alt={service.imageAlt[lang]}
                            fill
                            sizes={index === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'}
                            placeholder="blur"
                            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
                            style={{ objectPosition: service.focus }}
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
                            style={{ background: `radial-gradient(70% 70% at 50% 100%, ${brand.light.glow}66, transparent 70%)` }}
                          />
                        </div>
                      ) : null}
                      <div className={`flex flex-col justify-between gap-6 p-7 lg:p-8 ${index === 0 ? '' : 'flex-1'}`}>
                        <div>
                          <span className="font-display text-sm text-clay/50">{service?.number}</span>
                          <h3 className="mt-3 text-[clamp(1.5rem,2.2vw,2.1rem)] leading-tight transition-colors duration-500 group-hover:text-ember">
                            {item.title[lang]}
                          </h3>
                          <p className="mt-3 text-clay/70">{item.text[lang]}</p>
                        </div>
                        <span className="text-sm text-clay/80">
                          {ui.details[lang]} <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <ol className="grid gap-px bg-sand/10 md:grid-cols-2 lg:grid-cols-3">
              {brand.services.map((item, index) => (
                <li key={item.title.en} data-reveal className="flex min-h-[16rem] flex-col justify-between bg-night p-7 lg:p-9">
                  <span className="font-display text-[2.6rem] leading-none" style={{ color: brand.light.glow }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-10">
                    <h3 className="text-[clamp(1.4rem,2vw,1.9rem)] leading-tight">{item.title[lang]}</h3>
                    <p className="mt-3 text-clay/70">{item.text[lang]}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <Approach lang={lang} accent={brand.light.accent} />
      <FaqSection items={brandFaq[brand.key]} lang={lang} accent={brand.light.accent} />
      <Consult lang={lang} routeKey={brand.route} service={brand.key} />
      <OtherLights lang={lang} current={brand.key} />
    </>
  )
}
