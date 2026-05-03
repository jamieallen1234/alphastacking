/** Slug segments under `/learn/[slug]` and `/ca/learn/[slug]`. */
export const WHAT_IS_ALPHA_SLUG = 'what-is-alpha-stacking'

export const ETF_PAGES_BUILDER_101_SLUG = 'etf-pages-and-portfolio-builder-101'

export const HOW_TO_BUILD_SLUG = 'how-to-build-an-alpha-stacking-portfolio'

export const WHY_ALPHA_STACKING_SLUG = 'why-alpha-stacking'

export const EFFICIENCY_GRADES_SLUG = 'efficiency-grades'

export function learnArticlePath(isCa: boolean, slug: string): string {
  return isCa ? `/ca/learn/${slug}` : `/learn/${slug}`
}
