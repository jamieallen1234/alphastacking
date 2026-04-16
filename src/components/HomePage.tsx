import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import EtfRetailMission from '@/components/EtfRetailMission'
import Stats from '@/components/Stats'
import AlphaExample from '@/components/AlphaExample'
import Footer from '@/components/Footer'

export interface HomePageProps {
  variant: 'us' | 'ca'
}

export default function HomePage({ variant }: HomePageProps) {
  return (
    <main>
      <Nav />
      <Hero variant={variant} />
      <div className="divider" />
      <EtfRetailMission variant={variant} />
      <div className="divider" />
      <Stats />
      <div className="divider" />
      <AlphaExample />
      <div className="divider" />
      <Footer />
    </main>
  )
}
