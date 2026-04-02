/**
 * TenantContext — Cooperative tenant state.
 * Mirrors CROS: depends on AuthContext + DemoModeContext.
 * Provides current co-op data, bylaws config, and feature flags.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useDemoMode } from './DemoModeContext'
import type { Tenant, BylawConfig, VisibilityRules, SubscriptionTier } from '@/types'

interface TenantContextType {
  tenant: Tenant | null
  tenantId: string | null
  bylaws: BylawConfig | null
  isLoading: boolean
  hasFeature: (key: string) => boolean
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

// Demo co-op bylaws
const DEMO_BYLAWS: BylawConfig = {
  id: 'demo-bylaws-001',
  tenant_id: 'demo-tenant-001',
  buy_in_amount_cents: 200000,
  buy_in_allows_installments: true,
  candidacy_period_months: 6,
  patronage_basis: 'hours',
  default_qualified_pct: 80,
  default_voting_method: 'majority',
  general_meeting_quorum: 0.5,
  board_meeting_quorum: 0.67,
  max_pay_ratio: 2,
  revolvement_years: 3,
  fiscal_year_end_month: 12,
  visibility_rules: {
    members_can_see_all_equity: false,
    members_can_see_surplus_total: true,
    candidates_can_see_financials: false,
    candidates_can_see_meeting_minutes: true,
  },
  updated_at: '2025-01-01',
}

const DEMO_TENANT: Tenant = {
  id: 'demo-tenant-001',
  slug: 'evergreen-workers',
  name: 'Evergreen Workers Co-op',
  coop_type: 'worker',
  status: 'active',
  tier: 'grove',
  founded_date: '2019-03-15',
  city: 'Portland',
  state: 'OR',
  country: 'US',
  industry: 'Cleaning Services',
  website: 'https://evergreen.coop',
  member_count: 5,
  annual_revenue_cents: 42000000,
  created_at: '2025-01-01',
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const { isDemoMode } = useDemoMode()

  const tenant = isDemoMode ? DEMO_TENANT : null
  const bylaws = isDemoMode ? DEMO_BYLAWS : null

  const hasFeature = useCallback((key: string) => {
    if (isDemoMode) return true // all features unlocked in demo
    return false
  }, [isDemoMode])

  return (
    <TenantContext.Provider value={{
      tenant,
      tenantId: tenant?.id ?? null,
      bylaws,
      isLoading: false,
      hasFeature,
    }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant must be used within TenantProvider')
  return ctx
}
