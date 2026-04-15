'use client'

import { useCallback, useMemo, useState } from 'react'
import PresetPortfolioChart from '@/components/PresetPortfolioChart'
import type { PortfolioChartPayload } from '@/lib/computePortfolioChart'
import { availablePresetChartRanges } from '@/lib/presetChartRanges'
import type { YahooRange } from '@/lib/yahooFinance'
import styles from './PresetIntlChartPanel.module.css'

interface PresetIntlChartPanelProps {
  presetId: string
  initialPayload: PortfolioChartPayload
  /** First overlap session (YYYY-MM-DD); used only to decide which shorter ranges to show. */
  overlapInceptionYmd: string
}

export default function PresetIntlChartPanel({
  presetId,
  initialPayload,
  overlapInceptionYmd,
}: PresetIntlChartPanelProps) {
  const rangeOptions = useMemo(
    () => availablePresetChartRanges(overlapInceptionYmd),
    [overlapInceptionYmd]
  )

  const [payload, setPayload] = useState(initialPayload)
  const [activeRange, setActiveRange] = useState<YahooRange>(initialPayload.range)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        {rangeOptions.map(({ range, label }) => (
          <button
            key={range}
            type="button"
            className={`${styles.rangeBtn} ${activeRange === range ? styles.rangeBtnActive : ''}`}
            disabled={loading}
            onClick={() => void loadRange(range)}
          >
            {label}
          </button>
        ))}
      </div>
      {error ? <p className={styles.rangeError}>{error}</p> : null}
      <PresetPortfolioChart payload={payload} />
    </div>
  )
}
