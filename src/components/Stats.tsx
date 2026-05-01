import styles from './Stats.module.css'

type StatItem =
  | {
      id: string
      kind: 'simple'
      num: string
      suffix?: string
      label: string
    }
  | {
      id: string
      kind: 'triple'
      lines: [string, string, string]
    }

const STATS: StatItem[] = [
  {
    id: 'alpha-gen',
    kind: 'simple',
    num: 'α',
    label: 'Model portfolios with live return charts',
  },
  {
    id: 'etf-stack',
    kind: 'triple',
    lines: ['ETFs only', 'Multiple return sources', 'Listed — no private funds'],
  },
  {
    id: 'research',
    kind: 'simple',
    num: '∞',
    label: 'ETF universe to research, grade, and combine',
  },
]

export default function Stats() {
  return (
    <div className={styles.stats}>
      {STATS.map((s) => (
        <div key={s.id} className={styles.stat}>
          {s.kind === 'simple' ? (
            <>
              <div className={styles.statNum}>
                {s.num}
                {s.suffix ? <span>{s.suffix}</span> : null}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </>
          ) : (
            <div className={styles.statTriple}>
              <div className={styles.statTripleLine1}>{s.lines[0]}</div>
              <div className={styles.statTripleLine2}>{s.lines[1]}</div>
              <div className={styles.statTripleLine3}>{s.lines[2]}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
