import Image from 'next/image'
import ScrollArrow from '@/components/ui/scroll-arrow'

const founders = [
  {
    name: 'Ramazan Manzak',
    role: 'Co-Founder & Director, Business Development',
    linkedin: 'https://www.linkedin.com/in/ramazan-manzak-71851b183/',
    image: '/images/Ramazan.jpeg',
  },
  {
    name: 'Melissa Özkara',
    role: 'Co-Founder & Managing Director',
    linkedin: 'https://www.linkedin.com/in/melissa-%C3%B6zkara-03097542',
    image: null,
  },
]

const team = [
  {
    name: 'Dr. Selen Tunalı Butgel',
    role: 'Director, Education Pathways',
    linkedin: 'https://www.linkedin.com/in/selen-butgel-tunali-69468346',
    image: '/images/selen-tunalı-equinox.jpeg',
  },
]

// Legal Partners - commented out for now
// const legalPartners = [
//   {
//     name: 'Hamdan Al Shamsi',
//     role: 'Legal Partner',
//     company: 'HAS LAW, Business Bay',
//     linkedin: 'https://www.linkedin.com/in/hamdan-alshamsi-4314b0129',
//     image: '/images/hamdan-equinox.jpeg',
//   },
//   {
//     name: 'Yaşar Aksanoğlu',
//     role: 'Legal Partner',
//     company: 'Aksan Hukuk / Galle Consulting, Istanbul',
//     linkedin: 'https://www.linkedin.com/in/ya%C5%9Far-aksano%C4%9Flu-01308b61',
//     image: '/images/Yaşar-aksu-equinox.jpeg',
//   },
// ]

type PersonCardProps = {
  name: string
  role: string
  company?: string
  linkedin: string
  image?: string | null
}

function PersonCard({ name, role, company, linkedin, image }: PersonCardProps) {
  const isRamazan = name === 'Ramazan Manzak'

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-terracotta/20 group-hover:ring-terracotta/50 transition-all duration-300">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className={`w-full h-full object-cover ${isRamazan ? 'object-top' : 'object-center'}`}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-white text-2xl font-semibold">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <h4 className="text-lg font-semibold text-dark group-hover:text-terracotta transition-colors">{name}</h4>
      <p className="text-terracotta text-sm font-medium">{role}</p>
      {company && <p className="text-slate-500 text-sm mt-1">{company}</p>}
      {linkedin !== '#' && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-teal hover:text-teal-dark text-sm mt-3 transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18.52 0H1.477C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.478 20h17.04c.817 0 1.48-.645 1.48-1.44V1.44C20 .645 19.336 0 18.52 0ZM6.035 17.057H3.017V7.506h3.018v9.551ZM4.526 6.185a1.752 1.752 0 1 1 0-3.504 1.752 1.752 0 0 1 0 3.504Zm12.53 10.872h-3.014v-4.648c0-1.108-.02-2.534-1.544-2.534-1.546 0-1.783 1.207-1.783 2.454v4.728H7.702V7.506h2.894v1.305h.04c.403-.762 1.387-1.566 2.854-1.566 3.053 0 3.616 2.01 3.616 4.623v5.19h-.05Z"/>
          </svg>
          LinkedIn
        </a>
      )}
    </div>
  )
}

export default function TeamEquinoz() {
  return (
    <section id="team" className="py-20 md:py-28 bg-sage/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
          <span className="inline-block text-terracotta text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-playfair-display text-dark mb-6">
            Leadership
          </h2>
          <p className="text-lg text-slate-600">
            Our team combines decades of international experience with deep local expertise,
            supported by a trusted network of legal partners.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-center text-sm font-semibold text-terracotta uppercase tracking-wider mb-8" data-aos="fade-up" data-aos-delay="100">Founders</h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {founders.map((person, idx) => (
              <div key={idx} data-aos="zoom-in" data-aos-delay={150 + idx * 100}>
                <PersonCard {...person} />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-center text-sm font-semibold text-terracotta uppercase tracking-wider mb-8" data-aos="fade-up" data-aos-delay="200">Team</h3>
          <div className="grid sm:grid-cols-1 gap-6 max-w-sm mx-auto">
            {team.map((person, idx) => (
              <div key={idx} data-aos="zoom-in" data-aos-delay={250 + idx * 100}>
                <PersonCard {...person} />
              </div>
            ))}
          </div>
        </div>

        {/* Legal Partners - commented out for now */}
        {/* <div>
          <h3 className="text-center text-sm font-semibold text-terracotta uppercase tracking-wider mb-8" data-aos="fade-up" data-aos-delay="300">Legal Partners</h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {legalPartners.map((person, idx) => (
              <div key={idx} data-aos="zoom-in" data-aos-delay={350 + idx * 100}>
                <PersonCard {...person} />
              </div>
            ))}
          </div>
        </div> */}

        <div className="flex justify-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <ScrollArrow targetId="contact" />
        </div>
      </div>
    </section>
  )
}

