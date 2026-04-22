import type { ReactNode } from 'react'
import EtfPageTemplate from '@/components/EtfPageTemplate'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import type { EtfDynamicDef } from '@/lib/etfDynamicRegistry'
import { betaVsSpyDisplay } from '@/lib/etfPageFormat'
import type { EtfChartPayload } from '@/lib/getCachedEtfChart'
import type { EtfPageHubBase } from '@/components/EtfPageTemplate'
import {
  EtfEfficiencyMetaExtras,
  EtfEfficiencyPageFootnotes,
  type EtfEfficiencyGradeLine,
} from '@/components/etfEfficiency/EtfEfficiencyGrades'

function buildEfficiencyMetaExtras(def: EtfDynamicDef): ReactNode {
  const eff = def.efficiency
  if (!eff) return undefined
  const lines: EtfEfficiencyGradeLine[] = []
  if (eff.capital) {
    lines.push({
      label: 'Capital Efficiency:',
      grade: eff.capital.grade,
      gradeTone: eff.capital.gradeTone,
      tooltip: eff.capital.tooltip,
    })
  }
  if (eff.alpha) {
    lines.push({
      label: 'Alpha Efficiency:',
      grade: eff.alpha.grade,
      gradeTone: eff.alpha.gradeTone,
      tooltip: eff.alpha.tooltip,
    })
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
  return (
    <EtfPageTemplate
      variant={variant}
      hubBase={hubBase}
      hubCategoryId={def.hubCategoryId}
      badge={def.badge}
      heading={def.h1Title}
      lede={def.lede}
      meta={{
        ticker: def.displayTicker,
        issuerOrManager: def.issuer,
        inception: def.inception,
        mer: def.mer,
        aum: def.aum,
        structure: def.structure,
        beta: betaVsSpyDisplay(chart),
      }}
      metaExtras={buildEfficiencyMetaExtras(def)}
      chart={{
        displayLabel: def.displayTicker,
        yahooSymbol: def.yahooSymbol,
        payload: chart,
      }}
      styles={styles}
    >
      <div className={styles.bodySection}>
        <h2>Strategy</h2>
        {def.strategyParas.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className={styles.bodySection}>
        <h2>Manager and Issuer Pedigree</h2>
        {def.pedigreeParas.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className={styles.bodySection}>
        <h2>Outperformance</h2>
        {def.outperfParas.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
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
