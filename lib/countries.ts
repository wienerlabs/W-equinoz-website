import type { Lang } from '@/lib/i18n'

const DIALS: Record<string, string> = {
  TR: '+90', AE: '+971', SA: '+966', QA: '+974', KW: '+965', BH: '+973', OM: '+968', JO: '+962', LB: '+961', EG: '+20',
  GB: '+44', DE: '+49', FR: '+33', NL: '+31', BE: '+32', CH: '+41', AT: '+43', IT: '+39', ES: '+34', PT: '+351',
  SE: '+46', NO: '+47', DK: '+45', FI: '+358', IE: '+353', PL: '+48', GR: '+30', CY: '+357', LU: '+352', MC: '+377',
  US: '+1', CA: '+1', MX: '+52', BR: '+55', AR: '+54',
  RU: '+7', AZ: '+994', KZ: '+7', UZ: '+998', GE: '+995', UA: '+380',
  CN: '+86', HK: '+852', IN: '+91', PK: '+92', SG: '+65', MY: '+60', ID: '+62', JP: '+81', KR: '+82',
  MA: '+212', NG: '+234', ZA: '+27', AU: '+61', NZ: '+64',
}

const FIRST = ['TR', 'AE']

export function countryOptions(lang: Lang) {
  const names = new Intl.DisplayNames([lang], { type: 'region' })
  const all = Object.entries(DIALS).map(([code, dial]) => ({ code, dial, name: names.of(code) ?? code }))
  const first = FIRST.map((code) => all.find((country) => country.code === code)!)
  const rest = all
    .filter((country) => !FIRST.includes(country.code))
    .sort((a, b) => a.name.localeCompare(b.name, lang))
  return [...first, ...rest]
}
