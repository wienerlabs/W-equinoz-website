import Image from 'next/image'

export default function HeroEquinoz() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dubai Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/dubai.avif"
          alt="Dubai Skyline"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-dark/75 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-br from-dark/90 via-dark/70 to-teal-dark/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-dark to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-teal/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6" data-aos="fade-down" data-aos-delay="100">
              <span className="inline-block text-terracotta text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-pulse">
                Dubai, UAE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair-display text-white mb-6 leading-tight" data-aos="fade-up" data-aos-delay="200">
              Global Vision.<br />
              <span className="text-terracotta">Preserving Legacy.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              EQUINOZ is a Dubai-based private-client advisory firm — guiding HNW and UHNW families
              toward secure, meaningful, and strategic establishment in the UAE and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
              <a
                href="#contact"
                className="btn bg-terracotta text-white hover:bg-terracotta-dark hover:scale-105 px-8 py-3 rounded-md font-semibold transition-all duration-300 group shadow-lg shadow-terracotta/25"
              >
                Start the Conversation
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
              </a>
              <a
                href="#about"
                className="btn border border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3 rounded-md font-semibold transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="500">
            <div className="text-center group" data-aos="zoom-in" data-aos-delay="600">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-terracotta/20 flex items-center justify-center group-hover:bg-terracotta/30 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Advisory Excellence</h3>
              <p className="text-slate-400 text-sm">360-degree turnkey solutions for strategic establishment</p>
            </div>

            <div className="text-center group" data-aos="zoom-in" data-aos-delay="700">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-terracotta/20 flex items-center justify-center group-hover:bg-terracotta/30 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Global Access</h3>
              <p className="text-slate-400 text-sm">Connecting investors with high-value GCC opportunities</p>
            </div>

            <div className="text-center group" data-aos="zoom-in" data-aos-delay="800">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-terracotta/20 flex items-center justify-center group-hover:bg-terracotta/30 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Confidential Partnership</h3>
              <p className="text-slate-400 text-sm">Built on trust, integrity, and discretion</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="text-white/50 hover:text-white transition animate-bounce">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

