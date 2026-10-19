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
