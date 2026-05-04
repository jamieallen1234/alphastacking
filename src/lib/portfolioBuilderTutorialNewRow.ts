/**
 * Storage key must match `PortfolioBuilderTour.tsx`.
 *
 * Prefill (+ → 50% + Alpha) only while the **main** 4-step tour is not marked complete. Follow-up
 * hints use separate keys; they were incorrectly OR’d here so users who finished the tour but never
 * saw hints (e.g. `suppressAutoTour` hides the whole tour shell, so hint dismissals never run) kept
 * getting tutorial prefill with no UI.
 */
const TOUR_V8_COMPLETE = 'alphastacking:portfolio-builder-tour:v8:completed'

export function shouldPrefillNewRowWeightForPortfolioTutorial(_edition: 'us' | 'ca'): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(TOUR_V8_COMPLETE) !== '1'
  } catch {
    return false
  }
}
