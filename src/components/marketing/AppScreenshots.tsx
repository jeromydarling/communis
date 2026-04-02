/**
 * Mini app screenshots rendered as live React components inside browser frames.
 * These appear on the marketing site to show Communis in action.
 */
import { BrowserFrame } from './BrowserFrame'
import { Landmark, Users, Vote, Sparkles, TrendingUp } from 'lucide-react'

export function DashboardScreenshot() {
  return (
    <BrowserFrame url="communis.coop/app" className="max-w-xl">
      <div className="p-4 bg-warmth-50 space-y-3" style={{ fontSize: '11px' }}>
        {/* NRI greeting */}
        <div className="bg-grove-50 border border-grove-100 rounded-lg p-3 flex items-start gap-2">
          <Sparkles size={14} className="text-grove-600 mt-0.5" />
          <div>
            <p className="font-medium text-grove-800 text-[11px]">Good morning, Evergreen.</p>
            <p className="text-grove-600 text-[10px] mt-0.5">
              5 active members, 1 candidate on the path. Patronage vote needs one more voice.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Users, value: '5', label: 'members', accent: 'text-grove-500' },
            { icon: Landmark, value: '$34.7k', label: 'equity', accent: 'text-grove-500' },
            { icon: TrendingUp, value: '$18.4k', label: 'surplus', accent: 'text-warmth-500' },
            { icon: Vote, value: '2', label: 'proposals', accent: 'text-commons-500' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-lg border border-terra-100 p-2">
              <stat.icon size={12} className={stat.accent} />
              <p className="font-display text-sm font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-[9px] text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Member equity list */}
        <div className="bg-white rounded-lg border border-terra-100 p-3">
          <p className="text-[10px] font-medium text-gray-900 mb-2">Member Equity</p>
          {[
            { initials: 'MR', name: 'María Reyes', equity: '$12,480', role: 'Board President' },
            { initials: 'JO', name: 'James Okonkwo', equity: '$8,920', role: 'Operations Lead' },
            { initials: 'AV', name: 'Ana Lucía Vega', equity: '$5,340', role: 'Member-Owner' },
          ].map(m => (
            <div key={m.initials} className="flex items-center gap-2 py-1.5 border-b border-terra-50 last:border-0">
              <div className="w-6 h-6 rounded-full bg-grove-100 flex items-center justify-center text-[8px] font-medium text-grove-700">
                {m.initials}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium text-gray-900">{m.name}</p>
                <p className="text-[8px] text-gray-400">{m.role}</p>
              </div>
              <p className="text-[10px] font-display font-semibold text-gray-900">{m.equity}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

export function PatronageScreenshot() {
  return (
    <BrowserFrame url="communis.coop/app/patronage" className="max-w-xl">
      <div className="p-4 bg-warmth-50 space-y-3" style={{ fontSize: '11px' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-sm font-bold text-gray-900">Patronage Distribution</p>
            <p className="text-[10px] text-gray-400">Q4 2024 — based on hours worked</p>
          </div>
          <div className="bg-warmth-50 border border-warmth-200 rounded-lg px-2 py-1">
            <p className="text-[10px] font-medium text-warmth-700">$18,400 surplus</p>
          </div>
        </div>

        {/* Allocation bars */}
        <div className="bg-white rounded-lg border border-terra-100 p-3 space-y-2">
          {[
            { name: 'Ana Lucía V.', hours: 1720, share: 21.5, total: '$3,956' },
            { name: 'María Reyes', hours: 1640, share: 20.5, total: '$3,772' },
            { name: 'James O.', hours: 1580, share: 19.8, total: '$3,643' },
            { name: 'Fatima H.', hours: 1550, share: 19.4, total: '$3,568' },
            { name: 'David Chen', hours: 1490, share: 18.6, total: '$3,422' },
          ].map(a => (
            <div key={a.name} className="flex items-center gap-3">
              <p className="text-[10px] text-gray-700 w-20 truncate">{a.name}</p>
              <div className="flex-1 h-4 bg-gray-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-grove-400 rounded-full flex items-center justify-end pr-1"
                  style={{ width: `${a.share * 4.5}%` }}
                >
                  <span className="text-[7px] text-white font-medium">{a.share}%</span>
                </div>
              </div>
              <p className="text-[10px] font-display font-semibold text-gray-900 w-12 text-right">{a.total}</p>
            </div>
          ))}
        </div>

        {/* Split indicator */}
        <div className="flex gap-2">
          <div className="flex-1 bg-grove-50 border border-grove-100 rounded-lg p-2 text-center">
            <p className="text-[9px] text-grove-500">Qualified (80%)</p>
            <p className="text-[11px] font-display font-bold text-grove-700">$14,720</p>
          </div>
          <div className="flex-1 bg-warmth-50 border border-warmth-100 rounded-lg p-2 text-center">
            <p className="text-[9px] text-warmth-500">Non-Qualified (20%)</p>
            <p className="text-[11px] font-display font-bold text-warmth-700">$3,680</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

export function GovernanceScreenshot() {
  return (
    <BrowserFrame url="communis.coop/app/governance" className="max-w-xl">
      <div className="p-4 bg-warmth-50 space-y-3" style={{ fontSize: '11px' }}>
        <p className="font-display text-sm font-bold text-gray-900">Active Proposals</p>

        {/* Voting proposal */}
        <div className="bg-warmth-50 border border-warmth-200 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-warmth-500 animate-pulse" />
            <span className="text-[10px] font-medium text-warmth-600">Voting</span>
          </div>
          <p className="text-[11px] font-medium text-gray-900">Approve Q4 2024 Patronage Distribution</p>
          <p className="text-[9px] text-gray-400 mt-1">$18,400 surplus · majority vote · Finance Committee</p>

          <div className="mt-2 flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-grove-500" /> 3 for
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-300" /> 1 abstain
            </span>
            <span className="text-gray-400 ml-auto">4/5 voted</span>
          </div>
          <div className="mt-1 w-full h-1.5 rounded-full bg-gray-100 overflow-hidden flex">
            <div className="h-full bg-grove-500" style={{ width: '60%' }} />
            <div className="h-full bg-gray-300" style={{ width: '20%' }} />
          </div>
        </div>

        {/* Discussion proposal */}
        <div className="bg-commons-50 border border-commons-200 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-commons-500" />
            <span className="text-[10px] font-medium text-commons-600">Discussion</span>
          </div>
          <p className="text-[11px] font-medium text-gray-900">Accept Roberto Sandoval as Member-Owner</p>
          <p className="text-[9px] text-gray-400 mt-1">consensus vote · Hiring Committee</p>
        </div>
      </div>
    </BrowserFrame>
  )
}

export function MemberStoryScreenshot() {
  return (
    <BrowserFrame url="communis.coop/app/members/ana-lucia" className="max-w-xl">
      <div className="p-4 bg-warmth-50 space-y-3" style={{ fontSize: '11px' }}>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-grove-100 flex items-center justify-center text-sm font-semibold text-grove-700">
            AV
          </div>
          <div>
            <p className="font-display text-sm font-bold text-gray-900">Ana Lucía Vega</p>
            <p className="text-[10px] text-gray-400">Member-Owner · Hiring, Training</p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-lg border border-terra-100 p-3">
          <p className="text-[10px] font-medium text-gray-700 mb-1">Member Story</p>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Ana Lucía came to Evergreen through a DAWI-trained cooperative developer. She leads the Spanish-language onboarding track for new candidates.
          </p>
        </div>

        {/* Equity narrative */}
        <div className="bg-warmth-50 border border-warmth-200 rounded-lg p-3">
          <p className="text-[10px] text-warmth-700 leading-relaxed">
            You've built $5,340 in equity over 3 years. Each hour you work strengthens both the cooperative and your own ownership stake.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg border border-terra-100 p-2">
            <p className="text-[10px] text-gray-400">Equity</p>
            <p className="font-display text-sm font-bold text-gray-900">$5,340</p>
          </div>
          <div className="bg-white rounded-lg border border-terra-100 p-2">
            <p className="text-[10px] text-gray-400">Hours this year</p>
            <p className="font-display text-sm font-bold text-gray-900">1,720</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
