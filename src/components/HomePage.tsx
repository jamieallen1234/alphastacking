import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import EtfRetailMission from '@/components/EtfRetailMission'
import Stats from '@/components/Stats'
import AlphaExample from '@/components/AlphaExample'
import HomePortfolioCharts from '@/components/HomePortfolioCharts'
import HomeLearnSection from '@/components/HomeLearnSection'
import Footer from '@/components/Footer'
import type { HomePortfolioChartSlot } from '@/lib/loadHomePortfolioCharts'

export interface HomePageProps {
  variant: 'us' | 'ca'
  homePortfolioChartSlots: HomePortfolioChartSlot[]
}

export default function HomePage({ variant, homePortfolioChartSlots }: HomePageProps) {
  return (
    <main>
      <Nav />
      <Hero variant={variant} />
      <div className="divider" />
      <EtfRetailMission variant={variant} />
      <div className="divider" />
      <Stats />
      <div className="divider" />
      <HomeLearnSection variant={variant} />
      <div className="divider" />
      <HomePortfolioCharts variant={variant} slots={homePortfolioChartSlots} />
      <div className="divider" />
      <AlphaExample edition={variant} />
      <div className="divider" />
      <Footer />
    </main>
  )
}
