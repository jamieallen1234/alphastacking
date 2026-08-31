'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  computeBlendedGrade,
  pointsToLetter as gradePointsToLetter,
  downgradeOneLetter as gradeDowngradeOneLetter,
  type ScorecardPayload,
  type PortfolioLetterGrade,
} from '@/lib/portfolioHubGrade'
import ReturnLineChart from '@/components/ReturnLineChart'
import {
  type PortfolioChartPayload,
  type SyntheticModelingNote,
} from '@/lib/computePortfolioChart'
import {
  findSlugByYahooSymbol,
  grossExposureForChartProxy,
  resolveChartProxyLegs,
} from '@/lib/portfolioChartProxyLegs'
import {
  HEQL_CAD_FINANCING_RATE_ON_EXCESS_NOTIONAL_ANNUAL,
  HEQL_SYNTHETIC_ANNUAL_DRAG,
  HEQL_SYNTHETIC_LEVERAGE,
  HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG,
  NTSD_SYNTHETIC_ANNUAL_DRAG,
  STACKED_PRODUCT_PROXY_ANNUAL_BORROW_PER_OVERLAY_SLICE,
} from '@/lib/syntheticChartConstants'
import type { PortfolioUsEtfHubBase } from '@/lib/portfolioProxyEtfNav'
import { getPortfolioProxyEtfNav } from '@/lib/portfolioProxyEtfNav'
import styles from './PresetPortfolioChart.module.css'

function formatCalendarDate(isoYmd: string): string {
  const parts = isoYmd.split('-')
  if (parts.length !== 3) return isoYmd
  const y = Number(parts[0])
  const m = Number(parts[1])
  const d = Number(parts[2])
  if (!y || !m || !d) return isoYmd
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function ProxyLink({
  ticker,
  hubBase,
  children,
}: {
  ticker: string
  hubBase: PortfolioUsEtfHubBase
  children: React.ReactNode
}) {
  const nav = getPortfolioProxyEtfNav(ticker, hubBase)
  if (!nav) return <>{children}</>
  if (nav.external) {
    return (
      <a href={nav.href} target="_blank" rel="noopener noreferrer" className={styles.proxyLink}>
        {children}
      </a>
    )
  }
  return (
    <Link href={nav.href} className={styles.proxyLink}>
      {children}
    </Link>
  )
}

function Cad125UnderlyingLine({
  underlying,
  hubBase,
}: {
  underlying: 'HEQT.TO' | 'ZQQ.TO' | 'VFV.TO' | 'SPY'
  hubBase: PortfolioUsEtfHubBase
}) {
  if (underlying === 'ZQQ.TO') {
    return (
      <>
        <ProxyLink ticker="ZQQ.TO" hubBase={hubBase}>
          ZQQ.TO
        </ProxyLink>{' '}
        daily total returns (BMO unhedged Nasdaq-100, CAD-listed, Yahoo adjusted)
      </>
    )
  }
  if (underlying === 'SPY') {
    return (
      <>
        <ProxyLink ticker="SPY" hubBase={hubBase}>
          SPY
        </ProxyLink>{' '}
        daily total returns (Yahoo adjusted, USD)
      </>
    )
  }
  return (
    <>
      <ProxyLink ticker={underlying} hubBase={hubBase}>
        {underlying}
      </ProxyLink>{' '}
      daily total returns (Yahoo adjusted, CAD-listed)
    </>
  )
}

function SyntheticModelingLine({
  m,
  hubBase,
}: {
  m: SyntheticModelingNote
  hubBase: PortfolioUsEtfHubBase
}) {
  const when = formatCalendarDate(m.firstRealNyDay)

  switch (m.kind) {
    case 'ntsd':
      return (
        <p key={`ntsd-${m.firstRealNyDay}`} className={styles.disclaimerDetail}>
          <ProxyLink ticker="NTSD" hubBase={hubBase}>
            NTSD
          </ProxyLink>
          : before {when}, NTSD is shown as a simulated daily blend (90%{' '}
          <ProxyLink ticker="SPY" hubBase={hubBase}>
            SPY
          </ProxyLink>{' '}
          + 60%{' '}
          <ProxyLink ticker="EFA" hubBase={hubBase}>
            EFA
          </ProxyLink>{' '}
          returns, minus ~{(NTSD_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(1)}% annual drag).
        </p>
      )
    case 'cad_levered_125': {
      const u = m.cadLeveredUnderlying ?? ('HEQT.TO' as const)
      return (
        <p key={`cad125-${m.slotSymbol}-${m.firstRealNyDay}`} className={styles.disclaimerDetail}>
          <ProxyLink ticker={m.slotSymbol} hubBase={hubBase}>
            {m.slotSymbol}
          </ProxyLink>
          : before {when},{' '}
          {m.slotSymbol} is modeled as {HEQL_SYNTHETIC_LEVERAGE}×{' '}
          <Cad125UnderlyingLine underlying={u} hubBase={hubBase} />, reinvesting at {HEQL_SYNTHETIC_LEVERAGE}×
          notional; financing ~{(HEQL_CAD_FINANCING_RATE_ON_EXCESS_NOTIONAL_ANNUAL * 100).toFixed(1)}%/yr on the
          extra 0.25× notional (Canadian-style wholesale carry), i.e. ~
          {(HEQL_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(2)}%/yr drag on NAV.
        </p>
      )
    }
    case 'ialt_flsp_dbmf':
      return (
        <p key={`ialt-${m.firstRealNyDay}`} className={styles.disclaimerDetail}>
          <ProxyLink ticker={m.slotSymbol} hubBase={hubBase}>
            {m.slotSymbol}
          </ProxyLink>
          : before {when},{' '}
          {m.slotSymbol} is proxied by 50%{' '}
          <ProxyLink ticker="FLSP" hubBase={hubBase}>
            FLSP
          </ProxyLink>{' '}
          and 50%{' '}
          <ProxyLink ticker="DBMF" hubBase={hubBase}>
            DBMF
          </ProxyLink>{' '}
          daily returns.
        </p>
      )
    case 'hfgm_asgm':
      return (
        <p key={`hfgm-${m.firstRealNyDay}`} className={styles.disclaimerDetail}>
          <ProxyLink ticker={m.slotSymbol} hubBase={hubBase}>
            {m.slotSymbol}
          </ProxyLink>
          : before {when},{' '}
          {m.slotSymbol} is proxied by 1.5×{' '}
          <ProxyLink ticker="ASGM" hubBase={hubBase}>
            ASGM
          </ProxyLink>{' '}
          daily returns, minus ~{(HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(1)}% annual drag.
        </p>
      )
    case 'dglm_dbmf':
      return (
        <p key={`dglm-${m.firstRealNyDay}`} className={styles.disclaimerDetail}>
          <ProxyLink ticker={m.slotSymbol} hubBase={hubBase}>
            {m.slotSymbol}
          </ProxyLink>
          : before {when},{' '}
          {m.slotSymbol} is proxied by{' '}
          <ProxyLink ticker="DBMF" hubBase={hubBase}>
            DBMF
          </ProxyLink>{' '}
          daily returns.
        </p>
      )
    case 'stacked_product_proxy':
    case 'stacked_product_proxy_preinception': {
      const legs = resolveChartProxyLegs(m.slotSymbol) ?? []
      const legText = legs.length ? legs.join(' × ') : 'listed proxies'
      const slug = findSlugByYahooSymbol(m.slotSymbol)
      const gross = grossExposureForChartProxy(m.slotSymbol, slug)
      const excessPct = Math.max(0, gross - 100)
      const spliced = m.stackedProxySpliced !== false
      const borrowNote =
        excessPct > 0 ? (
          <>
            {' '}
            Pre-inception path deducts ~{(STACKED_PRODUCT_PROXY_ANNUAL_BORROW_PER_OVERLAY_SLICE * 100).toFixed(0)}%/yr
            wholesale financing on {(excessPct / 100).toFixed(2)}× incremental notional (gross ~{gross.toFixed(0)}% vs
            100% cash).
          </>
        ) : null
      if (!spliced) {
        return (
          <p
            key={`stack-${m.kind}-${m.slotSymbol}-${m.firstRealNyDay}`}
            className={styles.disclaimerDetail}
          >
            <ProxyLink ticker={m.slotSymbol} hubBase={hubBase}>
              {m.slotSymbol}
            </ProxyLink>
            : methodology lists {legText} as Yahoo proxies for joint history before live listing when
            calendar overlap allows. In this chart&apos;s Yahoo range there was no separate pre-listing window to
            splice—line shows the fund&apos;s reported adjusted closes only.
          </p>
        )
      }
      return (
        <p
          key={`stack-${m.kind}-${m.slotSymbol}-${m.firstRealNyDay}`}
          className={styles.disclaimerDetail}
        >
          <ProxyLink ticker={m.slotSymbol} hubBase={hubBase}>
            {m.slotSymbol}
          </ProxyLink>
          : total-return path multiplies daily returns of {legText}.
          {borrowNote}
        </p>
      )
    }
    default:
      return null
  }
}

interface PresetPortfolioChartProps {
  payload: PortfolioChartPayload
  /** Replaces the default "Portfolio" label in metrics, legend, and chart tooltip. */
  portfolioLabel?: string
  /** `minimal`: single-line Yahoo / educational note. `none`: no footnotes or synthetic notes. */
  footnote?: 'default' | 'minimal' | 'none'
  /** When false, hides max drawdown columns (e.g. home teaser cards). */
  showMaxDrawdown?: boolean
  /** Optional weighted portfolio beta for scoring blocks (e.g. builder output). */
  weightedBeta?: number | null
  /** Show weighted letter scorecard (SPY baseline = B). */
  showScorecard?: boolean
  /** Optional modeled gross exposure summary shown under scorecard. */
  exposureSummary?: {
    grossLongEquityPct: number
    grossShortEquityPct: number
    grossAlphaExposurePct: number
  } | null
  holdings?: Array<{ ticker: string; weightPct: number }>
  /**
   * Both 1Y and MAX payloads for blended scorecard (50% 1Y + 50% MAX).
   * When provided, the overall grade uses the blend; sub-scores still show the active range.
   * If only one range has data, that range is weighted 100%.
   */
  scorecardPayloads?: { payload1y: ScorecardPayload; payloadMax: ScorecardPayload } | null
  /** Optional second portfolio payload to render as a third chart line. */
  comparisonPayload?: PortfolioChartPayload | null
  /** Label for the comparison portfolio line (default "Portfolio B"). */
  comparisonLabel?: string
  /** Weighted beta for the comparison portfolio's own scorecard. */
  comparisonWeightedBeta?: number | null
  /** Exposure summary for the comparison portfolio's own scorecard. */
  comparisonExposureSummary?: {
    grossLongEquityPct: number
    grossShortEquityPct: number
    grossAlphaExposurePct: number
  } | null
  /** Holdings for the comparison portfolio's own scorecard. */
  comparisonHoldings?: Array<{ ticker: string; weightPct: number }>
}

type LetterGrade = PortfolioLetterGrade

function pointsToLetter(points: number): LetterGrade {
  return gradePointsToLetter(points)
}

function downgradeOneLetter(grade: LetterGrade): LetterGrade {
  return gradeDowngradeOneLetter(grade)
}

/**
 * Relative return versus benchmark in percent:
 *   ((portfolioTR / benchmarkTR) - 1) * 100
 * Positive => earned more than benchmark; negative => earned less.
 * SPY baseline B around 0%, with A+ at +50% or better.
 */
function alphaPoints(alphaVsBenchmarkPct: number): number {
  if (alphaVsBenchmarkPct >= 50) return 5
  if (alphaVsBenchmarkPct >= 25) return 4
  if (alphaVsBenchmarkPct > 0) return 3
  if (alphaVsBenchmarkPct > -15) return 2
  if (alphaVsBenchmarkPct > -40) return 1
  return 0
}

/**
 * Relative max-drawdown versus benchmark in percent:
 *   ((|portfolioDD| / |benchmarkDD|) - 1) * 100
 * Positive => worse drawdown than benchmark; negative => better.
 * SPY baseline B around 0%, with D at +40% or worse.
 */
function drawdownPoints(drawdownVsBenchmarkPct: number): number {
  if (drawdownVsBenchmarkPct <= -40) return 5
  if (drawdownVsBenchmarkPct <= -20) return 4
  if (drawdownVsBenchmarkPct < 0) return 3
  if (drawdownVsBenchmarkPct < 15) return 2
  if (drawdownVsBenchmarkPct < 40) return 1
  return 0
}

function betaPoints(betaEdge: number): number {
  if (betaEdge >= 0.5) return 5
  if (betaEdge >= 0.2) return 4
  if (betaEdge >= 0) return 3
  if (betaEdge > -0.2) return 2
  if (betaEdge > -0.5) return 1
  return 0
}

function PortfolioMetricsAndScorecard({
  payload,
  portfolioLabel,
  showMaxDrawdown,
  weightedBeta,
  showScorecard,
  exposureSummary,
  holdings,
  scorecardPayloads,
  asOfMs,
}: {
  payload: PortfolioChartPayload
  portfolioLabel: string
  showMaxDrawdown: boolean
  weightedBeta: number | null
  showScorecard: boolean
  exposureSummary: {
    grossLongEquityPct: number
    grossShortEquityPct: number
    grossAlphaExposurePct: number
  } | null
  holdings: Array<{ ticker: string; weightPct: number }>
  scorecardPayloads: { payload1y: ScorecardPayload; payloadMax: ScorecardPayload } | null
  asOfMs: number
}) {
  const {
    totalReturnPercent,
    benchmarkTotalReturnPercent,
    excessAlphaPercent: excessAlphaFromPayload = null,
    maxDrawdownPortfolioPercent = null,
    maxDrawdownBenchmarkPercent = null,
    benchmarkSymbol,
    limitingFirstTradeDate,
    sharpeRatio: payloadSharpeRatio = null,
    sortinoRatio: payloadSortinoRatio = null,
  } = payload

  const sharpeRatio = payloadSharpeRatio
  const sortinoRatio = payloadSortinoRatio

  const trClass =
    totalReturnPercent == null
      ? ''
      : totalReturnPercent >= 0
        ? styles.metricBigPos
        : styles.metricBigNeg

  const benchClass =
    benchmarkTotalReturnPercent == null
      ? ''
      : benchmarkTotalReturnPercent >= 0
        ? styles.metricBigPos
        : styles.metricBigNeg

  const ddPortClass =
    maxDrawdownPortfolioPercent == null
      ? ''
      : maxDrawdownPortfolioPercent < 0
        ? styles.metricBigNeg
        : ''
  const ddBenchClass =
    maxDrawdownBenchmarkPercent == null
      ? ''
      : maxDrawdownBenchmarkPercent < 0
        ? styles.metricBigNeg
        : ''

  const excessAlphaPercent =
    excessAlphaFromPayload ??
    (totalReturnPercent != null && benchmarkTotalReturnPercent != null
      ? totalReturnPercent - benchmarkTotalReturnPercent
      : null)

  const alphaClass =
    excessAlphaPercent == null
      ? ''
      : excessAlphaPercent >= 0
        ? styles.metricBigPos
        : styles.metricBigNeg

  const alphaEdge =
    totalReturnPercent != null &&
    benchmarkTotalReturnPercent != null &&
    Math.abs(benchmarkTotalReturnPercent) > 0
      ? ((totalReturnPercent / benchmarkTotalReturnPercent - 1) * 100)
      : null
  const drawdownEdge =
    maxDrawdownPortfolioPercent != null &&
    maxDrawdownBenchmarkPercent != null &&
    Math.abs(maxDrawdownBenchmarkPercent) > 0
      ? ((Math.abs(maxDrawdownPortfolioPercent) / Math.abs(maxDrawdownBenchmarkPercent) - 1) * 100)
      : null
  const betaEdge = weightedBeta != null ? 1 - weightedBeta : null

  const underOneYear = (() => {
    if (!limitingFirstTradeDate) return false
    const ts = Date.parse(`${limitingFirstTradeDate}T00:00:00Z`)
    if (!Number.isFinite(ts)) return false
    const days = (asOfMs - ts) / (1000 * 60 * 60 * 24)
    return days < 365
  })()

  // When blended payloads are available, blend the sub-scores too so everything is consistent.
  const blendEdge = (
    get1y: (p: ScorecardPayload) => number | null,
    getMax: (p: ScorecardPayload) => number | null,
  ): number | null => {
    if (scorecardPayloads == null) return null
    const v1y = get1y(scorecardPayloads.payload1y)
    const vMax = getMax(scorecardPayloads.payloadMax)
    if (v1y != null && vMax != null) return v1y * 0.5 + vMax * 0.5
    return vMax ?? v1y ?? null
  }

  const edgeAlpha = (p: ScorecardPayload): number | null =>
    p.totalReturnPercent != null && p.benchmarkTotalReturnPercent != null && Math.abs(p.benchmarkTotalReturnPercent) > 0
      ? (p.totalReturnPercent / p.benchmarkTotalReturnPercent - 1) * 100
      : null

  const edgeDrawdown = (p: ScorecardPayload): number | null =>
    p.maxDrawdownPortfolioPercent != null && p.maxDrawdownBenchmarkPercent != null && Math.abs(p.maxDrawdownBenchmarkPercent) > 0
      ? (Math.abs(p.maxDrawdownPortfolioPercent) / Math.abs(p.maxDrawdownBenchmarkPercent) - 1) * 100
      : null

  const blendedAlphaEdge = blendEdge(edgeAlpha, edgeAlpha) ?? alphaEdge
  const blendedDrawdownEdge = blendEdge(edgeDrawdown, edgeDrawdown) ?? drawdownEdge

  const alphaGrade = blendedAlphaEdge != null ? pointsToLetter(alphaPoints(blendedAlphaEdge)) : null
  const drawdownGrade = blendedDrawdownEdge != null ? pointsToLetter(drawdownPoints(blendedDrawdownEdge)) : null
  const betaGrade = betaEdge != null ? pointsToLetter(betaPoints(betaEdge)) : null

  const weightedScore =
    blendedAlphaEdge != null && blendedDrawdownEdge != null && betaEdge != null
      ? alphaPoints(blendedAlphaEdge) * 0.5 + drawdownPoints(blendedDrawdownEdge) * 0.3 + betaPoints(betaEdge) * 0.2
      : null
  const rawOverallGrade = weightedScore != null ? pointsToLetter(weightedScore) : null
  const rangeOverallGrade =
    rawOverallGrade != null && underOneYear ? downgradeOneLetter(rawOverallGrade) : rawOverallGrade

  // Blended overall grade: 50% 1Y + 50% MAX when both payloads are available
  const overallGrade =
    scorecardPayloads != null && weightedBeta != null
      ? computeBlendedGrade(scorecardPayloads.payload1y, scorecardPayloads.payloadMax, weightedBeta)
      : rangeOverallGrade

  return (
    <>
      <div className={styles.metricsRow}>
        <div>
          <div className={`${styles.metricBig} ${trClass}`}>
            {totalReturnPercent != null
              ? `${totalReturnPercent >= 0 ? '+' : ''}${totalReturnPercent.toFixed(2)}%`
              : '—'}
          </div>
          <div className={styles.metricSub}>{portfolioLabel}</div>
        </div>
        <div>
          <div className={`${styles.metricBig} ${benchClass}`}>
            {benchmarkTotalReturnPercent != null
              ? `${benchmarkTotalReturnPercent >= 0 ? '+' : ''}${benchmarkTotalReturnPercent.toFixed(2)}%`
              : '—'}
          </div>
          <div className={styles.metricSub}>{benchmarkSymbol} (benchmark)</div>
        </div>
        <div>
          <div className={`${styles.metricBig} ${alphaClass}`}>
            {excessAlphaPercent != null
              ? `${excessAlphaPercent >= 0 ? '+' : ''}${excessAlphaPercent.toFixed(2)}%`
              : '—'}
          </div>
          <div className={styles.metricSub}>Excess α vs {benchmarkSymbol}</div>
        </div>
        {showMaxDrawdown ? (
          <>
            <div>
              <div className={`${styles.metricBig} ${ddPortClass}`}>
                {maxDrawdownPortfolioPercent != null
                  ? `${maxDrawdownPortfolioPercent.toFixed(2)}%`
                  : '—'}
              </div>
              <div className={styles.metricSub}>Max drawdown</div>
            </div>
            <div>
              <div className={`${styles.metricBig} ${ddBenchClass}`}>
                {maxDrawdownBenchmarkPercent != null
                  ? `${maxDrawdownBenchmarkPercent.toFixed(2)}%`
                  : '—'}
              </div>
              <div className={styles.metricSub}>{benchmarkSymbol} max DD</div>
            </div>
          </>
        ) : null}
        <div className={styles.metricTooltipHost} tabIndex={0}>
          <div className={`${styles.metricBig} ${sharpeRatio != null && sharpeRatio >= 0 ? styles.metricBigPos : sharpeRatio != null ? styles.metricBigNeg : ''}`}>
            {sharpeRatio != null ? sharpeRatio.toFixed(2) : '—'}
          </div>
          <div className={styles.metricSub}>Sharpe</div>
          <span className={styles.metricTooltip} role="tooltip">
            Excess return above the 4.5% risk-free rate divided by annualised volatility.{'\n'}Above 1.0 is good; above 2.0 is excellent.{'\n'}SPY typically scores around 0.5–0.8.
          </span>
        </div>
        <div className={styles.metricTooltipHost} tabIndex={0}>
          <div className={`${styles.metricBig} ${sortinoRatio != null && sortinoRatio >= 0 ? styles.metricBigPos : sortinoRatio != null ? styles.metricBigNeg : ''}`}>
            {sortinoRatio != null ? sortinoRatio.toFixed(2) : '—'}
          </div>
          <div className={styles.metricSub}>Sortino</div>
          <span className={styles.metricTooltip} role="tooltip">
            Excess return above the 4.5% risk-free rate divided by annualised downside deviation (penalises losses only).{'\n'}Above 1.5 is good; above 3.0 is excellent.
          </span>
        </div>
      </div>
      {showScorecard ? (
        <div className={styles.scorecard}>
          <div className={styles.scorecardCols}>
            <div>
              <div className={styles.scorecardHeader}>
                <strong>Portfolio score:</strong> {overallGrade ?? '—'}
              </div>
              {overallGrade != null && underOneYear ? (
                <p className={styles.scorecardLine}>
                  <strong>Adjustment:</strong> Portfolio history is under 1 year, so the overall score is
                  downgraded by one letter.
                </p>
              ) : null}
              <p className={styles.scorecardLine}>
                <strong>Alpha score:</strong> {alphaGrade ?? '—'}
              </p>
              <p className={styles.scorecardLine}>
                <strong>Max DD score:</strong> {drawdownGrade ?? '—'}
              </p>
              <p className={styles.scorecardLine}>
                <strong>Beta score:</strong> {betaGrade ?? '—'}
              </p>
              <p className={styles.scorecardLine}>
                <strong>Beta:</strong> {weightedBeta != null ? weightedBeta.toFixed(2) : '—'}
              </p>
            </div>
            <div>
              <div className={styles.scorecardHeader}>
                <strong>Net leverage:</strong>
              </div>
              {exposureSummary ? (
                <>
                  <p className={styles.scorecardLine}>
                    <strong>Total:</strong>{' '}
                    {(
                      exposureSummary.grossLongEquityPct -
                      exposureSummary.grossShortEquityPct +
                      exposureSummary.grossAlphaExposurePct
                    ).toFixed(1)}
                    %
                  </p>
                  <p className={styles.scorecardLine}>
                    <strong>Gross longs:</strong>{' '}
                    {exposureSummary.grossLongEquityPct.toFixed(1)}%
                  </p>
                  <p className={styles.scorecardLine}>
                    <strong>Gross shorts:</strong>{' '}
                    {exposureSummary.grossShortEquityPct.toFixed(1)}%
                  </p>
                  <p className={styles.scorecardLine}>
                    <strong>Gross alpha & alts:</strong>{' '}
                    {exposureSummary.grossAlphaExposurePct.toFixed(1)}%
                  </p>
                </>
              ) : (
                <p className={styles.scorecardLine}>Not available.</p>
              )}
            </div>
            <div>
              <div className={styles.scorecardHeader}>
                <strong>Portfolio weights:</strong>
              </div>
              {holdings.length > 0 ? (
                <div className={styles.makeupGrid}>
                  {holdings.map((h) => (
                    <p key={`${h.ticker}-${h.weightPct}`} className={styles.scorecardLine}>
                      <strong>{h.ticker}:</strong> {h.weightPct}%
                    </p>
                  ))}
                </div>
              ) : (
                <p className={styles.scorecardLine}>
                  Not available.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default function PresetPortfolioChart({
  payload,
  portfolioLabel = 'Portfolio',
  footnote = 'default',
  showMaxDrawdown = true,
  weightedBeta = null,
  showScorecard = false,
  exposureSummary = null,
  holdings = [],
  scorecardPayloads = null,
  comparisonPayload = null,
  comparisonLabel = 'Portfolio B',
  comparisonWeightedBeta = null,
  comparisonExposureSummary = null,
  comparisonHoldings = [],
}: PresetPortfolioChartProps) {
  const [asOfMs] = useState(() => Date.now())
  const pathname = usePathname()
  const hubBase: PortfolioUsEtfHubBase = useMemo(
    () => (pathname.startsWith('/ca') ? '/ca/us-etfs' : '/us-etfs'),
    [pathname]
  )

  const {
    values,
    benchmarkValues,
    timestamps,
    benchmarkSymbol,
    chartStartDate,
    limitingSymbol,
    limitingFirstTradeDate,
    syntheticModeling = [],
    chartCurrency = 'USD',
  } = payload

  const comparisonSeries: { values: number[]; color: string; label: string } | null =
    comparisonPayload &&
    comparisonPayload.values &&
    comparisonPayload.values.length >= 2 &&
    comparisonPayload.values.length === (comparisonPayload.timestamps ?? []).length
      ? { values: comparisonPayload.values, color: 'var(--color-green)', label: comparisonLabel }
      : null

  const chartSeries =
    values &&
    benchmarkValues &&
    timestamps &&
    values.length === benchmarkValues.length &&
    values.length === timestamps.length &&
    values.length >= 2
      ? [
          { values, color: 'var(--color-gold)', label: portfolioLabel },
          ...(comparisonSeries ? [comparisonSeries] : []),
          {
            values: benchmarkValues,
            color: 'var(--color-blue)',
            label: benchmarkSymbol,
          },
        ]
      : null

  if (!chartSeries || !chartStartDate || !limitingSymbol || !limitingFirstTradeDate) {
    return null
  }

  const limitingFootnote = (
    <>
      <ProxyLink ticker={limitingSymbol} hubBase={hubBase}>
        {limitingSymbol}
      </ProxyLink>
      {"'s inception date of "}
      {limitingFirstTradeDate} is limiting the backtest.
    </>
  )

  return (
    <div className={styles.chartBlock}>
      <PortfolioMetricsAndScorecard
        payload={payload}
        portfolioLabel={portfolioLabel}
        showMaxDrawdown={showMaxDrawdown}
        weightedBeta={weightedBeta}
        showScorecard={showScorecard}
        exposureSummary={exposureSummary}
        holdings={holdings}
        scorecardPayloads={scorecardPayloads}
        asOfMs={asOfMs}
      />
      <div className={styles.legendChartWrap}>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: 'var(--color-gold)' }} />
            {portfolioLabel}
          </span>
          {comparisonSeries ? (
            <span className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: 'var(--color-green)' }} />
              {comparisonLabel}
            </span>
          ) : null}
          <span className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: 'var(--color-blue)' }} />
            {benchmarkSymbol}
          </span>
        </div>
        <ReturnLineChart
          series={chartSeries}
          timestampsSec={timestamps}
          chartCurrency={chartCurrency}
        />
      </div>
      {comparisonPayload ? (
        <div className={styles.comparisonStats}>
          <div className={styles.comparisonStatsDivider} aria-hidden="true" />
          <PortfolioMetricsAndScorecard
            payload={comparisonPayload}
            portfolioLabel={comparisonLabel}
            showMaxDrawdown={showMaxDrawdown}
            weightedBeta={comparisonWeightedBeta}
            showScorecard={showScorecard}
            exposureSummary={comparisonExposureSummary}
            holdings={comparisonHoldings}
            scorecardPayloads={null}
            asOfMs={asOfMs}
          />
        </div>
      ) : null}
      {footnote !== 'none' ? (
        <div className={styles.chartFootnotes}>
          <div className={styles.chartDisclaimerRow}>
            <span className={styles.footnoteMark} aria-hidden="true">
              *
            </span>
            <div className={styles.footnoteBody}>
              {footnote === 'minimal' ? (
                <p className={styles.disclaimerLead}>
                  <strong>Total return</strong> series: Yahoo Finance <strong>adjusted close</strong> (cash
                  distributions and splits reflected per Yahoo’s methodology), common U.S. sessions, $10k at
                  first overlap—not fund NAV, not tax-adjusted. Educational only — not investment advice.
                  Past performance does not predict future results.
                </p>
              ) : (
                <p className={styles.disclaimerLead}>
                  Educational model only — not investment advice. Portfolio betas in the holdings table are
                  weighted to the listed names and weights.
                </p>
              )}
              {syntheticModeling.map((m) => (
                <SyntheticModelingLine
                  key={`${m.kind}-${m.slotSymbol}-${m.firstRealNyDay}`}
                  m={m}
                  hubBase={hubBase}
                />
              ))}
              <p className={styles.disclaimerDetail}>{limitingFootnote}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
