import type { StaticImageData } from 'next/image'
import accounting from '@/assets/media/video/accounting.jpg'
import consulting from '@/assets/media/video/consulting.jpg'
import creekEnd from '@/assets/media/video/creek-end.jpg'
import creek from '@/assets/media/video/creek.jpg'
import education from '@/assets/media/video/education.jpg'
import global from '@/assets/media/video/global.jpg'
import hero from '@/assets/media/video/hero.jpg'
import night from '@/assets/media/video/night.jpg'

export type Clip = {
  desktop: string
  mobile: string
  poster: StaticImageData
  focus: string
}

const clip = (name: string, poster: StaticImageData, focus: string): Clip => ({
  desktop: `/media/v/${name}.mp4`,
  mobile: `/media/v/${name}-m.mp4`,
  poster,
  focus,
})

export const clips = {
  hero: clip('hero', hero, '30% 50%'),
  global: clip('global', global, '62% 50%'),
  consulting: clip('consulting', consulting, '45% 50%'),
  accounting: clip('accounting', accounting, '55% 50%'),
  education: clip('education', education, '66% 50%'),
  night: clip('night', night, '60% 50%'),
  creek: clip('creek', creek, '50% 50%'),
}

export const creekNight = creekEnd
