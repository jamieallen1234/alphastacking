'use client'

import { useCallback, useEffect, useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'

let currentTheme: Theme = 'dark'
const listeners = new Set<() => void>()

function applyTheme(theme: Theme) {
  currentTheme = theme
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // localStorage unavailable (e.g. private browsing) — theme just won't persist
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): Theme {
  return currentTheme
}

function getServerSnapshot(): Theme {
  return 'dark'
}

/** Client hook: current theme plus a setter, backed by a module-level store synced with `<html data-theme>` and localStorage. */
export function useTheme(): { theme: Theme; setTheme: (theme: Theme) => void; toggleTheme: () => void } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // The pre-hydration script may have already set `<html data-theme>` from
  // localStorage before this store initialized — sync once on mount.
  useEffect(() => {
    const domTheme = document.documentElement.dataset.theme as Theme | undefined
    if (domTheme && domTheme !== currentTheme) {
      currentTheme = domTheme
      listeners.forEach((l) => l())
    }
  }, [])

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, setTheme, toggleTheme }
}
