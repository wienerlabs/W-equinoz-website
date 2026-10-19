import type { StaticImageData } from 'next/image'
import type { L, RouteKey } from '@/lib/i18n'
import familyOffice from '@/assets/media/family-office.jpg'
import structuring from '@/assets/media/structuring.jpg'
import tradeCreek from '@/assets/media/trade-creek.jpg'
import realEstate from '@/assets/media/real-estate.jpg'
import technology from '@/assets/media/technology.jpg'

export type ServiceKey = 'familyOffice' | 'structuring' | 'trade' | 'realEstate' | 'technology'

type Item = { title: L; text: L }

export type Service = {
  key: ServiceKey
  route: RouteKey
  number: string
  title: L
  lead: L
  image: StaticImageData
  imageAlt: L
  focus: string
  scope: Item[]
  audience: L[]
  approach: Item[]
  note?: L
  seo: { title: L; description: L }
}

export const services: Service[] = [
  {
    key: 'familyOffice',
    route: 'familyOffice',
    number: '01',
    title: { tr: 'Family office ve özel müşteri hizmetleri', en: 'Family office and private client services' },
    lead: {
      tr: 'Ailenizin varlıklarını, işlerini ve geleceğini tek bir planda bir araya getiriyoruz. Uluslararası yapılanmadan nesil geçişine kadar, aileniz için uzun vadeli ve gizli bir yapı kuruyoruz.',
      en: 'We bring your family’s assets, businesses and future together in a single plan. From international structuring to succession, we build a long-term, confidential framework around your family.',
    },
    image: familyOffice,
    imageAlt: {
      tr: 'Palm Jumeirah’daki villalar ve arkada Dubai Marina silueti',
      en: 'Villas on Palm Jumeirah with the Dubai Marina skyline behind',
    },
    focus: '50% 60%',
    scope: [
      {
        title: { tr: 'Uluslararası yapılanma', en: 'International structuring' },
        text: {
          tr: 'Aile ve özel müşteri varlıklarının ülkeler arasında nasıl konumlanacağını planlarız.',
          en: 'We plan how family and private client assets should be positioned across countries.',
        },
      },
      {
        title: { tr: 'Varlık ve servet yapılandırması', en: 'Asset and wealth structuring' },
        text: {
          tr: 'Varlıkların sahiplik ve yönetim yapısını ailenin hedeflerine göre düzenleriz.',
          en: 'We shape ownership and management of assets around the family’s goals.',
        },
      },
      {
        title: { tr: 'Servet taşıma süreçleri', en: 'Wealth transfer' },
        text: {
          tr: 'Servetin yeni bir ülkeye taşınma sürecini planlar ve baştan sona koordine ederiz.',
          en: 'We plan the move of wealth to a new country and coordinate it from start to finish.',
        },
      },
      {
        title: { tr: 'Uzun vadeli aile planlaması', en: 'Long-term family planning' },
        text: {
          tr: 'Ailenin bugünkü ihtiyaçlarını ve gelecek hedeflerini aynı planda buluştururuz.',
          en: 'We bring the family’s present needs and future goals into the same plan.',
        },
      },
      {
        title: { tr: 'Nesil geçişi', en: 'Succession' },
        text: {
          tr: 'Varlıkların ve işlerin bir sonraki nesle düzenli biçimde geçmesine hazırlık yaparız.',
          en: 'We prepare for assets and businesses to pass to the next generation in an orderly way.',
        },
      },
    ],
    audience: [
      { tr: 'Birden fazla ülkede varlığı ya da işi olan aileler', en: 'Families with assets or businesses in more than one country' },
      { tr: 'Servetini yeni bir ülkeye taşımayı planlayan özel müşteriler', en: 'Private clients planning to move their wealth to a new country' },
      { tr: 'Aile işini bir sonraki nesle devretmeye hazırlanan girişimciler', en: 'Founders preparing to hand a family business to the next generation' },
      { tr: 'Kendi family office yapısını kurmak isteyen aileler', en: 'Families that want to set up their own family office' },
    ],
    approach: [
      {
        title: { tr: 'Gizli bir ilk görüşme', en: 'A confidential first meeting' },
        text: { tr: 'Ailenizi, önceliklerinizi ve endişelerinizi dinleriz.', en: 'We listen to your family, your priorities and your concerns.' },
      },
      {
        title: { tr: 'Ailenin haritası', en: 'Mapping the family' },
        text: {
          tr: 'Varlıkları, işleri, kişileri ve hedefleri tek bir resimde toplarız.',
          en: 'We gather assets, businesses, people and goals into one picture.',
        },
      },
      {
        title: { tr: 'Yapı ve takvim', en: 'Structure and timeline' },
        text: {
          tr: 'Önerdiğimiz yapıyı ve uygulama takvimini sizinle birlikte netleştiririz.',
          en: 'We agree the proposed structure and the timeline for putting it in place.',
        },
      },
      {
        title: { tr: 'Koordinasyon ve takip', en: 'Coordination and follow-up' },
        text: {
          tr: 'Uygulamayı yönetir, planı ailenin değişen ihtiyaçlarına göre düzenli olarak gözden geçiririz.',
          en: 'We manage the execution and review the plan as the family’s needs change.',
        },
      },
    ],
    seo: {
      title: {
        tr: 'Family office ve özel müşteri hizmetleri, Dubai',
        en: 'Family office and private client services in Dubai',
      },
      description: {
        tr: 'Ailelerin ve özel müşterilerin uluslararası yapılanması, servet yapılandırması, servet taşıma, uzun vadeli aile planlaması ve nesil geçişi için Equinoz Global.',
        en: 'Equinoz Global advises families and private clients on international structuring, wealth structuring, wealth transfer, long-term family planning and succession.',
      },
    },
  },
  {
    key: 'structuring',
    route: 'structuring',
    number: '02',
    title: { tr: 'Uluslararası yapılanma ve servet planlaması', en: 'International structuring and wealth planning' },
    lead: {
      tr: 'Varlıklarınızın ve işlerinizin hangi ülkede, hangi yapıyla ve hangi sırayla konumlanacağını birlikte planlıyoruz. Servet taşıma ve yeniden yapılandırma süreçlerini tek elden koordine ediyoruz.',
      en: 'We plan with you where your assets and businesses should sit, under which structures and in what order. We coordinate the transfer and restructuring of wealth from a single point.',
    },
    image: structuring,
    imageAlt: {
      tr: 'Yukarıdan Downtown Dubai ve Burj Khalifa',
      en: 'Downtown Dubai and the Burj Khalifa from above',
    },
    focus: '55% 40%',
    scope: [
      {
        title: { tr: 'Uluslararası yapılanma planı', en: 'International structuring plan' },
        text: {
          tr: 'Kişisel ve kurumsal varlıklar için ülke ve yapı seçeneklerini birlikte değerlendiririz.',
          en: 'We assess country and structure options for personal and corporate assets with you.',
        },
      },
      {
        title: { tr: 'Varlık ve servet yapılandırması', en: 'Asset and wealth structuring' },
        text: {
          tr: 'Mevcut varlıkları hedeflerinize uygun, sade ve yönetilebilir bir yapıya kavuştururuz.',
          en: 'We bring existing assets into a structure that is simple, manageable and fit for your goals.',
        },
      },
      {
        title: { tr: 'Servet taşıma planlaması', en: 'Wealth transfer planning' },
        text: {
          tr: 'Servetin hangi adımlarla ve hangi sırayla taşınacağını planlarız.',
          en: 'We plan the steps and the order in which wealth is moved.',
        },
      },
      {
        title: { tr: 'Süreç koordinasyonu', en: 'Process coordination' },
        text: {
          tr: 'Uygulamayı ilgili kurumlar ve danışmanlarla birlikte tek bir takvim üzerinden yürütürüz.',
          en: 'We run the execution with the institutions and advisers involved, on a single timeline.',
        },
      },
    ],
    audience: [
      { tr: 'Yeni bir ülkede yapılanmayı düşünen aileler ve girişimciler', en: 'Families and founders considering a structure in a new country' },
      { tr: 'Varlıklarını ülkeler arasında yeniden düzenlemek isteyen özel müşteriler', en: 'Private clients who want to reorganise assets across countries' },
      { tr: 'Dubai’yi bölgesel merkez olarak konumlandırmak isteyen şirket sahipleri', en: 'Business owners who want to make Dubai their regional hub' },
    ],
    approach: [
      {
        title: { tr: 'Mevcut durum', en: 'Where you stand' },
        text: { tr: 'Varlıklarınızı, yapılarınızı ve hedeflerinizi birlikte gözden geçiririz.', en: 'We review your assets, structures and goals together.' },
      },
      {
        title: { tr: 'Seçenekler', en: 'Options' },
        text: {
          tr: 'Uygun ülke ve yapı seçeneklerini artı ve eksileriyle önünüze koyarız.',
          en: 'We lay out suitable countries and structures, with their trade-offs.',
        },
      },
      {
        title: { tr: 'Plan ve takvim', en: 'Plan and timeline' },
        text: { tr: 'Seçilen yol için adım adım bir uygulama planı hazırlarız.', en: 'We prepare a step-by-step plan for the chosen route.' },
      },
      {
        title: { tr: 'Koordinasyon', en: 'Coordination' },
        text: { tr: 'Uygulamayı tek elden yönetir, sizi her adımda bilgilendiririz.', en: 'We manage the execution and keep you informed at every step.' },
      },
    ],
    seo: {
      title: {
        tr: 'Uluslararası yapılanma ve servet planlaması, Dubai',
        en: 'International structuring and wealth planning from Dubai',
      },
      description: {
        tr: 'Varlıkların ülkeler arasında konumlanması, servet yapılandırması ve servet taşıma süreçlerinin planlanması ve koordinasyonu için Equinoz Global.',
        en: 'Equinoz Global plans where assets sit across countries, structures wealth and coordinates the transfer of wealth for families, founders and private clients.',
      },
    },
  },
  {
    key: 'trade',
    route: 'trade',
    number: '03',
    title: { tr: 'İş geliştirme, B2B ve uluslararası ticaret', en: 'Business development, B2B and international trade' },
    lead: {
      tr: 'Yeni pazarlara açılmak, doğru ortakları bulmak ve şirketler arasında kalıcı ticari ilişkiler kurmak isteyen işletmelerle çalışıyoruz.',
      en: 'We work with companies that want to enter new markets, find the right partners and build lasting commercial relationships.',
    },
    image: tradeCreek,
    imageAlt: {
      tr: 'Dubai Creek’te yol alan geleneksel bir dhow teknesi',
      en: 'A traditional dhow sailing on Dubai Creek',
    },
    focus: '50% 55%',
    scope: [
      {
        title: { tr: 'Yeni pazarlara giriş', en: 'Entering new markets' },
        text: {
          tr: 'Hedef pazarı, giriş yolunu ve ilk adımları birlikte belirleriz.',
          en: 'We define the target market, the route in and the first steps with you.',
        },
      },
      {
        title: { tr: 'Ticari bağlantılar', en: 'Commercial connections' },
        text: {
          tr: 'İşinize değer katacak ticari bağlantıları geliştirmenize yardımcı oluruz.',
          en: 'We help you develop the commercial connections that add value to your business.',
        },
      },
      {
        title: { tr: 'B2B ilişkiler', en: 'B2B relationships' },
        text: {
          tr: 'Şirketler arasında güvene dayalı, uzun soluklu ilişkiler kurulmasına aracılık ederiz.',
          en: 'We help build trusted, long-term relationships between companies.',
        },
      },
      {
        title: { tr: 'İş ortaklıkları', en: 'Partnerships' },
        text: {
          tr: 'Ortaklık seçeneklerini değerlendirir, görüşmeleri hazırlarız.',
          en: 'We assess partnership options and prepare the conversations.',
        },
      },
      {
        title: { tr: 'Uluslararası ticari fırsatlar', en: 'International opportunities' },
        text: {
          tr: 'Önünüze gelen ticari fırsatları hedeflerinize göre değerlendiririz.',
          en: 'We assess the commercial opportunities in front of you against your goals.',
        },
      },
    ],
    audience: [
      { tr: 'Körfez’e ve BAE pazarına açılmak isteyen şirketler', en: 'Companies looking to enter the Gulf and the UAE market' },
      { tr: 'Türkiye’den yurt dışına büyümek isteyen üreticiler ve markalar', en: 'Manufacturers and brands growing abroad from Türkiye' },
      { tr: 'Bölgede güvenilir iş ortağı arayan uluslararası firmalar', en: 'International firms looking for trusted partners in the region' },
    ],
    approach: [
      {
        title: { tr: 'Hedef', en: 'The goal' },
        text: { tr: 'Ne satmak, kiminle çalışmak ve nereye ulaşmak istediğinizi netleştiririz.', en: 'We clarify what you want to sell, who you want to work with and where you want to go.' },
      },
      {
        title: { tr: 'Bağlantı haritası', en: 'A map of connections' },
        text: { tr: 'Hedefinize giden yoldaki doğru kişileri ve kurumları belirleriz.', en: 'We identify the right people and organisations on the way to your goal.' },
      },
      {
        title: { tr: 'Tanışma ve görüşmeler', en: 'Introductions and meetings' },
        text: { tr: 'Görüşmeleri hazırlar, sürece eşlik ederiz.', en: 'We prepare the meetings and stay with you through the process.' },
      },
      {
        title: { tr: 'Takip ve büyüme', en: 'Follow-up and growth' },
        text: { tr: 'Kurulan ilişkilerin işe dönüşmesi için takibi sürdürürüz.', en: 'We keep following up so relationships turn into business.' },
      },
    ],
    seo: {
      title: {
        tr: 'İş geliştirme, B2B ve uluslararası ticaret, Dubai',
        en: 'Business development, B2B and international trade, Dubai',
      },
      description: {
        tr: 'Yeni pazarlara giriş, ticari bağlantılar, şirketler arası B2B ilişkiler, iş ortaklıkları ve uluslararası ticari fırsatlar için Equinoz Global.',
        en: 'Equinoz Global helps companies enter new markets, build commercial connections, B2B relationships and partnerships, and assess international opportunities.',
      },
    },
  },
  {
    key: 'realEstate',
    route: 'realEstate',
    number: '04',
    title: { tr: 'Büyük ölçekli gayrimenkul danışmanlığı', en: 'Large-scale real estate advisory' },
    lead: {
      tr: 'Bina, arsa ve ticari gayrimenkul ihtiyaçlarında yatırım odaklı danışmanlık veriyoruz. İlan ya da proje kataloğu yayımlamıyoruz; her talebi kendi ihtiyacı üzerinden ele alıyoruz.',
      en: 'We give investment-focused advice on buildings, land and commercial property. We do not publish listings or project catalogues; every request is handled on its own terms.',
    },
    image: realEstate,
    imageAlt: {
      tr: 'Yukarıdan Dubai Marina, Palm Jumeirah ve kıyı şeridi',
      en: 'Dubai Marina, Palm Jumeirah and the coastline from above',
    },
    focus: '45% 55%',
    scope: [
      {
        title: { tr: 'İhtiyacın netleştirilmesi', en: 'Defining the need' },
        text: {
          tr: 'Kullanım amacını, bütçe çerçevesini ve zaman planını birlikte belirleriz.',
          en: 'We define the purpose, the budget frame and the timeline with you.',
        },
      },
      {
        title: { tr: 'Bina, arsa ve ticari gayrimenkul', en: 'Buildings, land and commercial property' },
        text: {
          tr: 'Kurumsal ve ticari ölçekteki gayrimenkul ihtiyaçlarına danışmanlık veririz.',
          en: 'We advise on property needs at corporate and commercial scale.',
        },
      },
      {
        title: { tr: 'Gayrimenkul yatırım danışmanlığı', en: 'Real estate investment advisory' },
        text: {
          tr: 'Yatırım kararlarını hedeflerinize ve risk anlayışınıza göre birlikte değerlendiririz.',
          en: 'We assess investment decisions against your goals and your view of risk.',
        },
      },
      {
        title: { tr: 'Seçeneklerin değerlendirilmesi', en: 'Assessing the options' },
        text: {
          tr: 'Uygun seçenekleri karşılaştırır, karar vermenizi kolaylaştırırız.',
          en: 'We compare suitable options and make the decision easier.',
        },
      },
    ],
    audience: [
      { tr: 'Kurumsal kullanım için bina ya da arsa arayan şirketler', en: 'Companies looking for a building or land for their own use' },
      { tr: 'Ticari gayrimenkule yatırım yapmak isteyen aileler ve yatırımcılar', en: 'Families and investors who want to invest in commercial property' },
      { tr: 'Büyük ölçekli projeler için arazi arayan girişimciler', en: 'Developers and founders looking for land for large projects' },
    ],
    approach: [
      {
        title: { tr: 'İhtiyaç', en: 'The need' },
        text: { tr: 'Ne aradığınızı ve neden aradığınızı birlikte netleştiririz.', en: 'We clarify what you are looking for, and why.' },
      },
      {
        title: { tr: 'Araştırma', en: 'Research' },
        text: { tr: 'İhtiyacınıza uygun seçenekleri araştırır ve ön elemeyi yaparız.', en: 'We research options that fit and make the first selection.' },
      },
      {
        title: { tr: 'Değerlendirme', en: 'Assessment' },
        text: { tr: 'Seçenekleri sizinle birlikte, yatırım gözüyle değerlendiririz.', en: 'We assess the options with you, through an investment lens.' },
      },
      {
        title: { tr: 'Karar ve süreç', en: 'Decision and process' },
        text: { tr: 'Karar sonrası adımlarda yanınızda oluruz.', en: 'We stay with you through the steps that follow the decision.' },
      },
    ],
    note: {
      tr: 'Gayrimenkul alanında bir ilan platformu değil, danışmanlık hizmeti sunuyoruz. Sitemizde konut ilanı ya da proje kataloğu yer almaz.',
      en: 'In real estate we offer advice, not a listings platform. You will not find residential listings or project catalogues on this site.',
    },
    seo: {
      title: {
        tr: 'Büyük ölçekli gayrimenkul danışmanlığı, Dubai',
        en: 'Large-scale real estate advisory in Dubai',
      },
      description: {
        tr: 'Bina, arsa ve ticari gayrimenkul ihtiyaçları için yatırım odaklı danışmanlık. Equinoz Global ilan değil, danışmanlık sunar.',
        en: 'Investment-focused advice on buildings, land and commercial property. Equinoz Global offers advice, not listings.',
      },
    },
  },
  {
    key: 'technology',
    route: 'technology',
    number: '05',
    title: { tr: 'Teknoloji ve yapay zekâ çözümleri', en: 'Technology and AI solutions' },
    lead: {
      tr: 'Şirketlerin teknoloji ve yapay zekâ ihtiyaçlarını değerlendiriyor, işlerine uygun çözümleri birlikte planlıyoruz. Bu hizmeti Equinoz’un dışındaki şirketlere de sunuyoruz.',
      en: 'We assess companies’ technology and AI needs and plan solutions that fit the way they work. This service is open to companies outside Equinoz as well.',
    },
    image: technology,
    imageAlt: {
      tr: 'Museum of the Future’ın hat sanatlı cephesi ve mavi gökyüzü',
      en: 'The calligraphy facade of the Museum of the Future against a blue sky',
    },
    focus: '50% 50%',
    scope: [
      {
        title: { tr: 'İhtiyaç değerlendirmesi', en: 'Needs assessment' },
        text: {
          tr: 'İşinizde teknolojinin ve yapay zekânın nerede fark yaratabileceğini birlikte belirleriz.',
          en: 'We identify together where technology and AI can make a difference in your business.',
        },
      },
      {
        title: { tr: 'Çözüm planlaması', en: 'Solution planning' },
        text: {
          tr: 'İhtiyacınıza uygun çözümü ve uygulama yolunu planlarız.',
          en: 'We plan the right solution and the route to put it in place.',
        },
      },
      {
        title: { tr: 'Uygulama koordinasyonu', en: 'Implementation coordination' },
        text: {
          tr: 'Uygulama sürecini takip eder, işinize uyumunu gözetiriz.',
          en: 'We follow the implementation and keep it aligned with your business.',
        },
      },
    ],
    audience: [
      { tr: 'Süreçlerini dijitalleştirmek isteyen şirketler', en: 'Companies that want to digitise their processes' },
      { tr: 'Yapay zekâdan somut fayda bekleyen işletmeler', en: 'Businesses looking for concrete value from AI' },
    ],
    approach: [
      {
        title: { tr: 'Anlamak', en: 'Understand' },
        text: { tr: 'İşinizi ve mevcut süreçlerinizi dinleriz.', en: 'We listen to how your business and processes work today.' },
      },
      {
        title: { tr: 'Planlamak', en: 'Plan' },
        text: { tr: 'Önceliklendirilmiş bir çözüm planı hazırlarız.', en: 'We prepare a prioritised solution plan.' },
      },
      {
        title: { tr: 'Uygulamak', en: 'Deliver' },
        text: { tr: 'Uygulamayı adım adım yönetir, sonuçlarını sizinle birlikte izleriz.', en: 'We manage the rollout step by step and track the results with you.' },
      },
    ],
    seo: {
      title: {
        tr: 'Teknoloji ve yapay zekâ çözümleri, Equinoz Global',
        en: 'Technology and AI solutions, Equinoz Global',
      },
      description: {
        tr: 'Şirketlerin teknoloji ve yapay zekâ ihtiyaçlarını değerlendiren, işlerine uygun çözümleri planlayan Equinoz Global hizmeti.',
        en: 'Equinoz Global assesses companies’ technology and AI needs and plans solutions that fit the way they work.',
      },
    },
  },
]

export const serviceByRoute = (route: RouteKey) => services.find((service) => service.route === route)
