import type { ExposureSummary } from '@/lib/exposureSummary'
import type { PortfolioBuilderEtfOption } from '@/lib/portfolioBuilderEtfOptions'

/** Minimal row shape for the warning heuristic (matches builder rows). */
export type PortfolioBuilderRowLike = { symbol: string; allocation: string }

function parseAllocationPct(raw: string): number | null {
  const t = raw.trim()
  if (!t) return null
  const n = parseInt(t, 10)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

function categorySuggestsAlphaOrAlts(o: PortfolioBuilderEtfOption): boolean {
  const c = o.category
  if (c === 'Stacked' || c.startsWith('Return Stacked')) return true
  return (
    c === 'Long/short' ||
    c === 'Managed futures' ||
    c === 'Global macro' ||
    c === 'Arbitrage' ||
    c === 'Premia and systematic alternatives' ||
    c === 'Crypto & digital assets'
  )
}

/**
 * Whether the builder book plausibly includes alpha / alts / diversifying sleeves beyond plain equity beta.
 * Uses gross notionals from {@link buildExposureSummaryFromWeightedTickers} when available, and falls back
 * to live ETF registry metadata so funds missing from the static exposure map still count.
 */
export function portfolioHasMeaningfulAlphaOrAltsExposure(
  rows: PortfolioBuilderRowLike[],
  options: PortfolioBuilderEtfOption[],
  exposureSummary: ExposureSummary | null
): boolean {
  if (exposureSummary != null && exposureSummary.grossAlphaExposurePct > 0.5) {
    return true
  }

  const optBy = new Map(options.map((o) => [o.symbol.toUpperCase(), o]))

  for (const row of rows) {
    const pct = parseAllocationPct(row.allocation)
    if (pct == null || pct <= 0 || !row.symbol.trim()) continue

    const o = optBy.get(row.symbol.trim().toUpperCase())
    if (!o) continue

    if (o.stackedEligible || o.alphaEligible) return true
    if (o.hasCryptoExposure || o.hasPreciousMetalsExposure) return true
    if (categorySuggestsAlphaOrAlts(o)) return true

    /** Long/short books that still map to ~0 “gross alpha” in the scorecard table but are diversifiers. */
    if (o.netEquityPct != null && Math.abs(o.netEquityPct) < 80) return true
  }

  return false
}
