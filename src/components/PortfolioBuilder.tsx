'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import ReturnLineChart from './ReturnLineChart'
import styles from './PortfolioBuilder.module.css'

type Range = '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | 'ytd' | 'max'

const RANGES: { label: string; value: Range }[] = [
  { label: '1M', value: '1mo' },
  { label: '3M', value: '3mo' },
  { label: '6M', value: '6mo' },
  { label: '1Y', value: '1y' },
  { label: '2Y', value: '2y' },
  { label: '5Y', value: '5y' },
  { label: 'YTD', value: 'ytd' },
  { label: 'Max', value: 'max' },
]

/** Example: five names at 20% each; SPY is shown as a separate benchmark line */
const DEFAULT_SYMBOLS = 'SSO MATE ORR RSSY FLSP'
const DEFAULT_WEIGHTS = '20,20,20,20,20'

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

export default function PortfolioBuilder() {
  const [symbolsInput, setSymbolsInput] = useState(DEFAULT_SYMBOLS)
  const [weightsInput, setWeightsInput] = useState(DEFAULT_WEIGHTS)
  const [range, setRange] = useState<Range>('1y')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<number[] | null>(null)
  const [benchmarkValues, setBenchmarkValues] = useState<number[] | null>(null)
  const [totalReturn, setTotalReturn] = useState<number | null>(null)
  const [benchmarkReturn, setBenchmarkReturn] = useState<number | null>(null)
  const [asOf, setAsOf] = useState<string | null>(null)
  const [chartTimestamps, setChartTimestamps] = useState<number[] | null>(null)
  const [chartStartDate, setChartStartDate] = useState<string | null>(null)
  const [limitingSymbol, setLimitingSymbol] = useState<string | null>(null)
  const [limitingFirstTradeDate, setLimitingFirstTradeDate] = useState<string | null>(null)
  const [resolved, setResolved] = useState<{ symbols: string[]; weights: number[] } | null>(
    null
  )

  const queryUrl = useMemo(() => {
    const symbols = symbolsInput
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .join(',')
    const params = new URLSearchParams({ symbols, range })
    const w = weightsInput.trim()
    if (w) params.set('weights', w.replace(/\s+/g, ','))
    return `/api/portfolio-chart?${params.toString()}`
  }, [symbolsInput, weightsInput, range])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(queryUrl)
      const data = (await res.json()) as {
        error?: string
        values?: number[]
        benchmarkValues?: number[]
        timestamps?: number[]
        totalReturnPercent?: number | null
        benchmarkTotalReturnPercent?: number | null
        chartStartDate?: string | null
        limitingSymbol?: string | null
        limitingFirstTradeDate?: string | null
        asOf?: string | null
        symbols?: string[]
        weights?: number[]
      }
      if (!res.ok) {
        setValues(null)
        setBenchmarkValues(null)
        setTotalReturn(null)
        setBenchmarkReturn(null)
        setAsOf(null)
        setChartTimestamps(null)
        setChartStartDate(null)
        setLimitingSymbol(null)
        setLimitingFirstTradeDate(null)
        setResolved(null)
        setError(data.error || 'Request failed')
        return
      }
      setValues(data.values ?? null)
      setBenchmarkValues(data.benchmarkValues ?? null)
      setChartTimestamps(data.timestamps ?? null)
      setChartStartDate(data.chartStartDate ?? null)
      setLimitingSymbol(data.limitingSymbol ?? null)
      setLimitingFirstTradeDate(data.limitingFirstTradeDate ?? null)
      setTotalReturn(data.totalReturnPercent ?? null)
      setBenchmarkReturn(data.benchmarkTotalReturnPercent ?? null)
      setAsOf(data.asOf ?? null)
      if (data.symbols && data.weights) {
        setResolved({ symbols: data.symbols, weights: data.weights })
      } else {
        setResolved(null)
      }
    } catch {
      setError('Could not load data.')
      setValues(null)
      setBenchmarkValues(null)
      setTotalReturn(null)
      setBenchmarkReturn(null)
      setAsOf(null)
      setChartTimestamps(null)
      setChartStartDate(null)
      setLimitingSymbol(null)
      setLimitingFirstTradeDate(null)
      setResolved(null)
    } finally {
      setLoading(false)
    }
  }, [queryUrl])

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial fetch only
  }, [])

  const trClass =
    totalReturn == null
      ? ''
      : totalReturn >= 0
        ? styles.metricBigPos
        : styles.metricBigNeg

  const benchClass =
    benchmarkReturn == null
      ? ''
      : benchmarkReturn >= 0
        ? styles.metricBigPos
        : styles.metricBigNeg

  const chartSeries =
    values &&
    benchmarkValues &&
    chartTimestamps &&
    values.length === benchmarkValues.length &&
    values.length === chartTimestamps.length &&
    values.length >= 2
      ? [
          { values, color: 'var(--color-gold)', label: 'Portfolio' },
          { values: benchmarkValues, color: 'var(--color-blue)', label: 'SPY' },
        ]
      : null

  return (
    <div className={styles.builder}>
      <div className={styles.builderLabel}>Portfolio chart</div>
      <h3 className={styles.builderTitle}>Weighted total return (daily EOD)</h3>
      <p className={styles.builderHint}>
        Enter tickers and optional weights. Values use Yahoo Finance{' '}
        <strong style={{ fontWeight: 500 }}>adjusted</strong> daily closes (total return), aligned
        on common trading days. The series starts when <em>every</em> holding has begun trading
        (set by the <strong style={{ fontWeight: 500 }}>most recently listed</strong> name in your
        basket). A second line shows <strong style={{ fontWeight: 500 }}>SPY</strong> on the same
        dates. Hover the chart to see each session&apos;s date and level. When markets are open, the
        latest point is usually the prior session&apos;s close.
      </p>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="pf-symbols">
            Symbols
          </label>
          <input
            id="pf-symbols"
            className={`${styles.input} ${styles.inputSymbols}`}
            value={symbolsInput}
            onChange={(e) => setSymbolsInput(e.target.value)}
            placeholder="e.g. SSO MATE ORR FLSP"
            spellCheck={false}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="pf-weights">
            Weights (optional)
          </label>
          <input
            id="pf-weights"
            className={styles.input}
            style={{ width: '11rem' }}
            value={weightsInput}
            onChange={(e) => setWeightsInput(e.target.value)}
            placeholder="e.g. 20,20,20,20"
            spellCheck={false}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="pf-range">
            Range
          </label>
          <select
            id="pf-range"
            className={styles.select}
            value={range}
            onChange={(e) => setRange(e.target.value as Range)}
          >
            {RANGES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className={styles.btn} onClick={() => void load()} disabled={loading}>
          {loading ? 'Loading…' : 'Update chart'}
        </button>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}

      {chartSeries && chartTimestamps ? (
        <div className={styles.chartBlock}>
          <div className={styles.metricsRow}>
            <div>
              <div className={`${styles.metricBig} ${trClass}`}>
                {totalReturn != null
                  ? `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}%`
                  : '—'}
              </div>
              <div className={styles.metricSub}>Portfolio</div>
            </div>
            <div>
              <div className={`${styles.metricBig} ${benchClass}`}>
                {benchmarkReturn != null
                  ? `${benchmarkReturn >= 0 ? '+' : ''}${benchmarkReturn.toFixed(2)}%`
                  : '—'}
              </div>
              <div className={styles.metricSub}>SPY (benchmark)</div>
            </div>
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: 'var(--color-gold)' }} />
              Portfolio
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: 'var(--color-blue)' }} />
              SPY
            </span>
          </div>
          {chartStartDate && limitingSymbol && limitingFirstTradeDate ? (
            <p className={styles.chartMeta}>
              <strong>From {formatCalendarDate(chartStartDate)}</strong>
              {' — '}
              history begins once all holdings overlap; the newest listing is{' '}
              <strong>{limitingSymbol}</strong> (inception {formatCalendarDate(limitingFirstTradeDate)}
              ).
            </p>
          ) : null}
          <ReturnLineChart series={chartSeries} timestampsSec={chartTimestamps} height={140} />
          {asOf ? (
            <p className={styles.asOf}>Last daily point: {asOf} (exchange date)</p>
          ) : null}
          {resolved ? (
            <p className={styles.weightsNote}>
              {resolved.symbols.map((s, i) => (
                <span key={s + i}>
                  {s} {(resolved.weights[i]! * 100).toFixed(1)}%
                  {i < resolved.symbols.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
