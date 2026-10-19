import Image from 'next/image'
import Link from 'next/link'
import night from '@/assets/media/night-downtown.jpg'
import { home } from '@/lib/content/home'
import { ui } from '@/lib/content/ui'
import { href, type Lang } from '@/lib/i18n'
import { whatsappLink } from '@/lib/site'

export default function NightCta({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="night-title" className="relative isolate overflow-hidden bg-night text-sand">
      <div className="absolute inset-[-10%] -z-10" data-parallax="8">
        <Image
          src={night}
          alt={lang === 'tr' ? 'Gece Downtown Dubai ve Burj Khalifa' : 'Downtown Dubai and the Burj Khalifa at night'}
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: '35% 40%' }}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,18,17,0.92)_0%,rgba(6,18,17,0.55)_45%,rgba(6,18,17,0.88)_100%)]" />
      <div className="mx-auto flex min-h-[110svh] max-w-[1440px] flex-col justify-center px-5 py-32 sm:px-8 lg:px-12">
        <p className="eyebrow mb-8 text-clay/70" data-reveal>
          {home.night.eyebrow[lang]}
        </p>
        <h2 id="night-title" data-split className="max-w-[16ch] text-[clamp(2.8rem,7.5vw,7.6rem)] leading-[0.92] tracking-[-0.035em]">
          {home.night.title[lang]}
        </h2>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-clay/85" data-reveal>
          {home.night.body[lang]}
        </p>
        <div className="mt-12 flex flex-wrap gap-3" data-reveal>
          <a
            href={whatsappLink(ui.form.whatsappIntro[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sand px-7 py-4 text-[0.9375rem] text-ink transition-colors duration-500 hover:bg-ember"
          >
            {ui.whatsapp[lang]}
          </a>
          <Link
            href={href('contact', lang)}
            className="rounded-full border border-sand/30 px-7 py-4 text-[0.9375rem] backdrop-blur-sm transition-colors duration-500 hover:bg-sand hover:text-ink"
          >
            {ui.consult[lang]}
          </Link>
        </div>
      </div>
    </section>
  )
}
