import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Sprout, Users, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-grove-600 flex items-center justify-center mx-auto mb-6">
          <Sprout size={32} className="text-white" />
        </div>
        <h1 className="font-display text-4xl font-bold text-gray-900">
          About Communis
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed max-w-xl mx-auto">
          Built by cooperatives, for cooperatives. Owned by the commons.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Why we exist</h2>
          <p>
            There are over 1,300 worker cooperatives in the United States — cleaning companies,
            tech firms, bakeries, construction crews, childcare centers — all owned by the people
            who do the work. They track member equity in spreadsheets. They calculate patronage
            dividends by hand. They stitch together Loomio for governance, QuickBooks for finance,
            and Slack for everything else.
          </p>
          <p className="mt-3">
            We built Communis because nobody else did. The market was "too small" for venture capital.
            The pain was "too niche" for enterprise software. But for the 15,000 worker-owners in
            America, the pain is real, the tools are missing, and the gap has been open for decades.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">What we believe</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-grove-50 border border-grove-100">
              <p className="text-sm font-medium text-grove-800">Story guides structure</p>
              <p className="text-sm text-grove-600 mt-1">
                Equity statements should read like sentences, not spreadsheets. Reports should tell the
                story of a cooperative's year, not dump data into charts. The narrative is the interface.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-warmth-50 border border-warmth-100">
              <p className="text-sm font-medium text-warmth-800">Technology carries the weight. Humans carry the meaning.</p>
              <p className="text-sm text-warmth-600 mt-1">
                Let the machine do the math, the tracking, the reminders. Free the humans for what
                only humans can do: vote, decide, resolve conflict, build trust, and show up for each other.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-commons-50 border border-commons-100">
              <p className="text-sm font-medium text-commons-800">AI serves attention, not decisions</p>
              <p className="text-sm text-commons-600 mt-1">
                NRI notices what's changing and helps you understand it. It never votes, never recommends
                policy, never replaces the democratic process. The intelligence belongs to the relationships.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">We are a cooperative</h2>
          <p>
            Communis is structured as a platform cooperative. Not a startup looking for an exit.
            Not a venture-backed company optimizing for growth at all costs. A cooperative building
            tools for cooperatives.
          </p>
          <p className="mt-3">
            Your subscription funds shared infrastructure — servers, Stripe processing, AI services,
            and the team that builds and maintains the platform. No investor returns. No data monetization.
            No artificial scarcity. Every feature is available to every cooperative.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Built on CROS</h2>
          <p>
            Communis is built on the <strong>CROS (Communal Relationship Operating System)</strong> architecture —
            a framework designed for human-centered organizations where story guides structure and
            relationships matter more than transactions.
          </p>
          <p className="mt-3">
            The intelligence layer, <strong>NRI (Narrative Relational Intelligence)</strong>, follows a simple
            rhythm: Recognize what's changing, Synthesize scattered data into story, Prioritize
            the next faithful step. It's rule-based at its core — AI only assists with phrasing,
            never with decisions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">The ecosystem</h2>
          <p>
            We don't build in isolation. Communis is designed to work with the cooperative ecosystem:
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { name: 'USFWC', desc: 'Federation of Worker Cooperatives — distribution channel, peer networks' },
              { name: 'DAWI', desc: 'Democracy at Work Institute — developer training, conversion programs' },
              { name: 'Platform Cooperativism Consortium', desc: 'Tool directory, cooperative technology advocacy' },
              { name: 'ICA', desc: 'International Cooperative Alliance — global cooperative movement' },
              { name: 'Project Equity', desc: 'Business conversion specialists — silver tsunami pipeline' },
              { name: 'Shared Capital Cooperative', desc: 'Cooperative lending and financing' },
            ].map(org => (
              <div key={org.name} className="p-3 rounded-xl bg-warmth-50 border border-warmth-100">
                <p className="text-xs font-medium text-gray-900">{org.name}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{org.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center pt-8 border-t border-terra-100">
          <Heart size={24} className="text-grove-600 mx-auto mb-4" />
          <p className="font-display text-lg font-semibold text-grove-700 italic max-w-md mx-auto">
            "Computers learned numbers. AI learned language.
            Communis helps you remember your people."
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-6 calm-button-primary">
            Join Us <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  )
}
