import assert from 'node:assert/strict'
import { test } from 'node:test'
import { composeMessage, validateContact } from '../lib/contact.ts'
import { href, keyFromPathname, keyFromSegments, langs, routeKeys, routes, segmentsFor } from '../lib/i18n.ts'
import { dubaiDayNumber, dubaiHour, elevationAt, equinox, formatClock, nextEquinox, solarDay, sunElevation, sunOnArc } from '../lib/sun.ts'

test('every route exists in both languages, with unique paths', () => {
  const all = routeKeys.flatMap((key) => langs.map((lang) => routes[key][lang]))
  assert.equal(new Set(all).size, all.length)
  for (const key of routeKeys) {
    assert.ok(routes[key].tr.startsWith('/'))
    assert.ok(routes[key].en === '/en' || routes[key].en.startsWith('/en/'))
    assert.ok(!routes[key].tr.startsWith('/en'))
  }
})

test('route keys round-trip through segments and pathnames', () => {
  for (const key of routeKeys) {
    for (const lang of langs) {
      assert.equal(keyFromSegments(lang, segmentsFor(key, lang)), key)
      assert.deepEqual(keyFromPathname(href(key, lang)), { key, lang })
    }
  }
  assert.equal(keyFromPathname('/olmayan-sayfa'), undefined)
  assert.deepEqual(keyFromPathname('/tr/ekip'), { key: 'team', lang: 'tr' })
  assert.deepEqual(keyFromPathname('/tr'), { key: 'home', lang: 'tr' })
})

test('equinox sun path over Dubai', () => {
  assert.ok(Math.abs(sunElevation(12.33) - 64.8) < 0.1)
  assert.ok(Math.abs(sunElevation(6.33)) < 0.1)
  assert.ok(Math.abs(sunElevation(18.33)) < 0.1)
  assert.ok(sunElevation(0) < -60)
  assert.ok(Math.abs(sunOnArc(12.33).x - 0.5) < 1e-9)
  assert.ok(Math.abs(sunOnArc(12.33).y - 1) < 1e-9)
  assert.equal(formatClock(18.33), '18:20')
  assert.equal(formatClock(32.5), '08:30')
  assert.equal(formatClock(53.83), '05:50')
})

const services = ['global', 'familyOffice', 'other']
const valid = {
  name: ' Ayşe Yılmaz ',
  email: 'ayse@example.com',
  service: 'familyOffice',
  message: 'Görüşmek istiyorum.',
  source: 'https://www.equinoz.com/global',
  lang: 'tr',
  elapsed: 6000,
}

test('contact validation accepts a complete request and trims it', () => {
  const result = validateContact(valid, services)
  assert.equal(result.ok, true)
  if (result.ok) assert.equal(result.data.name, 'Ayşe Yılmaz')
})

test('contact validation reports missing and malformed fields', () => {
  const result = validateContact({ ...valid, name: '', email: 'not-an-email', service: 'unknown', message: '  ' }, services)
  assert.equal(result.ok, false)
  if (!result.ok) {
    assert.equal(result.spam, false)
    assert.deepEqual(result.errors, { name: 'required', email: 'email', service: 'required', message: 'required' })
  }
})

test('contact validation flags bots by honeypot and fill time', () => {
  const honeypot = validateContact({ ...valid, website: 'http://spam.example' }, services)
  const tooFast = validateContact({ ...valid, elapsed: 300 }, services)
  const untimed = validateContact({ ...valid, elapsed: undefined }, services)
  assert.ok(!honeypot.ok && honeypot.spam)
  assert.ok(!tooFast.ok && tooFast.spam)
  assert.ok(!untimed.ok && untimed.spam)
})

test('contact validation strips control characters', () => {
  const crlf = String.fromCharCode(13, 10)
  const result = validateContact(
    { ...valid, name: `Ayşe${crlf}Bcc: x@y.z`, source: `https://www.equinoz.com/global${crlf}X`, message: `Bir${crlf}İki` },
    services,
  )
  assert.ok(result.ok)
  if (!result.ok) return
  assert.equal(result.data.name, 'Ayşe  Bcc: x@y.z')
  assert.ok(!result.data.source.includes(crlf))
  assert.equal(result.data.message, 'Bir\nİki')
})

test('composed message names the service and the source page', () => {
  const result = validateContact({ ...valid, dial: '+90', phone: '532 000 00 00' }, services)
  assert.ok(result.ok)
  if (!result.ok) return
  const text = composeMessage(result.data, 'Equinoz Global / Family office', 'tr')
  assert.match(text, /Hizmet: Equinoz Global \/ Family office/)
  assert.match(text, /Kaynak sayfa: https:\/\/www\.equinoz\.com\/global/)
  assert.match(text, /Telefon: \+90 532 000 00 00/)
  assert.doesNotMatch(text, /\n\n\n/)
})

const minutesApart = (a: number, b: number) => Math.abs(a - b) / 60_000

test('equinox instants match published times within minutes', () => {
  assert.ok(minutesApart(equinox(2024, 'march'), Date.UTC(2024, 2, 20, 3, 6)) < 3)
  assert.ok(minutesApart(equinox(2024, 'september'), Date.UTC(2024, 8, 22, 12, 44)) < 3)
  assert.ok(minutesApart(equinox(2025, 'march'), Date.UTC(2025, 2, 20, 9, 1)) < 3)
  assert.ok(minutesApart(equinox(2025, 'september'), Date.UTC(2025, 8, 22, 18, 19)) < 3)
  assert.ok(minutesApart(equinox(2026, 'march'), Date.UTC(2026, 2, 20, 14, 46)) < 3)
  assert.ok(minutesApart(equinox(2026, 'september'), Date.UTC(2026, 8, 23, 0, 5)) < 3)
  assert.equal(nextEquinox(Date.UTC(2026, 9, 19)), equinox(2027, 'march'))
  assert.equal(nextEquinox(Date.UTC(2026, 2, 1)), equinox(2026, 'march'))
})

test('Dubai sunrise and sunset follow the seasons', () => {
  const june = solarDay(Date.UTC(2026, 5, 21, 8))
  const december = solarDay(Date.UTC(2026, 11, 21, 8))
  assert.ok(Math.abs(june.sunrise - (5 + 29 / 60)) < 5 / 60)
  assert.ok(Math.abs(june.sunset - (19 + 13 / 60)) < 5 / 60)
  assert.ok(Math.abs(december.sunrise - (6 + 59 / 60)) < 5 / 60)
  assert.ok(Math.abs(december.sunset - (17 + 33 / 60)) < 5 / 60)
  for (const day of [june, december]) {
    assert.ok(day.dawn < day.sunrise && day.sunrise < day.noon && day.noon < day.sunset && day.sunset < day.dusk)
    assert.ok(Math.abs(elevationAt(day, day.sunrise) + 0.833) < 0.05)
  }
  assert.ok(Math.abs(dubaiHour(Date.UTC(2026, 9, 19, 20, 30)) - 0.5) < 1e-9)
  assert.equal(dubaiDayNumber(Date.UTC(2026, 9, 19, 20, 30)), dubaiDayNumber(Date.UTC(2026, 9, 20, 10)))
})
