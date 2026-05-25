/** Slug segments under `/learn/[slug]` and `/ca/learn/[slug]`. */
export const WHAT_IS_ALPHA_SLUG = 'what-is-alpha-stacking'

export const MARKET_ENVIRONMENTS_SLUG = 'market-environments'

export const RETURN_STACKING_EXPLAINED_SLUG = 'return-stacking-explained'

export const ETF_PAGES_BUILDER_101_SLUG = 'etf-pages-and-portfolio-builder-101'

export const HOW_TO_BUILD_SLUG = 'how-to-build-an-alpha-stacking-portfolio'

export const WHY_ALPHA_STACKING_SLUG = 'why-alpha-stacking'

export const EFFICIENCY_GRADES_SLUG = 'efficiency-grades'

export const PORTFOLIO_SCORE_SLUG = 'portfolio-score'

export type LearnArticleMeta = {
  slug: string
  eyebrow: string
  read: string
  title: string
  deck: string
  publishedDate: string
}

/**
 * Order matches the suggested novice path: concepts → motivation → site guide → construction → reference.
 */
export const LEARN_ARTICLES: LearnArticleMeta[] = [
  {
    slug: WHAT_IS_ALPHA_SLUG,
    eyebrow: 'Concepts',
    read: '~3 min read',
    title: 'What is alpha stacking',
    deck: 'Equity plus return sources that earn when stocks don\u2019t. What the strategy is, how capital efficiency makes it possible, and definitions of the key terms.',
    publishedDate: '2026-04-19',
  },
  {
    slug: RETURN_STACKING_EXPLAINED_SLUG,
    eyebrow: 'Concepts',
    read: '~3 min read',
    title: 'Return stacking explained',
    deck: 'Leverage that holds two exposures on the same dollar without selling one to make room. The main ratios, what carry drag actually costs, and when the math breaks down.',
    publishedDate: '2026-05-21',
  },
  {
    slug: WHY_ALPHA_STACKING_SLUG,
    eyebrow: 'Strategy comparison',
    read: '~7 min read',
    title: 'Why alpha stacking',
    deck: 'How alpha stacking compares to index funds, return stacking, all-weather portfolios, and leveraged ETFs, with a plain language read on when each option tends to fit.',
    publishedDate: '2026-04-19',
  },
  {
    slug: MARKET_ENVIRONMENTS_SLUG,
    eyebrow: 'Concepts',
    read: '~5 min read',
    title: 'Five market environments',
    deck: 'What growth, inflation, recession, deflation, and choppy markets look like on a chart, and why a portfolio that only thrives in one of them is a fragile portfolio.',
    publishedDate: '2026-05-25',
  },
  {
    slug: ETF_PAGES_BUILDER_101_SLUG,
    eyebrow: 'Site guide',
    read: '~5 min read',
    title: 'ETF pages, model portfolios, and the portfolio builder',
    deck: 'How to read each section of the site and move from ETF research to model weights to builder stress-tests.',
    publishedDate: '2026-04-19',
  },
  {
    slug: HOW_TO_BUILD_SLUG,
    eyebrow: 'Portfolio construction',
    read: '~6 min read',
    title: 'How to build an alpha stacking portfolio',
    deck: 'The four sleeve types, how total beta works, and a worked example using the US Alpha Stack model portfolio.',
    publishedDate: '2026-04-19',
  },
  {
    slug: EFFICIENCY_GRADES_SLUG,
    eyebrow: 'Reference',
    read: '~5 min read',
    title: 'Capital, Alpha, and Stacked Efficiency grades explained',
    deck: 'What the letter grades on each ETF page measure, how they\u2019re calculated, and what they do not tell you.',
    publishedDate: '2026-04-25',
  },
  {
    slug: PORTFOLIO_SCORE_SLUG,
    eyebrow: 'Reference',
    read: '~3 min read',
    title: 'How portfolio scores work',
    deck: 'What the A/B/C grade on each portfolio means, how it is calculated, and what it does not tell you.',
    publishedDate: '2026-05-25',
  },
]

export function learnArticlePath(isCa: boolean, slug: string): string {
  return isCa ? `/ca/learn/${slug}` : `/learn/${slug}`
}

export function getLearnArticleNeighbors(slug: string): {
  prev: LearnArticleMeta | null
  next: LearnArticleMeta | null
} {
  const i = LEARN_ARTICLES.findIndex((a) => a.slug === slug)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: i > 0 ? LEARN_ARTICLES[i - 1]! : null,
    next: i < LEARN_ARTICLES.length - 1 ? LEARN_ARTICLES[i + 1]! : null,
  }
}
