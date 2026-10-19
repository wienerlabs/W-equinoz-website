import { Mark } from '@/components/brand'
import { ui } from '@/lib/content/ui'
import { href } from '@/lib/i18n'

export default function NotFoundView() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-night px-6 text-center text-sand">
      <div className="pointer-events-none absolute inset-x-0 bottom-[30%] h-px bg-[linear-gradient(90deg,transparent,#f6d8b0_30%,#f6d8b0_70%,transparent)]" />
      <div className="pointer-events-none absolute bottom-[30%] left-1/2 h-[9vmin] w-[18vmin] -translate-x-1/2 overflow-hidden">
        <div className="h-[18vmin] w-[18vmin] translate-y-[60%] rounded-full bg-[radial-gradient(circle,#fff6e6,#f2a65a_70%,transparent_72%)] opacity-70" />
      </div>
      <Mark className="mb-10 h-8 w-auto text-clay" />
      <p className="eyebrow text-clay/60">404</p>
      <h1 className="mt-4 max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[0.98] tracking-[-0.03em]">
        {ui.notFound.title.tr}
      </h1>
      <p lang="en" className="mt-3 font-display text-[clamp(1.3rem,2.6vw,2rem)] text-clay/70">
        {ui.notFound.title.en}
      </p>
      <p className="mt-6 max-w-md text-clay/75">{ui.notFound.text.tr}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a href={href('home', 'tr')} className="rounded-full bg-sand px-6 py-3.5 text-[0.9375rem] text-ink transition-colors hover:bg-ember">
          {ui.notFound.back.tr}
        </a>
        <a
          href={href('home', 'en')}
          lang="en"
          className="rounded-full border border-sand/30 px-6 py-3.5 text-[0.9375rem] transition-colors hover:bg-sand hover:text-ink"
        >
          {ui.notFound.back.en}
        </a>
      </div>
    </section>
  )
}
