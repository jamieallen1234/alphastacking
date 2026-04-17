---
name: create-etf-page
description: >-
  Adds a new ETF detail page to Alpha Stacking (US or CA hub), wires the hub
  listing, hooks up the price chart, and guides deep research into the issuer
  product page, manager, and sponsor. Use when creating ETF write-ups, adding
  tickers, or drafting strategy/pedigree/outperformance copy with a hedge-fund
  and alpha lens. Enforces concise paragraphs, section word budgets, and
  constructive Outperformance framing (favorable regimes; return-stacked second sleeve).
  When adding multiple ETFs in one request, fetch issuer sites early so the user can
  approve network permissions before bulk work.
---

# Create ETF page (Alpha Stacking)

## Multiple ETFs in one request

If the user asks for **two or more** ETF pages in the same task, **hit the official issuer / fund websites first** (read or fetch product pages, ETF Facts, prospectus links). Many sites use **cookies, bot checks, or regional gates** and may **require explicit network permission** in the environment. Checking early surfaces those prompts **before** you spend turns on copy, charts, and hub wiring—so the user can **approve access up front** and avoid stalled batch work.

## 1. Pick the category

Categories live in `src/lib/etfCategories.ts` (`ETF_CATEGORY_ROWS`; the hub uses `getEtfHubCategoryRows` so **Canada** shows a single **Return Stacked** section instead of the US split). Each row has:

- **`id`** — URL fragment for the hub (e.g. `return-stacked-ge-2x`, `long-short`). The ETF page back link uses `/#${id}`.
- **`title`** — Human label; the ETF page **badge** should align with this string (return-stacked rows are **Return Stacked - 2x** vs **Return Stacked - Lower Leverage** per `etfHubData.ts`).

Decide **US vs CA**:

- US listing → hub at `/us-etfs`, page under `src/app/us-etfs/<slug>/`.
- CA listing → hub at `/ca/etfs`, page under `src/app/ca/etfs/<slug>/`.

Register the ETF on the hub: add an entry to `src/lib/etfHubData.ts` under the correct `ETF_HUB_US` / `ETF_HUB_CA` key (and `href` when the write-up exists). For **Canadian** return-stacked listings, put the row in **`return-stacked-ge-2x`** or **`return-stacked-lt-2x`** in `ETF_HUB_CA`; `getEtfHubItems` merges them into the single CA **Return Stacked** block.

## 2. Create the ETF page

**Scaffold**

1. Copy `page.module.css` from an existing ETF page (e.g. `src/app/us-etfs/mate/page.module.css`); it should stay identical across ETF pages.
2. Add `src/app/{us-etfs|ca/etfs}/<slug>/page.tsx` using this layout (same order as MATE / HDGE):

   - `metadata` (`title`, `description`)
   - `<main className={styles.main}>` → `<Nav />` → `<section className={styles.section}>`
   - Back link: `href="/us-etfs#<category-id>"` or `href="/ca/etfs#<category-id>"`
   - `<span className={styles.badge}>` — same text as category **title** in `etfCategories.ts`
   - `<h1 className={styles.heading}>` — `TICKER — Fund legal name`
   - `<p className={styles.lede}>`
   - `<ul className={styles.meta}>` — **ticker**, **issuer/manager**, **inception**, **structure** (if useful), then **Beta** (vs SPY when computed from chart, or a disclosed estimate), then **MER**, then **AUM** (fund-level unless the issuer only publishes firm-wide AUM—say so in pedigree). **Order:** **Beta**, then **MER**, then **AUM**—never put MER/AUM inside `<EtfChartPanel />`.
   - `<h2 className={styles.chartHeading}>` — `{TICKER} price history` (use the primary ticker string, e.g. `HDGE.TO` or `MATE`)
   - `<EtfChartPanel symbol="…" initialPayload={…} />` — range controls + chart only (below); **no** `mer` / `aum` props
   - Four `<div className={styles.bodySection}>` blocks with `<h2>` headings in this exact order:
     1. `Strategy`
     2. `Manager and Issuer Pedigree`
     3. `Outperformance`
     4. `Official ETF page` — lead with **Read the official ETF page for …** then the external link (`{TICKER} official page`), then **`<EtfPageDisclaimers />`** (`@/components/EtfPageDisclaimers`) for the shared Beta/MER + educational footnotes. Do **not** add a long “beta vs. SPY / currency” footnote unless the user asks.
   - `</section>` → `<Footer />`

**Price chart (required for parity with MATE/HDGE)**

1. `src/lib/getCachedEtfChart.ts` — add `getCached<Name>Chart` using `fetchDailySeries('<YAHOO_SYMBOL>', range)` and the same cache pattern as existing helpers.
2. `src/app/api/etf-chart/route.ts` — map the Yahoo symbol string to the new getter (same `if (symbol === '…')` style).
3. `src/components/EtfChartPanel.tsx` — ensure the Yahoo symbol string is supported (see `etfChartSymbols.ts` / API allowlist).

Use `getCached…Chart('1y')` (or `max` if you standardize on MATE) in the page server component when calling the chart.

## 3. Research deep dives (before writing copy)

Do not rely on ticker aggregators alone. Build the **Strategy**, **Manager and Issuer Pedigree**, and **Outperformance** sections from primary-ish sources: the issuer’s ETF page, ETF Facts / prospectus / annual / semi-annual reports, and reputable interviews or firm materials.

**Tone and vocabulary** (weave in where accurate, not as buzzword soup):

- **Alpha**, **risk-adjusted** returns, **correlation** to broad beta, **drawdown** / downside **risk management**
- **Hedge-fund-style** or **alternatives** framing when the product is long/short, managed futures, multi-strategy, or explicitly absolute-return
- **Quant / systematic / factor / trend** language when disclosures describe models, rules, or multi-factor engines
- **AUM**: **fund-level** figures belong in meta (`<ul className={styles.meta}>`) and ETF Facts; **issuer / group-level** total AUM belongs in **Manager and Issuer Pedigree** when you can source it (see §3e)
- **Outperformance** as *when* the edge tends to appear (regimes, dispersion, trend persistence), not as a promise of results
- **Competitive advantage**: what is hard to replicate—research depth, execution, data, organizational history, cost of replication—not generic “quality management”

### 3a. Deep dive: the ETF’s official page

Read the issuer’s product page end to end (and linked regulatory PDFs). Extract:

- **Mechanics**: long/short limits, leverage, sleeves, rebalance frequency, benchmarks (if any), fee structure (management vs performance)
- **Strategy DNA**: Is it **relative value**, **long-only beta plus overlay**, **trend**, **market-neutral**, etc.?
- **Risk posture**: net exposure targets, hedges, what the fund is *not* promising (no fixed leverage, etc.)—summarize in plain English

Feed the **Strategy** section and the **Official ETF page** link line (what readers will find there).

### 3b. Deep dive: management

Identify **who runs the portfolio** (named PMs, sub-advisor, internal team). From filings and firm bios, capture:

- **Process**: discretionary vs **quant**, research pipeline, how positions are sized and risk is controlled
- **Credibility**: tenure, prior mandates, whether the same team runs parallel institutional or hedge products
- **Alpha story**: what edge the disclosures claim—**factor** exposure, **trend** capture, security selection—and how **risk management** is described

This material fills **Manager and Issuer Pedigree** (manager-focused paragraphs) and informs **Outperformance** (what must be true in markets for that process to work).

### 3c. Deep dive: issuer (sponsor)

The **legal issuer / sponsor** (ETF trust, parent asset manager) is a separate lens from the day-to-day PM:

- **Scale**: **AUM**, listed vs private, breadth of **alternatives** and **quant** capabilities
- **Strategic positioning**: why this ETF exists in the lineup (democratize hedge-fund-like access, institutional tech in a wrapper, etc.)
- **Moat**: brand, distribution, research org, technology—only what is factual from public sources

Use this for the **issuer** half of **Manager and Issuer Pedigree** (firm pedigree, not just the PM’s CV).

### 3d. Outperformance section (regimes, tone, return stacking)

- **Lead with favorable regimes**—when the process tends to add value: macro trends, dispersion, factor alignment, carry, curve shape, crisis correlation, etc. This section answers **“when does the edge show up?”**, not **“here is why you should be afraid.”**
- **Do not** default to ending on a purely negative paragraph (risks, melt-ups, when it fails). Prospectus covers downside; here, keep the **last paragraph constructive**—reinforce **when conditions are good** for the strategy, or summarize the positive regime in one tight beat. Risks belong in **Strategy** or filings, not as the mandatory emotional closer.
- **Return-stacked** funds (first sleeve ≈ benchmark beta, e.g. S&P 500 + a second sleeve): the **first sleeve** is the **beta** anchor; **incremental edge** vs. that benchmark typically comes from the **second sleeve**. Center **Outperformance** on **market conditions where the second sleeve shines** (e.g. managed futures: persistent macro trends, stress divergence; futures yield: favorable roll/carry, cross-asset setups). Name that split explicitly when it clarifies the story.
- **Single-strategy / non-stacked** funds (e.g. long/short equity only): focus on regimes favorable to **both** books or the core alpha engine (dispersion, selection, factor spreads)—still avoid a **negative-only** final paragraph unless the user asks for balanced risk language.

### 3e. Issuer (group) AUM in pedigree — when findable

**Goal:** The first paragraph under **Manager and Issuer Pedigree** should ground the sponsor in **scale**: readers see fund size in meta; they should also see **how big the issuer is** when public data allows.

**What to add**

- Look up **consolidated / group assets under management** (or “assets under supervision” / regulatory R&A) for the **named issuer or parent** in **recent** annual reports, earnings releases, month-end AUM press releases, Form ADV summaries, or major-bank / cooperative group reporting (e.g. BMO, Desjardins).
- Add **one sentence** in the pedigree block: cite approximate figure, currency if material, and **as-of date** or period (e.g. “about $2.2 trillion at Dec. 31, 2025 (month-end release)”).
- **Order-of-magnitude is fine**; round trillions/billions cleanly. If the only public number is ETF-complex size from sponsor league tables, say so (“high single-digit billions USD in industry league data—order of magnitude”).

**When you cannot find a credible total**

- Say the sponsor is a **specialist / boutique** (or that consolidated AUM is **not widely published**) and point readers to the issuer site or filings—**do not invent a number**.

**Hand-authored `page.tsx`**

- Put the issuer AUM sentence in the **first** `<p>` under **Manager and Issuer Pedigree** (or merge into the opening firm paragraph), before or after the PM story as reads best.

**Dynamic `[slug]` pages (`src/lib/etfDynamicRegistry.ts`)**

- Use **`ped(issuer, groupAum?)`**: the optional second argument is that **one-sentence** issuer/group AUM clause appended to the standard first pedigree paragraph. Custom `pedigreeParas: string[]` (e.g. multi-paragraph stories) should still include group AUM in the **issuer**-focused paragraph when available.

**Do not confuse**

- Meta line **AUM** = usually **this fund** (or, if you only have firm-wide for a boutique, label clearly in copy / pedigree, not a misleading meta-only number).

## 4. Concision (word budgets)

Deep research is **not** an excuse for long copy on the page. Prefer density over breadth: one sharp idea per paragraph.

**Per paragraph**

- **Lede** (`<p className={styles.lede}>`): **≤55 words** — one thesis only.
- **Body** (`bodySection` `<p>`): **≤100 words per paragraph** (hard ceiling). Aim **55–85 words**; **2–4 sentences**. If a draft blows past ~90 words, **split into two `<p>` blocks** or cut clauses.
- **Official ETF page** section: **one short paragraph** before the link (same **≤100 words** rule), then disclaimers as `smallNote`.

**Per section (under each `<h2>` in `bodySection`)**

- **Strategy**, **Manager and Issuer Pedigree**, and **Outperformance** each: **≤320 words total** across all paragraphs under that heading (soft budget). If you need more, you are usually repeating the prospectus—tighten or pick one extra nuance, not a full extra essay.

**How to stay under budget**

- Default to **two paragraphs** per section rather than three unless each is very short.
- Lead with the investor-relevant claim; drop throat-clearing and duplicate definitions.
- Numbers (AUM, gross long/short): **one** well-chosen figure beats a table in prose. Prefer **issuer group AUM** in pedigree and **fund AUM** in meta when both exist.

**TSX/JSX: spaces after `</strong>` (mandatory pattern)**

- **Do not rely** on a literal space or indented newline after `</strong>`—in practice, the next word can still render **smushed** (e.g. “cross-assetfutures”, “futures yieldstack”) depending on wrapping and minification.
- **Default**: whenever `</strong>` is followed by another **word** (letters), use **`</strong>{' '}`** before that word. Punctuation glued to the closing tag (`</strong>—`, `</strong>.`, `</strong>;`) can stay as-is.
- **Alternative**: keep `</strong>` and the entire next word on one line with no break between them, or wrap the whole phrase in one `<strong>…</strong>`.
- Also avoid **`word <strong`** (TypeScript may parse `<` as less-than); reorder or use `{' '}<strong>`.

## 5. Checklist

- [ ] If **multiple ETFs**: issuer sites fetched early; network permission issues surfaced before deep implementation
- [ ] Category `id` matches back-link hash; badge matches category **title**
- [ ] Meta list includes **MER** and **AUM** immediately **after** **Beta** (see scaffold); not inside the chart panel
- [ ] Hub lists the new ETF with correct `href`
- [ ] Section headings and “Official ETF page” opener match the shared template
- [ ] Chart: getter + API branch + `EtfChartPanel` type + `chartCurrency` if non-USD (see HDGE)
- [ ] Copy reflects deep reads of issuer ETF page, manager, and sponsor; regime/outperformance tied to strategy
- [ ] **Pedigree** includes **issuer / group-level AUM** when findable (source + period); if not findable, states boutique / undisclosed scale (§3e). Dynamic pages: `ped(issuer, groupAum?)` or equivalent in custom `pedigreeParas`
- [ ] **Outperformance** emphasizes favorable regimes; closing paragraph is not purely negative; return-stacked pages stress the **second sleeve** when the first tracks the benchmark (§3d)
- [ ] Lede and each body `<p>` respect word budgets (§4); no paragraph runs past **100 words**
- [ ] Every `</strong>` → word boundary uses **`</strong>{' '}`** (or one-line / single-`<strong>` phrase); spot-check for smushes like “yieldstack” (see §4)

## 6. Reference implementations

- US: `src/app/us-etfs/mate/page.tsx`, `src/app/us-etfs/hfgm/page.tsx` (global macro)
- CA: `src/app/ca/etfs/hdge/page.tsx`, `src/app/ca/etfs/arb/page.tsx` (arbitrage)
