'use client'

import { useState } from 'react'
import ReturnLineChart from '@/components/ReturnLineChart'
import type { EtfChartPayload } from '@/lib/getCachedEtfChart'
import type { YahooRange } from '@/lib/yahooFinance'
import styles from './EtfChartPanel.module.css'
import chartStyles from './MateEtfChart.module.css'

const RANGES: { range: YahooRange; label: string }[] = [
  { range: '1mo', label: '1M' },
  { range: 'ytd', label: 'YTD' },
  { range: '1y', label: '1Y' },
  { range: '2y', label: '2Y' },
  { range: '5y', label: '5Y' },
  { range: 'max', label: 'All' },
]

interface EtfChartPanelProps {
  symbol: 'MATE' | 'HDGE.TO'
  initialPayload: EtfChartPayload
}

export default function EtfChartPanel({ symbol, initialPayload }: EtfChartPanelProps) {
  const [payload, setPayload] = useState(initialPayload)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadRange(range: YahooRange) {
    if (loading || range === payload.range) return
    setLoading(true)
    setError(null)
    try {
      const qs = new URLSearchParams({ symbol, range })
      const res = await fetch(`/api/etf-chart?${qs}`, { cache: 'no-store' })
      const data = (await res.json()) as EtfChartPayload & { error?: string }
      if (!res.ok) {
        setError(data.error || 'Could not load chart')
      } else {
        setPayload(data)
      }
    } catch {
      setError('Could not load chart')
    } finally {
      setLoading(false)
    }
  }

  const trClass = payload.totalReturnPercent != null && payload.totalReturnPercent >= 0 ? chartStyles.metricPos : ''

  return (
    <div className={chartStyles.chartBlock}>
      <div className={styles.rangeRow}>
        <span className={styles.rangeLabel}>Range</span>
        {RANGES.map(({ range, label }) => (
          <button
            key={range}
            type="button"
            className={`${styles.rangeBtn} ${payload.range === range ? styles.rangeBtnActive : ''}`}
            onClick={() => void loadRange(range)}
            disabled={loading}
          >
            {label}
          </button>
        ))}
      </div>
      {error ? <p className={styles.rangeError}>{error}</p> : null}

      <div className={chartStyles.metricsRow}>
        <div>
          <div className={`${chartStyles.metricBig} ${trClass}`}>
            {payload.totalReturnPercent != null
              ? `${payload.totalReturnPercent >= 0 ? '+' : ''}${payload.totalReturnPercent.toFixed(2)}%`
              : '—'}
          </div>
          <div className={chartStyles.metricSub}>Total return ({payload.range.toUpperCase()})</div>
        </div>
      </div>

      <div className={chartStyles.legend}>
        <span className={chartStyles.legendSwatch} aria-hidden="true" />
        {payload.symbol}
      </div>

      <ReturnLineChart
        series={[{ values: payload.values, color: 'var(--color-gold)', label: payload.symbol }]}
        timestampsSec={payload.timestamps}
        height={140}
        chartCurrency={symbol === 'HDGE.TO' ? 'CAD' : 'USD'}
      />

      <p className={chartStyles.disclaimer}>
        Yahoo adjusted close, normalized to $10,000 at first available trade date. Educational only.
      </p>
    </div>
  )
}
