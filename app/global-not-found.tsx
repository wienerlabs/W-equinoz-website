import type { Metadata } from 'next'
import { Cormorant_Garamond, Mukta_Mahee } from 'next/font/google'
import NotFoundView from '@/components/not-found-view'
import './globals.css'

const display = Cormorant_Garamond({ subsets: ['latin', 'latin-ext'], weight: ['400'], variable: '--font-cormorant' })
const text = Mukta_Mahee({ subsets: ['latin', 'latin-ext'], weight: ['300', '400'], variable: '--font-mukta' })

export const metadata: Metadata = {
  title: '404 | Equinoz',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="tr" className={`${display.variable} ${text.variable}`}>
      <body>
        <NotFoundView />
      </body>
    </html>
  )
}
