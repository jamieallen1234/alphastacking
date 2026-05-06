import { CA_ETF_DYNAMIC_REGISTRY, US_ETF_DYNAMIC_REGISTRY } from '@/lib/etfDynamicRegistry'
import type { EtfDynamicDef } from '@/lib/etfDynamicRegistryTypes'
import { mergeDynamicEtfEfficiencyWithPatch } from '@/lib/etfDynamicEfficiencyBySlug'
import { getCachedMonthlyEfficiencyPatchForSlug } from '@/lib/getCachedMonthlyEtfEfficiencyGrades'
import { similarEtfSlugsFor, type EtfSimilarityUniverse } from '@/lib/etfSimilarityTags'

export type SimilarEtfRow = {
  slug: string
  ticker: string
  name: string
  displayScore: string
  mer: string
  aum: string
}

export type PrimarySimilarityHeadline = {
  shortTicker: string
  scoreLabel: string
  grade: string
}

/**
 * Stacked first, else capital (equity) grade, else alpha, else N/A.
 * Matches portfolio builder / page copy expectations.
 */
export function selectSimilarityDisplayGrade(
  eff: EtfDynamicDef['efficiency'] | undefined
): string {
  const pick = (g: string | undefined) => {
    const t = g?.trim()
    if (t && t !== 'N/A') return t
    return null
  }
  return pick(eff?.stacked?.grade) ?? pick(eff?.capital?.grade) ?? pick(eff?.alpha?.grade) ?? 'N/A'
}

/**
 * Human-readable line above the peer list: which score type is shown for the current ETF.
 */
export function buildPrimarySimilarityHeadline(def: EtfDynamicDef): PrimarySimilarityHeadline {
  const eff = def.efficiency
  const shortTicker = def.displayTicker.split('/')[0]!.trim()
  const s = eff?.stacked?.grade?.trim()
  if (s && s !== 'N/A') {
    return { shortTicker, scoreLabel: 'Stacked efficiency score', grade: s }
  }
  const c = eff?.capital?.grade?.trim()
  if (c && c !== 'N/A') {
    return { shortTicker, scoreLabel: 'Equity efficiency score', grade: c }
  }
  const a = eff?.alpha?.grade?.trim()
  if (a && a !== 'N/A') {
    return { shortTicker, scoreLabel: 'Alpha efficiency score', grade: a }
  }
  return { shortTicker, scoreLabel: 'Efficiency score', grade: 'N/A' }
}

function registryForUniverse(universe: EtfSimilarityUniverse) {
  return universe === 'us' ? US_ETF_DYNAMIC_REGISTRY : CA_ETF_DYNAMIC_REGISTRY
}

function monthlyUniverseForSimilarity(
  listing: EtfSimilarityUniverse
): 'us' | 'ca' {
  return listing
}

/**
 * Resolves tag-similar peers, applies the same monthly efficiency patch path as the host page.
 */
export async function loadSimilarEtfRows(
  slug: string,
  listing: EtfSimilarityUniverse
): Promise<SimilarEtfRow[]> {
  const registry = registryForUniverse(listing)
  const peerSlugs = similarEtfSlugsFor(slug, listing, Object.keys(registry))
  if (peerSlugs.length === 0) return []

  const mkt = monthlyUniverseForSimilarity(listing)
  const rows = await Promise.all(
    peerSlugs.map(async (s) => {
      const raw = registry[s]
      if (!raw) return null
      let patch = null
      try {
        patch = await getCachedMonthlyEfficiencyPatchForSlug(s, mkt)
      } catch {
        patch = null
      }
      const merged = mergeDynamicEtfEfficiencyWithPatch(raw, s, mkt, patch)
      return {
        slug: s,
        ticker: merged.displayTicker.split('/')[0]!.trim(),
        name: merged.h1Title,
        displayScore: selectSimilarityDisplayGrade(merged.efficiency),
        mer: merged.mer,
        aum: merged.aum,
      } satisfies SimilarEtfRow
    })
  )
  return rows.filter((r): r is SimilarEtfRow => r != null)
}
