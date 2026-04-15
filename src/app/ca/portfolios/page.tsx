import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { caPortfolioRoutes } from '@/lib/portfolioRoutes'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export const metadata = {
  title: 'Portfolios (CA) — Alpha Stacking',
  description: 'Canadian model portfolios with live charts.',
}

export default function CaPortfoliosHubPage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Canadian portfolios</div>
        <h1 className={styles.heading}>Model portfolios</h1>
        <p className={styles.lede}>
          Educational examples only. Charts use adjusted daily closes where available; inception is
          limited by the most recently listed fund in each basket (US + Canada sessions intersect).
        </p>

        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠</span>
          <p>
            Sample portfolios are for educational purposes. Past performance does not guarantee future results.
            Leveraged and alternative ETFs involve significant risk.
          </p>
        </div>

        <div className={styles.grid}>
          {caPortfolioRoutes.map((p) => {
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
              <Link key={p.slug} href={`/ca/portfolios/${p.slug}`} className={styles.card}>
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
