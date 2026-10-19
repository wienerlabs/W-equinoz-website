'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mark } from '@/components/brand'
import { ui } from '@/lib/content/ui'
import { href } from '@/lib/i18n'

export default function NotFoundView() {
  const pathname = usePathname() ?? '/'
  const lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'tr'
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-night px-6 text-center text-sand">
      <div className="pointer-events-none absolute inset-x-0 bottom-[38%] h-px bg-[linear-gradient(90deg,transparent,#f6d8b0_30%,#f6d8b0_70%,transparent)]" />
      <div className="pointer-events-none absolute bottom-[38%] left-1/2 h-[9vmin] w-[18vmin] -translate-x-1/2 overflow-hidden">
        <div className="h-[18vmin] w-[18vmin] translate-y-[60%] rounded-full bg-[radial-gradient(circle,#fff6e6,#f2a65a_70%,transparent_72%)] opacity-70" />
      </div>
      <Mark className="mb-10 h-8 w-auto text-clay" />
      <p className="eyebrow text-clay/60">404</p>
      <h1 className="mt-4 max-w-[18ch] text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.03em]">
        {ui.notFound.title[lang]}
      </h1>
      <p className="mt-6 max-w-md text-clay/75">{ui.notFound.text[lang]}</p>
      <Link
        href={href('home', lang)}
        className="mt-10 rounded-full bg-sand px-6 py-3.5 text-[0.9375rem] text-ink transition-colors hover:bg-ember"
      >
        {ui.notFound.back[lang]}
      </Link>
    </section>
  )
}
