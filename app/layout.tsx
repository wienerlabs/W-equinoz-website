import './css/style.css'

import { Mukta_Mahee, Playfair_Display } from 'next/font/google'

const muktaMahee = Mukta_Mahee({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-mukta-mahee',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap'
})

export const metadata = {
  title: 'EQUINOZ Global | Private Client Advisory',
  description: 'Dubai-based private-client advisory firm guiding HNW and UHNW families toward secure, meaningful, and strategic establishment in the UAE and beyond.',
  keywords: 'family office, golden visa, UAE, Dubai, private client advisory, investment, HNW, UHNW',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${muktaMahee.variable} ${playfair.variable} font-mukta-mahee antialiased bg-white text-slate-800 tracking-tight`}>
        {children}
      </body>
    </html>
  )
}
