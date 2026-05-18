import { PRESET_DEFINITIONS, presetSymbols } from '@/lib/presets'

/** Every Yahoo-style ticker used in on-site preset portfolios (US + CA). */
export function allPortfolioPresetSymbols(): Set<string> {
  const out = new Set<string>()
  for (const p of PRESET_DEFINITIONS) {
    for (const sym of presetSymbols(p)) {
      out.add(sym.trim().toUpperCase())
    }
  }
  return out
}
