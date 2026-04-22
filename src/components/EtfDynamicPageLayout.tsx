import type { ReactNode } from 'react'
import EtfPageTemplate from '@/components/EtfPageTemplate'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import type { EtfDynamicDef } from '@/lib/etfDynamicRegistryTypes'
import { betaVsSpyDisplay } from '@/lib/etfPageFormat'
import type { EtfChartPayload } from '@/lib/getCachedEtfChart'
import type { EtfPageHubBase } from '@/components/EtfPageTemplate'
import {
  EtfEfficiencyMetaExtras,
  EtfEfficiencyPageFootnotes,
  type EtfEfficiencyGradeLine,
} from '@/components/etfEfficiency/EtfEfficiencyGrades'

function buildEfficiencyMetaExtras(def: EtfDynamicDef, chart: EtfChartPayload): ReactNode {
  const eff = def.efficiency
  if (!eff) return undefined
  const lines: EtfEfficiencyGradeLine[] = []
  const equityOnlyByCategory = def.hubCategoryId === 'factor' || def.hubCategoryId === 'long-short'
  if (equityOnlyByCategory) {
    const beta = chart.betaVsSpy1y
    const useAlpha = beta != null && beta < 0.8
    if (useAlpha && eff.alpha) {
      lines.push({
        label: 'Alpha Efficiency:',
        grade: eff.alpha.grade ?? 'N/A',
        gradeTone: eff.alpha.gradeTone,
        tooltip: eff.alpha.tooltip,
      })
    } else if (!useAlpha && eff.capital) {
      lines.push({
        label: 'Capital Efficiency:',
        grade: eff.capital.grade ?? 'N/A',
        gradeTone: eff.capital.gradeTone,
        tooltip: eff.capital.tooltip,
      })
    }
  } else {
    if (eff.capital) {
      lines.push({
        label: 'Capital Efficiency:',
        grade: eff.capital.grade ?? 'N/A',
        gradeTone: eff.capital.gradeTone,
        tooltip: eff.capital.tooltip,
      })
    }
    if (eff.alpha) {
      lines.push({
        label: 'Alpha Efficiency:',
        grade: eff.alpha.grade ?? 'N/A',
        gradeTone: eff.alpha.gradeTone,
        tooltip: eff.alpha.tooltip,
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
  /** CSS module from `page.module.css` (same shape as MATE / HDGE ETF pages). */
  styles: Record<string, string>
}

export default function EtfDynamicPageLayout({
  variant,
  hubBase,
  def,
  chart,
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
        beta: betaVsSpyDisplay(chart),
      }}
      metaExtras={buildEfficiencyMetaExtras(def, chart)}
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
