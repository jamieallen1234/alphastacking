import { NextResponse } from 'next/server'
import { chartErrorResponse, chartJsonResponse } from '@/lib/chartApiHelper'
import { getCachedPresetChartForRange } from '@/lib/getCachedPresetChart'
import { PRESET_DEFINITIONS, getPresetById } from '@/lib/presets'
import { allowChartRequest } from '@/lib/chartRateLimit'
import { clientIp } from '@/lib/rateLimit'
import type { YahooRange } from '@/lib/yahooFinance'

const ALLOWED: YahooRange[] = ['1mo', 'ytd', '1y', '2y', '3y', '5y', 'max']

const PRESET_HINT = PRESET_DEFINITIONS.map((p) => p.id).join(', ')

export async function GET(req: Request) {
  if (!allowChartRequest(clientIp(req))) {
    return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 })
  }

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
    const payload = await getCachedPresetChartForRange(presetId, range)
    // The computation itself is cached by getCachedPresetChart. Do not additionally cache this
    // HTTP response in the browser or CDN, otherwise a newly deployed proxy model can leave a
    // range tab displaying an older calculation for up to an hour.
    return chartJsonResponse(payload)
  } catch (e) {
    return chartErrorResponse(e, 'Failed to load preset chart')
  }
}
