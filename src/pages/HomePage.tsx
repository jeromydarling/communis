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
} from 'lucide-react'

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
    icon: Users,
    title: 'Member Lifecycle',
    description: 'From candidacy to full membership to departure. Bylaw-configurable, not rigid. Every co-op is different.',
  },
  {
    icon: Vote,
    title: 'Democratic Governance',
    description: 'Proposals, voting, discussion threads. A vote to hire becomes an onboarding workflow. Decisions connect to outcomes.',
  },
  {
    icon: BarChart3,
    title: 'Financial Transparency',
    description: 'Member-facing dashboards with calm narrative. "Your equity grew 12% this year through your labor."',
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
        <div className="max-w-3xl">
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
