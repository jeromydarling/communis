import { Link } from 'react-router-dom'
import {
  Users,
  Landmark,
  TrendingUp,
  Vote,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { coopStats, nriSignals, proposals, members } from '../data/demo'

const signalColors = {
  gentle: 'bg-grove-100 text-grove-700 border-grove-200',
  notable: 'bg-warmth-100 text-warmth-700 border-warmth-200',
  urgent: 'bg-red-100 text-red-700 border-red-200',
}

const signalDots = {
  gentle: 'bg-grove-400',
  notable: 'bg-warmth-500',
  urgent: 'bg-red-500',
}

export default function DashboardPage() {
  const activeMembers = members.filter(m => m.status === 'active')
  const activeProposals = proposals.filter(p => p.status === 'voting' || p.status === 'discussion')

  return (
    <div className="space-y-6">
      {/* Narrative greeting */}
      <div className="narrative-card bg-grove-50 border-grove-100">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-grove-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-grove-800">Good morning, Evergreen.</p>
            <p className="text-sm text-grove-600 mt-1">
              Your cooperative is in its 6th year. 5 active member-owners, 1 candidate on the path.
              There's a patronage vote waiting for one more voice, and the hiring committee
              has a membership review coming up.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="narrative-card">
          <Users size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">{coopStats.totalMembers}</p>
          <p className="text-xs text-gray-400">active members</p>
          <p className="text-[10px] text-grove-500 mt-1">+{coopStats.candidates} candidate</p>
        </div>
        <div className="narrative-card">
          <Landmark size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">${(coopStats.totalEquity / 1000).toFixed(1)}k</p>
          <p className="text-xs text-gray-400">total member equity</p>
          <p className="text-[10px] text-grove-500 mt-1">${(coopStats.collectiveReserve / 1000).toFixed(1)}k collective reserve</p>
        </div>
        <div className="narrative-card">
          <TrendingUp size={18} className="text-warmth-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">${(coopStats.surplusToDistribute / 1000).toFixed(1)}k</p>
          <p className="text-xs text-gray-400">surplus to distribute</p>
          <p className="text-[10px] text-warmth-500 mt-1">Q4 2024 — vote in progress</p>
        </div>
        <div className="narrative-card">
          <Vote size={18} className="text-commons-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">{activeProposals.length}</p>
          <p className="text-xs text-gray-400">active proposals</p>
          <p className="text-[10px] text-commons-500 mt-1">1 voting · 1 discussion</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* NRI Signals */}
        <div>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">
            NRI Signals
          </h2>
          <div className="space-y-3">
            {nriSignals.map(signal => (
              <div
                key={signal.id}
                className={`p-4 rounded-xl border ${signalColors[signal.severity]}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`signal-dot ${signalDots[signal.severity]}`} />
                  <p className="text-sm font-medium">{signal.message}</p>
                </div>
                <p className="text-xs opacity-80 ml-4">{signal.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Member equity overview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-gray-900">Member Equity</h2>
            <Link to="/app/members" className="text-xs text-grove-600 hover:text-grove-700 flex items-center gap-1">
              All members <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {activeMembers.map(member => (
              <Link
                key={member.id}
                to={`/app/members/${member.id}`}
                className="narrative-card flex items-center gap-4 hover:shadow-md transition-shadow block"
              >
                <div className="w-10 h-10 rounded-full bg-grove-100 flex items-center justify-center text-sm font-medium text-grove-700">
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-display font-semibold text-gray-900">
                    ${member.equity.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-400">equity</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Cooperative rhythm */}
      <div className="narrative-card bg-warmth-50 border-warmth-100">
        <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Cooperative Rhythm</h2>
        <p className="text-sm text-gray-500">
          This quarter: 4 governance decisions made, 92% average meeting attendance,
          all committees active. Pay ratio holds steady at {coopStats.payRatio}.
          Average hourly wage: ${coopStats.avgHourlyWage} — ${(coopStats.avgHourlyWage - 15).toFixed(2)} above your state minimum.
        </p>
      </div>
    </div>
  )
}
