export const langs = ['tr', 'en'] as const
export type Lang = (typeof langs)[number]
export type L = Record<Lang, string>
export type LList = Record<Lang, string[]>

export const isLang = (value: string): value is Lang => (langs as readonly string[]).includes(value)

export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr')

export const routes = {
  home: { tr: '/', en: '/en' },
  global: { tr: '/global', en: '/en/global' },
  consulting: { tr: '/consulting', en: '/en/consulting' },
  accounting: { tr: '/accounting', en: '/en/accounting' },
  education: { tr: '/education', en: '/en/education' },
  team: { tr: '/ekip', en: '/en/team' },
  partners: { tr: '/is-ortaklari', en: '/en/partners' },
  contact: { tr: '/iletisim', en: '/en/contact' },
  familyOffice: {
    tr: '/global/aile-ofisi-ve-ozel-musteri-hizmetleri',
    en: '/en/global/family-office-and-private-client-services',
  },
  structuring: {
    tr: '/global/uluslararasi-yapilanma-ve-servet-planlamasi',
    en: '/en/global/international-structuring-and-wealth-planning',
  },
  trade: {
    tr: '/global/is-gelistirme-b2b-ve-uluslararasi-ticaret',
    en: '/en/global/business-development-b2b-and-international-trade',
  },
  realEstate: {
    tr: '/global/buyuk-olcekli-gayrimenkul-danismanligi',
    en: '/en/global/large-scale-real-estate-advisory',
  },
  technology: {
    tr: '/global/teknoloji-ve-yapay-zeka-cozumleri',
    en: '/en/global/technology-and-ai-solutions',
  },
} as const satisfies Record<string, L>

export type RouteKey = keyof typeof routes

export const href = (key: RouteKey, lang: Lang): string => routes[key][lang]

export const routeKeys = Object.keys(routes) as RouteKey[]

const segmentsOf = (path: string, lang: Lang): string[] => {
  const local = lang === 'en' ? path.replace(/^\/en/, '') : path
  return local.split('/').filter(Boolean)
}

export const keyFromSegments = (lang: Lang, segments: string[]): RouteKey | undefined =>
  routeKeys.find((key) => {
    const own = segmentsOf(routes[key][lang], lang)
    return own.length === segments.length && own.every((part, index) => part === segments[index])
  })

export const segmentsFor = (key: RouteKey, lang: Lang): string[] => segmentsOf(routes[key][lang], lang)

export const keyFromPathname = (pathname: string): { key: RouteKey; lang: Lang } | undefined => {
  const lang: Lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'tr'
  const path = pathname.replace(/^\/tr(?=\/|$)/, '').replace(/\/$/, '') || '/'
  const key = routeKeys.find((candidate) => routes[candidate][lang] === path)
  return key ? { key, lang } : undefined
}
