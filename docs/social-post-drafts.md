# Social post drafts (ready to post)

One tweet per ETF and per live portfolio, US and CA editions. Check the
box once posted. Text is copy-paste ready as written. Every ETF entry's
"Learn why it's rated..." clause reflects the live Capital/Alpha
Efficiency grade pulled directly from the site's grading engine on the
date this file was generated. Grades recompute monthly on the live site,
so re-pull (see "Regenerating grades" below) before posting anything more
than a few weeks old, in case a grade has moved. Six US tickers (NTSD,
WDIG, VIRT, OOQB, OOSB, RSIT) return no grade at all, either too new or
outside the graded fund types; those entries describe the fund only and
skip the grade clause rather than inventing one.

**Posting order:** don't post straight down this list. The order here is
intentionally mixed (not alphabetical, not grouped strictly by category)
and phrasing is varied post-to-post on purpose, so consecutive tweets
don't share an opening word, sentence shape, or length. Pick from
wherever in the list fits the day, not top-to-bottom.

**Source of truth:** ETF fields pulled from `getEtfHubItems()` /
`etfHubData.ts` (60 US, 24 CA). Portfolio fields pulled from
`usPortfolioRoutes` / `caPortfolioRoutes` in `portfolioRoutes.ts`, live
routes only (12 US, 7 CA; excludes 1 US placeholder and 1 CA
coming-soon stub with no real content yet). Regenerate an entry if the
underlying blurb, grade, or weighted beta changes on the site.

**Regenerating grades:** `npx tsx scripts/fetchAllEfficiencyGrades.ts`
prints live Capital/Alpha Efficiency grades for every US and CA ETF as
JSON (also logs progress per ticker to stderr). It calls the same
`computeMonthlyEfficiencyPatchForSlug` function the live site uses, so
values match what a visitor sees on the ETF page that day.

---

## US ETFs (60)

- [ ] **RSSB** Global equities stacked with a Treasury bond sleeve in one capital-efficient wrapper. Learn why it's rated A+ Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/rssb
- [ ] Most portfolios pick equity or bonds. **RSST** holds ~$1 S&P 500 and ~$1 managed futures on the same dollar, no picking required. Learn why it's rated A+ Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/rsst
- [ ] **RSSY** stacks large-cap US equity with a futures yield (carry) sleeve. Two return sources, one ticker. Learn why it's rated A+ Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/rssy
- [ ] 100% S&P 500 beta, 100% trend-following managed futures, one fund. That's **MATE**. Learn why it's rated B+ Capital Efficiency and B+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/mate
- [ ] **RSBT**: ~$1 broad US bond exposure plus ~$1 systematic managed futures trend, stacked instead of split. Learn why it's rated D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/rsbt
- [ ] International equity rarely gets a trend-following overlay. **RSIT** pairs ~$1 large-cap international with ~$1 managed futures. https://alphastacking.co/us-etfs/rsit
- [ ] **GDMN** stacks gold miners equity with a leveraged gold-futures sleeve. A concentrated precious-metals bet, not a diluted one. Learn why it's rated A+ Capital Efficiency and B Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/gdmn
- [ ] **GDE**: large-cap US equity with a layered gold futures overlay, about 90/90 notional. Gold as a second engine, not a hedge afterthought. Learn why it's rated A Capital Efficiency and A Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/gde
- [ ] The original 90/60: **NTSX** pairs a US equity core with a Treasury futures overlay in one wrapper. Learn why it's rated A Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/ntsx
- [ ] **HOLD** layers large-cap US equity with a trend-following managed-futures sleeve. Learn why it's rated B+ Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/hold
- [ ] Same 90/60 structure as NTSX, developed ex-US instead. **NTSI**: international equity core plus Treasury futures overlay. Learn why it's rated B Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/ntsi
- [ ] **NTSE** takes the 90/60 structure to emerging markets: EM equity core plus Treasury futures overlay. Learn why it's rated C Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/ntse
- [ ] Inflation-linked Treasuries plus a gold futures overlay, lower leverage than most stacked funds. That's **GDT**. Learn why it's rated D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/gdt
- [ ] **NTSD** stacks US large-cap equity with developed international equity index futures, 90/60 style, in a single ticket. https://alphastacking.co/us-etfs/ntsd
- [ ] Rare earths and strategic metals as an equity theme, then a base-metals futures overlay on top. **WDIG** in one line. https://alphastacking.co/us-etfs/wdig
- [ ] **IALT** is BlackRock's actively managed multi-strategy systematic alternatives sleeve. New enough that its grade is still provisional. Learn why it's rated B+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/ialt
- [ ] Active style premia and multi-asset long/short, targeting absolute return regardless of which way stocks go. That's **FLSP**. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/flsp
- [ ] **FMTM** runs active quantitative momentum on 30 to 50 large/mid-cap US names, short lookback, rotating between offense and defense. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/fmtm
- [ ] Tech-sector momentum, rules-based, via Dorsey Wright relative strength. **PTF**. Learn why it's rated A Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/ptf
- [ ] **SPMO** tracks the S&P 500 Momentum Index: large-cap names with the strongest risk-adjusted momentum scores. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/spmo
- [ ] 25 liquid US large caps, selected for technical strength, sector caps applied. **STRN**'s momentum sleeve in one sentence. Learn why it's rated B+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/strn
- [ ] **AVDV** runs systematic international small-cap value with profitability screens layered in. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/avdv
- [ ] Quality growth at a reasonable price, US large/mid, earnings-growth and quality screens tilted toward valuation discipline. **GARP**. Learn why it's rated A Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/garp
- [ ] **VFLO** is a large-cap cash-cows sleeve: rules-based free-cash-flow yield versus a broad large/mid benchmark. Learn why it's rated A+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/vflo
- [ ] Same free-cash-flow discipline as VFLO, small-cap instead. **SFLO**. Learn why it's rated C Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/sflo
- [ ] **AVUV** is actively managed US small-cap value: profitability, value, and investment discipline versus Russell 2000 Value. Learn why it's rated B Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/avuv
- [ ] Rules-based US large-cap free-cash-flow yield, no discretionary overlay. That's **COWZ**. Learn why it's rated B Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/cowz
- [ ] **COPY** filters global deep-value stocks for one specific signal: corporate insiders buying their own shares. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/copy
- [ ] A focused, all-cap emerging-markets book, picked bottom-up instead of tracking an index. **EMEQ**. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/emeq
- [ ] **AFOS** runs about 30 high-conviction US names, chosen for valuation margin of safety and secular-trend exposure. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/afos
- [ ] A ~30-name, quant-driven earnings-growth book with no sector constraints. **SGRT** in one sentence. Learn why it's rated B+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/sgrt
- [ ] **CTA** runs Altis's systematic futures models across equities, rates, commodities, and FX. Low equity correlation is the point. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/cta
- [ ] **DBMF** seeks to replicate pre-fee managed-futures hedge fund exposure, SG CTA style, in an ETF wrapper. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/dbmf
- [ ] Rules-based trend following on the KFA MLM Index: commodities, currencies, global bond futures. **KMLM**. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/kmlm
- [ ] **FOXY** runs a systematic EM carry trade and G10 mean-reversion strategy through currency forwards and futures. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/foxy
- [ ] Systematic long/short across hard assets and commodity futures, in one ETF wrapper. **HARD**. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/hard
- [ ] **CLSE** is actively managed long/short US equity from Convergence Investment Partners. Learn why it's rated A+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/clse
- [ ] Higher-turnover fundamental long/short global equity, from Militia Investments. **ORR**. Learn why it's rated A+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/orr
- [ ] **MEMA** combines systematic signals with portfolio-manager discretion for actively managed EM long/short equity. Learn why it's rated B+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/mema
- [ ] 90% US large-cap equity paired with a 90% ML-driven long/short overlay, one wrapper. **WTLS**, from WisdomTree and AlphaBeta. Learn why it's rated B+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/wtls
- [ ] **VAMO** blends quantitative value and momentum with systematic tactical hedging via S&P 500 futures. Cambria Investment Management. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/vamo
- [ ] An active global macro sleeve targeting hedge-fund-sector return dynamics through ETFs and futures. That's **HFGM**. Learn why it's rated C Capital Efficiency and B Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/hfgm
- [ ] **ASGM** runs systematic global macro: equity sleeves plus futures across rates, currencies, and commodities. Learn why it's rated C Capital Efficiency and A+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/asgm
- [ ] Rules-based exposure to the S&P Merger Arbitrage Index, a liquid listed sleeve for announced M&A spreads. **MRGR**. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/mrgr
- [ ] **QLD** delivers 2x daily Nasdaq-100 exposure with daily reset leverage. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/qld
- [ ] 3x daily Nasdaq-100 leverage, built for tactical growth-beta expression. **TQQQ**. Learn why it's rated A Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/tqqq
- [ ] **UPRO** delivers 3x daily S&P 500 exposure for tactical high-beta positioning. Learn why it's rated A+ Capital Efficiency, the highest on the site, at alphastacking.co. https://alphastacking.co/us-etfs/upro
- [ ] 2x daily S&P 500, daily reset leverage via derivatives. **SSO**. Learn why it's rated A Capital Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/sso
- [ ] **CLOA** is BlackRock's actively managed fund in USD-denominated AAA-rated CLO tranches: floating-rate structured credit income. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/cloa
- [ ] Floating-rate senior structured credit, near-zero duration and equity correlation. That's **JAAA**, actively managed AAA CLO tranches. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/jaaa
- [ ] **VIRT** is the only pure-play HFT stock on the site: market-making revenue accelerates when volatility spikes, no roll drag like VIX ETFs carry. https://alphastacking.co/us-etfs/virt
- [ ] S&P 500 option structures built as a tail-risk sleeve alongside equity beta. **CAOS**. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/caos
- [ ] **ATTR** pairs actively managed US large-cap exposure with tactical tail-risk options overlays aimed at drawdown mitigation. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/attr
- [ ] ~100% Nasdaq-100, ~100% bitcoin futures, one capital-efficient sleeve. **OOQB**, often shorthanded as "QQQ + BTC." https://alphastacking.co/us-etfs/ooqb
- [ ] **OOSB** runs the same dual-exposure structure as OOQB, S&P 500 instead of Nasdaq: ~100% equity, ~100% bitcoin futures. https://alphastacking.co/us-etfs/oosb
- [ ] Large-cap US equity stacked with gold and bitcoin sleeves both. **RSSX**, the Return Stacked line's three-way stack. Learn why it's rated A+ Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/rssx
- [ ] **SPBC** runs 100% S&P 500 equity with a targeted ~10% spot bitcoin overlay via ETPs, rebalanced quarterly. Learn why it's rated A Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/spbc
- [ ] Crude oil and bitcoin futures, roughly balanced notional sleeves, actively managed. **WTIB**. Learn why it's rated B+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/wtib
- [ ] **BTGD** stacks ~100% bitcoin and ~100% gold exposure via futures and ETPs. Quantify's STKd structure. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/btgd
- [ ] Leveraged long exposure to a blended crypto and precious-metals sleeve. **BEGS**, from Rareview. Learn why it's rated D Alpha Efficiency at alphastacking.co. https://alphastacking.co/us-etfs/begs

## CA ETFs (24)

- [ ] **RGBM.TO** runs the Canadian Return Stacked line: ~$1 global balanced sleeve plus ~$1 systematic macro per dollar. USD share class is RGBM.U. Learn why it's rated B Capital Efficiency and D Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/rgbm
- [ ] Absolute return, credit, real assets, macro, and directional long/short equity, one ticket. **ONEC.TO**, Accelerate's OneChoice fund. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/onec
- [ ] **PFAA.TO** is Picton Mahoney's multi-strategy alpha alternatives book, in an ETF structure. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/pfaa
- [ ] Systematic long/short across equity, FX, rates, and commodities, targeting value, carry, and momentum premia with no directional bias. **PMM.TO**. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/pmm
- [ ] **FCCM.TO**: 100 Canadian large-cap names, ranked by the strongest momentum signals, rebalanced quarterly. Learn why it's rated A+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/fccm
- [ ] Same rules-based momentum sleeve as FCCM, US large-caps instead. **FCMO.TO**. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/fcmo
- [ ] **FINN.NE** is Mark Schmehl's concentrated, actively managed global equity book, benchmarked to the Nasdaq Composite, momentum-driven and high-conviction. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/finn
- [ ] A low-volatility tilt toward cheaper, cash-generative Canadian banks, utilities, and staples. **ZLB.TO**. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/zlb
- [ ] **ATSX.TO** runs quantitative 150/50 Canadian long/short equity against the S&P/TSX 60, directional and hedge-fund-style. Learn why it's rated A+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/atsx
- [ ] 130/30 Canadian equity long/short, about 100% net exposure, built on Picton Mahoney's Authentic Hedge process. **PFAE.TO**. Learn why it's rated A+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/pfae
- [ ] **HDGE.TO** is Accelerate's quantitative long/short North American equity strategy, in an ETF wrapper. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/hdge
- [ ] Global long/short equity, moderate net exposure, Authentic Hedge-style process. **PFLS.TO**. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/pfls
- [ ] **TGAF.TO** runs global long/short equity across 200+ names, roughly 100% long and 40% short, versus MSCI ACWI NR in CAD. Learn why it's rated A Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/tgaf
- [ ] Actively managed market-neutral long/short equity, Authentic Hedge style, in an ETF. **PFMN.TO**. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/pfmn
- [ ] **DGLM.TO** runs long/short global macro across equities, rates, commodities, and currencies. Graham Capital sub-advises. Learn why it's rated B+ Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/dglm
- [ ] Merger and SPAC arbitrage, targets and acquirers both, low-volatility and event-driven. **ARB.TO**. Learn why it's rated B Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/arb
- [ ] **HQU.TO** delivers 2x daily Nasdaq-100 exposure with daily reset leverage, from BetaPro. Learn why it's rated A Capital Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/hqu
- [ ] An enhanced-beta Nasdaq-100 sleeve targeting about 1.25x exposure. **QQQL.TO**, from Global X. Learn why it's rated A+ Capital Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/qqql
- [ ] **USSL.TO** targets about 1.25x S&P 500 exposure through an enhanced-beta structure. Learn why it's rated A Capital Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/ussl
- [ ] 2x daily S&P 500 in CAD, tactical high-beta positioning. **HSU.TO**, BetaPro's bull fund. Learn why it's rated A Capital Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/hsu
- [ ] **HEQL.TO** targets about 1.25x exposure to a diversified global equity mix, all in one enhanced allocation. Learn why it's rated B+ Capital Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/heql
- [ ] Primarily AAA-rated CLO bonds, actively managed: floating-rate coupons, low equity correlation. **BAAA.TO**, from Brompton Wellington Square. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/baaa
- [ ] **BTCC-B.TO** holds spot Bitcoin in cold storage. Purpose's flagship Canadian physical BTC sleeve, CAD unhedged. Learn why it's rated C Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/btccb
- [ ] Spot Ether in custody, low fee versus many peers. **ETHX-B.TO**, from CI and Galaxy, CAD unhedged. Learn why it's rated D Alpha Efficiency at alphastacking.co. https://alphastacking.co/ca/etfs/ethxb

## US Portfolios (12)

- [ ] **US Multi-Strategy** is a diversified US-listed mix built with intentional beta near 1.0. https://alphastacking.co/portfolios/us-international
- [ ] **US Alpha Stack** runs an LETF-heavy core alongside trend, long/short equity, alternatives, and macro sleeves, beta near 1.0. https://alphastacking.co/portfolios/us-advanced
- [ ] Momentum, free-cash-flow value, and Nasdaq-100 growth, buffered by long/short equity, no leverage anywhere. That's the **Factor - Momentum & Value Barbell**. https://alphastacking.co/portfolios/us-core-buy-hold
- [ ] **US + Gold & Alt Blend** pairs a gold-plus-equity core with long/short equity, S&P 500 leverage, style premia, free-cash-flow tilt, and S&P momentum. https://alphastacking.co/portfolios/us-gde-clse-blend
- [ ] Managed futures and systematic alternatives as the primary alpha engine, anchored by S&P momentum equity. **Trend - CTA / Managed Futures**. https://alphastacking.co/portfolios/alpha-stack
- [ ] **UPRO Premia Stack** pairs a 3x S&P 500 core with systematic long/short equity and EM currency carry premia. https://alphastacking.co/portfolios/upro-premia-stack
- [ ] Five return-stacked ETFs, one for each macro regime: Growth, Inflation, Recession, Mean-reversion, Deflation. **Return Stacked - 5:4:3:2:1**. https://alphastacking.co/portfolios/5-4-3-2-1
- [ ] **LETF Stack - 2x** pairs a 2x S&P 500 leveraged core with long-duration Treasuries, managed futures trend, and gold for cross-regime balance. https://alphastacking.co/portfolios/letf-stack-2x
- [ ] Same structure as the 2x version, one turn higher: 3x S&P 500 core, Treasuries, trend, gold. **LETF Stack - 3x**, advanced. https://alphastacking.co/portfolios/letf-stack-3x
- [ ] **Long/Short Equity** runs net-long long/short across US and global markets, paired with capital-efficient international equity and cross-asset diversifiers in futures, commodities, and currencies. https://alphastacking.co/portfolios/long-short-equity
- [ ] About 90% equity notional (US large-cap plus developed international), 36% bonds, 26% gold, all through return-stacked wrappers. **Risk Parity - All Weather**. https://alphastacking.co/portfolios/risk-parity
- [ ] **Alpha Quadrants** runs four sleeves, each pairing a shared growth-beta engine with its own alpha source: long/short equity, factor premia, systematic premia, managed futures. https://alphastacking.co/portfolios/four-alpha-quadrants

## CA Portfolios (7)

- [ ] **Global + Long/Short** blends CAD-diversified US and Canadian sleeves with intentional beta near 1.0. https://alphastacking.co/ca/portfolios/ca-international
- [ ] A levered US growth stack paired with Canadian low-vol equity and preferred income. **US & Canada - Low Beta & Long/Short**. https://alphastacking.co/ca/portfolios/ca-core-buy-hold
- [ ] **Factor - Momentum & Value** pairs Canadian-listed momentum and Nasdaq growth with US small-cap value, 60% growth and 40% value, buy and hold. https://alphastacking.co/ca/portfolios/ca-factor-fcmo
- [ ] Three positions, buy and hold: concentrated levered US growth plus a Canadian market-neutral long/short sleeve. **US + Long/Short**. https://alphastacking.co/ca/portfolios/ca-ussl-qqql-hdge
- [ ] **S&P 500 + Macro Stack** blends concentrated US leveraged beta with Canadian macro, return-stacked, and arbitrage diversifiers. https://alphastacking.co/ca/portfolios/ca-sso-dglm-rgbm-arb
- [ ] A leveraged S&P 500 and Nasdaq core, paired with managed futures and market-neutral sleeves. **Canadian Alpha Stack**. https://alphastacking.co/ca/portfolios/ca-alpha-stack
- [ ] **Alpha Quadrants** (CA) runs the same four-sleeve model as its US counterpart: shared growth beta, four distinct alpha sources on top (long/short equity, factor premia, systematic premia, managed futures). https://alphastacking.co/ca/portfolios/ca-four-alpha-quadrants
