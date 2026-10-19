import Image from 'next/image'
import Link from 'next/link'
import Consult from '@/components/consult'
import JsonLd from '@/components/json-ld'
import LightHero from '@/components/light-hero'
import LightLabel from '@/components/light-label'
import OtherLights from '@/components/other-lights'
import { brandByKey } from '@/lib/content/brands'
import { services, type Service } from '@/lib/content/services'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { breadcrumbLd, serviceLd } from '@/lib/seo'

export default function ServicePage({ service, lang }: { service: Service; lang: Lang }) {
  const global = brandByKey('global')
  const siblings = services.filter((item) => item.key !== service.key)
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [
            { name: ui.home[lang], key: 'home' },
            { name: global.name, key: 'global' },
            { name: service.title[lang], key: service.route },
          ]),
          serviceLd(lang, service.route, service.title[lang], service.seo.description[lang], global.name),
        ]}
      />
      <LightHero
        image={service.image}
        alt={service.imageAlt[lang]}
        focus={service.focus}
        glow={global.light.glow}
        eyebrow={<LightLabel brand={global} lang={lang} />}
        title={service.title[lang]}
      >
        <p className="text-lg leading-relaxed text-clay/90">{service.lead[lang]}</p>
      </LightHero>

      <nav aria-label={lang === 'tr' ? 'Sayfa yolu' : 'Breadcrumb'} className="border-b border-ink/10 bg-sand text-sm text-ink/60" data-theme="light">
        <ol className="mx-auto flex max-w-[1440px] flex-wrap gap-2 px-5 py-5 sm:px-8 lg:px-12">
          <li>
            <Link href={href('home', lang)} className="link-line hover:text-ink">
              {ui.home[lang]}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={href('global', lang)} className="link-line hover:text-ink">
              {global.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {service.title[lang]}
          </li>
        </ol>
      </nav>

      <section data-theme="light" aria-labelledby="scope-title" className="bg-sand text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-32">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6 text-ink/55" data-reveal>
              {service.number} · {global.name}
            </p>
            <h2 id="scope-title" data-split className="text-[clamp(2.4rem,5vw,4.6rem)] leading-none tracking-[-0.03em]">
              {ui.scope[lang]}
            </h2>
          </div>
          <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {service.scope.map((item, index) => (
              <li key={item.title.en} data-reveal className="border-t border-ink/15 pt-6">
                <span className="font-display text-sm text-terracotta">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-[clamp(1.45rem,2vw,1.85rem)] leading-tight">{item.title[lang]}</h3>
                <p className="mt-3 text-ink/70">{item.text[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="audience-title" className="relative overflow-hidden bg-ink text-sand">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-32">
          <h2 id="audience-title" data-split className="text-[clamp(2.4rem,5vw,4.6rem)] leading-none tracking-[-0.03em] lg:col-span-4">
            {ui.audience[lang]}
          </h2>
          <ul className="lg:col-span-8">
            {service.audience.map((item) => (
              <li
                key={item.en}
                data-reveal
                className="flex items-baseline gap-5 border-b border-sand/15 py-6 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] leading-snug"
              >
                <span className="h-2 w-2 shrink-0 translate-y-[-0.3em] rounded-full bg-ember" />
                {item[lang]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-theme="light" aria-labelledby="service-approach-title" className="bg-clay text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <h2 id="service-approach-title" data-split className="text-[clamp(2.4rem,5vw,4.6rem)] leading-none tracking-[-0.03em]">
            {ui.approach[lang]}
          </h2>
          <ol className={`mt-16 grid gap-10 sm:grid-cols-2 ${service.approach.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
            {service.approach.map((step, index) => (
              <li key={step.title.en} data-reveal className="border-t border-ink/20 pt-6">
                <span className="font-display text-[2.4rem] leading-none text-terracotta/85">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 text-[1.5rem] leading-tight">{step.title[lang]}</h3>
                <p className="mt-3 text-ink/70">{step.text[lang]}</p>
              </li>
            ))}
          </ol>
          {service.note ? (
            <p data-reveal className="mt-16 max-w-3xl border-l-2 border-terracotta pl-6 text-lg leading-relaxed text-ink/80">
              {service.note[lang]}
            </p>
          ) : null}
        </div>
      </section>

      <Consult lang={lang} routeKey={service.route} service={service.key} />

      <section aria-labelledby="more-global-title" className="bg-night text-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <h2 id="more-global-title" data-split className="mb-12 text-[clamp(2rem,4vw,3.6rem)] leading-none tracking-[-0.03em]">
            {ui.moreGlobal[lang]}
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siblings.map((item) => (
              <li key={item.key} data-reveal>
                <Link href={href(item.route, lang)} className="group block" data-cursor>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt[lang]}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                      style={{ objectPosition: item.focus }}
                    />
                  </div>
                  <p className="mt-4 font-display text-sm text-clay/50">{item.number}</p>
                  <p className="mt-1 font-display text-[1.45rem] leading-tight transition-colors duration-500 group-hover:text-ember">
                    {item.title[lang]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <OtherLights lang={lang} current="global" />
    </>
  )
}
