/** Cookie set when user picks US vs CA in the footer (non-sensitive preference). */
export const REGION_COOKIE = 'as_region'

export type SiteRegion = 'us' | 'ca'

export function portfoliosPath(isCa: boolean): string {
  return isCa ? '/ca/portfolios' : '/portfolios'
}

export function homePath(isCa: boolean): string {
  return isCa ? '/ca' : '/'
}
