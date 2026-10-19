export const site = {
  url: 'https://www.equinoz.com',
  name: 'Equinoz',
  legalName: 'Equinoz LLC',
  slogan: 'Global Vision. Preserving Legacy.',
  email: 'info@equinoz.com',
  whatsapp: { display: '+971 505 690 272', digits: '971505690272' },
  city: { tr: 'Dubai, Birleşik Arap Emirlikleri', en: 'Dubai, United Arab Emirates' },
} as const

export const whatsappLink = (text: string) => `https://wa.me/${site.whatsapp.digits}?text=${encodeURIComponent(text)}`

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
