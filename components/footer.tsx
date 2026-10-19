import Link from 'next/link'
import { Mark, Wordmark } from '@/components/brand'
import { brands } from '@/lib/content/brands'
import { services } from '@/lib/content/services'
import { publishedPartners } from '@/lib/content/people'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { site, whatsappLink } from '@/lib/site'
import WhatsappMark from '@/components/whatsapp-mark'

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-clip bg-night text-sand">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div className="flex flex-col gap-10 border-b border-sand/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Mark className="mb-8 h-6 w-auto text-clay" />
            <p lang="en" className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em]" data-split>
              {site.slogan}
            </p>
          </div>
          <div className="max-w-sm space-y-6">
            <p className="text-clay/80" data-reveal>
              {ui.footer.about[lang]}
            </p>
            <div className="flex flex-wrap gap-3" data-reveal>
              <a
                href={whatsappLink(ui.form.whatsappIntro[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-sand px-5 py-3 text-sm text-ink transition-colors hover:bg-ember"
              >
                <WhatsappMark />
                {ui.whatsapp[lang]}
              </a>
              <Link
                href={href('contact', lang)}
                className="rounded-full border border-sand/25 px-5 py-3 text-sm transition-colors hover:bg-sand hover:text-ink"
              >
                {ui.consult[lang]}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow mb-6 font-sans text-clay/60">{ui.footer.brands[lang]}</h2>
            <ul className="space-y-4">
              {brands.map((brand) => (
                <li key={brand.key}>
                  <Link href={href(brand.route, lang)} className="group block">
                    <span className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full" style={{ background: brand.light.accent }} />
                      <span className="link-line">{brand.name}</span>
                    </span>
                    <span className="ml-5 text-xs text-clay/50">{ui.byEquinoz}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-6 font-sans text-clay/60">{ui.footer.global[lang]}</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.key}>
                  <Link href={href(service.route, lang)} className="link-line text-clay/85 hover:text-sand">
                    {service.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-6 font-sans text-clay/60">{ui.footer.company[lang]}</h2>
            <ul className="space-y-3">
              <li>
                <Link href={href('team', lang)} className="link-line text-clay/85 hover:text-sand">
                  {ui.team[lang]}
                </Link>
              </li>
              {publishedPartners.length ? (
                <li>
                  <Link href={href('partners', lang)} className="link-line text-clay/85 hover:text-sand">
                    {ui.partners[lang]}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href={href('contact', lang)} className="link-line text-clay/85 hover:text-sand">
                  {ui.contact[lang]}
                </Link>
              </li>
              <li className="pt-3 text-sm text-clay/50">
                <a href={href('home', 'tr')} hrefLang="tr" lang="tr" className="link-line hover:text-sand">
                  Türkçe
                </a>
                <span className="px-2">/</span>
                <a href={href('home', 'en')} hrefLang="en" lang="en" className="link-line hover:text-sand">
                  English
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-6 font-sans text-clay/60">{ui.footer.reach[lang]}</h2>
            <ul className="space-y-3 text-clay/85">
              <li>
                <a
                  href={whatsappLink(ui.form.whatsappIntro[lang])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line inline-flex items-center gap-2 hover:text-sand"
                >
                  <WhatsappMark className="h-3.5 w-3.5" />
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-line hover:text-sand">
                  {site.email}
                </a>
              </li>
              <li className="text-clay/60">{site.city[lang]}</li>
            </ul>
            <p className="mt-8 max-w-xs text-sm text-clay/50">{ui.pricingNote[lang]}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-sand/10 pt-8 text-sm text-clay/50 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark className="h-3 w-auto text-clay/60" title="Equinoz" />
          <p>
            © {year} {site.legalName}. {ui.footer.rights[lang]}
          </p>
        </div>
      </div>
    </footer>
  )
}
