import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BrandPage from '@/components/pages/brand-page'
import ContactPage from '@/components/pages/contact-page'
import PartnersPage from '@/components/pages/partners-page'
import TeamPage from '@/components/pages/team-page'
import { brands } from '@/lib/content/brands'
import { home } from '@/lib/content/home'
import { publishedPartners } from '@/lib/content/people'
import { keyFromSegments, langs, segmentsFor, type Lang, type RouteKey } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

const SECTIONS: RouteKey[] = ['global', 'consulting', 'accounting', 'education', 'team', 'partners', 'contact']

const available = (key: RouteKey) => key !== 'partners' || publishedPartners.length > 0

export const dynamicParams = false

export function generateStaticParams() {
  return langs.flatMap((lang) =>
    SECTIONS.filter(available).map((key) => ({ lang, section: segmentsFor(key, lang)[0] })),
  )
}

function resolve(lang: string, section: string) {
  const key = keyFromSegments(lang as Lang, [section])
  if (!key || !SECTIONS.includes(key) || !available(key)) return undefined
  return key
}

export async function generateMetadata({ params }: PageProps<'/[lang]/[section]'>): Promise<Metadata> {
  const { lang, section } = await params
  const key = resolve(lang, section)
  if (!key) return {}
  const language = lang as Lang
  const brand = brands.find((item) => item.route === key)
  if (brand) return pageMetadata({ key, lang: language, title: brand.seo.title, description: brand.seo.description, image: brand.key, absoluteTitle: true })
  if (key === 'team') return pageMetadata({ key, lang: language, ...home.team.seo, image: 'team' })
  if (key === 'partners') return pageMetadata({ key, lang: language, ...home.partners.seo, image: 'home' })
  return pageMetadata({ key, lang: language, ...home.contact.seo, image: 'contact' })
}

export default async function SectionPage({ params }: PageProps<'/[lang]/[section]'>) {
  const { lang, section } = await params
  const key = resolve(lang, section)
  if (!key) notFound()
  const language = lang as Lang
  const brand = brands.find((item) => item.route === key)
  if (brand) return <BrandPage brand={brand} lang={language} />
  if (key === 'team') return <TeamPage lang={language} />
  if (key === 'partners') return <PartnersPage lang={language} />
  return <ContactPage lang={language} />
}
