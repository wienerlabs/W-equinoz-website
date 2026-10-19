import JsonLd from '@/components/json-ld'
import { faqCopy, type Faq } from '@/lib/content/faq'
import type { Lang } from '@/lib/i18n'
import { faqLd } from '@/lib/seo'

export default function FaqSection({ items, lang, accent = '#b55d3b' }: { items: Faq[]; lang: Lang; accent?: string }) {
  return (
    <section id="faq" data-theme="light" aria-labelledby="faq-title" className="faq bg-sand text-ink">
      <JsonLd data={faqLd(items, lang)} />
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-32">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6 text-ink/55" data-reveal>
              {faqCopy.eyebrow[lang]}
            </p>
            <h2 id="faq-title" data-split className="text-[clamp(2.4rem,5vw,4.6rem)] leading-none tracking-[-0.04em]">
              {faqCopy.title[lang]}
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink/65" data-reveal>
              {faqCopy.lead[lang]}
            </p>
          </div>
        </div>
        <div className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {items.map((item, index) => (
            <details key={item.question.en} name="faq" className="group border-b border-ink/15" data-reveal>
              <summary className="flex cursor-pointer items-start gap-5 py-7 outline-offset-8 sm:gap-8">
                <span className="tabular w-6 shrink-0 pt-[0.45em] text-xs text-ink/40">{String(index + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug transition-colors duration-500 group-hover:text-ink/70">
                  {item.question[lang]}
                </span>
                <span aria-hidden="true" className="relative mt-[0.55em] h-3.5 w-3.5 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: accent }} />
                  <span
                    className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-transform duration-500 ease-[var(--ease-expo)] group-open:rotate-90 group-open:opacity-0"
                    style={{ background: accent }}
                  />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pl-11 pr-8 text-[1.0625rem] leading-relaxed text-ink/70 sm:pl-14">{item.answer[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
