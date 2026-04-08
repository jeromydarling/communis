import {
  Landmark, Users, Vote, PieChart, BarChart3, BookOpen,
  Clock, UserCog, MessageSquare, Heart, Sparkles,
  CreditCard, FolderOpen, Globe, GraduationCap,
  CalendarDays, TrendingUp, FileText, Search, Library,
} from 'lucide-react'

const coreModules = [
  {
    icon: Landmark,
    title: 'Internal Capital Accounts',
    tag: 'The Wedge',
    description: 'Every worker-owner has an equity account tracking buy-in contributions, annual patronage allocations, and revolvement schedules. Today this is Excel. Tomorrow it\'s Communis.',
    details: [
      'Individual member equity tracking',
      'Buy-in contribution schedules (lump sum or payroll deduction)',
      'Annual patronage allocation posting',
      'Revolvement payout scheduling on member departure',
      'Historical account statements for every member',
    ],
  },
  {
    icon: PieChart,
    title: 'Patronage Distribution Engine',
    tag: 'The Feature No One Else Builds',
    description: 'Calculate surplus allocation based on labor hours or other measures. Handle Subchapter T compliance. Generate tax forms. This is why cooperatives still use spreadsheets.',
    details: [
      'Configurable allocation basis (hours, revenue, equal)',
      'Qualified vs. non-qualified allocation splitting',
      'Subchapter T tax compliance automation',
      '1099-PATR generation',
      'Multi-year revolvement tracking',
    ],
  },
  {
    icon: Users,
    title: 'Member Lifecycle',
    tag: 'Bylaw-Configurable',
    description: 'Candidacy, training, full membership, leave, departure. Each co-op governs this differently — the system adapts to your bylaws, not the other way around.',
    details: [
      'Candidacy period with milestone tracking',
      'Buy-in schedule management',
      'Training and onboarding checklists',
      'Leave of absence workflows',
      'Departure and revolvement processing',
    ],
  },
  {
    icon: BarChart3,
    title: 'Financial Transparency Dashboard',
    tag: 'Narrative-First',
    description: 'Member-facing. Calm. "Your equity has grown 12% this year through your labor." Cooperative-specific statements that QuickBooks cannot generate.',
    details: [
      'Personal equity dashboard per member',
      'Cooperative financial health overview (from QuickBooks/Xero)',
      'Narrative summaries (not just charts)',
      'Collective vs. individual account visibility',
      'Year-over-year member wealth tracking',
    ],
  },
]

const governance = [
  {
    icon: Vote,
    title: 'Democratic Decision-Making',
    description: 'Proposals, discussion, voting. Consensus, consent, majority, supermajority — co-ops vary. A vote to hire triggers onboarding. A vote to distribute surplus triggers the patronage engine.',
  },
  {
    icon: CalendarDays,
    title: 'Meeting Management',
    description: 'Agendas, minutes, action items, quorum tracking. Board, general membership, committee meetings — connected to decisions and accountability.',
  },
  {
    icon: BookOpen,
    title: 'Bylaws & Policy Registry',
    description: 'Living documents. When governance decisions change policy, the registry updates. Members always find the current rules. Full version history.',
  },
]

const operations = [
  {
    icon: Clock,
    title: 'Labor Tracking',
    description: 'Hours per member — not for surveillance, but because patronage is calculated from labor contribution. Integrates with the patronage engine. Pulls from existing payroll systems.',
  },
  {
    icon: UserCog,
    title: 'Committee & Role Management',
    description: 'Finance, hiring, operations, grievance. Who\'s on what, term limits, rotation fairness scoring. Democratic accountability, visible to all members.',
  },
  {
    icon: MessageSquare,
    title: 'Member Communication',
    description: 'Announcements, async discussions by committee. Not Slack-sprawl. Gentle NRI signals: "The hiring committee hasn\'t met in 3 weeks."',
  },
]

const payments = [
  {
    icon: CreditCard,
    title: 'Buy-In Collection',
    description: 'Members pay their buy-in through Communis — one-time or installment plans. Money goes directly to your co-op\'s Stripe account. ICA ledger updates automatically.',
  },
  {
    icon: CalendarDays,
    title: 'Recurring Dues',
    description: 'Automated monthly, quarterly, or annual member dues via Stripe Billing. Never chase a late payment again.',
  },
  {
    icon: TrendingUp,
    title: 'Patronage Payouts',
    description: 'After a governance vote passes, Communis calculates allocations and sends payouts directly to member bank accounts. The full loop: vote → calculate → pay → 1099-PATR.',
  },
]

const intelligence = [
  {
    icon: FolderOpen,
    title: 'Document Intelligence',
    description: 'Connect Google Drive or Dropbox. NRI reads your bylaws, handbooks, meeting minutes, and policies — then answers member questions from your actual documents, not generic info.',
  },
  {
    icon: Globe,
    title: 'Communio Knowledge Hub',
    description: 'How cooperatives actually run — anonymized insights shared across co-ops with permission. Real stories from real co-ops. Questions answered by practitioners, not academics.',
  },
  {
    icon: Search,
    title: 'NRI Compass',
    description: 'A knowledge-aware assistant scoped by role. Members ask "What\'s my equity?" Candidates ask "How does buy-in work?" Stewards ask "What\'s our cash reserve?" NRI answers from your co-op\'s real data.',
  },
]

const education = [
  {
    icon: GraduationCap,
    title: 'Rehearsal Votes',
    description: 'Practice democratic decision-making before it counts. Try all 4 voting methods. See why each result happened. Available to candidates — because learning should start before voting rights.',
  },
  {
    icon: BookOpen,
    title: 'Cooperative Glossary',
    description: '26 terms explained in plain language with relatable analogies. "Buy-in = like buying into a poker game, except you get it back when you leave." Inline tooltips throughout the app.',
  },
  {
    icon: Library,
    title: 'Knowledge Base & Library',
    description: '7 structured guides (Understanding Equity, How Governance Works, Patronage Explained) plus 12 curated books on cooperative economics, history, and practice. Google Books API integration.',
  },
  {
    icon: Heart,
    title: 'Welcome Experience & Milestones',
    description: 'First-login walkthrough: "You just became one of 15,000 worker-owners." 23 milestone celebrations: first vote, buy-in complete, equity passed $5,000. NRI celebrates, never nags.',
  },
]

const nri = [
  {
    icon: Sparkles,
    title: 'Recognize',
    description: 'Signals of participation, strain, and restoration. NRI notices what is changing — a committee going quiet, quorum at risk, equity imbalances growing.',
  },
  {
    icon: Heart,
    title: 'Synthesize',
    description: 'Scattered data becomes coherent narrative. Not a spreadsheet — a living summary of your cooperative\'s democratic life.',
  },
  {
    icon: Sparkles,
    title: 'Prioritize',
    description: 'The next small, faithful step. Not a task list explosion. A quiet pointer toward what deserves your attention today.',
  },
]

const integrations = [
  {
    icon: FileText,
    title: 'QuickBooks / Xero',
    description: 'Sync revenue, expenses, payroll hours, and bank balances. Write patronage journal entries back. Your accountant keeps QuickBooks. Your members get transparency through Communis.',
  },
  {
    icon: Clock,
    title: 'Time & Scheduling',
    description: 'Import hours from Gusto, ADP, Square, Homebase, When I Work, Deputy, or CSV. Hours feed the patronage engine. No double entry.',
  },
  {
    icon: CreditCard,
    title: 'Stripe Connect',
    description: 'Standard Connected Accounts. Your co-op owns the Stripe account. Members see your co-op\'s name on statements. Communis takes 0.5% and never holds your funds.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Everything cooperatives need.
          <br />
          <span className="text-grove-600">Nothing they don't.</span>
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Communis replaces the spreadsheet-and-Loomio-and-QuickBooks patchwork
          with an integrated system built for democratic ownership.
        </p>
      </div>

      {/* Core */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Core Modules</h2>
        <p className="text-sm text-gray-400 mb-8">The spreadsheet killers</p>
        <div className="grid lg:grid-cols-2 gap-6">
          {coreModules.map(mod => (
            <div key={mod.title} className="narrative-card">
              <div className="flex items-start justify-between mb-4">
                <mod.icon size={24} className="text-grove-600" />
                <span className="text-[10px] uppercase tracking-wider font-medium text-warmth-600 bg-warmth-50 px-2 py-1 rounded-full">
                  {mod.tag}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-gray-900">{mod.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{mod.description}</p>
              <ul className="mt-4 space-y-1.5">
                {mod.details.map(d => (
                  <li key={d} className="text-xs text-gray-400 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-grove-400 mt-1.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payments */}
      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Payments</h2>
        <p className="text-sm text-gray-400 mb-8">Powered by Stripe Connect — your money stays your money</p>
        <div className="grid md:grid-cols-3 gap-6">
          {payments.map(item => (
            <div key={item.title} className="narrative-card">
              <item.icon size={24} className="text-grove-600 mb-4" />
              <h3 className="font-display text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Governance */}
      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Governance</h2>
        <p className="text-sm text-gray-400 mb-8">Beyond Loomio — decisions that connect to outcomes</p>
        <div className="grid md:grid-cols-3 gap-6">
          {governance.map(item => (
            <div key={item.title} className="narrative-card">
              <item.icon size={24} className="text-commons-600 mb-4" />
              <h3 className="font-display text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence */}
      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Intelligence</h2>
        <p className="text-sm text-gray-400 mb-8">NRI reads your documents. Communio learns from the movement.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {intelligence.map(item => (
            <div key={item.title} className="narrative-card">
              <item.icon size={24} className="text-warmth-600 mb-4" />
              <h3 className="font-display text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-sm text-gray-400 mb-8">From "I have no idea what a cooperative is" to "I understand my ownership"</p>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map(item => (
            <div key={item.title} className="narrative-card">
              <item.icon size={24} className="text-grove-600 mb-4" />
              <h3 className="font-display text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Operations */}
      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Operations</h2>
        <p className="text-sm text-gray-400 mb-8">The cooperative-specific glue</p>
        <div className="grid md:grid-cols-3 gap-6">
          {operations.map(item => (
            <div key={item.title} className="narrative-card">
              <item.icon size={24} className="text-terra-600 mb-4" />
              <h3 className="font-display text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Integrations</h2>
        <p className="text-sm text-gray-400 mb-8">Keep your tools. Communis bridges the gap.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {integrations.map(item => (
            <div key={item.title} className="narrative-card">
              <item.icon size={24} className="text-commons-600 mb-4" />
              <h3 className="font-display text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NRI */}
      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">NRI Layer</h2>
        <p className="text-sm text-gray-400 mb-8">Recognize · Synthesize · Prioritize</p>
        <div className="grid md:grid-cols-3 gap-6">
          {nri.map(item => (
            <div key={item.title} className="narrative-card bg-grove-800 border-grove-700">
              <item.icon size={24} className="text-grove-300 mb-4" />
              <h3 className="font-display text-lg font-semibold text-grove-100">{item.title}</h3>
              <p className="mt-2 text-sm text-grove-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
