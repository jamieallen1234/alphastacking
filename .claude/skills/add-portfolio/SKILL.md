---
name: add-portfolio
description: >-
  Adds a real model portfolio to Alpha Stacking with live holdings, weighted
  total-return charts (Yahoo-backed `computePortfolioChart`), preset API, and
  hub cards. Covers US site (`/portfolios/...`) and Canadian edition
  (`/ca/portfolios/...`). Use when adding buy-and-hold or scheduled-rebalance
  baskets, new preset modules, `portfolioRoutes`, `getCachedPresetChart`, or
  `PortfolioDetailMain` live maps—never stub or placeholder-only pages.
---

# Add portfolio (Alpha Stacking)

This skill is for **real portfolios only**: every addition must have a **preset** (tickers + weights that sum to 100%), a **working chart** (detail + `/api/preset-chart`), and an entry in **`US_SLUG_TO_PRESET_ID`** / **`CA_SLUG_TO_PRESET_ID`** in `PortfolioDetailMain.tsx`. Do not add `stub`, `placeholder`, or copy-only routes.

## US site vs Canadian edition

| Edition | Route list | Detail URL | Hub page | Chart / copy notes |
|--------|------------|------------|----------|-------------------|
| **US** | `usPortfolioRoutes` in `src/lib/portfolioRoutes.ts` | `/portfolios/[slug]` | `/portfolios` | USD; `cadDenominated: false` in `computePortfolioChart` unless you have a rare USD exception. |
| **Canadian** | `caPortfolioRoutes` | `/ca/portfolios/[slug]` | `/ca/portfolios` | Model in CAD; set **`cadDenominated: true`** in the `PRESET_DEFINITIONS` entry for that preset. |

Pick **one** array per product (US-listed model → US routes; TSX / CAD-denominated model → CA routes). If the user wants the **same economic basket** on both editions, add **two** route entries (one per array) with distinct slugs and either shared or edition-specific preset modules—still fully wired for each slug.

## Checklist (live portfolio)

1. **`src/lib/portfolioRoutes.ts`**  
   - Append `{ slug, region: 'us' | 'ca', kind: 'live', hubSection, title, description, featured?, addedAt }`.  
   - `hubSection`: `'buy-hold'` or `'annual-rebalance'` (sets which hub block the card sits in).  
   - `kind` must be **`'live'`**.  
   - **`addedAt`** (required): ISO date (`YYYY-MM-DD`) set to **today** (`date +%F`). Drives the `/updates` (US) and `/ca/updates` (CA) pages via `src/lib/updatesFeed.ts`. **Do not** hand-edit `UpdatesPage.tsx` or `updatesFeed.ts`—setting `addedAt` is the entire integration.
   - **Advanced labeling rule:** If any holding is a **3x leveraged ETF** (for example `UPRO`, `TQQQ`, `SPXL`, `SOXL`), the portfolio title or description must explicitly include **`advanced`** (same pattern as the current UPRO example). Treat this as mandatory risk labeling, not optional copy style.
   - **`description`** (hub card + home teaser copy): **one short sentence**, strategy-level — same bar as **US Multi-Strategy** (`"Diversified US-listed mix with intentional beta near 1.0."`). **Do not** paste ticker lists or `10% / 7.5% / …` weight strings here; those belong on the **detail page** (`PresetHoldingsTable` + preset `blurb`s in `src/lib/presets/...`). **Do not** call out rebalance cadence (e.g. annual January) in this field — keep it high-level; cadence lives in chart math and on-page methodology if needed. **Do not** use the word **static** here (e.g. "static weights" / "static barbell") — say what the model *is*, not that weights never change.

2. **`src/lib/presets/index.ts`**  
   - Export `…_PRESET_ID` stable string (add a version suffix if weights may change).  
   - Export `PresetHolding[]` with weights summing to **100**.  
   - Add a `PresetDefinition` entry to **`PRESET_DEFINITIONS`** with `id`, `region`, `cadDenominated`, `rebalanceSchedule`, `holdings`, and `extraCacheKeyTags`.  
   - The API route (`/api/preset-chart`) and `getCachedPresetChart.ts` are both fully generic — they auto-derive everything from `PRESET_DEFINITIONS`. No manual edits required in either file.  
   - Confirm every ticker works in **`computePortfolioChart`** (read `src/lib/computePortfolioChart.ts` and sibling presets; CA levered / synthetic sleeves may need existing proxy merge paths).

3. **`src/components/PortfolioDetailMain.tsx`**  
   - Add `'slug': PRESET_ID_CONSTANT` to **`US_SLUG_TO_PRESET_ID`** or **`CA_SLUG_TO_PRESET_ID`**.  
   - Import the new preset ID constant and the holdings array.  
   - Scorecard parity: pass the model's weighted beta into `PresetIntlChartPanel`, and ensure
     the panel renders `PresetPortfolioChart` with `showScorecard` enabled so model portfolios
     use the same letter-grade scoring block as the builder.
   - Exposure parity: compute and pass the modeled sleeve exposure summary
     (`Net leverage`, `Gross longs`, `Gross shorts`, `Gross alpha & alts`) so every live
     portfolio uses the same right-side scorecard block as the builder.

4. **Strategy pie (`src/lib/strategyPies.ts`)** — automatic, no per-portfolio wiring.  
   - `pieSlicesForPreset(slug, preset.holdings)` derives the growth+alpha category pie for every preset, so a new portfolio gets a pie for free.  
   - The **only** manual step: if the portfolio holds a **genuinely new ticker** not already in `strategyPies.ts`, add it to the right map (`STACK_SPLIT` for return-stacked funds, `FACTOR_FUNDS` for long-only factor funds, `GROWTH_FUNDS` + `LEVERAGE` for levered/plain index, or `ALPHA_FUNDS` for an alpha sleeve). An unmapped ticker renders as an `Unclassified (TICKER)` slice — that is the signal to classify it.

6. **`src/lib/loadPortfolioHubAlpha.ts`**  
   - Add `'slug': PRESET_ID_CONSTANT` to **`HUB_SLUG_TO_PRESET_ID`**.  
   - Import the new preset ID constant.  
   - Without this entry the hub card shows "1Y alpha —" for every new portfolio, regardless of whether the chart itself works.

7. **Verify**  
   - `npx tsc --noEmit`  
   - Open the detail URL on the correct edition; exercise range tabs (preset refetch).  
   - Confirm the card appears on **`/portfolios`** or **`/ca/portfolios`** in the right section.
   - Confirm scorecard appears on the detail chart and updates across ranges.
   - Confirm the four-line exposure block appears beside scores and populates with modeled values.
   - Confirm the new portfolio appears on **`/updates`** (US) or **`/ca/updates`** (CA) grouped under today's date.
   - Confirm the strategy pie renders below the chart and has **no** `Unclassified (…)` slice (every ticker is mapped in `strategyPies.ts`).

## Cache keys

`unstable_cache` key arrays in `getCachedPresetChart` are part of the invalidation contract—include **`preset id`**, **`range`**, and a **short tag** when basket math or CAD/USD handling changes. Do not rename keys casually.

## Home page cards (`src/lib/portfolios.ts`)

`portfolios.ts` powers the illustrative sparkline cards on the US home page — it is **not** the hub. Only update it when:
- Updating an existing card's ticker list, description, or badge (e.g. when you change the basket behind an existing id like `alpha-stack`).
- Adding a brand-new portfolio that should appear as a home page card (needs `id`, `badge`, `name`, `description`, `sparkPoints`, `sparkColor`, `metrics`, and `region`).

New hub-only portfolios that don't need a home card (e.g. `upro-premia-stack`) do **not** need an entry here.

## Anti-patterns

- Using **`description`** on the hub route as a **full sleeve / weight breakdown** — keep the card readable; weights are visible on `/portfolios/[slug]`.
- Shipping a route **without** `US_SLUG_TO_PRESET_ID` / `CA_SLUG_TO_PRESET_ID` entries + `HUB_SLUG_TO_PRESET_ID` entry — the detail page won't render a chart, and the hub card will show "1Y alpha —".
- Using **`cadDenominated: false`** for a portfolio meant for the **Canadian edition** without an explicit, documented reason.
- Broad refactors of unrelated presets or hub layout while adding one portfolio.
