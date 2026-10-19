'use client'

import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion, setLenis, getLenis } from '@/lib/motion'

function reveal() {
  const context = gsap.context(() => {
    ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>('[data-reveal]'), {
      start: 'top 94%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.07, overwrite: true }),
    })

    for (const element of gsap.utils.toArray<HTMLElement>('[data-split]')) {
      SplitText.create(element, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.07,
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          }),
      })
      gsap.set(element, { visibility: 'visible' })
    }

    for (const element of gsap.utils.toArray<HTMLElement>('[data-clip]')) {
      gsap.fromTo(element, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: element, start: 'top 85%', once: true },
      })
    }

    for (const element of gsap.utils.toArray<SVGPathElement>('[data-draw]')) {
      gsap.to(element, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    }

    for (const element of gsap.utils.toArray<HTMLElement>('[data-parallax]')) {
      const amount = Number(element.dataset.parallax) || 12
      gsap.fromTo(
        element,
        { yPercent: -amount },
        { yPercent: amount, ease: 'none', scrollTrigger: { trigger: element.parentElement ?? element, scrub: true } },
      )
    }

    for (const element of gsap.utils.toArray<HTMLElement>('[data-illuminate]')) {
      const split = SplitText.create(element, { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: element, start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
    }
  })
  return () => context.revert()
}

export default function MotionRoot() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    document.documentElement.classList.add('motion-ready')
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.config({ ignoreMobileResize: true })
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useLayoutEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (prefersReducedMotion()) return
    let cleanup: (() => void) | undefined
    let cancelled = false
    const run = () => {
      if (cancelled) return
      cleanup = reveal()
      ScrollTrigger.refresh()
    }
    const frame = requestAnimationFrame(() => {
      document.fonts.ready.then(run)
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      cleanup?.()
    }
  }, [pathname])

  return null
}
