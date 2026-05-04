'use client'

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { ETF_PAGES_BUILDER_101_SLUG, learnArticlePath } from '@/lib/learnArticles'
import styles from './PortfolioBuilderTour.module.css'

/** Bump when the 4-step tutorial flow changes. Single key for US + CA builders — avoids v7 per-edition drift (CA dismissed while US still showed). */
const MAIN_TOUR_COMPLETED_KEY = 'alphastacking:portfolio-builder-tour:v8:completed'
/** v7 per-edition keys — cleared by “Show builder tour again”; completion reads only v8. */
const LEGACY_MAIN_TOUR_KEYS = [
  'alphastacking:portfolio-builder-tour:v7:us',
  'alphastacking:portfolio-builder-tour:v7:ca',
] as const

/** One-shot hints after the tutorial — not numbered as tour steps. */
const HINT_ADD_ROW_PREFIX = 'alphastacking:portfolio-builder-hint:add-row:v1:'
const HINT_ALPHA_SLEEVE_PREFIX = 'alphastacking:portfolio-builder-hint:alpha-sleeve:v1:'
const HINT_GENERATE_PREFIX = 'alphastacking:portfolio-builder-hint:generate:v1:'

const INTRO_STEP_TARGET_ID = 'portfolio-builder-tour-intro'

const TARGET_ADD_ROW = 'portfolio-builder-tour-add-row'
/** Last row efficiency (new lines from +) — alpha sleeve hint targets here */
const TARGET_NEW_ROW_EFF = 'portfolio-builder-tour-new-row-eff'
const TARGET_GENERATE = 'portfolio-builder-tour-generate'

type Edition = 'us' | 'ca'

function hintAddRowKey(edition: Edition) {
  return `${HINT_ADD_ROW_PREFIX}${edition}`
}

function hintAlphaSleeveKey(edition: Edition) {
  return `${HINT_ALPHA_SLEEVE_PREFIX}${edition}`
}

function hintGenerateKey(edition: Edition) {
  return `${HINT_GENERATE_PREFIX}${edition}`
}

/** Query param: append `?resetPortfolioBuilderTour=1` to the portfolio builder URL to replay the tour (cookies/cache do not clear localStorage). */
export const RESET_PORTFOLIO_BUILDER_TOUR_SEARCH_PARAM = 'resetPortfolioBuilderTour'

export function clearPortfolioBuilderTourLocalStorage() {
  try {
    window.localStorage.removeItem(MAIN_TOUR_COMPLETED_KEY)
    for (const k of LEGACY_MAIN_TOUR_KEYS) {
      window.localStorage.removeItem(k)
    }
    for (const edition of ['us', 'ca'] as const) {
      window.localStorage.removeItem(hintAddRowKey(edition))
      window.localStorage.removeItem(hintAlphaSleeveKey(edition))
      window.localStorage.removeItem(hintGenerateKey(edition))
    }
  } catch {
    /* ignore */
  }
}

function readMainTourCompletedFromStorage(): boolean {
  try {
    return window.localStorage.getItem(MAIN_TOUR_COMPLETED_KEY) === '1'
  } catch {
    return false
  }
}

/** Stable subscribe for useSyncExternalStore — same-tab updates via custom `local-storage` event from markComplete / reload. */
function subscribeTourDismissed(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }
  const handler = () => onStoreChange()
  window.addEventListener('storage', handler)
  window.addEventListener('local-storage', handler)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener('local-storage', handler)
  }
}

function useTourDismissedFromStorage(): boolean {
  return useSyncExternalStore(
    subscribeTourDismissed,
    () => (typeof window === 'undefined' ? false : readMainTourCompletedFromStorage()),
    () => false,
  )
}

function readHintSeen(keyForEdition: string): boolean {
  try {
    return window.localStorage.getItem(keyForEdition) === '1'
  } catch {
    return false
  }
}

type TourStep = {
  title: string
  body: string
  targetId: string
}

/** ETF step index (0-based). Next/Done gated until the first row has weight + ETF. */
const STEP_ETF = 3

const MAIN_STEP_COUNT = 4

const FIRST_ROW_ALLOC_ID = 'portfolio-builder-tour-first-alloc'
const FIRST_ROW_FILTERS_ID = 'portfolio-builder-tour-first-filters'
const FIRST_ROW_ETF_ID = 'portfolio-builder-tour-first-etf'

const FIRST_ROW_TOUR_IDS = new Set<string>([
  FIRST_ROW_ALLOC_ID,
  FIRST_ROW_FILTERS_ID,
  FIRST_ROW_ETF_ID,
])

function stepsForEdition(): TourStep[] {
  return [
    {
      title: `Step 1 of ${MAIN_STEP_COUNT} — Welcome`,
      targetId: INTRO_STEP_TARGET_ID,
      body: `This four-step tour covers weights, filters, and picking an ETF. Start line one as an equity sleeve (Efficiency → Equity): core market-beta exposure before you add diversifying sleeves. After you finish, optional tips cover adding lines, an alpha sleeve on new rows, and generating the chart.`,
    },
    {
      title: `Step 2 of ${MAIN_STEP_COUNT} — Weight`,
      targetId: FIRST_ROW_ALLOC_ID,
      body: 'Enter each line’s weight as a percent of the whole portfolio (for example 15 or 50). Line one is usually where you park your equity sleeve.',
    },
    {
      title: `Step 3 of ${MAIN_STEP_COUNT} — Efficiency & category`,
      targetId: FIRST_ROW_FILTERS_ID,
      body: 'Narrow the ETF list using Efficiency (Equity, Alpha, or Stacked) and Category so the dropdown only shows funds that fit your sleeve.',
    },
    {
      title: `Step 4 of ${MAIN_STEP_COUNT} — ETF`,
      targetId: FIRST_ROW_ETF_ID,
      body: 'Pick a fund from the ETF field — search by ticker or name.',
    },
  ]
}

/**
 * Centered in the viewport, expressed relative to `document.body` — matches `position: absolute` when body is
 * `position: relative` (see globals.css). Using scrollY + rect was wrong and shifted hints (e.g. + row) off-target.
 */
function staticTourPopoverLayout(popW: number, popH: number): { top: number; left: number } {
  const br = document.body.getBoundingClientRect()
  return {
    top: Math.max(24, (window.innerHeight - popH) / 2 - br.top),
    left: Math.max(16, (window.innerWidth - popW) / 2 - br.left),
  }
}

function documentCoverHeight(): number {
  if (typeof document === 'undefined') return 0
  const el = document.documentElement
  return Math.max(el.scrollHeight, el.clientHeight, window.innerHeight)
}

type TourPopoverLayout = {
  top: number
  left: number
  arrowLeft: number
  placement: 'below' | 'above'
}

/** Shared viewport band for the first holdings row — ETF cell is taller than weight/filters, so per-field bottoms drift steps downward. */
function firstRowViewportBand(): { top: number; bottom: number } | null {
  let top = Infinity
  let bottom = -Infinity
  let any = false
  for (const id of FIRST_ROW_TOUR_IDS) {
    const node = document.getElementById(id)
    if (!node) continue
    any = true
    const r = node.getBoundingClientRect()
    top = Math.min(top, r.top)
    bottom = Math.max(bottom, r.bottom)
  }
  return any && Number.isFinite(top) ? { top, bottom } : null
}

/** Layout vs `document.body` (portaled + body `position: relative`); steps 2–4 share one vertical band; arrow targets each control. */
function tourLayoutForTarget(targetId: string, popW: number, popH: number): TourPopoverLayout {
  const br = document.body.getBoundingClientRect()
  const padBelow = 14
  const padAbove = 8
  const inset = 16
  const sx = window.scrollX
  const sy = window.scrollY

  if (targetId === INTRO_STEP_TARGET_ID) {
    const s = staticTourPopoverLayout(popW, popH)
    return { ...s, arrowLeft: popW / 2, placement: 'below' }
  }

  const el = document.getElementById(targetId)
  if (!el) {
    const s = staticTourPopoverLayout(popW, popH)
    return { ...s, arrowLeft: popW / 2, placement: 'below' }
  }

  const rect = el.getBoundingClientRect()
  const fieldCenterBodyX = rect.left - br.left + rect.width / 2

  let left = fieldCenterBodyX - popW / 2
  const minLeftBody = sx + inset - br.left
  const maxLeftBody = sx + window.innerWidth - popW - inset - br.left
  left = Math.max(minLeftBody, Math.min(maxLeftBody, left))

  /** Uncapped so the notch stays on the target when the card is viewport-clamped (clamping hid right-column controls). */
  const arrowLeft = fieldCenterBodyX - left

  const rowBand = FIRST_ROW_TOUR_IDS.has(targetId) ? firstRowViewportBand() : null

  let top: number
  let placement: 'below' | 'above'
  if (rowBand) {
    top = rowBand.bottom - br.top + padBelow
    placement = 'below'
    if (br.top + top + popH > sy + window.innerHeight - inset) {
      top = rowBand.top - br.top - popH - padAbove
      placement = 'above'
    }
  } else {
    top = rect.bottom - br.top + padBelow
    placement = 'below'
    if (br.top + top + popH > sy + window.innerHeight - inset) {
      top = rect.top - br.top - popH - padAbove
      placement = 'above'
    }
  }

  return { top, left, arrowLeft, placement }
}

type FollowUpHintsProps = {
  edition: Edition
  suppressAutoTour: boolean
  firstRowComplete: boolean
  canGenerate: boolean
  rowCount: number
}

function PortfolioBuilderFollowUpHints({
  edition,
  suppressAutoTour,
  firstRowComplete,
  canGenerate,
  rowCount,
}: FollowUpHintsProps) {
  const titleId = useId()
  const popoverRef = useRef<HTMLDivElement>(null)
  const [addRowSeen, setAddRowSeen] = useState(false)
  const [alphaSleeveSeen, setAlphaSleeveSeen] = useState(false)
  const [generateSeen, setGenerateSeen] = useState(false)
  const [layout, setLayout] = useState<TourPopoverLayout>({
    top: 24,
    left: 16,
    arrowLeft: 160,
    placement: 'below',
  })
  const [coverHeight, setCoverHeight] = useState(0)

  useLayoutEffect(() => {
    setAddRowSeen(readHintSeen(hintAddRowKey(edition)))
    setAlphaSleeveSeen(readHintSeen(hintAlphaSleeveKey(edition)))
    setGenerateSeen(readHintSeen(hintGenerateKey(edition)))
  }, [edition])

  const syncHintsFromStorage = useCallback(() => {
    setAddRowSeen(readHintSeen(hintAddRowKey(edition)))
    setAlphaSleeveSeen(readHintSeen(hintAlphaSleeveKey(edition)))
    setGenerateSeen(readHintSeen(hintGenerateKey(edition)))
  }, [edition])

  useEffect(() => {
    const onStorage = () => syncHintsFromStorage()
    window.addEventListener('storage', onStorage)
    window.addEventListener('local-storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('local-storage', onStorage)
    }
  }, [syncHintsFromStorage])

  /** More holdings → alpha sleeve (after +) → generate. Alpha sleeve requires the add-row tip cleared first. */
  const activeHint = useMemo(() => {
    if (suppressAutoTour) return null
    if (!addRowSeen && firstRowComplete) return 'add-row' as const
    if (!alphaSleeveSeen && addRowSeen && rowCount >= 2) return 'alpha-sleeve' as const
    if (!generateSeen && canGenerate) return 'generate' as const
    return null
  }, [
    suppressAutoTour,
    addRowSeen,
    alphaSleeveSeen,
    generateSeen,
    firstRowComplete,
    canGenerate,
    rowCount,
  ])

  const targetId =
    activeHint === 'add-row'
      ? TARGET_ADD_ROW
      : activeHint === 'alpha-sleeve'
        ? TARGET_NEW_ROW_EFF
        : activeHint === 'generate'
          ? TARGET_GENERATE
          : null

  const dismissAddRow = useCallback(() => {
    try {
      window.localStorage.setItem(hintAddRowKey(edition), '1')
    } catch {
      /* ignore */
    }
    setAddRowSeen(true)
    window.dispatchEvent(new Event('local-storage'))
  }, [edition])

  const dismissAlphaSleeve = useCallback(() => {
    try {
      window.localStorage.setItem(hintAlphaSleeveKey(edition), '1')
    } catch {
      /* ignore */
    }
    setAlphaSleeveSeen(true)
    window.dispatchEvent(new Event('local-storage'))
  }, [edition])

  const dismissGenerate = useCallback(() => {
    try {
      window.localStorage.setItem(hintGenerateKey(edition), '1')
    } catch {
      /* ignore */
    }
    setGenerateSeen(true)
    window.dispatchEvent(new Event('local-storage'))
  }, [edition])

  const dismissActive = useCallback(() => {
    if (activeHint === 'add-row') dismissAddRow()
    else if (activeHint === 'alpha-sleeve') dismissAlphaSleeve()
    else if (activeHint === 'generate') dismissGenerate()
  }, [activeHint, dismissAddRow, dismissAlphaSleeve, dismissGenerate])

  const updatePosition = useCallback(() => {
    if (!targetId) return
    const popW = Math.min(320, window.innerWidth - 32)
    const popH = 220
    setLayout(tourLayoutForTarget(targetId, popW, popH))
  }, [targetId])

  useLayoutEffect(() => {
    if (!targetId) return
    const syncCover = () => setCoverHeight(documentCoverHeight())
    syncCover()
    const run = () => {
      updatePosition()
      requestAnimationFrame(() => requestAnimationFrame(() => updatePosition()))
    }
    const raf = requestAnimationFrame(run)
    const onResize = () => {
      syncCover()
      updatePosition()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [targetId, updatePosition])

  useEffect(() => {
    if (!targetId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissActive()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [targetId, dismissActive])

  useEffect(() => {
    if (targetId) popoverRef.current?.focus({ preventScroll: true })
  }, [targetId])

  if (!activeHint || !targetId) return null

  const title =
    activeHint === 'add-row'
      ? 'More holdings'
      : activeHint === 'alpha-sleeve'
        ? 'Alpha sleeve'
        : 'Generate your chart'
  const body =
    activeHint === 'add-row'
      ? 'Add more rows with + if you need several holdings.'
      : activeHint === 'alpha-sleeve'
        ? 'New rows default to Alpha efficiency — pick an alpha diversifier here (alternatives, managed futures, long/short, etc.) to complement your equity sleeve.'
        : 'When allocations are valid, Generate loads total return vs SPY, drawdowns, and range controls for your mix.'

  const overlay = (
    <div className={styles.tourMount} style={{ minHeight: Math.max(coverHeight, documentCoverHeight()) || '100vh' }}>
      <button type="button" className={styles.backdrop} aria-label="Dismiss" onClick={dismissActive} />
      <div
        ref={popoverRef}
        className={`${styles.popover} ${
          layout.placement === 'below' ? styles.popoverPlacementBelow : styles.popoverPlacementAbove
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={
          {
            top: layout.top,
            left: layout.left,
            ['--tour-arrow-left' as string]: `${layout.arrowLeft}px`,
          } as React.CSSProperties
        }
      >
        <span className={styles.popoverArrowOuter} aria-hidden />
        <span className={styles.popoverArrowInner} aria-hidden />
        <p id={titleId} className={styles.popoverTitle}>
          {title}
        </p>
        <p className={styles.popoverBody}>{body}</p>
        <div className={styles.popoverActions}>
          <button type="button" className={`${styles.popoverBtn} ${styles.popoverBtnPrimary}`} onClick={dismissActive}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined' || !document.body) {
    return null
  }
  return createPortal(overlay, document.body)
}

export default function PortfolioBuilderTour({
  edition,
  suppressAutoTour = false,
  firstRowComplete = false,
  canGenerate = false,
  rowCount = 1,
}: {
  edition: Edition
  suppressAutoTour?: boolean
  firstRowComplete?: boolean
  canGenerate?: boolean
  /** Builder row count — drives the alpha-sleeve follow-up after + */
  rowCount?: number
}) {
  const titleId = useId()
  const popoverRef = useRef<HTMLDivElement>(null)

  const storedDismissed = useTourDismissedFromStorage()
  /** Avoid SSR/client hydration mismatch — portal only after mount (matches server null). */
  const [hasMounted, setHasMounted] = useState(false)
  const [step, setStep] = useState(0)
  const [layout, setLayout] = useState<TourPopoverLayout>({
    top: 24,
    left: 16,
    arrowLeft: 160,
    placement: 'below',
  })
  const [coverHeight, setCoverHeight] = useState(0)

  const steps = useMemo(() => stepsForEdition(), [])
  const learnHref = learnArticlePath(edition === 'ca', ETF_PAGES_BUILDER_101_SLUG)

  const markComplete = useCallback(() => {
    try {
      window.localStorage.setItem(MAIN_TOUR_COMPLETED_KEY, '1')
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('local-storage'))
  }, [])

  const updatePosition = useCallback(() => {
    const id = steps[step]?.targetId
    if (!id) return
    const popW = Math.min(320, window.innerWidth - 32)
    const popH = 220
    setLayout(tourLayoutForTarget(id, popW, popH))
  }, [step, steps])

  const atLast = step >= steps.length - 1
  const nextAdvanceBlocked = !atLast && step === STEP_ETF && !firstRowComplete

  /** useLayoutEffect (not useEffect) so the first browser paint can include step 1; positioning effect must see hasMounted true in the same flush. */
  useLayoutEffect(() => {
    setHasMounted(true)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const u = new URL(window.location.href)
    if (u.searchParams.get(RESET_PORTFOLIO_BUILDER_TOUR_SEARCH_PARAM) !== '1') return
    clearPortfolioBuilderTourLocalStorage()
    window.dispatchEvent(new Event('local-storage'))
    u.searchParams.delete(RESET_PORTFOLIO_BUILDER_TOUR_SEARCH_PARAM)
    const q = u.searchParams.toString()
    window.history.replaceState(null, '', `${u.pathname}${q ? `?${q}` : ''}${u.hash}`)
  }, [])

  useLayoutEffect(() => {
    if (suppressAutoTour || !hasMounted || storedDismissed) return
    const syncCover = () => setCoverHeight(documentCoverHeight())
    syncCover()
    const run = () => {
      updatePosition()
      requestAnimationFrame(() => requestAnimationFrame(() => updatePosition()))
    }
    const raf = requestAnimationFrame(run)
    const onResize = () => {
      syncCover()
      updatePosition()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [suppressAutoTour, hasMounted, storedDismissed, updatePosition])

  useEffect(() => {
    if (suppressAutoTour || !hasMounted || storedDismissed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') markComplete()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [suppressAutoTour, hasMounted, storedDismissed, markComplete])

  useEffect(() => {
    if (suppressAutoTour || !hasMounted || storedDismissed) return
    popoverRef.current?.focus({ preventScroll: true })
  }, [suppressAutoTour, hasMounted, storedDismissed, step])

  if (suppressAutoTour) {
    return null
  }

  if (!hasMounted) {
    return null
  }

  if (storedDismissed) {
    return (
      <>
        <div className={styles.helperRow}>
          <button
            type="button"
            className={styles.helperLink}
            onClick={() => {
              clearPortfolioBuilderTourLocalStorage()
              window.dispatchEvent(new Event('local-storage'))
              window.location.reload()
            }}
          >
            Show builder tour again
          </button>
        </div>
        <PortfolioBuilderFollowUpHints
          edition={edition}
          suppressAutoTour={suppressAutoTour}
          firstRowComplete={firstRowComplete}
          canGenerate={canGenerate}
          rowCount={rowCount}
        />
      </>
    )
  }

  const s = steps[step]
  if (!s) return null

  const showTourArrow = s.targetId !== INTRO_STEP_TARGET_ID

  const overlay = (
    <div className={styles.tourMount} style={{ minHeight: Math.max(coverHeight, documentCoverHeight()) || '100vh' }}>
      <button type="button" className={styles.backdrop} aria-label="Dismiss tour" onClick={markComplete} />
      <div
        ref={popoverRef}
        className={`${styles.popover} ${
          showTourArrow
            ? layout.placement === 'below'
              ? styles.popoverPlacementBelow
              : styles.popoverPlacementAbove
            : styles.popoverNoArrow
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={
          {
            top: layout.top,
            left: layout.left,
            ...(showTourArrow ? { ['--tour-arrow-left' as string]: `${layout.arrowLeft}px` } : {}),
          } as React.CSSProperties
        }
      >
        {showTourArrow ? (
          <>
            <span className={styles.popoverArrowOuter} aria-hidden />
            <span className={styles.popoverArrowInner} aria-hidden />
          </>
        ) : null}
        <p id={titleId} className={styles.popoverTitle}>
          {s.title}
        </p>
        <p className={styles.popoverBody}>{s.body}</p>
        {step === STEP_ETF && !firstRowComplete ? (
          <p className={styles.popoverHint}>
            Enter a positive weight and choose an ETF on the first line to continue.
          </p>
        ) : null}
        {atLast ? (
          <p className={styles.popoverLearn}>
            <Link href={learnHref}>Full guide on Learn →</Link>
          </p>
        ) : null}
        <div className={styles.popoverActions}>
          <button type="button" className={styles.popoverBtn} onClick={markComplete}>
            Skip
          </button>
          {step > 0 ? (
            <button type="button" className={styles.popoverBtn} onClick={() => setStep((x) => Math.max(0, x - 1))}>
              Back
            </button>
          ) : null}
          <button
            type="button"
            className={`${styles.popoverBtn} ${styles.popoverBtnPrimary}`}
            disabled={nextAdvanceBlocked}
            title={step === STEP_ETF && !firstRowComplete ? 'Complete the first row to continue' : undefined}
            onClick={() => {
              if (atLast) markComplete()
              else setStep((x) => x + 1)
            }}
          >
            {atLast ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined' || !document.body) {
    return null
  }
  return createPortal(overlay, document.body)
}
