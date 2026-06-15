'use client'

import { useRef, useState } from 'react'
import styles from './EnvironmentChart.module.css'

export type EnvironmentName = 'Growth' | 'Inflation' | 'Recession' | 'Deflation' | 'Sideways Chop'

interface Region {
  startMs: number
  endMs: number
  env: EnvironmentName
}

const ENV_COLORS: Record<EnvironmentName, string> = {
  Growth: '#5dca8a',
  Inflation: '#e8944a',
  Recession: '#e24b4a',
  Deflation: '#85b7eb',
  'Sideways Chop': '#c9a84c',
}

function d(year: number, month: number, day: number): number {
  return Date.UTC(year, month - 1, day)
}

/** Historical macro regime classifications. Minimum 3-month duration per region. */
const REGIONS: Region[] = [
  { startMs: d(2000, 1, 1),  endMs: d(2001, 2, 28), env: 'Sideways Chop' },
  { startMs: d(2001, 3, 1),  endMs: d(2002, 9, 30), env: 'Recession' },
  { startMs: d(2002, 10, 1), endMs: d(2003, 3, 31), env: 'Sideways Chop' },
  { startMs: d(2003, 4, 1),  endMs: d(2007, 7, 31), env: 'Growth' },
  { startMs: d(2007, 8, 1),  endMs: d(2008, 8, 31), env: 'Inflation' },
  { startMs: d(2008, 9, 1),  endMs: d(2009, 6, 30), env: 'Recession' },
  { startMs: d(2009, 7, 1),  endMs: d(2011, 4, 30), env: 'Growth' },
  { startMs: d(2011, 5, 1),  endMs: d(2011, 11, 30), env: 'Sideways Chop' },
  { startMs: d(2011, 12, 1), endMs: d(2014, 6, 30), env: 'Growth' },
  { startMs: d(2014, 7, 1),  endMs: d(2016, 1, 31), env: 'Deflation' },
  { startMs: d(2016, 2, 1),  endMs: d(2018, 8, 31), env: 'Growth' },
  { startMs: d(2018, 9, 1),  endMs: d(2018, 12, 31), env: 'Sideways Chop' },
  { startMs: d(2019, 1, 1),  endMs: d(2020, 1, 31), env: 'Growth' },
  { startMs: d(2020, 2, 1),  endMs: d(2020, 4, 30), env: 'Recession' },
  { startMs: d(2020, 5, 1),  endMs: d(2021, 10, 31), env: 'Growth' },
  { startMs: d(2021, 11, 1), endMs: d(2022, 6, 30), env: 'Inflation' },
  { startMs: d(2022, 7, 1),  endMs: d(2022, 12, 31), env: 'Sideways Chop' },
  { startMs: d(2023, 1, 1),  endMs: d(2025, 12, 31), env: 'Growth' },
]

const LEGEND_ORDER: EnvironmentName[] = ['Growth', 'Inflation', 'Recession', 'Deflation', 'Sideways Chop']

const W = 400
const H = 70
const PAD_X = 2
const PAD_TOP = 1
const PAD_BOTTOM = 2

function formatDate(tsSec: number): string {
  return new Date(tsSec * 1000).toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function envAtTs(tsSec: number): EnvironmentName | null {
  const ms = tsSec * 1000
  for (const r of REGIONS) {
    if (ms >= r.startMs && ms <= r.endMs) return r.env
  }
  return null
}

interface EnvironmentChartProps {
  timestamps: number[]
  values: number[]
  height?: number
}

export default function EnvironmentChart({ timestamps, values, height = 220 }: EnvironmentChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<{ idx: number; ratio: number } | null>(null)

  const n = values.length
  if (n < 2 || timestamps.length !== n) {
    return (
      <div
        style={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-faint)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
        }}
      >
        Chart data unavailable.
      </div>
    )
  }

  const minTs = timestamps[0]!
  const maxTs = timestamps[n - 1]!
  const tsSpan = maxTs - minTs || 1

  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const valSpan = maxVal - minVal || 1
  const plotBottom = H - PAD_BOTTOM
  const plotH = plotBottom - PAD_TOP

  function tsToX(tsSec: number): number {
    return PAD_X + ((tsSec - minTs) / tsSpan) * (W - PAD_X * 2)
  }

  function valToY(v: number): number {
    return plotBottom - ((v - minVal) / valSpan) * plotH
  }

  function buildPoints(): string {
    return values.map((v, i) => `${tsToX(timestamps[i]!)},${valToY(v)}`).join(' ')
  }

  function onPointer(clientX: number) {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = clientX - r.left
    const ratio = Math.max(0, Math.min(1, x / r.width))
    const idx = Math.min(n - 1, Math.max(0, Math.round(ratio * (n - 1))))
    setHover({ idx, ratio })
  }

  const hi = hover?.idx
  const reticleX = hi != null ? tsToX(timestamps[hi]!) : null
  const hoverEnv = hi != null ? envAtTs(timestamps[hi]!) : null

  return (
    <div className={styles.wrap}>
      <div
        ref={wrapRef}
        className={styles.chartWrap}
        style={{ height }}
        onMouseMove={(e) => onPointer(e.clientX)}
        onMouseLeave={() => setHover(null)}
        onTouchStart={(e) => {
          const t = e.touches[0]
          if (t) onPointer(t.clientX)
        }}
        onTouchMove={(e) => {
          const t = e.touches[0]
          if (t) onPointer(t.clientX)
        }}
        onTouchEnd={() => setHover(null)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
          role="img"
          aria-label="SPY price history annotated with market environments"
        >
          {REGIONS.map((r, i) => {
            const x1 = Math.max(PAD_X, tsToX(r.startMs / 1000))
            const x2 = Math.min(W - PAD_X, tsToX(r.endMs / 1000))
            if (x2 <= x1) return null
            return (
              <rect
                key={i}
                x={x1}
                y={PAD_TOP}
                width={x2 - x1}
                height={plotH}
                fill={ENV_COLORS[r.env]}
                fillOpacity={0.15}
              />
            )
          })}

          {reticleX != null ? (
            <line
              className={styles.reticleLine}
              x1={reticleX}
              y1={PAD_TOP}
              x2={reticleX}
              y2={plotBottom}
            />
          ) : null}

          <polyline
            points={buildPoints()}
            fill="none"
            stroke="rgba(var(--rgb-text), 0.7)"
            strokeWidth={1}
            strokeLinejoin="round"
            vectorEffect="nonScalingStroke"
          />

          {hi != null ? (
            <circle
              className={styles.reticleDot}
              cx={tsToX(timestamps[hi]!)}
              cy={valToY(values[hi]!)}
              r={3.5}
              fill={hoverEnv ? ENV_COLORS[hoverEnv] : 'rgba(var(--rgb-text), 0.8)'}
            />
          ) : null}
        </svg>

        {hover && hi != null ? (
          <div
            className={styles.tooltip}
            style={{
              left: `${hover.ratio * 100}%`,
              transform: `translate(${hover.ratio < 0.2 ? '0%' : hover.ratio > 0.8 ? '-100%' : '-50%'}, calc(-100% - 10px))`,
              top: '50%',
            }}
          >
            <div className={styles.tooltipDate}>{formatDate(timestamps[hi]!)}</div>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>SPY</span>
              <span className={styles.tooltipVal}>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(values[hi]!)}
              </span>
            </div>
            {hoverEnv ? (
              <div className={styles.tooltipEnv} style={{ color: ENV_COLORS[hoverEnv] }}>
                {hoverEnv}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={styles.xAxis}>
        {[2000, 2005, 2010, 2015, 2020, 2025].map((year) => {
          const yearTs = Date.UTC(year, 0, 1) / 1000
          const pct = ((yearTs - minTs) / tsSpan) * 100
          if (pct < -2 || pct > 102) return null
          const transform = pct < 5 ? 'translateX(0%)' : pct > 95 ? 'translateX(-100%)' : 'translateX(-50%)'
          return (
            <span
              key={year}
              className={styles.xAxisLabel}
              style={{ left: `${Math.max(0, Math.min(100, pct))}%`, transform }}
            >
              {year}
            </span>
          )
        })}
      </div>

      <div className={styles.legend}>
        {LEGEND_ORDER.map((env) => (
          <span key={env} className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: ENV_COLORS[env] }} />
            {env}
          </span>
        ))}
      </div>
    </div>
  )
}
