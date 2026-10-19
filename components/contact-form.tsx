'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { LIMITS, composeMessage, type ContactErrors, type ContactPayload } from '@/lib/contact'
import { ui } from '@/lib/content/ui'
import type { ServiceGroup } from '@/lib/content/options'
import type { Lang } from '@/lib/i18n'
import { mailtoLink, whatsappLink } from '@/lib/site'
import WhatsappMark from '@/components/whatsapp-mark'

export type CountryOption = { code: string; name: string; dial: string }

type Status = 'idle' | 'sending' | 'sent' | 'fallback'

const OTHER = 'other'

export default function ContactForm({
  lang,
  groups,
  countries,
  defaultService = '',
  tone = 'dark',
}: {
  lang: Lang
  groups: ServiceGroup[]
  countries: CountryOption[]
  defaultService?: string
  tone?: 'dark' | 'light'
}) {
  const t = ui.form
  const started = useRef(0)
  const result = useRef<HTMLParagraphElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<ContactErrors>({})
  const [fallback, setFallback] = useState('')
  const [values, setValues] = useState({
    name: '',
    email: '',
    country: '',
    dial: '',
    phone: '',
    service: defaultService,
    message: '',
    website: '',
  })

  useEffect(() => {
    started.current = Date.now()
  }, [])

  useEffect(() => {
    if (status === 'sent' || status === 'fallback') result.current?.focus()
  }, [status])

  const set = (field: keyof typeof values) => (value: string) => {
    setValues((current) => {
      const next = { ...current, [field]: value }
      if (field === 'country') {
        const match = countries.find((country) => country.name === value)
        if (match) next.dial = match.dial
      }
      return next
    })
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const labelFor = (value: string) => {
    if (value === OTHER) return t.otherService[lang]
    for (const group of groups) {
      const option = group.options.find((item) => item.value === value)
      if (option) return group.options[0] === option ? option.label[lang] : `${group.label} / ${option.label[lang]}`
    }
    return value
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const found: ContactErrors = {}
    if (!values.name.trim()) found.name = 'required'
    if (!values.email.trim()) found.email = 'required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) found.email = 'email'
    if (!values.service) found.service = 'required'
    if (!values.message.trim()) found.message = 'required'
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`field-${first}`)?.focus()
      return
    }

    const payload: ContactPayload & { website: string; elapsed: number } = {
      name: values.name.trim(),
      email: values.email.trim(),
      country: values.country,
      dial: values.dial,
      phone: values.phone.trim(),
      service: values.service,
      message: values.message.trim(),
      source: window.location.href,
      lang,
      website: values.website,
      elapsed: Date.now() - started.current,
    }
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        setStatus('sent')
        return
      }
    } catch {}
    setFallback(composeMessage(payload, labelFor(payload.service), lang))
    setStatus('fallback')
  }

  const muted = tone === 'dark' ? 'text-clay/70' : 'text-ink/60'
  const error = (field: keyof ContactErrors) =>
    errors[field] ? (
      <p id={`error-${field}`} className="mt-2 text-sm text-ember">
        {errors[field] === 'email' ? t.invalidEmail[lang] : t.required[lang]}
      </p>
    ) : null
  const describedBy = (field: keyof ContactErrors) => (errors[field] ? `error-${field}` : undefined)

  if (status === 'sent') {
    return (
      <div role="status" className="py-10">
        <p ref={result} tabIndex={-1} className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-none outline-none">
          {t.successTitle[lang]}
        </p>
        <p className={`mt-5 max-w-md text-lg ${muted}`}>{t.successText[lang]}</p>
      </div>
    )
  }

  if (status === 'fallback') {
    return (
      <div role="status" className="py-10">
        <p ref={result} tabIndex={-1} className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight outline-none">
          {t.fallbackTitle[lang]}
        </p>
        <p className={`mt-5 max-w-md text-lg ${muted}`}>{t.fallbackText[lang]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappLink(fallback)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-sand px-6 py-3.5 text-[0.9375rem] text-ink transition-colors hover:bg-ember"
          >
            <WhatsappMark />
            {ui.whatsapp[lang]}
          </a>
          <a
            href={mailtoLink(`Equinoz: ${labelFor(values.service)}`, fallback)}
            className="rounded-full border border-current/30 px-6 py-3.5 text-[0.9375rem] transition-colors hover:bg-sand hover:text-ink"
          >
            {ui.email[lang]}
          </a>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => set('website')(event.target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="field-name" className={`text-sm ${muted}`}>
          {t.name[lang]}
        </label>
        <input
          id="field-name"
          maxLength={LIMITS.name}
          className="field"
          autoComplete="name"
          value={values.name}
          onChange={(event) => set('name')(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy('name')}
          required
        />
        {error('name')}
      </div>
      <div>
        <label htmlFor="field-email" className={`text-sm ${muted}`}>
          {t.email[lang]}
        </label>
        <input
          id="field-email"
          maxLength={LIMITS.email}
          type="email"
          inputMode="email"
          className="field"
          autoComplete="email"
          value={values.email}
          onChange={(event) => set('email')(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy('email')}
          required
        />
        {error('email')}
      </div>
      <div>
        <label htmlFor="field-country" className={`text-sm ${muted}`}>
          {t.country[lang]}
        </label>
        <select
          id="field-country"
          className="field"
          autoComplete="country-name"
          value={values.country}
          onChange={(event) => set('country')(event.target.value)}
        >
          <option value="">{t.countryPlaceholder[lang]}</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
          <option value={t.otherCountry[lang]}>{t.otherCountry[lang]}</option>
        </select>
      </div>
      <div>
        <label htmlFor="field-phone" className={`text-sm ${muted}`}>
          {t.phone[lang]}
        </label>
        <div className="flex gap-3">
          <select
            aria-label={t.dial[lang]}
            className="field w-[6.5rem] shrink-0"
            value={values.dial}
            onChange={(event) => set('dial')(event.target.value)}
          >
            <option value="">+</option>
            {Array.from(new Set(countries.map((country) => country.dial))).map((dial) => (
              <option key={dial} value={dial}>
                {dial}
              </option>
            ))}
          </select>
          <input
            id="field-phone"
            maxLength={LIMITS.phone}
            type="tel"
            inputMode="tel"
            className="field"
            autoComplete="tel-national"
            value={values.phone}
            onChange={(event) => set('phone')(event.target.value)}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="field-service" className={`text-sm ${muted}`}>
          {t.service[lang]}
        </label>
        <select
          id="field-service"
          className="field"
          value={values.service}
          onChange={(event) => set('service')(event.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describedBy('service')}
          required
        >
          <option value="">{t.servicePlaceholder[lang]}</option>
          {groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label[lang]}
                </option>
              ))}
            </optgroup>
          ))}
          <option value={OTHER}>{t.otherService[lang]}</option>
        </select>
        {error('service')}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="field-message" className={`text-sm ${muted}`}>
          {t.message[lang]}
        </label>
        <textarea
          id="field-message"
          data-lenis-prevent
          maxLength={LIMITS.message}
          rows={4}
          className="field resize-none"
          placeholder={t.messagePlaceholder[lang]}
          value={values.message}
          onChange={(event) => set('message')(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          required
        />
        {error('message')}
      </div>
      <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className={`max-w-sm text-sm ${muted}`}>{t.privacy[lang]}</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`shrink-0 whitespace-nowrap rounded-full px-8 py-4 text-[0.9375rem] transition-colors duration-500 disabled:opacity-60 ${
            tone === 'dark' ? 'bg-sand text-ink hover:bg-ember' : 'bg-ink text-sand hover:bg-terracotta'
          }`}
        >
          {status === 'sending' ? t.sending[lang] : t.submit[lang]}
        </button>
      </div>
    </form>
  )
}
