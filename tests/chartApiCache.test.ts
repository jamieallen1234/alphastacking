import assert from 'node:assert/strict'
import test from 'node:test'
import { chartJsonResponse } from '@/lib/chartApiHelper'
import { PRESET_CHART_CACHE_VERSION } from '@/lib/presetChartCacheVersion'

test('preset chart cache version is suitable for a URL cache key', () => {
  assert.match(PRESET_CHART_CACHE_VERSION, /^[a-z0-9-]+$/)
})

test('public-day chart responses cache at the CDN but revalidate in browsers', () => {
  const response = chartJsonResponse({ ok: true }, 'public-day')
  assert.equal(
    response.headers.get('cache-control'),
    'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
  )
})
