<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:no-em-dashes -->
# No em dashes in user-facing text

Do **not** use the **em dash** (`—`) or `&mdash;` in any copy a reader sees on the site or in outbound user-facing channels.

## Where this applies

- Visible strings in React/TSX (headings, paragraphs, buttons, labels, `aria-label` when it reads as prose)
- Page metadata users see: `title`, `description`, Open Graph fields
- Learn articles, ETF strategy/pedigree/outperformance paragraphs, hub ledes, home sections
- User-visible emails or API copy returned to the client

## What to use instead

- **Comma** or **which/that** clause: `strategies, which include…` not `strategies—which include…`
- **Period** and a short follow-up sentence
- **Parentheses** for a tight aside: `proven strategies (long/short equity, …) and combines`
- **Colon** when introducing a list is natural

## Exceptions

- **Verbatim** regulatory or third-party legal text: do not alter punctuation that must match the source.
- **Numeric ranges** may use a hyphen or en dash (`10–30`, `20-25`); that is not an em-dash aside.

## Quick check

If you type `—` or `&mdash;` in new user-facing copy, rewrite the sentence without it.
<!-- END:no-em-dashes -->

<!-- BEGIN:copy-voice -->
# Copy voice rules — alphastacking.co

## Surface → voice mapping

| Surface | Voice |
|---|---|
| Homepage (Hero, Framework, EtfRetailMission, Stats, AlphaExample, HomePortfolioCharts) | Plainspoken confident |
| Portfolio hub, builder lede, nav link labels | Plainspoken confident |
| Learn hub (`/learn`) | Plainspoken confident |
| Learn articles | Teacher |
| ETF hub ledes, category subtitles | Plainspoken confident |
| Individual ETF pages (strategy, pedigree, outperformance sections) | Hedge-fund memo |
| Legal disclaimer text (Nav banner, Footer blocks) | Leave untouched — compliance copy |

---

## Voice 1: Plainspoken confident (home, chrome)

- Short declarative sentences. Say the thing. Don't soften the claim.
- Max one adjective per noun.
- No em-dash asides used as a way to smuggle in a qualification. (See project rule **no-em-dashes**: never ship `—` / `&mdash;` in user-facing text; use commas, periods, or parentheses.)
- No "here's why…" / "it's worth noting that…" setups.
- Fine to name technical concepts (carry, dispersion, managed futures) without definition — this is the intro, not a glossary.
- A pure index investor should understand the first paragraph. A sophisticated investor shouldn't feel talked down to.

## Voice 2: Teacher (Learn articles)

- Concrete numbers and real examples. Abstract claims need a "$10k over 10 years" type anchor when possible.
- Define terms on first use, in the sentence, not in a separate callout box.
- State the honest failure mode. "This doesn't work when…" is required for each strategy comparison.
- It is fine — encouraged — to say "a total-market index fund is the right default for most people." Alpha stacking is for people who want more and accept more complexity.
- No filler setups: no "Let's explore…", "In this article, we will…", "It's important to understand…".
- Sections must be self-contained. A reader who skips to section 3 shouldn't be lost.

## Voice 3: Hedge-fund memo (ETF pages)

- Opinionated and specific. Say which tapes the fund wins in; say which tapes it loses in.
- Use field vocabulary without apology: capital efficient, convex, carry, drawdown, notional, rebalance drag, vol-of-vol. No inline glosses unless the term is rare.
- Each Outperformance section must end with an explicit **Favorable tape / Hostile tape** pair. Example:
  - *Favorable: sustained equity uptrend with positive carry in the futures book and low vol-of-vol.*
  - *Hostile: mean-reverting tape with frequent gap-reversals; financing costs erode the leverage edge.*
- Bold the single concept that defines each environment: the favorable condition in the favorable paragraph, its opposite in the hostile paragraph. The two bolded phrases should mirror each other — a skimmer should be able to read just those two and understand the fund's whole bet. Example: **persistent trends** (favorable) and **no sustained macro theme** (hostile).
- Pedigree section: cite the actual firm, key personnel if known, track record length, and any notable structural detail (sub-adviser, operating platform, fee type). Don't use "well-established" or "reputable" without facts.

### Bold on ETF pages

Bold exists to help a skimming reader find the one or two strongest concepts in each section. Pick the concept that most changes how someone thinks about the fund — not the most frequently repeated word, not a modifier, not a number stripped of its noun.

- **Lede:** bold the fund's category name and the single most important structural fact (e.g. "100% S&P 500" and "100% managed futures"). Two or three maximum.
- **Strategy, Pedigree, Outperformance:** one or two bolded phrases per section. Bold the concept that earns its place: a sector name, a structural fact, a firm name on first use. Everything else plain.
- If you find yourself bolding more than one phrase per paragraph, remove all but the strongest. A paragraph with four bolded phrases has no emphasis at all.
- Standalone test: if a skimmer sees only the bolded text, does it mean something on its own? "Global Macro" passes — it names the category. "10–30" fails — it's a number without its noun. "not" fails — it's a modifier with no referent. Bold the concept, not the decoration around it.

---

## Hard bans (empty marketing filler — never ship)

These phrases carry no information. If you find yourself writing one, replace it with the specific claim it was trying to avoid making.

```
synergistic
best parts of
proven strategies
comprehensive
robust (when describing a portfolio or strategy)
journey
in today's market
at your own pace
plain-language
step by step (as a setup phrase)
deep dive
unlock
empower
discover infinite possibilities
hedge fund like strategies (vague)
```

## Allowed in the right context

These are **not** bans. They become slop only when used as padding.

| Phrase | When fine | When not fine |
|---|---|---|
| "accessible to everyone" / "for every investor" | Stating the ETF-only mission (vs private funds) | Closing a paragraph as a feel-good flourish |
| "we believe" / "we think" | Taking an explicit editorial stance ("we think LETFs alone are insufficient because…") | "We believe in quality" |
| "seeks to" / "aims to" | Describing a fund's legal mandate per prospectus ("SSO seeks 2× daily S&P 500 returns") | Softening a portfolio claim ("the strategy aims to perform well") |
| "designed to" | Explicit product mandate | Our own claims |
| "not personalized advice" | Inside a Learn article that gave specific-looking guidance | Repeated inline — legal footer already covers it |

**Rule of thumb:** if removing the phrase changes nothing about the claim, it was filler.
<!-- END:copy-voice -->
