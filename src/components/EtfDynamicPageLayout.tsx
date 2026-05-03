import type { ReactNode } from 'react'
import EtfPageTemplate from '@/components/EtfPageTemplate'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
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

function efficiencyGradeToShow(grade: string | null | undefined): string | null {
  const g = grade?.trim()
  if (!g || g === 'N/A') return null
  return g
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
    } else if (!useAlpha && eff.capital) {
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
  /** CSS module from `page.module.css` (same shape as MATE / HDGE ETF pages). */
  styles: Record<string, string>
}

export default function EtfDynamicPageLayout({
  variant,
  hubBase,
  def,
  chart,
  slug,
  styles,
}: EtfDynamicPageLayoutProps) {
  const categoryValue = def.structure ?? def.badge

  return (
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
      chart={{
        displayLabel: def.displayTicker,
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
      styles={styles}
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
  )
}
