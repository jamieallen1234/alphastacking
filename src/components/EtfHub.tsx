import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ETF_CATEGORY_ROWS } from '@/lib/etfCategories'
import styles from './EtfHub.module.css'

export interface EtfHubProps {
  variant: 'us' | 'ca'
}

export default function EtfHub({ variant }: EtfHubProps) {
  const isCa = variant === 'ca'

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section} aria-labelledby="etf-hub-heading">
        <div className={styles.sectionLabel}>
          {isCa ? 'Canadian edition' : 'United States'}
        </div>
        <h1 id="etf-hub-heading" className={styles.heading}>
          ETFs
        </h1>
        <p className={styles.lede}>
          {isCa
            ? 'Canadian-listed and we track for alpha stacking — grouped by strategy. Full write-ups are on the way.'
            : 'US-listed funds we track for alpha stacking — grouped by strategy. Full write-ups are on the way.'}
        </p>

        <div className={styles.categories}>
          {ETF_CATEGORY_ROWS.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className={styles.category}
              aria-labelledby={`etf-cat-${cat.id}`}
            >
              <h2 id={`etf-cat-${cat.id}`} className={styles.categoryTitle}>
                {cat.title}
              </h2>
              {cat.id === 'return-stacked' && !isCa ? (
                <ul className={styles.etfList}>
                  <li>
                    <Link href="/us-etfs/mate" className={styles.etfLink}>
                      <p className={styles.etfName}>MATE — Man Active Trend Enhanced ETF</p>
                      <p className={styles.etfDesc}>
                        100% S&amp;P 500 beta stacked with 100% trend-following managed futures.
                      </p>
                    </Link>
                  </li>
                </ul>
              ) : cat.id === 'long-short' && isCa ? (
                <ul className={styles.etfList}>
                  <li>
                    <Link href="/ca/etfs/hdge" className={styles.etfLink}>
                      <p className={styles.etfName}>HDGE.TO — Accelerate Absolute Return Fund</p>
                      <p className={styles.etfDesc}>
                        Quantitative long/short North American equity strategy in an ETF wrapper.
                      </p>
                    </Link>
                  </li>
                </ul>
              ) : (
                <p className={styles.comingSoon}>Coming soon</p>
              )}
            </section>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
