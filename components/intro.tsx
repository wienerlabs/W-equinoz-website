'use client'

import { useRef } from 'react'
import { MARK_LEFT, MARK_RIGHT } from '@/components/brand'
import { coverRect } from '@/lib/stage'
import { gsap, getLenis, useGSAP } from '@/lib/motion'

const STORAGE_KEY = 'eqz-intro'

function anchorPoint() {
  const anchor = document.querySelector<HTMLElement>('[data-intro-anchor]')
  const width = window.innerWidth
  const height = window.innerHeight
  if (!anchor) return { x: width / 2, y: height * 0.62 }
  const [iw, ih, fx, fy, su, sv] = (anchor.dataset.introAnchor ?? '').split(',').map(Number)
  const [sx, sy, ox, oy] = coverRect(width, height, iw, ih, fx, fy, 1.06)
  return { x: ((su - ox) / sx) * width, y: ((sv - oy) / sy) * height }
}

export default function Intro({ skipLabel }: { skipLabel: string }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const html = document.documentElement
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
        window.dispatchEvent(new Event('eqz:intro-done'))
      }

      const { x, y } = anchorPoint()
      const horizon = Math.min(96, Math.max(30, (y / window.innerHeight) * 100))
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.12
      gsap.set(q('.intro-sky'), {
        backgroundImage: `linear-gradient(180deg, #0a1b26 0%, #2c3048 ${horizon * 0.45}%, #9b6467 ${horizon * 0.82}%, #f2a65a ${horizon}%, #3a2117 ${horizon + 0.15}%, #0c0908 100%)`,
      })
      gsap.set(q('.intro-horizon'), { top: y, scaleX: 0 })
      gsap.set(q('.intro-sun'), { left: x - size / 2, top: y - size / 2, width: size, height: size / 2 })
      gsap.set(q('.intro-sun-disc'), { yPercent: 50 })
      gsap.set(q('.intro-glow'), { left: x, top: y, opacity: 0 })
      const strokes = Array.from(element.querySelectorAll<SVGPathElement>('.intro-door path'))
      for (const path of strokes) {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, fillOpacity: 0 })
      }

      const timeline = gsap.timeline({ defaults: { ease: 'expo.inOut' }, onComplete: finish })
      timeline
        .to(strokes, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.08 }, 0.15)
        .to(strokes, { fillOpacity: 1, duration: 0.6, ease: 'power1.out' }, 0.85)
        .fromTo(q('.intro-seam'), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.6, ease: 'expo.out' }, 1.15)
        .to(q('.intro-door-left'), { rotateY: 78, xPercent: -62, duration: 1.5 }, 1.45)
        .to(q('.intro-door-right'), { rotateY: -78, xPercent: 62, duration: 1.5 }, 1.45)
        .to(q('.intro-seam'), { scaleX: 40, opacity: 0, duration: 1.1, ease: 'power2.out' }, 1.5)
        .fromTo(q('.intro-sky'), { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6 }, 1.5)
        .to(q('.intro-horizon'), { scaleX: 1, duration: 1.4 }, 1.75)
        .to(q('.intro-sun-disc'), { yPercent: 0, duration: 1.5, ease: 'expo.out' }, 2.05)
        .to(q('.intro-glow'), { opacity: 1, duration: 1.4, ease: 'power2.out' }, 2.1)
        .to(q('.intro-doors'), { opacity: 0, duration: 0.6, ease: 'power1.out' }, 2.4)
        .to(element, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 3.25)

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
    <div ref={root} className="intro fixed inset-0 z-[80] overflow-hidden bg-night" aria-hidden="true">
      <div className="intro-sky absolute inset-0" />
      <div className="intro-glow pointer-events-none absolute h-[70vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,214,160,0.55),rgba(242,166,90,0.18)_45%,transparent)]" />
      <div className="intro-horizon absolute inset-x-0 h-px origin-center bg-[linear-gradient(90deg,transparent,#f6d8b0_20%,#fff4e2_50%,#f6d8b0_80%,transparent)]" />
      <div className="intro-sun absolute overflow-hidden">
        <div className="intro-sun-disc absolute inset-x-0 top-0 h-[200%] rounded-full bg-[radial-gradient(circle,#fffaf0_0%,#ffe2b0_42%,#f6b16a_66%,#f2a65a_70%)]" />
      </div>
      <div className="intro-doors absolute inset-0 flex items-center justify-center [perspective:1400px]">
        <div className="relative flex w-[min(52vw,520px)] items-stretch">
          <svg className="intro-door intro-door-left w-1/2 origin-left" viewBox="-0.28 -0.2 9.56 9.4">
            <path d={MARK_LEFT} fill="#ded5d1" fillRule="evenodd" stroke="#ded5d1" strokeWidth="0.06" />
          </svg>
          <span className="intro-seam absolute inset-y-[-12%] left-1/2 w-[3px] -translate-x-1/2 bg-[linear-gradient(180deg,transparent,#fff1dc,transparent)] opacity-0 blur-[1px]" />
          <svg className="intro-door intro-door-right w-1/2 origin-right" viewBox="9.28 -0.2 9.56 9.4">
            <path d={MARK_RIGHT} fill="#ded5d1" fillRule="evenodd" stroke="#ded5d1" strokeWidth="0.06" />
          </svg>
        </div>
      </div>
      <button
        type="button"
        tabIndex={-1}
        className="intro-skip absolute bottom-8 right-8 text-sm text-clay/70 transition-colors hover:text-sand"
      >
        {skipLabel}
      </button>
    </div>
  )
}
