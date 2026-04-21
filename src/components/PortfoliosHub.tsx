import type { CSSProperties } from 'react'
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

export type PortfoliosHubEdition = 'us' | 'ca'

export interface PortfoliosHubProps {
  edition: PortfoliosHubEdition
}

function portfolioGrid(routes: PortfolioRouteDef[], hrefFor: (slug: string) => string) {
  return (
    <div className={styles.grid}>
      {routes.map((p) => (
        <Link key={p.slug} href={hrefFor(p.slug)} className={styles.card}>
          <span className={styles.cardBadge}>{p.badge}</span>
          <h2 className={styles.cardTitle}>{p.title}</h2>
          <p className={styles.cardDesc}>{p.description}</p>
          <div className={styles.cardCta}>View portfolio →</div>
        </Link>
      ))}
    </div>
  )
}

function hubSections({
  portfolioRoutes,
  hrefFor,
  anchorIds,
  firstSectionMarginTop,
  betweenSections,
  extraBlurb,
  headingFontSize,
}: {
  portfolioRoutes: PortfolioRouteDef[]
  hrefFor: (slug: string) => string
  anchorIds: { annualRebalance: string; buyHold: string }
  firstSectionMarginTop: CSSProperties['marginTop']
  betweenSections: string
  extraBlurb: string
  headingFontSize?: number
}) {
  const bySection = (s: PortfolioHubSection) => portfolioRoutes.filter((r) => r.hubSection === s)

  return (
    <>
      {(['annual-rebalance', 'buy-hold'] as const).map((section, i) => {
        const meta = HUB_SECTION_LABEL[section]
        const routes = portfolioHubRoutes(bySection(section))
        if (routes.length === 0) return null
        const id = section === 'annual-rebalance' ? anchorIds.annualRebalance : anchorIds.buyHold
        const ledeText = [meta.blurb.trim(), extraBlurb.trim()].filter(Boolean).join(' ')
        return (
          <div key={section} id={id}>
            <h2
              className={styles.chartHeading}
              style={{
                marginTop: i === 0 ? firstSectionMarginTop : betweenSections,
                ...(headingFontSize != null ? { fontSize: headingFontSize } : {}),
              }}
            >
              {meta.heading}
            </h2>
            {ledeText ? (
              <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>
                {ledeText}
              </p>
            ) : null}
            {portfolioGrid(routes, hrefFor)}
          </div>
        )
      })}
    </>
  )
}

export default function PortfoliosHub({ edition }: PortfoliosHubProps) {
  if (edition === 'us') {
    return (
      <main className={styles.main}>
        <Nav />
        <section className={styles.section}>
          <div className={styles.sectionLabel}>US portfolios</div>
          <h1 className={styles.heading}>Model portfolios</h1>

          {hubSections({
            portfolioRoutes: usPortfolioRoutes,
            hrefFor: (slug) => `/portfolios/${slug}`,
            anchorIds: { annualRebalance: 'us-annual-rebalance', buyHold: 'us-buyhold' },
            firstSectionMarginTop: 0,
            betweenSections: '2.75rem',
            extraBlurb: '',
          })}
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Canadian edition</div>
        <h1 className={styles.heading}>Model portfolios</h1>

        <h2 className={styles.chartHeading} id="ca-block" style={{ marginTop: 0 }}>
          Canada
        </h2>
        {hubSections({
          portfolioRoutes: caPortfolioRoutes,
          hrefFor: (slug) => `/ca/portfolios/${slug}`,
          anchorIds: { annualRebalance: 'ca-annual-rebalance', buyHold: 'ca-buyhold' },
          firstSectionMarginTop: '0.5rem',
          betweenSections: '2.25rem',
          extraBlurb: '',
          headingFontSize: 11,
        })}

        <h2 className={styles.chartHeading} id="us-block" style={{ marginTop: '2.75rem' }}>
          United States
        </h2>
        {hubSections({
          portfolioRoutes: usPortfolioRoutes,
          hrefFor: (slug) => `/ca/portfolios/${slug}`,
          anchorIds: { annualRebalance: 'us-annual-rebalance', buyHold: 'us-buyhold' },
          firstSectionMarginTop: '0.5rem',
          betweenSections: '2.25rem',
          extraBlurb: '',
          headingFontSize: 11,
        })}
      </section>
      <Footer />
    </main>
  )
}
