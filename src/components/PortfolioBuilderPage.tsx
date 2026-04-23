import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PortfolioBuilderTool from '@/components/PortfolioBuilderTool'
import {
  getCachedPortfolioBuilderOptionsCa,
  getCachedPortfolioBuilderOptionsUs,
} from '@/lib/portfolioBuilderEtfOptions'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export default async function PortfolioBuilderPage({ edition }: { edition: 'us' | 'ca' }) {
  const options =
    edition === 'ca'
      ? await getCachedPortfolioBuilderOptionsCa()
      : await getCachedPortfolioBuilderOptionsUs()
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          {edition === 'ca' ? 'Canadian edition' : 'United States'}
        </div>
        <h1 className={styles.heading}>Portfolio builder</h1>
        <p className={styles.lede}>
          Build a portfolio from tracked ETFs, set row allocations and efficiency sleeve, then generate
          a portfolio chart.
        </p>
        <PortfolioBuilderTool edition={edition} options={options} />
      </section>
      <Footer />
    </main>
  )
}

