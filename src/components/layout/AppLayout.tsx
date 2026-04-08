import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import CompassDrawer from '@/components/compass/CompassDrawer'
import {
  LayoutDashboard,
  Users,
  Vote,
  PieChart,
  ArrowLeft,
  Bell,
  Upload,
  Settings,
  Shield,
  UserCog,
  User,
  UserPlus,
  Briefcase,
  ChevronDown,
  Eye,
  CreditCard,
  Link2,
  UsersRound,
  GraduationCap,
  BookOpen,
  FolderOpen,
  Globe,
  Megaphone,
  Calendar,
  FileText,
  Scale,
} from 'lucide-react'
import type { CoopRole } from '@/types'
import { ROLE_PERMISSIONS } from '@/types'

const allNavItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard', exact: true, minRole: 'candidate' as CoopRole },
  { to: '/app/members', icon: Users, label: 'Members', minRole: 'member' as CoopRole },
  { to: '/app/governance', icon: Vote, label: 'Governance', minRole: 'member' as CoopRole },
  { to: '/app/patronage', icon: PieChart, label: 'Patronage', minRole: 'member' as CoopRole },
  { to: '/app/committees', icon: UsersRound, label: 'Committees', minRole: 'member' as CoopRole },
  { to: '/app/meetings', icon: Calendar, label: 'Meetings', minRole: 'member' as CoopRole },
  { to: '/app/bylaws', icon: Scale, label: 'Bylaws', minRole: 'member' as CoopRole },
  { to: '/app/announcements', icon: Megaphone, label: 'Announcements', minRole: 'member' as CoopRole },
  { to: '/app/reports', icon: FileText, label: 'Reports', minRole: 'coordinator' as CoopRole },
  { to: '/app/payments', icon: CreditCard, label: 'Payments', minRole: 'coordinator' as CoopRole },
  { to: '/app/documents', icon: FolderOpen, label: 'Documents', minRole: 'member' as CoopRole },
  { to: '/app/communio', icon: Globe, label: 'Communio', minRole: 'member' as CoopRole },
  { to: '/app/integrations', icon: Link2, label: 'Integrations', minRole: 'coordinator' as CoopRole },
  { to: '/app/learn', icon: GraduationCap, label: 'Learn', minRole: 'candidate' as CoopRole },
  { to: '/app/glossary', icon: BookOpen, label: 'Glossary', minRole: 'candidate' as CoopRole },
  { to: '/app/import', icon: Upload, label: 'Import', minRole: 'coordinator' as CoopRole },
  { to: '/app/onboarding', icon: Settings, label: 'Setup', minRole: 'steward' as CoopRole },
]

const ROLE_CONFIG: { role: CoopRole; icon: typeof Shield; label: string; description: string; color: string }[] = [
  { role: 'candidate', icon: UserPlus, label: 'Candidate', description: 'Pre-membership worker in training', color: 'bg-warmth-100 text-warmth-700' },
  { role: 'member', icon: User, label: 'Member', description: 'Full worker-owner with voting rights', color: 'bg-grove-100 text-grove-700' },
  { role: 'coordinator', icon: UserCog, label: 'Coordinator', description: 'Committee chair, manages teams', color: 'bg-commons-100 text-commons-700' },
  { role: 'steward', icon: Shield, label: 'Steward', description: 'Board president, full admin access', color: 'bg-terra-100 text-terra-700' },
  { role: 'advisor', icon: Briefcase, label: 'Advisor', description: 'External cooperative developer', color: 'bg-gray-100 text-gray-600' },
]

const ROLE_HIERARCHY: CoopRole[] = ['candidate', 'member', 'coordinator', 'steward']

function hasMinRole(currentRole: CoopRole, minRole: CoopRole): boolean {
  if (currentRole === 'advisor') return minRole !== 'steward' && minRole !== 'coordinator'
  return ROLE_HIERARCHY.indexOf(currentRole) >= ROLE_HIERARCHY.indexOf(minRole)
}

const ROLE_NRI_SIGNALS: Record<CoopRole, { message: string; detail: string }> = {
  candidate: {
    message: 'Your candidacy is progressing well',
    detail: 'You\'ve completed 4 of 5 training milestones. Your mentor James has submitted a positive review.',
  },
  member: {
    message: 'Participation has been strong this quarter',
    detail: 'The hiring committee could use another voice. Consider volunteering — Roberto\'s membership review is coming up.',
  },
  coordinator: {
    message: 'The hiring committee hasn\'t met in 3 weeks',
    detail: 'Roberto\'s membership review is due next quarter. Schedule a committee meeting to prepare the recommendation.',
  },
  steward: {
    message: 'Q4 patronage vote needs one more voice',
    detail: 'David hasn\'t voted yet. $18,400 surplus awaiting distribution. Ana Lucía\'s buy-in completes in April.',
  },
  advisor: {
    message: 'Evergreen is in a strong growth season',
    detail: 'Participation steady, governance healthy, one candidate advancing. Pay ratio holds at 1.3:1.',
  },
}

const ROLE_PERSONAS: Record<CoopRole, { name: string; initials: string }> = {
  candidate: { name: 'Roberto Sandoval', initials: 'RS' },
  member: { name: 'Fatima Hassan', initials: 'FH' },
  coordinator: { name: 'James Okonkwo', initials: 'JO' },
  steward: { name: 'María Reyes', initials: 'MR' },
  advisor: { name: 'Dana Whitfield', initials: 'DW' },
}

export default function AppLayout() {
  const location = useLocation()
  const [currentRole, setCurrentRole] = useState<CoopRole>('steward')
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false)
  const [compassOpen, setCompassOpen] = useState(false)

  const visibleNavItems = allNavItems.filter(item => hasMinRole(currentRole, item.minRole))
  const roleConfig = ROLE_CONFIG.find(r => r.role === currentRole)!
  const nriSignal = ROLE_NRI_SIGNALS[currentRole]
  const persona = ROLE_PERSONAS[currentRole]
  const permissions = ROLE_PERMISSIONS[currentRole]

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
          {visibleNavItems.map(item => {
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

        {/* NRI Signal — role-aware */}
        <div className="p-4 m-3 rounded-xl bg-grove-50 border border-grove-100">
          <p className="text-xs font-medium text-grove-700">NRI Signal</p>
          <p className="text-xs text-grove-600 mt-1">{nriSignal.detail}</p>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-terra-100 z-50">
        <div className="flex justify-around py-2">
          {visibleNavItems.slice(0, 5).map(item => {
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
            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${roleConfig.color} hover:opacity-90`}
              >
                <Eye size={12} />
                <span>Viewing as {roleConfig.label}</span>
                <ChevronDown size={12} className={`transition-transform ${roleSwitcherOpen ? 'rotate-180' : ''}`} />
              </button>

              {roleSwitcherOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setRoleSwitcherOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-terra-100 z-50 py-2">
                    <p className="px-4 py-2 text-[10px] uppercase tracking-wider font-medium text-gray-400">
                      Switch role to see how each member experiences Communis
                    </p>
                    {ROLE_CONFIG.map(config => (
                      <button
                        key={config.role}
                        onClick={() => { setCurrentRole(config.role); setRoleSwitcherOpen(false) }}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-warmth-50 transition-colors ${
                          currentRole === config.role ? 'bg-warmth-50' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color}`}>
                          <config.icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{config.label}</p>
                          <p className="text-xs text-gray-400">{config.description}</p>
                          <p className="text-[10px] text-gray-300 mt-0.5">
                            As {ROLE_PERSONAS[config.role].name}
                          </p>
                        </div>
                        {currentRole === config.role && (
                          <span className="text-grove-500 text-xs mt-1">Active</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button className="relative p-2 text-gray-400 hover:text-grove-600">
              <Bell size={18} />
              <span className="absolute top-1 right-1 signal-dot bg-warmth-500" />
            </button>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${roleConfig.color}`}>
              {persona.initials}
            </div>
          </div>
        </header>

        {/* Role banner */}
        <div className={`px-6 py-2 border-b border-terra-100 flex items-center justify-between ${roleConfig.color} bg-opacity-30`}>
          <div className="flex items-center gap-2 text-xs">
            <roleConfig.icon size={12} />
            <span className="font-medium">
              {persona.name} · {roleConfig.label}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">
              {permissions.canVote ? 'Can vote' : 'Cannot vote'}
              {permissions.canViewAllEquity ? ' · Sees all equity' : ''}
              {permissions.canRunPatronage ? ' · Can run patronage' : ''}
              {permissions.canManageBylaws ? ' · Can manage bylaws' : ''}
            </span>
          </div>
        </div>

        <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
          <Outlet context={{ currentRole, persona, permissions }} />
        </main>
      </div>

      {/* NRI Compass button */}
      <button
        onClick={() => setCompassOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-2xl bg-grove-600 text-white shadow-lg hover:bg-grove-700 flex items-center justify-center transition-all hover:scale-105 z-30"
        aria-label="Open NRI Compass"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {/* NRI Compass drawer */}
      <CompassDrawer
        open={compassOpen}
        onClose={() => setCompassOpen(false)}
        coopName="Evergreen Workers Co-op"
        memberName={persona.name}
        role={currentRole}
      />
    </div>
  )
}
