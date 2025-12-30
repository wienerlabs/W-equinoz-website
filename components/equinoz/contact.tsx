'use client'

import { useState, FormEvent } from 'react'

const countries = [
  'United Arab Emirates', 'Turkey', 'Saudi Arabia', 'United Kingdom', 'United States',
  'Germany', 'France', 'Russia', 'China', 'India', 'Pakistan', 'Egypt', 'Nigeria',
  'South Africa', 'Brazil', 'Canada', 'Australia', 'Other'
]

export default function ContactEquinoz() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div data-aos="fade-right">
            <span className="inline-block text-terracotta text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Connect With Us
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair-display text-white mb-6">
              Start the Conversation
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Whether you are exploring establishment in the UAE, seeking strategic partnership,
              or preparing for regional expansion, EQUINOZ offers confidential guidance tailored
              to your objectives.
            </p>
            <p className="text-slate-400 italic mb-10">
              &ldquo;Every great partnership begins with a meaningful conversation.&rdquo;
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group" data-aos="fade-up" data-aos-delay="100">
                <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 group-hover:bg-terracotta group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-terracotta group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-slate-400">Dubai, United Arab Emirates</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group" data-aos="fade-up" data-aos-delay="150">
                <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 group-hover:bg-terracotta group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-terracotta group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <a href="mailto:info@equinoz.com" className="text-terracotta hover:text-terracotta-light transition">
                    info@equinoz.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group" data-aos="fade-up" data-aos-delay="200">
                <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 group-hover:bg-terracotta group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-terracotta group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.05 2.91A9.9 9.9 0 0 0 10.003 0C4.508 0 .02 4.488.02 10.003c0 1.762.46 3.482 1.333 5l-1.42 5.19 5.31-1.393a9.96 9.96 0 0 0 4.76 1.213h.003c5.495 0 9.983-4.488 9.983-10.003a9.95 9.95 0 0 0-2.94-7.1Z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">WhatsApp</h4>
                  <a
                    href="https://wa.me/971505690272"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:text-terracotta-light transition"
                  >
                    +971 505 690 272
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="100">
            {submitted ? (
              <div className="bg-white/5 backdrop-blur rounded-2xl p-8 text-center animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center animate-bounce">
                  <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Thank You</h3>
                <p className="text-slate-300">We&apos;ve received your message and will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input type="text" id="fullName" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all" placeholder="your@email.com" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">Country</label>
                      <select id="country" required value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all">
                        <option value="" className="text-slate-800">Select country</option>
                        {countries.map((c) => (<option key={c} value={c} className="text-slate-800">{c}</option>))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all" placeholder="+971 XXX XXX XXX" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <textarea id="message" rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all resize-none" placeholder="Tell us about your inquiry..." />
                  </div>
                  <button type="submit" className="w-full bg-terracotta hover:bg-terracotta-dark hover:scale-[1.02] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-terracotta/25">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

