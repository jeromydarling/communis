/**
 * Communis Payments — Stripe Connect types
 * Full payment lifecycle: buy-ins, dues, patronage payouts.
 */

// ─── Stripe Connect ──────────────────────────────────────
export interface StripeConnectedAccount {
  id: string
  tenant_id: string
  stripe_account_id: string
  business_name: string
  onboarding_complete: boolean
  charges_enabled: boolean
  payouts_enabled: boolean
  features_enabled: PaymentFeatureFlags
  created_at: string
}

export interface PaymentFeatureFlags {
  buy_in_collection: boolean
  recurring_dues: boolean
  patronage_payouts: boolean
}

// ─── Buy-In Payments ─────────────────────────────────────
export type BuyInPaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded'
export type BuyInScheduleType = 'lump_sum' | 'installments'

export interface BuyInPayment {
  id: string
  tenant_id: string
  member_id: string
  amount_cents: number
  status: BuyInPaymentStatus
  stripe_payment_intent_id: string | null
  schedule_type: BuyInScheduleType
  installment_number: number | null
  installment_total: number | null
  paid_at: string | null
  created_at: string
}

export interface BuyInSchedule {
  id: string
  tenant_id: string
  member_id: string
  total_amount_cents: number
  paid_amount_cents: number
  remaining_amount_cents: number
  schedule_type: BuyInScheduleType
  installment_amount_cents: number | null
  installment_frequency: 'weekly' | 'biweekly' | 'monthly' | null
  next_payment_date: string | null
  status: 'active' | 'complete' | 'paused' | 'cancelled'
  stripe_subscription_id: string | null // for recurring installments
  created_at: string
}

// ─── Recurring Dues ──────────────────────────────────────
export type DuesFrequency = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annually'
export type DuesStatus = 'active' | 'paused' | 'cancelled' | 'past_due'

export interface DuesSubscription {
  id: string
  tenant_id: string
  member_id: string
  amount_cents: number
  frequency: DuesFrequency
  status: DuesStatus
  stripe_subscription_id: string
  current_period_start: string
  current_period_end: string
  next_payment_date: string
  created_at: string
}

// ─── Patronage Payouts ───────────────────────────────────
export type PayoutStatus = 'pending' | 'processing' | 'paid' | 'failed'

export interface PatronagePayout {
  id: string
  tenant_id: string
  patronage_run_id: string
  member_id: string
  amount_cents: number
  qualified_cents: number
  non_qualified_cents: number
  status: PayoutStatus
  stripe_transfer_id: string | null
  stripe_payout_id: string | null
  paid_at: string | null
  created_at: string
}

// ─── Payment Portal ──────────────────────────────────────
export interface MemberPaymentSummary {
  member_id: string
  buy_in_total_cents: number
  buy_in_paid_cents: number
  buy_in_remaining_cents: number
  buy_in_schedule: BuyInSchedule | null
  dues_subscription: DuesSubscription | null
  patronage_payouts_total_cents: number
  recent_payments: PaymentEvent[]
}

export interface PaymentEvent {
  id: string
  type: 'buy_in' | 'dues' | 'patronage_payout' | 'refund'
  amount_cents: number
  status: string
  description: string
  date: string
}

// ─── Platform Fee ────────────────────────────────────────
export const COMMUNIS_PLATFORM_FEE_PCT = 0.5 // 0.5% per transaction
export const STRIPE_PROCESSING_FEE_PCT = 2.9
export const STRIPE_PROCESSING_FEE_FIXED_CENTS = 30
