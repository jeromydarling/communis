import { Check, ArrowRight, CreditCard, Sprout, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const allFeatures = [
  'Unlimited members',
  'Internal Capital Account tracking',
  'Patronage distribution engine',
  'Democratic governance (all voting methods)',
  'Member lifecycle management',
  'Financial transparency dashboard',
  'NRI cooperative health signals',
  'Committee & role management',
  'Meeting management with quorum',
  'Bylaws & policy registry',
  'Labor tracking',
  'Member communication',
  '"Bring Your Mess" import wizard',
  'Cooperative templates & onboarding',
  '1099-PATR generation',
  'Member Story narratives',
  'API access',
]

const paymentFeatures = [
  'Buy-in collection (one-time or installments)',
  'Recurring dues via Stripe Billing',
  'Member self-service payment portal',
  'Automated ICA ledger updates on payment',
  'Patronage payouts to member bank accounts',
  'Real-time payment status dashboard',
  'Stripe Connect onboarding for your co-op',
]

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Every cooperative gets everything
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          No feature gates. No per-seat pricing. No "upgrade to unlock governance."
          Every co-op gets the full platform. Pay more only if you want us to handle your money too.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Tier 1: Communis */}
        <div className="narrative-card flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-grove-100 flex items-center justify-center">
              <Sprout size={20} className="text-grove-600" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-gray-900">Communis</h3>
              <p className="text-xs text-gray-400">The full cooperative operating system</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-gray-900">$49</span>
              <span className="text-sm text-gray-400">/mo</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">$490/yr when paid annually</p>
            <p className="text-xs text-grove-600 font-medium mt-2">Free for co-ops with 5 or fewer members</p>
          </div>

          <ul className="space-y-2.5 flex-1">
            {allFeatures.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <Check size={14} className="text-grove-500 mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-400 mt-6 mb-4">
            Handle payments yourself — through your bank, Square, Venmo, or however your co-op works today.
          </p>

          <Link to="/demo" className="calm-button-primary w-full text-center flex items-center justify-center gap-2">
            Try the Demo <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tier 2: Communis + Payments */}
        <div className="narrative-card flex flex-col ring-2 ring-grove-500 shadow-xl relative">
          <div className="absolute -top-3 left-6 bg-grove-600 text-white text-[10px] font-medium px-3 py-1 rounded-full">
            Recommended
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-grove-600 flex items-center justify-center">
              <CreditCard size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-gray-900">Communis + Payments</h3>
              <p className="text-xs text-gray-400">We handle your money too</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-gray-900">$49</span>
              <span className="text-sm text-gray-400">/mo</span>
              <span className="text-sm text-gray-400 ml-2">+</span>
              <span className="font-display text-xl font-bold text-grove-700 ml-2">0.5%</span>
              <span className="text-xs text-gray-400">per transaction</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              0.5% Communis fee + standard Stripe processing (2.9% + 30¢)
            </p>
            <p className="text-xs text-grove-600 font-medium mt-2">Free tier eligible — payments add-on activates when ready</p>
          </div>

          <div className="bg-grove-50 border border-grove-100 rounded-xl p-4 mb-4">
            <p className="text-xs font-medium text-grove-800 mb-2">Everything in Communis, plus:</p>
            <ul className="space-y-2">
              {paymentFeatures.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-grove-700">
                  <Zap size={14} className="text-grove-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-warmth-50 border border-warmth-100 rounded-xl p-4 mb-4">
            <p className="text-xs font-medium text-warmth-800">You choose what to enable</p>
            <p className="text-xs text-warmth-600 mt-1">
              During onboarding, pick which payment features your co-op needs.
              Start with buy-in collection only. Add dues and patronage payouts when you're ready.
            </p>
          </div>

          <div className="flex-1" />

          <Link to="/demo" className="calm-button-primary w-full text-center flex items-center justify-center gap-2 bg-grove-700 hover:bg-grove-800">
            Start with Payments <CreditCard size={14} />
          </Link>
        </div>
      </div>

      {/* How Stripe Connect works */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-3">
          How payments work
        </h2>
        <p className="text-sm text-gray-400 text-center mb-10">
          Powered by Stripe Connect — the same infrastructure used by Shopify, Lyft, and CoopCycle.
        </p>

        <div className="space-y-6">
          {[
            {
              step: '1',
              title: 'Your co-op connects to Stripe',
              description: 'During onboarding, your cooperative creates a Stripe Connected Account. This is your co-op\'s own account — Communis never holds your money.',
            },
            {
              step: '2',
              title: 'Members pay through Communis',
              description: 'Buy-in contributions, monthly dues, or one-time payments flow through a branded payment portal. Members see "Evergreen Workers Co-op" on their statement, not "Communis."',
            },
            {
              step: '3',
              title: 'Money goes directly to your co-op',
              description: 'Stripe deposits funds to your cooperative\'s bank account. Communis takes a 0.5% platform fee. Your ICA ledger updates automatically when payments clear.',
            },
            {
              step: '4',
              title: 'Patronage flows back to members',
              description: 'When your cooperative votes to distribute surplus, Communis calculates each member\'s allocation and sends payouts directly to their bank accounts via Stripe.',
            },
          ].map(item => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-grove-100 flex items-center justify-center text-sm font-bold text-grove-700 flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust section */}
      <div className="mt-16 narrative-card max-w-3xl mx-auto text-center">
        <p className="font-display text-lg font-semibold text-gray-900">
          Your money stays your money
        </p>
        <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto">
          Communis never holds cooperative funds. Every dollar flows through Stripe directly
          to your co-op's bank account. We see the transactions — we never touch the money.
          Stripe is PCI Level 1 compliant, the highest security standard in the industry.
        </p>
      </div>

      {/* DAWI / Advisor callout */}
      <div className="mt-8 narrative-card max-w-3xl mx-auto text-center">
        <p className="font-display text-lg font-semibold text-gray-900">
          Are you a cooperative developer or DAWI-trained advisor?
        </p>
        <p className="mt-2 text-sm text-gray-500">
          We offer partner accounts with multi-cooperative dashboards and discounted
          client onboarding. Built for the ecosystem.
        </p>
        <Link to="/manifesto" className="inline-flex items-center gap-2 mt-4 text-grove-600 font-medium text-sm hover:text-grove-700">
          Learn about our model <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
