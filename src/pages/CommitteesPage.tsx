import { useState } from 'react'
import { Users, Calendar, RotateCw, Plus, Clock, AlertCircle } from 'lucide-react'
import { members } from '@/data/demo'
import type { RotationFairness } from '@/types/scheduling'

const DEMO_COMMITTEES = [
  {
    id: '1', name: 'Board of Directors', description: 'Strategic oversight and fiduciary responsibility',
    is_standing: true, cadence: 'monthly', nextMeeting: '2025-02-05',
    members: [
      { id: '1', name: 'María Reyes', role: 'chair', termEnd: '2026-03' },
      { id: '2', name: 'James Okonkwo', role: 'member', termEnd: '2025-09' },
      { id: '4', name: 'David Chen', role: 'member', termEnd: '2025-09' },
    ],
  },
  {
    id: '2', name: 'Finance Committee', description: 'Budgeting, patronage calculation, financial oversight',
    is_standing: true, cadence: 'monthly', nextMeeting: '2025-02-10',
    members: [
      { id: '4', name: 'David Chen', role: 'chair', termEnd: '2025-12' },
      { id: '1', name: 'María Reyes', role: 'member', termEnd: '2026-03' },
    ],
  },
  {
    id: '3', name: 'Hiring Committee', description: 'Recruitment, candidate evaluation, onboarding oversight',
    is_standing: true, cadence: 'biweekly', nextMeeting: '2025-01-28',
    members: [
      { id: '2', name: 'James Okonkwo', role: 'chair', termEnd: '2025-06' },
      { id: '3', name: 'Ana Lucía Vega', role: 'member', termEnd: '2025-12' },
    ],
  },
  {
    id: '4', name: 'Training Committee', description: 'Member development, skills training, mentorship',
    is_standing: true, cadence: 'monthly', nextMeeting: '2025-02-15',
    members: [
      { id: '3', name: 'Ana Lucía Vega', role: 'chair', termEnd: '2025-12' },
    ],
  },
  {
    id: '5', name: 'Operations Committee', description: 'Day-to-day operations, equipment, scheduling',
    is_standing: true, cadence: 'weekly', nextMeeting: '2025-01-27',
    members: [
      { id: '2', name: 'James Okonkwo', role: 'chair', termEnd: '2025-06' },
      { id: '5', name: 'Fatima Hassan', role: 'member', termEnd: '2026-01' },
    ],
  },
]

const DEMO_FAIRNESS: RotationFairness[] = [
  { member_id: '1', member_name: 'María Reyes', total_committee_months: 72, committees_served: ['Board', 'Finance', 'Hiring'], current_committees: ['Board', 'Finance'], last_committee_end: null, fairness_score: 85 },
  { member_id: '2', member_name: 'James Okonkwo', total_committee_months: 48, committees_served: ['Operations', 'Hiring', 'Board'], current_committees: ['Hiring', 'Operations', 'Board'], last_committee_end: null, fairness_score: 90 },
  { member_id: '3', member_name: 'Ana Lucía Vega', total_committee_months: 24, committees_served: ['Hiring', 'Training'], current_committees: ['Hiring', 'Training'], last_committee_end: null, fairness_score: 60 },
  { member_id: '4', member_name: 'David Chen', total_committee_months: 30, committees_served: ['Finance', 'Board'], current_committees: ['Finance', 'Board'], last_committee_end: null, fairness_score: 55 },
  { member_id: '5', member_name: 'Fatima Hassan', total_committee_months: 12, committees_served: ['Operations'], current_committees: ['Operations'], last_committee_end: null, fairness_score: 25 },
]

export default function CommitteesPage() {
  const [tab, setTab] = useState<'committees' | 'rotation'>('committees')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Committees</h1>
          <p className="text-sm text-gray-400 mt-1">
            Democratic work distribution. Who's on what, when they meet, and rotation fairness.
          </p>
        </div>
        <button className="calm-button-primary text-xs flex items-center gap-2">
          <Plus size={14} /> New Committee
        </button>
      </div>

      <div className="flex gap-1 mb-6 bg-warmth-100 rounded-xl p-1">
        <button
          onClick={() => setTab('committees')}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            tab === 'committees' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          }`}
        >
          Committees & Meetings
        </button>
        <button
          onClick={() => setTab('rotation')}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            tab === 'rotation' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          }`}
        >
          Rotation Fairness
        </button>
      </div>

      {tab === 'committees' && (
        <div className="space-y-4">
          {DEMO_COMMITTEES.map(committee => (
            <div key={committee.id} className="narrative-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{committee.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{committee.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-commons-600">
                  <Calendar size={12} />
                  <span>{committee.cadence}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Clock size={12} className="text-gray-400" />
                <span className="text-xs text-gray-500">
                  Next meeting: {committee.nextMeeting}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {committee.members.map(m => (
                  <div key={m.id} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-warmth-50 border border-warmth-100">
                    <div className="w-5 h-5 rounded-full bg-grove-100 flex items-center justify-center text-[8px] font-medium text-grove-700">
                      {m.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[10px] text-gray-700">{m.name}</span>
                    {m.role === 'chair' && (
                      <span className="text-[8px] px-1 py-0.5 rounded bg-grove-100 text-grove-600 font-medium">Chair</span>
                    )}
                    <span className="text-[8px] text-gray-300">→ {m.termEnd}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* NRI signal */}
          <div className="narrative-card bg-warmth-50 border-warmth-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-warmth-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-warmth-800">NRI: Training Committee is understaffed</p>
              <p className="text-xs text-warmth-600 mt-1">
                Only one member (Ana Lucía) serves on Training. Fatima has the lowest committee
                load and expressed interest in joining the board — she might be a good fit.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === 'rotation' && (
        <div className="space-y-4">
          <div className="narrative-card bg-grove-50 border-grove-100">
            <div className="flex items-center gap-2 mb-2">
              <RotateCw size={14} className="text-grove-600" />
              <p className="text-xs font-medium text-grove-800">Rotation Fairness Index</p>
            </div>
            <p className="text-xs text-grove-600">
              Democratic cooperatives distribute governance work fairly. This index tracks
              total committee service months per member. Lower scores mean a member should
              be considered for their next committee assignment.
            </p>
          </div>

          <div className="narrative-card">
            <div className="space-y-3">
              {DEMO_FAIRNESS.sort((a, b) => a.fairness_score - b.fairness_score).map(member => (
                <div key={member.member_id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-grove-100 flex items-center justify-center text-xs font-medium text-grove-700">
                    {member.member_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-gray-900">{member.member_name}</p>
                      <p className="text-[10px] text-gray-400">
                        {member.total_committee_months} months · {member.current_committees.length} active
                      </p>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          member.fairness_score < 40 ? 'bg-warmth-400' :
                          member.fairness_score < 70 ? 'bg-grove-400' :
                          'bg-commons-400'
                        }`}
                        style={{ width: `${member.fairness_score}%` }}
                      />
                    </div>
                    <div className="flex gap-1 mt-1">
                      {member.current_committees.map(c => (
                        <span key={c} className="text-[8px] px-1 py-0.5 rounded bg-gray-100 text-gray-500">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="narrative-card bg-warmth-50 border-warmth-100">
            <p className="text-sm text-warmth-700 leading-relaxed">
              Fatima has the lowest committee load at 12 months on one committee.
              María and James carry the heaviest governance burden. Consider rotating
              James off Hiring when his term ends in June, and inviting Fatima to serve.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
