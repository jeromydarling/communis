import { FileText, Download, Calendar, PieChart, Users, Landmark, Clock } from 'lucide-react'

const REPORT_TYPES = [
  {
    icon: Landmark,
    title: 'Annual Equity Report',
    description: 'Complete member equity statements — buy-in, patronage, revolvement. Board-ready PDF.',
    fields: ['Member name', 'Opening balance', 'Buy-in contributions', 'Patronage allocated', 'Revolvements paid', 'Closing balance'],
    lastGenerated: 'January 15, 2025',
  },
  {
    icon: PieChart,
    title: 'Patronage Distribution Summary',
    description: 'Period surplus, allocation by member, qualified vs. non-qualified split, tax basis.',
    fields: ['Period', 'Total surplus', 'Per-member hours', 'Allocation amount', 'Qualified/non-qualified', '1099-PATR data'],
    lastGenerated: 'January 20, 2025',
  },
  {
    icon: Users,
    title: 'Membership Roster',
    description: 'Current members, candidates, departed members. Status, join date, committees, equity.',
    fields: ['Name', 'Status', 'Role', 'Join date', 'Committees', 'Current equity'],
    lastGenerated: 'February 1, 2025',
  },
  {
    icon: FileText,
    title: 'Governance History',
    description: 'All proposals, votes, and outcomes. Exportable for annual meeting review.',
    fields: ['Proposal title', 'Type', 'Voting method', 'Result', 'Vote counts', 'Date'],
    lastGenerated: 'January 28, 2025',
  },
  {
    icon: Calendar,
    title: 'Committee Activity Report',
    description: 'Meeting attendance, committee composition, rotation fairness, term dates.',
    fields: ['Committee', 'Members', 'Meetings held', 'Attendance rate', 'Next election'],
    lastGenerated: null,
  },
  {
    icon: Clock,
    title: 'Labor Hours Summary',
    description: 'Hours per member by period. Patronage basis calculation backup.',
    fields: ['Member', 'Period', 'Regular hours', 'Total hours', 'Percentage of total'],
    lastGenerated: 'January 31, 2025',
  },
]

const QUICK_EXPORTS = [
  { label: '1099-PATR Forms (2024)', format: 'PDF', ready: true },
  { label: 'Member Equity Statements', format: 'PDF', ready: true },
  { label: 'Board Meeting Packet', format: 'PDF', ready: true },
  { label: 'Annual Meeting Report', format: 'PDF', ready: false },
  { label: 'All Member Data', format: 'CSV', ready: true },
  { label: 'ICA Transaction History', format: 'CSV', ready: true },
]

export default function ReportsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Reports & Exports</h1>
          <p className="text-sm text-gray-400 mt-1">
            Board-ready documents, tax forms, and data exports.
          </p>
        </div>
      </div>

      {/* Quick exports */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Quick Exports</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {QUICK_EXPORTS.map(exp => (
            <button
              key={exp.label}
              className={`narrative-card flex items-center gap-3 text-left hover:shadow-md transition-shadow ${!exp.ready ? 'opacity-50' : ''}`}
            >
              <Download size={16} className={exp.ready ? 'text-grove-500' : 'text-gray-300'} />
              <div>
                <p className="text-xs font-medium text-gray-900">{exp.label}</p>
                <p className="text-[10px] text-gray-400">{exp.format}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Report types */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Generate Reports</h2>
      <div className="space-y-4">
        {REPORT_TYPES.map(report => (
          <div key={report.title} className="narrative-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-grove-50 flex items-center justify-center flex-shrink-0">
                <report.icon size={18} className="text-grove-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {report.fields.map(f => (
                    <span key={f} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{f}</span>
                  ))}
                </div>
                {report.lastGenerated && (
                  <p className="text-[10px] text-gray-400 mt-2">Last generated: {report.lastGenerated}</p>
                )}
              </div>
              <button className="calm-button-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                <Download size={12} /> Generate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Narrative */}
      <div className="mt-8 narrative-card bg-warmth-50 border-warmth-100">
        <p className="text-sm text-warmth-700 leading-relaxed">
          All reports are generated from your cooperative's live data. Equity reports pull from ICA transactions,
          patronage summaries from distribution runs, governance history from proposal records.
          1099-PATR forms are generated automatically after patronage distribution.
        </p>
      </div>
    </div>
  )
}
