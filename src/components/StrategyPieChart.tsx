'use client'

import { useState } from 'react'
import styles from './StrategyPieChart.module.css'

export interface StrategyPieSlice {
  /** Strategy name, e.g. "Long/short + 2x SPY" */
  label: string
  /** Slice weight as a percent, e.g. 25 */
  weightPct: number
  /** Slice accent color */
  color: string
  /** Shared growth-beta engine for this slice, e.g. "2x SPY (SSO)" */
  growthComponent?: string
  /** The alpha this slice brings, e.g. "long/short equity" */
  alpha?: string
  /** Environments this alpha tends to perform in, e.g. ["Choppy/Sideways", "Growth"] */
  environments?: string[]
  /** One-line explanation shown on hover */
  description?: string
}

interface StrategyPieChartProps {
  slices: StrategyPieSlice[]
  /** Label shown in the donut's center. Default "Growth". */
  centerLabel?: string
  /** Outer diameter of the donut in px. Default 220. */
  size?: number
}

const VIEW = 100
const CENTER = VIEW / 2
const OUTER_R = 46
const INNER_R = 27

function polarToXY(angleDeg: number, r: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return [CENTER + r * Math.cos(rad), CENTER + r * Math.sin(rad)]
}

function donutSlicePath(startAngle: number, endAngle: number): string {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  const [ox1, oy1] = polarToXY(startAngle, OUTER_R)
  const [ox2, oy2] = polarToXY(endAngle, OUTER_R)
  const [ix1, iy1] = polarToXY(endAngle, INNER_R)
  const [ix2, iy2] = polarToXY(startAngle, INNER_R)
  return [
    `M ${ox1} ${oy1}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${largeArc} 1 ${ox2} ${oy2}`,
    `L ${ix1} ${iy1}`,
    `A ${INNER_R} ${INNER_R} 0 ${largeArc} 0 ${ix2} ${iy2}`,
    'Z',
  ].join(' ')
}

/**
 * Path string(s) for one slice. A slice spanning the full circle (single 100% slice) is
 * split into two half-arcs, because an SVG arc whose start and end points coincide renders
 * nothing.
 */
function donutSlicePaths(startAngle: number, endAngle: number): string[] {
  if (endAngle - startAngle >= 359.999) {
    const mid = startAngle + 180
    return [donutSlicePath(startAngle, mid), donutSlicePath(mid, endAngle)]
  }
  return [donutSlicePath(startAngle, endAngle)]
}

export default function StrategyPieChart({ slices, centerLabel = 'Growth', size = 220 }: StrategyPieChartProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const total = slices.reduce((s, sl) => s + sl.weightPct, 0) || 1
  let cumulative = 0
  const arcs = slices.map((slice) => {
    const startAngle = (cumulative / total) * 360
    cumulative += slice.weightPct
    const endAngle = (cumulative / total) * 360
    return { slice, startAngle, endAngle }
  })

  const active = activeIdx != null ? slices[activeIdx] : null

  return (
    <div className={styles.wrap}>
      <div className={styles.chartRow}>
        <div className={styles.svgWrap} style={{ width: size, height: size }}>
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} role="img" aria-label="Strategy allocation pie chart">
            {arcs.flatMap(({ slice, startAngle, endAngle }, i) =>
              donutSlicePaths(startAngle, endAngle).map((d, j) => (
                <path
                  key={`${slice.label}-${j}`}
                  d={d}
                  fill={slice.color}
                  fillOpacity={activeIdx == null || activeIdx === i ? 0.85 : 0.25}
                  className={styles.slicePath}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                />
              ))
            )}
          </svg>
          <div className={styles.centerLabel}>
            <span className={styles.centerLabelText}>{active ? active.label : centerLabel}</span>
            {active ? (
              <span className={styles.centerLabelSub}>{active.weightPct}%</span>
            ) : (
              <span className={styles.centerLabelSub}>shared core</span>
            )}
          </div>
        </div>

        <div className={styles.legend}>
          {slices.map((slice, i) => (
            <div
              key={slice.label}
              className={styles.legendItem}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <div className={styles.legendHeader}>
                <span className={styles.legendSwatch} style={{ background: slice.color }} />
                <span className={styles.legendLabel}>{slice.label}</span>
                <span className={styles.legendWeight}>{slice.weightPct}%</span>
              </div>
              {slice.growthComponent || slice.alpha ? (
                <div className={styles.legendDetail}>
                  {slice.growthComponent ? (
                    <span>
                      <span className={styles.legendDetailKey}>Growth:</span> {slice.growthComponent}
                    </span>
                  ) : null}
                  {slice.alpha ? (
                    <span>
                      <span className={styles.legendDetailKey}>Alpha:</span> {slice.alpha}
                    </span>
                  ) : null}
                </div>
              ) : null}
              {slice.environments && slice.environments.length > 0 ? (
                <div className={styles.envTags}>
                  {slice.environments.map((env) => (
                    <span key={env} className={styles.envTag}>
                      {env}
                    </span>
                  ))}
                </div>
              ) : null}
              {slice.description ? <p className={styles.legendDescription}>{slice.description}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
