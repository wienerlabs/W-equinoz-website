import Image from 'next/image'

export default function AboutEquinoz() {
  const values = [
    {
      title: 'Integrity',
      description: 'Every partnership is built on an unshakable foundation of ethics.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Precision',
      description: 'Advice rooted in insight, delivered with clarity and care.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Confidentiality',
      description: 'Privacy is not a promise — it is a principle.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'Human Understanding',
      description: 'Behind every structure, we recognize the human story that shapes it.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="about" className="py-20 md:py-28 bg-clay relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
          <span className="inline-block text-terracotta text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            About EQUINOZ
          </span>
          <h2 className="text-3xl md:text-4xl font-playfair-display text-dark mb-6">
            The Balance Between Opportunity & Stability
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            EQUINOZ was founded on the principle of <em>Equilibrium</em> — the balance between opportunity
            and stability, the cornerstone of lasting success. With over 15 years of global experience
            and deep understanding of the UAE&apos;s dynamics, we guide distinguished families and
            entrepreneurs through growth, settlement, and transition processes.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div data-aos="fade-right" data-aos-delay="200">
                <h3 className="text-xl font-semibold text-dark mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  To connect distinguished global families and visionary entrepreneurs with the UAE&apos;s
                  growing opportunity ecosystem through smart structuring, cultural awareness, and
                  absolute confidentiality.
                </p>
              </div>
              <div data-aos="fade-left" data-aos-delay="300">
                <h3 className="text-xl font-semibold text-dark mb-4">Our Philosophy</h3>
                <p className="text-slate-600 leading-relaxed">
                  A balance point where strategy meets precision, and clarity meets intention. EQUINOZ
                  is not just a consultant, but a <em>transition partner</em> — ensuring growth, relocation,
                  and investment decisions are executed with foresight, stability, and integrity.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 min-h-[280px]" data-aos="fade-left" data-aos-delay="200">
            <Image
              src="/images/dubai-2.avif"
              alt="Dubai Business District"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-medium">Dubai, UAE</p>
              <p className="text-white/70 text-xs">Gateway to Global Opportunities</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
            >
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta mb-4 group-hover:bg-terracotta group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {value.icon}
              </div>
              <h4 className="text-lg font-semibold text-dark mb-2 group-hover:text-terracotta transition-colors">{value.title}</h4>
              <p className="text-slate-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

