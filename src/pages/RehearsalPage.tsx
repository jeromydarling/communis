import { useState } from 'react'
import { GraduationCap, Vote, Users, ArrowRight, Check, RotateCw, Sparkles } from 'lucide-react'
import { EducationTooltip } from '@/components/compass/EducationTooltip'
import type { VotingMethod } from '@/types'

const REHEARSAL_SCENARIOS = [
  {
    id: 'r1',
    title: 'Should we adopt a 4-day work week?',
    description: 'Practice proposal: The operations committee suggests moving to a 4-day, 32-hour work week with no pay reduction.',
    votingMethod: 'majority' as VotingMethod,
    quorum: 0.5,
  },
  {
    id: 'r2',
    title: 'Accept a new member to the cooperative',
    description: 'Practice proposal: The hiring committee recommends accepting a candidate as a full member-owner after completing their 6-month candidacy.',
    votingMethod: 'consensus' as VotingMethod,
    quorum: 0.67,
  },
  {
    id: 'r3',
    title: 'Amend bylaws: Change pay ratio from 2:1 to 3:1',
    description: 'Practice proposal: Allow up to a 3:1 pay ratio to attract specialized talent. Requires supermajority.',
    votingMethod: 'supermajority' as VotingMethod,
    quorum: 0.67,
  },
  {
    id: 'r4',
    title: 'Purchase $5,000 in new equipment',
    description: 'Practice proposal: Using consent-based decision making, decide whether to approve this operational expense.',
    votingMethod: 'consent' as VotingMethod,
    quorum: 0.5,
  },
]

type VoteChoice = 'for' | 'against' | 'abstain' | 'block'

const METHOD_LABELS: Record<VotingMethod, { label: string; passRule: string }> = {
  majority: { label: 'Majority Vote', passRule: 'More than 50% vote yes' },
  supermajority: { label: 'Supermajority', passRule: 'At least 2/3 (67%) vote yes' },
  consensus: { label: 'Consensus', passRule: 'No blocks, and general agreement' },
  consent: { label: 'Consent', passRule: 'No paramount objections' },
}

export default function RehearsalPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [myVote, setMyVote] = useState<VoteChoice | null>(null)
  const [showResults, setShowResults] = useState(false)

  const scenario = REHEARSAL_SCENARIOS.find(s => s.id === selectedScenario)
  const methodInfo = scenario ? METHOD_LABELS[scenario.votingMethod] : null

  // Simulated other votes
  const otherVotes: Record<string, VoteChoice> = {
    'María Reyes': 'for',
    'James Okonkwo': 'for',
    'Ana Lucía Vega': selectedScenario === 'r3' ? 'against' : 'for',
    'David Chen': selectedScenario === 'r2' ? 'abstain' : 'for',
  }

  const allVotes = myVote ? { 'You (Fatima Hassan)': myVote, ...otherVotes } : otherVotes
  const forCount = Object.values(allVotes).filter(v => v === 'for').length
  const againstCount = Object.values(allVotes).filter(v => v === 'against').length
  const abstainCount = Object.values(allVotes).filter(v => v === 'abstain').length
  const blockCount = Object.values(allVotes).filter(v => v === 'block').length
  const totalVoters = Object.keys(allVotes).length
  const quorumMet = totalVoters >= Math.ceil(5 * (scenario?.quorum || 0.5))

  const passed = scenario ? (() => {
    if (!quorumMet) return false
    if (blockCount > 0 && (scenario.votingMethod === 'consensus' || scenario.votingMethod === 'consent')) return false
    if (scenario.votingMethod === 'majority') return forCount > totalVoters / 2
    if (scenario.votingMethod === 'supermajority') return forCount >= totalVoters * 0.667
    if (scenario.votingMethod === 'consensus') return againstCount === 0 && blockCount === 0
    if (scenario.votingMethod === 'consent') return blockCount === 0
    return false
  })() : false

  const resetVote = () => {
    setMyVote(null)
    setShowResults(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-warmth-100 flex items-center justify-center">
          <GraduationCap size={20} className="text-warmth-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Rehearsal Votes</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Practice democratic decision-making. Results don't count — learning does.
          </p>
        </div>
      </div>

      {/* NRI education callout */}
      <div className="narrative-card bg-grove-50 border-grove-100 mb-6 flex items-start gap-3">
        <Sparkles size={16} className="text-grove-600 mt-0.5" />
        <div>
          <p className="text-sm text-grove-800">
            New to cooperative governance? Try each voting method to see how they feel.
            In a <EducationTooltip term="Majority Vote">majority vote</EducationTooltip>, the most votes wins.
            In <EducationTooltip term="Consensus">consensus</EducationTooltip>, one person can block.
            Each method has a different energy — find what fits your co-op.
          </p>
        </div>
      </div>

      {!selectedScenario ? (
        /* Scenario selector */
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Choose a practice scenario:</p>
          {REHEARSAL_SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => { setSelectedScenario(s.id); resetVote() }}
              className="w-full narrative-card text-left hover:shadow-md transition-shadow border-dashed border-2 border-warmth-200"
            >
              <div className="flex items-start gap-3">
                <Vote size={18} className="text-warmth-500 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{s.title}</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-warmth-100 text-warmth-600 font-medium">
                      Rehearsal
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                    <span>Method: <EducationTooltip term={methodInfo?.label || s.votingMethod}>{METHOD_LABELS[s.votingMethod].label}</EducationTooltip></span>
                    <span>·</span>
                    <span><EducationTooltip term="Quorum">Quorum</EducationTooltip>: {Math.round(s.quorum * 100)}%</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Active rehearsal */
        <div className="space-y-4">
          <button
            onClick={() => { setSelectedScenario(null); resetVote() }}
            className="text-xs text-gray-400 hover:text-grove-600"
          >
            ← Back to scenarios
          </button>

          {/* Proposal card */}
          <div className="narrative-card border-dashed border-2 border-warmth-200">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={14} className="text-warmth-500" />
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-warmth-100 text-warmth-600 font-medium">
                Rehearsal — this vote doesn't count
              </span>
            </div>
            <h2 className="font-display text-lg font-semibold text-gray-900">{scenario!.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{scenario!.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span>Method: <strong className="text-gray-600">{methodInfo!.label}</strong></span>
              <span>Rule: {methodInfo!.passRule}</span>
              <span>Quorum: {Math.round(scenario!.quorum * 100)}% ({Math.ceil(5 * scenario!.quorum)} of 5)</span>
            </div>
          </div>

          {/* Voting UI */}
          {!showResults ? (
            <div className="narrative-card">
              <p className="text-sm font-medium text-gray-900 mb-3">Cast your practice vote:</p>
              <div className="grid grid-cols-2 gap-3">
                {(['for', 'against', 'abstain', ...(scenario!.votingMethod === 'consensus' || scenario!.votingMethod === 'consent' ? ['block'] : [])] as VoteChoice[]).map(choice => (
                  <button
                    key={choice}
                    onClick={() => setMyVote(choice)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      myVote === choice
                        ? choice === 'for' ? 'bg-grove-50 border-grove-400 text-grove-700'
                        : choice === 'against' ? 'bg-red-50 border-red-300 text-red-700'
                        : choice === 'block' ? 'bg-red-50 border-red-400 text-red-800'
                        : 'bg-gray-50 border-gray-300 text-gray-600'
                        : 'border-terra-200 text-gray-500 hover:border-grove-200'
                    }`}
                  >
                    {choice === 'for' ? '✓ For' :
                     choice === 'against' ? '✗ Against' :
                     choice === 'block' ? '🛑 Block' :
                     '— Abstain'}
                    {choice === 'block' && (
                      <span className="block text-[10px] font-normal mt-0.5">
                        "I have a principled objection"
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {myVote && (
                <button
                  onClick={() => setShowResults(true)}
                  className="mt-4 w-full calm-button-primary flex items-center justify-center gap-2"
                >
                  See Results <ArrowRight size={14} />
                </button>
              )}
            </div>
          ) : (
            /* Results */
            <div className="space-y-4">
              <div className={`narrative-card border-2 ${passed ? 'border-grove-300 bg-grove-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {passed ? (
                    <Check size={18} className="text-grove-600" />
                  ) : (
                    <span className="text-red-500 font-bold">✗</span>
                  )}
                  <p className="font-display text-lg font-semibold text-gray-900">
                    {passed ? 'Passed' : 'Did Not Pass'}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-warmth-100 text-warmth-600 font-medium ml-auto">
                    Rehearsal
                  </span>
                </div>

                {/* Vote breakdown */}
                <div className="flex items-center gap-4 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-grove-500" />
                    <strong>{forCount}</strong> for
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <strong>{againstCount}</strong> against
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-gray-300" />
                    <strong>{abstainCount}</strong> abstain
                  </span>
                  {blockCount > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-red-600" />
                      <strong>{blockCount}</strong> block
                    </span>
                  )}
                </div>

                {/* Quorum check */}
                <p className="text-xs text-gray-500">
                  <EducationTooltip term="Quorum">Quorum</EducationTooltip>: {quorumMet ? '✓ Met' : '✗ Not met'}
                  ({totalVoters} of {Math.ceil(5 * scenario!.quorum)} needed)
                </p>

                {/* Explanation of why it passed/failed */}
                <div className="mt-3 p-3 rounded-lg bg-white/60 border border-terra-100">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {passed
                      ? `This ${methodInfo!.label.toLowerCase()} passed because: ${methodInfo!.passRule.toLowerCase()}. In a real vote, this would trigger the proposed action.`
                      : blockCount > 0
                      ? `This ${methodInfo!.label.toLowerCase()} did not pass because someone blocked it. In ${scenario!.votingMethod}, a block means "I believe this would cause serious harm." The group must address the concern before trying again.`
                      : !quorumMet
                      ? 'The vote did not reach quorum — not enough members participated. In a real vote, you\'d need to reschedule and encourage more participation.'
                      : `This ${methodInfo!.label.toLowerCase()} did not pass because: ${methodInfo!.passRule.toLowerCase()} — and the votes didn't reach that threshold.`
                    }
                  </p>
                </div>
              </div>

              {/* Individual votes */}
              <div className="narrative-card">
                <p className="text-xs font-medium text-gray-900 mb-2">How everyone voted:</p>
                {Object.entries(allVotes).map(([name, vote]) => (
                  <div key={name} className="flex items-center gap-2 py-1.5 border-b border-terra-50 last:border-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-medium ${
                      name.includes('You') ? 'bg-warmth-100 text-warmth-700' : 'bg-grove-100 text-grove-700'
                    }`}>
                      {name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs text-gray-700 flex-1">{name}</span>
                    <span className={`text-xs font-medium ${
                      vote === 'for' ? 'text-grove-600' :
                      vote === 'against' ? 'text-red-500' :
                      vote === 'block' ? 'text-red-700' :
                      'text-gray-400'
                    }`}>
                      {vote === 'for' ? 'For' :
                       vote === 'against' ? 'Against' :
                       vote === 'block' ? 'Blocked' :
                       'Abstained'}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={resetVote}
                className="calm-button-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                <RotateCw size={14} /> Try a Different Vote
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
