/**
 * Model parameters for simulated pre-inception series. Must stay in sync with merge libs.
 */

/** NTSD: expense + financing / implementation (annualized). */
export const NTSD_SYNTHETIC_ANNUAL_DRAG = 0.006

/** HFGM pre-listing leg: 1.5× ASGM daily returns minus a small implementation / fee haircut (annualized). */
export const HFGM_ASGM_SYNTHETIC_ANNUAL_DRAG = 0.006

/**
 * HEQL.TO ≈ 1.25× HEQT.TO on **daily total returns** (Yahoo adjusted close = TR incl. distributions).
 * Each day’s scaled return `1.25 × r_HEQT` reinvests the 1.25× notional consistently in the chain.
 */
export const HEQL_SYNTHETIC_LEVERAGE = 1.25

/** First session we treat as actual HEQL.TO (NYSE Arca / TSX listing), NY calendar. */
export const HEQL_FIRST_REAL_NY_DAY = '2023-10-12'

/** First session we treat as actual USSL.TO (Yahoo meta). */
export const USSL_FIRST_REAL_NY_DAY = '2024-05-22'

/** First session we treat as actual QQQL.TO (Yahoo meta). */
export const QQQL_FIRST_REAL_NY_DAY = '2024-05-22'

/** Incremental notional beyond 1× HEQT (1.25× − 1×). */
export const HEQL_EXTRA_NOTIONAL = 0.25

/**
 * Annual **financing / carry** assumed on the **extra 0.25×** HEQT notional only (CAD context).
 * Ballpark **Canadian wholesale / policy-linked** short rates (CORRA corridor, bank prime minus
 * typical retail spread for collateralized institutional-style borrow) — **not** full retail
 * prime on the whole fund. Applied as /252 on the synthetic leg; **NAV-level** drag =
 * `HEQL_EXTRA_NOTIONAL × this` (~1.1%/yr at 4.5% on the sleeve). Revisit when BoC path shifts.
 */
export const HEQL_CAD_FINANCING_RATE_ON_EXCESS_NOTIONAL_ANNUAL = 0.045

/** Total annual drag on simulated HEQL NAV from financing on the levered slice only. */
export const HEQL_SYNTHETIC_ANNUAL_DRAG =
  HEQL_EXTRA_NOTIONAL * HEQL_CAD_FINANCING_RATE_ON_EXCESS_NOTIONAL_ANNUAL

/**
 * Portfolio / builder **stacked-product chart proxies** (`buildPreInceptionProductStackMerge`): wholesale-style
 * financing on **gross exposure above 100%** (stack sleeve notionals from `ETF_STACK_EXPOSURE_BY_SLUG`).
 * Daily drag: `(max(0, gross% − 100) / 100) × this / 252` in multiplier space with the leg product. Not
 * fund-specific swap lines, MER, or tax drag.
 */
export const STACKED_PRODUCT_PROXY_ANNUAL_BORROW_PER_OVERLAY_SLICE = 0.04
