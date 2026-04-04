/**
 * Accessibility Provider — WCAG 2.2 AA mode.
 * Adapted from CROS: high-contrast theme, reduced motion, enlarged targets,
 * visible focus rings, underlined links.
 *
 * Toggled via user preference. Persists in localStorage.
 */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface A11yContextType {
  a11yMode: boolean
  toggleA11y: () => void
  reducedMotion: boolean
  highContrast: boolean
}

const A11yContext = createContext<A11yContextType | undefined>(undefined)

const STORAGE_KEY = 'communis-a11y-mode'

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [a11yMode, setA11yMode] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
  })

  // Check OS-level preference
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    if (a11yMode) {
      document.documentElement.classList.add('a11y-mode')
    } else {
      document.documentElement.classList.remove('a11y-mode')
    }
    try { localStorage.setItem(STORAGE_KEY, String(a11yMode)) } catch {}
  }, [a11yMode])

  const toggleA11y = () => setA11yMode(prev => !prev)

  return (
    <A11yContext.Provider value={{
      a11yMode,
      toggleA11y,
      reducedMotion: reducedMotion || a11yMode,
      highContrast: a11yMode,
    }}>
      {children}
    </A11yContext.Provider>
  )
}

export function useAccessibility() {
  const ctx = useContext(A11yContext)
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider')
  return ctx
}
