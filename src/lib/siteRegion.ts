/** Cookie set when user picks US vs CA in the footer (non-sensitive preference). */
export const REGION_COOKIE = 'as_region'

export type SiteRegion = 'us' | 'ca'

export function portfoliosPath(isCa: boolean): string {
  return isCa ? '/ca/portfolios' : '/portfolios'
}

export function portfolioBuilderPath(isCa: boolean): string {
  return isCa ? '/ca/portfolio-builder' : '/portfolio-builder'
}

export function homePath(isCa: boolean): string {
  return isCa ? '/ca' : '/'
}

/** US-listed ETF hub: under `/ca` when browsing the Canadian site so nav stays in-region. */
export function usEtfHubPath(isCa: boolean): string {
  return isCa ? '/ca/us-etfs' : '/us-etfs'
}

/** Learn hub index. */
export function learnPath(isCa: boolean): string {
  return isCa ? '/ca/learn' : '/learn'
}

export function contactPath(isCa: boolean): string {
  return isCa ? '/ca/contact' : '/contact'
}
