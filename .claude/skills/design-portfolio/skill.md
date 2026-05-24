---
name: design-portfolio
description: "Interactively designs a new Alpha Stacking preset portfolio. Asks the user about region, theme, and specific tickers, then applies construction rules (beta 0.9-1.1, drawdown comparable to SPY, proxy chain history, environment coverage, and correlation synergy) to propose a holdings table with weights, betas, blurbs, weighted beta, effective history, and rebalance cadence. Produces a proposal the user can approve and hand off to /add-portfolio."
---

# Design portfolio (Alpha Stacking)

## Phase 1 — Gather requirements

Use `AskUserQuestion` to ask all three at once in a single multi-question block:

1. **Region** — US, Canadian, or Both?
2. **Theme or tickers** — specific tickers to include, a strategy theme, or both.
3. **Constraints** — any ETFs to avoid or hard requirements (e.g. "no leveraged equity", "FOXY must be in it")?

## Phase 2 — Design rules (apply always)

### Environment-aware construction (core principle)

A good portfolio earns its keep across multiple market environments. Before fixing weights, map each candidate ETF to the environments where it wins and loses, then check that the combined portfolio has at least one strong leg in every environment below.

**Five environments to cover:**

| Environment | Equity | Bonds | Description |
|--------|--------|-------|-------------|
| Growth | Up | Flat/up | Low vol, trending equity gains, positive carry |
| Inflation | Down | Down | Stagflation; real assets and commodities outperform |
| Recession | Down | Up | Economic contraction, credit stress, safe-haven flows |
| Deflation | Down hard | Up hard | Falling prices, zero-rate risk; duration and cash are king |
| choppy/sideways | Flat | Flat | No trend; whipsaw; carry dominates |

> Recession vs. Deflation: Recession is a cyclical slowdown (bonds rally moderately, credit spreads widen). Deflation is an extreme scenario (ZROZ/EDV spike violently, equities collapse, falling price levels).

**Alpha category environment map — where each sleeve wins and loses:**

| Category | ETFs | Wins in | Loses in |
|----------|------|---------|----------|
| Trend / Managed futures | MATE, IALT, FLSP, DBMF, KMLM, DGLM.TO | Inflation, Recession, Deflation (sustained trends) | choppy/sideways; trend reversals |
| Momentum equity | SPMO, MTUM | Growth (late cycle) | Sharp factor rotations; bear opens |
| Market neutral / carry | FOXY, CLSE, ARB.TO | All environments (near-zero beta carry) | Crowded-factor unwind; liquidity crises |
| Return-stacked (equity + overlay) | MATE, NTSD, GDE, IALT, RSSB, RSIT | Growth + divergent overlay trend | Simultaneous equity + futures drawdown |
| Real assets / gold overlay | GDE | Inflation; USD weakness; geopolitical risk | Growth; rising real rates; strong USD |
| Mid-duration treasury overlay | NTSX, RSSB | Recession, Deflation | Inflation; rate spikes |
| Long-duration zero-coupon | ZROZ, EDV | Deflation; sudden Growth-to-Recession shock | Inflation; rate spikes |
| Low-vol / defensive | HDGE.TO, PFLS.TO | Bear equity; vol spikes | Low-vol Growth grind |
| Leveraged equity | SSO, UPRO, HSU.TO, HQU.TO | Growth (amplified) | Any significant drawdown (amplified losses) |

**Environment coverage check (required before finalizing):** After choosing holdings, write one sentence per environment stating which ETF(s) carry the portfolio through that environment. If any environment has no coverage leg, revise weights or swap a holding.

---

### Correlation and synergy (pair well, avoid redundancy)

**High-synergy pairs — actively seek these combinations:**

| Pair | Why it works |
|------|-------------|
| Managed futures + any equity | Classic crisis alpha: trend following tends to be flat-to-positive during equity crashes because it goes short the assets that are falling |
| Market neutral (FOXY, CLSE) + leveraged equity | Market neutral contributes near-zero-beta carry; leverage restores beta target without adding directional risk; result is more alpha per unit of beta |
| Gold overlay (GDE) + managed futures (MATE/IALT) | Both provide crisis protection via different mechanisms: gold is inflation/haven-sensitive, trend-following is direction-sensitive; they don't always move together |
| Momentum equity (SPMO) + trend futures (MATE) | Momentum in equities + momentum in futures; both exploit persistence but in different asset classes with low cross-correlation |
| NTSX (90% SPY + 60% mid treasuries) + managed futures | Treasury sleeve provides deflation hedge; managed futures provides inflation hedge; equity drives growth |

**Anti-synergies — avoid stacking these:**

| Anti-pair | Why to avoid |
|-----------|-------------|
| Multiple managed futures (e.g. DBMF + KMLM + FLSP + DGLM.TO together) | High factor overlap; redundant environment exposure; use MATE (which blends DBMF/KMLM already) or IALT instead |
| Multiple momentum equity ETFs (SPMO + MTUM + SPYG) | Same factor, same drawdown timing; pick one |
| Multiple market-neutral strategies without diversifying factor bets | Check whether the strategies share the same arbitrage or carry trade; if yes, they concentrate single-factor risk |
| SSO or UPRO + NTSD | NTSD is already 90% SPY + 60% international developed equity; adding leveraged US equity on top creates triple-stacked equity with minimal diversification benefit |

**Correlation reference (approximate, equity-market conditions):**

| Asset pair | Typical correlation |
|------------|-------------------|
| Managed futures vs. equity | -0.1 to +0.1 (near-zero, negative in crises) |
| Gold vs. equity | -0.1 to +0.2 (low; negative during risk-off) |
| Market neutral vs. equity | -0.05 to +0.1 (near-zero) |
| Long bonds vs. equity | -0.3 to +0.1 (negative in deflation; positive in inflation) |
| Momentum equity vs. broad equity | +0.8 to +0.95 (high; momentum is equity-like) |
| Managed futures vs. gold | +0.1 to +0.3 (low-moderate; both benefit from trends) |

When two holdings have correlation above ~0.7, treat them as one leg for environment-coverage purposes — they won't provide meaningful diversification.

---

### Beta target

Weighted beta must land **0.9-1.1**. Use individual ETF betas from the registry (`src/lib/etfDynamicRegistry.ts`).

Useful beta reference:
| ETF | Beta |
|-----|------|
| SPY / SPMO | 1.0 / 1.1 |
| SSO | 2.0 |
| UPRO | 3.0 |
| MATE / RSSY / GDE | ~1.0 |
| NTSX | ~0.9 |
| NTSD | ~1.6 |
| CLSE | 0.6 |
| IALT | 0.35 |
| FLSP | ~0 |
| FOXY | ~0.05 |
| PFMN.TO | 0.12 |
| USSL.TO | 1.25 |
| RGBM.TO | 0.85 |
| ATSX.TO | 0.8 |
| DGLM.TO | 0.35 |
| HDGE.TO | 0.5 |
| PFLS.TO | 0.48 |
| HSU.TO / HQU.TO | ~2.0 |

### ~0-beta ETF compensation rule

If a ~0-beta ETF (e.g. FOXY, PFMN.TO, FLSP, ARB.TO) is included at meaningful weight, offset it with leveraged equity (SSO = 2.0, UPRO = 3.0, HSU.TO ~2.0) sized to keep weighted beta in range. Show the arithmetic explicitly.

### Advanced label rule

Any portfolio containing a **3x or higher leveraged ETF** (UPRO, TQQQ, SPXL, SOXL, etc.) must be flagged as **advanced** in the proposal. Call this out explicitly in the proposal summary and pass it through to `/add-portfolio` so the route title/description includes the word "advanced."

### Rebalance rule

- Any holding with **2x or higher leverage on a single equity asset** (SSO 2x S&P, UPRO 3x S&P, QLD 2x QQQ, HSU.TO 2x TSX, HQU.TO 2x Nasdaq, etc.) → **Annual rebalance** — prevents beta drift from compounding.
- No 2x+ single-equity leveraged holding anywhere in the portfolio → **No rebalance** — natural drift is acceptable.

Note: USSL.TO, QQQL.TO, and HEQL.TO are 1.25x products and do **not** cross the 2x threshold, so they do not trigger annual rebalance on their own.

### Hard exclusions

- **RSST** — use MATE instead. MATE has the same 100% S&P 500 + 100% managed futures stack, has outperformed RSST, and proxies back to Dec 2020 via RSST NAV → 70% DBMF + 30% KMLM.
- **Options-income ETFs** — SVOL, SPYC, SPD, SPUC, PFIX, SDMF. These may have poor risk-adjusted returns or tail-blowup risk.

### Minimum return bar

A portfolio must generate **meaningfully more than SPY** to justify existing as a model. If the full-history backtest would show less than ~2% annualized excess return over SPY, the design is not good enough — revise before proposing. If a proposed design would produce weak excess returns, say so explicitly and suggest what to change — e.g. replace the underperforming sleeve, increase the weight of the highest-alpha holding, or drop the diversifier that isn't earning its allocation.

### Maximum drawdown bar

The portfolio's max drawdown must not materially exceed SPY's over the same period. The allowance scales with beta: for portfolios with weighted beta above 1.0, up to **1% additional drawdown per year of chart history** is acceptable (e.g. a 5-year backtest allows up to 5% worse than SPY's max drawdown). At beta 0.9-1.0 the bar is SPY's drawdown with no additional slack. A portfolio that blows through this limit is taking more tail risk than the return justifies — revise before proposing.

### ETF grade preference

Prefer A or A+ graded ETFs. If including a lower-graded ETF, explain why (e.g. unique diversification, specific theme requirement).

### CA portfolio ETF universe

CA portfolios can include **any US-listed ETF from the site** (`cadDenominated: true` in the preset handles USD-to-CAD conversion automatically). Do **not** restrict to `.TO` tickers by default unless the user specifies "CA-listed only."

## Phase 3 — Proxy chain reference

The **limiting ETF** (shortest history in the portfolio) determines which chart tabs are available.

| ETF | Effective history | Mechanism |
|-----|-----------------|-----------|
| MATE | Dec 2020 | RSST NAV → 70% DBMF + 30% KMLM blend |
| IALT | Dec 2019 | FLSP + DBMF |
| FOXY | **Feb 2025 — 1Y only** | No proxy exists |
| GDE | ~2004 | SPY + GLD |
| NTSX / NTSD | Sep 2018 | No proxy needed |
| USSL.TO | ~2014 | 1.25x VFV.TO |
| HEQL.TO | ~2019 | 1.25x HEQT.TO |
| QQQL.TO | ~2019 | 1.25x QQQ |
| DGLM.TO | ~2019 | DBMF |
| HFGM | 2020 | ASGM |
| RGBM.TO | Feb 2025 | Proxy status unknown — verify during implementation |
| SSO, SPMO, NTSX, CLSE, etc. | Actual inception (several years) | No proxy needed |

**FOXY inclusion** always caps history at ~15 months (1Y tab only). State this explicitly in the proposal — the tradeoff (0 beta, ~22% annual return since Feb 2025) is accepted.

Chart tabs available by history length:
- Less than ~2 years: 1Y only
- 2+ years: 1Y, 2Y
- 5+ years: 1Y, 2Y, 5Y
- 10+ years: 1Y, 2Y, 5Y, MAX

## Phase 4 — Output format

Present the proposal with all six sections:

### 1. Holdings table

| Ticker | Weight | Beta | Blurb |
|--------|--------|------|-------|
| ... | ...% | ... | One sentence. |

### 2. Weighted beta calculation

Show arithmetic: `0.50 x 1.0 + 0.35 x 1.1 + 0.15 x 0.35 = 0.94`

### 3. Environment coverage

One bullet per environment. State which holding(s) carry the portfolio and how.

- **Growth:** [ETF(s)] — [why they win here]
- **Inflation:** [ETF(s)] — [why they win here]
- **Recession:** [ETF(s)] — [why they win here]
- **Deflation:** [ETF(s)] — [why they win here]
- **choppy/sideways:** [ETF(s)] — [why they win here]

### 4. Effective history

State the **limiting ETF**, its effective earliest date, and which chart tabs will be available.

### 5. Rebalance cadence

Annual (if leveraged equity present) or None. One sentence rationale.

### 6. Hub card description

One sentence, strategy level only. No ticker lists, no weight strings, no rebalance cadence.

Example: "Return-stacked managed futures core with momentum and systematic alternatives."

---

Once the user approves the proposal, invoke `/add-portfolio` to implement it.
