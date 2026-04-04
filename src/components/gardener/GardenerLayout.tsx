import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, FileText, Search, Settings,
  Activity, Shield, Inbox, Sprout, ArrowLeft, BarChart3,
} from 'lucide-react'

const gardenerNav = [
  { to: '/gardener', icon: LayoutDashboard, label: 'Overview', exact: true },
  { to: '/gardener/tenants', icon: Users, label: 'Cooperatives' },
  { to: '/gardener/content', icon: FileText, label: 'Content Studio' },
  { to: '/gardener/seo', icon: Search, label: 'SEO Engine' },
  { to: '/gardener/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/gardener/system', icon: Activity, label: 'System Health' },
  { to: '/gardener/inbox', icon: Inbox, label: 'Support Inbox' },
  { to: '/gardener/settings', icon: Settings, label: 'Settings' },
]

export default function GardenerLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Dark sidebar — distinct from tenant app */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-900 border-r border-gray-800">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-gray-500 text-xs hover:text-grove-400 mb-4">
            <ArrowLeft size={14} />
            Back to site
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-grove-600 rounded-lg flex items-center justify-center">
              <Sprout size={16} className="text-white" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-white">Gardener</p>
              <p className="text-[10px] text-gray-500">communis.coop operator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {gardenerNav.map(item => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-gray-800 text-grove-400 font-medium'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 m-3 rounded-xl bg-gray-800 border border-gray-700">
          <p className="text-xs font-medium text-grove-400">System Pulse</p>
          <p className="text-xs text-gray-400 mt-1">
            12 active co-ops · 3 onboarding · $4.2k MRR · All systems nominal
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur">
          <div>
            <p className="text-xs text-gray-500">Gardener Console</p>
            <p className="text-sm font-display font-semibold text-white">communis.coop</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-grove-500" />
            <span className="text-xs text-grove-400">Operator</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
