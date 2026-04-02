import { PieChart, Clock, DollarSign, FileText } from 'lucide-react'
import { members, coopStats } from '../data/demo'

export default function PatronagePage() {
  const activeMembers = members.filter(m => m.status === 'active')
  const totalHours = activeMembers.reduce((sum, m) => sum + m.hoursThisYear, 0)
  const surplus = coopStats.surplusToDistribute
  const qualifiedPct = 0.80
  const nonQualifiedPct = 0.20

  const allocations = activeMembers.map(member => {
    const share = member.hoursThisYear / totalHours
    const total = Math.round(surplus * share)
    const qualified = Math.round(total * qualifiedPct)
    const nonQualified = Math.round(total * nonQualifiedPct)
    return {
      ...member,
      share,
      total,
      qualified,
      nonQualified,
    }
  }).sort((a, b) => b.hoursThisYear - a.hoursThisYear)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Patronage Distribution</h1>
        <p className="text-sm text-gray-400 mt-1">
          Q4 2024 surplus allocation — based on hours worked, as your bylaws specify.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="narrative-card">
          <DollarSign size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">${surplus.toLocaleString()}</p>
          <p className="text-xs text-gray-400">total surplus</p>
        </div>
        <div className="narrative-card">
          <Clock size={18} className="text-commons-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">{totalHours.toLocaleString()}</p>
          <p className="text-xs text-gray-400">total hours (basis)</p>
        </div>
        <div className="narrative-card">
          <PieChart size={18} className="text-warmth-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">80 / 20</p>
          <p className="text-xs text-gray-400">qualified / non-qualified</p>
        </div>
        <div className="narrative-card">
          <FileText size={18} className="text-terra-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">Subchapter T</p>
          <p className="text-xs text-gray-400">tax treatment</p>
        </div>
      </div>

      {/* Narrative explanation */}
      <div className="narrative-card bg-warmth-50 border-warmth-100 mb-8">
        <p className="text-sm text-warmth-700 leading-relaxed">
          This quarter, Evergreen generated ${surplus.toLocaleString()} in surplus after expenses and reserves.
          Per your bylaws, patronage is allocated proportionally to hours worked. 80% is distributed as
          qualified patronage (taxed to members, deductible by the co-op) and 20% as non-qualified
          (retained in member accounts, taxed when paid out).
        </p>
      </div>

      {/* Allocation table */}
      <div className="narrative-card overflow-hidden">
        <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Member Allocations</h2>

        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-terra-100">
                <th className="text-left py-2 text-xs font-medium text-gray-400">Member</th>
                <th className="text-right py-2 text-xs font-medium text-gray-400">Hours</th>
                <th className="text-right py-2 text-xs font-medium text-gray-400">Share</th>
                <th className="text-right py-2 text-xs font-medium text-gray-400">Qualified (80%)</th>
                <th className="text-right py-2 text-xs font-medium text-gray-400">Non-Qual (20%)</th>
                <th className="text-right py-2 text-xs font-medium text-gray-400">Total</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map(a => (
                <tr key={a.id} className="border-b border-terra-50">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-grove-100 flex items-center justify-center text-xs font-medium text-grove-700">
                        {a.initials}
                      </div>
                      <span className="font-medium text-gray-900">{a.name}</span>
                    </div>
                  </td>
                  <td className="text-right text-gray-600">{a.hoursThisYear.toLocaleString()}</td>
                  <td className="text-right text-gray-600">{(a.share * 100).toFixed(1)}%</td>
                  <td className="text-right text-grove-700 font-medium">${a.qualified.toLocaleString()}</td>
                  <td className="text-right text-gray-500">${a.nonQualified.toLocaleString()}</td>
                  <td className="text-right font-display font-semibold text-gray-900">${a.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-terra-200">
                <td className="py-3 font-medium text-gray-900">Total</td>
                <td className="text-right font-medium text-gray-900">{totalHours.toLocaleString()}</td>
                <td className="text-right text-gray-600">100%</td>
                <td className="text-right font-medium text-grove-700">
                  ${Math.round(surplus * qualifiedPct).toLocaleString()}
                </td>
                <td className="text-right text-gray-500">
                  ${Math.round(surplus * nonQualifiedPct).toLocaleString()}
                </td>
                <td className="text-right font-display font-bold text-gray-900">${surplus.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {allocations.map(a => (
            <div key={a.id} className="p-4 rounded-xl bg-warmth-50 border border-warmth-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-grove-100 flex items-center justify-center text-xs font-medium text-grove-700">
                    {a.initials}
                  </div>
                  <span className="font-medium text-sm text-gray-900">{a.name}</span>
                </div>
                <span className="font-display font-bold text-gray-900">${a.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{a.hoursThisYear} hrs ({(a.share * 100).toFixed(1)}%)</span>
                <span>${a.qualified.toLocaleString()} qual · ${a.nonQualified.toLocaleString()} non-qual</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1099-PATR callout */}
      <div className="narrative-card mt-6 flex items-start gap-3">
        <FileText size={20} className="text-terra-500 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">1099-PATR Generation</p>
          <p className="text-xs text-gray-500 mt-1">
            Once the patronage vote passes, Communis will generate 1099-PATR forms for each member
            showing qualified patronage dividends. Forms will be ready for download before the
            January 31 filing deadline.
          </p>
        </div>
      </div>
    </div>
  )
}
