import styles from './Framework.module.css'

const pillars = [
  {
    num: '01',
    title: 'Capital efficiency',
    body: 'Leverage and derivatives inside ETFs let you hold more than one return source on the same dollar — so a diversifying sleeve does not require selling the core.',
  },
  {
    num: '02',
    title: 'Uncorrelated layers',
    body: 'Combine sleeves with edges that appear in different conditions — trend, carry, dispersion, security selection — so the portfolio has a path in bull, bear, and choppy tape, not one macro bet.',
  },
  {
    num: '03',
    title: 'Excess return focus',
    body: 'Target repeatable premia and active skill, not a second slice of the same equity factor. Each sleeve earns its place by contributing returns the core alone cannot produce.',
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
          A portfolio construction approach that combines multiple return sources — equity, managed
          futures, long/short, macro, systematic alternatives — using capital efficiency where it
          clears its hurdle. Where return stacking adds one diversifying beta on top of equity, alpha
          stacking asks which sleeves have genuine independent edges, how they interact, and whether
          the combined book can compound through regimes that each sleeve alone cannot.
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
