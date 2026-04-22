---
name: create-etf-page
description: >-
  Adds a new ETF detail page to Alpha Stacking (US or CA hub), wires the hub
  listing, hooks up the price chart, and guides deep research into the issuer
  product page, manager, and sponsor. Use when creating ETF write-ups, adding
  tickers, or drafting strategy/pedigree/outperformance copy with a hedge-fund
  and alpha lens. Enforces concise paragraphs, section word budgets, and
  constructive Outperformance framing (favorable regimes; return-stacked second sleeve).
  When adding multiple ETFs in one request, follow the batch workflow: verify every
  issuer URL early, then complete the full checklist per ticker—no thin copy on “the rest.”
---

# Create ETF page (Alpha Stacking)

## Multiple ETFs in one request (batch mode)

Use this whenever the user names **two or more** tickers or asks to “add several” ETFs. **Do not** treat the first ETF as the only one that gets MATE-level depth, official URLs, charts, and hub wiring.

### Why batch fails without structure

Agents often: (1) research only the first ticker, (2) reuse generic issuer homepages for siblings, (3) skip `etfDynamicRegistry` parity (§3f) on later rows, or (4) wire the hub for one symbol and forget chart allowlists for others. This section forces a **repeatable pass per ticker**.

### Phase A — Discovery and access (before most code)

1. **List every symbol** the user asked for (US vs CA, primary ticker / `.TO` class if relevant). If hub category is ambiguous, pick the best fit from `etfCategories.ts` / `etfHubData.ts` or ask once for the whole batch—not per ticker unless truly unclear.
2. **Fetch or open every official fund URL** (issuer product page, family page with this fund, or SEC summary prospectus per §3f) **for each ticker**. Do this in **one early batch** so the user can **approve network access once** before long edits. Note any 404s, bot walls, or redirects before writing copy.
3. **Decide page type per ticker**: hand-authored `page.tsx` vs dynamic `etfDynamicRegistry.ts` row—same rules as a single ETF; a batch may mix both.

### Phase B — Full skill pass, **per ticker**, in order

For **each** ETF, complete **before** moving to the next (or explicitly parallelize only when each thread still runs the full list below):

| Step | Hand-authored `page.tsx` | Dynamic registry row |
| --- | --- | --- |
| Category / hub | `etfHubData.ts` + back-link `/#id` | `hubCategoryId`, `badge` aligned with `etfCategories.ts` |
| Official link | §2 “Official ETF page” + verified `href` | `officialUrl` + `officialLabel` (§3f); not issuer root |
| Body depth | §3 + §4 (Strategy / Pedigree / Outperformance) | `lede`, 2× `strategyParas`, `ped(…)`, 2× `outperfParas` |
| Chart | §2 chart steps + `ETF_CHART_SYMBOLS` / API | `yahooSymbol` in allowlist + same chart plumbing if new symbol |
| Portfolio proxy links | §2b: add **`HAND_AUTHORED_US_SLUG`** entry for this uppercase ticker | §2b: if ticker is a chart proxy, **`yahooSymbol`** match supplies the hub link—else **`OFFICIAL_ETF_HOME`** |
| Checklist | Run §5 mentally for **this** ticker | Same §5 lines for **this** slug |

**Per-ticker parity rule:** The *n*th ETF in the batch must meet the **same** research and URL standards as the first. If you are tired or running long, **finish one ticker completely** rather than shipping three half-done pages.

### Phase C — Integration sweep (after all tickers)

- Confirm **every** new hub `href` resolves (no typos vs `app` routes or `[slug]` keys).
- Confirm **every** new chart symbol has getter + `route.ts` branch + panel typing.
- If any new ticker is a **portfolio chart proxy** (footnotes / synthetic modeling), confirm **`portfolioProxyEtfNav.ts`** per §2b.
- Quick read: ledes and outperform closings not copy-paste identical across unrelated funds (§3d).

### Batch anti-patterns (do not do these)

- One deep write-up plus **placeholder** or **aggregator** URLs for the other tickers.
- Same **Outperformance** boilerplate pasted across funds with different mechanics.
- Adding hub rows **without** the page or registry entry (or the reverse).
- Skipping **Beta / MER / AUM order** in meta or **official link verification** on “small” names in the list.

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
   - Meta rows (current standard):
     - Row 1 (`<ul className={styles.meta}>`): **ticker**, **issuer/manager**, **inception**
     - Row 2 (`<ul className={styles.meta}>`): **Category** (from `def.structure`), then **Beta**, **MER**, **AUM**
     - Keep **Beta → MER → AUM** order and never put MER/AUM inside `<EtfChartPanel />`.
     - **Beta benchmark rule:** do not force SPY globally. Use market-appropriate benchmark defaults (**US tickers → SPY**, **`.TO` tickers → XIU.TO**) unless a specific ETF needs an explicit override (`betaBenchmarkSymbol`).
   - `<h2 className={styles.chartHeading}>` — `{TICKER} price history` (use the primary ticker string, e.g. `HDGE.TO` or `MATE`)
   - `<EtfChartPanel symbol="…" initialPayload={…} />` — range controls + chart only (below); **no** `mer` / `aum` props
   - Four `<div className={styles.bodySection}>` blocks with `<h2>` headings in this exact order:
     1. `Strategy`
     2. `Manager and Issuer Pedigree`
     3. `Outperformance`
     4. `Official ETF page` — lead with **Read the official ETF page for …** then the external link (`{TICKER} official page`), then **`<EtfPageDisclaimers />`** (`@/components/EtfPageDisclaimers`) for the shared Beta/MER + educational footnotes. Do **not** add a long “beta benchmark / currency” footnote unless the user asks.
   - `</section>` → `<Footer />`

**Price chart (required for parity with MATE/HDGE)**

1. `src/lib/getCachedEtfChart.ts` — add `getCached<Name>Chart` using `fetchDailySeries('<YAHOO_SYMBOL>', range)` and the same cache pattern as existing helpers.
2. `src/app/api/etf-chart/route.ts` — map the Yahoo symbol string to the new getter (same `if (symbol === '…')` style).
3. `src/components/EtfChartPanel.tsx` — ensure the Yahoo symbol string is supported (see `etfChartSymbols.ts` / API allowlist).

Use `getCached…Chart('1y')` (or `max` if you standardize on MATE) in the page server component when calling the chart.

## 2b. Portfolio chart proxy links (`portfolioProxyEtfNav`)

Preset portfolio charts (`src/components/PresetPortfolioChart.tsx`) wrap many footnote tickers in **`ProxyLink`**, which calls **`getPortfolioProxyEtfNav`** in **`src/lib/portfolioProxyEtfNav.ts`**. If that function returns **`null`**, the ticker still shows in the disclaimer but **is not a link**—readers lose the “on-site review vs official fund page” behavior.

### When this applies

Update proxy navigation **whenever the ETF you add (or its Yahoo symbol) appears as a proxy or sleeve** in portfolio modeling—not only when you add a hub write-up. Quick discovery:

- Search the codebase for **`ProxyLink`**, **`getPortfolioProxyEtfNav`**, **`OFFICIAL_ETF_HOME`**, and preset / synthetic helpers (**`syntheticProxyMerge`**, **`computePortfolioChart`**, blurbs that say “proxied by” / “pre-history”).
- Common linked tickers in footnotes today include **SPY**, **EFA**, **QQQ**, **VFV.TO**, **HEQT.TO**, **HEQL.TO**, **USSL.TO**, **QQQL.TO**, **NTSD**, **MATE**, **RSST**, **FLSP**, **DBMF**, **ASGM**, plus **dynamic slot symbols** (e.g. IALT, HFGM) that must resolve the same way.

### What to change in `portfolioProxyEtfNav.ts`

Resolution order is fixed: **hand-authored US slug** → **US dynamic registry** (`yahooSymbol` match, case-insensitive) → **CA dynamic registry** → **`OFFICIAL_ETF_HOME`** external issuer URL.

| Situation | Action |
| --- | --- |
| New **US hand-authored** page under `src/app/us-etfs/<slug>/` and the chart uses that **uppercase** ticker (e.g. `ORR`) | Add **`TICKER: 'slug'`** to **`HAND_AUTHORED_US_SLUG`**. |
| Fund is a **US or CA `etfDynamicRegistry.ts`** row and **`yahooSymbol`** matches the proxy string | **No map change**—slug routing is automatic; CA reviews use **`/ca/etfs/{slug}`**. |
| Proxy ticker is used in charts but **there is no on-site page yet** (not in hand map or registries) | Add **`'TICKER': 'https://…'`** to **`OFFICIAL_ETF_HOME`** using the **exact** Yahoo-style key (uppercase; include **`.TO`** if that is what `ProxyLink` passes). Use a **verified** fund product URL (same bar as §3f `officialUrl`). |
| You **later** add a write-up so the ticker is covered on-site | **Remove** that symbol from **`OFFICIAL_ETF_HOME`** if it was only a fallback, so the internal hub route wins. |

**Hub base:** `getPortfolioProxyEtfNav` receives **`hubBaseUs`** (`/us-etfs` vs `/ca/us-etfs`); the component derives it from the pathname—no change needed for normal ETF page work unless you alter that convention.

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

### 3f. Dynamic hub entries — parity with hand-authored pages

When the write-up is a registry row (`US_ETF_DYNAMIC_REGISTRY` / `CA_ETF_DYNAMIC_REGISTRY`) rather than `src/app/.../page.tsx`, treat it with the **same research bar** as MATE (§3): primary issuer materials, ETF Facts, prospectus summaries—not ticker-aggregator blurbs alone.

**`officialUrl` and `officialLabel` (required)**

- **`officialUrl`:** Must be the **best fund-specific URL** you can find on the **issuer or product sponsor** site: the page where an investor would reasonably go for **this ETF’s** factsheet, ETF Facts, holdings, and regulatory PDFs (e.g. iShares product permalink, `investcip.com/etfstrategies.html` for CLSE, `militiaetf.com` for ORR). **Prefer that over** generic industry homepages (`etf.com`, undifferentiated “all ETFs” hub pages, or a parked/unrelated domain). If the sponsor only publishes a family page that lists the fund with a stable anchor, use that page; if no web page exists, use the SEC filing index or summary prospectus URL the issuer links to—and keep `officialLabel` honest (“SEC filings (TICKER)”).
- **`officialLabel`:** Short, specific text for the outbound link (e.g. `iShares (IALT)`, `Convergence Investment Partners (CLSE)`). It should read like a **product** destination, not vague “Issuer website.”
- **Verify:** Open `officialUrl` (fetch or browser); confirm it is **live**, **HTTPS**, and **about this fund**—not 404, not a domain-for-sale page, not the wrong company.

**Body fields (same intent as §2 body sections, as strings)**

- **`lede`:** One clear thesis (respect §4 word budget when rendered).
- **`strategyParas`:** Typically **two** strings—mechanics, sleeves, leverage/rebalance, risks, what to read in the prospectus—mirroring **Strategy** depth.
- **`pedigreeParas`:** Prefer **`ped(p1, p2)`** with **two** substantive paragraphs (manager/process + issuer scale or boutique honesty per §3e), then the automatic **`PED_VERIFY`** footer—mirroring **Manager and Issuer Pedigree**.
- **`outperfParas`:** **Two** strings following §3d (favorable regimes; product-specific; closing paragraph not purely negative). Do **not** rely on generic `outf()`-style boilerplate.
- **`inception` / `mer` / `aum`:** Use **ETF Facts / prospectus** when stating numbers; use `—` or “see ETF Facts” if unknown—**do not invent**.
- **MER + performance fee:** When the fund charges a **performance fee** on top of management, set registry `mer` to **`<management>% + perf fee`** (e.g. `0.85% + perf fee`, `0% + perf fee`). Spell out hurdles, crystallization, and “see prospectus” detail in **Strategy** / pedigree / ETF Facts notes—not in the meta line (keeps the stat row scannable and matches `parseMerAnnual` picking the first `x%`).

**Rendering note**

- Registry strings are shown as **plain text** in the dynamic template—**no Markdown** (`**bold**`, etc.); write in normal sentences.

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

- [ ] **Batch (2+ ETFs):** Phase A done—every ticker has a **verified** official URL plan (or SEC fallback labeled in `officialLabel`) before bulk `page.tsx` / registry edits
- [ ] **Batch:** Phase B done—**each** ticker received a **full** pass (hub + page or registry + chart where applicable); no ticker left with generic-only official link or thin vs first ticker
- [ ] **Batch:** Phase C integration sweep (hub `href`s, chart allowlist for **all** new symbols)
- [ ] Category `id` matches back-link hash; badge matches category **title**
- [ ] Meta rows follow the standard: row 1 = **Ticker/Issuer/Inception**, row 2 = **Category/Beta/MER/AUM** (Beta → MER → AUM order); not inside the chart panel
- [ ] Beta uses market benchmark defaults (US→SPY, `.TO`→XIU.TO) or an intentional `betaBenchmarkSymbol` override; do not hardcode SPY for Canadian ETFs
- [ ] Hub lists the new ETF with correct `href`
- [ ] Section headings and “Official ETF page” opener match the shared template
- [ ] Chart: getter + API branch + `EtfChartPanel` type + `chartCurrency` if non-USD (see HDGE)
- [ ] **Portfolio proxies:** If this ticker (or `yahooSymbol`) appears in **`PresetPortfolioChart`** / synthetic preset copy, **`portfolioProxyEtfNav.ts`** is updated per §2b (hand slug, registry parity, or **`OFFICIAL_ETF_HOME`**; drop official-only row when an on-site page exists)
- [ ] Copy reflects deep reads of issuer ETF page, manager, and sponsor; regime/outperformance tied to strategy
- [ ] **Dynamic registry (`etfDynamicRegistry.ts`):** `officialUrl` is a **verified, fund-specific** issuer/sponsor product page (or clearly labeled SEC/prospectus fallback per §3f)—**not** a generic aggregator default; `officialLabel` names the product/destination clearly
- [ ] **Dynamic registry:** `lede` + two **`strategyParas`** + **`ped(...)`** (two pedigree paragraphs before verify) + two **`outperfParas`** match MATE-level depth (§3f); no Markdown in strings
- [ ] **Stacked sleeves:** if the ETF has both capital and alpha sleeves, add / update `src/lib/etfStackExposureBySlug.ts` with explicit component weights (`capital` vs `alpha`) and benchmark mapping (core and market) so grading does not rely on text inference
- [ ] **Pedigree** includes **issuer / group-level AUM** when findable (source + period); if not findable, states boutique / undisclosed scale (§3e). Dynamic pages: `ped(issuer, groupAum?)` or equivalent in custom `pedigreeParas`
- [ ] **Outperformance** emphasizes favorable regimes; closing paragraph is not purely negative; return-stacked pages stress the **second sleeve** when the first tracks the benchmark (§3d)
- [ ] Lede and each body `<p>` respect word budgets (§4); no paragraph runs past **100 words**
- [ ] Every `</strong>` → word boundary uses **`</strong>{' '}`** (or one-line / single-`<strong>` phrase); spot-check for smushes like “yieldstack” (see §4)

## 6. Reference implementations

- US: `src/app/us-etfs/mate/page.tsx`, `src/app/us-etfs/hfgm/page.tsx` (global macro)
- CA: `src/app/ca/etfs/hdge/page.tsx`, `src/app/ca/etfs/arb/page.tsx` (arbitrage)
