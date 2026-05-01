'use client'

import { useCallback, useMemo, useState } from 'react'
import PresetPortfolioChart from '@/components/PresetPortfolioChart'
import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import {
  availablePresetChartRanges,
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
  footnote?: 'default' | 'minimal' | 'none'
  compactMobileCapture?: boolean
  makeupHoldings?: Array<{ ticker: string; weightPct: number }>
}

export default function PresetIntlChartPanel({
  presetId,
  initialPayload,
  overlapInceptionYmd,
  weightedBeta,
  exposureSummary = null,
  footnote = 'default',
  compactMobileCapture = false,
  makeupHoldings = [],
}: PresetIntlChartPanelProps) {
  const [payload, setPayload] = useState(initialPayload)
  const [activeRange, setActiveRange] = useState<YahooRange>(initialPayload.range)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const overlapDays = useMemo(
    () => overlapCalendarDaysForPresetUi(overlapInceptionYmd),
    [overlapInceptionYmd]
  )

  const rangeOptions = useMemo(() => availablePresetChartRanges(overlapDays), [overlapDays])

  const loadRange = useCallback(
    async (range: YahooRange) => {
      if (range === activeRange && !loading) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `/api/preset-chart?${new URLSearchParams({ preset: presetId, range })}`,
          { cache: 'no-store' }
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
        footnote={footnote}
        weightedBeta={weightedBeta}
        showScorecard
        exposureSummary={exposureSummary}
        compactMobileCapture={compactMobileCapture}
        makeupHoldings={makeupHoldings}
      />
    </div>
  )
}
