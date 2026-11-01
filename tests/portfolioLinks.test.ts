import assert from 'node:assert/strict'
import test from 'node:test'
import { getStrategyGuideForEtf } from '@/lib/etfStrategyGuide'
import { getPortfolioProxyEtfNav } from '@/lib/portfolioProxyEtfNav'
import { PRESET_DEFINITIONS } from '@/lib/presets'

test('RSSY links to the risk-premia guide, not the managed-futures guide', () => {
  assert.deepEqual(getStrategyGuideForEtf('rssy', 'return-stacked-ge-2x'), {
    slug: 'risk-premia',
    label: 'risk premia',
  })
})

test('Canadian portfolio holdings resolve to regional ETF pages or an official product page', () => {
  const canadianTickers = new Set(
    PRESET_DEFINITIONS.filter((preset) => preset.region === 'ca').flatMap((preset) =>
      preset.holdings.map((holding) => holding.ticker)
    )
  )

  assert.ok(canadianTickers.size > 0)
  for (const ticker of canadianTickers) {
    const nav = getPortfolioProxyEtfNav(ticker, '/ca/us-etfs')
    assert.ok(nav, `${ticker} should resolve to an ETF page or official product page`)
    if (nav.external) {
      assert.match(nav.href, /^https:\/\//, `${ticker} should use a valid official URL`)
    } else {
      assert.match(nav.href, /^\/ca\//, `${ticker} should remain in the Canadian site shell`)
    }
  }
})

test('US-listed portfolio holdings use the Canadian US-ETF route', () => {
  assert.deepEqual(getPortfolioProxyEtfNav('RSSY', '/ca/us-etfs'), {
    href: '/ca/us-etfs/rssy',
    external: false,
  })
  assert.deepEqual(getPortfolioProxyEtfNav('SSO', '/ca/us-etfs'), {
    href: '/ca/us-etfs/sso',
    external: false,
  })
})

test('the current QQU and former HQU tickers route to the same Canadian ETF page', () => {
  const page = { href: '/ca/etfs/hqu', external: false }
  assert.deepEqual(getPortfolioProxyEtfNav('QQU.TO', '/ca/us-etfs'), page)
  assert.deepEqual(getPortfolioProxyEtfNav('HQU.TO', '/ca/us-etfs'), page)
})
