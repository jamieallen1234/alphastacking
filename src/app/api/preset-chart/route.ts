import { NextResponse } from 'next/server'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import {
  CA_INTL_PRESET_ID,
  caInternationalSymbols,
  caInternationalWeights,
} from '@/lib/presets/caInternational'
import {
  US_INTL_PRESET_ID,
  usInternationalSymbols,
  usInternationalWeights,
} from '@/lib/presets/usInternational'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED: YahooRange[] = ['1mo', 'ytd', '1y', '5y']

const PRESETS: Record<
  string,
  { symbols: () => string[]; weights: () => number[]; cadDenominated: boolean }
> = {
  [US_INTL_PRESET_ID]: {
    symbols: usInternationalSymbols,
    weights: usInternationalWeights,
    cadDenominated: false,
  },
  [CA_INTL_PRESET_ID]: {
    symbols: caInternationalSymbols,
    weights: caInternationalWeights,
    cadDenominated: true,
  },
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const preset = searchParams.get('preset') ?? ''
  const def = PRESETS[preset]
  if (!def) {
    return NextResponse.json(
      { error: `Unknown preset (use ${US_INTL_PRESET_ID} or ${CA_INTL_PRESET_ID}).` },
      { status: 400 }
    )
  }

  const rangeRaw = (searchParams.get('range') || '1y') as YahooRange
  const range = ALLOWED.includes(rangeRaw) ? rangeRaw : '1y'

  try {
    const payload = await computePortfolioChart({
      symbols: def.symbols(),
      weights: def.weights(),
      range,
      cadDenominated: def.cadDenominated,
    })
    return NextResponse.json(payload, {
      headers: {
        /** Avoid stale JSON when we add fields (e.g. max drawdown) or change range semantics. */
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to load preset chart'
    const lower = message.toLowerCase()
    const status =
      lower.includes('not enough') || lower.includes('at least') ? 400 : 502
    return NextResponse.json({ error: message }, { status })
  }
}
