import { NextResponse } from 'next/server'
import { computePortfolioChart } from '@/lib/computePortfolioChart'
import {
  CA_CORE_BH_PRESET_ID,
  caCoreBuyHoldSymbols,
  caCoreBuyHoldWeights,
} from '@/lib/presets/caBuyHold'
import {
  CA_USSL_QQQL_HDGE_PRESET_ID,
  caUsslQqqlHdgeSymbols,
  caUsslQqqlHdgeWeights,
} from '@/lib/presets/caBuyHoldHdge'
import {
  CA_INTL_PRESET_ID,
  caInternationalSymbols,
  caInternationalWeights,
} from '@/lib/presets/caInternational'
import {
  US_CORE_BH_PRESET_ID,
  usCoreBuyHoldSymbols,
  usCoreBuyHoldWeights,
} from '@/lib/presets/usBuyHold'
import {
  US_INTL_PRESET_ID,
  usInternationalSymbols,
  usInternationalWeights,
} from '@/lib/presets/usInternational'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED: YahooRange[] = ['1mo', 'ytd', '1y', '2y', '5y', 'max']

const PRESETS: Record<
  string,
  {
    symbols: () => string[]
    weights: () => number[]
    cadDenominated: boolean
    rebalanceSchedule: 'none' | 'quarterly' | 'annual'
  }
> = {
  [US_INTL_PRESET_ID]: {
    symbols: usInternationalSymbols,
    weights: usInternationalWeights,
    cadDenominated: false,
    rebalanceSchedule: 'annual',
  },
  [CA_INTL_PRESET_ID]: {
    symbols: caInternationalSymbols,
    weights: caInternationalWeights,
    cadDenominated: true,
    rebalanceSchedule: 'annual',
  },
  [US_CORE_BH_PRESET_ID]: {
    symbols: usCoreBuyHoldSymbols,
    weights: usCoreBuyHoldWeights,
    cadDenominated: false,
    rebalanceSchedule: 'none',
  },
  [CA_CORE_BH_PRESET_ID]: {
    symbols: caCoreBuyHoldSymbols,
    weights: caCoreBuyHoldWeights,
    cadDenominated: true,
    rebalanceSchedule: 'none',
  },
  [CA_USSL_QQQL_HDGE_PRESET_ID]: {
    symbols: caUsslQqqlHdgeSymbols,
    weights: caUsslQqqlHdgeWeights,
    cadDenominated: true,
    rebalanceSchedule: 'none',
  },
}

const PRESET_HINT = `${US_INTL_PRESET_ID}, ${CA_INTL_PRESET_ID}, ${US_CORE_BH_PRESET_ID}, ${CA_CORE_BH_PRESET_ID}, ${CA_USSL_QQQL_HDGE_PRESET_ID}`

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const preset = searchParams.get('preset') ?? ''
  const def = PRESETS[preset]
  if (!def) {
    return NextResponse.json(
      { error: `Unknown preset (use one of: ${PRESET_HINT}).` },
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
      rebalanceSchedule: def.rebalanceSchedule,
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
