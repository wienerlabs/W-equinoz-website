import Image from 'next/image'
import Consult from '@/components/consult'
import { home } from '@/lib/content/home'
import { publishedPartners } from '@/lib/content/people'
import { ui } from '@/lib/content/ui'
import type { Lang } from '@/lib/i18n'

export default function PartnersPage({ lang }: { lang: Lang }) {
  return (
    <>
      <section className="bg-night text-sand">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-40 sm:px-8 lg:px-12 lg:pt-48">
          <p className="eyebrow mb-6 text-clay/60">{ui.partners[lang]}</p>
          <h1 data-split className="max-w-[18ch] text-[clamp(2.7rem,7vw,7rem)] leading-[0.92] tracking-[-0.035em]">
            {home.partners.title[lang]}
          </h1>
          <p data-reveal className="mt-8 max-w-2xl text-lg text-clay/85">{home.partners.lead[lang]}</p>
        </div>
      </section>
      <section data-theme="light" className="bg-sand text-ink">
        <ul className="mx-auto grid max-w-[1440px] gap-px bg-ink/10 px-5 py-24 sm:px-8 md:grid-cols-2 lg:px-12">
          {publishedPartners.map((partner) => (
            <li key={partner.name} data-reveal className="bg-sand p-10">
              {partner.logo ? (
                <Image src={partner.logo} alt={partner.name} className="h-14 w-auto object-contain" />
              ) : null}
              <h2 className="mt-8 text-[2rem] leading-tight">{partner.name}</h2>
              {partner.description ? <p className="mt-4 text-ink/70">{partner.description[lang]}</p> : null}
              {partner.url ? (
                <a href={partner.url} target="_blank" rel="noopener noreferrer" className="link-line mt-6 inline-block text-ink/70">
                  {new URL(partner.url).hostname.replace('www.', '')}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
      <Consult lang={lang} routeKey="partners" />
    </>
  )
}
