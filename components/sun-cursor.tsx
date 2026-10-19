'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

export default function SunCursor() {
  const dot = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const element = dot.current!
    const x = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' })
    const y = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' })
    let shown = false
    let large = false
    const move = (event: PointerEvent) => {
      x(event.clientX)
      y(event.clientY)
      if (!shown) {
        shown = true
        gsap.to(element, { opacity: 1, duration: 0.4 })
      }
      const interactive = Boolean(
        (event.target as Element | null)?.closest('a, button, select, input, textarea, [data-cursor]'),
      )
      if (interactive !== large) {
        large = interactive
        gsap.to(element, { scale: interactive ? 2.6 : 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' })
      }
    }
    const leave = () => {
      shown = false
      gsap.to(element, { opacity: 0, duration: 0.3 })
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  })

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full bg-[radial-gradient(circle,#fff3df_0%,#f2a65a_60%,rgba(242,166,90,0)_100%)] opacity-0 mix-blend-screen"
    />
  )
}
