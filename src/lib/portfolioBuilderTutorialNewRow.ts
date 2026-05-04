/**
 * Storage keys must match `PortfolioBuilderTour.tsx`. When the main tour or any follow-up hint
 * is still “active” (not dismissed in localStorage), new rows from + get weight 50 for the walkthrough.
 */
const TOUR_V8_COMPLETE = 'alphastacking:portfolio-builder-tour:v8:completed'
const HINT_ADD_ROW = 'alphastacking:portfolio-builder-hint:add-row:v1:'
const HINT_ALPHA_SLEEVE = 'alphastacking:portfolio-builder-hint:alpha-sleeve:v1:'
const HINT_GENERATE = 'alphastacking:portfolio-builder-hint:generate:v1:'

export function shouldPrefillNewRowWeightForPortfolioTutorial(edition: 'us' | 'ca'): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (window.localStorage.getItem(TOUR_V8_COMPLETE) !== '1') return true
    return (
      window.localStorage.getItem(`${HINT_ADD_ROW}${edition}`) !== '1' ||
      window.localStorage.getItem(`${HINT_ALPHA_SLEEVE}${edition}`) !== '1' ||
      window.localStorage.getItem(`${HINT_GENERATE}${edition}`) !== '1'
    )
  } catch {
    return false
  }
}
