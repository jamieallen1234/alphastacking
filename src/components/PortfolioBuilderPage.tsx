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
          Pick tickers, set weights to 100%, and generate a return chart. Use it to test a model
          portfolio from the hub, experiment with different weights, or try your own mix. The chart shows
          total return versus SPY and max drawdown for any date range with available history.
        </p>
        <PortfolioBuilderTool edition={edition} options={options} />
      </section>
      <Footer />
    </main>
  )
}

