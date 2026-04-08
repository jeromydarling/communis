import { Link } from 'react-router-dom'
import {
  Landmark,
  Users,
  Vote,
  PieChart,
  BarChart3,
  BookOpen,
  Heart,
  ArrowRight,
  Sprout,
  CreditCard,
  FolderOpen,
  Globe,
  GraduationCap,
} from 'lucide-react'
import {
  DashboardScreenshot,
  PatronageScreenshot,
  GovernanceScreenshot,
  MemberStoryScreenshot,
  CommunioScreenshot,
  DocumentsScreenshot,
  EducationScreenshot,
} from '@/components/marketing/AppScreenshots'

const features = [
  {
    icon: Landmark,
    title: 'Internal Capital Accounts',
    description: 'Track member equity, buy-ins, patronage allocations, and revolvement schedules. Replace the spreadsheets.',
  },
  {
    icon: PieChart,
    title: 'Patronage Engine',
    description: 'Calculate surplus distribution by labor hours. Split qualified/non-qualified allocations. Generate 1099-PATRs.',
  },
  {
    icon: Vote,
    title: 'Democratic Governance',
    description: 'Proposals, voting, rehearsal votes. A vote to hire becomes onboarding. A vote to distribute surplus triggers payouts.',
  },
  {
    icon: CreditCard,
    title: 'Stripe Payments',
    description: 'Buy-in collection, recurring dues, patronage payouts — all through Stripe Connect. Your money stays your money.',
  },
  {
    icon: FolderOpen,
    title: 'Document Intelligence',
    description: 'Connect Google Drive or Dropbox. NRI reads your bylaws, policies, and meeting minutes — then answers questions from your actual docs.',
  },
  {
    icon: Globe,
    title: 'Communio Knowledge Hub',
    description: 'How co-ops actually run — anonymized insights shared across cooperatives. Real stories from real co-ops, not textbook theory.',
  },
  {
    icon: GraduationCap,
    title: 'Cooperative Education',
    description: 'Rehearsal votes, plain-language glossary, knowledge base, curated library. From "What\'s a cooperative?" to full ownership literacy.',
  },
  {
    icon: BarChart3,
    title: 'Financial Transparency',
    description: 'QuickBooks integration, member-facing dashboards, narrative summaries. "Your equity grew 12% this year through your labor."',
  },
  {
    icon: BookOpen,
    title: 'Cooperative Health (NRI)',
    description: 'Gentle signals when participation drops, quorum is at risk, or committees need another voice. Not nagging — noticing.',
  },
]

const stats = [
  { value: '1,300+', label: 'US worker cooperatives' },
  { value: '$0', label: 'dedicated software options' },
  { value: '62.5%', label: 'female worker-owners' },
  { value: '2:1', label: 'max pay ratio (vs 303:1)' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-grove-600 mb-6">
              <Sprout size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">For worker cooperatives</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              The operating system
              <br />
              <span className="text-grove-600">your co-op deserves</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">
              Communis replaces spreadsheets with relationship memory, cooperative intelligence,
              and narrative-first tools — so you can focus on the work of shared ownership.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/demo" className="calm-button-primary inline-flex items-center gap-2">
                Try the Demo <ArrowRight size={16} />
              </Link>
              <Link to="/manifesto" className="calm-button-secondary">
                Read the Manifesto
              </Link>
            </div>
          </div>

          {/* Hero visual — animated cooperative network */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-grove-100 via-warmth-50 to-commons-100 rounded-3xl opacity-60 blur-2xl" />

              {/* Animated nodes — cooperative members */}
              <svg viewBox="0 0 400 400" className="relative w-full h-full" aria-hidden="true">
                {/* Connection lines */}
                <line x1="200" y1="100" x2="100" y2="220" stroke="#bbdcc0" strokeWidth="2" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
                </line>
                <line x1="200" y1="100" x2="300" y2="220" stroke="#bbdcc0" strokeWidth="2" opacity="0.5">
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="5s" repeatCount="indefinite" />
                </line>
                <line x1="100" y1="220" x2="300" y2="220" stroke="#bbdcc0" strokeWidth="2" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.5s" repeatCount="indefinite" />
                </line>
                <line x1="100" y1="220" x2="150" y2="330" stroke="#e2ceae" strokeWidth="1.5" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" />
                </line>
                <line x1="300" y1="220" x2="250" y2="330" stroke="#e2ceae" strokeWidth="1.5" opacity="0.4">
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.5s" repeatCount="indefinite" />
                </line>
                <line x1="200" y1="100" x2="150" y2="330" stroke="#d3daea" strokeWidth="1" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.4;0.2" dur="7s" repeatCount="indefinite" />
                </line>
                <line x1="200" y1="100" x2="250" y2="330" stroke="#d3daea" strokeWidth="1" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5.5s" repeatCount="indefinite" />
                </line>

                {/* Steward node */}
                <g>
                  <circle cx="200" cy="100" r="28" fill="#2d6f3d" opacity="0.9">
                    <animate attributeName="r" values="28;30;28" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="96" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">MR</text>
                  <text x="200" y="108" textAnchor="middle" fill="#bbdcc0" fontSize="7">Steward</text>
                </g>

                {/* Member nodes */}
                <g>
                  <circle cx="100" cy="220" r="24" fill="#3d8b50" opacity="0.85">
                    <animate attributeName="r" values="24;26;24" dur="5s" repeatCount="indefinite" />
                  </circle>
                  <text x="100" y="216" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">JO</text>
                  <text x="100" y="228" textAnchor="middle" fill="#dcedde" fontSize="7">Coordinator</text>
                </g>
                <g>
                  <circle cx="300" cy="220" r="24" fill="#3d8b50" opacity="0.85">
                    <animate attributeName="r" values="24;26;24" dur="4.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="300" y="216" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">AV</text>
                  <text x="300" y="228" textAnchor="middle" fill="#dcedde" fontSize="7">Member</text>
                </g>

                {/* Smaller nodes */}
                <g>
                  <circle cx="150" cy="330" r="18" fill="#5ea86e" opacity="0.8">
                    <animate attributeName="r" values="18;20;18" dur="6s" repeatCount="indefinite" />
                  </circle>
                  <text x="150" y="333" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">FH</text>
                </g>
                <g>
                  <circle cx="250" cy="330" r="18" fill="#5ea86e" opacity="0.8">
                    <animate attributeName="r" values="18;20;18" dur="5.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="250" y="333" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">DC</text>
                </g>

                {/* Candidate node — pulsing warmth */}
                <g>
                  <circle cx="340" cy="320" r="14" fill="#dc7c30" opacity="0.7">
                    <animate attributeName="r" values="14;16;14" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text x="340" y="323" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">RS</text>
                </g>

                {/* Equity flow particle */}
                <circle r="3" fill="#b37d42" opacity="0.6">
                  <animateMotion dur="8s" repeatCount="indefinite" path="M200,100 L100,220 L300,220 Z" />
                </circle>
                <circle r="2" fill="#7388b4" opacity="0.4">
                  <animateMotion dur="10s" repeatCount="indefinite" path="M200,100 L250,330 L150,330 Z" />
                </circle>
              </svg>

              {/* Label cards floating around the network */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-sm border border-terra-100">
                <p className="text-[10px] font-medium text-grove-700">$34,730</p>
                <p className="text-[8px] text-gray-400">Total member equity</p>
              </div>
              <div className="absolute bottom-12 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-sm border border-terra-100">
                <p className="text-[10px] font-medium text-warmth-700">1 candidate</p>
                <p className="text-[8px] text-gray-400">on the path</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The gap */}
      <section className="bg-white/60 border-y border-terra-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label}>
                <p className="font-display text-2xl md:text-3xl font-bold text-grove-700">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain narrative */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900">
            No one built this yet
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Worker cooperatives track member equity in spreadsheets. Calculate patronage dividends by hand.
            Stitch together Loomio for governance, QuickBooks for finance, and Slack for everything else.
            The pain points are specific, the tools are generic, and the gap has been open for decades.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Communis closes that gap — not with enterprise software dressed down, but with
            tools grown from the cooperative movement itself.
          </p>
        </div>
      </section>

      {/* App Screenshots — live mini components */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-3">
          See it in action
        </h2>
        <p className="text-sm text-gray-400 text-center mb-12 max-w-md mx-auto">
          Real screens from Communis — not mockups. These are live React components
          rendering actual cooperative data.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <DashboardScreenshot />
            <p className="text-xs text-gray-400 text-center">
              NRI-powered dashboard with cooperative health signals
            </p>
          </div>
          <div className="space-y-3">
            <PatronageScreenshot />
            <p className="text-xs text-gray-400 text-center">
              Patronage distribution with Subchapter T compliance
            </p>
          </div>
          <div className="space-y-3">
            <CommunioScreenshot />
            <p className="text-xs text-gray-400 text-center">
              Communio — real operational knowledge from real cooperatives
            </p>
          </div>
          <div className="space-y-3">
            <EducationScreenshot />
            <p className="text-xs text-gray-400 text-center">
              Rehearsal votes — practice democracy before it counts
            </p>
          </div>
          <div className="space-y-3">
            <DocumentsScreenshot />
            <p className="text-xs text-gray-400 text-center">
              NRI reads your documents and becomes your co-op's memory
            </p>
          </div>
          <div className="space-y-3">
            <GovernanceScreenshot />
            <p className="text-xs text-gray-400 text-center">
              Democratic governance — proposals that connect to outcomes
            </p>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(feature => (
            <div key={feature.title} className="narrative-card hover:shadow-md transition-shadow">
              <feature.icon size={24} className="text-grove-600 mb-4" />
              <h3 className="font-display text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CROS body */}
      <section className="bg-grove-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="font-display text-3xl font-bold text-center">Built on the CROS body</h2>
          <p className="mt-4 text-grove-200 text-center max-w-xl mx-auto">
            Communis is built on the CROS architecture — where story guides structure
            and technology carries the weight so humans carry the meaning.
          </p>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'NRI — The Head',
                desc: 'Narrative Relational Intelligence. Recognize signals of cooperative health. Synthesize scattered data into story. Prioritize the next faithful step.',
              },
              {
                name: 'CROS — The Heart',
                desc: 'Member stories, journey chapters, and the living memory of your cooperative. Relationships honored, not reduced to records.',
              },
              {
                name: 'Profunda — The Body',
                desc: 'ICA tracking, patronage calculations, governance workflows — the operational foundation that makes democratic ownership work.',
              },
              {
                name: 'You — The Nervous System',
                desc: 'Every reflection you write, every vote you cast, every hour you log — you are the signal that gives the cooperative its life.',
              },
            ].map(part => (
              <div key={part.name} className="p-6 rounded-2xl bg-white/10 border border-white/10">
                <h3 className="font-display font-semibold text-grove-100">{part.name}</h3>
                <p className="mt-2 text-sm text-grove-300 leading-relaxed">{part.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Silver tsunami */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="narrative-card max-w-3xl mx-auto text-center">
          <Heart size={32} className="text-warmth-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-gray-900">
            2.9 million businesses need succession plans
          </h2>
          <p className="mt-3 text-gray-500 leading-relaxed">
            The silver tsunami is coming. Half of US businesses with owners over 55 lack a succession plan.
            Worker ownership is the answer — and Communis is the infrastructure to make conversions work.
          </p>
          <Link to="/features" className="inline-flex items-center gap-2 mt-6 text-grove-600 font-medium text-sm hover:text-grove-700">
            See all features <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-grove-50 border-t border-grove-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            Cooperatives deserve their own tools
          </h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Built as a platform cooperative. Open-core. Owned by the commons.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/demo" className="calm-button-primary inline-flex items-center gap-2">
              Explore the Demo <ArrowRight size={16} />
            </Link>
            <Link to="/pricing" className="calm-button-secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
