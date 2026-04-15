'use client'

import ReturnLineChart from '@/components/ReturnLineChart'
import type {
  PortfolioChartPayload,
  SyntheticModelingKind,
} from '@/lib/computePortfolioChart'
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

function syntheticModelingCopy(
  kind: SyntheticModelingKind,
  firstRealNyDay: string
): { title: string; body: string } {
  const when = formatCalendarDate(firstRealNyDay)
  switch (kind) {
    case 'ntsd':
      return {
        title: 'NTSD (modeled segment)',
        body: `before ${when}, NTSD is shown as a hypothetical daily blend (90% SPY + 60% EFA returns, minus ~${(NTSD_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(1)}% annual drag), then actual NTSD closes. Not published NAV history.`,
      }
    case 'heql_heqt':
      return {
        title: 'HEQL.TO (modeled segment)',
        body: `before ${when}, HEQL.TO is ${HEQL_SYNTHETIC_LEVERAGE}× HEQT.TO daily total returns (Yahoo adjusted), minus ~${(HEQL_SYNTHETIC_ANNUAL_DRAG * 100).toFixed(2)}%/yr on NAV (~${(HEQL_CAD_FINANCING_RATE_ON_EXCESS_NOTIONAL_ANNUAL * 100).toFixed(1)}%/yr on the extra 0.25× notional — Canadian-style wholesale carry), then actual HEQL.TO closes. Hypothetical only.`,
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
  /** Show resolved weight % line (e.g. from interactive builder) */
  showWeightsSummary?: boolean
}

export default function PresetPortfolioChart({
  payload,
  showWeightsSummary = false,
}: PresetPortfolioChartProps) {
  const {
    values,
    benchmarkValues,
    timestamps,
    totalReturnPercent,
    benchmarkTotalReturnPercent,
    maxDrawdownPortfolioPercent = null,
    maxDrawdownBenchmarkPercent = null,
    benchmarkSymbol,
    chartStartDate,
    limitingSymbol,
    limitingFirstTradeDate,
    asOf,
    symbols,
    weights,
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
      <p className={styles.chartMeta}>
        <strong>From {formatCalendarDate(chartStartDate)}</strong>
        {' — '}
        history begins once all holdings overlap; the newest listing is{' '}
        <strong>{limitingSymbol}</strong> (inception {formatCalendarDate(limitingFirstTradeDate)}).
      </p>
      {syntheticModeling.map((m) => {
        const { title, body } = syntheticModelingCopy(m.kind, m.firstRealNyDay)
        if (!body) return null
        return (
          <p key={`${m.kind}-${m.slotSymbol}`} className={styles.chartMeta}>
            <strong>{title}:</strong> {body}
          </p>
        )
      })}
      <ReturnLineChart
        series={chartSeries}
        timestampsSec={timestamps}
        height={140}
        chartCurrency={chartCurrency}
      />
      {asOf ? <p className={styles.asOf}>Last daily point: {asOf} (exchange date)</p> : null}
      {showWeightsSummary ? (
        <p className={styles.weightsNote}>
          {symbols.map((s, i) => (
            <span key={s + i}>
              {s} {(weights[i]! * 100).toFixed(1)}%
              {i < symbols.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  )
}
