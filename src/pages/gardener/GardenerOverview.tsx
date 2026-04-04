import { Users, TrendingUp, DollarSign, AlertCircle, Activity, Sprout } from 'lucide-react'

const DEMO_TENANTS = [
  { name: 'Evergreen Workers Co-op', city: 'Portland, OR', members: 5, mrr: 49, status: 'active', health: 'strong' },
  { name: 'Sunrise Cleaning', city: 'Brooklyn, NY', members: 12, mrr: 49, status: 'active', health: 'strong' },
  { name: 'Bay Area Tech Collective', city: 'Oakland, CA', members: 8, mrr: 49, status: 'active', health: 'notable' },
  { name: 'Heartland Builders Co-op', city: 'Madison, WI', members: 15, mrr: 49, status: 'active', health: 'strong' },
  { name: 'Fresh Start Catering', city: 'Chicago, IL', members: 3, mrr: 0, status: 'onboarding', health: 'gentle' },
  { name: 'Common Ground Childcare', city: 'Asheville, NC', members: 7, mrr: 49, status: 'active', health: 'strong' },
]

const healthColors = {
  strong: 'bg-grove-500',
  notable: 'bg-warmth-500',
  gentle: 'bg-commons-500',
}

export default function GardenerOverview() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Garden Overview</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, value: '12', label: 'Active co-ops', sub: '+3 onboarding', color: 'text-grove-400' },
          { icon: TrendingUp, value: '67', label: 'Total members', sub: 'across all co-ops', color: 'text-grove-400' },
          { icon: DollarSign, value: '$4,200', label: 'MRR', sub: '+$800 pipeline', color: 'text-grove-400' },
          { icon: Activity, value: '99.8%', label: 'Uptime', sub: 'last 30 days', color: 'text-grove-400' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <kpi.icon size={18} className={kpi.color} />
            <p className="font-display text-2xl font-bold text-white mt-2">{kpi.value}</p>
            <p className="text-xs text-gray-400">{kpi.label}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Tenant list */}
      <div>
        <h2 className="text-sm font-medium text-gray-300 mb-3">Cooperatives</h2>
        <div className="space-y-2">
          {DEMO_TENANTS.map(tenant => (
            <div key={tenant.name} className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-center gap-4 hover:border-gray-700 transition-colors cursor-pointer">
              <div className={`w-2 h-2 rounded-full ${healthColors[tenant.health as keyof typeof healthColors]}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{tenant.name}</p>
                <p className="text-xs text-gray-500">{tenant.city} · {tenant.members} members</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                tenant.status === 'active' ? 'bg-grove-900 text-grove-400' : 'bg-warmth-900 text-warmth-400'
              }`}>
                {tenant.status}
              </span>
              <p className="text-xs text-gray-400 w-16 text-right">
                {tenant.mrr > 0 ? `$${tenant.mrr}/mo` : 'Free'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* NRI system signals */}
      <div>
        <h2 className="text-sm font-medium text-gray-300 mb-3">System Signals</h2>
        <div className="space-y-2">
          {[
            { severity: 'gentle', message: 'Bay Area Tech Collective hasn\'t logged in for 5 days', detail: 'Might need a check-in email.' },
            { severity: 'gentle', message: 'Fresh Start Catering onboarding stalled at bylaws step', detail: 'They started 2 weeks ago but haven\'t configured patronage.' },
            { severity: 'notable', message: 'Stripe payout failed for Common Ground Childcare', detail: 'Bank account details need updating. Member notified.' },
          ].map((signal, i) => (
            <div key={i} className={`bg-gray-900 rounded-xl border p-4 flex items-start gap-3 ${
              signal.severity === 'notable' ? 'border-warmth-800' : 'border-gray-800'
            }`}>
              <AlertCircle size={14} className={signal.severity === 'notable' ? 'text-warmth-500 mt-0.5' : 'text-gray-500 mt-0.5'} />
              <div>
                <p className="text-xs font-medium text-gray-300">{signal.message}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{signal.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
