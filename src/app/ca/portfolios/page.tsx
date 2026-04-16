import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  caPortfolioRoutes,
  HUB_SECTION_LABEL,
  type PortfolioHubSection,
  type PortfolioRouteDef,
  portfolioHubRoutes,
  usPortfolioRoutes,
} from '@/lib/portfolioRoutes'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export const metadata = {
  title: 'Portfolios — Alpha Stacking (Canadian edition)',
  description: 'US and Canadian model portfolios with live charts.',
}

function portfolioCard(p: PortfolioRouteDef, href: string) {
  return (
    <Link key={p.slug} href={href} className={styles.card}>
      <span className={styles.cardBadge}>{p.badge}</span>
      <h2 className={styles.cardTitle}>{p.title}</h2>
      <p className={styles.cardDesc}>{p.description}</p>
      <div className={styles.cardCta}>View portfolio →</div>
    </Link>
  )
}

function gridFor(routes: PortfolioRouteDef[], hrefFor: (slug: string) => string) {
  return <div className={styles.grid}>{routes.map((p) => portfolioCard(p, hrefFor(p.slug)))}</div>
}

function sectionBlocks(
  regionPrefix: 'ca' | 'us',
  by: (s: PortfolioHubSection) => PortfolioRouteDef[],
  hrefFor: (slug: string) => string,
  extraBlurb: string,
  firstBlockMarginTop: string
) {
  return (
    <>
      {(['leveraged-quarterly', 'buy-hold'] as const).map((section, i) => {
        const meta = HUB_SECTION_LABEL[section]
        const routes = portfolioHubRoutes(by(section))
        if (routes.length === 0) return null
        const id =
          regionPrefix === 'ca'
            ? section === 'leveraged-quarterly'
              ? 'ca-quarterly'
              : 'ca-buyhold'
            : section === 'leveraged-quarterly'
              ? 'us-quarterly'
              : 'us-buyhold'
        return (
          <div key={`${regionPrefix}-${section}`} id={id}>
            <h2
              className={styles.chartHeading}
              style={{
                marginTop: i === 0 ? firstBlockMarginTop : '2.25rem',
                fontSize: 11,
              }}
            >
              {meta.heading}
            </h2>
            <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>
              {meta.blurb} {extraBlurb}
            </p>
            {gridFor(routes, hrefFor)}
          </div>
        )
      })}
    </>
  )
}

export default function CaPortfoliosHubPage() {
  const usBy = (s: PortfolioHubSection) => usPortfolioRoutes.filter((r) => r.hubSection === s)
  const caBy = (s: PortfolioHubSection) => caPortfolioRoutes.filter((r) => r.hubSection === s)

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Canadian edition</div>
        <h1 className={styles.heading}>Model portfolios</h1>
        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠</span>
          <p>Educational models. Past ≠ future. Leveraged / alt funds are risky.</p>
        </div>

        <h2 className={styles.chartHeading} id="ca-block" style={{ marginTop: 0 }}>
          Canada
        </h2>
        {sectionBlocks(
          'ca',
          caBy,
          (slug) => `/ca/portfolios/${slug}`,
          'Live CAD charts where noted (VFV.TO benchmark labeled SPY).',
          '0.5rem'
        )}

        <h2 className={styles.chartHeading} id="us-block" style={{ marginTop: '2.75rem' }}>
          United States
        </h2>
        {sectionBlocks(
          'us',
          usBy,
          (slug) => `/ca/portfolios/${slug}`,
          'Same models as /portfolios; links stay in the Canadian edition.',
          '0.5rem'
        )}
      </section>
      <Footer />
    </main>
  )
}
