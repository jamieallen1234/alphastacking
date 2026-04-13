import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Framework from '@/components/Framework'
import Portfolios from '@/components/Portfolios'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div className="divider" />
      <Stats />
      <div className="divider" />
      <Framework />
      <Portfolios />
      <Footer />
    </main>
  )
}
