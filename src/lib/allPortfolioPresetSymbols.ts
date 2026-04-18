import { caCoreBuyHoldSymbols } from '@/lib/presets/caBuyHold'
import { caUsslQqqlHdgeSymbols } from '@/lib/presets/caBuyHoldHdge'
import { caInternationalSymbols } from '@/lib/presets/caInternational'
import { usCoreBuyHoldSymbols } from '@/lib/presets/usBuyHold'
import { usInternationalSymbols } from '@/lib/presets/usInternational'

/** Every Yahoo-style ticker used in on-site preset portfolios (US + CA). */
export function allPortfolioPresetSymbols(): Set<string> {
  const out = new Set<string>()
  for (const sym of [
    ...usCoreBuyHoldSymbols(),
    ...usInternationalSymbols(),
    ...caCoreBuyHoldSymbols(),
    ...caUsslQqqlHdgeSymbols(),
    ...caInternationalSymbols(),
  ]) {
    out.add(sym.trim().toUpperCase())
  }
  return out
}
