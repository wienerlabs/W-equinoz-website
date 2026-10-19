'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}

export const getLenis = () => lenis

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const scrollToY = (y: number, duration = 1.6) => {
  if (lenis) lenis.scrollTo(y, { duration })
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export const whenIntroDone = (callback: () => void) => {
  if (document.documentElement.classList.contains('intro-done')) {
    callback()
    return () => {}
  }
  const handler = () => callback()
  window.addEventListener('eqz:intro-done', handler, { once: true })
  return () => window.removeEventListener('eqz:intro-done', handler)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
