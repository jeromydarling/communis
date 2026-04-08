import { Calendar, Users, Vote, PieChart, FileText, Check, Clock, Landmark, Sparkles } from 'lucide-react'

const ANNUAL_AGENDA = [
  { time: '10:00 AM', item: 'Call to Order & Quorum Verification', icon: Users, status: 'done', detail: '5 of 5 members present. Quorum met.' },
  { time: '10:10 AM', item: 'Approve Previous Meeting Minutes', icon: FileText, status: 'done', detail: 'Minutes from December 2024 general meeting approved by consent.' },
  { time: '10:20 AM', item: 'Financial Report — Year in Review', icon: PieChart, status: 'current', detail: 'Revenue: $420,000. Expenses: $366,000. Net surplus: $54,000. Cash reserves: 2.8 months.' },
  { time: '10:45 AM', item: 'Patronage Distribution Vote', icon: Landmark, status: 'upcoming', detail: 'Proposed: distribute $42,000 in patronage (80% qualified, 20% non-qualified). Retain $12,000 in reserves.' },
  { time: '11:00 AM', item: 'Board Election', icon: Vote, status: 'upcoming', detail: '3 board seats up for election. María (incumbent), Fatima (new), David (incumbent).' },
  { time: '11:20 AM', item: 'Bylaws Amendment: Update Candidacy Period', icon: FileText, status: 'upcoming', detail: 'Proposed: reduce candidacy from 6 to 4 months. Requires supermajority.' },
  { time: '11:40 AM', item: 'State of the Cooperative', icon: Sparkles, status: 'upcoming', detail: 'NRI annual summary: member growth, governance health, financial trajectory, cooperative milestones.' },
  { time: '12:00 PM', item: 'Open Forum & Adjournment', icon: Users, status: 'upcoming', detail: 'Member questions, concerns, and celebrations.' },
]

const ANNUAL_DOCUMENTS = [
  { title: 'Annual Financial Report', ready: true },
  { title: 'Patronage Distribution Proposal', ready: true },
  { title: 'Board Candidate Statements', ready: true },
  { title: 'Bylaws Amendment Text', ready: true },
  { title: 'Member Equity Statements (individual)', ready: true },
  { title: 'Year-in-Review Narrative (NRI-generated)', ready: false },
]

const statusColors = {
  done: 'bg-grove-100 text-grove-600',
  current: 'bg-warmth-100 text-warmth-600',
  upcoming: 'bg-gray-100 text-gray-400',
}

export default function AnnualMeetingPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-grove-100 flex items-center justify-center">
          <Calendar size={20} className="text-grove-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Annual Meeting</h1>
          <p className="text-sm text-gray-400 mt-0.5">FY 2024 Annual General Meeting — February 15, 2025</p>
        </div>
      </div>

      {/* Meeting overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="narrative-card text-center">
          <Calendar size={16} className="text-grove-500 mx-auto mb-1" />
          <p className="text-xs font-medium text-gray-900">Feb 15, 2025</p>
          <p className="text-[10px] text-gray-400">10:00 AM</p>
        </div>
        <div className="narrative-card text-center">
          <Users size={16} className="text-grove-500 mx-auto mb-1" />
          <p className="text-xs font-medium text-gray-900">5/5 Confirmed</p>
          <p className="text-[10px] text-gray-400">Quorum: met</p>
        </div>
        <div className="narrative-card text-center">
          <Vote size={16} className="text-commons-500 mx-auto mb-1" />
          <p className="text-xs font-medium text-gray-900">3 Votes</p>
          <p className="text-[10px] text-gray-400">Patronage, board, bylaws</p>
        </div>
        <div className="narrative-card text-center">
          <FileText size={16} className="text-terra-500 mx-auto mb-1" />
          <p className="text-xs font-medium text-gray-900">5 of 6 Ready</p>
          <p className="text-[10px] text-gray-400">Documents prepared</p>
        </div>
      </div>

      {/* Agenda */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Agenda</h2>
      <div className="space-y-2 mb-8">
        {ANNUAL_AGENDA.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className={`narrative-card flex items-start gap-4 ${item.status === 'current' ? 'ring-1 ring-warmth-200' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${statusColors[item.status as keyof typeof statusColors]}`}>
                {item.status === 'done' ? <Check size={14} /> : <Icon size={14} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-16">{item.time}</span>
                  <p className="text-sm font-medium text-gray-900">{item.item}</p>
                  {item.status === 'current' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-warmth-100 text-warmth-600 font-medium animate-pulse">Now</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-16">{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Documents */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Meeting Documents</h2>
      <div className="grid grid-cols-2 gap-3">
        {ANNUAL_DOCUMENTS.map(doc => (
          <div key={doc.title} className={`narrative-card flex items-center gap-3 ${!doc.ready ? 'opacity-50' : ''}`}>
            <FileText size={14} className={doc.ready ? 'text-grove-500' : 'text-gray-300'} />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-900">{doc.title}</p>
            </div>
            {doc.ready ? (
              <span className="text-[9px] text-grove-600">Ready</span>
            ) : (
              <span className="text-[9px] text-gray-400 flex items-center gap-1"><Clock size={8} /> Generating</span>
            )}
          </div>
        ))}
      </div>

      {/* NRI narrative */}
      <div className="mt-6 narrative-card bg-grove-50 border-grove-100">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-grove-600" />
          <p className="text-xs font-medium text-grove-800">NRI Year-in-Review Preview</p>
        </div>
        <p className="text-sm text-grove-700 leading-relaxed">
          Evergreen Workers Co-op completed its 6th year. Revenue grew 8% to $420,000.
          All 5 members maintained active governance participation. One candidate (Roberto) is on track for
          membership. The grievance policy was updated by unanimous vote. Pay ratio held steady at 1.3:1.
          Total member equity reached $34,730 — shared wealth built through cooperative labor.
        </p>
      </div>
    </div>
  )
}
