import styles from './Framework.module.css'

const pillars = [
  {
    num: '01',
    title: 'Capital efficiency',
    body: 'Use leverage and derivatives to access more return per dollar deployed — freeing capital to compound across multiple strategies simultaneously.',
  },
  {
    num: '02',
    title: 'Uncorrelated layers',
    body: 'Combine sleeves whose edges tend to appear in different conditions—trend, carry, dispersion, security selection—so the stack has a plausible path in bull, bear, and choppy tape, not just one macro bet.',
  },
  {
    num: '03',
    title: 'Excess return focus',
    body: 'Target repeatable premia and active skill, not a second slice of the same equity factor. Use capital efficiency so those sleeves sit alongside a core instead of crowding each other out.',
  },
]

export default function Framework() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>The framework</div>
      <h2 className={styles.heading}>Beyond return stacking</h2>

      <div className={styles.definition}>
        <div className={styles.definitionTerm}>Alpha Stacking</div>
        <p>
          An investment framework that takes the best parts of different proven strategies and
          combines them in synergistic ways—using capital efficiency, leverage, and derivatives only
          where they fit—so the combined book can aim to outperform in varied environments: bull,
          bear, and sideways or choppy markets. Where return stacking layers uncorrelated betas, alpha
          stacking emphasizes sleeves with distinct return drivers that reinforce the whole without
          forcing you to sell down the core to add each idea.
        </p>
      </div>

      <div className={styles.pillars}>
        {pillars.map((p) => (
          <div key={p.num} className={styles.pillar}>
            <div className={styles.pillarNum}>{p.num}</div>
            <h3 className={styles.pillarTitle}>{p.title}</h3>
            <p className={styles.pillarBody}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
