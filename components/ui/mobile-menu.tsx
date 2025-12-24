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

  const isLight = mode === 'light'

  return (
    <div className="flex md:hidden">
      <button
        ref={trigger}
        className={`group inline-flex w-8 h-8 ${isLight ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-800'} text-center items-center justify-center transition`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-5 h-5 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] group-aria-expanded:rotate-[315deg] group-aria-expanded:translate-y-0" y="7" width="16" height="2" rx="1" />
          <rect className="origin-center group-aria-expanded:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]" y="7" width="16" height="2" rx="1" />
          <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-aria-expanded:rotate-[135deg] group-aria-expanded:translate-y-0" y="7" width="16" height="2" rx="1" />
        </svg>
      </button>

      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white transform transition ease-out duration-200 data-enter:data-closed:-translate-y-2 data-closed:opacity-0"
        >
          <ul className="px-5 py-4">
            <li>
              <a href="#about" className="flex font-medium text-slate-800 hover:text-terracotta py-3" onClick={() => setMobileNavOpen(false)}>About</a>
            </li>
            <li>
              <a href="#services" className="flex font-medium text-slate-800 hover:text-terracotta py-3" onClick={() => setMobileNavOpen(false)}>Services</a>
            </li>
            <li>
              <a href="#team" className="flex font-medium text-slate-800 hover:text-terracotta py-3" onClick={() => setMobileNavOpen(false)}>Team</a>
            </li>
            <li>
              <a href="#contact" className="flex font-medium text-slate-800 hover:text-terracotta py-3" onClick={() => setMobileNavOpen(false)}>Contact</a>
            </li>
            <li className="pt-4 mt-4 border-t border-gray-200">
              <a
                href="#contact"
                className="flex font-semibold text-white bg-terracotta hover:bg-terracotta-dark py-3 px-4 rounded-md justify-center group"
                onClick={() => setMobileNavOpen(false)}
              >
                Start the Conversation
                <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">→</span>
              </a>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  )
}
