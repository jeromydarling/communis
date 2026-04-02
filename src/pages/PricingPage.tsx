import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const tiers = [
  {
    name: 'Seedling',
    price: 49,
    annual: 490,
    description: 'For new and small cooperatives finding their footing.',
    features: [
      'Up to 15 members',
      'Internal Capital Account tracking',
      'Basic patronage calculation',
      'Member lifecycle management',
      'Democratic voting (majority, consensus)',
      'Financial transparency dashboard',
      'Meeting management',
    ],
    cta: 'Start Growing',
    highlight: false,
  },
  {
    name: 'Grove',
    price: 99,
    annual: 990,
    description: 'For established cooperatives ready for full democratic infrastructure.',
    features: [
      'Up to 50 members',
      'Everything in Seedling, plus:',
      'Advanced patronage engine (Subchapter T)',
      '1099-PATR generation',
      'Committee & role management',
      'Bylaws & policy registry',
      'Labor tracking integration',
      'NRI cooperative health signals',
      'Member Story narratives',
    ],
    cta: 'Plant Deep Roots',
    highlight: true,
  },
  {
    name: 'Commons',
    price: 199,
    annual: 1990,
    description: 'For large cooperatives and federations building the movement.',
    features: [
      'Unlimited members',
      'Everything in Grove, plus:',
      'Multi-cooperative support',
      'Federation dashboards',
      'Conversion toolkit (silver tsunami)',
      'Developer/advisor portal',
      'Advanced NRI analysis',
      'API access',
      'Priority support',
    ],
    cta: 'Build the Commons',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Cooperative pricing for cooperatives
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Simple, honest, scaled to your size. No per-seat gotchas.
          Built as a platform cooperative — your subscription funds shared infrastructure.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {tiers.map(tier => (
          <div
            key={tier.name}
            className={`rounded-2xl p-8 ${
              tier.highlight
                ? 'bg-grove-800 text-white ring-2 ring-grove-500 shadow-xl'
                : 'narrative-card'
            }`}
          >
            <h3 className={`font-display text-xl font-bold ${
              tier.highlight ? 'text-white' : 'text-gray-900'
            }`}>
              {tier.name}
            </h3>
            <p className={`mt-1 text-sm ${tier.highlight ? 'text-grove-200' : 'text-gray-400'}`}>
              {tier.description}
            </p>

            <div className="mt-6">
              <span className={`font-display text-4xl font-bold ${
                tier.highlight ? 'text-white' : 'text-gray-900'
              }`}>
                ${tier.price}
              </span>
              <span className={`text-sm ${tier.highlight ? 'text-grove-300' : 'text-gray-400'}`}>/mo</span>
              <p className={`text-xs mt-1 ${tier.highlight ? 'text-grove-300' : 'text-gray-400'}`}>
                ${tier.annual}/yr when paid annually
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {tier.features.map(feature => (
                <li key={feature} className={`flex items-start gap-2 text-sm ${
                  tier.highlight ? 'text-grove-100' : 'text-gray-600'
                }`}>
                  <Check size={14} className={`mt-0.5 flex-shrink-0 ${
                    tier.highlight ? 'text-grove-300' : 'text-grove-500'
                  }`} />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`mt-8 w-full calm-button flex items-center justify-center gap-2 ${
              tier.highlight
                ? 'bg-white text-grove-800 hover:bg-grove-50'
                : 'bg-grove-600 text-white hover:bg-grove-700'
            }`}>
              {tier.cta} <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 narrative-card max-w-2xl mx-auto text-center">
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
