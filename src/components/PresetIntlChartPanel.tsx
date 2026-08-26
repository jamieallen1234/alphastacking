'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import PresetPortfolioChart from '@/components/PresetPortfolioChart'
import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import {
  availablePresetChartRanges,
  defaultPresetRange,
  overlapCalendarDaysForPresetUi,
  PRESET_RANGE_MIN_DAYS,
} from '@/lib/presetChartRanges'
import type { ScorecardPayload } from '@/lib/portfolioHubGrade'
import type { YahooRange } from '@/lib/yahooFinance'
import styles from './PresetIntlChartPanel.module.css'

function toScorecardPayload(p: PortfolioChartPayload): ScorecardPayload {
  return {
    totalReturnPercent: p.totalReturnPercent ?? null,
    benchmarkTotalReturnPercent: p.benchmarkTotalReturnPercent ?? null,
    maxDrawdownPortfolioPercent: p.maxDrawdownPortfolioPercent ?? null,
    maxDrawdownBenchmarkPercent: p.maxDrawdownBenchmarkPercent ?? null,
    limitingFirstTradeDate: p.limitingFirstTradeDate ?? '',
  }
}

/**
 * Range payloads reflect model assumptions that can change with a deployment. Never let the
 * browser reuse an old response for the same preset/range URL after those assumptions change.
 * Server-side `unstable_cache` still deduplicates the expensive chart calculation.
 */
function fetchPresetChart(presetId: string, range: YahooRange) {
  return fetch(`/api/preset-chart?${new URLSearchParams({ preset: presetId, range })}`, {
    cache: 'no-store',
  })
}

interface PresetIntlChartPanelProps {
  presetId: string
  initialPayload: PortfolioChartPayload
  /** First session where every holding overlaps (youngest listing), YYYY-MM-DD — not the first day of the current chart window. */
  overlapInceptionYmd: string
  /** Weighted holdings beta used by scorecard in the chart panel. */
  weightedBeta: number
  exposureSummary?: {
    grossLongEquityPct: number
    grossShortEquityPct: number
    grossAlphaExposurePct: number
  } | null
  holdings?: Array<{ ticker: string; weightPct: number }>
}

export default function PresetIntlChartPanel({
  presetId,
  initialPayload,
  overlapInceptionYmd,
  weightedBeta,
  exposureSummary = null,
  holdings = [],
}: PresetIntlChartPanelProps) {
  const [payload, setPayload] = useState(initialPayload)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // MAX payload for blended scorecard (fetched once on mount)
  const [maxPayload, setMaxPayload] = useState<PortfolioChartPayload | null>(null)

  const overlapDays = useMemo(
    () => overlapCalendarDaysForPresetUi(overlapInceptionYmd),
    [overlapInceptionYmd]
  )

  const rangeOptions = useMemo(() => availablePresetChartRanges(overlapDays), [overlapDays])

  // Server always renders 1y; if 1y is disabled (< 365 days history), start on the best available range.
  const bestInitialRange = useMemo(() => defaultPresetRange(overlapDays), [overlapDays])
  const [activeRange, setActiveRange] = useState<YahooRange>(bestInitialRange)

  // If the server rendered 1y but 1y is disabled (short history), fetch the correct default range.
  useEffect(() => {
    if (bestInitialRange === initialPayload.range) return
    setLoading(true)
    void fetchPresetChart(presetId, bestInitialRange)
      .then((r) => r.json())
      .then((data: PortfolioChartPayload & { error?: string }) => {
        setPayload(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch MAX payload for blended scorecard, then pre-warm remaining ranges.
  useEffect(() => {
    const initialRange = initialPayload.range
    // MAX first (needed for scorecard blend); stagger others after
    void fetchPresetChart(presetId, 'max')
      .then((r) => r.json())
      .then((data: PortfolioChartPayload) => setMaxPayload(data))
      .catch(() => undefined)

    const toWarm = rangeOptions
      .filter(({ disabled, range }) => !disabled && range !== initialRange && range !== 'max')
      .map(({ range }) => range)
    const timers = toWarm.map((range, i) =>
      setTimeout(
        () =>
          void fetchPresetChart(presetId, range).catch(() => undefined),
        2000 + i * 3000
      )
    )
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetId])

  const loadRange = useCallback(
    async (range: YahooRange) => {
      if (range === activeRange && !loading) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetchPresetChart(presetId, range)
        const data = (await res.json()) as PortfolioChartPayload & { error?: string }
        if (!res.ok) {
          setError(data.error || 'Could not load chart')
          return
        }
        setPayload(data)
        setActiveRange(range)
      } catch {
        setError('Could not load chart')
      } finally {
        setLoading(false)
      }
    },
    [presetId, activeRange, loading]
  )

  return (
    <div>
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
                  ? `Needs at least ${minDays} calendar days of joint history (youngest listing)`
                  : undefined
              }
              onClick={() => {
                if (disabled || loading) return
                void loadRange(range)
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
      {error ? <p className={styles.rangeError}>{error}</p> : null}
      <PresetPortfolioChart
        payload={payload}
        weightedBeta={weightedBeta}
        showScorecard
        exposureSummary={exposureSummary}
        holdings={holdings}
        scorecardPayloads={
          maxPayload != null
            ? { payload1y: toScorecardPayload(initialPayload), payloadMax: toScorecardPayload(maxPayload) }
            : null
        }
        maxSharpeRatio={maxPayload?.sharpeRatio ?? null}
        maxSortinoRatio={maxPayload?.sortinoRatio ?? null}
      />
    </div>
  )
}
