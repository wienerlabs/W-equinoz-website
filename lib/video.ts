'use client'

import type { Clip } from '@/lib/media'

export const videoAllowed = () => {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return !connection?.saveData
}

export const isDesktop = () => window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches

export const sourceFor = (clip: Clip) =>
  window.matchMedia('(min-width: 768px)').matches ? clip.desktop : clip.mobile

export type Scrubber = {
  seek: (progress: number) => void
  destroy: () => void
}

export function createScrubber(video: HTMLVideoElement, src: string, onReady?: () => void): Scrubber {
  let duration = 0
  let wanted = 0
  let current = 0
  let frame = 0
  let alive = true

  video.muted = true
  video.playsInline = true
  video.preload = 'auto'
  video.src = src

  const loop = () => {
    frame = 0
    if (!alive || !duration) return
    const target = wanted * Math.max(0, duration - 0.05)
    current += (target - current) * 0.18
    if (!video.seeking && Math.abs(video.currentTime - current) > 1 / 40) video.currentTime = current
    if (Math.abs(target - current) > 0.002) frame = requestAnimationFrame(loop)
  }

  const kick = () => {
    if (!frame && alive) frame = requestAnimationFrame(loop)
  }

  const ready = () => {
    duration = video.duration || 0
    video
      .play()
      .then(() => video.pause())
      .catch(() => {})
      .finally(() => {
        kick()
        onReady?.()
      })
  }
  video.addEventListener('loadedmetadata', ready, { once: true })

  return {
    seek(progress) {
      wanted = Math.min(1, Math.max(0, progress))
      kick()
    },
    destroy() {
      alive = false
      cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', ready)
      video.pause()
      video.removeAttribute('src')
      video.load()
    },
  }
}
