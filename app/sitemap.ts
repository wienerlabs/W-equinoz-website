import type { MetadataRoute } from 'next'
import { publishedPartners } from '@/lib/content/people'
import { langs, routeKeys, routes, type RouteKey } from '@/lib/i18n'
import { site } from '@/lib/site'

const absolute = (path: string) => new URL(path, site.url).toString()

const priority = (key: RouteKey) => {
  if (key === 'home') return 1
  if (key === 'global') return 0.9
  if (key === 'consulting' || key === 'accounting' || key === 'education') return 0.8
  return 0.7
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routeKeys
    .filter((key) => key !== 'partners' || publishedPartners.length > 0)
    .flatMap((key) =>
      langs.map((lang) => ({
        url: absolute(routes[key][lang]),
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: priority(key),
        alternates: { languages: { tr: absolute(routes[key].tr), en: absolute(routes[key].en) } },
      })),
    )
}
