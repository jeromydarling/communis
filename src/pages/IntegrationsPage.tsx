import { useState } from 'react'
import {
  Link2, CheckCircle2, ArrowRight, RefreshCw,
  DollarSign, Clock, FileText, AlertCircle, ExternalLink,
} from 'lucide-react'
import type { TimeImportSource } from '@/types/integrations'

const INTEGRATIONS = [
  {
    key: 'quickbooks',
    name: 'QuickBooks Online',
    logo: 'QB',
    logoColor: 'bg-green-600',
    description: 'Sync revenue, expenses, and payroll. Write patronage journal entries back.',
    connected: true,
    lastSync: '2025-01-20 09:15 AM',
    features: ['Revenue & expenses', 'Payroll hours', 'Bank balances', 'Patronage journal entries'],
  },
  {
    key: 'xero',
    name: 'Xero',
    logo: 'X',
    logoColor: 'bg-blue-500',
    description: 'Sync financial data from Xero accounting.',
    connected: false,
    lastSync: null,
    features: ['Revenue & expenses', 'Payroll hours', 'Bank balances'],
  },
]

const TIME_SOURCES: { key: TimeImportSource; name: string; connected: boolean }[] = [
  { key: 'quickbooks', name: 'QuickBooks Payroll', connected: true },
  { key: 'gusto', name: 'Gusto', connected: false },
  { key: 'adp', name: 'ADP', connected: false },
  { key: 'square', name: 'Square', connected: false },
  { key: 'homebase', name: 'Homebase', connected: false },
  { key: 'when_i_work', name: 'When I Work', connected: false },
  { key: 'deputy', name: 'Deputy', connected: false },
  { key: 'csv', name: 'CSV Upload', connected: true },
]

// Demo financial data "from QuickBooks"
const DEMO_FINANCIALS = {
  period: 'January 2025',
  revenue: 3800000,
  expenses: 3280000,
  netIncome: 520000,
  cashOnHand: 8700000,
  expenses_breakdown: [
    { name: 'Labor', amount: 2400000, pct: 73.2 },
    { name: 'Supplies & Equipment', amount: 420000, pct: 12.8 },
    { name: 'Insurance', amount: 180000, pct: 5.5 },
    { name: 'Transportation', amount: 145000, pct: 4.4 },
    { name: 'Office & Admin', amount: 85000, pct: 2.6 },
    { name: 'Member Benefits', amount: 50000, pct: 1.5 },
  ],
}

export default function IntegrationsPage() {
  const [tab, setTab] = useState<'accounting' | 'time' | 'financials'>('financials')

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-sm text-gray-400 mt-1">
          Connect your accounting and scheduling tools. Communis bridges the gap.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-warmth-100 rounded-xl p-1">
        {[
          { key: 'financials', label: 'Financial Dashboard' },
          { key: 'accounting', label: 'Accounting' },
          { key: 'time', label: 'Time & Scheduling' },
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

      {/* Financial Dashboard — data from QuickBooks */}
      {tab === 'financials' && (
        <div className="space-y-6">
          <div className="narrative-card bg-grove-50 border-grove-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-grove-600" />
              <p className="text-xs text-grove-700">
                Synced from QuickBooks · Last update: {DEMO_FINANCIALS.period}
              </p>
            </div>
            <button className="text-xs text-grove-600 flex items-center gap-1 hover:text-grove-700">
              <RefreshCw size={12} /> Sync now
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="narrative-card">
              <DollarSign size={18} className="text-grove-500 mb-2" />
              <p className="font-display text-2xl font-bold text-gray-900">
                ${(DEMO_FINANCIALS.revenue / 100).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">revenue this month</p>
            </div>
            <div className="narrative-card">
              <FileText size={18} className="text-warmth-500 mb-2" />
              <p className="font-display text-2xl font-bold text-gray-900">
                ${(DEMO_FINANCIALS.expenses / 100).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">expenses</p>
            </div>
            <div className="narrative-card">
              <DollarSign size={18} className="text-grove-500 mb-2" />
              <p className="font-display text-2xl font-bold text-grove-700">
                ${(DEMO_FINANCIALS.netIncome / 100).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">net income (surplus)</p>
            </div>
            <div className="narrative-card">
              <DollarSign size={18} className="text-commons-500 mb-2" />
              <p className="font-display text-2xl font-bold text-gray-900">
                ${(DEMO_FINANCIALS.cashOnHand / 100).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">cash on hand</p>
            </div>
          </div>

          {/* Narrative summary */}
          <div className="narrative-card bg-warmth-50 border-warmth-100">
            <p className="text-sm text-warmth-700 leading-relaxed">
              Evergreen generated ${(DEMO_FINANCIALS.revenue / 100).toLocaleString()} in revenue this month
              against ${(DEMO_FINANCIALS.expenses / 100).toLocaleString()} in expenses, leaving
              ${(DEMO_FINANCIALS.netIncome / 100).toLocaleString()} in net income. Labor accounts for 73% of expenses —
              healthy for a service cooperative. Cash reserves of ${(DEMO_FINANCIALS.cashOnHand / 100).toLocaleString()} cover
              approximately 2.7 months of operating expenses.
            </p>
          </div>

          {/* Expense breakdown */}
          <div className="narrative-card">
            <p className="text-sm font-medium text-gray-900 mb-4">Where the money goes</p>
            <div className="space-y-3">
              {DEMO_FINANCIALS.expenses_breakdown.map(cat => (
                <div key={cat.name} className="flex items-center gap-3">
                  <p className="text-xs text-gray-700 w-32">{cat.name}</p>
                  <div className="flex-1 h-5 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-grove-400 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${cat.pct}%` }}
                    >
                      {cat.pct > 10 && (
                        <span className="text-[8px] text-white font-medium">{cat.pct}%</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-display font-semibold text-gray-900 w-16 text-right">
                    ${(cat.amount / 100).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Accounting integrations */}
      {tab === 'accounting' && (
        <div className="space-y-4">
          {INTEGRATIONS.map(int => (
            <div key={int.key} className={`narrative-card ${int.connected ? 'ring-1 ring-grove-200' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${int.logoColor} flex items-center justify-center text-white font-bold text-sm`}>
                  {int.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{int.name}</p>
                    {int.connected && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-grove-100 text-grove-700 font-medium">Connected</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{int.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {int.features.map(f => (
                      <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{f}</span>
                    ))}
                  </div>
                  {int.lastSync && (
                    <p className="text-[10px] text-gray-400 mt-2">Last sync: {int.lastSync}</p>
                  )}
                </div>
                <button className={`calm-button text-xs px-4 py-2 ${
                  int.connected ? 'bg-white border border-gray-200 text-gray-600' : 'bg-grove-600 text-white'
                }`}>
                  {int.connected ? 'Settings' : 'Connect'}
                </button>
              </div>
            </div>
          ))}

          <div className="narrative-card bg-commons-50 border-commons-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-commons-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-commons-800">Keep your accountant happy</p>
              <p className="text-xs text-commons-600 mt-1">
                Communis reads from QuickBooks — it doesn't replace it. Your accountant keeps working
                in the tool they know. Members get financial transparency through Communis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Time / Scheduling sources */}
      {tab === 'time' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Import hours from your existing scheduling or payroll tool. Hours feed into the patronage engine.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {TIME_SOURCES.map(src => (
              <div key={src.key} className={`narrative-card flex items-center gap-3 ${
                src.connected ? 'ring-1 ring-grove-200' : ''
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  src.connected ? 'bg-grove-100' : 'bg-gray-100'
                }`}>
                  <Clock size={14} className={src.connected ? 'text-grove-600' : 'text-gray-400'} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">{src.name}</p>
                  {src.connected && (
                    <p className="text-[10px] text-grove-600">Connected</p>
                  )}
                </div>
                {!src.connected && (
                  <button className="text-[10px] text-grove-600 hover:text-grove-700">Connect</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
