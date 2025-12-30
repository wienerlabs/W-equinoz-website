import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4">
              <Link href="/" className="inline-block mb-4" aria-label="EQUINOZ">
                <Image
                  src="/images/logo2.png"
                  alt="EQUINOZ"
                  width={960}
                  height={270}
                  className="h-56 w-auto"
                />
              </Link>
              <p className="text-slate-400 text-sm mb-6">
                Rooted in the principle of Equilibrium, the balance between opportunity and stability.
              </p>
              <div className="text-sm text-slate-400 space-y-1">
                <p>Dubai, United Arab Emirates</p>
                <p>
                  <a href="mailto:info@equinoz.com" className="hover:text-terracotta transition">info@equinoz.com</a>
                </p>
                <p>
                  <a href="https://wa.me/971505690272" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition">
                    +971 505 690 272
                  </a>
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <h6 className="text-sm font-semibold mb-4 text-terracotta uppercase tracking-wider">Navigate</h6>
              <ul className="text-sm space-y-3">
                <li><a href="#about" className="text-slate-400 hover:text-white transition">About</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-white transition">Services</a></li>
                <li><a href="#team" className="text-slate-400 hover:text-white transition">Team</a></li>
                <li><a href="#contact" className="text-slate-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h6 className="text-sm font-semibold mb-4 text-terracotta uppercase tracking-wider">Services</h6>
              <ul className="text-sm space-y-3">
                <li><span className="text-slate-400">Private Client Advisory</span></li>
                <li><span className="text-slate-400">Investment Access & Strategy</span></li>
                <li><span className="text-slate-400">Corporate & Market Entry</span></li>
                <li><span className="text-slate-400">Strategic Communications</span></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h6 className="text-sm font-semibold mb-4 text-terracotta uppercase tracking-wider">Connect</h6>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="https://www.linkedin.com/company/equinoz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-terracotta transition"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.52 0H1.477C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.478 20h17.04c.817 0 1.48-.645 1.48-1.44V1.44C20 .645 19.336 0 18.52 0ZM6.035 17.057H3.017V7.506h3.018v9.551ZM4.526 6.185a1.752 1.752 0 1 1 0-3.504 1.752 1.752 0 0 1 0 3.504Zm12.53 10.872h-3.014v-4.648c0-1.108-.02-2.534-1.544-2.534-1.546 0-1.783 1.207-1.783 2.454v4.728H7.702V7.506h2.894v1.305h.04c.403-.762 1.387-1.566 2.854-1.566 3.053 0 3.616 2.01 3.616 4.623v5.19h-.05Z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/971505690272"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-terracotta transition"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 2.91A9.9 9.9 0 0 0 10.003 0C4.508 0 .02 4.488.02 10.003c0 1.762.46 3.482 1.333 5l-1.42 5.19 5.31-1.393a9.96 9.96 0 0 0 4.76 1.213h.003c5.495 0 9.983-4.488 9.983-10.003a9.95 9.95 0 0 0-2.94-7.1ZM10.003 18.3a8.27 8.27 0 0 1-4.22-1.156l-.302-.18-3.137.823.838-3.06-.198-.314a8.29 8.29 0 0 1-1.27-4.41c0-4.574 3.724-8.297 8.3-8.297a8.24 8.24 0 0 1 5.865 2.43 8.24 8.24 0 0 1 2.43 5.87c-.002 4.574-3.726 8.294-8.306 8.294Zm4.55-6.213c-.25-.125-1.474-.727-1.702-.81-.228-.085-.394-.125-.56.124-.165.25-.64.81-.785.976-.145.166-.29.187-.54.063-.248-.125-1.05-.387-2-1.235-.74-.66-1.238-1.477-1.384-1.726-.144-.25-.015-.385.11-.51.11-.11.248-.29.373-.434.125-.145.166-.25.25-.415.083-.166.04-.31-.02-.435-.063-.125-.56-1.35-.767-1.85-.203-.484-.41-.42-.56-.427-.144-.007-.31-.008-.477-.008a.915.915 0 0 0-.664.31c-.228.25-.87.85-.87 2.074 0 1.225.89 2.408 1.015 2.574.124.166 1.752 2.676 4.246 3.752.594.256 1.057.41 1.42.524.596.19 1.138.163 1.567.1.478-.072 1.474-.603 1.683-1.185.208-.582.208-1.082.145-1.186-.062-.103-.228-.165-.477-.29Z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@equinoz.com"
                    className="text-slate-400 hover:text-terracotta transition"
                    aria-label="Email"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 2v.511l-8 5.333-8-5.333V4h16Zm-8 7.489L2.727 6H17.27L10 11.489ZM2 16V7.044l8 5.334 8-5.334V16H2Z"/>
                    </svg>
                  </a>
                </li>
              </ul>
              <p className="text-slate-500 text-xs mt-6">
                Every great partnership begins with a meaningful conversation.
              </p>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-slate-700/50">
          <div className="text-center text-sm text-slate-500">
            © 2025 EQUINOZ LLC FZ. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
