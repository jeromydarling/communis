/**
 * DemoModeContext — Read-only demo experience provider.
 * Mirrors CROS pattern: wraps entire app, intercepts writes, provides synthetic auth.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CoopRole } from '@/types'

const DEMO_STORAGE_KEY = 'communis_demo_session'
const DEMO_TENANT_SLUG = 'evergreen-workers'
const DEMO_TENANT_ID = 'demo-tenant-001'

export interface DemoSession {
  name: string
  email: string
  coop: string
  role: CoopRole
  grantedAt: string
}

interface DemoModeContextValue {
  isDemoMode: boolean
  demoSession: DemoSession | null
  demoTenantSlug: string
  demoTenantId: string
  demoRole: CoopRole
  startDemo: (session: DemoSession) => void
  endDemo: () => void
  setDemoRole: (role: CoopRole) => void
  simulateWrite: (actionLabel?: string) => boolean
}

const DemoModeCtx = createContext<DemoModeContextValue | undefined>(undefined)

function loadSession(): DemoSession | null {
  try {
    const raw = sessionStorage.getItem(DEMO_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveSession(session: DemoSession | null) {
  try {
    if (session) sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(session))
    else sessionStorage.removeItem(DEMO_STORAGE_KEY)
  } catch { /* ignore */ }
}

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(loadSession)

  const startDemo = useCallback((s: DemoSession) => {
    setSession(s)
    saveSession(s)
  }, [])

  const endDemo = useCallback(() => {
    setSession(null)
    saveSession(null)
  }, [])

  const setDemoRole = useCallback((role: CoopRole) => {
    setSession(prev => {
      if (!prev) return prev
      const updated = { ...prev, role }
      saveSession(updated)
      return updated
    })
  }, [])

  const simulateWrite = useCallback((actionLabel?: string) => {
    // In production, show a toast: "Demo mode — no data was written"
    console.log(`[Demo] Simulated write: ${actionLabel || 'action'}`)
    return true
  }, [])

  return (
    <DemoModeCtx.Provider value={{
      isDemoMode: !!session,
      demoSession: session,
      demoTenantSlug: DEMO_TENANT_SLUG,
      demoTenantId: DEMO_TENANT_ID,
      demoRole: session?.role ?? 'member',
      startDemo,
      endDemo,
      setDemoRole,
      simulateWrite,
    }}>
      {children}
    </DemoModeCtx.Provider>
  )
}

export function useDemoMode() {
  const ctx = useContext(DemoModeCtx)
  if (!ctx) throw new Error('useDemoMode must be used within DemoModeProvider')
  return ctx
}
