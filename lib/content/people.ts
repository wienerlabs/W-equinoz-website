import type { StaticImageData } from 'next/image'
import type { L } from '@/lib/i18n'
import ramazan from '@/assets/media/ramazan-manzak.jpg'

export type Member = {
  name: string
  title: string
  bio?: L
  photo?: StaticImageData
  linkedin?: string
  published: boolean
}

export const team: Member[] = [
  {
    name: 'Ramazan Manzak',
    title: 'Founder & Managing Director',
    bio: {
      tr: 'Ramazan Manzak, Equinoz’un kurucusu ve genel müdürüdür. Şirketin yönetiminden sorumludur; iş geliştirme çalışmalarına ve Equinoz’un uluslararası büyümesine yön verir.',
      en: 'Ramazan Manzak is the founder and managing director of Equinoz. Responsible for the management of the company, Ramazan leads its business development and international growth.',
    },
    photo: ramazan,
    linkedin: 'https://www.linkedin.com/in/ramazan-manzak-71851b183/',
    published: true,
  },
  { name: 'Merih', title: 'President & Chief Operating Officer', published: false },
  { name: 'Meltem', title: 'Türkiye Country Director', published: false },
  { name: 'Yusuf İslam Manzak', title: 'Director of Digital Media & Communications', published: false },
  { name: 'Pervin', title: 'Social Media Specialist', published: false },
  { name: 'Özge Baştürk', title: 'Head of Client Operations', published: false },
  { name: 'Shamik', title: 'Head of Accounting & Tax Advisory', published: false },
  { name: 'Sabri Sabrioğlu', title: 'Head of Finance & Mortgage Advisory', published: false },
  { name: '', title: 'Head of Technology & AI Solutions', published: false },
]

export const publishedTeam = team.filter((member) => member.published)

export type Partner = {
  name: string
  url?: string
  logo?: StaticImageData
  description?: L
  published: boolean
}

export const partners: Partner[] = [
  { name: 'HAS Law', published: false },
  { name: 'Galle Consulting', url: 'https://galleconsulting.com', published: false },
]

export const publishedPartners = partners.filter((partner) => partner.published)
