import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Vote,
  PieChart,
  ArrowLeft,
  Bell,
} from 'lucide-react'

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/app/members', icon: Users, label: 'Members' },
  { to: '/app/governance', icon: Vote, label: 'Governance' },
  { to: '/app/patronage', icon: PieChart, label: 'Patronage' },
]

export default function AppLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-warmth-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white/70 backdrop-blur border-r border-terra-100">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-gray-400 text-xs hover:text-grove-600 mb-4">
            <ArrowLeft size={14} />
            Back to site
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-grove-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-5 h-5">
                <circle cx="11" cy="13" r="3" fill="white" opacity="0.9"/>
                <circle cx="21" cy="13" r="3" fill="white" opacity="0.9"/>
                <circle cx="16" cy="21" r="3" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-grove-800">communis</p>
              <p className="text-[10px] text-gray-400">Evergreen Workers Co-op</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(item => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-grove-50 text-grove-700 font-medium'
                    : 'text-gray-500 hover:bg-warmth-100 hover:text-gray-700'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 m-3 rounded-xl bg-grove-50 border border-grove-100">
          <p className="text-xs font-medium text-grove-700">NRI Signal</p>
          <p className="text-xs text-grove-600 mt-1">
            Participation has been strong this quarter. The hiring committee could use another voice.
          </p>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-terra-100 z-50">
        <div className="flex justify-around py-2">
          {navItems.map(item => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] ${
                  active ? 'text-grove-700' : 'text-gray-400'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 border-b border-terra-100 bg-white/50 backdrop-blur">
          <div>
            <p className="text-xs text-gray-400">Demo Mode</p>
            <p className="text-sm font-display font-semibold text-gray-700">Evergreen Workers Co-op</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-grove-600">
              <Bell size={18} />
              <span className="absolute top-1 right-1 signal-dot bg-warmth-500" />
            </button>
            <div className="w-8 h-8 rounded-full bg-grove-200 flex items-center justify-center text-xs font-medium text-grove-700">
              MR
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
