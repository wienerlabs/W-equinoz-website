'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { href, type Lang, type RouteKey } from '@/lib/i18n'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion'

export default function SectionNav({
  lang,
  trail,
  sections,
}: {
  lang: Lang
  trail: { name: string; key?: RouteKey }[]
  sections: { id: string; label: string }[]
}) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const nav = root.current!
      const links = gsap.utils.toArray<HTMLAnchorElement>('[data-section]', nav)
      const bar = nav.querySelector<HTMLElement>('.section-progress')!
      const list = nav.querySelector<HTMLElement>('.section-list')!
      const scope = nav.parentElement!
      const triggers = links.map((link) => {
        const target = document.getElementById(link.dataset.section!)
        return ScrollTrigger.create({
          trigger: target,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (!self.isActive) return
            links.forEach((item) => item.removeAttribute('aria-current'))
            link.setAttribute('aria-current', 'location')
            list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.clientWidth) / 2, behavior: 'smooth' })
          },
        })
      })
      const progress = ScrollTrigger.create({
        trigger: scope,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      })
      return () => {
        triggers.forEach((trigger) => trigger.kill())
        progress.kill()
      }
    },
    { scope: root },
  )

  return (
    <nav
      ref={root}
      aria-label={lang === 'tr' ? 'Bu sayfada' : 'On this page'}
      data-theme="light"
      className="section-nav sticky top-0 z-40 border-b border-ink/10 bg-sand/85 text-sm text-ink/60 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:px-12">
        <ol className="hidden shrink-0 items-center gap-2 py-4 lg:flex">
          {trail.map((item, index) => (
            <li key={item.name} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.key ? (
                <Link href={href(item.key, lang)} className="link-line hover:text-ink">
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
        <ul className="section-list no-scrollbar relative -mx-5 flex flex-1 items-center gap-1 overflow-x-auto px-5 py-2.5 sm:mx-0 sm:px-0 lg:justify-end">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                data-section={section.id}
                className="block rounded-full px-4 py-2 transition-colors duration-500 hover:text-ink aria-[current=location]:bg-ink aria-[current=location]:text-sand"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <span
        aria-hidden="true"
        className="section-progress absolute inset-x-0 bottom-[-1px] h-px origin-left bg-terracotta"
        style={{ transform: 'scaleX(0)' }}
      />
    </nav>
  )
}
