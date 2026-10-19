import type { BrandKey } from '@/lib/content/brands'
import type { L } from '@/lib/i18n'

export type Faq = { question: L; answer: L }

export const faqCopy = {
  eyebrow: { tr: 'Sık sorulan sorular', en: 'Frequently asked questions' },
  title: { tr: 'Merak edilenler.', en: 'What people ask us.' },
  lead: {
    tr: 'Burada yanıtını bulamadığınız her soruyu özel bir görüşmede konuşabiliriz.',
    en: 'Anything not answered here, we can talk through in a private consultation.',
  },
}

export const homeFaq: Faq[] = [
  {
    question: {
      tr: 'Equinoz yalnızca Dubai’de şirket kuruluşu mu yapıyor?',
      en: 'Does Equinoz only handle company formation in Dubai?',
    },
    answer: {
      tr: 'Hayır. BAE’de şirket kuruluşu, Equinoz Consulting’in hizmetlerinden biri. Ana odağımız özel müşteriler ve aileler, family office, uluslararası yapılanma, servet planlaması, iş geliştirme ve büyük ölçekli ticari işler.',
      en: 'No. Company formation in the UAE is one of Equinoz Consulting’s services. Our main focus is private clients and families, family office, international structuring, wealth planning, business development and large-scale commercial work.',
    },
  },
  {
    question: {
      tr: 'Yalnızca Türkiye’den gelen müşterilerle mi çalışıyorsunuz?',
      en: 'Do you only work with clients from Türkiye?',
    },
    answer: {
      tr: 'Hayır. Türkiye önceliğimiz; Avrupa’dan, Amerika’dan, Asya’dan, Körfez’den ve diğer bölgelerden gelen müşterilerle de çalışıyoruz.',
      en: 'No. Türkiye is our priority market, and we also work with clients from Europe, the Americas, Asia, the Gulf and beyond.',
    },
  },
  {
    question: {
      tr: 'Equinoz sizi başka firmalara mı yönlendiriyor?',
      en: 'Does Equinoz simply refer you to other firms?',
    },
    answer: {
      tr: 'Hayır. Equinoz Global hizmetlerini kendi ekibiyle sunar ve işi ilk görüşmeden sonuna kadar sahiplenir. Gerektiğinde bağımsız iş ortaklarımızla birlikte çalışırız; iş ortaklarımız Equinoz’un markaları ya da çalışanları değildir.',
      en: 'No. Equinoz Global delivers its services with its own team and owns the work from the first conversation to the end. Where needed we work alongside independent partners, who are not Equinoz brands or staff.',
    },
  },
  {
    question: {
      tr: 'Gayrimenkul ilanı ya da proje kataloğu sunuyor musunuz?',
      en: 'Do you publish property listings or project catalogues?',
    },
    answer: {
      tr: 'Hayır. Gayrimenkulde ilan platformu değil, danışmanlık hizmeti sunuyoruz. Bina, arsa ve ticari gayrimenkul ihtiyaçlarına yönelik büyük ölçekli danışmanlık Equinoz Global altında yer alır.',
      en: 'No. In real estate we are an advisory service, not a listings platform. Large-scale advisory for buildings, land and commercial property sits under Equinoz Global.',
    },
  },
  {
    question: {
      tr: 'Birden fazla alanda desteğe ihtiyacım var. Her markaya ayrı ayrı mı başvurmalıyım?',
      en: 'I need help in more than one area. Should I contact each brand separately?',
    },
    answer: {
      tr: 'Hayır. Dört marka aynı çatının uzmanlık alanlarıdır. Bütün ihtiyaçlarınızı tek bir görüşmede konuşur, ilgili uzmanlıkları tek bir plan altında yönetiriz.',
      en: 'No. The four brands are disciplines of the same house. We can cover all your needs in a single conversation and run the relevant disciplines under one plan.',
    },
  },
]

export const contactFaq: Faq[] = [
  {
    question: { tr: 'Fiyat listeniz ya da hazır paketleriniz var mı?', en: 'Do you have a price list or packages?' },
    answer: {
      tr: 'Hayır. Önce özel bir görüşmede ihtiyacınızı dinliyor, ardından size özel bir teklif hazırlıyoruz.',
      en: 'No. We first listen to your needs in a private consultation, then prepare a proposal for you.',
    },
  },
  {
    question: { tr: 'Talebim kime ulaşıyor?', en: 'Who receives my request?' },
    answer: {
      tr: 'Hangi marka ya da hizmetle ilgili olursa olsun, her talep önce yönetimimize ulaşır. İşiniz oradan ihtiyacınıza en uygun uzmanlığa yönlendirilir.',
      en: 'Whichever brand or service it concerns, every request reaches our leadership first. From there your work is directed to the discipline that fits it best.',
    },
  },
  {
    question: { tr: 'WhatsApp mı, form mu?', en: 'WhatsApp or the form?' },
    answer: {
      tr: 'İkisi de bize ulaşır. Hızlıca yazmak isterseniz WhatsApp’ı, durumunuzu ayrıntılı anlatmak isterseniz formu kullanabilirsiniz.',
      en: 'Both reach us. Use WhatsApp for a quick message, or the form if you would like to describe your situation in more detail.',
    },
  },
  {
    question: { tr: 'Hangi hizmeti seçeceğimden emin değilim.', en: 'I am not sure which service to choose.' },
    answer: {
      tr: 'Formda “Diğer ya da emin değilim” seçeneğini işaretleyip durumunuzu kısaca anlatmanız yeterli. Doğru uzmanlığı birlikte belirleriz.',
      en: 'Choose “Other, or not sure yet” in the form and describe your situation briefly. We will find the right discipline together.',
    },
  },
  {
    question: { tr: 'Paylaştığım bilgiler nasıl kullanılıyor?', en: 'How is the information I share used?' },
    answer: {
      tr: 'Formdaki bilgileri yalnızca talebinize yanıt vermek için kullanırız.',
      en: 'We use the information in the form only to respond to your request.',
    },
  },
]

export const brandFaq: Record<BrandKey, Faq[]> = {
  global: [
    {
      question: { tr: 'Equinoz Global kimler için?', en: 'Who is Equinoz Global for?' },
      answer: {
        tr: 'Uluslararası yapılanma, servet planlaması, family office, iş geliştirme, büyük ölçekli gayrimenkul ya da teknoloji ihtiyacı olan aileler, özel müşteriler ve şirketler için.',
        en: 'For families, private clients and companies whose needs involve international structuring, wealth planning, family office, business development, large-scale real estate or technology.',
      },
    },
    {
      question: {
        tr: 'Varlıklarımızı başka bir ülkeye taşımayı düşünüyoruz. Nereden başlamalıyız?',
        en: 'We are thinking of moving our assets to another country. Where should we start?',
      },
      answer: {
        tr: 'Özel bir görüşmeyle. Ailenizin durumunu ve hedeflerini dinledikten sonra varlık ve servet yapılandırmasını, taşıma sürecinin planlamasını ve koordinasyonunu birlikte ele alırız.',
        en: 'With a private consultation. Once we understand your family’s position and goals, we work through asset and wealth structuring and the planning and coordination of the move together.',
      },
    },
    {
      question: {
        tr: 'Teknoloji ve yapay zekâ çözümleriniz yalnızca Equinoz için mi?',
        en: 'Are your technology and AI solutions only for Equinoz?',
      },
      answer: {
        tr: 'Hayır. Teknoloji ve yapay zekâ çözümleri dış müşterilere de sunduğumuz bir hizmet alanıdır.',
        en: 'No. Technology and AI solutions are a service we also offer to outside clients.',
      },
    },
  ],
  consulting: [
    {
      question: { tr: 'Mainland mi, Freezone mu?', en: 'Mainland or free zone?' },
      answer: {
        tr: 'Doğru seçim faaliyet alanınıza ve hedeflerinize bağlıdır. Lisans ve faaliyet alanı planlamasını kuruluştan önce birlikte yaparız.',
        en: 'The right choice depends on your activity and goals. We plan the licence and business activity with you before formation.',
      },
    },
    {
      question: {
        tr: 'Banka hesabı açılışını garanti ediyor musunuz?',
        en: 'Do you guarantee that a bank account will be opened?',
      },
      answer: {
        tr: 'Hayır. Banka hesabı başvurusunun koordinasyonunu üstleniriz; onay kararı bankaya aittir.',
        en: 'No. We coordinate the bank account application; the decision belongs to the bank.',
      },
    },
    {
      question: {
        tr: 'Mortgage ve gayrimenkul yatırımı aynı markada mı?',
        en: 'Are mortgages and real estate investment under the same brand?',
      },
      answer: {
        tr: 'Hayır. Finans ve mortgage danışmanlığı Equinoz Consulting altında sunulur. Büyük ölçekli gayrimenkul yatırım danışmanlığı Equinoz Global’in alanıdır.',
        en: 'No. Finance and mortgage advisory sits under Equinoz Consulting, while large-scale real estate investment advisory belongs to Equinoz Global.',
      },
    },
  ],
  accounting: [
    {
      question: { tr: 'Equinoz Accounting neleri kapsıyor?', en: 'What does Equinoz Accounting cover?' },
      answer: {
        tr: 'Muhasebe ve defter tutma, finansal tablolar, yönetim raporları, KDV ve Kurumlar Vergisi kayıt ve beyan süreçleri ile mali süreç danışmanlığı.',
        en: 'Accounting and bookkeeping, financial statements, management reports, VAT and Corporate Tax registration and filing, and financial process advisory.',
      },
    },
    {
      question: {
        tr: 'Şirket kuruluşu ile muhasebeyi birlikte planlayabilir miyiz?',
        en: 'Can we plan company formation and accounting together?',
      },
      answer: {
        tr: 'Evet. Kuruluşu Equinoz Consulting, muhasebe ve vergi uyumunu Equinoz Accounting ile aynı plan içinde ele alırız.',
        en: 'Yes. We handle formation through Equinoz Consulting and accounting and tax compliance through Equinoz Accounting, within one plan.',
      },
    },
  ],
  education: [
    {
      question: { tr: 'Equinoz Education hangi konularda destek veriyor?', en: 'What does Equinoz Education help with?' },
      answer: {
        tr: 'Okul ve eğitim seçeneklerinin değerlendirilmesi, öğrenci ve aile ihtiyaç analizi, başvuru ve kayıt koordinasyonu, uluslararası eğitim seçenekleri ve eğitim amaçlı yerleşim desteği.',
        en: 'Evaluating schools and education options, student and family needs analysis, application and enrolment coordination, international education options and relocation support for education.',
      },
    },
    {
      question: { tr: 'Okul kabulünü garanti ediyor musunuz?', en: 'Do you guarantee admission?' },
      answer: {
        tr: 'Hayır. Başvuru ve kayıt sürecini koordine ederiz; kabul kararı okula aittir.',
        en: 'No. We coordinate the application and enrolment process; the admission decision belongs to the school.',
      },
    },
    {
      question: {
        tr: 'Taşınma ile okul planını birlikte yapabilir miyiz?',
        en: 'Can we plan the move and the schooling together?',
      },
      answer: {
        tr: 'Evet. Eğitim amaçlı yerleşim desteği Equinoz Education’ın kapsamındadır; oturum ve sponsorluk gibi konuları gerektiğinde Equinoz Consulting ile aynı plan içinde ele alırız.',
        en: 'Yes. Relocation support for education is part of Equinoz Education, and where needed we handle residency and sponsorship with Equinoz Consulting within the same plan.',
      },
    },
  ],
}
