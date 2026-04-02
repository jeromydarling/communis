import { useState } from 'react'
import {
  CreditCard, PiggyBank, CalendarDays, TrendingUp,
  ArrowRight, Check, ExternalLink, Shield,
} from 'lucide-react'
import type { PaymentFeatureFlags } from '@/types/payments'

type Step = 'choose' | 'connect' | 'configure' | 'complete'

const FEATURES = [
  {
    key: 'buy_in_collection' as const,
    icon: PiggyBank,
    title: 'Buy-In Collection',
    description: 'Collect member buy-in contributions — one-time or installment plans. Automatically updates ICA ledger when payments clear.',
    example: 'A new member pays $2,000 buy-in over 16 monthly installments of $125.',
    recommended: true,
  },
  {
    key: 'recurring_dues' as const,
    icon: CalendarDays,
    title: 'Recurring Dues',
    description: 'Automated monthly, quarterly, or annual member dues via Stripe Billing. Never chase a late payment again.',
    example: 'All active members pay $50/month in dues, billed automatically on the 1st.',
    recommended: true,
  },
  {
    key: 'patronage_payouts' as const,
    icon: TrendingUp,
    title: 'Patronage Payouts',
    description: 'Distribute surplus directly to member bank accounts after a governance vote. Calculate, approve, pay — all in one flow.',
    example: 'Q4 surplus of $18,400 distributed to 5 members proportional to hours worked.',
    recommended: false,
  },
]

export default function PaymentSetup() {
  const [step, setStep] = useState<Step>('choose')
  const [features, setFeatures] = useState<PaymentFeatureFlags>({
    buy_in_collection: true,
    recurring_dues: false,
    patronage_payouts: false,
  })

  const toggleFeature = (key: keyof PaymentFeatureFlags) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const enabledCount = Object.values(features).filter(Boolean).length

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-grove-600 flex items-center justify-center">
          <CreditCard size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900">Payment Setup</h2>
          <p className="text-sm text-gray-400">Choose which financial features your cooperative needs</p>
        </div>
      </div>

      {/* Step: Choose features */}
      {step === 'choose' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            You can enable any combination — start with just buy-in collection and add more later.
            Communis charges 0.5% per transaction on top of standard Stripe processing fees.
          </p>

          {FEATURES.map(feat => {
            const enabled = features[feat.key]
            return (
              <button
                key={feat.key}
                onClick={() => toggleFeature(feat.key)}
                className={`w-full narrative-card text-left transition-all ${
                  enabled ? 'ring-2 ring-grove-400 bg-grove-50/50' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    enabled ? 'bg-grove-600' : 'bg-gray-100'
                  }`}>
                    <feat.icon size={18} className={enabled ? 'text-white' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{feat.title}</p>
                      {feat.recommended && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-grove-100 text-grove-600 font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{feat.description}</p>
                    <p className="text-[10px] text-gray-400 mt-2 italic">Example: {feat.example}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                    enabled ? 'border-grove-500 bg-grove-500' : 'border-gray-200'
                  }`}>
                    {enabled && <Check size={14} className="text-white" />}
                  </div>
                </div>
              </button>
            )
          })}

          <div className="flex justify-between items-center pt-4">
            <p className="text-xs text-gray-400">
              {enabledCount === 0 ? 'Select at least one feature' : `${enabledCount} feature${enabledCount > 1 ? 's' : ''} selected`}
            </p>
            <button
              onClick={() => setStep('connect')}
              disabled={enabledCount === 0}
              className="calm-button-primary text-sm flex items-center gap-2 disabled:opacity-50"
            >
              Connect Stripe <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Connect Stripe */}
      {step === 'connect' && (
        <div className="space-y-6">
          <div className="narrative-card text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-[#635BFF] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900">Connect your Stripe account</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
              You'll be redirected to Stripe to create or connect your cooperative's account.
              This is your co-op's own account — Communis never holds your funds.
            </p>
            <button
              onClick={() => setStep('configure')}
              className="mt-6 calm-button-primary inline-flex items-center gap-2"
            >
              Connect with Stripe <ExternalLink size={14} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="narrative-card text-center p-3">
              <Shield size={16} className="text-grove-500 mx-auto mb-1" />
              <p className="text-[10px] text-gray-500">PCI Level 1 compliant</p>
            </div>
            <div className="narrative-card text-center p-3">
              <CreditCard size={16} className="text-grove-500 mx-auto mb-1" />
              <p className="text-[10px] text-gray-500">Your co-op's name on statements</p>
            </div>
            <div className="narrative-card text-center p-3">
              <TrendingUp size={16} className="text-grove-500 mx-auto mb-1" />
              <p className="text-[10px] text-gray-500">Direct deposit to your bank</p>
            </div>
          </div>
        </div>
      )}

      {/* Step: Configure */}
      {step === 'configure' && (
        <div className="space-y-6">
          <div className="narrative-card bg-grove-50 border-grove-100">
            <div className="flex items-center gap-2 mb-2">
              <Check size={16} className="text-grove-600" />
              <p className="text-sm font-medium text-grove-800">Stripe connected successfully</p>
            </div>
            <p className="text-xs text-grove-600">
              Account: Evergreen Workers Co-op · Charges enabled · Payouts enabled
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 mb-3">Enabled features:</p>
            <div className="space-y-2">
              {FEATURES.filter(f => features[f.key]).map(feat => (
                <div key={feat.key} className="narrative-card flex items-center gap-3">
                  <feat.icon size={16} className="text-grove-500" />
                  <p className="text-sm text-gray-700">{feat.title}</p>
                  <span className="text-[10px] text-grove-500 ml-auto">Active</span>
                </div>
              ))}
            </div>
          </div>

          {features.buy_in_collection && (
            <div className="narrative-card">
              <p className="text-xs font-medium text-gray-900 mb-2">Buy-in configuration</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Buy-in amount</label>
                  <p className="text-sm font-medium text-gray-900">$2,000</p>
                  <p className="text-[10px] text-gray-400">From bylaws</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Installment option</label>
                  <p className="text-sm font-medium text-gray-900">$125/mo × 16</p>
                  <p className="text-[10px] text-gray-400">Or lump sum</p>
                </div>
              </div>
            </div>
          )}

          {features.recurring_dues && (
            <div className="narrative-card">
              <p className="text-xs font-medium text-gray-900 mb-2">Dues configuration</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Amount</label>
                  <p className="text-sm font-medium text-gray-900">$50/month</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Billing day</label>
                  <p className="text-sm font-medium text-gray-900">1st of month</p>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setStep('complete')} className="w-full calm-button-primary flex items-center justify-center gap-2">
            Activate Payments <Check size={14} />
          </button>
        </div>
      )}

      {/* Step: Complete */}
      {step === 'complete' && (
        <div className="narrative-card text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-grove-100 flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} className="text-grove-600" />
          </div>
          <h3 className="font-display text-xl font-bold text-gray-900">Payments are live</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
            Your cooperative is connected to Stripe. Members can now pay buy-ins
            {features.recurring_dues ? ', dues,' : ''} and receive
            {features.patronage_payouts ? ' patronage payouts' : ''} through Communis.
          </p>
          <div className="mt-6 text-xs text-gray-400">
            Demo mode — no Stripe account was actually connected.
          </div>
        </div>
      )}
    </div>
  )
}
