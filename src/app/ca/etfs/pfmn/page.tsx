import EtfPageTemplate from '@/components/EtfPageTemplate'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import { getCachedPfmnChart } from '@/lib/getCachedEtfChart'
import { betaVsSpyDisplay } from '@/lib/etfPageFormat'
import styles from './page.module.css'

export const metadata = {
  title: 'PFMN.TO ETF — Alpha Stacking',
  description:
    'Picton Mahoney Fortified Market Neutral Alternative Fund ETF (PFMN.TO): strategy, Picton pedigree, and regime context.',
}

export default async function PfmnEtfPage() {
  const initialChart = await getCachedPfmnChart('1y')

  return (
    <EtfPageTemplate
      variant="ca"
      hubBase="/ca/etfs"
      hubCategoryId="long-short"
      badge="Long/short"
      heading="PFMN.TO — Picton Mahoney Fortified Market Neutral Alternative Fund ETF"
      lede={
        <>
          PFMN.TO is an actively managed <strong>market-neutral</strong> long/short equity ETF: it aims for{' '}
          <strong>capital appreciation</strong> with <strong>lower volatility</strong> than broad equities and{' '}
          <strong>low correlation</strong> to major stock markets—classic <strong>alternatives</strong> posture in
          a TSX-listed wrapper.
        </>
      }
      meta={{
        ticker: 'PFMN',
        issuerOrManager: 'Picton Mahoney Asset Management',
        issuerRole: 'manager',
        inception: 'July 16, 2019',
        mer: '1.25%',
        aum: '~$58M CAD',
        beta: betaVsSpyDisplay(initialChart),
      }}
      chart={{
        displayLabel: 'PFMN.TO',
        yahooSymbol: 'PFMN.TO',
        payload: initialChart,
      }}
      styles={styles}
    >
      <div className={styles.bodySection}>
        <h2>Strategy</h2>
        <p>
          The fund pursues Picton’s <strong>Fortified</strong> mandate: an actively managed{' '}
          <strong>long</strong> book plus shorts—disclosure allows short exposure up to the regulatory cap on
          aggregate short market value—implemented with equities, derivatives (options, futures, forwards,
          swaps), and related instruments. The objective is{' '}
          <strong>risk-adjusted</strong> returns with muted net <strong>equity beta</strong> to major
          benchmarks: a <strong>hedge-fund-style</strong> sleeve built for diversification beside traditional
          stock and bond allocations.
        </p>
        <p>
          <strong>Market neutral</strong> here means leaning on long/short <strong>risk management</strong>{' '}
          and <strong>portfolio construction</strong> so return comes less from riding one index direction and
          more from <strong>security selection</strong> and relative positioning across sectors and names.
        </p>
      </div>

      <div className={styles.bodySection}>
        <h2>Manager and Issuer Pedigree</h2>
        <p>
          PICTON Investments (formerly Picton Mahoney) has cited low-teens billions CAD in firm assets under
          management in recent issuer communications—confirm the current headline on pictoninvestments.com.{' '}
          <strong>Picton Mahoney Asset Management</strong> is a Canadian <strong>alternatives</strong>-focused
          manager known for institutional <strong>quant</strong> and discretionary processes and the{' '}
          <strong>Authentic Hedge®</strong> / <strong>Fortified</strong> fund franchises—bringing hedge-style
          tools to mutual and ETF wrappers. PFMN sits in that lineage: a listed vehicle for{' '}
          <strong>market-neutral</strong> equity skill rather than passive beta.
        </p>
        <p>
          The firm’s edge is framed as repeatable research, <strong>risk management</strong>, and execution
          at scale—what matters for this product is the same playbook applied in long/short{' '}
          <strong>alpha</strong>{' '}mandates: disciplined sizing, hedging, and ongoing portfolio oversight.
        </p>
      </div>

      <div className={styles.bodySection}>
        <h2>Outperformance</h2>
        <p>
          <strong>Market-neutral</strong> long/short equity tends to show best when{' '}
          <strong>dispersion</strong> is wide—clear winners and losers, leadership rotation, and{' '}
          <strong>factor</strong> spreads—so <strong>security selection</strong> and shorts both have room to
          work while net market exposure stays contained.
        </p>
        <p>
          The richest environments are sustained <strong>two-way</strong> tape and{' '}
          <strong>idiosyncratic</strong> moves at the stock and sector level: that is when a neutral posture
          can compound <strong>relative-value</strong>{' '}
          <strong>alpha</strong> without relying on a single
          directional <strong>beta</strong> bet.
        </p>
      </div>

      <div className={styles.bodySection}>
        <h2>Official ETF page</h2>
        <p>
          Read the official fund materials for holdings, ETF Facts, prospectus, and current fees:{' '}
          <a
            href="https://casl.pictonmahoney.com/en/Solutions/Fortified-Alternative-Funds-Solutions.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Picton Mahoney Fortified Alternative Funds
          </a>{' '}
          (PFMN listed under Fortified Market Neutral).
        </p>
        <EtfPageDisclaimers />
      </div>
    </EtfPageTemplate>
  )
}
