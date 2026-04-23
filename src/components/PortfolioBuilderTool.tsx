'use client'

import { useCallback, useMemo, useState } from 'react'
import PresetPortfolioChart from '@/components/PresetPortfolioChart'
import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import {
  availablePresetChartRanges,
  overlapCalendarDaysForPresetUi,
  PRESET_RANGE_MIN_DAYS,
} from '@/lib/presetChartRanges'
import type { PortfolioBuilderEtfOption } from '@/lib/portfolioBuilderEtfOptions'
import type { YahooRange } from '@/lib/yahooFinance'
import styles from './PortfolioBuilderTool.module.css'

type EfficiencyKind = 'capital' | 'alpha'
type BuilderEdition = 'us' | 'ca'

type BuilderRow = {
  id: string
  allocation: string
  efficiencyKind: EfficiencyKind
  symbol: string
}

const MAX_ROWS = 20
const GRADE_RANK: Record<string, number> = { 'A+': 0, A: 1, 'B+': 2, B: 3, C: 4, D: 5 }

function newRow(id: number): BuilderRow {
  return {
    id: `row-${id}`,
    allocation: '',
    efficiencyKind: 'capital',
    symbol: '',
  }
}

function parseAllocation(v: string): number | null {
  if (!v.trim()) return null
  const n = Number(v)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

function gradeSortKey(g: PortfolioBuilderEtfOption['capitalGrade']): number {
  if (g == null) return 99
  return GRADE_RANK[g] ?? 99
}

function rowEligibleOptions(options: PortfolioBuilderEtfOption[], row: BuilderRow): PortfolioBuilderEtfOption[] {
  const eligible = options.filter((o) =>
    row.efficiencyKind === 'capital' ? o.capitalEligible : o.alphaEligible
  )
  return eligible.sort((a, b) => {
    const ag = row.efficiencyKind === 'capital' ? a.capitalGrade : a.alphaGrade
    const bg = row.efficiencyKind === 'capital' ? b.capitalGrade : b.alphaGrade
    const r = gradeSortKey(ag) - gradeSortKey(bg)
    if (r !== 0) return r
    return a.displayTicker.localeCompare(b.displayTicker)
  })
}

export default function PortfolioBuilderTool({
  edition,
  options,
}: {
  edition: BuilderEdition
  options: PortfolioBuilderEtfOption[]
}) {
  const [rows, setRows] = useState<BuilderRow[]>([newRow(1)])
  const [nextId, setNextId] = useState(2)
  const [payload, setPayload] = useState<PortfolioChartPayload | null>(null)
  const [activeRange, setActiveRange] = useState<YahooRange>('1y')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalAllocation = useMemo(
    () =>
      rows.reduce((sum, r) => {
        const n = parseAllocation(r.allocation)
        return n == null ? sum : sum + n
      }, 0),
    [rows]
  )
  const hasIncompleteRow = useMemo(
    () =>
      rows.some((r) => {
        const alloc = parseAllocation(r.allocation)
        return alloc == null || alloc <= 0 || !r.symbol
      }),
    [rows]
  )
  const allocationValid = Math.abs(totalAllocation - 100) < 0.0001
  const canGenerate = !hasIncompleteRow && allocationValid && rows.length > 0 && !loading

  const overlapDays = useMemo(
    () =>
      payload?.limitingFirstTradeDate
        ? overlapCalendarDaysForPresetUi(payload.limitingFirstTradeDate)
        : 0,
    [payload?.limitingFirstTradeDate]
  )
  const rangeOptions = useMemo(() => availablePresetChartRanges(overlapDays), [overlapDays])

  const buildRequestBody = useCallback(
    (range: YahooRange) => ({
      edition,
      range,
      symbols: rows.map((r) => r.symbol),
      weights: rows.map((r) => (parseAllocation(r.allocation) ?? 0) / 100),
    }),
    [edition, rows]
  )

  const loadChart = useCallback(
    async (range: YahooRange) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/portfolio-builder-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
          body: JSON.stringify(buildRequestBody(range)),
        })
        const data = (await res.json()) as PortfolioChartPayload & { error?: string }
        if (!res.ok) {
          setError(data.error || 'Could not generate chart.')
          return
        }
        setPayload(data)
        setActiveRange(range)
      } catch {
        setError('Could not generate chart.')
      } finally {
        setLoading(false)
      }
    },
    [buildRequestBody]
  )

  const addRow = useCallback(() => {
    setRows((prev) => {
      if (prev.length >= MAX_ROWS) return prev
      return [...prev, newRow(nextId)]
    })
    setNextId((n) => n + 1)
  }, [nextId])

  const updateRow = useCallback((id: string, patch: Partial<BuilderRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }, [])

  const removeRow = useCallback((id: string) => {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)))
  }, [])

  const resetAll = useCallback(() => {
    setRows([newRow(1)])
    setNextId(2)
    setPayload(null)
    setError(null)
    setActiveRange('1y')
  }, [])

  return (
    <div className={styles.panel}>
      <div className={styles.topMeta}>
        <h2 className={styles.title}>Portfolio builder</h2>
        <span className={styles.subtle}>Temporary (not saved)</span>
      </div>

      <div className={styles.rowList}>
        {rows.map((row) => {
          const eligible = rowEligibleOptions(options, row)
          const isSymbolStillValid = row.symbol && eligible.some((o) => o.symbol === row.symbol)
          return (
            <div key={row.id} className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${row.id}-alloc`}>
                  % of portfolio
                </label>
                <input
                  id={`${row.id}-alloc`}
                  className={styles.input}
                  inputMode="decimal"
                  value={row.allocation}
                  onChange={(e) => updateRow(row.id, { allocation: e.target.value })}
                  placeholder="e.g. 15"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${row.id}-eff`}>
                  Efficiency
                </label>
                <select
                  id={`${row.id}-eff`}
                  className={styles.select}
                  value={row.efficiencyKind}
                  onChange={(e) => updateRow(row.id, { efficiencyKind: e.target.value as EfficiencyKind, symbol: '' })}
                >
                  <option value="capital">Capital</option>
                  <option value="alpha">Alpha</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${row.id}-symbol`}>
                  ETF ({row.efficiencyKind})
                </label>
                <select
                  id={`${row.id}-symbol`}
                  className={styles.select}
                  value={isSymbolStillValid ? row.symbol : ''}
                  onChange={(e) => updateRow(row.id, { symbol: e.target.value })}
                >
                  <option value="">{eligible.length ? 'Select ETF' : 'No eligible ETFs'}</option>
                  {eligible.map((o) => {
                    const grade = row.efficiencyKind === 'capital' ? o.capitalGrade : o.alphaGrade
                    const gradeLabel = grade ?? 'N/A'
                    return (
                      <option key={`${row.id}-${o.universe}-${o.symbol}`} value={o.symbol}>
                        {o.displayTicker} ({gradeLabel})
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className={styles.rowActions}>
                <button
                  type="button"
                  className={styles.btn}
                  disabled={rows.length <= 1}
                  onClick={() => removeRow(row.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.btn} onClick={addRow} disabled={rows.length >= MAX_ROWS}>
          Add row
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          disabled={!canGenerate}
          onClick={() => void loadChart(activeRange)}
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
        <button type="button" className={styles.btn} onClick={resetAll}>
          Reset
        </button>
      </div>

      <div className={styles.statusRow}>
        <span className={styles.statusItem}>Rows: {rows.length} / {MAX_ROWS}</span>
        <span className={`${styles.statusItem} ${allocationValid ? '' : styles.statusWarn}`}>
          Total allocation: {totalAllocation.toFixed(2)}%
        </span>
      </div>

      {!allocationValid ? (
        <p className={styles.error}>Allocation must total exactly 100% before generating.</p>
      ) : null}
      {hasIncompleteRow ? (
        <p className={styles.error}>Fill every row with a positive allocation and ETF selection.</p>
      ) : null}
      {error ? <p className={styles.error}>{error}</p> : null}

      {payload ? (
        <>
          <div className={styles.rangeRow}>
            <span className={styles.rangeLabel}>Range</span>
            {rangeOptions.map(({ range, label, disabled }) => {
              const inactive = loading || disabled
              const showActive = activeRange === range && !disabled
              const minDays = PRESET_RANGE_MIN_DAYS[range as keyof typeof PRESET_RANGE_MIN_DAYS]
              return (
                <button
                  key={range}
                  type="button"
                  className={`${styles.rangeBtn} ${showActive ? styles.rangeBtnActive : ''} ${disabled ? styles.rangeBtnUnavailable : ''}`}
                  disabled={inactive}
                  title={
                    disabled && minDays > 0
                      ? `Needs at least ${minDays} calendar days of joint history`
                      : undefined
                  }
                  onClick={() => {
                    if (disabled || loading) return
                    void loadChart(range)
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
          <PresetPortfolioChart payload={payload} portfolioLabel="Custom portfolio" />
        </>
      ) : null}
    </div>
  )
}

