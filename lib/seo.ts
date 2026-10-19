import type { Metadata } from 'next'
import { brands } from '@/lib/content/brands'
import { href, type L, type Lang, type RouteKey } from '@/lib/i18n'
import { site } from '@/lib/site'

const absolute = (path: string) => new URL(path, site.url).toString()

export function pageMetadata({
  key,
  lang,
  title,
  description,
  image,
  absoluteTitle = false,
  share,
}: {
  key: RouteKey
  lang: Lang
  title: L
  description: L
  image: string
  absoluteTitle?: boolean
  share?: { title: string; description: string }
}): Metadata {
  const url = href(key, lang)
  const shareTitle = share?.title ?? title[lang]
  const shareDescription = share?.description ?? description[lang]
  const ogImage = { url: `/og/${image}.jpg`, width: 1200, height: 630, alt: shareTitle }
  return {
    title: absoluteTitle ? { absolute: title[lang] } : title[lang],
    description: description[lang],
    alternates: {
      canonical: url,
      languages: { tr: href(key, 'tr'), en: href(key, 'en'), 'x-default': href(key, 'tr') },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? ['en_US'] : ['tr_TR'],
      title: shareTitle,
      description: shareDescription,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description: shareDescription, images: [ogImage.url] },
  }
}

export function organizationLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: absolute(href('home', lang)),
    logo: absolute('/og/logo.png'),
    image: absolute('/og/home.jpg'),
    slogan: site.slogan,
    email: site.email,
    telephone: `+${site.whatsapp.digits}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    knowsLanguage: ['tr', 'en'],
    founder: { '@type': 'Person', name: 'Ramazan Manzak', jobTitle: 'Founder & Managing Director' },
    brand: brands.map((brand) => ({ '@type': 'Brand', name: brand.name, url: absolute(href(brand.route, lang)) })),
  }
}

export function websiteLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website-${lang}`,
    name: site.name,
    url: absolute(href('home', lang)),
    inLanguage: lang,
    publisher: { '@id': `${site.url}/#organization` },
  }
}

export function breadcrumbLd(lang: Lang, trail: { name: string; key: RouteKey }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(href(item.key, lang)),
    })),
  }
}

export function serviceLd(lang: Lang, key: RouteKey, name: string, description: string, brandName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absolute(href(key, lang)),
    serviceType: name,
    brand: { '@type': 'Brand', name: brandName },
    provider: { '@id': `${site.url}/#organization` },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    inLanguage: lang,
  }
}
