import { Vote, MessageSquare, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { proposals } from '../data/demo'

const statusConfig = {
  discussion: { icon: MessageSquare, color: 'text-commons-600', bg: 'bg-commons-50 border-commons-100', label: 'Discussion' },
  voting: { icon: Clock, color: 'text-warmth-600', bg: 'bg-warmth-50 border-warmth-100', label: 'Voting' },
  passed: { icon: CheckCircle2, color: 'text-grove-600', bg: 'bg-grove-50 border-grove-100', label: 'Passed' },
  failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 border-red-100', label: 'Failed' },
}

const typeLabels = {
  hiring: 'Hiring',
  financial: 'Financial',
  policy: 'Policy',
  operational: 'Operational',
}

export default function GovernancePage() {
  const active = proposals.filter(p => p.status === 'voting' || p.status === 'discussion')
  const resolved = proposals.filter(p => p.status === 'passed' || p.status === 'failed')

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Governance</h1>
        <p className="text-sm text-gray-400 mt-1">
          Decisions made together. Every proposal connects to an outcome.
        </p>
      </div>

      {/* Active proposals */}
      <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">Active Proposals</h2>
      <div className="space-y-4 mb-10">
        {active.map(proposal => {
          const config = statusConfig[proposal.status]
          const Icon = config.icon
          return (
            <div key={proposal.id} className={`p-5 rounded-2xl border ${config.bg}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className={config.color} />
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/50 text-gray-500">
                      {typeLabels[proposal.type]}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-gray-900">{proposal.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{proposal.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>Proposed by {proposal.proposedBy}</span>
                    <span>·</span>
                    <span>{proposal.votingMethod} vote</span>
                    <span>·</span>
                    <span>{proposal.date}</span>
                  </div>
                </div>
              </div>

              {proposal.status === 'voting' && (
                <div className="mt-4 p-3 rounded-xl bg-white/60">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-grove-500" />
                      <span className="font-medium text-grove-700">{proposal.votesFor} for</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="font-medium text-red-600">{proposal.votesAgainst} against</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-gray-300" />
                      <span className="font-medium text-gray-500">{proposal.votesAbstain} abstain</span>
                    </div>
                    <div className="text-gray-400 ml-auto">
                      {proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain} / {proposal.totalEligible} voted
                    </div>
                  </div>
                  <div className="mt-2 w-full h-2 rounded-full bg-gray-100 overflow-hidden flex">
                    <div
                      className="h-full bg-grove-500"
                      style={{ width: `${(proposal.votesFor / proposal.totalEligible) * 100}%` }}
                    />
                    <div
                      className="h-full bg-red-400"
                      style={{ width: `${(proposal.votesAgainst / proposal.totalEligible) * 100}%` }}
                    />
                    <div
                      className="h-full bg-gray-300"
                      style={{ width: `${(proposal.votesAbstain / proposal.totalEligible) * 100}%` }}
                    />
                  </div>
                  <button className="mt-3 calm-button-primary text-xs py-2">
                    Cast Your Vote
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Resolved */}
      <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">Resolved</h2>
      <div className="space-y-3">
        {resolved.map(proposal => {
          const config = statusConfig[proposal.status]
          const Icon = config.icon
          return (
            <div key={proposal.id} className="narrative-card">
              <div className="flex items-start gap-3">
                <Icon size={18} className={config.color} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900">{proposal.title}</h3>
                    <span className={`text-[10px] font-medium ${config.color}`}>{config.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {proposal.votesFor}–{proposal.votesAgainst} · {proposal.votingMethod} · {proposal.date}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
