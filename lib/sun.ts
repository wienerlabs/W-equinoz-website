export const DUBAI_LATITUDE = 25.2
export const SOLAR_NOON = 12.33

const RAD = Math.PI / 180

export const wrapHour = (hour: number) => ((hour % 24) + 24) % 24

export function sunElevation(hour: number, latitude = DUBAI_LATITUDE): number {
  const hourAngle = 15 * (wrapHour(hour) - SOLAR_NOON)
  return Math.asin(Math.cos(latitude * RAD) * Math.cos(hourAngle * RAD)) / RAD
}

export function sunOnArc(hour: number): { x: number; y: number } {
  const h = wrapHour(hour)
  const sunrise = SOLAR_NOON - 6
  let x = (h - sunrise) / 12
  if (x > 1.5) x -= 2
  const y = Math.sin(sunElevation(h) * RAD) / Math.sin((90 - DUBAI_LATITUDE) * RAD)
  return { x, y }
}

export function formatClock(hour: number): string {
  const total = Math.round(wrapHour(hour) * 60) % (24 * 60)
  const hh = Math.floor(total / 60)
  const mm = total % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

export function dayLength(dayShare: number): { hours: number; minutes: number } {
  const total = Math.round(dayShare * 24 * 60)
  return { hours: Math.floor(total / 60), minutes: total % 60 }
}

export const DUBAI_LONGITUDE = 55.27
export const DUBAI_UTC_OFFSET = 4

const HOUR_MS = 3_600_000
const DAY_MS = 86_400_000

export type SolarDay = { dawn: number; sunrise: number; noon: number; sunset: number; dusk: number; declination: number }

export const dubaiHour = (instant: number) => wrapHour(instant / HOUR_MS + DUBAI_UTC_OFFSET)

export const dubaiDayNumber = (instant: number) => Math.floor((instant + DUBAI_UTC_OFFSET * HOUR_MS) / DAY_MS)

export function solarDay(instant: number): SolarDay {
  const local = new Date(instant + DUBAI_UTC_OFFSET * HOUR_MS)
  const year = local.getUTCFullYear()
  const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  const day = dubaiDayNumber(instant) - Date.UTC(year, 0, 1) / DAY_MS
  const g = ((2 * Math.PI) / (leap ? 366 : 365)) * day
  const equationOfTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g))
  const declination =
    0.006918 -
    0.399912 * Math.cos(g) +
    0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) -
    0.002697 * Math.cos(3 * g) +
    0.00148 * Math.sin(3 * g)
  const noon = (720 - 4 * DUBAI_LONGITUDE - equationOfTime) / 60 + DUBAI_UTC_OFFSET
  const latitude = DUBAI_LATITUDE * RAD
  const spread = (zenith: number) =>
    Math.acos(Math.cos(zenith * RAD) / (Math.cos(latitude) * Math.cos(declination)) - Math.tan(latitude) * Math.tan(declination)) /
    RAD /
    15
  const day0 = spread(90.833)
  const civil = spread(96)
  return { dawn: noon - civil, sunrise: noon - day0, noon, sunset: noon + day0, dusk: noon + civil, declination }
}

export function elevationAt(day: SolarDay, hour: number): number {
  const latitude = DUBAI_LATITUDE * RAD
  const hourAngle = 15 * (hour - day.noon) * RAD
  return (
    Math.asin(
      Math.sin(latitude) * Math.sin(day.declination) + Math.cos(latitude) * Math.cos(day.declination) * Math.cos(hourAngle),
    ) / RAD
  )
}

const EQUINOX_TERMS = [
  [485, 324.96, 1934.136], [203, 337.23, 32964.467], [199, 342.08, 20.186], [182, 27.85, 445267.112],
  [156, 73.14, 45036.886], [136, 171.52, 22518.443], [77, 222.54, 65928.934], [74, 296.72, 3034.906],
  [70, 243.58, 9037.513], [58, 119.81, 33718.147], [52, 297.17, 150.678], [50, 21.02, 2281.226],
  [45, 247.54, 29929.562], [44, 325.15, 31555.956], [29, 60.93, 4443.417], [18, 155.12, 67555.328],
  [17, 288.79, 4562.452], [16, 198.04, 62894.029], [14, 199.76, 31436.921], [12, 95.39, 14577.848],
  [12, 287.11, 31931.756], [12, 320.81, 34777.259], [9, 227.73, 1222.114], [8, 15.45, 16859.074],
]

const DELTA_T_SECONDS = 70

export function equinox(year: number, season: 'march' | 'september'): number {
  const y = (year - 2000) / 1000
  const mean =
    season === 'march'
      ? 2451623.80984 + 365242.37404 * y + 0.05169 * y ** 2 - 0.00411 * y ** 3 - 0.00057 * y ** 4
      : 2451810.21715 + 365242.01767 * y - 0.11575 * y ** 2 + 0.00337 * y ** 3 + 0.00078 * y ** 4
  const t = (mean - 2451545) / 36525
  const w = (35999.373 * t - 2.47) * RAD
  const lambda = 1 + 0.0334 * Math.cos(w) + 0.0007 * Math.cos(2 * w)
  const s = EQUINOX_TERMS.reduce((sum, [a, b, c]) => sum + a * Math.cos((b + c * t) * RAD), 0)
  const jde = mean + (0.00001 * s) / lambda
  return (jde - 2440587.5) * DAY_MS - DELTA_T_SECONDS * 1000
}

export function nextEquinox(instant: number): number {
  const year = new Date(instant).getUTCFullYear()
  const candidates = [year, year + 1].flatMap((item) => [equinox(item, 'march'), equinox(item, 'september')])
  return candidates.find((candidate) => candidate > instant)!
}
