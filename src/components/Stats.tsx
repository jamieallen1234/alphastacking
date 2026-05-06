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
      /** First line: large mono. Second: category strip (muted). Optional third: faint subline. */
      lines: [string, string] | [string, string, string]
    }
  | {
      id: string
      kind: 'etfCategories'
      title: string
      /** Exactly four lines: `name - name` pairs or a single label on the last line. */
      lines: readonly [string, string, string, string]
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
    kind: 'etfCategories',
    title: 'etfs',
    lines: [
      'long/short - leveraged',
      'return stacked - premia',
      'managed\u00a0futures - factor',
      'global macro - arbitrage',
    ],
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
          ) : s.kind === 'etfCategories' ? (
            <div className={styles.statTripleEtf}>
              <div className={styles.statTripleLine1}>{s.title}</div>
              <div className={styles.etfCategoryLines} aria-label="ETF categories covered on the hub">
                {s.lines.map((line, i) => (
                  <div key={i} className={styles.statTripleLine2}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.statTriple}>
              <div className={styles.statTripleLine1}>{s.lines[0]}</div>
              <div className={styles.statTripleLine2}>{s.lines[1]}</div>
              {s.lines[2] ? <div className={styles.statTripleLine3}>{s.lines[2]}</div> : null}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
