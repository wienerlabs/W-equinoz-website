import Channels from '@/components/channels'
import Consult from '@/components/consult'
import FaqSection from '@/components/faq'
import JsonLd from '@/components/json-ld'
import LightHero from '@/components/light-hero'
import RequestFlow from '@/components/request-flow'
import { contactFaq } from '@/lib/content/faq'
import { clips } from '@/lib/media'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import type { Lang } from '@/lib/i18n'
import { breadcrumbLd } from '@/lib/seo'

export default function ContactPage({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd(lang, [
          { name: ui.home[lang], key: 'home' },
          { name: ui.contact[lang], key: 'contact' },
        ])}
      />
      <LightHero
        clip={clips.night}
        alt={lang === 'tr' ? 'Gece havadan Dubai kuleleri ve ışık izleri' : 'Dubai towers and light trails from above at night'}
        glow="#9eb5a4"
        eyebrow={<span className="text-clay/80">{ui.contact[lang]}</span>}
        title={home.contact.title[lang]}
      >
        <p className="text-lg leading-relaxed text-clay/90">{ui.form.lead[lang]}</p>
      </LightHero>
      <Channels lang={lang} />
      <Consult lang={lang} routeKey="contact" />
      <RequestFlow lang={lang} />
      <FaqSection items={contactFaq} lang={lang} />
    </>
  )
}
