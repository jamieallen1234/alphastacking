---
name: beta-efficiency-grades
description: >-
  Implement the Capital Efficiency and Alpha Efficiency grading system for
  alphastacking.co ETF pages. Use this skill whenever adding or updating
  efficiency grade badges on ETF detail pages, the ETF hub listing, portfolio
  holdings tables, or the Learn article explaining the grading framework.
  Covers ETF classification, formula logic, grade calculation, on-page display,
  tooltip copy, and edge cases.
---

# Beta Efficiency Grading System — alphastacking.co

This skill defines the complete rules for classifying ETFs, calculating their efficiency grades, assigning letter grades (A+, A, B, C, D), and displaying the results on ETF pages (inline meta-line pattern on detail pages; compact formats allowed in hub tables).

## 1. ETF Classification — Assign a Role First

Every ETF must be classified before grading. The classification determines which formula and which badge label applies.

### Role 1: Equity-Side Vehicle

Graded with **Capital Efficiency** badge.

Includes:

- Pure LETFs (SSO, UPRO, SPXL)
- Standard equity / factor ETFs (SPY, QQQ, SPMO, VFLO, AVUV, SASS)
- Long/short equity ETFs (CLSE, ORR)
- Capital-efficient diversified equity (NTSD — treated as equity, not stacked)

#### Beta-switch rule for equity-only ETFs (new)

For **equity-only** ETFs in the **factor** or **long/short** categories, choose exactly one line by live beta:

- If `beta < 0.8` -> show **Alpha Efficiency** (unstacked alpha formula).
- If `beta >= 0.8` -> show **Capital Efficiency**.

Do not show both lines for these equity-only categories at the same time.

### Role 2: Alpha-Side Vehicle

Graded with **Alpha Efficiency** badge.

Includes:

- Pure managed futures (DBMF, KMLM, CTA)
- Pure systematic alternatives / style premia (FLSP, IALT)
- Pure merger arbitrage (MRGR)
- Pure global macro (HFGM — alpha sleeve only, see stacked rules)
- Tail risk / convexity (CAOS)

### Role 3: Stacked ETF

Shows **both grades** — Capital Efficiency for the equity sleeve, Alpha Efficiency for the alpha sleeve.

Fixed-split stacked ETFs (sleeve ratios defined by fund mandate):

- MATE: 100% equity / 100% managed futures
- RSST: 100% equity / 100% managed futures
- RSSY: 100% equity / 100% futures yield (carry)
- GDE: 90% equity / 90% gold futures
- RSSX: 100% equity / gold + bitcoin sleeve
- BTGD, OOQB, OOSB, ISSB, ISBG, WTIB, BEGS: equity sleeve + crypto/commodity sleeve (use published fund mandate for split)

Observable-split stacked ETFs (sleeve ratios estimated from published holdings — update when materially changed):

- ASGM: ~50% equity / ~50% macro-trend (source: AlphaSimplex factor decomposition)
- HFGM: ~50% equity (S&P futures) / ~50% macro-alternatives (source: Unlimited monthly holdings)

For observable-split ETFs, add a disclosure line beneath the badges:

> *"Sleeve split estimated from published holdings as of [Month Year]. Updated when materially new data is available."*

### NTSD — Special Case

Treat as **equity-side vehicle** (Capital Efficiency badge only), not stacked.

**Rationale:** the developed international sleeve (EAFE-style, often ~60% notional alongside a U.S. equity sleeve) is **equity beta**, not an uncorrelated alpha sleeve. Both sleeves are equity-derived—do **not** show an Alpha Efficiency row.

**Copy:** describe the sponsor’s capital-efficient equity stack in the normal **Strategy** / lede / meta flow. The Capital Efficiency tooltip’s second paragraph should summarize that **equity-side** construction (see §7). This skill does **not** require a separate line under the grades (or in the tooltip) explaining headline beta vs. “SPY leverage”—omit unless editorially needed elsewhere on the page.

## 2. Capital Efficiency — Formula and Grade Bands

Used for: LETFs, factor equity, long/short equity, NTSD, and the equity sleeve of stacked ETFs.

### What it measures

How efficiently this ETF delivers equity-side return relative to the capital and beta it consumes, compared to SPY as the baseline (grade B).

### Formula

```text
Capital Freed = 1 - (1 / Beta)
-> SPY: 0% | SSO: 50% | UPRO: 66.7% | CLSE (beta=0.69): negative — consumes less beta than SPY per dollar

Leverage Cost Penalty = ETF expense ratio + estimated borrowing spread above SPY
-> SPY: 0% | SSO: ~0.5%/yr above SPY | UPRO: ~1.0–1.5%/yr above SPY

Annualized Excess Return vs SPY = ETF annualized total return - SPY annualized total return
(use longest available period up to 5 years)

Capital Efficiency Score = Annualized Excess Return vs SPY + (Capital Freed x 10) - Leverage Cost Penalty
```

The `Capital Freed x 10` term converts the capital liberation benefit into a score contribution comparable to return figures.

**SPY anchor: score = 0 (baseline B)**

### Grade Bands — Capital Efficiency

| Grade | Score | Interpretation |
| --- | --- | --- |
| A+ | 12.0+ | Exceptional capital liberation or return vs SPY. Best-in-class for its role. |
| A | 5.0 - 11.9 | Meaningfully better than SPY on capital efficiency terms. Strong equity sleeve. |
| B | -3.0 - 4.9 | Roughly SPY-equivalent. SPY itself scores 0. LETFs with high drag may land here. |
| C | -8.0 - -3.1 | Below SPY. Acceptable if serving a specific diversification function. |
| D | Below -8.0 | Poor capital efficiency. Significant drag without compensating return or liberation. |

### Worked Examples — Capital Efficiency

| ETF | Beta | Capital Freed | Excess Return vs SPY (5Y ann.) | Leverage Cost | Score | Grade |
| --- | --- | --- | --- | --- | --- | --- |
| SPY | 1.0 | 0% | 0% | 0% | 0.0 | B |
| SSO | 2.0 | 50% | ~+6.5% ann. | ~0.5% | 11.0 | A |
| UPRO | 3.0 | 66.7% | ~+12% ann. | ~1.25% | 17.4 | A+ |
| CLSE | 0.69 | N/A* | ~+2.5% ann. | 0.89% | ~1.6 | B |
| NTSD | 1.5 | 33% | ~-2% ann. (intl drag) | ~0.2% | 1.1 | B |

*Long/short ETFs with beta < 1 are not liberating capital — they're reducing equity exposure. Score them purely on excess return vs SPY minus their cost.

## 3. Alpha Efficiency — Formula and Grade Bands

Used for: pure alpha sleeves (unstacked), and the alpha sleeve of stacked ETFs.

### What it measures

How much return this sleeve delivers above its own cost of capital, independent of equity markets.

### Hurdle Rate

- **Unstacked alpha ETFs**: hurdle = annualized risk-free rate over the period (use average 3-month T-bill rate; approximately 2.5% blended over 5Y period ending 2025, approximately 4.5% for 2023–2025 period)
- **Stacked alpha sleeves**: hurdle = risk-free rate + borrowing spread (add ~1.5–2.0% for typical futures/swap financing cost above T-bills)

### Formula

```text
Alpha Efficiency Score = Annualized Sleeve Return - Hurdle Rate

For unstacked ETFs:
Sleeve Return = ETF total annualized return
Hurdle = avg 3M T-bill rate over same period

For stacked ETF alpha sleeves:
Sleeve Return = estimated alpha sleeve contribution
(= total fund return - equity sleeve contribution)
Equity sleeve contribution = equity weight x SPY annualized return over same period
Hurdle = avg 3M T-bill rate + 1.75% borrowing spread
```

**SPY-equivalent anchor for Alpha Efficiency:**
An alpha sleeve that merely matches the risk-free rate = C (it's not adding value above cash).
An alpha sleeve that matches SPY's excess return above risk-free at zero beta = A+ (extraordinary).

### Grade Bands — Alpha Efficiency

| Grade | Score (above hurdle) | Interpretation |
| --- | --- | --- |
| A+ | 8.0%+ above hurdle | Exceptional. Meaningful excess return above cost of capital. Best diversifiers. |
| A | 4.0 - 7.9% above hurdle | Strong. Clearly earns its keep above financing cost. |
| B | 1.0 - 3.9% above hurdle | Modest positive. Covers its cost with a thin margin. |
| C | -1.0 - 0.9% above hurdle | Roughly break-even or marginally negative vs hurdle. |
| D | Below -1.0% above hurdle | Does not clear its cost of capital. Drag without compensating diversification. |

### Worked Examples — Alpha Efficiency

| ETF | Type | 5Y Ann. Return | Hurdle | Score | Grade |
| --- | --- | --- | --- | --- | --- |
| FLSP | Unstacked | ~7.0% | ~2.5% | +4.5% | A |
| MRGR | Unstacked | ~5.0% | ~2.5% | +2.5% | B |
| DBMF | Unstacked | ~8.0% | ~2.5% | +5.5% | A |
| KMLM | Unstacked | ~4.0% | ~2.5% | +1.5% | B |
| MATE alpha sleeve | Stacked | est. ~6-10% | ~4.25% | +2-6% | B to A |
| RSSY alpha sleeve | Stacked | est. ~4-6% | ~4.25% | +0-2% | C to B |

## 4. Insufficient History (Three-Tier Display Logic)

Minimum history threshold to calculate a grade: **4 months of live NAV data.**

- **If < 4 months**: display **N/A** (no letter grade).
- **If 4-11 months**: show the letter grade **without** adding symbols next to the grade itself; treat the grade as **provisional** and explain that in a **page-bottom footnote** (see §6 “Provisional grades”).
- **If 12+ months**: show the letter grade with **no** provisional footnote.

Three-tier display logic:

- `< 4 months -> N/A`
- `4-11 months -> A+ (provisional; footnote at bottom)`
- `12+ months -> A+`

Do not use proxy/simulated returns to assign grades. Grades are based on live NAV only.

## 5. Annual Maintenance

Recalculate all grades once per year at year-end (January update cycle).

Steps:

1. Pull 4M, 1Y, 3Y, 5Y annualized total returns from Yahoo Finance adjusted close for all ETFs.
2. Pull average 3M T-bill rate for the same periods (FRED: DTB3).
3. Recalculate scores using formulas above.
4. Reassign grades where score bands have shifted.
5. Update observable-split ETF sleeve ratios (ASGM, HFGM) from latest published holdings.
6. Promote N/A grades to calculated grades where 4-month threshold is now met.
7. Update the disclosure line: *"Beta Efficiency grades last calculated: January [Year]. Based on data through December [Year]."*

## 6. ETF Detail Page Display — Component Spec (unified template)

This section reflects the **current shipped UX**: shared **`EtfEfficiencyGrades`** (`EtfEfficiencyMetaExtras`, `EtfEfficiencyPageFootnotes`) in `src/components/etfEfficiency/`, styled by `EtfEfficiencyGrades.module.css`. **Every** US and CA ETF detail page uses the same stack: `EtfDynamicDef` in `src/lib/etfDynamicRegistry.ts` (base tickers plus featured entries from `src/lib/etfFeaturedRegistryDefs.ts`) → **`EtfDynamicPageLayout`** → **`EtfPageTemplate`** `metaExtras`. Wire grades and tooltip copy on **`EtfDynamicDef.efficiency`** (inline objects or shared helpers—e.g. MATE spreads `mateEfficiencyCopy` from `src/components/usEtfPages/mateEfficiencyCopy.ts` inside its featured def). There are no separate “hand-authored” ETF page components for grades; keep all efficiency UI changes on this path so hub, detail, and monthly recompute stay aligned.

### Inline “meta line” grades (no boxed chips)

On ETF detail pages, render grades as **plain text in the stats area** (same neighborhood as Beta/MER/AUM), not bracketed chips:

```text
Capital Efficiency: A+    Alpha Efficiency: B+
```

Rules:

- **Labels** use **title case** (not ALL CAPS): `Capital Efficiency:` / `Alpha Efficiency:`.
- **Label color** matches meta label styling (same intent as `Ticker:` / `AUM:` — high-contrast “label” tone).
- **Grade text** is **underlined** (underline the grade only, not the label).
- **Stacked ETFs**: show **both** grades on **one line** when space allows (wrap on small screens).
- **No decorative symbols** next to the grade (no dagger next to `A+` / `B+`). If history is provisional, explain in a **footnote at the bottom of the page** (see below).

### Grade styling tiers (map letters to typography)

Use typography (not bordered boxes) to convey tier:

- **A+ (Capital Efficiency)**: grade text in **gold** (`#C9A84C`) + underline.
- **A / B+ / etc. (Alpha Efficiency)**: default to **muted** grade text + underline (adjust per product if you need stronger emphasis).
- **N/A**: muted + dashed underline (optional) — keep subtle.

Hub tables / holdings tables may still use compact chips later, but **detail pages** should follow the inline pattern above.

### Provisional grades (4–11 months)

Do **not** annotate the grade itself. Instead add a **page-bottom footnote** after the main article sections, e.g.:

> *Grades above are based on [X] months of live data. Treat as provisional — short history may not reflect full market cycle behaviour.*

### Observable-split disclosures (ASGM, HFGM)

Keep the disclosure line **near the grades** (below the grade row is fine) since it is sleeve-definition context, not a “history confidence” footnote.

### Where this appears

**ETF detail pages** — stats block region (`EtfPageTemplate` `metaExtras` on all `/us-etfs/[slug]` and `/ca/etfs/[slug]` pages).

**ETF hub page** — add as a visible column in each category table:

```text
| Ticker | Name | Beta | Capital Efficiency | Alpha Efficiency |
```

Show only the relevant grade(s) per ETF. Empty cell where not applicable.
Default sort within each category: A+ first, D last, N/A at bottom.

**Portfolio holdings tables** — optional column:

```text
| Ticker | Weight | Beta | Efficiency | Notes |
```

Show abbreviated values to save space (example: `A+ (CE)` / `B+ (AE)`).
Consider showing weighted average efficiency score as a summary stat at the bottom of the table.

## 7. Tooltip Copy — Final Text

Tooltips on ETF detail pages should be a **single dark bubble** (site-styled), revealed on **hover + keyboard focus**.

**Do not** set `title={...}` on the same hover target — browsers will show an additional native tooltip (“white box”) and you’ll get **double tooltips**.

Use **two paragraphs** in the bubble (render as two paragraphs; in CSS `white-space: pre-line` is acceptable):

1. **Paragraph 1:** the canonical definition from below (framework meaning).
2. **Paragraph 2:** **sleeve makeup** for that grade:
   - **Capital Efficiency:** describe the **equity sleeve** construction in plain English (benchmark + notional intent).
   - **Alpha Efficiency:** describe the **non-equity / alpha sleeve** construction (mandate + universes + implementation style).

### Capital Efficiency tooltip

> *"Capital Efficiency grades how well this ETF delivers equity-side returns relative to the capital and beta it consumes, compared to SPY (grade B). LETFs score higher by freeing capital for alpha sleeves. Long/short and factor ETFs score on excess return vs SPY net of costs."*
>
> *(Second paragraph: equity sleeve makeup — e.g. for MATE: ~100% S&P 500 notional exposure as the core equity engine.)*

### Alpha Efficiency tooltip (unstacked)

> *"Alpha Efficiency grades how much return this ETF delivers above the risk-free rate, independent of equity markets. SPY is the B baseline for comparison. Higher grades mean more return per unit of non-equity risk taken."*
>
> *(Second paragraph: describe the fund’s alpha engine/mandate in plain English.)*

### Alpha Efficiency tooltip (stacked sleeve)

> *"Alpha Efficiency grades the non-equity sleeve of this stacked ETF on return above its borrowing cost — the true hurdle for a futures overlay. A sleeve that only matches its financing cost adds no value; grades above B indicate genuine additive return."*
>
> *(Second paragraph: alpha sleeve makeup — e.g. for MATE: ~100% trend-following managed futures across equities, rates, FX, commodities.)*

### N/A tooltip

> *"Insufficient live history to assign a grade. Minimum 4 months of NAV data required."*

### Observable-split disclosure (ASGM, HFGM)

> *"Sleeve split estimated from published holdings as of [Month Year]. Grades updated when materially new data is available."*

## 8. Edge Cases and Decision Rules

**Near-zero beta (between -0.10 and +0.10):**
Treat as near-zero for stability and avoid divide-by-near-zero blowups in capital-freed math.

**Beta treatment in Alpha Efficiency (replacement rule):**
Alpha Efficiency includes a **beta-aware bonus** when the sleeve already clears its hurdle rate.

The logic: lower absolute beta means cleaner “alpha, not beta.” Negative beta gets extra credit because it can hedge equity drawdowns. But bonuses apply only when base return is real (above hurdle).

For unstacked alpha ETFs:

```text
Base score = Annualized Return - Risk-Free Rate

If base score > 0 (clears risk-free hurdle):
  low-beta bonus = max(0, (0.8 - |Beta|) x 2.5)
  negative-beta bonus = (Beta < 0) ? |Beta| x 5.0 : 0
  final score = base score + low-beta bonus + negative-beta bonus

If base score <= 0 (does not clear hurdle):
  no bonus
  final score = base score
```

For stacked ETF alpha sleeves, first estimate alpha sleeve beta:

```text
Alpha Sleeve Beta = Total Fund Beta - (Equity Sleeve Weight x Equity Beta)
```

Examples:

- MATE: total beta 1.37; equity sleeve 100% x ~1.0 => alpha sleeve beta ~0.37
- RSST: total beta 1.44; equity sleeve 100% x ~1.0 => alpha sleeve beta ~0.44
- KMLM (standalone): total beta -0.02; no equity sleeve => alpha sleeve beta -0.02

Then apply the same conditional bonus:

```text
Base score = Estimated Alpha Sleeve Return - (Risk-Free Rate + Borrowing Spread)

If base score > 0:
  low-beta bonus = max(0, (0.8 - |Alpha Sleeve Beta|) x 2.5)
  negative-beta bonus = (Alpha Sleeve Beta < 0) ? |Alpha Sleeve Beta| x 5.0 : 0
  final score = base score + low-beta bonus + negative-beta bonus

If base score <= 0:
  no bonus
  final score = base score
```

Bonus coefficient `5.0` is calibrated so a sleeve near `beta = -0.2` with modest positive return can move from B toward A without inflating weak performers.

**New ETFs added to the site:**

1. Classify role (equity / alpha / stacked) before assigning grade.
2. If < 4 months history: N/A.
3. If stacked: determine sleeve split from fund prospectus or published holdings.
4. If observable-split: document the source and date.

**ETFs where sleeve return cannot be isolated (stacked):**
If the fund does not publish sleeve-level performance and it cannot be estimated from holdings + index returns, show N/A for that sleeve's grade with footnote: *"Sleeve return cannot be independently estimated."*

**Factor equity ETFs (SPMO, VFLO, AVUV, SASS):**
Capital Efficiency grade. Score on annualized excess return vs SPY minus expense ratio (no capital-liberation add-on; beta typically around 1.0).

## 9. Reference Grade Table — Current ETF Universe

Last calculated: based on data through approximately end of 2025. Update annually.

| ETF | Classification | Capital Efficiency | Alpha Efficiency |
| --- | --- | --- | --- |
| SPY | Equity baseline | B | - |
| SSO | LETF | A | - |
| UPRO | LETF | A+ | - |
| QQQ | Factor equity | B | - |
| SPMO | Factor equity | B | - |
| VFLO | Factor equity | B | - |
| AVUV | Factor equity | B | - |
| SASS | Factor equity | B | - |
| NTSD | Cap-efficient diversified equity | B | - |
| CLSE | Long/short equity | B | - |
| ORR | Long/short equity | B | - |
| FLSP | Pure alpha sleeve | - | A |
| IALT | Pure alpha sleeve | - | N/A |
| DBMF | Pure managed futures | - | A |
| KMLM | Pure managed futures | - | B |
| CTA | Pure managed futures | - | B |
| MRGR | Pure merger arb | - | B |
| CAOS | Tail risk | - | C |

## Appendix A — Implementation Touchpoints (alphastacking repo)

Use this appendix when turning the framework into shipped UI/data work.

### A1) Core data model and grade logic

- **Add grade schema + helpers** in `src/lib` (recommended new module, e.g. `src/lib/etfEfficiencyGrades.ts`):
  - ETF role enum: `equity | alpha | stacked`
  - Inputs: beta, MER/expense ratio, annualized returns, risk-free averages, borrowing spread, sleeve split metadata
  - Outputs: score, grade letter, confidence tier (`na | provisional | full`), badge payload, tooltip copy variant
  - Pure functions for:
    - `computeCapitalEfficiencyScore()`
    - `computeAlphaEfficiencyScore()`
    - negative-beta conditional bonus application
    - history tiering (`<4`, `4-11`, `12+` months)
- **Do not compute in components.** Keep formulas centralized and unit-testable.

### A2) ETF source-of-truth wiring

- **Primary ETF metadata lives in** `src/lib/etfDynamicRegistry.ts`, merged with featured tickers from **`src/lib/etfFeaturedRegistryDefs.ts`**. Types and optional flags (e.g. `monthlyGradeRecompute`) live in **`src/lib/etfDynamicRegistryTypes.ts`**.
- **All ETF detail pages** are served by **`[slug]`** routes; there is no parallel “hand-authored” page type for efficiency work.
- **`EtfDynamicDef`:** optional `efficiency` supplies Capital / Alpha lines (grade, optional `gradeTone`, tooltip), optional `notes` under the row, and optional `footnotes` for page-bottom copy—consumed by **`EtfDynamicPageLayout`**. Monthly Yahoo-driven grade patches run through **`src/lib/etfEfficiencyGradesCompute.ts`**; set **`monthlyGradeRecompute: false`** on a def when editorial grades must not be overwritten by that job.
- **Future / richer data:** a keyed sidecar or extended schema can still add role/classification, fixed vs observable split fields (`equityWeight`, `alphaWeight`, `asOf`, source note), computed grade payloads, and provisional flags—keep formulas centralized (see A1).

### A3) ETF detail page UI

- Grades use `EtfPageTemplate`’s **`metaExtras`** slot (wired from `EtfDynamicPageLayout`) so they sit directly under the `<ul className={styles.meta}>` block on every ETF page.
- For stacked ETFs:
  - render **both** grades inline on one row when possible (wrap on small screens)
  - render observable-split disclosure line where applicable (ASGM, HFGM)
- For `4-11` month grades:
  - **do not** decorate the grade with symbols; add a **page-bottom** provisional footnote (see §6)
- For `<4` months:
  - render `N/A` only (no letter grade)
- Tooltip implementation notes (detail pages):
  - custom bubble + **no** `title` attribute on the hover target
  - `white-space: pre-line` (or real `<p>` nodes) for two-paragraph tooltips
  - escape apostrophes in TS string literals where needed to avoid breaking builds

### A4) ETF hub listing UI

- Update hub table/list components (currently fed by `etfDynamicRegistry` + `etfHubData`) to show efficiency columns/cells:
  - `Capital Efficiency`
  - `Alpha Efficiency`
- Show only relevant badge(s) per ETF and leave non-applicable cells empty.
- Apply category sort preference where feasible:
  - A+ first → D last → N/A bottom.

### A5) Portfolio holdings table integration (optional)

- If enabled, add abbreviated grade badge in holdings UI:
  - likely `src/components/PresetHoldingsTable.tsx` (or equivalent holdings table component)
- Format example: `A (CE)` / `B (AE)` and optional weighted summary stat at footer.

### A6) Learn page integration

- If/when publishing framework explainer:
  - `src/components/LearnPage.tsx`
  - learn article route/components under `src/app/learn/...` and `src/components/learn/...`
- Keep copy aligned with this skill’s formulas and tiering rules.

### A7) Styling + tokens

- Reuse site tokens in `src/app/globals.css` and existing meta/footnote patterns.
- For detail pages, prefer **typography-first** presentation (underline grades; gold for standout `A+` when desired) rather than bordered chips.
- Tooltip bubble: dark surface + subtle border + compact sans text (see `.efficiencyTooltip` in `EtfEfficiencyGrades.module.css`).

### A8) Data refresh workflow

- Annual update cycle (January, based on December data):
  1. refresh ETF return windows (4M/1Y/3Y/5Y)
  2. refresh DTB3 averages
  3. recalc grades and confidence tiers
  4. update observable splits (ASGM/HFGM)
  5. promote N/A where 4-month threshold is met
- Persist a global “last calculated” stamp and show it where users see grade context.

### A9) Edge-case handling checklist (implementation)

- Near-zero beta protection in capital-freed math.
- Negative-beta bonus only when base alpha score is positive.
- Sleeve-return-unisolatable cases => `N/A` + explanatory footnote.
- No proxy/simulated returns in grade assignment.

### A10) Suggested rollout order

1. Add grade data schema + compute helpers in `src/lib`.
2. Render badges on ETF detail pages first.
3. Add hub columns and sorting.
4. Add holdings-table shorthand grades (optional).
5. Publish Learn explainer alignment.
6. Add/refresh tests and annual update script/docs.
