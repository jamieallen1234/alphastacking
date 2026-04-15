import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  caPortfolioRoutes,
  type PortfolioRouteDef,
  usPortfolioRoutes,
} from '@/lib/portfolioRoutes'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export const metadata = {
  title: 'Portfolios — Alpha Stacking (Canadian edition)',
  description: 'US and Canadian model portfolios with live charts.',
}

function portfolioCard(p: PortfolioRouteDef, href: string) {
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
    <Link key={p.slug} href={href} className={styles.card}>
      {inner}
    </Link>
  )
}

export default function CaPortfoliosHubPage() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Canadian edition</div>
        <h1 className={styles.heading}>Model portfolios</h1>
        <p className={styles.lede}>
          Educational examples only. US-listed models open on the main site path; Canadian models use
          TSX examples where it matters. Charts use adjusted daily closes; inception is limited by the
          most recently listed fund in each basket.
        </p>

        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠</span>
          <p>
            Sample portfolios are for educational purposes. Past performance does not guarantee future results.
            Leveraged and alternative ETFs involve significant risk.
          </p>
        </div>

        <h2 className={styles.chartHeading} id="us-models" style={{ marginTop: 0 }}>
          US model portfolios
        </h2>
        <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>
          US-listed baskets (same pages as{' '}
          <Link href="/portfolios" style={{ color: 'var(--color-gold)' }}>
            alphastacking.co/portfolios
          </Link>
          ).
        </p>
        <div className={styles.grid}>
          {usPortfolioRoutes.map((p) => portfolioCard(p, `/portfolios/${p.slug}`))}
        </div>

        <h2 className={styles.chartHeading} id="ca-models" style={{ marginTop: '2.75rem' }}>
          Canadian model portfolios
        </h2>
        <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>
          TSX-heavy and Canada-aware sleeves; live charts in CAD where noted.
        </p>
        <div className={styles.grid}>
          {caPortfolioRoutes.map((p) => portfolioCard(p, `/ca/portfolios/${p.slug}`))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
