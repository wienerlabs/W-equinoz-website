import Image from 'next/image'
import Consult from '@/components/consult'
import JsonLd from '@/components/json-ld'
import LightHero from '@/components/light-hero'
import dusk from '@/assets/media/dusk-burj.jpg'
import { home } from '@/lib/content/home'
import { publishedTeam } from '@/lib/content/people'
import { ui } from '@/lib/content/ui'
import type { Lang } from '@/lib/i18n'
import { breadcrumbLd } from '@/lib/seo'
import { site } from '@/lib/site'

export default function TeamPage({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [
            { name: ui.home[lang], key: 'home' },
            { name: ui.team[lang], key: 'team' },
          ]),
          ...publishedTeam.map((member) => ({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: member.name,
            jobTitle: member.title,
            worksFor: { '@id': `${site.url}/#organization` },
            ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
          })),
        ]}
      />
      <LightHero
        image={dusk}
        alt={lang === 'tr' ? 'Alacakaranlıkta Burj Khalifa silueti' : 'The Burj Khalifa silhouetted at dusk'}
        focus="50% 60%"
        glow="#f2a65a"
        eyebrow={<span className="text-clay/80">{ui.team[lang]}</span>}
        title={home.team.title[lang]}
      >
        <p className="text-lg leading-relaxed text-clay/90">{home.team.lead[lang]}</p>
      </LightHero>

      <section data-theme="light" aria-label={ui.team[lang]} className="bg-sand text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <ul className="grid gap-20">
            {publishedTeam.map((member, index) => (
              <li key={member.name} className="grid items-center gap-12 lg:grid-cols-12">
                {member.photo ? (
                  <div
                    className={`relative aspect-[4/5] overflow-hidden lg:col-span-5 ${index % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}
                    data-clip
                  >
                    <div className="absolute inset-[-8%]" data-parallax="5">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        placeholder="blur"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                ) : null}
                <div className={`lg:col-span-6 ${index % 2 ? '' : 'lg:col-start-7'}`}>
                  <h2 data-split className="text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.95] tracking-[-0.035em]">
                    {member.name}
                  </h2>
                  <p data-reveal className="mt-4 text-lg text-terracotta">
                    {member.title}
                  </p>
                  {member.bio ? (
                    <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">
                      {member.bio[lang]}
                    </p>
                  ) : null}
                  {member.linkedin ? (
                    <a
                      data-reveal
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line mt-8 inline-block text-ink/70 hover:text-ink"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Consult lang={lang} routeKey="team" />
    </>
  )
}
