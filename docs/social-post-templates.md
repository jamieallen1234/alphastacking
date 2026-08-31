# Social post templates (X/Twitter)

Manual posting reference for @alphastackingco. Read before drafting a post.

**Link ratio:** keep roughly 1 linked post for every 4 non-linked posts.
"ETF added" and "Portfolio added" always link to alphastacking.co.
"What alpha stacking is," "Alpha strategies & regimes," "Investor
archetypes," "Myth-busting," "Grading methodology," and "Historical regime
callbacks" never link. "Portfolio Builder" is the one exception: each
pattern in that section is individually tagged `[link]` or `[no link]`
instead of following a category default.

**Voice:** plainspoken confident. Short declarative sentences, max one
adjective per noun, no "here's why" setups, no em dashes (use a comma,
period, or parentheses instead).

**Length:** 280 characters max. Patterns with a `{URL}` token reserve
about 24 characters plus a space for the link (X shortens all links to a
fixed length via t.co); text-only patterns get the full 280.

---

## Shared tokens

- `{URL}`: full `https://alphastacking.co/...` link, used only in
  patterns explicitly marked `[link]`.
- `{TICKER}`: fund ticker, e.g. `UPRO`.

---

## 1. ETF added to site (always links)

Grades come from the Capital Efficiency / Alpha Efficiency system
(`beta-efficiency-grades` skill): A+/A/B+/B/C/D scale, benchmarked against
**SPY = B**. Capital Efficiency applies to equity-side vehicles (LETFs,
factor equity); Alpha Efficiency applies to alt/uncorrelated sleeves
(managed futures, premia, arb, macro). Stacked ETFs (MATE, RSST, etc.)
carry both grades at once.

Tokens: `{TICKER}`, `{FULL_NAME}`, `{GRADE_TYPE}` (Capital Efficiency /
Alpha Efficiency), `{GRADE}`, `{STANDOUT_FACT}` (one line pulled from the
ETF's actual hub blurb, e.g. "3x daily S&P 500 exposure designed for
tactical high-beta positioning"), `{URL}`.

1. **Straight grade announcement**
   `Just graded {TICKER}: {GRADE} {GRADE_TYPE}. {STANDOUT_FACT}. {URL}`
   > Just graded UPRO: A+ Capital Efficiency. 3x daily S&P 500 exposure
   > built for tactical high-beta positioning. https://alphastacking.co/us-etfs/upro

2. **"What makes it special" lead**
   `{TICKER} isn't just another {CATEGORY_NAME} fund. {STANDOUT_FACT}. Grade: {GRADE} {GRADE_TYPE}. {URL}`
   > SSO isn't just another leveraged equity fund. 2x daily S&P 500
   > exposure via derivatives and daily reset leverage. Grade: A Capital
   > Efficiency. https://alphastacking.co/us-etfs/sso

3. **Capital-efficiency framing (freed capital)**
   `{TICKER} frees up {CAPITAL_FREED_PCT} of capital versus holding SPY outright. That's room for another sleeve on the same dollar. {GRADE} Capital Efficiency. {URL}`
   > UPRO frees up 66.7% of capital versus holding SPY outright. That's
   > room for another sleeve on the same dollar. A+ Capital Efficiency.
   > https://alphastacking.co/us-etfs/upro

4. **Alpha-efficiency framing (hurdle-clearing)**
   `{TICKER} clears its financing hurdle and keeps earning past it. {STANDOUT_FACT}. {GRADE} Alpha Efficiency. {URL}`
   > DBMF clears its financing hurdle and keeps earning past it. Trend
   > following across equities, rates, FX, and commodities. A Alpha
   > Efficiency. https://alphastacking.co/us-etfs/dbmf

5. **Low-beta bonus framing**
   `{TICKER} earns real return above its hurdle, then gets extra credit for doing it at low beta. That combination is rare. {GRADE} Alpha Efficiency. {URL}`
   > FLSP earns real return above its hurdle, then gets extra credit for
   > doing it at low beta. That combination is rare. A Alpha Efficiency.
   > https://alphastacking.co/us-etfs/flsp

6. **Stacked ETF, both grades**
   `{TICKER} carries two grades at once: {GRADE_A} Capital Efficiency, {GRADE_B} Alpha Efficiency. {STANDOUT_FACT}. {URL}`
   > RSST carries two grades at once: A Capital Efficiency, B Alpha
   > Efficiency. 1x S&P 500 and 1x managed futures on the same dollar.
   > https://alphastacking.co/us-etfs/rsst

7. **New listing, provisional grade**
   `New on the site: {TICKER}. {STANDOUT_FACT}. Grade is provisional until 12 months of live history. {URL}`
   > New on the site: IALT. Systematic alternatives sleeve, still
   > building live history. Grade is provisional until 12 months of live
   > history. https://alphastacking.co/us-etfs/ialt

8. **Category-anchored announcement**
   `Added {TICKER} to the {CATEGORY_NAME} lineup. {STANDOUT_FACT}. {URL}`
   > Added CLSE to the long/short lineup. Net-long US long/short equity
   > sleeve. https://alphastacking.co/us-etfs/clse

---

## 2. Portfolio added to site (always links)

Tokens: `{PORTFOLIO_NAME}`, `{WEIGHTED_BETA}`, `{STANDOUT_HOLDING}`
(ticker), `{STANDOUT_FACT}` (that holding's actual blurb), `{URL}`.

1. **New-portfolio announcement**
   `New model portfolio: {PORTFOLIO_NAME}. Weighted beta {WEIGHTED_BETA}. {URL}`
   > New model portfolio: US Alpha Stack. Weighted beta 0.95.
   > https://alphastacking.co/portfolios/us-alpha-stack

2. **"Why this combination" framing**
   `{PORTFOLIO_NAME} pairs {STANDOUT_HOLDING} with sleeves built to earn when it doesn't. {STANDOUT_FACT}. {URL}`
   > US Alpha Stack pairs SSO with sleeves built to earn when it doesn't.
   > SSO: 2x S&P 500, leveraged core beta.
   > https://alphastacking.co/portfolios/us-alpha-stack

3. **Standout-holding hook**
   `One sleeve in {PORTFOLIO_NAME} worth knowing: {STANDOUT_HOLDING}. {STANDOUT_FACT}. {URL}`
   > One sleeve in US Alpha Stack worth knowing: MATE. Managed futures
   > sleeve, trend-following across asset classes.
   > https://alphastacking.co/portfolios/us-alpha-stack

4. **Beta/drawdown comparable-to-SPY framing**
   `{PORTFOLIO_NAME} targets beta near 1.0 (currently {WEIGHTED_BETA}) with drawdown comparable to SPY, not below it. The alpha comes from the sleeves, not from ducking equity. {URL}`
   > US Alpha Stack targets beta near 1.0 (currently 0.95) with drawdown
   > comparable to SPY, not below it. The alpha comes from the sleeves,
   > not from ducking equity. https://alphastacking.co/portfolios/us-alpha-stack

5. **Rebalance-cadence detail**
   `{PORTFOLIO_NAME} rebalances {REBALANCE_SCHEDULE}. {STANDOUT_FACT}. {URL}`
   > US Alpha Stack rebalances quarterly. Managed futures sleeve,
   > trend-following across asset classes.
   > https://alphastacking.co/portfolios/us-alpha-stack

6. **Multi-sleeve count framing**
   `{PORTFOLIO_NAME} holds {N} sleeves, not one. If a single strategy goes quiet, the portfolio doesn't. {URL}`
   > US Alpha Stack holds 7 sleeves, not one. If a single strategy goes
   > quiet, the portfolio doesn't.
   > https://alphastacking.co/portfolios/us-alpha-stack

---

## 3. What alpha stacking is / why (never links)

Source: homepage hero, `/learn/what-is-alpha-stacking`,
`/learn/why-alpha-stacking`.

1. **The core "what"**
   `Alpha stacking takes the strongest ideas from several independent strategies and combines them on top of equity. Not instead of equity. On top of it.`

2. **The core "why"**
   `Most portfolios lean on equity for the bulk of long-run return. Alpha stacking adds return sources that can earn when stocks are flat or falling, held alongside equity on the same capital.`

3. **Structurally likely to work when equity isn't**
   `Stacking sleeves on top of equity isn't just diversification. It's owning return sources that are structurally likely to be working when equity isn't.`

4. **Differentiator vs. single-sleeve return stacking**
   `A single return-stacked fund isn't the same as an alpha stacking portfolio. If that one sleeve goes quiet for a few years, you're holding a more expensive version of SPY.`

5. **Plain declarative one-liner**
   `The aim is a portfolio that can seek excess return in bull, bear, and sideways markets alike, without treating more equity beta as the only dial for performance.`

6. **"One dial" contrarian framing**
   `Most portfolios only have one dial: more or less equity. Alpha stacking adds dials that don't move with the market.`

7. **Selectivity framing**
   `Every sleeve in an alpha stacking portfolio has to earn its own return. A sleeve that lowers volatility but earns nothing doesn't clear the bar.`

---

## 4. Alpha strategies & regime diversification (never links)

Tokens: `{STRATEGY_NAME}`, `{REGIME_CONTEXT}` (e.g. "sustained equity
drawdowns," "choppy sideways markets"), `{MECHANISM_FACT}`.

1. **Single-strategy spotlight**
   `{STRATEGY_NAME} earns in {REGIME_CONTEXT}. {MECHANISM_FACT}.`
   > Managed futures earns in sustained directional trends, up or down.
   > It goes long or short across equities, bonds, currencies, and
   > commodities based on which way prices are already moving.

2. **Two-strategy contrast**
   `When {STRATEGY_A} goes quiet, {STRATEGY_B} can still be working. That's the case for combining them.`
   > When managed futures goes quiet in a choppy, trendless market, merger
   > arbitrage can still be working. Deal spreads don't care which way the
   > index is moving.

3. **General "combining lowers regime risk" thesis**
   `No single strategy works in every market regime. Combining several with different regime sensitivities is what actually lowers portfolio risk across cycles, not just holding more tickers.`

4. **Historical-example anchor**
   `Managed futures made money in 2022 because rising rates and falling equities produced clean, persistent trends to capture. Most strategies don't have that kind of regime fit built in.`

5. **Dispersion framing (long/short)**
   `Long/short equity doesn't need the index to go up. It profits from dispersion, winners pulling away from losers, regardless of which direction the market moves.`

6. **Macro framing**
   `Global macro can be positioned for the very rate or currency moves that are causing an equity drawdown in the first place.`

7. **Arbitrage framing**
   `Merger arbitrage buys the target, shorts the acquirer, and earns on deal-spread convergence. Returns depend on deal completion, not on the market's direction.`

---

## 5. Investor-archetype-targeted (never links)

Each pattern states the archetype's actual reasoning fairly before
offering the alpha-stacking angle.

### LETF bros

1. `Leverage isn't the problem. Leverage with nothing else in the portfolio is. UPRO frees up 66.7% of the capital SPY would tie up. What you do with that freed capital is the real decision.`
2. `3x daily S&P 500 compounds hard in a clean uptrend and gives it back fast in chop. That's not a flaw to argue away, it's the tradeoff. The question is what else you hold alongside it.`
3. `Running a leveraged core isn't wrong. Running only a leveraged core means one bad stretch of volatility drag is the whole plan.`

### Permanent Portfolio / all-weather

1. `All-weather diversification (bonds, gold, commodities spread evenly) is a real approach. The cost is real too: 2022 was the worst year for long bonds in a generation, and gold earns close to nothing in real terms over long periods.`
2. `Spreading across uncorrelated assets lowers volatility. It also means holding sleeves with low expected return most of the time, waiting for the one regime where they pay off.`
3. `The all-weather idea, own things that zig when equity zags, is right. Alpha stacking tries to get that without giving up as much expected return: the alt sleeves still have to earn on their own, not just diversify.`

### HFEA

1. `HFEA leans on long-duration Treasuries as the hedge for a leveraged equity sleeve. 2022 was the worst year for long bonds in a generation, and it happened in the same year equities fell. The hedge and the core lost together.`
2. `A two-sleeve leveraged portfolio works until both sleeves lose at the same time. That's not a tail risk, it happened in 2022. More independent sleeves means one bad correlation regime doesn't take out the whole plan.`
3. `Leveraged equity plus long bonds is a specific bet on stock-bond correlation staying negative. When that correlation flips, as it did in 2022, the whole structure loses its hedge at once.`

---

## 6. Portfolio Builder / portfolio construction (link tagged per pattern)

The Portfolio Builder lets a user pick tickers, set weights to 100%, and
generate a live total-return chart with weighted beta and drawdown vs.
SPY for any date range. It does not output a letter grade or score. (The
letter-grade Portfolio Score at `/learn/portfolio-score` applies to the
site's own model portfolios, not to builder output. Don't conflate the
two in a tweet.)

Tokens: `{TICKER_LIST}`, `{WEIGHTED_BETA}`, `{DRAWDOWN_STAT}`, `{URL}`.

1. `[no link]` **Construction-mechanics teaching**
   `Which tickers you pick matters less than how you weight them. A 10% allocation to an uncorrelated sleeve barely moves your portfolio. 30% does.`

2. `[link]` **Direct pointer to the tool**
   `Pick tickers, set weights to 100%, generate a return chart. Test any mix of return-stacked, managed futures, long/short, and equity ETFs before you commit real money. {URL}`
   > https://alphastacking.co/portfolio-builder

3. `[link]` **Worked-example combination**
   `Tried {TICKER_LIST} in the builder: weighted beta {WEIGHTED_BETA}, drawdown {DRAWDOWN_STAT} versus SPY over the same window. {URL}`
   > Tried UPRO + DBMF + CLSE in the builder: weighted beta 1.3, drawdown
   > 41% versus SPY's 55% over the same window.
   > https://alphastacking.co/portfolio-builder

4. `[no link]` **General construction principle**
   `A portfolio isn't diversified because it holds many tickers. It's diversified when those tickers don't all lose money in the same regime.`

5. `[link]` **Efficiency-grade cross-reference**
   `The builder filters by Capital Efficiency and Alpha Efficiency grade. Mix an A+ capital-efficient equity sleeve with a solid alpha sleeve and watch the blended beta move in real time. {URL}`
   > https://alphastacking.co/portfolio-builder

6. `[no link]` **Weighting-vs-picking framing**
   `The hardest part of building a stacked portfolio isn't finding good sleeves. It's deciding how much of the book each one earns the right to.`

7. `[link]` **Date-range testing pointer**
   `Every mix in the builder can be tested against a specific date range, not just since-inception. Run it through 2022 specifically and see what actually held up. {URL}`
   > https://alphastacking.co/portfolio-builder

---

## 7. Myth-busting / common misconceptions (never links)

Source: `WhyAlphaStackingArticle.tsx`, `ReturnStackingExplainedArticle.tsx`.

1. `People think return stacking and alpha stacking are the same thing. Return stacking is just the mechanism, two things on one dollar. It doesn't say which two things to pick. Alpha stacking does: every sleeve has to earn real return on its own.`

2. `People think one return-stacked ETF is already a diversified alpha stack. It's one sleeve. Managed futures earned nothing from 2012 to 2019. If that's your only alt sleeve, a quiet stretch leaves you holding a more expensive version of SPY.`

3. `People think leverage is just risk. UPRO did fall over 70% in 2022, that's real and it's the cost you have to survive. But leverage also frees capital. What you do with that freed capital is a separate decision from the leverage itself.`

4. `People think more asset classes automatically means more diversified. 2022 was the worst year for long bonds in a generation. Spreading into bonds and gold trades away return; it doesn't guarantee protection.`

5. `People think stacking a second sleeve on leverage is free diversification. It fails when both sleeves lose together, like stocks and bonds did in 2022. It also fails quietly if the second sleeve doesn't earn enough to cover the cost of leverage.`

6. `"Diversification" gets used to mean two different things: more tickers, or more independent return sources. Only the second one actually helps in a drawdown.`

---

## 8. Grading methodology teasers (never links)

Source: `beta-efficiency-grades` skill.

1. `Every efficiency grade on the site is relative to SPY, not to zero. SPY is the B baseline. A grade above B means a fund is actually beating the simplest possible benchmark, not just existing.`

2. `Capital Freed = 1 minus 1 over beta. SSO (2x) frees 50% of the capital SPY would tie up. UPRO (3x) frees 66.7%. That freed capital is the whole argument for pairing leverage with a second sleeve.`

3. `Alpha Efficiency gives bonus credit for low beta and negative beta, but only after a sleeve clears its financing hurdle. A flat, cash-like sleeve doesn't get rewarded just for being uncorrelated.`

4. `An alpha sleeve that merely matches the risk-free rate grades C. Matching your financing cost isn't adding value, it's breaking even on the overlay.`

5. `Stacked ETFs carry two grades at once, Capital Efficiency and Alpha Efficiency, because they're doing two jobs on one dollar. One grade alone would hide half the picture.`

---

## 9. Historical regime callbacks (never links)

Tokens: `{PERIOD}`, `{DATED_CLAIM}`, `{LESSON}`.

1. **GFC**
   `September 2008 to June 2009: SPY was cut in half in nine months. A portfolio with no return source besides equity had nothing else to lean on.`

2. **2022, clean trend**
   `2022: the S&P fell 18%, bonds fell 13%, and managed futures ETFs gained roughly 20 to 30%. Rising rates and falling equities at the same time produced clean, persistent trends to capture.`

3. **2000-2010, lost decade**
   `The 2000s are called the "lost decade" for a reason: equity was roughly flat for ten years. Systematic macro and long/short strategies outperformed over the same stretch.`

4. **Inflation spike, 2021-2022**
   `Late 2021 into 2022: CPI hit 9%, oil ran from $50 to $130, and a standard 60/40 portfolio had its worst year in decades. Bonds didn't hedge that one.`

5. **Q4 2018, chop not trend**
   `Q4 2018: the Fed hiked into slowing growth, SPY dropped 20% in a quarter, then snapped back just as fast. Not every regime produces a clean trend to capture, sometimes it's just chop.`

6. **2014-2016, deflation**
   `Late 2014 into early 2016: oil crashed from $100 to $28 and pushed long-bond yields to multi-decade lows. A different regime again, a different set of sleeves earning.`
