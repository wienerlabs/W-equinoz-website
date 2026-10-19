'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Clip } from '@/lib/media'
import { sourceFor, videoAllowed } from '@/lib/video'

export default function AmbientVideo({
  clip,
  alt,
  priority = false,
  loop = true,
  sizes = '100vw',
}: {
  clip: Clip
  alt: string
  priority?: boolean
  loop?: boolean
  sizes?: string
}) {
  const box = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const element = video.current
    const frame = box.current
    if (!element || !frame || !videoAllowed()) return
    let loaded = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            element.src = sourceFor(clip)
            loaded = true
          }
          element.play().catch(() => {})
        } else {
          element.pause()
        }
      },
      { rootMargin: '30% 0px' },
    )
    observer.observe(frame)
    const onPlaying = () => setPlaying(true)
    element.addEventListener('playing', onPlaying)
    return () => {
      observer.disconnect()
      element.removeEventListener('playing', onPlaying)
      element.pause()
      element.removeAttribute('src')
      element.load()
    }
  }, [clip])

  return (
    <div ref={box} className="absolute inset-0">
      <Image
        src={clip.poster}
        alt={alt}
        fill
        priority={priority}
        placeholder="blur"
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: clip.focus }}
      />
      <video
        ref={video}
        muted
        playsInline
        loop={loop}
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
          playing ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectPosition: clip.focus }}
      />
    </div>
  )
}
