'use client'

import { useSyncExternalStore } from 'react'

const subscribe = (notify: () => void) => {
  const id = window.setInterval(notify, 10_000)
  return () => window.clearInterval(id)
}

const currentMinute = () => Math.floor(Date.now() / 60_000)

const beforeHydration = () => 0

export const useMinute = () => useSyncExternalStore(subscribe, currentMinute, beforeHydration)

const clocks = new Map<string, Intl.DateTimeFormat>()

export function clockIn(timeZone: string, instant: number) {
  let format = clocks.get(timeZone)
  if (!format) {
    format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone })
    clocks.set(timeZone, format)
  }
  return format.format(instant)
}

export function hoursBetween(ahead: string, behind: string) {
  const minutes = (clock: string) => Number(clock.slice(0, 2)) * 60 + Number(clock.slice(3, 5))
  return Math.round(((minutes(ahead) - minutes(behind) + 1440) % 1440) / 60)
}
