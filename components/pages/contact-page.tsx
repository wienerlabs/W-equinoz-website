import Consult from '@/components/consult'
import JsonLd from '@/components/json-ld'
import LightHero from '@/components/light-hero'
import panorama from '@/assets/media/night-panorama.jpg'
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
        image={panorama}
        alt={lang === 'tr' ? 'Gece Business Bay ve Burj Khalifa' : 'Business Bay and the Burj Khalifa at night'}
        focus="60% 55%"
        glow="#9eb5a4"
        eyebrow={<span className="text-clay/80">{ui.contact[lang]}</span>}
        title={home.contact.title[lang]}
      >
        <p className="text-lg leading-relaxed text-clay/90">{ui.form.lead[lang]}</p>
      </LightHero>
      <Consult lang={lang} routeKey="contact" />
    </>
  )
}
