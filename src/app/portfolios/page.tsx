import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  HUB_SECTION_LABEL,
  type PortfolioHubSection,
  usPortfolioRoutes,
} from '@/lib/portfolioRoutes'
import styles from './PortfoliosPage.module.css'

export const metadata = {
  title: 'Portfolios — Alpha Stacking',
  description: 'Model portfolios with live total-return charts and holdings.',
}

function portfolioGrid(
  routes: typeof usPortfolioRoutes,
  hrefFor: (slug: string) => string
) {
  return (
    <div className={styles.grid}>
      {routes.map((p) => {
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
          <Link key={p.slug} href={hrefFor(p.slug)} className={styles.card}>
            {inner}
          </Link>
        )
      })}
    </div>
  )
}

export default function PortfoliosHubPage() {
  const bySection = (s: PortfolioHubSection) => usPortfolioRoutes.filter((r) => r.hubSection === s)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>US portfolios</div>
        <h1 className={styles.heading}>Model portfolios</h1>
        <p className={styles.lede}>
          Not advice. Charts: Yahoo adjusted closes; start date follows the youngest listing in each basket.
        </p>

        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠</span>
          <p>Educational models. Past ≠ future. Leveraged ETFs are risky.</p>
        </div>

        {(['leveraged-quarterly', 'buy-hold'] as const).map((section, i) => {
          const meta = HUB_SECTION_LABEL[section]
          const routes = bySection(section)
          if (routes.length === 0) return null
          return (
            <div key={section} id={section === 'leveraged-quarterly' ? 'us-quarterly' : 'us-buyhold'}>
              <h2
                className={styles.chartHeading}
                style={{ marginTop: i === 0 ? 0 : '2.75rem' }}
              >
                {meta.heading}
              </h2>
              <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>
                {meta.blurb}
              </p>
              {portfolioGrid(routes, (slug) => `/portfolios/${slug}`)}
            </div>
          )
        })}
      </section>
      <Footer />
    </main>
  )
}
