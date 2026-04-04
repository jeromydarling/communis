/**
 * QuickBooks Online Integration Types
 * Read financial data from QBO, write ICA journal entries back.
 */

// ─── Connection ──────────────────────────────────────────
export interface QBOConnection {
  id: string
  tenant_id: string
  realm_id: string // QBO company ID
  access_token_encrypted: string
  refresh_token_encrypted: string
  token_expires_at: string
  company_name: string
  connected_at: string
  last_sync_at: string | null
  sync_status: 'connected' | 'syncing' | 'error' | 'disconnected'
}

// ─── Sync Configuration ──────────────────────────────────
export interface QBOSyncConfig {
  tenant_id: string
  sync_revenue: boolean
  sync_expenses: boolean
  sync_payroll_hours: boolean
  sync_bank_balances: boolean
  write_patronage_journal_entries: boolean
  patronage_liability_account_id: string | null // QBO account for member equity
  revenue_account_ids: string[] // which QBO revenue accounts to pull
  payroll_account_ids: string[] // which QBO payroll accounts to pull hours from
  sync_frequency: 'manual' | 'daily' | 'weekly'
}

// ─── Financial Data (read from QBO) ──────────────────────
export interface QBOFinancialSnapshot {
  tenant_id: string
  period_start: string
  period_end: string
  total_revenue_cents: number
  total_expenses_cents: number
  net_income_cents: number
  cash_on_hand_cents: number | null
  accounts_receivable_cents: number | null
  accounts_payable_cents: number | null
  fetched_at: string
}

export interface QBOExpenseCategory {
  account_id: string
  account_name: string
  amount_cents: number
  percentage_of_total: number
}

export interface QBOExpenseSummary {
  tenant_id: string
  period_start: string
  period_end: string
  total_cents: number
  categories: QBOExpenseCategory[]
  // Cooperative-friendly labels
  cooperative_labels: Record<string, string> // account_id → "Equipment", "Member Benefits", etc.
}

// ─── Payroll Hours (read from QBO Payroll) ───────────────
export interface QBOPayrollEntry {
  employee_name: string
  employee_id: string
  matched_member_id: string | null // matched to Communis member
  period_start: string
  period_end: string
  regular_hours: number
  overtime_hours: number
  total_hours: number
  gross_pay_cents: number
}

// ─── Journal Entries (write to QBO) ──────────────────────
export interface QBOJournalEntry {
  id: string
  tenant_id: string
  entry_type: 'patronage_allocation' | 'buy_in_received' | 'revolvement_payout'
  description: string
  amount_cents: number
  debit_account_id: string
  credit_account_id: string
  member_id: string
  reference_id: string // patronage_run_id, buy_in_payment_id, etc.
  synced_to_qbo: boolean
  qbo_journal_entry_id: string | null
  created_at: string
}

// ─── Scheduling / Time Import ────────────────────────────
export type TimeImportSource = 'quickbooks' | 'gusto' | 'adp' | 'square' | 'homebase' | 'when_i_work' | 'deputy' | 'csv'

export interface TimeImportConfig {
  tenant_id: string
  source: TimeImportSource
  api_connected: boolean
  last_import_at: string | null
  auto_import: boolean
  import_frequency: 'manual' | 'daily' | 'weekly' | 'per_pay_period'
}
