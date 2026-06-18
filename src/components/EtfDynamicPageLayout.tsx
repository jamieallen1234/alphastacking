import type { ReactNode } from 'react'
import EtfPageTemplate, { etfPageStyles as styles } from '@/components/EtfPageTemplate'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import type { EtfDynamicDef } from '@/lib/etfDynamicRegistryTypes'
import { chartBetaDisplay } from '@/lib/etfPageFormat'
import type { EtfChartPayload } from '@/lib/getCachedEtfChart'
import type { EtfPageHubBase } from '@/components/EtfPageTemplate'
import {
  EtfEfficiencyMetaExtras,
  EtfEfficiencyPageFootnotes,
  type EtfEfficiencyGradeLine,
} from '@/components/etfEfficiency/EtfEfficiencyGrades'
import { capitalEfficiencyMetaLabel, stackExposureLineAvailability } from '@/lib/etfStackExposureBySlug'
import type { PrimarySimilarityHeadline, SimilarEtfRow } from '@/lib/etfSimilarEtfs'
import { displayTagLabelsForSlug } from '@/lib/etfSimilarityTags'

function efficiencyGradeToShow(grade: string | null | undefined): string | null {
  const g = grade?.trim()
  if (!g || g === 'N/A') return null
  return g
}

function similarEtfDisplayName(title: string): string {
  const m = title.match(/^[A-Z0-9.+-]+\s(?:—|-)\s(.+)$/)
  return m?.[1] ?? title
}

function buildEfficiencyMetaExtras(def: EtfDynamicDef, chart: EtfChartPayload, slug?: string): ReactNode {
  const eff = def.efficiency
  if (!eff) return undefined
  const lines: EtfEfficiencyGradeLine[] = []
  const stackLines = slug ? stackExposureLineAvailability(slug) : null
  const equityOnlyByCategory = def.hubCategoryId === 'factor' || def.hubCategoryId === 'long-short'
  if (equityOnlyByCategory) {
    const beta = chart.beta1y
    const useAlpha = beta != null && beta < 0.8
    if (useAlpha && eff.alpha) {
      const alphaGrade = efficiencyGradeToShow(eff.alpha.grade)
      if (alphaGrade != null) {
        lines.push({
          label: 'Alpha Efficiency:',
          grade: alphaGrade,
          gradeTone: eff.alpha.gradeTone,
          tooltip: eff.alpha.tooltip,
        })
      }
    }
    if (lines.length === 0 && eff.capital) {
      const capGrade = efficiencyGradeToShow(eff.capital.grade)
      if (capGrade != null) {
        lines.push({
          label: 'Equity Efficiency:',
          grade: capGrade,
          gradeTone: eff.capital.gradeTone,
          tooltip: eff.capital.tooltip,
        })
      }
    }
    if (lines.length === 0 && eff.alpha) {
      const alphaGrade = efficiencyGradeToShow(eff.alpha.grade)
      if (alphaGrade != null) {
        lines.push({
          label: 'Alpha Efficiency:',
          grade: alphaGrade,
          gradeTone: eff.alpha.gradeTone,
          tooltip: eff.alpha.tooltip,
        })
      }
    }
  } else {
    const capGrade = eff.capital ? efficiencyGradeToShow(eff.capital.grade) : null
    if (capGrade != null && eff.capital && (!stackLines || stackLines.hasEquitySleeve)) {
      lines.push({
        label: capitalEfficiencyMetaLabel(slug),
        grade: capGrade,
        gradeTone: eff.capital.gradeTone,
        tooltip: eff.capital.tooltip,
      })
    }
    const alphaGrade = eff.alpha ? efficiencyGradeToShow(eff.alpha.grade) : null
    if (alphaGrade != null && eff.alpha && (!stackLines || stackLines.hasNonEquitySleeve)) {
      lines.push({
        label: 'Alpha Efficiency:',
        grade: alphaGrade,
        gradeTone: eff.alpha.gradeTone,
        tooltip: eff.alpha.tooltip,
      })
    }
    if (eff.stacked) {
      lines.push({
        label: 'Stacked Efficiency:',
        grade: eff.stacked.grade ?? 'N/A',
        gradeTone: eff.stacked.gradeTone,
        tooltip: eff.stacked.tooltip,
      })
    }
  }
  if (lines.length === 0) return undefined
  return <EtfEfficiencyMetaExtras lines={lines} notes={eff.notes} />
}

export interface EtfDynamicPageLayoutProps {
  variant: 'us' | 'ca'
  hubBase: EtfPageHubBase
  def: EtfDynamicDef
  chart: EtfChartPayload
  /** Route slug for stack map (capital vs alpha buckets; equity label when stack has an equity sleeve). */
  slug?: string
  /** Tag-derived similar ETF peers (current ETF score line above, peers below). */
  similarEtfs?: SimilarEtfRow[]
  /** Primary ETF efficiency line (same score priority as peer rows) shown above the list. */
  primarySimilarityHeadline?: PrimarySimilarityHeadline
}

export default function EtfDynamicPageLayout({
  variant,
  hubBase,
  def,
  chart,
  slug,
  similarEtfs,
  primarySimilarityHeadline,
}: EtfDynamicPageLayoutProps) {
  const categoryValue = def.structure ?? def.badge
  const tagChips = slug ? displayTagLabelsForSlug(slug, variant) : []
  const isCaHub = hubBase.startsWith('/ca')
  const homePath = isCaHub ? '/ca' : '/'
  const hubLabel = hubBase === '/ca/etfs' ? 'CA ETFs' : 'US ETFs'

  return (
    <>
      {slug && (
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', href: homePath },
            { name: hubLabel, href: hubBase },
            { name: def.displayTicker, href: `${hubBase}/${slug}` },
          ]}
        />
      )}
    <EtfPageTemplate
      variant={variant}
      hubBase={hubBase}
      hubCategoryId={def.hubCategoryId}
      badge={def.badge}
      heading={def.h1Title}
      lede={def.lede}
      ledeHtml={def.contentFormat === 'html'}
      meta={{
        ticker: def.displayTicker,
        issuerOrManager: def.issuer,
        issuerRole: def.issuerRole,
        inception: def.inception,
        mer: def.mer,
        aum: def.aum,
        structure: categoryValue,
        structureLabel: 'Category',
        structureStartsNewRow: true,
        beta: chartBetaDisplay(chart),
      }}
      metaExtras={buildEfficiencyMetaExtras(def, chart, slug)}
      tagChips={tagChips}
      chart={{
        displayLabel: def.displayTicker,
        headingLabel: def.chartHeadingLabel,
        yahooSymbol: def.yahooSymbol,
        payload: chart,
      }}
      belowChart={
        def.belowChart ? (
          <p
            className={styles.chartProxyNote}
            dangerouslySetInnerHTML={{ __html: def.belowChart }}
          />
        ) : undefined
      }
    >
      <div className={styles.bodySection}>
        <h2>Strategy</h2>
        {def.strategyParas.map((p, i) =>
          def.contentFormat === 'html' ? (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ) : (
            <p key={i}>{p}</p>
          )
        )}
      </div>

      <div className={styles.bodySection}>
        <h2>Manager and Issuer Pedigree</h2>
        {def.pedigreeParas.map((p, i) =>
          def.contentFormat === 'html' ? (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ) : (
            <p key={i}>{p}</p>
          )
        )}
      </div>

      <div className={styles.bodySection}>
        <h2>Outperformance</h2>
        {def.outperfParas.map((p, i) =>
          def.contentFormat === 'html' ? (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ) : (
            <p key={i}>{p}</p>
          )
        )}
      </div>
      {similarEtfs != null && similarEtfs.length > 0 ? (
        <div className={styles.bodySection}>
          <h2>Similar ETFs</h2>
          <div className={styles.similarEtfTableWrap}>
            <table className={styles.similarEtfTable}>
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>MER</th>
                  <th>AUM</th>
                </tr>
              </thead>
              <tbody>
                {primarySimilarityHeadline != null ? (
                  <tr>
                    <td>
                      <strong>{primarySimilarityHeadline.shortTicker}</strong>
                    </td>
                    <td>{similarEtfDisplayName(def.h1Title)}</td>
                    <td>
                      <strong>{primarySimilarityHeadline.grade}</strong>
                    </td>
                    <td>{def.mer}</td>
                    <td>{def.aum}</td>
                  </tr>
                ) : null}
                {similarEtfs.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <a href={`${hubBase}/${item.slug}`}>{item.ticker}</a>
                    </td>
                    <td>{similarEtfDisplayName(item.name)}</td>
                    <td>
                      <strong>{item.displayScore}</strong>
                    </td>
                    <td>{item.mer}</td>
                    <td>{item.aum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <div className={styles.bodySection}>
        <h2>Official ETF page</h2>
        <p>
          Read the official ETF page for current NAV, holdings, and documents:{' '}
          <a href={def.officialUrl} target="_blank" rel="noopener noreferrer">
            {def.officialLabel}
          </a>
          .
        </p>
        <EtfPageDisclaimers />
      </div>
      {def.efficiency?.footnotes != null && def.efficiency.footnotes.length > 0 ? (
        <EtfEfficiencyPageFootnotes paragraphs={def.efficiency.footnotes} />
      ) : null}
    </EtfPageTemplate>
    </>
  )
}
