export type StrategyLearnTopic = {
  slug: string
  eyebrow: string
  read: string
  title: string
  deck: string
  publishedDate: string
  definition: string
  mechanism: string
  failureMode: string
  alphaStackingRole: string
  selectionNotes: readonly string[]
  etfs: readonly {
    ticker: string
    slug: string
    description: string
  }[]
}

/**
 * Standalone Learn hubs for the strategies that make up an alpha stacking portfolio.
 * Each topic is intentionally distinct from a single-fund ETF page: it explains the
 * strategy, its failure mode, and its job in the broader portfolio.
 */
export const STRATEGY_LEARN_TOPICS: readonly StrategyLearnTopic[] = [
  {
    slug: 'managed-futures',
    eyebrow: 'Strategy guide',
    read: '~5 min read',
    title: 'Managed futures for alpha stacking',
    deck: 'What managed futures are, how trend-following ETFs earn, where they fail, and why a managed-futures sleeve can complement equity in an alpha stacking portfolio.',
    publishedDate: '2026-09-16',
    definition:
      'Managed futures funds use systematic rules to take long and short positions in liquid futures markets, commonly equities, rates, currencies, and commodities. Many are trend followers: they own markets that are rising and short markets that are falling.',
    mechanism:
      'The return source is trend persistence, not a prediction about whether stocks will rise. A fund can profit from a sustained move in Treasury yields, the dollar, energy, or equity indexes. Futures make the strategy capital efficient, but the fund still pays trading, roll, and implementation costs.',
    failureMode:
      'Managed futures struggle in fast reversals and directionless markets. Signals can repeatedly enter just before a trend reverses, leaving the strategy with a sequence of small losses. It is a diversifier, not a guaranteed crash hedge, because a sudden one-day sell-off may arrive before trend signals adapt.',
    alphaStackingRole:
      'In alpha stacking, managed futures are one possible crisis and macro sleeve. They should not be the only non-equity idea in the portfolio. The job is to bring a return stream driven by broad market trends, then pair it with sleeves that earn from different conditions such as dispersion, deal spreads, or relative-value premia.',
    selectionNotes: [
      'Check which markets the fund trades and whether it is a direct trend program or a CTA-replication strategy.',
      'Compare the fund’s trend horizon, fees, tax structure, liquidity, and drawdowns in choppy years.',
      'Do not judge a managed-futures sleeve only by its most recent crisis return.',
    ],
    etfs: [
      { ticker: 'DBMF', slug: 'dbmf', description: 'CTA replication across global futures markets.' },
      { ticker: 'KMLM', slug: 'kmlm', description: 'Systematic trend following across major futures sectors.' },
      { ticker: 'MATE', slug: 'mate', description: 'A return-stacked equity and managed-futures implementation.' },
    ],
  },
  {
    slug: 'long-short-equity',
    eyebrow: 'Strategy guide',
    read: '~5 min read',
    title: 'Long/short equity for alpha stacking',
    deck: 'How long/short equity ETFs seek returns from stock dispersion, where the strategy breaks, and why it can be an alpha sleeve instead of another equity-beta bet.',
    publishedDate: '2026-09-16',
    definition:
      'Long/short equity funds buy stocks they expect to outperform and short stocks they expect to lag. The aim is to earn from the gap between winners and losers, rather than relying solely on the market moving higher.',
    mechanism:
      'A market-neutral or low-net strategy can make money when its long book beats its short book. A net-long strategy also carries some equity beta. The source of return may come from fundamental research, quantitative signals, industry dispersion, or a combination of those inputs.',
    failureMode:
      'The strategy fails when the manager’s longs and shorts move together or the factor behind the selections reverses. Short positions can rise sharply, borrow can become expensive, and a strong index rally can leave a low-net fund behind for years.',
    alphaStackingRole:
      'Long/short equity can supply a dispersion sleeve when markets are choppy and stock selection matters more than index direction. Alpha stacking treats it as a distinct return source, measures its actual equity sensitivity, and avoids counting it twice as both an alpha sleeve and equity exposure.',
    selectionNotes: [
      'Separate net exposure from gross exposure. A 130/30 fund behaves differently from a market-neutral fund.',
      'Read the mandate to understand whether returns rely on one factor, one sector, or broad stock selection.',
      'Review shorting costs, turnover, and the manager’s history through factor reversals.',
    ],
    etfs: [
      { ticker: 'CLSE', slug: 'clse', description: 'A net-long U.S. long/short equity fund.' },
      { ticker: 'ORR', slug: 'orr', description: 'A long/short equity implementation to compare on structure and net beta.' },
    ],
  },
  {
    slug: 'global-macro',
    eyebrow: 'Strategy guide',
    read: '~5 min read',
    title: 'Global macro for alpha stacking',
    deck: 'What global macro funds trade, how macro returns differ from equity beta, where the approach fails, and its role as an alpha stacking sleeve.',
    publishedDate: '2026-09-16',
    definition:
      'Global macro strategies take positions across interest rates, currencies, equity indexes, and commodities in response to economic conditions, policy changes, and relative pricing. Some are discretionary and others use systematic models.',
    mechanism:
      'A macro sleeve can earn from a widening rate gap, a currency trend, a change in inflation expectations, or a divergence between regions. Its opportunity set is broader than a stock portfolio because it can express both long and short views across asset classes.',
    failureMode:
      'Macro views can be early, wrong, or crowded. Central-bank actions and political events can reverse a trade without warning, while a portfolio with several correlated macro views may have far less diversification than it appears to have.',
    alphaStackingRole:
      'Global macro is useful when it brings exposure to economic transitions that a trend or stock-selection sleeve may miss. In alpha stacking it needs a defined risk budget, because broad cross-asset freedom can hide leverage and overlap with the managed-futures sleeve.',
    selectionNotes: [
      'Identify whether the process is discretionary, systematic, or blended, then judge it on that basis.',
      'Look through the holdings for concentration in rates, currencies, or one macro thesis.',
      'Compare drawdowns and equity correlation across more than one market regime.',
    ],
    etfs: [
      { ticker: 'HFGM', slug: 'hfgm', description: 'A listed global-macro sleeve to research by mandate and realized exposures.' },
      { ticker: 'ASGM', slug: 'asgm', description: 'An active global-macro ETF to compare on mandate, risk budget, and cross-asset positioning.' },
    ],
  },
  {
    slug: 'merger-arbitrage',
    eyebrow: 'Strategy guide',
    read: '~5 min read',
    title: 'Merger arbitrage for alpha stacking',
    deck: 'How merger arbitrage earns deal-spread returns, why deals break, and where a merger-arbitrage ETF belongs in an alpha stacking portfolio.',
    publishedDate: '2026-09-16',
    definition:
      'Merger arbitrage invests in announced corporate transactions. A typical trade buys the target company below the agreed takeover price and, in stock deals, may hedge the acquirer. The spread between the market price and the deal price is the potential return if the transaction closes.',
    mechanism:
      'The return source is the deal spread narrowing as time passes and closing risk declines. It is tied to corporate events, financing, shareholder votes, and regulators rather than directly to the direction of the stock market.',
    failureMode:
      'A broken deal can create a large loss in one day. Regulatory objections, financing problems, political scrutiny, and a weaker acquirer can all widen spreads at once. During broad stress, many deal spreads can widen together, so the strategy is not cash-like.',
    alphaStackingRole:
      'Merger arbitrage can add an event-driven sleeve whose return driver differs from trend, macro, and equity beta. Alpha stacking uses it for that distinct source of return, while keeping the position small enough that a cluster of failed deals cannot dominate the portfolio.',
    selectionNotes: [
      'Check how diversified the portfolio is across deals, industries, and regulatory jurisdictions.',
      'Understand whether the manager hedges stock consideration and how it handles deal breaks.',
      'Treat yield as compensation for event risk, not as a bond substitute.',
    ],
    etfs: [
      { ticker: 'MRGR', slug: 'mrgr', description: 'A merger-arbitrage ETF focused on announced transactions.' },
      { ticker: 'ARB', slug: 'arb', description: 'A Canadian-listed merger-arbitrage ETF for Canadian investors to compare.' },
    ],
  },
  {
    slug: 'factor-investing',
    eyebrow: 'Strategy guide',
    read: '~5 min read',
    title: 'Factor investing for alpha stacking',
    deck: 'What factor investing is, why value, momentum, quality, and size can lag for years, and how factor ETFs fit within an alpha stacking portfolio.',
    publishedDate: '2026-09-16',
    definition:
      'Factor investing tilts a portfolio toward characteristics such as value, momentum, quality, profitability, or smaller-company size. The goal is to capture a return premium that has appeared across many securities and periods, rather than pick individual winners.',
    mechanism:
      'A factor fund holds a rules-based basket that overweights stocks with its chosen traits. It usually remains an equity investment, so its return is a combination of broad market beta and the factor tilt. The factor component may add to or subtract from the market return for long stretches.',
    failureMode:
      'Factors can underperform for years, and the definitions behind the label vary widely by fund. Value can stay cheap, momentum can reverse abruptly, and quality can become expensive. A factor premium is not a smooth income stream.',
    alphaStackingRole:
      'Factor investing can improve the equity sleeve of an alpha stacking portfolio, but it is not automatically an independent alpha sleeve. A factor ETF still moves substantially with stocks. The framework separates that equity beta from genuinely different return drivers such as trend or merger arbitrage.',
    selectionNotes: [
      'Read the index rules. Two funds with the same factor label may hold very different portfolios.',
      'Measure the fund’s market beta before treating its return as a diversifier.',
      'Use a factor tilt because you can hold it through a full cycle, not because it recently led the market.',
    ],
    etfs: [
      { ticker: 'AVUV', slug: 'avuv', description: 'A U.S. small-cap value ETF with an active factor implementation.' },
      { ticker: 'SPMO', slug: 'spmo', description: 'An S&P 500 momentum ETF to evaluate as an equity tilt.' },
      { ticker: 'FMTM', slug: 'fmtm', description: 'A multi-factor equity ETF to compare with single-factor approaches.' },
    ],
  },
  {
    slug: 'risk-premia',
    eyebrow: 'Strategy guide',
    read: '~5 min read',
    title: 'Risk premia for alpha stacking',
    deck: 'What risk premia are, how carry and relative-value strategies earn, why the premium can reverse, and how to judge a risk-premia ETF in an alpha stacking portfolio.',
    publishedDate: '2026-09-16',
    definition:
      'Risk premia are returns earned for bearing a recurring, identifiable risk. In liquid markets, examples include value, momentum, carry, defensive equity, and relative-value strategies. A systematic fund can combine several of these in one sleeve.',
    mechanism:
      'The strategy takes rules-based long and short positions designed to collect compensation for providing liquidity, holding an unpopular asset, or accepting exposure that other investors avoid. The result can be less tied to equity direction than a stock fund, but it is never risk-free.',
    failureMode:
      'Premia can become crowded and then reverse together. Carry often earns quietly and can lose sharply when volatility jumps. The label also hides major implementation differences, including leverage, rebalance frequency, and how the fund limits losses.',
    alphaStackingRole:
      'A diversified risk-premia sleeve can add several modest return drivers to an alpha stacking portfolio. It earns its place only if its realized exposure is distinct from the other sleeves and its expected premium is large enough to justify fees, leverage, and crisis behavior.',
    selectionNotes: [
      'Identify the actual premia in the fund rather than relying on the marketing label.',
      'Look for concentration in carry or short-volatility exposure, which can dominate a portfolio during stress.',
      'Compare the strategy’s worst historical periods with the other sleeves you already own.',
    ],
    etfs: [
      { ticker: 'FLSP', slug: 'flsp', description: 'A systematic style-premia ETF spanning multiple markets.' },
      { ticker: 'IALT', slug: 'ialt', description: 'A multi-strategy systematic-alternatives ETF combining strategic premia with macro and market-neutral sleeves.' },
    ],
  },
  {
    slug: 'leveraged-etfs',
    eyebrow: 'Strategy guide',
    read: '~5 min read',
    title: 'Leveraged ETFs (LETFs) in alpha stacking',
    deck: 'How leveraged ETFs reset daily, why their path matters, and how Alpha Stacking uses LETFs as an equity-capital tool rather than a standalone portfolio.',
    publishedDate: '2026-09-16',
    definition:
      'Leveraged ETFs, often called LETFs, target a multiple of an index’s daily return. A 2x S&P 500 ETF seeks roughly twice the index’s move for that day, then resets its exposure before the next session.',
    mechanism:
      'The daily reset means long-run results depend on the path of returns, not only where the index starts and finishes. In a persistent uptrend, leverage can compound strongly. In a volatile sideways market, repeated gains and losses can create volatility drag.',
    failureMode:
      'LETFs magnify drawdowns. A large loss requires a much larger gain to recover, and volatile markets can erode value even if the index ends near its starting point. They are not a shortcut to a permanent multiple of an index’s multi-year return.',
    alphaStackingRole:
      'Alpha stacking can use a smaller allocation to a leveraged equity ETF to preserve a chosen level of equity beta while freeing capital for independent sleeves. That only works when the total portfolio beta, leverage, and drawdown risk are measured across every holding, not when a LETF is treated as a complete portfolio.',
    selectionNotes: [
      'Match the daily leverage multiple to the total equity beta you intend to carry.',
      'Review the fund’s index, fee, liquidity, and behavior in prolonged drawdowns and volatile ranges.',
      'Set a rebalancing rule before volatility forces an emotional decision.',
    ],
    etfs: [
      { ticker: 'SSO', slug: 'sso', description: 'A 2x daily S&P 500 ETF often used as an equity-capital tool.' },
      { ticker: 'UPRO', slug: 'upro', description: 'A 3x daily S&P 500 ETF with substantially higher path risk.' },
      { ticker: 'QLD', slug: 'qld', description: 'A 2x daily Nasdaq-100 ETF with concentrated growth exposure.' },
    ],
  },
]

export function getStrategyLearnTopic(slug: string): StrategyLearnTopic | undefined {
  return STRATEGY_LEARN_TOPICS.find((topic) => topic.slug === slug)
}
