'use client'

import { useState, useEffect } from 'react'
import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function Header({ mode = 'dark' }: { mode?: 'dark' | 'light' }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['about', 'services', 'team', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLight = mode === 'light' && !scrolled

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-dark/5 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Logo variant={isLight ? 'light' : 'dark'} />
          </div>

          <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                        isLight
                          ? 'text-white/90 hover:text-white'
                          : 'text-slate-600 hover:text-dark'
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span
                        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-terracotta/10 scale-100'
                            : 'bg-terracotta/0 scale-95 group-hover:bg-terracotta/5 group-hover:scale-100'
                        }`}
                      />
                      <span
                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-terracotta transition-all duration-300 rounded-full ${
                          isActive ? 'w-6' : 'w-0 group-hover:w-4'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="group relative overflow-hidden px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-terracotta to-terracotta-dark text-white shadow-lg shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/30 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start the Conversation
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta-dark to-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          <MobileMenu mode={scrolled ? 'dark' : mode} />
        </div>
      </div>
    </header>
  )
}
