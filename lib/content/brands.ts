import type { StaticImageData } from 'next/image'
import type { L, RouteKey } from '@/lib/i18n'
import { clips, type Clip } from '@/lib/media'

export type BrandKey = 'global' | 'consulting' | 'accounting' | 'education'

export type SunEvent = 'dawn' | 'sunrise' | 'noon' | 'sunset'

export type Light = {
  name: L
  time: string
  event: SunEvent
  hour: number
  accent: string
  glow: string
  deep: string
}

export type Brand = {
  key: BrandKey
  route: RouteKey
  name: string
  short: string
  light: Light
  clip: Clip
  image: StaticImageData
  imageAlt: L
  focus: string
  tagline: L
  headline: L
  intro: L[]
  services: { title: L; text: L; route?: RouteKey }[]
  seo: { title: L; description: L }
}

export const brands: Brand[] = [
  {
    key: 'global',
    route: 'global',
    name: 'Equinoz Global',
    short: 'Global',
    light: {
      name: { tr: 'Gün batımı', en: 'Sunset' },
      time: '18:20',
      event: 'sunset',
      hour: 18.33,
      accent: '#b55d3b',
      glow: '#f2a65a',
      deep: '#2a1410',
    },
    clip: clips.global,
    image: clips.global.poster,
    imageAlt: {
      tr: 'Gün batımında Dubai Marina kuleleri ve suya düşen ışık',
      en: 'Dubai Marina towers and their reflections at sunset',
    },
    focus: clips.global.focus,
    tagline: {
      tr: 'Uluslararası ve büyük ölçekli işler: family office, servet planlaması, iş geliştirme, gayrimenkul ve teknoloji.',
      en: 'International, large-scale work: family office, wealth planning, business development, real estate and technology.',
    },
    headline: {
      tr: 'Sınırların ötesine uzanan işler için.',
      en: 'For work that reaches beyond borders.',
    },
    intro: [
      {
        tr: 'Equinoz Global, Equinoz çatısının ana hizmet markasıdır. Ailelerin ve özel müşterilerin uluslararası yapılanmasından şirketler arası ticarete, büyük ölçekli gayrimenkulden teknoloji ve yapay zekâ çözümlerine kadar geniş bir alanda çalışır.',
        en: 'Equinoz Global is the main service brand of Equinoz. Its work spans the international structuring of families and private clients, trade between companies, large-scale real estate, and technology and AI solutions.',
      },
      {
        tr: 'Hizmetlerimizi kendi ekibimizle sunarız. Müşteriyi başka şirketlere yönlendiren bir aracı değiliz; işi baştan sona sahiplenir, gerektiğinde iş ortaklarımızla birlikte yürütürüz.',
        en: 'We deliver our services with our own team. We are not an intermediary that passes clients on to other firms; we own the work from start to finish and bring in our partners where the work calls for it.',
      },
    ],
    services: [
      {
        route: 'familyOffice',
        title: { tr: 'Family office ve özel müşteri hizmetleri', en: 'Family office and private client services' },
        text: {
          tr: 'Ailelerin varlıklarını, işlerini ve geleceklerini tek bir planda buluşturan, uzun vadeli ve gizli bir yapı.',
          en: 'A long-term, confidential framework that brings a family’s assets, businesses and future into one plan.',
        },
      },
      {
        route: 'structuring',
        title: { tr: 'Uluslararası yapılanma ve servet planlaması', en: 'International structuring and wealth planning' },
        text: {
          tr: 'Varlıkların hangi ülkede, hangi yapıyla konumlanacağının planlanması ve servet taşıma süreçlerinin koordinasyonu.',
          en: 'Planning where assets should sit and under which structures, and coordinating the transfer of wealth.',
        },
      },
      {
        route: 'trade',
        title: { tr: 'İş geliştirme, B2B ve uluslararası ticaret', en: 'Business development, B2B and international trade' },
        text: {
          tr: 'Yeni pazarlara giriş, ticari bağlantılar, şirketler arası ilişkiler ve uluslararası ticari fırsatlar.',
          en: 'Entering new markets, building commercial connections, business-to-business relationships and international opportunities.',
        },
      },
      {
        route: 'realEstate',
        title: { tr: 'Büyük ölçekli gayrimenkul danışmanlığı', en: 'Large-scale real estate advisory' },
        text: {
          tr: 'Bina, arsa ve ticari gayrimenkul ihtiyaçları için yatırım odaklı danışmanlık. İlan değil, danışmanlık.',
          en: 'Investment-focused advice on buildings, land and commercial property. Advice, not listings.',
        },
      },
      {
        route: 'technology',
        title: { tr: 'Teknoloji ve yapay zekâ çözümleri', en: 'Technology and AI solutions' },
        text: {
          tr: 'Şirketlerin teknoloji ve yapay zekâ ihtiyaçlarına, işlerine uygun çözümler.',
          en: 'Technology and AI solutions shaped around the way a company works.',
        },
      },
    ],
    seo: {
      title: {
        tr: 'Equinoz Global: family office, servet planlaması ve uluslararası iş geliştirme',
        en: 'Equinoz Global: family office, wealth planning and international business',
      },
      description: {
        tr: 'Equinoz Global; family office, uluslararası yapılanma, servet planlaması, B2B ticaret, büyük ölçekli gayrimenkul ve yapay zekâ çözümlerinde Dubai merkezli danışmanlık sunar.',
        en: 'Equinoz Global is Dubai-based advisory for family offices, international structuring, wealth planning, B2B trade, large-scale real estate and AI solutions.',
      },
    },
  },
  {
    key: 'consulting',
    route: 'consulting',
    name: 'Equinoz Consulting',
    short: 'Consulting',
    light: {
      name: { tr: 'Sabah', en: 'Morning' },
      time: '08:30',
      event: 'sunrise',
      hour: 8.5,
      accent: '#a7713f',
      glow: '#f4d6a0',
      deep: '#1c1810',
    },
    clip: clips.consulting,
    image: clips.consulting.poster,
    imageAlt: {
      tr: 'Sabah sisinin içinden yükselen Dubai kuleleri',
      en: 'Dubai towers rising out of the morning fog',
    },
    focus: clips.consulting.focus,
    tagline: {
      tr: 'BAE’de şirket kuruluşu ve faaliyete geçiş: lisans, oturum, banka ve operasyonel kurulum.',
      en: 'Setting up and starting operations in the UAE: licensing, residency, banking and operations.',
    },
    headline: {
      tr: 'BAE’de doğru bir başlangıç.',
      en: 'The right start in the UAE.',
    },
    intro: [
      {
        tr: 'Equinoz Consulting, Birleşik Arap Emirlikleri’nde şirket kurmak ve faaliyete geçmek isteyen girişimcilere, ailelere ve şirketlere eşlik eder.',
        en: 'Equinoz Consulting supports founders, families and companies that want to set up and start operating in the United Arab Emirates.',
      },
      {
        tr: 'Doğru lisanstan banka hesabına, oturum izninden günlük işleyişe kadar süreci sizinle birlikte planlar ve adım adım yürütürüz.',
        en: 'From the right licence to the bank account, from residency to day-to-day operations, we plan the process with you and take it forward step by step.',
      },
    ],
    services: [
      {
        title: { tr: 'Mainland ve Freezone şirket kuruluşu', en: 'Mainland and free zone company formation' },
        text: {
          tr: 'Faaliyetinize ve hedeflerinize uygun yapıyı birlikte seçer, kuruluş sürecini yürütürüz.',
          en: 'We choose the right structure for your activity and goals with you, and run the formation process.',
        },
      },
      {
        title: { tr: 'Lisans ve faaliyet alanı planlaması', en: 'Licence and business activity planning' },
        text: {
          tr: 'Hangi faaliyetleri hangi lisansla yürüteceğinizi en baştan doğru planlarız.',
          en: 'We plan from the outset which activities you will carry out, and under which licence.',
        },
      },
      {
        title: { tr: 'Oturum ve aile sponsorluğu', en: 'Residency and family sponsorship' },
        text: {
          tr: 'Oturum izni ve aile sponsorluğu başvurularını hazırlar, süreci sizin adınıza takip ederiz.',
          en: 'We prepare residency and family sponsorship applications and follow them through on your behalf.',
        },
      },
      {
        title: { tr: 'Banka hesabı başvuru koordinasyonu', en: 'Bank account application coordination' },
        text: {
          tr: 'Kurumsal ve bireysel hesap başvurularını hazırlar, süreci bankayla koordine ederiz.',
          en: 'We prepare corporate and personal account applications and coordinate the process with the bank.',
        },
      },
      {
        title: { tr: 'Operasyonel kurulum', en: 'Operational setup' },
        text: {
          tr: 'Ofis, ekip ve günlük işleyiş gibi ilk adımları düzenleyerek faaliyete geçişinizi kolaylaştırırız.',
          en: 'We organise first steps such as office, team and daily processes so you can start operating smoothly.',
        },
      },
      {
        title: { tr: 'Finans ve mortgage danışmanlığı', en: 'Finance and mortgage advisory' },
        text: {
          tr: 'Finansman ve konut kredisi seçeneklerini değerlendirir, size uygun yapıyı bulmanıza yardımcı oluruz.',
          en: 'We review financing and mortgage options and help you find the structure that suits you.',
        },
      },
    ],
    seo: {
      title: {
        tr: 'Equinoz Consulting: Dubai ve BAE’de şirket kuruluşu, oturum ve banka',
        en: 'Equinoz Consulting: UAE company formation, residency and banking',
      },
      description: {
        tr: 'Mainland ve Freezone şirket kuruluşu, lisans planlaması, oturum ve aile sponsorluğu, banka hesabı koordinasyonu, finans ve mortgage danışmanlığı.',
        en: 'Mainland and free zone company formation, licence planning, residency and family sponsorship, bank account coordination, finance and mortgage advisory in the UAE.',
      },
    },
  },
  {
    key: 'accounting',
    route: 'accounting',
    name: 'Equinoz Accounting',
    short: 'Accounting',
    light: {
      name: { tr: 'Öğle', en: 'Noon' },
      time: '12:20',
      event: 'noon',
      hour: 12.33,
      accent: '#008080',
      glow: '#eaf5f4',
      deep: '#08201f',
    },
    clip: clips.accounting,
    image: clips.accounting.poster,
    imageAlt: {
      tr: 'Öğle ışığında Burj Khalifa ve Downtown Dubai, üstünde akan bulutlar',
      en: 'The Burj Khalifa and Downtown Dubai at midday, clouds moving overhead',
    },
    focus: clips.accounting.focus,
    tagline: {
      tr: 'Muhasebe, mali raporlama ve vergi uyumu: düzenli kayıt, anlaşılır rapor.',
      en: 'Accounting, financial reporting and tax compliance: orderly books, readable reports.',
    },
    headline: {
      tr: 'Rakamlarınızda öğle netliği.',
      en: 'Your numbers, in the clarity of noon.',
    },
    intro: [
      {
        tr: 'Equinoz Accounting, BAE’de faaliyet gösteren şirketlerin muhasebe ve vergi yükümlülüklerini düzenli ve şeffaf biçimde yerine getirmelerine yardımcı olur.',
        en: 'Equinoz Accounting helps companies operating in the UAE meet their accounting and tax obligations in an orderly, transparent way.',
      },
      {
        tr: 'Kayıtlarınız düzenli, raporlarınız anlaşılır, beyanlarınız zamanında olsun diye çalışırız.',
        en: 'We work so that your records stay in order, your reports stay readable and your filings are made on time.',
      },
    ],
    services: [
      {
        title: { tr: 'Muhasebe ve defter tutma', en: 'Accounting and bookkeeping' },
        text: {
          tr: 'Kayıtlarınızı düzenli tutar, dönem kapanışlarını takip ederiz.',
          en: 'We keep your books in order and look after each period close.',
        },
      },
      {
        title: { tr: 'Finansal tablolar', en: 'Financial statements' },
        text: {
          tr: 'Bilanço, gelir tablosu ve nakit akışı gibi temel tabloları hazırlarız.',
          en: 'We prepare core statements such as the balance sheet, income statement and cash flow.',
        },
      },
      {
        title: { tr: 'Yönetim raporları', en: 'Management reports' },
        text: {
          tr: 'Karar almanızı kolaylaştıran, ihtiyacınıza göre hazırlanmış dönemsel raporlar.',
          en: 'Periodic reports built around your needs, made to support decisions.',
        },
      },
      {
        title: { tr: 'KDV kaydı ve beyanı', en: 'VAT registration and returns' },
        text: {
          tr: 'KDV kaydınızı ve dönemsel beyanlarınızı mevzuata uygun şekilde yürütürüz.',
          en: 'We handle your VAT registration and periodic returns in line with regulations.',
        },
      },
      {
        title: { tr: 'Kurumlar Vergisi kaydı ve beyanı', en: 'Corporate Tax registration and returns' },
        text: {
          tr: 'Kurumlar Vergisi kaydınızı ve yıllık beyanınızı hazırlarız.',
          en: 'We prepare your Corporate Tax registration and annual return.',
        },
      },
      {
        title: { tr: 'Mali süreç danışmanlığı', en: 'Financial process advisory' },
        text: {
          tr: 'Fatura, onay ve raporlama süreçlerinizi daha düzenli hale getirmek için yol gösteririz.',
          en: 'We advise on making your invoicing, approval and reporting processes more orderly.',
        },
      },
    ],
    seo: {
      title: {
        tr: 'Equinoz Accounting: BAE’de muhasebe, KDV ve Kurumlar Vergisi',
        en: 'Equinoz Accounting: UAE accounting, VAT and Corporate Tax',
      },
      description: {
        tr: 'BAE’deki şirketler için muhasebe ve defter tutma, finansal tablolar, yönetim raporları, KDV ve Kurumlar Vergisi kayıt ve beyan süreçleri.',
        en: 'Accounting and bookkeeping, financial statements, management reports, VAT and Corporate Tax registration and returns for companies in the UAE.',
      },
    },
  },
  {
    key: 'education',
    route: 'education',
    name: 'Equinoz Education',
    short: 'Education',
    light: {
      name: { tr: 'Şafak', en: 'Dawn' },
      time: '05:50',
      event: 'dawn',
      hour: 5.83,
      accent: '#9eb5a4',
      glow: '#e9b7b0',
      deep: '#1b1a2c',
    },
    clip: clips.education,
    image: clips.education.poster,
    imageAlt: {
      tr: 'Şafakta çöl kumullarının üzerinde yükselen güneş',
      en: 'The sun rising over desert dunes at dawn',
    },
    focus: clips.education.focus,
    tagline: {
      tr: 'Eğitim ve öğrenci danışmanlığı: yeni bir başlangıç için doğru okul, doğru plan.',
      en: 'Education and student advisory: the right school and the right plan for a new start.',
    },
    headline: {
      tr: 'Yeni bir başlangıcın ilk ışığı.',
      en: 'The first light of a new beginning.',
    },
    intro: [
      {
        tr: 'Equinoz Education, çocukları ya da kendileri için doğru eğitim yolunu arayan ailelere ve öğrencilere eşlik eder.',
        en: 'Equinoz Education supports families and students looking for the right path in education.',
      },
      {
        tr: 'Seçenekleri birlikte değerlendirir, başvurudan yeni şehre yerleşmeye kadar süreci planlarız.',
        en: 'We weigh the options together and plan the journey, from the application to settling into a new city.',
      },
    ],
    services: [
      {
        title: { tr: 'Okul ve eğitim seçeneklerinin değerlendirilmesi', en: 'Assessing school and education options' },
        text: {
          tr: 'Öğrencinin hedeflerine uygun okul ve programları birlikte karşılaştırırız.',
          en: 'We compare schools and programmes against the student’s goals, together with you.',
        },
      },
      {
        title: { tr: 'Öğrenci ve aile ihtiyaç analizi', en: 'Student and family needs analysis' },
        text: {
          tr: 'Öğrencinin ilgi alanlarını, ailenin önceliklerini ve takvimi birlikte netleştiririz.',
          en: 'We clarify the student’s interests, the family’s priorities and the timeline.',
        },
      },
      {
        title: { tr: 'Başvuru ve kayıt koordinasyonu', en: 'Application and enrolment coordination' },
        text: {
          tr: 'Belgeleri, son tarihleri ve kayıt adımlarını sizin için takip ederiz.',
          en: 'We keep track of documents, deadlines and enrolment steps for you.',
        },
      },
      {
        title: { tr: 'Uluslararası eğitim seçenekleri', en: 'International education options' },
        text: {
          tr: 'BAE’deki ve diğer ülkelerdeki uluslararası eğitim seçeneklerini birlikte ele alırız.',
          en: 'We look at international education options in the UAE and in other countries.',
        },
      },
      {
        title: { tr: 'Eğitim amaçlı yerleşim desteği', en: 'Relocation support for education' },
        text: {
          tr: 'Eğitim için yeni bir şehre taşınan aileler ve öğrenciler için yerleşim sürecini planlarız.',
          en: 'We plan the move for families and students relocating to a new city for education.',
        },
      },
    ],
    seo: {
      title: {
        tr: 'Equinoz Education: eğitim ve öğrenci danışmanlığı',
        en: 'Equinoz Education: education and student advisory',
      },
      description: {
        tr: 'Okul ve eğitim seçeneklerinin değerlendirilmesi, öğrenci ve aile ihtiyaç analizi, başvuru ve kayıt koordinasyonu, uluslararası eğitim ve yerleşim desteği.',
        en: 'Assessing school options, student and family needs analysis, application and enrolment coordination, international education and relocation support.',
      },
    },
  },
]

export const brandByKey = (key: BrandKey) => brands.find((brand) => brand.key === key)!
