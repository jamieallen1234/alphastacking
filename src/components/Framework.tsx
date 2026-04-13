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
    body: 'Stack strategies with low correlation — managed futures, long/short equity, global macro — so each layer adds return without proportional risk.',
  },
  {
    num: '03',
    title: 'Excess return focus',
    body: 'Target alpha specifically — not just beta — through factor premia, active strategies, and return-stacked ETFs available to any retail investor.',
  },
]

export default function Framework() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>The framework</div>
      <h2 className={styles.heading}>Beyond return stacking</h2>

      <div className={styles.definition}>
        <div className={styles.definitionTerm}>Alpha Stacking — coined 2025</div>
        <p>
          An investment framework that deploys capital efficiency and leverage to
          layer multiple sources of excess return on top of a core portfolio,
          without proportionally increasing capital at risk. Where return stacking
          combines uncorrelated betas, alpha stacking goes further — using borrowed
          or synthetic exposure to access strategy premia, factor tilts, and active
          returns that would otherwise require displacing existing holdings.
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
