'use client'

import { useRef, useState } from 'react'
import styles from './ReturnLineChart.module.css'

export interface ChartSeriesLine {
  values: number[]
  color: string
  label: string
}

interface ReturnLineChartProps {
  /** First series gets a subtle area fill under the line */
  series: ChartSeriesLine[]
  /** Unix seconds, same length as each series values */
  timestampsSec: number[]
  height?: number
  /** Tooltip / display currency for large notionals (default USD). */
  chartCurrency?: 'USD' | 'CAD'
}

const W = 400
const H = 60
const PAD = 2

function formatTooltipValue(v: number, chartCurrency: 'USD' | 'CAD'): string {
  if (Math.abs(v) >= 100) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: chartCurrency,
      maximumFractionDigits: 0,
    }).format(v)
  }
  return v.toFixed(4)
}

function formatPointDate(tsSec: number): string {
  return new Date(tsSec * 1000).toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** Shared y-scale; x spreads across width */
export default function ReturnLineChart({
  series,
  timestampsSec,
  height = 120,
  chartCurrency = 'USD',
}: ReturnLineChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<{
    idx: number
    py: number
    tipLeft: number
  } | null>(null)

  const valid = series.filter((s) => s.values.length >= 2)
  const n = valid[0]?.values.length ?? 0

  function onPointer(clientX: number, clientY: number) {
    const el = wrapRef.current
    if (!el || n < 2) return
    const r = el.getBoundingClientRect()
    const x = clientX - r.left
    const y = clientY - r.top
    const ratio = Math.max(0, Math.min(1, x / r.width))
    const idx = Math.min(n - 1, Math.max(0, Math.round(ratio * (n - 1))))
    const tipLeft = Math.max(24, Math.min(x, r.width - 24))
    setHover({ idx, py: y, tipLeft })
  }

  if (valid.length === 0) {
    return (
      <div
        style={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(232, 228, 220, 0.35)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
        }}
      >
        Not enough overlapping sessions to chart.
      </div>
    )
  }

  if (valid.some((s) => s.values.length !== n) || timestampsSec.length !== n) {
    return (
      <div
        style={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(232, 228, 220, 0.35)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
        }}
      >
        Series length mismatch.
      </div>
    )
  }

  const allValues = valid.flatMap((s) => s.values)
  const min = Math.min(...allValues)
  const max = Math.max(...allValues)
  const span = max - min || 1

  function xyForIndex(vals: number[], i: number): { x: number; y: number } {
    const x = PAD + (i / (vals.length - 1)) * (W - PAD * 2)
    const y = H - PAD - ((vals[i]! - min) / span) * (H - PAD * 2)
    return { x, y }
  }

  function buildPoints(vals: number[]): string {
    const pts: string[] = []
    for (let i = 0; i < vals.length; i++) {
      const { x, y } = xyForIndex(vals, i)
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }

  const firstPoints = buildPoints(valid[0]!.values)
  const hi = hover?.idx
  const reticleX = hi != null ? xyForIndex(valid[0]!.values, hi).x : null

  return (
    <div
      ref={wrapRef}
      className={styles.chartWrap}
      style={{ height }}
      onMouseMove={(e) => onPointer(e.clientX, e.clientY)}
      onMouseLeave={() => setHover(null)}
      onTouchStart={(e) => {
        const t = e.touches[0]
        if (t) onPointer(t.clientX, t.clientY)
      }}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (t) onPointer(t.clientX, t.clientY)
      }}
      onTouchEnd={() => setHover(null)}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
        role="img"
        aria-label="Portfolio and benchmark over time"
      >
        <polyline
          points={`${firstPoints} ${W - PAD},${H} ${PAD},${H}`}
          fill={valid[0]!.color}
          fillOpacity={0.1}
          stroke="none"
        />
        {reticleX != null ? (
          <line
            className={styles.reticleLine}
            x1={reticleX}
            y1={PAD}
            x2={reticleX}
            y2={H - PAD}
          />
        ) : null}
        {valid.map((s, i) => (
          <polyline
            key={i}
            points={buildPoints(s.values)}
            fill="none"
            stroke={s.color}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        ))}
        {hi != null &&
          valid.map((s, i) => {
            const { x, y } = xyForIndex(s.values, hi)
            return (
              <circle
                key={`dot-${i}`}
                className={styles.reticleDot}
                cx={x}
                cy={y}
                r={3.5}
                fill={s.color}
              />
            )
          })}
      </svg>

      {hover && hi != null ? (
        <div
          className={styles.tooltip}
          style={{
            left: hover.tipLeft,
            top: hover.py,
            transform: 'translate(-50%, calc(-100% - 10px))',
          }}
        >
          <div className={styles.tooltipDate}>{formatPointDate(timestampsSec[hi]!)}</div>
          {valid.map((s) => (
            <div key={s.label} className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>{s.label}</span>
              <span className={styles.tooltipVal}>
                {formatTooltipValue(s.values[hi]!, chartCurrency)}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
