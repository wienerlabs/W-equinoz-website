import ContactForm from '@/components/contact-form'
import { home } from '@/lib/content/home'
import { serviceGroups, serviceLabel } from '@/lib/content/options'
import { ui } from '@/lib/content/ui'
import { countryOptions } from '@/lib/countries'
import { href, type L, type Lang, type RouteKey } from '@/lib/i18n'
import { site, whatsappLink } from '@/lib/site'

export default function Consult({
  lang,
  routeKey,
  service = '',
  title,
}: {
  lang: Lang
  routeKey: RouteKey
  service?: string
  title?: L
}) {
  const url = new URL(href(routeKey, lang), site.url).toString()
  const message = [
    ui.form.whatsappIntro[lang],
    service ? `${lang === 'tr' ? 'Hizmet' : 'Service'}: ${serviceLabel(service, lang)}` : '',
    `${ui.form.sourceLabel[lang]}: ${url}`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <section id="consultation" aria-labelledby="consult-title" className="relative overflow-clip bg-night text-sand">
      <div className="pointer-events-none absolute -right-[20vw] -top-[30vw] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(242,166,90,0.12),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-36">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 text-clay/60" data-reveal>
            {ui.form.title[lang]}
          </p>
          <h2 id="consult-title" data-split className="text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.03em]">
            {(title ?? home.night.title)[lang]}
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-clay/80" data-reveal>
            {ui.form.lead[lang]}
          </p>
          <ul className="mt-10 space-y-4 text-clay/85" data-reveal>
            <li>
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="link-line text-sand">
                {ui.whatsapp[lang]} · {site.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-line">
                {site.email}
              </a>
            </li>
            <li className="text-clay/60">{site.city[lang]}</li>
          </ul>
          <p className="mt-10 max-w-sm text-sm text-clay/55" data-reveal>
            {ui.pricingNote[lang]}
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <ContactForm lang={lang} groups={serviceGroups} countries={countryOptions(lang)} defaultService={service} />
        </div>
      </div>
    </section>
  )
}
