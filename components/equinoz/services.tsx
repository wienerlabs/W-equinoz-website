'use client'

import { useState } from 'react'

const services = [
  {
    id: 'advisory',
    title: 'Private Client Advisory',
    subtitle: 'Holistic approach to personal and professional settlement',
    items: [
      'Family Office establishment in UAE (Dubai & Abu Dhabi)',
      'Family relocation and residency programs (Golden Visa, investor visa)',
      'Life integration (private social, health and wellness memberships)',
      'Education planning (K-12, university, language school placements)',
      'Real estate advisory (primary residence and investment properties)',
    ],
  },
  {
    id: 'investment',
    title: 'Investment Access & Strategy',
    subtitle: 'Connecting families with strategic investment pathways',
    items: [
      'Curated access to verified opportunities (real estate, healthcare, tech, industrial)',
      'Strategic introductions to key stakeholders',
      'Due diligence support and structuring guidance',
      'Note: We do not manage capital — we build relationships, provide access, context, and structure',
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate & Market Entry',
    subtitle: 'Tailored market entry plans for UAE and GCC expansion',
    items: [
      'Business licensing (all free zones and mainland jurisdictions)',
      'Office/workspace procurement (including factory or industrial facilities)',
      'Corporate and personal banking services',
      'Accounting and tax advisory compliant with UAE regulations',
      'HR support (workforce planning, recruitment, contracts, HR policies)',
    ],
  },
  {
    id: 'communications',
    title: 'Strategic Communications',
    subtitle: 'Positioning, narrative, and visibility for leaders and brands',
    items: [
      'Marketing and communications strategy',
      'Public relations (PR) and event management',
      'Digital presence development (website, social media, brand collaborations)',
      'Investor presentations and corporate profiles',
      'Reporting and measurement',
    ],
  },
]

export default function ServicesEquinoz() {
  const [activeService, setActiveService] = useState(services[0].id)

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl translate-x-1/3" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
          <span className="inline-block text-terracotta text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-playfair-display text-dark mb-6">
            End-to-End Solutions for Families & Founders
          </h2>
          <p className="text-lg text-slate-600">
            EQUINOZ operates at the intersection of strategy, establishment, and opportunity —
            providing comprehensive solutions for those seeking to create a secure, structured,
            and meaningful presence in the UAE and beyond.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4" data-aos="fade-right" data-aos-delay="100">
            <div className="sticky top-24 space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full text-left px-5 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                    activeService === service.id
                      ? 'bg-dark text-white shadow-lg shadow-dark/20'
                      : 'bg-clay hover:bg-sage/30 text-slate-700'
                  }`}
                >
                  <span className="font-semibold block">{service.title}</span>
                  <span className={`text-sm ${activeService === service.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {service.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            {services.map((service) => {
              const isActive = activeService === service.id
              return (
                <div
                  key={service.id}
                  className={`transition-all duration-300 ${isActive ? 'block' : 'hidden'}`}
                >
                  <div className="bg-clay rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-dark mb-2">{service.title}</h3>
                    <p className="text-slate-600 mb-8">{service.subtitle}</p>
                    <ul className="space-y-4">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 group">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center mt-0.5 group-hover:bg-terracotta group-hover:scale-110 transition-all duration-300">
                            <svg className="w-3 h-3 text-terracotta group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-slate-700 group-hover:text-dark transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

