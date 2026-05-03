import Link from 'next/link'
import { usEtfHubPath, learnPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function EfficiencyGradesArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const etfHref = usEtfHubPath(isCa)
  const learnHref = learnPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Reference</span>
          <span className={styles.readTime}>~5 min read</span>
        </div>
        <h1 className={styles.title}>Capital, Alpha, and Stacked Efficiency grades explained</h1>
        <p className={styles.deck}>
          Each ETF page shows one or two letter grades — Capital Efficiency, Alpha Efficiency, or both.
          This article explains what each grade measures, how it&apos;s calculated, and what it
          doesn&apos;t tell you.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          Why two grades instead of one
        </h2>
        <p className={styles.body}>
          ETFs on this site play different roles. Some provide equity exposure — they&apos;re the core
          engine. Others provide diversifying return that doesn&apos;t depend on whether stocks go up.
          Grading both on the same scale misses the point.
        </p>
        <p className={styles.body}>
          <strong>Capital Efficiency</strong> applies to equity-side ETFs: standard index funds, leveraged
          ETFs, and long/short equity funds. It answers the question: how much equity return does this
          ETF deliver per dollar of capital, compared to just holding SPY?
        </p>
        <p className={styles.body}>
          <strong>Alpha Efficiency</strong> applies to alpha-side ETFs: managed futures, merger arbitrage,
          systematic alternatives, global macro. It answers a different question: how much does this sleeve
          earn above its own cost of capital, independent of equity markets?
        </p>
        <p className={styles.body}>
          Some ETFs — called stacked ETFs — hold both an equity sleeve and an alpha sleeve inside a single
          fund. MATE and RSST, for example, hold roughly 100% equity and 100% managed futures
          simultaneously on the same dollar of capital. These get <strong>both grades</strong> — one for each
          sleeve.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          Capital Efficiency: how it works
        </h2>
        <p className={styles.body}>
          The baseline is SPY. If an ETF delivers exactly what SPY delivers, it earns a <strong>B</strong>.
          Better than SPY earns an A or A+; worse earns a C or D.
        </p>
        <p className={styles.body}>
          Three things go into the score:
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Excess return</span>
            <p className={styles.principleText}>
              How much more (or less) this ETF has returned annually vs SPY over the same period — up to
              five years of live history.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Capital freed</span>
            <p className={styles.principleText}>
              A leveraged ETF with 2× exposure (like SSO) delivers the same equity position as SPY on
              half the capital. That frees the other half for diversifying sleeves. This capital liberation
              is credited in the score. SPY frees nothing (it uses all your capital to deliver 1× equity),
              so its capital-freed contribution is zero.
            </p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>Leverage cost</span>
            <p className={styles.principleText}>
              Leveraged ETFs have embedded borrowing costs — the expense ratio plus a spread above what
              SPY pays. SSO costs roughly 0.5% per year more to run than SPY, and UPRO roughly 1–1.5%
              more. This cost is subtracted from the score.
            </p>
          </div>
        </div>
        <p className={styles.body}>
          An A+ grade (like UPRO) means the fund frees two-thirds of your capital for other sleeves and
          its historical excess return has more than covered borrowing costs. A B means SPY-equivalent.
          C or D means high costs, poor return, or both.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          Alpha Efficiency: how it works
        </h2>
        <p className={styles.body}>
          The baseline for Alpha Efficiency is the risk-free rate — roughly what you&apos;d earn sitting
          in T-bills. An alpha sleeve that earns nothing above T-bills is expensive complexity. One that
          earns meaningfully above T-bills is doing its job.
        </p>
        <p className={styles.body}>
          For stacked ETF alpha sleeves (like the managed futures sleeve inside MATE), the hurdle is
          slightly higher: the risk-free rate plus the borrowing cost of running a futures overlay,
          typically around 1.5–2% per year. The sleeve needs to clear that full cost before it&apos;s
          adding value.
        </p>
        <p className={styles.body}>
          A grade of <strong>A</strong> means the sleeve has meaningfully cleared its cost — it&apos;s
          returning 4–8% per year above the hurdle rate. A <strong>B</strong> means it&apos;s covering
          costs with a thin margin. A <strong>C</strong> means it&apos;s roughly break-even. A{' '}
          <strong>D</strong> means it&apos;s not clearing its cost of capital.
        </p>
        <p className={styles.body}>
          Low market sensitivity gets a bonus in the Alpha Efficiency formula — a fund that earns its
          return with near-zero correlation to equity is more valuable as a diversifier than one that
          earns the same return but moves with the market.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          What the grades don&apos;t tell you
        </h2>
        <p className={styles.body}>
          Grades are based on historical returns — typically one to five years of live NAV data. They
          capture what happened. An A+ today could have a rough next three years; a C might be early
          in a recovery.
        </p>
        <p className={styles.body}>
          They don&apos;t measure whether a strategy has a structural reason to earn (that&apos;s in the
          ETF write-up), whether a fund is appropriate for your portfolio, or how funds interact with
          each other. A D-grade alpha fund might still be a useful tail-risk hedge. Two B-grade funds
          with genuinely different return profiles can combine better than two A-grade funds that move
          together.
        </p>
        <p className={styles.body}>
          Think of grades as a filter, not a ranking. They screen out funds that look interesting but
          have delivered poorly relative to their cost. They don&apos;t replace reading the write-ups.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s5">
        <h2 id="s5" className={styles.sectionTitle}>
          N/A and provisional grades
        </h2>
        <p className={styles.body}>
          Funds with less than four months of live history show N/A. Grades need enough data to mean
          something.
        </p>
        <p className={styles.body}>
          Funds with four to eleven months show a calculated grade marked provisional — the period is
          too short to have tested the fund across different market conditions. Grades become standard
          after a full year of history. They&apos;re recalculated each January using data through
          December.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={etfHref} className={styles.cta}>
          Browse ETFs →
        </Link>
      </div>

      <Link href={learnHref} className={styles.back}>
        ← All Learn articles
      </Link>

      <p className={styles.legal}>
        Educational content only — not investment advice, not a recommendation to buy or sell any security. Past
        performance does not guarantee future results. Leveraged and alternative funds involve substantial risk.
      </p>
    </article>
  )
}
