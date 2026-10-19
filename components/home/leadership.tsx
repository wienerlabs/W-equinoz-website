import Image from 'next/image'
import Link from 'next/link'
import { home } from '@/lib/content/home'
import { publishedTeam } from '@/lib/content/people'
import { href, type Lang } from '@/lib/i18n'

export default function Leadership({ lang }: { lang: Lang }) {
  const founder = publishedTeam[0]
  if (!founder) return null
  return (
    <section aria-labelledby="leadership-title" className="relative overflow-hidden bg-ink text-sand">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-40">
        {founder.photo ? (
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5" data-clip>
            <div className="absolute inset-[-8%]" data-parallax="6">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover object-top"
              />
            </div>
          </div>
        ) : null}
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6 text-clay/60" data-reveal>
            {home.leadership.eyebrow[lang]}
          </p>
          <h2 id="leadership-title" data-split className="text-[clamp(2.6rem,6vw,5.8rem)] leading-[0.95] tracking-[-0.035em]">
            {founder.name}
          </h2>
          <p className="mt-4 text-lg text-ember" data-reveal>
            {founder.title}
          </p>
          {founder.bio ? (
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-clay/85" data-reveal>
              {founder.bio[lang]}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-6 text-[0.9375rem]" data-reveal>
            <Link href={href('team', lang)} className="link-line">
              {home.leadership.more[lang]} →
            </Link>
            {founder.linkedin ? (
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="link-line text-clay/70">
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
