import { useState } from 'react'
import {
  CreditCard, DollarSign, TrendingUp, Users, ArrowRight,
  CheckCircle2, Clock, AlertCircle, Zap, CalendarDays, PiggyBank,
} from 'lucide-react'
import { members, coopStats } from '@/data/demo'
import {
  COMMUNIS_PLATFORM_FEE_PCT,
  type PaymentFeatureFlags,
  type BuyInSchedule,
  type DuesSubscription,
} from '@/types/payments'

// Demo payment data
const DEMO_BUY_IN_SCHEDULES: Record<string, BuyInSchedule> = {
  '3': { // Ana Lucía
    id: 'bs-1', tenant_id: 'demo', member_id: '3',
    total_amount_cents: 200000, paid_amount_cents: 150000, remaining_amount_cents: 50000,
    schedule_type: 'installments', installment_amount_cents: 12500,
    installment_frequency: 'monthly', next_payment_date: '2025-02-15',
    status: 'active', stripe_subscription_id: 'sub_demo_1', created_at: '2021-06-01',
  },
  '6': { // Roberto
    id: 'bs-2', tenant_id: 'demo', member_id: '6',
    total_amount_cents: 200000, paid_amount_cents: 40000, remaining_amount_cents: 160000,
    schedule_type: 'installments', installment_amount_cents: 10000,
    installment_frequency: 'monthly', next_payment_date: '2025-02-01',
    status: 'active', stripe_subscription_id: 'sub_demo_2', created_at: '2024-11-01',
  },
}

const DEMO_RECENT_PAYMENTS = [
  { id: 'p1', member: 'Roberto Sandoval', type: 'buy_in', amount: 10000, status: 'succeeded', date: '2025-01-01' },
  { id: 'p2', member: 'Ana Lucía Vega', type: 'buy_in', amount: 12500, status: 'succeeded', date: '2025-01-15' },
  { id: 'p3', member: 'Fatima Hassan', type: 'dues', amount: 5000, status: 'succeeded', date: '2025-01-01' },
  { id: 'p4', member: 'David Chen', type: 'dues', amount: 5000, status: 'succeeded', date: '2025-01-01' },
  { id: 'p5', member: 'James Okonkwo', type: 'dues', amount: 5000, status: 'succeeded', date: '2025-01-01' },
  { id: 'p6', member: 'María Reyes', type: 'dues', amount: 5000, status: 'succeeded', date: '2025-01-01' },
  { id: 'p7', member: 'Karen Whitfield', type: 'patronage_payout', amount: 313300, status: 'paid', date: '2024-12-20' },
]

const DEMO_FEATURES: PaymentFeatureFlags = {
  buy_in_collection: true,
  recurring_dues: true,
  patronage_payouts: true,
}

const statusConfig = {
  succeeded: { icon: CheckCircle2, color: 'text-grove-600', label: 'Paid' },
  paid: { icon: CheckCircle2, color: 'text-grove-600', label: 'Paid' },
  pending: { icon: Clock, color: 'text-warmth-600', label: 'Pending' },
  failed: { icon: AlertCircle, color: 'text-red-500', label: 'Failed' },
  processing: { icon: Clock, color: 'text-commons-600', label: 'Processing' },
}

export default function PaymentsPage() {
  const [tab, setTab] = useState<'overview' | 'buy_ins' | 'dues' | 'payouts'>('overview')

  const activeMembers = members.filter(m => m.status === 'active' || m.status === 'candidate')
  const totalBuyInCollected = activeMembers.reduce((sum, m) => sum + m.buyInPaid * 100, 0)
  const totalBuyInOutstanding = activeMembers.reduce((sum, m) => sum + (m.buyInTotal - m.buyInPaid) * 100, 0)
  const monthlyDuesRevenue = activeMembers.filter(m => m.status === 'active').length * 5000

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-400 mt-1">
            Stripe Connect — buy-ins, dues, and patronage payouts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-grove-500" />
          <span className="text-xs text-grove-600 font-medium">Stripe Connected</span>
        </div>
      </div>

      {/* Feature toggles */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { key: 'buy_in_collection', icon: PiggyBank, label: 'Buy-In Collection', enabled: DEMO_FEATURES.buy_in_collection },
          { key: 'recurring_dues', icon: CalendarDays, label: 'Recurring Dues', enabled: DEMO_FEATURES.recurring_dues },
          { key: 'patronage_payouts', icon: TrendingUp, label: 'Patronage Payouts', enabled: DEMO_FEATURES.patronage_payouts },
        ].map(feat => (
          <div key={feat.key} className={`narrative-card flex items-center gap-3 ${feat.enabled ? '' : 'opacity-50'}`}>
            <feat.icon size={18} className={feat.enabled ? 'text-grove-500' : 'text-gray-300'} />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-900">{feat.label}</p>
            </div>
            <div className={`w-8 h-5 rounded-full flex items-center ${feat.enabled ? 'bg-grove-500 justify-end' : 'bg-gray-200 justify-start'}`}>
              <div className="w-4 h-4 rounded-full bg-white shadow-sm mx-0.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="narrative-card">
          <DollarSign size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">
            ${(totalBuyInCollected / 100).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">buy-ins collected</p>
        </div>
        <div className="narrative-card">
          <Clock size={18} className="text-warmth-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">
            ${(totalBuyInOutstanding / 100).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">buy-ins outstanding</p>
        </div>
        <div className="narrative-card">
          <CalendarDays size={18} className="text-commons-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">
            ${(monthlyDuesRevenue / 100).toLocaleString()}/mo
          </p>
          <p className="text-xs text-gray-400">recurring dues</p>
        </div>
        <div className="narrative-card">
          <CreditCard size={18} className="text-terra-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">{COMMUNIS_PLATFORM_FEE_PCT}%</p>
          <p className="text-xs text-gray-400">Communis fee</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-warmth-100 rounded-xl p-1">
        {[
          { key: 'overview', label: 'Recent Activity' },
          { key: 'buy_ins', label: 'Buy-Ins' },
          { key: 'dues', label: 'Dues' },
          { key: 'payouts', label: 'Patronage Payouts' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {tab === 'overview' && (
        <div className="space-y-2">
          {DEMO_RECENT_PAYMENTS.map(payment => {
            const config = statusConfig[payment.status as keyof typeof statusConfig] || statusConfig.pending
            const Icon = config.icon
            return (
              <div key={payment.id} className="narrative-card flex items-center gap-4">
                <Icon size={16} className={config.color} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{payment.member}</p>
                  <p className="text-xs text-gray-400">
                    {payment.type === 'buy_in' ? 'Buy-in installment' :
                     payment.type === 'dues' ? 'Monthly dues' :
                     'Patronage payout'} · {payment.date}
                  </p>
                </div>
                <p className={`text-sm font-display font-semibold ${
                  payment.type === 'patronage_payout' ? 'text-warmth-700' : 'text-grove-700'
                }`}>
                  {payment.type === 'patronage_payout' ? '-' : '+'}${(payment.amount / 100).toLocaleString()}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: Buy-Ins */}
      {tab === 'buy_ins' && (
        <div className="space-y-3">
          {activeMembers.map(member => {
            const schedule = DEMO_BUY_IN_SCHEDULES[member.id]
            const paidPct = (member.buyInPaid / member.buyInTotal) * 100
            return (
              <div key={member.id} className="narrative-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-grove-100 flex items-center justify-center text-xs font-medium text-grove-700">
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-400">
                        ${member.buyInPaid.toLocaleString()} / ${member.buyInTotal.toLocaleString()}
                        {schedule ? ` · $${(schedule.installment_amount_cents! / 100).toFixed(0)}/mo` : ''}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    paidPct >= 100 ? 'bg-grove-100 text-grove-700' :
                    paidPct > 50 ? 'bg-warmth-100 text-warmth-700' :
                    'bg-commons-100 text-commons-700'
                  }`}>
                    {paidPct >= 100 ? 'Complete' : `${paidPct.toFixed(0)}%`}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-grove-500 rounded-full transition-all" style={{ width: `${Math.min(paidPct, 100)}%` }} />
                </div>
                {schedule && schedule.status === 'active' && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    Next payment: {schedule.next_payment_date} · {schedule.installment_frequency}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: Dues */}
      {tab === 'dues' && (
        <div className="space-y-3">
          <div className="narrative-card bg-grove-50 border-grove-100">
            <p className="text-sm font-medium text-grove-800">$50/month per active member</p>
            <p className="text-xs text-grove-600 mt-1">
              5 active members × $50 = $250/month in recurring dues. All current. Next billing: Feb 1, 2025.
            </p>
          </div>
          {members.filter(m => m.status === 'active').map(member => (
            <div key={member.id} className="narrative-card flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-grove-100 flex items-center justify-center text-xs font-medium text-grove-700">
                {member.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-400">$50/mo · Active · Paid through Jan 2025</p>
              </div>
              <CheckCircle2 size={16} className="text-grove-500" />
            </div>
          ))}
        </div>
      )}

      {/* Tab: Patronage Payouts */}
      {tab === 'payouts' && (
        <div className="space-y-3">
          <div className="narrative-card bg-warmth-50 border-warmth-100">
            <p className="text-sm font-medium text-warmth-800">Q4 2024 Patronage — Awaiting Vote</p>
            <p className="text-xs text-warmth-600 mt-1">
              ${coopStats.surplusToDistribute.toLocaleString()} surplus ready for distribution.
              Once the governance proposal passes, payouts will be sent to member bank accounts via Stripe.
            </p>
          </div>

          <div className="narrative-card">
            <p className="text-xs font-medium text-gray-900 mb-3">Previous Payout: Q3 2024</p>
            {members.filter(m => m.status === 'active').map(member => {
              const amount = Math.round(15200 * (member.hoursThisYear / 7980))
              return (
                <div key={member.id} className="flex items-center gap-3 py-2 border-b border-terra-50 last:border-0">
                  <div className="w-6 h-6 rounded-full bg-grove-100 flex items-center justify-center text-[10px] font-medium text-grove-700">
                    {member.initials}
                  </div>
                  <p className="text-xs text-gray-700 flex-1">{member.name}</p>
                  <p className="text-xs font-display font-semibold text-gray-900">${amount.toLocaleString()}</p>
                  <CheckCircle2 size={12} className="text-grove-500" />
                </div>
              )
            })}
          </div>

          <div className="narrative-card flex items-start gap-3">
            <Zap size={16} className="text-grove-500 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-gray-900">Payout process</p>
              <p className="text-xs text-gray-500 mt-1">
                Governance vote passes → Patronage engine calculates allocations →
                ICA ledger updated → Stripe sends payouts to member bank accounts →
                1099-PATR forms generated automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
