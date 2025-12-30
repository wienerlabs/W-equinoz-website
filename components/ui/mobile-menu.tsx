'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'

export default function MobileMenu({ mode = 'dark' }: { mode?: 'dark' | 'light' }) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  const isLight = mode === 'light'

  const navLinks = [
    { href: '#about', label: 'About', icon: '◆' },
    { href: '#services', label: 'Services', icon: '◆' },
    { href: '#team', label: 'Team', icon: '◆' },
    { href: '#contact', label: 'Contact', icon: '◆' },
  ]

  return (
    <div className="flex md:hidden">
      <button
        ref={trigger}
        className={`group relative z-50 inline-flex w-10 h-10 rounded-lg ${
          isLight ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-dark'
        } ${mobileNavOpen ? 'bg-terracotta text-white' : ''} items-center justify-center transition-all duration-300`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <div className="flex flex-col gap-1.5 w-5">
          <span
            className={`block h-0.5 rounded-full transition-all duration-300 ${
              mobileNavOpen ? 'bg-white rotate-45 translate-y-2' : isLight ? 'bg-white' : 'bg-current'
            }`}
          />
          <span
            className={`block h-0.5 rounded-full transition-all duration-300 ${
              mobileNavOpen ? 'bg-white opacity-0 scale-0' : isLight ? 'bg-white' : 'bg-current'
            }`}
          />
          <span
            className={`block h-0.5 rounded-full transition-all duration-300 ${
              mobileNavOpen ? 'bg-white -rotate-45 -translate-y-2' : isLight ? 'bg-white' : 'bg-current'
            }`}
          />
        </div>
      </button>

      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="fixed inset-0 z-40 bg-gradient-to-b from-dark via-dark to-teal overflow-auto"
          enter="transition-all duration-500 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="min-h-screen flex flex-col justify-center px-8 py-20">
            <ul className="space-y-2">
              {navLinks.map((link, idx) => (
                <li
                  key={link.href}
                  className="overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center gap-4 py-4 text-3xl font-playfair-display text-white/90 hover:text-terracotta transition-all duration-300"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span className="text-terracotta text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-white/10">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-semibold text-lg shadow-lg shadow-terracotta/30 hover:scale-105 transition-all duration-300"
                onClick={() => setMobileNavOpen(false)}
              >
                Start the Conversation
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="mt-auto pt-12 text-center">
              <p className="text-white/40 text-sm">
                © 2025 EQUINOZ LLC FZ
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
