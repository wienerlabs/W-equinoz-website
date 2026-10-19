import type { Metadata } from 'next'
import Approach from '@/components/home/approach'
import Equinox from '@/components/home/equinox'
import FourLights from '@/components/home/four-lights'
import GlobalFocus from '@/components/home/global-focus'
import Hero from '@/components/home/hero'
import Leadership from '@/components/home/leadership'
import NightCta from '@/components/home/night-cta'
import Roof from '@/components/home/roof'
import JsonLd from '@/components/json-ld'
import { home } from '@/lib/content/home'
import type { Lang } from '@/lib/i18n'
import { organizationLd, pageMetadata, websiteLd } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const lang = (await params).lang as Lang
  return pageMetadata({ key: 'home', lang, title: home.seo.title, description: home.seo.description, image: 'home', absoluteTitle: true })
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const lang = (await params).lang as Lang
  return (
    <>
      <JsonLd data={[organizationLd(lang), websiteLd(lang)]} />
      <Hero lang={lang} />
      <Equinox lang={lang} />
      <Roof lang={lang} />
      <FourLights lang={lang} />
      <GlobalFocus lang={lang} />
      <Approach lang={lang} />
      <Leadership lang={lang} />
      <NightCta lang={lang} />
    </>
  )
}
