import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Cormorant_Garamond, Sora } from 'next/font/google'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Intro from '@/components/intro'
import MotionRoot from '@/components/motion-root'
import SunCursor from '@/components/sun-cursor'
import { publishedPartners } from '@/lib/content/people'
import { ui } from '@/lib/content/ui'
import { isLang, langs } from '@/lib/i18n'
import { site } from '@/lib/site'
import '../globals.css'

const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-sora',
  display: 'swap',
})

const serif = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('eqz-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-done')}catch(e){d.classList.add('intro-done')}setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.add('no-motion','intro-done')},4000)})()`

export const dynamicParams = false

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  applicationName: site.name,
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#061211',
  colorScheme: 'dark',
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return (
    <html lang={lang} className={`${sora.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="grain">
        <MotionRoot />
        <Intro skipLabel={ui.skipIntro[lang]} />
        <Header lang={lang} showPartners={publishedPartners.length > 0} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <SunCursor />
      </body>
    </html>
  )
}
