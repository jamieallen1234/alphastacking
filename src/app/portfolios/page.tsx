import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { usPortfolioRoutes } from '@/lib/portfolioRoutes'
import styles from './PortfoliosPage.module.css'

export const metadata = {
  title: 'Portfolios — Alpha Stacking',
  description: 'Model portfolios with live total-return charts and holdings.',
}

export default function PortfoliosHubPage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>US portfolios</div>
        <h1 className={styles.heading}>Model portfolios</h1>
        <p className={styles.lede}>
          Educational examples only — not investment advice. Live charts use adjusted daily closes
          (Yahoo Finance); inception is limited by the most recently listed ETF in each basket.
        </p>

        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠</span>
          <p>
            Sample portfolios are for educational purposes only. Past performance does not guarantee future results.
            Leveraged ETFs involve significant risk.
          </p>
        </div>

        <div className={styles.grid}>
          {usPortfolioRoutes.map((p) => {
            const isStub = p.kind === 'stub'
            const inner = (
              <>
                <span className={styles.cardBadge}>{p.badge}</span>
                <h2 className={styles.cardTitle}>{p.title}</h2>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.cardCta}>
                  {p.kind === 'live'
                    ? 'View portfolio →'
                    : p.kind === 'placeholder'
                      ? 'Preview →'
                      : 'Status →'}
                </div>
              </>
            )
            if (isStub) {
              return (
                <div key={p.slug} className={`${styles.card} ${styles.cardDisabled}`}>
                  {inner}
                </div>
              )
            }
            return (
              <Link key={p.slug} href={`/portfolios/${p.slug}`} className={styles.card}>
                {inner}
              </Link>
            )
          })}
        </div>
      </section>
      <Footer />
    </main>
  )
}
