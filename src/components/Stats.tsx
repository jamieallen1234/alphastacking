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
    label: 'Alpha generating portfolios',
  },
  {
    id: 'etf-stack',
    kind: 'triple',
    lines: ['ETFs', 'Beyond return stacking', 'Hedge fund like strategies for all'],
  },
  {
    id: 'research',
    kind: 'simple',
    num: '∞',
    label: 'Research alpha stacking ETF universe to discover infinite possibilities',
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
