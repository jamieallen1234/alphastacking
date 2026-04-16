import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import EtfRetailMission from '@/components/EtfRetailMission'
import Stats from '@/components/Stats'
import AlphaExample from '@/components/AlphaExample'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Alpha Stacking — Canadian edition',
  description: 'Return stacking and model portfolios for Canadian investors.',
}

export default function CaHomePage() {
  return (
    <main>
      <Nav />
      <Hero variant="ca" />
      <div className="divider" />
      <EtfRetailMission variant="ca" />
      <div className="divider" />
      <Stats variant="ca" />
      <div className="divider" />
      <AlphaExample />
      <div className="divider" />
      <Footer />
    </main>
  )
}
