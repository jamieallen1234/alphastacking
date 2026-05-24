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
import type { YahooRange } from '@/lib/yahooFinance'
import styles from './PresetIntlChartPanel.module.css'

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
    void fetch(`/api/preset-chart?${new URLSearchParams({ preset: presetId, range: bestInitialRange })}`)
      .then((r) => r.json())
      .then((data: PortfolioChartPayload & { error?: string }) => {
        setPayload(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pre-warm server + browser cache for all non-active enabled ranges so clicks are instant.
  // Stagger by 3 s each so concurrent server-side Yahoo work doesn't pile up.
  useEffect(() => {
    const initialRange = initialPayload.range
    const toWarm = rangeOptions
      .filter(({ disabled, range }) => !disabled && range !== initialRange)
      .map(({ range }) => range)
    const timers = toWarm.map((range, i) =>
      setTimeout(
        () =>
          void fetch(`/api/preset-chart?${new URLSearchParams({ preset: presetId, range })}`).catch(
            () => undefined
          ),
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
        const res = await fetch(
          `/api/preset-chart?${new URLSearchParams({ preset: presetId, range })}`
        )
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
      />
    </div>
  )
}
