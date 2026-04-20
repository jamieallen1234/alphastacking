---
name: add-portfolio
description: >-
  Adds a real model portfolio to Alpha Stacking with live holdings, weighted
  total-return charts (Yahoo-backed `computePortfolioChart`), preset API, and
  hub cards. Covers US site (`/portfolios/...`) and Canadian edition
  (`/ca/portfolios/...`). Use when adding buy-and-hold or annually rebalanced
  baskets, new preset modules, `portfolioRoutes`, `getCachedPresetChart`, or
  `PortfolioDetailMain` live maps—never stub or placeholder-only pages.
---

# Add portfolio (Alpha Stacking)

This skill is for **real portfolios only**: every addition must have a **preset** (tickers + weights that sum to 100%), a **working chart** (detail + `/api/preset-chart`), and a **`US_LIVE` / `CA_LIVE`** map entry. Do not add `stub`, `placeholder`, or copy-only routes.

## US site vs Canadian edition

| Edition | Route list | Detail URL | Hub page | Chart / copy notes |
|--------|------------|------------|----------|-------------------|
| **US** | `usPortfolioRoutes` in `src/lib/portfolioRoutes.ts` | `/portfolios/[slug]` | `/portfolios` | USD; `cadDenominated: false` in `computePortfolioChart` unless you have a rare USD exception. |
| **Canadian** | `caPortfolioRoutes` | `/ca/portfolios/[slug]` | `/ca/portfolios` | Model in CAD; set **`cadDenominated: true`** in cache helpers and in `/api/preset-chart` `PRESETS` for that preset. |

Pick **one** array per product (US-listed model → US routes; TSX / CAD-denominated model → CA routes). If the user wants the **same economic basket** on both editions, add **two** route entries (one per array) with distinct slugs and either shared or edition-specific preset modules—still fully wired for each slug.

## Checklist (live portfolio)

1. **`src/lib/portfolioRoutes.ts`**  
   - Append `{ slug, region: 'us' | 'ca', kind: 'live', hubSection, title, description, featured? }`.  
   - `hubSection`: `'buy-hold'` or `'annual-rebalance'` (sets which hub block the card sits in).  
   - `kind` must be **`'live'`**.

2. **`src/lib/presets/<portfolio>.ts`**  
   - `…_PRESET_ID` stable string (version suffix if weights may change).  
   - `PresetHolding[]`: weights sum to **100**; `…Symbols()` / `…Weights()` (decimals 0–1).  
   - Confirm every ticker works in **`computePortfolioChart`** (read `src/lib/computePortfolioChart.ts` and sibling presets; CA levered / synthetic sleeves may need existing merge paths).

3. **`src/lib/getCachedPresetChart.ts`**  
   - `getCached…Chart` (`range: '1y'`, correct `rebalanceSchedule`, `cadDenominated` for edition).  
   - Optional **`getCached…ChartMax`** (`range: 'max'`) if this portfolio should power **home** charts; then wire `src/lib/loadHomePortfolioCharts.ts` for the correct edition + href (`/portfolios/...` vs `/ca/portfolios/...`).

4. **`src/components/PortfolioDetailMain.tsx`**  
   - Add **`US_LIVE[slug]`** or **`CA_LIVE[slug]`** with `{ presetId, holdings, load }`.  
   - `presetId` must match **`/api/preset-chart`** key.

5. **`src/app/api/preset-chart/route.ts`**  
   - Register preset in **`PRESETS`**; append id to **`PRESET_HINT`**.

6. **Verify**  
   - `npx tsc --noEmit`  
   - Open the detail URL on the correct edition; exercise range tabs (preset refetch).  
   - Confirm the card appears on **`/portfolios`** or **`/ca/portfolios`** in the right section.

## Cache keys

`unstable_cache` key arrays in `getCachedPresetChart` are part of the invalidation contract—include **`preset id`**, **`range`**, and a **short tag** when basket math or CAD/USD handling changes. Do not rename keys casually.

## Anti-patterns

- Shipping a route **without** `US_LIVE` / `CA_LIVE` + preset + API — the page will not render a real chart.
- Using **`cadDenominated: false`** for a portfolio meant for the **Canadian edition** without an explicit, documented reason.
- Broad refactors of unrelated presets or hub layout while adding one portfolio.
