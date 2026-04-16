'use client'

import ReturnLineChart from '@/components/ReturnLineChart'
import type { PortfolioChartPayload, SyntheticModelingNote } from '@/lib/computePortfolioChart'
import {
  HEQL_CAD_FINANCING_RATE_ON_EXCESS_NOTIONAL_ANNUAL,
  HEQL_SYNTHETIC_ANNUAL_DRAG,
  HEQL_SYNTHETIC_LEVERAGE,
  NTSD_SYNTHETIC_ANNUAL_DRAG,
} from '@/lib/syntheticChartConstants'
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

function cad125Body(
  slotSymbol: string,
  when: string,
  underlying: 'HEQT.TO' | 'QQQ' | 'VFV.TO' | 'SPY'
): string {
  const tr =
    underlying === 'QQQ'
      ? `${underlying} daily total returns (Yahoo adjusted), converted to CAD with NY-aligned USDCAD`
      : underlying === 'SPY'
        ? `${underlying} daily total returns (Yahoo adjusted, USD)`
        : `${underlying} daily total returns (Yahoo adjusted, CAD-listed)`
  return `before ${when}, ${slotSymbol} is modeled as ${HEQL_SYNTHETIC_LEVERAGE}× ${tr}, reinvesting at ${HEQL_SYNTHETIC_LEVERAGE}× notional; financing ~${(HEQL_CAD_FINANCING_RATE_ON_EXCESS_NOTIONAL_ANNUAL * 100).toFixed(1)}%/yr on the extra 0.25× notional (Canadian-style wholesale carry), i.e. ~${(HEQL_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(2)}%/yr drag on NAV; then actual ${slotSymbol} closes. Simulated.`
}

function syntheticModelingCopy(m: SyntheticModelingNote): { title: string; body: string } {
  const when = formatCalendarDate(m.firstRealNyDay)
  switch (m.kind) {
    case 'ntsd':
      return {
        title: 'NTSD (modeled segment)',
        body: `before ${when}, NTSD is shown as a simulated daily blend (90% SPY + 60% EFA returns, minus ~${(NTSD_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(1)}% annual drag), then actual NTSD closes. Not published NAV history.`,
      }
    case 'cad_levered_125': {
      const u = m.cadLeveredUnderlying ?? 'HEQT.TO'
      return {
        title: `${m.slotSymbol} (modeled segment)`,
        body: cad125Body(m.slotSymbol, when, u),
      }
    }
    case 'mate_rsst':
      return {
        title: 'MATE (modeled segment)',
        body: `before ${when}, MATE is proxied by RSST daily returns, then actual MATE closes. RSST is a rough SPY-stack analogue, not MATE NAV history.`,
      }
  }
}

interface PresetPortfolioChartProps {
  payload: PortfolioChartPayload
}

export default function PresetPortfolioChart({ payload }: PresetPortfolioChartProps) {
  const {
    values,
    benchmarkValues,
    timestamps,
    totalReturnPercent,
    benchmarkTotalReturnPercent,
    excessAlphaPercent: excessAlphaFromPayload = null,
    maxDrawdownPortfolioPercent = null,
    maxDrawdownBenchmarkPercent = null,
    benchmarkSymbol,
    chartStartDate,
    limitingSymbol,
    limitingFirstTradeDate,
    syntheticModeling = [],
    chartCurrency = 'USD',
  } = payload

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

  const chartSeries =
    values &&
    benchmarkValues &&
    timestamps &&
    values.length === benchmarkValues.length &&
    values.length === timestamps.length &&
    values.length >= 2
      ? [
          { values, color: 'var(--color-gold)', label: 'Portfolio' },
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

  return (
    <div className={styles.chartBlock}>
      <div className={styles.metricsRow}>
        <div>
          <div className={`${styles.metricBig} ${trClass}`}>
            {totalReturnPercent != null
              ? `${totalReturnPercent >= 0 ? '+' : ''}${totalReturnPercent.toFixed(2)}%`
              : '—'}
          </div>
          <div className={styles.metricSub}>Portfolio</div>
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
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ background: 'var(--color-gold)' }} />
          Portfolio
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ background: 'var(--color-blue)' }} />
          {benchmarkSymbol}
        </span>
      </div>
      <ReturnLineChart
        series={chartSeries}
        timestampsSec={timestamps}
        height={140}
        chartCurrency={chartCurrency}
      />
      <div className={styles.chartFootnotes}>
        <div className={styles.chartDisclaimerRow}>
          <span className={styles.footnoteMark} aria-hidden="true">
            *
          </span>
          <div className={styles.footnoteBody}>
            <p className={styles.disclaimerLead}>
              Educational model only — not investment advice. Portfolio betas in the holdings table
              are weighted to the listed names and weights; they are intended to be accurate to that
              model and may be updated if holdings, listings, or methodology change.
            </p>
            {syntheticModeling.map((m) => {
              const { title, body } = syntheticModelingCopy(m)
              if (!body) return null
              return (
                <p key={`${m.kind}-${m.slotSymbol}`} className={styles.disclaimerDetail}>
                  <strong>{title}:</strong> {body}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
