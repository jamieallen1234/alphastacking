'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PresetPortfolioChart from '@/components/PresetPortfolioChart'
import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import {
  availablePresetChartRanges,
  overlapCalendarDaysForPresetUi,
  PRESET_RANGE_MIN_DAYS,
} from '@/lib/presetChartRanges'
import type { PortfolioBuilderEtfOption } from '@/lib/portfolioBuilderEtfOptions'
import type { PortfolioPrefillHolding } from '@/lib/portfolioBuilderPrefill'
import { portfolioHasMeaningfulAlphaOrAltsExposure } from '@/lib/portfolioBuilderHasAlphaAltsExposure'
import { buildExposureSummaryFromWeightedTickers } from '@/lib/exposureSummary'
import type { YahooRange } from '@/lib/yahooFinance'
import { shouldPrefillNewRowWeightForPortfolioTutorial } from '@/lib/portfolioBuilderTutorialNewRow'
import PortfolioBuilderTour from '@/components/PortfolioBuilderTour'
import styles from './PortfolioBuilderTool.module.css'

type EfficiencyKind = 'capital' | 'alpha' | 'stacked' | 'all'
type BuilderEdition = 'us' | 'ca'

type BuilderRow = {
  id: string
  allocation: string
  efficiencyKind: EfficiencyKind
  category: string
  symbol: string
}

const MAX_ROWS = 20
const GRADE_RANK: Record<string, number> = { 'A+': 0, A: 1, 'B+': 2, B: 3, C: 4, D: 5 }

function newRow(id: number): BuilderRow {
  return {
    id: `row-${id}`,
    allocation: '',
    efficiencyKind: 'all',
    category: 'all',
    symbol: '',
  }
}

function defaultRows(): BuilderRow[] {
  return [{ ...newRow(1), efficiencyKind: 'capital', allocation: '50' }]
}

function prefillRowsFromHoldings(holdings: PortfolioPrefillHolding[]): BuilderRow[] {
  return holdings.map((h, i) => ({
    ...newRow(i + 1),
    symbol: h.ticker.trim(),
    allocation: String(Math.round(h.weightPct)),
    efficiencyKind: 'all',
    category: 'all',
  }))
}

/** Integer % only: strips non-digits; if user typed or pasted a decimal, keeps the whole part. */
function sanitizeAllocationInput(raw: string): string {
  if (raw === '') return ''
  const head = raw.split(/[.,]/)[0]
  return head.replace(/\D/g, '')
}

function parseAllocation(v: string): number | null {
  const t = v.trim()
  if (!t) return null
  const n = parseInt(t, 10)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

function gradeSortKey(g: PortfolioBuilderEtfOption['capitalGrade']): number {
  if (g == null) return 99
  return GRADE_RANK[g] ?? 99
}

/** Category filters that should also list long/short funds with net equity ≥ 80%. */
const BUILDER_EQUITY_LIKE_CATEGORIES = new Set([
  'Factor',
  'LETF',
  'Leveraged equity ETFs (advanced)',
])

const CRYPTO_CATEGORY_LABEL = 'Crypto & digital assets'

const PRECIOUS_METALS_CATEGORY_LABEL = 'Precious metals'

function rowCategoryMatches(o: PortfolioBuilderEtfOption, selected: string): boolean {
  if (selected === 'all') return true
  if (o.category === selected) return true
  if (
    BUILDER_EQUITY_LIKE_CATEGORIES.has(selected) &&
    o.category === 'Long/short' &&
    o.netEquityPct != null &&
    o.netEquityPct >= 80
  ) {
    return true
  }
  if (selected === CRYPTO_CATEGORY_LABEL && o.hasCryptoExposure) {
    return true
  }
  if (selected === PRECIOUS_METALS_CATEGORY_LABEL && o.hasPreciousMetalsExposure) {
    return true
  }
  return false
}

type SelectOption = { value: string; label: string; searchText?: string }

function BuilderThemedSelect({
  id,
  ariaLabelledBy,
  value,
  options,
  placeholder,
  onChange,
  disabled,
  triggerClassName,
  searchable,
  searchPlaceholder,
}: {
  id: string
  ariaLabelledBy?: string
  value: string
  options: SelectOption[]
  placeholder: string
  onChange: (value: string) => void
  disabled?: boolean
  /** Extra classes for the closed trigger (e.g. multi-line ETF labels). */
  triggerClassName?: string
  /** Optional inline filter input in open listbox (used by ETF picker). */
  searchable?: boolean
  searchPlaceholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = `${id}-listbox`

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selected = options.find((o) => o.value === value)
  const display = selected?.label ?? placeholder
  const q = query.trim().toLowerCase()
  const visibleOptions = !searchable || !q
    ? options
    : options.filter((o) =>
        `${o.label} ${o.searchText ?? ''}`.toLowerCase().includes(q)
      )

  return (
    <div ref={rootRef} className={styles.customSelectRoot}>
      <button
        type="button"
        id={id}
        className={`${styles.select} ${styles.customSelectTrigger}${triggerClassName ? ` ${triggerClassName}` : ''}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={ariaLabelledBy}
        onClick={() => {
          if (disabled) return
          setOpen((o) => {
            const next = !o
            if (next) setQuery('')
            return next
          })
        }}
      >
        {display}
      </button>
      {open && !disabled ? (
        <ul id={listId} role="listbox" className={styles.customSelectList} aria-labelledby={ariaLabelledBy}>
          {searchable ? (
            <li role="presentation" className={styles.customSelectSearchRow}>
              <input
                type="text"
                className={styles.customSelectSearchInput}
                placeholder={searchPlaceholder ?? 'Filter...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Filter options"
              />
            </li>
          ) : null}
          {visibleOptions.map((o) => (
            <li key={o.value === '' ? '__empty' : o.value} role="presentation" className={styles.customSelectItem}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                className={`${styles.customSelectOption} ${o.value === value ? styles.customSelectOptionSelected : ''}`}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function rowEligibleOptions(options: PortfolioBuilderEtfOption[], row: BuilderRow): PortfolioBuilderEtfOption[] {
  const eligible = options.filter((o) => {
    const efficiencyOk =
      row.efficiencyKind === 'all'
        ? o.capitalEligible || o.alphaEligible || o.stackedEligible
        : row.efficiencyKind === 'stacked'
          ? o.stackedEligible
        : row.efficiencyKind === 'capital'
          ? o.capitalEligible
          : o.alphaEligible
    const categoryOk = rowCategoryMatches(o, row.category)
    return efficiencyOk && categoryOk
  })
  return eligible.sort((a, b) => {
    const ag =
      row.efficiencyKind === 'capital'
        ? a.capitalGrade
        : row.efficiencyKind === 'stacked'
          ? a.stackedGrade
          : a.alphaGrade
    const bg =
      row.efficiencyKind === 'capital'
        ? b.capitalGrade
        : row.efficiencyKind === 'stacked'
          ? b.stackedGrade
          : b.alphaGrade
    const r = gradeSortKey(ag) - gradeSortKey(bg)
    if (r !== 0) return r
    return a.displayTicker.localeCompare(b.displayTicker)
  })
}

function rowCategoryOptions(options: PortfolioBuilderEtfOption[], row: BuilderRow): SelectOption[] {
  const effOk = (o: PortfolioBuilderEtfOption) =>
    row.efficiencyKind === 'all'
      ? o.capitalEligible || o.alphaEligible || o.stackedEligible
      : row.efficiencyKind === 'stacked'
        ? o.stackedEligible
        : row.efficiencyKind === 'capital'
          ? o.capitalEligible
          : o.alphaEligible

  const filtered = options.filter(effOk)
  const categories = Array.from(new Set(filtered.map((o) => o.category)))
  const showPrecious =
    (row.efficiencyKind === 'alpha' || row.efficiencyKind === 'all') &&
    filtered.some((o) => o.hasPreciousMetalsExposure)
  if (showPrecious) categories.push(PRECIOUS_METALS_CATEGORY_LABEL)

  categories.sort((a, b) => a.localeCompare(b))
  return [{ value: 'all', label: 'All' }, ...categories.map((c) => ({ value: c, label: c }))]
}

function optionGradeLabel(row: BuilderRow, o: PortfolioBuilderEtfOption): string {
  if (row.efficiencyKind === 'capital') return o.capitalGrade != null ? o.capitalGrade : ''
  if (row.efficiencyKind === 'alpha') return o.alphaGrade != null ? o.alphaGrade : ''
  if (row.efficiencyKind === 'stacked') return o.stackedGrade != null ? o.stackedGrade : ''
  if (o.stackedEligible) return o.stackedGrade != null ? `Stacked ${o.stackedGrade}` : ''
  const eqPart = o.capitalGrade != null ? `Eq ${o.capitalGrade}` : ''
  const alPart = o.alphaGrade != null ? `Alpha ${o.alphaGrade}` : ''
  if (eqPart && alPart) return `${eqPart} / ${alPart}`
  if (eqPart) return eqPart
  if (alPart) return alPart
  return ''
}

function formatBeta(b: number | string | null | undefined): string {
  if (b == null || b === '') return ''
  const n = typeof b === 'number' ? b : Number(b)
  if (!Number.isFinite(n)) return ''
  return n.toFixed(2)
}

function formatRowBeta(row: BuilderRow, options: PortfolioBuilderEtfOption[]): string {
  if (!row.symbol.trim()) return ''
  const eligible = rowEligibleOptions(options, row)
  const o = eligible.find((x) => x.symbol === row.symbol)
  if (!o) return ''
  return formatBeta(o.beta)
}

/** Σ wᵢβᵢ across any filled rows (weights entered as % of portfolio). */
function weightedPortfolioBeta(
  rows: BuilderRow[],
  options: PortfolioBuilderEtfOption[]
): number | null {
  let sum = 0
  let usedAny = false
  for (const r of rows) {
    const pct = parseAllocation(r.allocation)
    if (pct == null || pct <= 0 || !r.symbol.trim()) continue
    const eligible = rowEligibleOptions(options, r)
    const o = eligible.find((x) => x.symbol === r.symbol)
    if (!o || o.beta == null) continue
    const b = typeof o.beta === 'number' ? o.beta : Number(o.beta)
    if (!Number.isFinite(b)) continue
    usedAny = true
    sum += (pct / 100) * b
  }
  return usedAny ? sum : null
}

export default function PortfolioBuilderTool({
  edition,
  options,
  initialPrefill,
}: {
  edition: BuilderEdition
  options: PortfolioBuilderEtfOption[]
  initialPrefill?: PortfolioPrefillHolding[] | null
}) {
  const [rows, setRows] = useState<BuilderRow[]>(() => {
    if (initialPrefill && initialPrefill.length > 0) {
      return prefillRowsFromHoldings(initialPrefill)
    }
    return defaultRows()
  })
  const [nextId, setNextId] = useState(() => {
    if (initialPrefill && initialPrefill.length > 0) {
      return initialPrefill.length + 1
    }
    return 2
  })
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
        if (alloc == null) return true
        if (alloc === 0) return false
        return !r.symbol.trim()
      }),
    [rows]
  )
  const allocationValid = totalAllocation === 100
  const firstRowComplete = useMemo(() => {
    const r = rows[0]
    if (!r) return false
    const pct = parseAllocation(r.allocation)
    return pct != null && pct > 0 && Boolean(r.symbol?.trim())
  }, [rows])
  const weightedBeta = useMemo(
    () => weightedPortfolioBeta(rows, options),
    [rows, options]
  )
  const exposureSummary = useMemo(() => {
    const weightedTickers = rows
      .map((r) => {
        const pct = parseAllocation(r.allocation)
        return { ticker: r.symbol, weightPct: pct ?? 0 }
      })
      .filter((r) => r.ticker.trim() !== '' && r.weightPct > 0)
    return buildExposureSummaryFromWeightedTickers(weightedTickers)
  }, [rows])
  const canGenerate = !hasIncompleteRow && allocationValid && rows.length > 0 && !loading

  const builderError = useMemo(() => {
    if (error) return error
    if (!allocationValid) return 'Allocation must total exactly 100% before generating.'
    if (hasIncompleteRow)
      return 'Each line with a weight above 0% needs an ETF ticker before generating.'
    return null
  }, [error, allocationValid, hasIncompleteRow])

  const noAlphaWarning = useMemo(() => {
    if (!allocationValid || hasIncompleteRow) return null
    if (portfolioHasMeaningfulAlphaOrAltsExposure(rows, options, exposureSummary)) return null
    return 'This portfolio has no alpha & alts exposure. Consider adding a diversifying sleeve.'
  }, [allocationValid, hasIncompleteRow, rows, options, exposureSummary])

  const builderWarning = useMemo(() => {
    if (!allocationValid || hasIncompleteRow) return null
    if (weightedBeta == null) return null
    if (weightedBeta > 2.5) {
      return `Weighted portfolio beta is ${weightedBeta.toFixed(2)} — very high versus a market-like book.`
    }
    if (weightedBeta > 1.5) {
      return `Weighted portfolio beta is ${weightedBeta.toFixed(2)}. Above 1.5 increases drawdown risk versus a market-like book.`
    }
    return null
  }, [allocationValid, hasIncompleteRow, weightedBeta])

  const overlapDays = useMemo(
    () =>
      payload?.limitingFirstTradeDate
        ? overlapCalendarDaysForPresetUi(payload.limitingFirstTradeDate)
        : 0,
    [payload?.limitingFirstTradeDate]
  )
  const rangeOptions = useMemo(() => availablePresetChartRanges(overlapDays), [overlapDays])

  const buildRequestBody = useCallback((range: YahooRange) => {
    const legs = rows
      .map((r) => ({
        sym: r.symbol.trim().toUpperCase(),
        w: (parseAllocation(r.allocation) ?? 0) / 100,
      }))
      .filter((x) => x.sym !== '' && x.w > 0)
    return {
      edition,
      range,
      symbols: legs.map((x) => x.sym),
      weights: legs.map((x) => x.w),
    }
  }, [edition, rows])

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
      const tourPrefill = shouldPrefillNewRowWeightForPortfolioTutorial(edition)
      const allocation = tourPrefill ? '50' : '0'
      const efficiencyKind: EfficiencyKind = tourPrefill ? 'alpha' : 'all'
      return [
        ...prev,
        { ...newRow(nextId), allocation, efficiencyKind, category: 'all', symbol: '' },
      ]
    })
    setNextId((n) => n + 1)
  }, [edition, nextId])

  const updateRow = useCallback((id: string, patch: Partial<BuilderRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }, [])

  const removeRow = useCallback((id: string) => {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)))
  }, [])

  const resetAll = useCallback(() => {
    setRows(defaultRows())
    setNextId(2)
    setPayload(null)
    setError(null)
    setActiveRange('1y')
  }, [])

  return (
    <div className={styles.panel}>
      <div className={styles.topMeta}>
        <h2 className={styles.title}>Portfolio builder</h2>
      </div>

      <div className={styles.rowList}>
        <div id="portfolio-builder-tour-intro" className={styles.tourIntroAnchor} aria-hidden="true" />
        <div className={styles.holdingHeadWrap}>
          <div className={styles.holdingHeadInner}>
            <div className={styles.holdingRow}>
              <div className={styles.colHead} id="portfolio-builder-h-alloc">
                WEIGHT
              </div>
              <div className={styles.filterHeadPair} id="portfolio-builder-tour-filters">
                <div className={styles.colHead} id="portfolio-builder-h-eff">
                  Efficiency
                </div>
                <div className={styles.colHead} id="portfolio-builder-h-category">
                  Category
                </div>
              </div>
              <div className={styles.colHead} id="portfolio-builder-h-etf">
                ETF
              </div>
              <div className={`${styles.colHead} ${styles.colHeadBeta}`} id="portfolio-builder-h-beta">
                1Y BETA
              </div>
            </div>
          </div>
          <div className={styles.holdingSideRail} aria-hidden="true" />
        </div>

        {rows.map((row, rowIndex) => {
          const isFirstRow = rowIndex === 0
          const categoryOptions = rowCategoryOptions(options, row)
          const isCategoryStillValid = row.category === 'all' || categoryOptions.some((o) => o.value === row.category)
          const eligible = rowEligibleOptions(options, row)
          const isSymbolStillValid = row.symbol && eligible.some((o) => o.symbol === row.symbol)
          const rowBetaText = formatRowBeta(row, options)
          const rowBetaMuted = rowBetaText === ''
          const efficiencyCategoryCells = (
            <>
              <div className={styles.holdingCell}>
                <BuilderThemedSelect
                  id={
                    rowIndex === rows.length - 1 && rowIndex > 0
                      ? 'portfolio-builder-tour-new-row-eff'
                      : `${row.id}-eff`
                  }
                  ariaLabelledBy="portfolio-builder-h-eff"
                  value={row.efficiencyKind}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'capital', label: 'Equity' },
                    { value: 'alpha', label: 'Alpha' },
                    { value: 'stacked', label: 'Stacked' },
                  ]}
                  placeholder="All"
                  onChange={(v) =>
                    updateRow(row.id, { efficiencyKind: v as EfficiencyKind, category: 'all', symbol: '' })
                  }
                />
              </div>

              <div className={styles.holdingCell}>
                <BuilderThemedSelect
                  id={`${row.id}-category`}
                  ariaLabelledBy="portfolio-builder-h-category"
                  value={isCategoryStillValid ? row.category : 'all'}
                  options={categoryOptions}
                  placeholder="All"
                  onChange={(category) => updateRow(row.id, { category, symbol: '' })}
                />
              </div>
            </>
          )
          return (
            <div key={row.id} className={styles.holdingWrap}>
              <fieldset className={styles.holding} aria-label="Portfolio line">
                <div className={styles.holdingRow}>
                  <div className={styles.holdingCell}>
                    <input
                      id={isFirstRow ? 'portfolio-builder-tour-first-alloc' : `${row.id}-alloc`}
                      className={styles.input}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={row.allocation}
                      onChange={(e) =>
                        updateRow(row.id, { allocation: sanitizeAllocationInput(e.target.value) })
                      }
                      placeholder="e.g. 15"
                      aria-labelledby="portfolio-builder-h-alloc"
                    />
                  </div>

                  {isFirstRow ? (
                    <div className={styles.firstRowFilterPair} id="portfolio-builder-tour-first-filters">
                      {efficiencyCategoryCells}
                    </div>
                  ) : (
                    efficiencyCategoryCells
                  )}

                  <div
                    className={`${styles.holdingCell} ${styles.holdingCellGrow} ${styles.holdingCellSleeve}`}
                    id={isFirstRow ? 'portfolio-builder-tour-first-etf' : undefined}
                  >
                    <span id={`${row.id}-sleeve-ctx`} className={styles.srOnly}>
                      {row.efficiencyKind} sleeve
                    </span>
                    <BuilderThemedSelect
                      id={`${row.id}-symbol`}
                      ariaLabelledBy={`portfolio-builder-h-etf ${row.id}-sleeve-ctx`}
                      triggerClassName={styles.selectEtfTrigger}
                      searchable
                      searchPlaceholder="Type symbol or ETF name"
                      value={isSymbolStillValid ? row.symbol : ''}
                      options={
                        eligible.length === 0
                          ? [{ value: '', label: 'No eligible ETFs' }]
                          : [
                              { value: '', label: 'Select ETF' },
                              ...eligible.map((o) => {
                                const gradeLabel = optionGradeLabel(row, o)
                                return {
                                  value: o.symbol,
                                  label: gradeLabel ? `${o.title} (${gradeLabel})` : o.title,
                                  searchText: `${o.displayTicker} ${o.symbol} ${o.title}`,
                                }
                              }),
                            ]
                      }
                      placeholder={eligible.length ? 'Select ETF' : 'No eligible ETFs'}
                      onChange={(symbol) => updateRow(row.id, { symbol })}
                      disabled={eligible.length === 0}
                    />
                  </div>

                  <div className={`${styles.holdingCell} ${styles.holdingCellBeta}`}>
                    <div
                      className={`${styles.betaReadout} ${rowBetaMuted ? styles.betaReadoutMuted : ''}`}
                      aria-labelledby="portfolio-builder-h-beta"
                    >
                      {rowBetaText}
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className={styles.holdingSideRail}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSquareIcon}`}
                  disabled={rows.length <= 1}
                  onClick={() => removeRow(row.id)}
                  aria-label="Remove this line"
                >
                  X
                </button>
              </div>
            </div>
          )
        })}

        <div className={styles.totalFieldRow}>
          <div className={styles.holdingWrap}>
            <fieldset className={`${styles.holding} ${styles.totalHolding}`} aria-label="Portfolio totals">
              <div className={styles.holdingRow}>
                <div className={styles.totalOutCell}>
                  <output
                    id="portfolio-builder-total-pct"
                    className={`${styles.totalOutput} ${allocationValid ? '' : styles.totalOutputMismatch}`}
                    aria-label={`Total allocation ${totalAllocation} percent of 100 percent`}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {totalAllocation} / 100%
                  </output>
                </div>
                <div className={styles.totalMidSpacer} aria-hidden="true" />
                <div className={`${styles.holdingCell} ${styles.holdingCellBeta}`}>
                  <div
                    id="portfolio-builder-total-beta"
                    role="status"
                    className={`${styles.betaReadout} ${weightedBeta == null ? styles.betaReadoutMuted : ''}`}
                    aria-label={
                      weightedBeta != null
                        ? `Weighted portfolio beta ${weightedBeta.toFixed(2)}`
                        : 'Weighted portfolio beta not shown; add at least one line with allocation, ETF selection, and an available beta.'
                    }
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {weightedBeta != null ? weightedBeta.toFixed(2) : ''}
                  </div>
                </div>
              </div>
            </fieldset>
            <div className={styles.holdingSideRail}>
              <button
                id="portfolio-builder-tour-add-row"
                type="button"
                className={`${styles.btn} ${styles.btnSquareIcon}`}
                onClick={addRow}
                disabled={rows.length >= MAX_ROWS}
                aria-label="Add row"
                title="Add row"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          id="portfolio-builder-tour-generate"
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

      {builderError ? <p className={styles.error}>{builderError}</p> : null}
      {noAlphaWarning ? <p className={styles.warning}>{noAlphaWarning}</p> : null}
      {builderWarning ? <p className={styles.warning}>{builderWarning}</p> : null}

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
          <PresetPortfolioChart
            payload={payload}
            portfolioLabel="Custom portfolio"
            weightedBeta={weightedBeta}
            showScorecard
            exposureSummary={exposureSummary}
            holdings={rows
              .map((r) => ({
                ticker: r.symbol.trim().toUpperCase(),
                weightPct: parseAllocation(r.allocation) ?? 0,
              }))
              .filter((h) => h.ticker !== '' && h.weightPct > 0)}
          />
        </>
      ) : null}

      <PortfolioBuilderTour
        edition={edition}
        suppressAutoTour={Boolean(initialPrefill && initialPrefill.length > 0)}
        firstRowComplete={firstRowComplete}
        canGenerate={canGenerate}
        rowCount={rows.length}
      />
    </div>
  )
}

