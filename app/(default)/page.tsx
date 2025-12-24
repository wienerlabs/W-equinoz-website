export const metadata = {
  title: 'EQUINOZ Global | Private Client Advisory - Dubai',
  description: 'Dubai-based private-client advisory firm guiding HNW and UHNW families toward secure, meaningful, and strategic establishment in the UAE and beyond.',
}

import Hero from '@/components/equinoz/hero'
import About from '@/components/equinoz/about'
import Services from '@/components/equinoz/services'
import Team from '@/components/equinoz/team'
import Contact from '@/components/equinoz/contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Team />
      <Contact />
    </>
  )
}
