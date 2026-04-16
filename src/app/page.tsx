import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import EtfRetailMission from '@/components/EtfRetailMission'
import Stats from '@/components/Stats'
import AlphaExample from '@/components/AlphaExample'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div className="divider" />
      <EtfRetailMission variant="us" />
      <div className="divider" />
      <Stats variant="us" />
      <div className="divider" />
      <AlphaExample />
      <div className="divider" />
      <Footer />
    </main>
  )
}
