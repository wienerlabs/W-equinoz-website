export type ContactPayload = {
  name: string
  email: string
  country: string
  dial: string
  phone: string
  service: string
  message: string
  source: string
  lang: 'tr' | 'en'
}

export type FieldError = 'required' | 'email'
export type ContactErrors = Partial<Record<keyof ContactPayload, FieldError>>

export const MIN_FILL_MS = 2500

export const LIMITS: Record<keyof ContactPayload, number> = {
  name: 120,
  email: 160,
  country: 80,
  dial: 8,
  phone: 32,
  service: 64,
  message: 4000,
  source: 400,
  lang: 2,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const span = (from: number, to: number) => `${String.fromCharCode(from)}-${String.fromCharCode(to)}`
const CONTROL = new RegExp(`[${span(0, 31)}${String.fromCharCode(127)}]`, 'g')
const CONTROL_EXCEPT_LINES = new RegExp(`[${span(0, 8)}${span(11, 31)}${String.fromCharCode(127)}]`, 'g')

const line = (value: unknown, limit: number) =>
  typeof value === 'string' ? value.replace(CONTROL, ' ').trim().slice(0, limit) : ''

const block = (value: unknown, limit: number) =>
  typeof value === 'string' ? value.replace(/\r\n?/g, '\n').replace(CONTROL_EXCEPT_LINES, '').trim().slice(0, limit) : ''

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; spam: boolean; errors: ContactErrors }

export function validateContact(input: unknown, services: readonly string[]): ValidationResult {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const elapsed = typeof raw.elapsed === 'number' && Number.isFinite(raw.elapsed) ? raw.elapsed : -1
  if (line(raw.website, 200) !== '' || elapsed < MIN_FILL_MS) {
    return { ok: false, spam: true, errors: {} }
  }
  const data: ContactPayload = {
    name: line(raw.name, LIMITS.name),
    email: line(raw.email, LIMITS.email),
    country: line(raw.country, LIMITS.country),
    dial: line(raw.dial, LIMITS.dial).replace(/[^\d+]/g, ''),
    phone: line(raw.phone, LIMITS.phone).replace(/[^\d\s()+-]/g, ''),
    service: line(raw.service, LIMITS.service),
    message: block(raw.message, LIMITS.message),
    source: line(raw.source, LIMITS.source),
    lang: raw.lang === 'en' ? 'en' : 'tr',
  }
  const errors: ContactErrors = {}
  if (!data.name) errors.name = 'required'
  if (!data.email) errors.email = 'required'
  else if (!EMAIL.test(data.email)) errors.email = 'email'
  if (!data.service || !services.includes(data.service)) errors.service = 'required'
  if (!data.message) errors.message = 'required'
  if (Object.keys(errors).length) return { ok: false, spam: false, errors }
  return { ok: true, data }
}

const LABELS = {
  tr: {
    intro: 'Merhaba Equinoz, özel görüşme talep etmek istiyorum.',
    name: 'Ad soyad',
    email: 'E-posta',
    phone: 'Telefon',
    country: 'Ülke',
    service: 'Hizmet',
    message: 'Mesaj',
    source: 'Kaynak sayfa',
    language: 'Dil',
  },
  en: {
    intro: 'Hello Equinoz, I would like to request a private consultation.',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    service: 'Service',
    message: 'Message',
    source: 'Source page',
    language: 'Language',
  },
} as const

export function composeMessage(data: ContactPayload, serviceLabel: string, lang: 'tr' | 'en'): string {
  const label = LABELS[lang]
  const phone = [data.dial, data.phone].filter(Boolean).join(' ')
  const fields = [
    `${label.name}: ${data.name}`,
    `${label.email}: ${data.email}`,
    phone && `${label.phone}: ${phone}`,
    data.country && `${label.country}: ${data.country}`,
    `${label.service}: ${serviceLabel}`,
    `${label.language}: ${data.lang.toUpperCase()}`,
  ].filter(Boolean)
  return [label.intro, '', ...fields, '', `${label.message}:`, data.message, '', `${label.source}: ${data.source}`].join('\n')
}
