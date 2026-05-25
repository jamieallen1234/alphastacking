import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PortfolioHubNav from '@/components/PortfolioHubNav'
import {
  caPortfolioRoutes,
  HUB_SECTION_LABEL,
  US_PORTFOLIO_CATEGORIES,
  type PortfolioHubSection,
  type PortfolioRouteDef,
  portfolioHubRoutes,
  usPortfolioRoutes,
} from '@/lib/portfolioRoutes'
import type { PortfolioHubSlugData } from '@/lib/loadPortfolioHubAlpha'
import { computeBlendedGrade, gradeRank, type PortfolioLetterGrade } from '@/lib/portfolioHubGrade'
import styles from '@/app/portfolios/PortfoliosPage.module.css'

export type PortfoliosHubEdition = 'us' | 'ca'

export interface PortfoliosHubProps {
  edition: PortfoliosHubEdition
  hubDataBySlug: Record<string, PortfolioHubSlugData>
}

function formatHubAlpha(pct: number): string {
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`
}

function resolveGrade(route: PortfolioRouteDef, data: PortfolioHubSlugData | undefined): PortfolioLetterGrade | null {
  if (!data || route.weightedBeta == null) return null
  return computeBlendedGrade(data.payload1y, data.payloadMax, route.weightedBeta)
}

function sortByGradeThenDate(
  routes: PortfolioRouteDef[],
  hubDataBySlug: Record<string, PortfolioHubSlugData>,
): PortfolioRouteDef[] {
  return [...routes].sort((a, b) => {
    const ga = resolveGrade(a, hubDataBySlug[a.slug])
    const gb = resolveGrade(b, hubDataBySlug[b.slug])
    const rankDiff = gradeRank(ga) - gradeRank(gb)
    if (rankDiff !== 0) return rankDiff
    // Secondary: addedAt desc (newer first)
    const da = a.addedAt ?? ''
    const db = b.addedAt ?? ''
    return db.localeCompare(da)
  })
}

function portfolioGrid(
  routes: PortfolioRouteDef[],
  hrefFor: (slug: string) => string,
  hubDataBySlug: Record<string, PortfolioHubSlugData>,
) {
  return (
    <div className={styles.grid}>
      {routes.map((p) => {
        const data = hubDataBySlug[p.slug]
        const alpha = data?.excessAlphaPercent ?? null
        const grade = resolveGrade(p, data)
        return (
          <Link
            key={p.slug}
            href={hrefFor(p.slug)}
            className={[
              styles.card,
              grade === 'A+' ? styles.cardAPlus : grade === 'A' ? styles.cardA : '',
            ].filter(Boolean).join(' ')}
          >
            <div className={styles.cardTopRow}>
              {p.badge ? <span className={styles.cardBadge}>{p.badge}</span> : null}
              {grade != null ? (
                <span className={[
                  styles.cardGrade,
                  grade === 'A+' ? styles.cardGradeAPlus : grade === 'A' ? styles.cardGradeA : '',
                ].filter(Boolean).join(' ')}>{grade}</span>
              ) : null}
            </div>
            <h2 className={styles.cardTitle}>{p.title}</h2>
            <p className={styles.cardDesc}>{p.description}</p>
            <div className={styles.cardAlphaRow} aria-label="One-year alpha versus S and P 500 total return">
              {alpha != null ? (
                <>
                  <span
                    className={`${styles.cardAlphaVal} ${alpha >= 0 ? styles.cardAlphaPos : styles.cardAlphaNeg}`}
                  >
                    {formatHubAlpha(alpha)}
                  </span>
                  <span className={styles.cardAlphaLab}>1Y alpha vs SPY</span>
                </>
              ) : (
                <span className={styles.cardAlphaUnavailable}>1Y alpha —</span>
              )}
            </div>
            <div className={styles.cardCta}>View portfolio →</div>
          </Link>
        )
      })}
    </div>
  )
}


const REBALANCE_LABEL: Record<'annual' | 'none', string> = {
  annual: 'Annual rebalance',
  none: 'Buy & hold',
}

export default function PortfoliosHub({ edition, hubDataBySlug }: PortfoliosHubProps) {
  if (edition === 'us') {
    return (
      <main className={styles.main}>
        <Nav />
        <section className={styles.section}>
          <div className={styles.sectionLabel}>US portfolios</div>
          <h1 className={styles.heading}>Model portfolios</h1>

          <PortfolioHubNav categories={US_PORTFOLIO_CATEGORIES} base="/portfolios" />

          {US_PORTFOLIO_CATEGORIES.map((cat, catIdx) => {
            const live = portfolioHubRoutes(
              usPortfolioRoutes.filter((r) => r.hubSection === cat.id)
            )
            if (live.length === 0) return null

            // Detect whether this category has both rebalance types
            const hasAnnual = live.some((r) => r.rebalance === 'annual')
            const hasNone = live.some((r) => r.rebalance === 'none')
            const hasSubsections = hasAnnual && hasNone

            return (
              <div key={cat.id} id={cat.id} className={catIdx === 0 ? undefined : styles.categorySection}>
                <h2 className={styles.categoryHeading}>{cat.title}</h2>
                {cat.subtitle ? (
                  <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>
                    {cat.subtitle}
                  </p>
                ) : null}

                {hasSubsections ? (
                  <>
                    {(['annual', 'none'] as const).map((rb) => {
                      const group = sortByGradeThenDate(
                        live.filter((r) => r.rebalance === rb),
                        hubDataBySlug,
                      )
                      if (group.length === 0) return null
                      return (
                        <div key={rb} className={styles.rebalanceSubsection}>
                          <h3 className={styles.subsectionHeading}>{REBALANCE_LABEL[rb]}</h3>
                          {portfolioGrid(group, (slug) => `/portfolios/${slug}`, hubDataBySlug)}
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <>
                    {hasAnnual || hasNone ? (
                      <p className={styles.subsectionLabel}>
                        {hasAnnual ? REBALANCE_LABEL['annual'] : REBALANCE_LABEL['none']}
                      </p>
                    ) : null}
                    {portfolioGrid(
                      sortByGradeThenDate(live, hubDataBySlug),
                      (slug) => `/portfolios/${slug}`,
                      hubDataBySlug,
                    )}
                  </>
                )}
              </div>
            )
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

        {(['annual-rebalance', 'buy-hold'] as const).map((section, i) => {
          const label = HUB_SECTION_LABEL[section]
          const routes = sortByGradeThenDate(
            portfolioHubRoutes(caPortfolioRoutes.filter((r) => r.hubSection === section)),
            hubDataBySlug,
          )
          if (routes.length === 0) return null
          return (
            <div key={section} id={section === 'annual-rebalance' ? 'ca-annual-rebalance' : 'ca-buyhold'} className={i === 0 ? undefined : styles.categorySection}>
              <h2 className={styles.categoryHeading} style={{ marginTop: i === 0 ? '0.5rem' : undefined }}>{label.heading}</h2>
              <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>{label.blurb}</p>
              {portfolioGrid(routes, (slug) => `/ca/portfolios/${slug}`, hubDataBySlug)}
            </div>
          )
        })}

        <h2 className={styles.chartHeading} id="us-block" style={{ marginTop: '2.75rem' }}>
          United States
        </h2>

        {US_PORTFOLIO_CATEGORIES.map((cat, catIdx) => {
          const live = portfolioHubRoutes(
            usPortfolioRoutes.filter((r) => r.hubSection === cat.id)
          )
          if (live.length === 0) return null

          const hasAnnual = live.some((r) => r.rebalance === 'annual')
          const hasNone = live.some((r) => r.rebalance === 'none')
          const hasSubsections = hasAnnual && hasNone

          return (
            <div key={cat.id} id={`ca-us-${cat.id}`} className={styles.categorySection}>
              <h2 className={styles.categoryHeading}>{cat.title}</h2>
              {cat.subtitle ? (
                <p className={styles.lede} style={{ marginBottom: '1.25rem', fontSize: 13 }}>
                  {cat.subtitle}
                </p>
              ) : null}

              {hasSubsections ? (
                <>
                  {(['annual', 'none'] as const).map((rb) => {
                    const group = sortByGradeThenDate(
                      live.filter((r) => r.rebalance === rb),
                      hubDataBySlug,
                    )
                    if (group.length === 0) return null
                    return (
                      <div key={rb} className={styles.rebalanceSubsection}>
                        <h3 className={styles.subsectionHeading}>{REBALANCE_LABEL[rb]}</h3>
                        {portfolioGrid(group, (slug) => `/ca/portfolios/${slug}`, hubDataBySlug)}
                      </div>
                    )
                  })}
                </>
              ) : (
                <>
                  {hasAnnual || hasNone ? (
                    <p className={styles.subsectionLabel}>
                      {hasAnnual ? REBALANCE_LABEL['annual'] : REBALANCE_LABEL['none']}
                    </p>
                  ) : null}
                  {portfolioGrid(
                    sortByGradeThenDate(live, hubDataBySlug),
                    (slug) => `/ca/portfolios/${slug}`,
                    hubDataBySlug,
                  )}
                </>
              )}
            </div>
          )
        })}
      </section>
      <Footer />
    </main>
  )
}
