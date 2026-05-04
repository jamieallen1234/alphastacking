/** Slug segments under `/learn/[slug]` and `/ca/learn/[slug]`. */
export const WHAT_IS_ALPHA_SLUG = 'what-is-alpha-stacking'

export const ETF_PAGES_BUILDER_101_SLUG = 'etf-pages-and-portfolio-builder-101'

export const HOW_TO_BUILD_SLUG = 'how-to-build-an-alpha-stacking-portfolio'

export const WHY_ALPHA_STACKING_SLUG = 'why-alpha-stacking'

export const EFFICIENCY_GRADES_SLUG = 'efficiency-grades'

export type LearnArticleMeta = {
  slug: string
  eyebrow: string
  read: string
  title: string
  deck: string
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
  },
  {
    slug: WHY_ALPHA_STACKING_SLUG,
    eyebrow: 'Strategy comparison',
    read: '~7 min read',
    title: 'Why alpha stacking',
    deck: 'How alpha stacking compares to index funds, return stacking, all-weather portfolios, and leveraged ETFs, with a plain language read on when each option tends to fit.',
  },
  {
    slug: ETF_PAGES_BUILDER_101_SLUG,
    eyebrow: 'Site guide',
    read: '~5 min read',
    title: 'ETF pages, model portfolios, and the portfolio builder',
    deck: 'How to read each section of the site and move from ETF research to model weights to builder stress-tests.',
  },
  {
    slug: HOW_TO_BUILD_SLUG,
    eyebrow: 'Portfolio construction',
    read: '~6 min read',
    title: 'How to build an alpha stacking portfolio',
    deck: 'The four sleeve types, how total beta works, and a worked example using the US Alpha Stack model portfolio.',
  },
  {
    slug: EFFICIENCY_GRADES_SLUG,
    eyebrow: 'Reference',
    read: '~5 min read',
    title: 'Capital, Alpha, and Stacked Efficiency grades explained',
    deck: 'What the letter grades on each ETF page measure, how they\u2019re calculated, and what they do not tell you.',
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
