import Link from 'next/link'
import { portfoliosPath, learnPath } from '@/lib/siteRegion'
import styles from './LearnArticle.module.css'

export default function WhyAlphaStackingArticle({ edition }: { edition: 'us' | 'ca' }) {
  const isCa = edition === 'ca'
  const portfoliosHref = portfoliosPath(isCa)
  const learnHref = learnPath(isCa)

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.headerRow}>
          <span className={styles.eyebrow}>Strategy comparison</span>
          <span className={styles.readTime}>~7 min read</span>
        </div>
        <h1 className={styles.title}>Why alpha stacking — and when it might not be right for you</h1>
        <p className={styles.deck}>
          Alpha stacking isn&apos;t better than every alternative in every environment. This article compares
          it honestly to six common approaches — index funds, mutual funds, return stacking, all-weather
          portfolios, leveraged ETFs, and covered-call / options-income funds — with a section on when each
          one wins.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="s1">
        <h2 id="s1" className={styles.sectionTitle}>
          vs. index funds
        </h2>
        <p className={styles.body}>
          Index funds are the default recommendation for most investors, and the case for them is strong: low
          cost, full equity exposure, no manager risk, and decades of historical evidence. The S&amp;P 500
          beats the majority of actively managed funds over 10+ year periods. For a long-horizon investor
          who can hold through drawdowns, an index fund is hard to argue against.
        </p>
        <p className={styles.body}>
          Alpha stacking is competitive when an investor is closer to spending their portfolio, has a shorter
          horizon, or finds the psychological cost of drawdowns genuinely problematic. A portfolio that
          earned 10% annually instead of 8% but with a 25% maximum drawdown instead of 50% is more valuable
          than the absolute return numbers alone suggest — a smaller drawdown is easier to stay invested
          through.
        </p>
        <p className={styles.body}>
          <strong>Index funds win when:</strong> you have decades, can hold through anything, and want the
          lowest possible cost and complexity.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when:</strong> consistent compounding matters more than maximum
          long-run return — whether because of time horizon, sequence-of-returns risk, or risk tolerance.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s2">
        <h2 id="s2" className={styles.sectionTitle}>
          vs. mutual funds and active management
        </h2>
        <p className={styles.body}>
          Most actively managed mutual funds underperform their benchmark index over time, after fees.
          That&apos;s a well-documented fact across most asset classes and geographies. High expense ratios
          (often 1–2% per year) compound against you the same way alpha compounds for you.
        </p>
        <p className={styles.body}>
          The diversifying sleeves in an alpha stack (managed futures, long/short equity, macro) are also
          forms of active management — they just operate in areas where there is structural evidence for
          persistent premia: trend exists because of behavioral and momentum effects; long/short
          generates returns from dispersion; merger arb exploits a structural spread between announcement
          price and deal close. These are more systematically grounded than stock-picking.
        </p>
        <p className={styles.body}>
          <strong>Mutual funds win when:</strong> a specific fund with a demonstrated edge and reasonable
          fee structure fits a gap that ETFs don&apos;t fill.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when:</strong> systematic, fee-conscious construction beats paying
          high management fees for undifferentiated active management.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s3">
        <h2 id="s3" className={styles.sectionTitle}>
          vs. return stacking
        </h2>
        <p className={styles.body}>
          Return stacking is the technique that makes alpha stacking possible — it&apos;s how you hold
          multiple return sources without selling equity. But a return-stacked fund by itself isn&apos;t the
          same as an alpha stacking portfolio. Most return-stacked funds layer one thing on top of equity
          beta — your exposure to the stock market — (usually trend or bonds) and let you own it in one ticker.
        </p>
        <p className={styles.body}>
          The issue: with one stacked fund, the equity sleeve dominates. If managed futures goes flat for
          three years (as trend strategies sometimes do), the portfolio just looks like expensive SPY. Alpha
          stacking uses multiple diversifying sleeves with genuinely different return profiles — trend,
          long/short, macro, merger arb — so no single sleeve going quiet kills the thesis.
        </p>
        <p className={styles.body}>
          <strong>A single return-stacked fund wins when:</strong> simplicity is the priority, you
          want a single holding that&apos;s better than SPY alone, and you understand that you still have
          primarily equity exposure.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when:</strong> you want multiple genuinely independent return
          engines and are willing to manage a multi-sleeve portfolio to get them.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s4">
        <h2 id="s4" className={styles.sectionTitle}>
          vs. all-weather portfolios
        </h2>
        <p className={styles.body}>
          All-weather portfolios (Ray Dalio&apos;s original, and derivatives like the permanent portfolio)
          hold equities, long bonds, gold, and sometimes commodities in proportions designed so something
          is working in every economic regime: growth, recession, inflation, deflation. The idea is that
          you don&apos;t need to predict the environment — you&apos;re covered regardless.
        </p>
        <p className={styles.body}>
          The trade-off is return. All-weather portfolios hold a lot of bonds and gold relative to equity,
          and bonds have dragged for extended periods (2022 was the worst year for long bonds in a
          generation). Gold provides crisis insurance but earns close to nothing in real terms over long
          periods. The low equity weight means these portfolios often trail the S&amp;P 500 significantly
          in bull markets.
        </p>
        <p className={styles.body}>
          <strong>All-weather wins when:</strong> extreme downside protection matters more than growth,
          or an investor cannot tolerate any significant drawdown and is willing to give up most of the
          upside to get that protection.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when:</strong> the goal is equity-like long-run returns with
          better drawdown management — not sacrificing most of the upside to limit the downside.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s5">
        <h2 id="s5" className={styles.sectionTitle}>
          vs. leveraged ETFs alone
        </h2>
        <p className={styles.body}>
          Holding a 2× or 3× leveraged ETF like SSO or UPRO in isolation captures more upside than the
          S&amp;P 500 in bull markets — and correspondingly more downside in bear markets. UPRO fell
          over 70% in 2022. That&apos;s the drawdown investors who held UPRO alone had to survive to
          participate in the recovery.
        </p>
        <p className={styles.body}>
          Leveraged ETFs also have daily-reset mechanics that cause volatility drag over time: a fund
          that goes down 10% and then up 10% doesn&apos;t break even, it ends about 1% below where it
          started. In choppy, sideways markets this compounds against you. LETFs work best in sustained,
          low-volatility uptrends — and they require strong conviction that you won&apos;t sell during
          a major drawdown.
        </p>
        <p className={styles.body}>
          Alpha stacking uses leveraged ETFs as a component — as the equity engine — but sizes them
          alongside uncorrelated sleeves that can earn when equity is falling or going sideways. This
          doesn&apos;t eliminate LETF-related risk, but it reduces the concentration in a single
          instrument.
        </p>
        <p className={styles.body}>
          <strong>LETFs alone win when:</strong> you have a very long horizon, extremely high drawdown
          tolerance, and conviction that equity bull markets will continue for your holding period.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when:</strong> you want the return-boosting benefits of leverage
          without concentrating all your risk in one levered equity bet.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s6">
        <h2 id="s6" className={styles.sectionTitle}>
          vs. covered call and options-income ETFs
        </h2>
        <p className={styles.body}>
          Covered-call and similar options-income funds sell upside on the underlying (or on a proxy) in
          exchange for premium that gets paid out as distributions. That trade is structurally friendly to
          yield and to sideways markets — but in strong bull markets you keep giving away the top of the
          return distribution. Over long horizons, categories such as equity covered-call ETFs have often
          lagged simply holding the same equity exposure without that overlay, sometimes by a wide margin
          after a multi-year rally.
        </p>
        <p className={styles.body}>
          Alpha stacking here is built around return sources that aim to diversify equity path risk
          (trend, macro, long/short, merger arb) rather than to manufacture income by shorting convexity on
          the core beta sleeve. We do not feature options-overlay yield products on the hub for that reason.
        </p>
        <p className={styles.body}>
          <strong>Covered-call / options-income funds win when:</strong> you prioritize predictable cash flow
          and are willing to accept lower long-run total return than the underlying for it.
        </p>
        <p className={styles.body}>
          <strong>Alpha stacking wins when:</strong> you want sleeves designed for diversification and
          compounding, not for selling upside on the equity stack to fund distributions.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="s7">
        <h2 id="s7" className={styles.sectionTitle}>
          An honest closing
        </h2>
        <p className={styles.body}>
          For many investors, a simple index fund is the right answer. It requires no ongoing attention,
          has almost no cost, and has a strong long-run track record. Anyone who adds complexity to their
          portfolio needs a reason for that complexity — a genuine improvement in expected return,
          drawdown profile, or risk-adjusted return that the simpler approach doesn&apos;t provide.
        </p>
        <p className={styles.body}>
          Alpha stacking makes sense when you believe that combining genuinely independent return sources
          can produce better compounding than equity alone, and you&apos;re willing to manage a
          multi-sleeve portfolio to get it. It is not a guaranteed outperformance machine. The alternative
          sleeves can underperform for years. The leverage amplifies mistakes. And no backtest captures
          the full range of things that can go wrong.
        </p>
        <p className={styles.body}>
          The best portfolio is one you can understand, believe in, and stay invested in through a
          difficult stretch. Make sure yours is.
        </p>
      </section>

      <div className={styles.ctaRow}>
        <Link href={portfoliosHref} className={styles.cta}>
          View model portfolios →
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
