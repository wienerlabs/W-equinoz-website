'use client'

import { useRef } from 'react'
import { MARK_LEFT, MARK_RIGHT } from '@/components/brand'
import { gsap, getLenis, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/lib/motion'

const STORAGE_KEY = 'eqz-intro'
const SQUARE = 'M0 0H9V9H0Z'
const SQUARE_RIGHT = 'M9.56 0H18.56V9H9.56Z'

function Door({ side }: { side: 'left' | 'right' }) {
  const left = side === 'left'
  const maze = left ? MARK_LEFT : MARK_RIGHT
  const box = left ? '0 0 9 9' : '9.56 0 9 9'
  return (
    <div
      className={`intro-door intro-door-${side} absolute inset-y-0 w-1/2 overflow-hidden ${left ? 'left-0' : 'right-0'}`}
      style={{ transformOrigin: left ? 'left center' : 'right center' }}
    >
      <div
        className="absolute top-1/2 aspect-square w-[var(--lattice)] -translate-y-1/2 shadow-[0_0_0_200vmax_#061211]"
        style={left ? { right: 'var(--seam)' } : { left: 'var(--seam)' }}
      >
        <svg viewBox={box} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={maze} fill="#061211" />
        </svg>
        <svg viewBox={box} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <path
            className="intro-outline"
            d={maze}
            fill="none"
            stroke="#ded5d1"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
          />
        </svg>
        <svg
          viewBox={box}
          className="intro-glow absolute inset-0 h-full w-full overflow-visible opacity-0 mix-blend-screen blur-[14px]"
          aria-hidden="true"
        >
          <path d={`${left ? SQUARE : SQUARE_RIGHT}${maze}`} fill="#ffcf8f" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default function Intro({ skipLabel }: { skipLabel: string }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const html = document.documentElement
      let seen = false
      try {
        seen = sessionStorage.getItem(STORAGE_KEY) === '1'
      } catch {
        seen = true
      }
      if (seen || prefersReducedMotion()) html.classList.add('intro-done')
      if (html.classList.contains('intro-done')) return
      const element = root.current!
      const q = gsap.utils.selector(element)
      const lenis = getLenis()
      lenis?.stop()
      let done = false

      const finish = () => {
        if (done) return
        done = true
        try {
          sessionStorage.setItem(STORAGE_KEY, '1')
        } catch {}
        html.classList.add('intro-done')
        lenis?.start()
        requestAnimationFrame(() => ScrollTrigger.refresh())
        window.dispatchEvent(new Event('eqz:intro-done'))
      }

      gsap.set(q('.intro-outline'), { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.9 })
      gsap.set(q('.intro-seam'), { scaleY: 0, opacity: 0 })

      const timeline = gsap.timeline({ defaults: { ease: 'expo.inOut' }, onComplete: finish })
      timeline
        .to(q('.intro-outline'), { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut', stagger: 0.12 }, 0.1)
        .to(q('.intro-dark'), { opacity: 0, duration: 1.4, ease: 'power2.inOut' }, 1.0)
        .to(q('.intro-glow'), { opacity: 0.85, duration: 1.2, ease: 'power2.out' }, 1.1)
        .fromTo(q('.intro-bloom'), { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }, 1.1)
        .to(q('.intro-outline'), { opacity: 0.25, duration: 0.8, ease: 'power1.out' }, 1.5)
        .to(q('.intro-seam'), { scaleY: 1, opacity: 1, duration: 0.7, ease: 'expo.out' }, 1.9)
        .to(q('.intro-door-left'), { rotateY: 82, duration: 1.6 }, 2.3)
        .to(q('.intro-door-right'), { rotateY: -82, duration: 1.6 }, 2.3)
        .to(q('.intro-seam'), { scaleX: 60, opacity: 0, duration: 1.2, ease: 'power2.out' }, 2.35)
        .to(q('.intro-glow'), { opacity: 0, duration: 0.8, ease: 'power1.out' }, 2.5)
        .to(q('.intro-bloom'), { opacity: 0, duration: 1.4, ease: 'power1.out' }, 2.9)
        .to(element, { opacity: 0, duration: 0.6, ease: 'power1.out' }, 3.6)

      const skip = () => timeline.timeScale(6)
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') skip()
      }
      const button = q('.intro-skip')[0]
      window.addEventListener('wheel', skip, { passive: true, once: true })
      window.addEventListener('touchstart', skip, { passive: true, once: true })
      window.addEventListener('keydown', onKey)
      button?.addEventListener('click', skip)
      return () => {
        window.removeEventListener('wheel', skip)
        window.removeEventListener('touchstart', skip)
        window.removeEventListener('keydown', onKey)
        button?.removeEventListener('click', skip)
        if (!done) lenis?.start()
      }
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="intro fixed inset-0 z-[80] overflow-hidden [--lattice:min(38vw,64vh)] [--seam:calc(var(--lattice)*0.0311)]"
      aria-hidden="true"
    >
      <div className="intro-dark absolute inset-0 bg-night" />
      <div className="absolute inset-0 [perspective:1800px]">
        <Door side="left" />
        <Door side="right" />
      </div>
      <div className="intro-bloom pointer-events-none absolute left-[30%] top-1/2 -ml-[45vmin] -mt-[45vmin] h-[90vmin] w-[90vmin] rounded-full bg-[radial-gradient(circle,rgba(255,214,150,0.55)_0%,rgba(242,166,90,0.22)_32%,rgba(181,93,59,0.08)_55%,transparent_70%)] opacity-0 mix-blend-screen" />
      <div className="intro-seam pointer-events-none absolute inset-y-[18%] left-1/2 -ml-px w-[2px] bg-[linear-gradient(180deg,transparent,#fff3dd_20%,#ffffff_50%,#fff3dd_80%,transparent)] shadow-[0_0_40px_10px_rgba(255,214,150,0.45)]" />
      <button
        type="button"
        tabIndex={-1}
        className="intro-skip absolute bottom-8 right-8 text-xs text-clay/70 transition-colors hover:text-sand"
      >
        {skipLabel}
      </button>
    </div>
  )
}
