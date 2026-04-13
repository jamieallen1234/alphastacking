import styles from './Stats.module.css'

const stats = [
  { num: '3', suffix: '×', label: 'Sample portfolios tracked' },
  { num: 'US', suffix: ' + CA', label: 'ETF universes covered' },
  { num: '∞', suffix: '', label: 'Alpha layers available' },
]

export default function Stats() {
  return (
    <div className={styles.stats}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <div className={styles.statNum}>
            {s.num}
            {s.suffix && <span>{s.suffix}</span>}
          </div>
          <div className={styles.statLabel}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
