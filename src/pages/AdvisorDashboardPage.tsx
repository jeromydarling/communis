import { Briefcase, Users, Landmark, TrendingUp, Activity, ArrowRight } from 'lucide-react'

const DEMO_COOPS = [
  { name: 'Evergreen Workers Co-op', city: 'Portland, OR', members: 5, equity: 34730, health: 'strong', industry: 'Cleaning', tier: 'grove' },
  { name: 'Sunrise Cleaning', city: 'Brooklyn, NY', members: 12, equity: 89400, health: 'strong', industry: 'Cleaning', tier: 'grove' },
  { name: 'Bay Area Tech Collective', city: 'Oakland, CA', members: 8, equity: 124000, health: 'notable', industry: 'Technology', tier: 'grove' },
  { name: 'Fresh Start Catering', city: 'Chicago, IL', members: 3, equity: 4500, health: 'gentle', industry: 'Food', tier: 'seedling' },
]

const healthColors = { strong: 'bg-grove-500', notable: 'bg-warmth-500', gentle: 'bg-commons-500' }

const ADVISOR_SIGNALS = [
  'Bay Area Tech Collective has growing equity imbalance (6.2:1 ratio). Consider discussing revolvement policy.',
  'Fresh Start Catering is in its first year — governance participation needs attention. Only 2 of 3 members attended the last meeting.',
  'Evergreen\'s grievance policy was recently updated. Review the new mediation step for best practices.',
]

export default function AdvisorDashboardPage() {
  const totalMembers = DEMO_COOPS.reduce((sum, c) => sum + c.members, 0)
  const totalEquity = DEMO_COOPS.reduce((sum, c) => sum + c.equity, 0)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-commons-100 flex items-center justify-center">
          <Briefcase size={20} className="text-commons-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Advisor Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Multi-cooperative view for DAWI developers and cooperative consultants.</p>
        </div>
      </div>

      {/* Aggregate stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="narrative-card">
          <Users size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">{DEMO_COOPS.length}</p>
          <p className="text-xs text-gray-400">cooperatives</p>
        </div>
        <div className="narrative-card">
          <Users size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">{totalMembers}</p>
          <p className="text-xs text-gray-400">total members</p>
        </div>
        <div className="narrative-card">
          <Landmark size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">${(totalEquity / 100).toLocaleString()}</p>
          <p className="text-xs text-gray-400">total equity</p>
        </div>
        <div className="narrative-card">
          <Activity size={18} className="text-grove-500 mb-2" />
          <p className="font-display text-2xl font-bold text-gray-900">3/4</p>
          <p className="text-xs text-gray-400">healthy co-ops</p>
        </div>
      </div>

      {/* Cooperative list */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Your Cooperatives</h2>
      <div className="space-y-3 mb-8">
        {DEMO_COOPS.map(coop => (
          <div key={coop.name} className="narrative-card flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`w-2.5 h-2.5 rounded-full ${healthColors[coop.health as keyof typeof healthColors]}`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{coop.name}</p>
              <p className="text-xs text-gray-400">{coop.city} · {coop.industry} · {coop.members} members</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-display font-semibold text-gray-900">${(coop.equity / 100).toLocaleString()}</p>
              <p className="text-[10px] text-gray-400">equity</p>
            </div>
            <ArrowRight size={14} className="text-gray-300" />
          </div>
        ))}
      </div>

      {/* NRI cross-coop signals */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Advisor Signals</h2>
      <div className="space-y-2">
        {ADVISOR_SIGNALS.map((signal, i) => (
          <div key={i} className="narrative-card bg-warmth-50 border-warmth-100 flex items-start gap-3">
            <TrendingUp size={14} className="text-warmth-600 mt-0.5" />
            <p className="text-xs text-warmth-700 leading-relaxed">{signal}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 narrative-card bg-grove-50 border-grove-100 text-center">
        <p className="text-xs text-grove-700">
          Read-only access. Advisors can view all cooperative data but cannot vote, propose motions, or modify bylaws.
          Your expertise strengthens their democracy.
        </p>
      </div>
    </div>
  )
}
