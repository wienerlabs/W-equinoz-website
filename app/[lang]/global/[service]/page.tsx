import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicePage from '@/components/pages/service-page'
import { serviceByRoute, services } from '@/lib/content/services'
import { keyFromSegments, langs, segmentsFor, type Lang } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return langs.flatMap((lang) => services.map((service) => ({ lang, service: segmentsFor(service.route, lang)[1] })))
}

function resolve(lang: string, slug: string) {
  const key = keyFromSegments(lang as Lang, ['global', slug])
  return key ? serviceByRoute(key) : undefined
}

export async function generateMetadata({ params }: PageProps<'/[lang]/global/[service]'>): Promise<Metadata> {
  const { lang, service: slug } = await params
  const service = resolve(lang, slug)
  if (!service) return {}
  return pageMetadata({ key: service.route, lang: lang as Lang, ...service.seo, image: service.key })
}

export default async function GlobalServicePage({ params }: PageProps<'/[lang]/global/[service]'>) {
  const { lang, service: slug } = await params
  const service = resolve(lang, slug)
  if (!service) notFound()
  return <ServicePage service={service} lang={lang as Lang} />
}
