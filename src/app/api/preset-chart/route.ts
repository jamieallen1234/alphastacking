import { NextResponse } from 'next/server'
import { chartErrorResponse, chartJsonResponse } from '@/lib/chartApiHelper'
import { computeUncachedPresetChart } from '@/lib/getCachedPresetChart'
import { PRESET_DEFINITIONS, getPresetById } from '@/lib/presets'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED: YahooRange[] = ['1mo', 'ytd', '1y', '2y', '3y', '5y', 'max']

const PRESET_HINT = PRESET_DEFINITIONS.map((p) => p.id).join(', ')

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const presetId = searchParams.get('preset') ?? ''
  if (!getPresetById(presetId)) {
    return NextResponse.json(
      { error: `Unknown preset (use one of: ${PRESET_HINT}).` },
      { status: 400 }
    )
  }

  const rangeRaw = (searchParams.get('range') || '1y') as YahooRange
  const range = ALLOWED.includes(rangeRaw) ? rangeRaw : '1y'

  try {
    const payload = await computeUncachedPresetChart(presetId, range)
    return chartJsonResponse(payload)
  } catch (e) {
    return chartErrorResponse(e, 'Failed to load preset chart')
  }
}
