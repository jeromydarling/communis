import { useState } from 'react'
import { BookOpen, Clock, Edit3, History, Search, Shield } from 'lucide-react'

const BYLAW_SECTIONS = [
  {
    number: '1', title: 'Name and Purpose',
    summary: 'Establishes the cooperative as Evergreen Workers Co-op, a worker-owned cleaning cooperative.',
    lastAmended: null, status: 'original',
  },
  {
    number: '2', title: 'Membership',
    summary: 'Defines candidacy period (6 months), buy-in ($2,000 with installment option), membership vote (consensus), and departure/revolvement (3-year payout).',
    lastAmended: '2023-06-15', status: 'amended',
  },
  {
    number: '3', title: 'Governance',
    summary: 'One member one vote. General meetings monthly (majority vote). Board meetings monthly (majority). Bylaws changes require supermajority. Quorum: 50% general, 67% board.',
    lastAmended: null, status: 'original',
  },
  {
    number: '4', title: 'Patronage Distribution',
    summary: 'Surplus allocated by hours worked. 80% qualified, 20% non-qualified. Distribution requires majority vote. Finance Committee recommends allocation. Fiscal year ends December 31.',
    lastAmended: '2024-03-10', status: 'amended',
  },
  {
    number: '5', title: 'Committees',
    summary: 'Standing committees: Board, Finance, Hiring, Operations, Training. Chair elected by committee members. Terms: 1 year, max 3 consecutive. Rotation encouraged.',
    lastAmended: null, status: 'original',
  },
  {
    number: '6', title: 'Compensation',
    summary: 'Maximum pay ratio: 2:1. Base wage reviewed annually by Finance Committee. Wages approved by general membership vote.',
    lastAmended: null, status: 'original',
  },
  {
    number: '7', title: 'Grievance Process',
    summary: '3-step process: direct conversation (facilitated), committee hearing, general membership vote. Mediation available at step 1. Timeline: 45 days.',
    lastAmended: '2024-12-10', status: 'recently_amended',
  },
  {
    number: '8', title: 'Dissolution',
    summary: 'Requires 3/4 supermajority. Assets distributed to members proportional to equity after debts paid. Remaining assets donated to cooperative development fund.',
    lastAmended: null, status: 'original',
  },
]

const AMENDMENT_HISTORY = [
  { date: '2024-12-10', section: '7', title: 'Extended grievance timeline to 45 days, added optional mediation', vote: '5-0 supermajority' },
  { date: '2024-03-10', section: '4', title: 'Changed qualified/non-qualified split from 70/30 to 80/20', vote: '4-1 majority' },
  { date: '2023-06-15', section: '2', title: 'Added installment buy-in option, reduced candidacy from 9 to 6 months', vote: '5-0 supermajority' },
]

export default function BylawsPage() {
  const [tab, setTab] = useState<'current' | 'history'>('current')
  const [search, setSearch] = useState('')

  const filtered = BYLAW_SECTIONS.filter(s =>
    !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.summary.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Bylaws & Policies</h1>
          <p className="text-sm text-gray-400 mt-1">The living rulebook of your cooperative. Always current, always accessible.</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-grove-500" />
          <span className="text-xs text-grove-600">Stewards can propose amendments</span>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-warmth-100 rounded-xl p-1">
        <button onClick={() => setTab('current')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'current' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Current Bylaws
        </button>
        <button onClick={() => setTab('history')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Amendment History ({AMENDMENT_HISTORY.length})
        </button>
      </div>

      {tab === 'current' && (
        <>
          <div className="relative mb-4">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bylaws..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-terra-200 bg-warmth-50 text-sm" />
          </div>

          <div className="space-y-3">
            {filtered.map(section => (
              <div key={section.number} className={`narrative-card ${section.status === 'recently_amended' ? 'ring-1 ring-warmth-200' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-grove-50 flex items-center justify-center text-sm font-display font-bold text-grove-700 flex-shrink-0">
                    {section.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900">Section {section.number}: {section.title}</h3>
                      {section.status === 'recently_amended' && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-warmth-100 text-warmth-600 font-medium">Recently amended</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{section.summary}</p>
                    {section.lastAmended && (
                      <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                        <Clock size={10} /> Last amended: {section.lastAmended}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'history' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 mb-2">Every amendment voted on and recorded.</p>
          {AMENDMENT_HISTORY.map((amendment, i) => (
            <div key={i} className="narrative-card flex items-start gap-3">
              <History size={16} className="text-commons-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Section {amendment.section}: {amendment.title}</p>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                  <span>{amendment.date}</span>
                  <span>·</span>
                  <span className="text-grove-600">{amendment.vote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
