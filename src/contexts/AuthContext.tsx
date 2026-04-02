/**
 * AuthContext — Authentication and role management.
 * Mirrors CROS pattern: depends on DemoModeContext, provides user/role state.
 * For now uses local state; will connect to Supabase auth in production.
 */
import { createContext, useContext, useState, type ReactNode } from 'react'
import { useDemoMode } from './DemoModeContext'
import type { CoopRole, SystemRole } from '@/types'

type AnyRole = CoopRole | SystemRole

interface User {
  id: string
  email: string
  display_name: string
}

interface AuthContextType {
  user: User | null
  role: AnyRole
  isLoading: boolean
  isAuthenticated: boolean
  isGardener: boolean
  isSteward: boolean
  isCoordinator: boolean
  isMember: boolean
  isCandidate: boolean
  hasMinRole: (minRole: CoopRole) => boolean
}

const ROLE_HIERARCHY: AnyRole[] = ['candidate', 'member', 'coordinator', 'steward', 'advisor', 'gardener']

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isDemoMode, demoSession, demoRole } = useDemoMode()
  const [isLoading] = useState(false)

  // In demo mode, provide synthetic user
  const user: User | null = isDemoMode && demoSession ? {
    id: 'demo-user-001',
    email: demoSession.email,
    display_name: demoSession.name,
  } : null

  const role: AnyRole = isDemoMode ? (demoRole as AnyRole) : 'member'

  const hasMinRole = (minRole: CoopRole): boolean => {
    const roleStr: string = role
    // Gardener has access to everything
    if (roleStr === 'gardener') return true
    // Advisor has read access to most things but can't vote
    if (roleStr === 'advisor') return minRole !== 'steward'
    const userIdx = ROLE_HIERARCHY.indexOf(role)
    const minIdx = ROLE_HIERARCHY.indexOf(minRole)
    return userIdx >= minIdx
  }

  const value: AuthContextType = {
    user,
    role,
    isLoading: isDemoMode ? false : isLoading,
    isAuthenticated: !!user,
    isGardener: (role as string) === 'gardener',
    isSteward: (role as string) === 'steward' || (role as string) === 'gardener',
    isCoordinator: hasMinRole('coordinator'),
    isMember: hasMinRole('member'),
    isCandidate: hasMinRole('candidate'),
    hasMinRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
