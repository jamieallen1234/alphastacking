/** Slug segments under `/learn/[slug]` and `/ca/learn/[slug]`. */
export const RETURN_STACKING_VS_ALPHA_SLUG = 'return-stacking-vs-alpha-stacking'

export function learnArticlePath(isCa: boolean, slug: string): string {
  return isCa ? `/ca/learn/${slug}` : `/learn/${slug}`
}
