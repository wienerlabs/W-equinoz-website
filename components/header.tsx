'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Mark, Wordmark } from '@/components/brand'
import { brands } from '@/lib/content/brands'
import { ui } from '@/lib/content/ui'
import { href, keyFromPathname, otherLang, type Lang } from '@/lib/i18n'
import { gsap, getLenis, useGSAP, whenIntroDone } from '@/lib/motion'
import { whatsappLink } from '@/lib/site'

export default function Header({ lang, showPartners }: { lang: Lang; showPartners: boolean }) {
  const pathname = usePathname()
  const bar = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)
  const [openPath, setOpenPath] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lightPath, setLightPath] = useState<string | null>(null)
  const open = openPath === pathname
  const light = lightPath === pathname
  const close = () => setOpenPath(null)

  const current = keyFromPathname(pathname)
  const switchHref = current ? href(current.key, otherLang(lang)) : href('home', otherLang(lang))

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 240 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (desktop.matches) setOpenPath(null)
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('[data-theme="light"]')
    if (!sections.length) return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setLightPath(visible.size > 0 ? pathname : null)
      },
      { rootMargin: '0px 0px -94% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  useGSAP(
    () => {
      gsap.set(bar.current, { yPercent: -100, opacity: 0 })
      return whenIntroDone(() =>
        gsap.to(bar.current, { yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.15 }),
      )
    },
    { scope: bar },
  )

  useGSAP(
    () => {
      const lenis = getLenis()
      if (open) {
        lenis?.stop()
        gsap.fromTo(
          panel.current,
          { clipPath: 'circle(0% at 100% 0%)' },
          { clipPath: 'circle(150% at 100% 0%)', duration: 1.1, ease: 'expo.inOut' },
        )
        gsap.fromTo(
          '.menu-item',
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.35 },
        )
      } else if (wasOpen.current) {
        lenis?.start()
      }
      wasOpen.current = open
    },
    { dependencies: [open], scope: panel },
  )

  const tone = open ? 'text-sand' : light && scrolled ? 'text-ink' : 'text-sand'
  const navLinks = [
    ...brands.map((brand) => ({ key: brand.route, label: brand.short, accent: brand.light.accent })),
    { key: 'team' as const, label: ui.team[lang], accent: undefined },
    ...(showPartners ? [{ key: 'partners' as const, label: ui.partners[lang], accent: undefined }] : []),
    { key: 'contact' as const, label: ui.contact[lang], accent: undefined },
  ]

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-sand px-4 py-2 text-sm text-ink focus:translate-y-0"
      >
        {ui.skip[lang]}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[transform,color] duration-700 ease-[var(--ease-expo)] ${tone} ${
          hidden && !open ? '-translate-y-full' : ''
        }`}
      >
        <div ref={bar} className="relative">
          <div
            className={`absolute inset-0 -z-10 transition-opacity duration-700 ${
              scrolled || open ? 'opacity-100' : 'opacity-0'
            } ${open ? 'bg-night' : light ? 'bg-sand/80' : 'bg-night/55'} backdrop-blur-xl`}
          />
          <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-12">
            <Link href={href('home', lang)} onClick={close} className="group flex items-center gap-3" aria-label="Equinoz">
              <Mark className="h-[18px] w-auto transition-transform duration-700 group-hover:scale-x-[1.08]" />
              <Wordmark className="hidden h-[13px] w-auto sm:block" />
            </Link>

            <nav aria-label={ui.brands[lang]} className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active = current?.key === link.key
                return (
                  <Link
                    key={link.key}
                    href={href(link.key, lang)}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative px-3.5 py-2 text-[0.9375rem] transition-opacity ${
                      active ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3.5 bottom-1 h-px origin-left transition-transform duration-500 ease-[var(--ease-expo)] ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ background: link.accent ?? 'currentColor' }}
                    />
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href={switchHref}
                hrefLang={otherLang(lang)}
                lang={otherLang(lang)}
                className="rounded-full px-3 py-1.5 text-sm opacity-80 transition-opacity hover:opacity-100"
                aria-label={ui.switchLang[lang]}
              >
                {otherLang(lang) === 'en' ? 'EN' : 'TR'}
              </a>
              <Link
                href={href('contact', lang)}
                className={`hidden rounded-full border px-5 py-2.5 text-sm transition-colors duration-500 md:inline-flex ${
                  light && scrolled && !open
                    ? 'border-ink/25 hover:bg-ink hover:text-sand'
                    : 'border-sand/30 hover:bg-sand hover:text-ink'
                }`}
              >
                {ui.consultShort[lang]}
              </Link>
              <button
                type="button"
                onClick={() => setOpenPath(open ? null : pathname)}
                aria-expanded={open}
                aria-controls="site-menu"
                className="relative flex h-11 w-11 items-center justify-center lg:hidden"
              >
                <span className="sr-only">{open ? ui.close[lang] : ui.menu[lang]}</span>
                <span
                  className={`absolute h-px w-6 bg-current transition-transform duration-500 ${
                    open ? 'rotate-45' : '-translate-y-[4px]'
                  }`}
                />
                <span
                  className={`absolute h-px w-6 bg-current transition-transform duration-500 ${
                    open ? '-rotate-45' : 'translate-y-[4px]'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={panel}
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-0 z-[65] overflow-y-auto overscroll-contain bg-night text-sand lg:hidden"
      >
        <div className="flex min-h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="space-y-1">
            {brands.map((brand) => (
              <li key={brand.key} className="overflow-hidden">
                <Link
                  href={href(brand.route, lang)}
                  onClick={close}
                  className="menu-item flex items-baseline justify-between gap-4 py-2"
                >
                  <span className="font-display text-[2.6rem] leading-none">{brand.short}</span>
                  <span className="text-sm" style={{ color: brand.light.glow }}>
                    {brand.light.name[lang]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-10 space-y-3 text-lg">
            <li className="overflow-hidden">
              <Link href={href('team', lang)} onClick={close} className="menu-item block">
                {ui.team[lang]}
              </Link>
            </li>
            {showPartners ? (
              <li className="overflow-hidden">
                <Link href={href('partners', lang)} onClick={close} className="menu-item block">
                  {ui.partners[lang]}
                </Link>
              </li>
            ) : null}
            <li className="overflow-hidden">
              <Link href={href('contact', lang)} onClick={close} className="menu-item block">
                {ui.contact[lang]}
              </Link>
            </li>
          </ul>
          <div className="mt-12 grid gap-3">
            <Link
              href={href('contact', lang)}
              onClick={close}
              className="menu-item inline-flex w-full items-center justify-center rounded-full bg-sand px-6 py-4 text-ink"
            >
              {ui.consult[lang]}
            </Link>
            <a
              href={whatsappLink(ui.form.whatsappIntro[lang])}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="menu-item inline-flex w-full items-center justify-center rounded-full border border-sand/30 px-6 py-4"
            >
              {ui.whatsapp[lang]}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
