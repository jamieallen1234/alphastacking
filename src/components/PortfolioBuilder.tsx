'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import PresetPortfolioChart from './PresetPortfolioChart'
import styles from './PortfolioBuilder.module.css'
import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'

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
  const [maxDdPortfolio, setMaxDdPortfolio] = useState<number | null>(null)
  const [maxDdBenchmark, setMaxDdBenchmark] = useState<number | null>(null)
  const [asOf, setAsOf] = useState<string | null>(null)
  const [chartTimestamps, setChartTimestamps] = useState<number[] | null>(null)
  const [chartStartDate, setChartStartDate] = useState<string | null>(null)
  const [limitingSymbol, setLimitingSymbol] = useState<string | null>(null)
  const [limitingFirstTradeDate, setLimitingFirstTradeDate] = useState<string | null>(null)
  const [benchmarkSymbol, setBenchmarkSymbol] = useState<string>('SPY')
  const [syntheticModeling, setSyntheticModeling] = useState<
    PortfolioChartPayload['syntheticModeling']
  >([])
  const [chartCurrency, setChartCurrency] = useState<NonNullable<PortfolioChartPayload['chartCurrency']>>(
    'USD'
  )
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
        excessAlphaPercent?: number | null
        maxDrawdownPortfolioPercent?: number | null
        maxDrawdownBenchmarkPercent?: number | null
        benchmarkSymbol?: string
        chartStartDate?: string | null
        limitingSymbol?: string | null
        limitingFirstTradeDate?: string | null
        asOf?: string | null
        symbols?: string[]
        weights?: number[]
        range?: string
        syntheticModeling?: PortfolioChartPayload['syntheticModeling']
        chartCurrency?: PortfolioChartPayload['chartCurrency']
      }
      if (!res.ok) {
        setValues(null)
        setBenchmarkValues(null)
        setTotalReturn(null)
        setBenchmarkReturn(null)
        setMaxDdPortfolio(null)
        setMaxDdBenchmark(null)
        setAsOf(null)
        setChartTimestamps(null)
        setChartStartDate(null)
        setLimitingSymbol(null)
        setLimitingFirstTradeDate(null)
        setBenchmarkSymbol('SPY')
        setSyntheticModeling([])
        setChartCurrency('USD')
        setResolved(null)
        setError(data.error || 'Request failed')
        return
      }
      setBenchmarkSymbol(data.benchmarkSymbol ?? 'SPY')
      setValues(data.values ?? null)
      setBenchmarkValues(data.benchmarkValues ?? null)
      setChartTimestamps(data.timestamps ?? null)
      setChartStartDate(data.chartStartDate ?? null)
      setLimitingSymbol(data.limitingSymbol ?? null)
      setLimitingFirstTradeDate(data.limitingFirstTradeDate ?? null)
      setSyntheticModeling(data.syntheticModeling ?? [])
      setChartCurrency(data.chartCurrency ?? 'USD')
      setTotalReturn(data.totalReturnPercent ?? null)
      setBenchmarkReturn(data.benchmarkTotalReturnPercent ?? null)
      setMaxDdPortfolio(data.maxDrawdownPortfolioPercent ?? null)
      setMaxDdBenchmark(data.maxDrawdownBenchmarkPercent ?? null)
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
      setMaxDdPortfolio(null)
      setMaxDdBenchmark(null)
      setAsOf(null)
      setChartTimestamps(null)
      setChartStartDate(null)
      setLimitingSymbol(null)
      setLimitingFirstTradeDate(null)
      setBenchmarkSymbol('SPY')
      setSyntheticModeling([])
      setChartCurrency('USD')
      setResolved(null)
    } finally {
      setLoading(false)
    }
  }, [queryUrl])

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial fetch only
  }, [])

  const chartPayload: PortfolioChartPayload | null =
    values &&
    benchmarkValues &&
    chartTimestamps &&
    resolved &&
    chartStartDate &&
    limitingSymbol &&
    limitingFirstTradeDate &&
    values.length === benchmarkValues.length &&
    values.length === chartTimestamps.length &&
    values.length >= 2
      ? {
          symbols: resolved.symbols,
          weights: resolved.weights,
          range: range as PortfolioChartPayload['range'],
          timestamps: chartTimestamps,
          values,
          totalReturnPercent: totalReturn,
          benchmarkSymbol,
          benchmarkValues,
          benchmarkTotalReturnPercent: benchmarkReturn,
          excessAlphaPercent:
            totalReturn != null && benchmarkReturn != null
              ? totalReturn - benchmarkReturn
              : null,
          maxDrawdownPortfolioPercent: maxDdPortfolio,
          maxDrawdownBenchmarkPercent: maxDdBenchmark,
          limitingSymbol,
          limitingFirstTradeDate,
          chartStartDate,
          asOf,
          syntheticModeling,
          chartCurrency,
          rebalanceSchedule: 'none',
        }
      : null

  return (
    <div className={styles.builder}>
      <div className={styles.builderLabel}>Portfolio chart</div>
      <h3 className={styles.builderTitle}>Weighted total return (daily EOD)</h3>

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

      {chartPayload ? <PresetPortfolioChart payload={chartPayload} /> : null}
    </div>
  )
}
