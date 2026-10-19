import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import NotFoundView from '@/components/not-found-view'
import './globals.css'

const sora = Sora({ subsets: ['latin', 'latin-ext'], weight: ['300', '400'], variable: '--font-sora' })

export const metadata: Metadata = {
  title: '404 | Equinoz',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="tr" className={sora.variable}>
      <body>
        <NotFoundView />
      </body>
    </html>
  )
}
