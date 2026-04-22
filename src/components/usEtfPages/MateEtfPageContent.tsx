import EtfPageTemplate from '@/components/EtfPageTemplate'
import EtfPageDisclaimers from '@/components/EtfPageDisclaimers'
import { getCachedMateChart } from '@/lib/getCachedEtfChart'
import { betaVsSpyDisplay } from '@/lib/etfPageFormat'
import type { UsEtfHubBase } from '@/lib/usEtfHubBase'
import {
  MATE_ALPHA_EFFICIENCY_TOOLTIP,
  MATE_CAPITAL_EFFICIENCY_TOOLTIP,
  MATE_EFFICIENCY_FOOTNOTE,
} from '@/components/usEtfPages/mateEfficiencyCopy'
import {
  EtfEfficiencyMetaExtras,
  EtfEfficiencyPageFootnotes,
} from '@/components/etfEfficiency/EtfEfficiencyGrades'
import styles from '@/app/us-etfs/mate/page.module.css'

export default async function MateEtfPageContent({ hubBase }: { hubBase: UsEtfHubBase }) {
  const mateChart = await getCachedMateChart('1y')

  return (
    <EtfPageTemplate
      variant="us"
      hubBase={hubBase}
      hubCategoryId="return-stacked-ge-2x"
      badge="Return Stacked - 2x"
      heading="MATE — Man Active Trend Enhanced ETF"
      lede={
        <>
          MATE is return-stacked: <strong>100% S&amp;P 500</strong> notional exposure alongside{' '}
          <strong>100%</strong> trend-following <strong>managed futures</strong>—core large-cap U.S.
          equity beta plus a diversifying macro sleeve in one fund.
        </>
      }
      meta={{
        ticker: 'MATE',
        issuerOrManager: 'Man Group',
        inception: 'Dec 16, 2025',
        mer: '0.97%',
        aum: '~$37M',
        beta: betaVsSpyDisplay(mateChart),
      }}
      metaExtras={
        <EtfEfficiencyMetaExtras
          lines={[
            {
              label: 'Capital Efficiency:',
              grade: 'A+',
              tooltip: MATE_CAPITAL_EFFICIENCY_TOOLTIP,
            },
            {
              label: 'Alpha Efficiency:',
              grade: 'B+',
              tooltip: MATE_ALPHA_EFFICIENCY_TOOLTIP,
            },
          ]}
        />
      }
      chart={{ displayLabel: 'MATE', yahooSymbol: 'MATE', payload: mateChart }}
      styles={styles}
    >
      <div className={styles.bodySection}>
        <h2>Strategy</h2>
        <p>
          Fund disclosures describe that design: <strong>100% S&amp;P 500</strong> equity exposure
          paired with <strong>100%</strong> <strong>managed futures</strong>—trend-following across
          equities, rates, currencies, and commodities via derivatives. Collateral and cash management
          typically sit in Treasuries and cash equivalents.
        </p>
        <p>
          In plain terms: full notional S&amp;P 500 equity exposure sits alongside a full notional
          managed-futures book—cash-efficient implementation, not an either/or trade-off between the two
          engines.
        </p>
      </div>

      <div className={styles.bodySection}>
        <h2>Manager and Issuer Pedigree</h2>
        <p>
          Man Group is among the world’s largest publicly traded alternatives managers — often described
          as the biggest listed hedge fund–style firm — with group assets under management of about
          $227.6 billion as at Dec. 31, 2025 (year-end results announcement). The firm runs systematic quant
          (including Man AHL and Man Numeric),
          discretionary, and multi-asset capabilities across public and private markets, with the explicit
          aim of delivering differentiated performance and risk-adjusted outcomes for clients.
        </p>
        <p>
          Alpha at Man is pursued through research-intensive, institutional-caliber processes: factor and
          trend models, portfolio construction, and execution at scale — not a single gimmick, but a
          business built to compound skill across regimes. For MATE, that backdrop matters: the
          managed-futures sleeve sits inside an organization whose core job is generating excess return
          for clients, not just packaging beta.
        </p>
      </div>

      <div className={styles.bodySection}>
        <h2>Outperformance</h2>
        <p>
          The first sleeve targets <strong>S&amp;P 500</strong> beta; incremental edge vs. that benchmark
          comes from the <strong>managed-futures</strong> stack. Trend-following tends to shine when large,
          persistent trends run across macro: directional rate cycles, commodity runs, major FX moves, or
          equity stress—environments where the second sleeve can diverge from plain large-cap beta.
        </p>
        <p>
          Man frames trend-following as historically additive in those regimes—including prolonged equity
          drawdowns—when the futures book has room to earn while the equity sleeve tracks its core exposure.
        </p>
      </div>

      <div className={styles.bodySection}>
        <h2>Official ETF page</h2>
        <p>
          Read the official ETF page for current NAV, premium/discount, holdings, and documents:{' '}
          <a
            href="https://www.man.com/products/man-active-trend-enhanced-etf"
            target="_blank"
            rel="noopener noreferrer"
          >
            MATE official page
          </a>
          .
        </p>
        <EtfPageDisclaimers />
      </div>

      <EtfEfficiencyPageFootnotes paragraphs={[MATE_EFFICIENCY_FOOTNOTE]} />
    </EtfPageTemplate>
  )
}
