import { useState } from 'react'
import { ArrowRight, Building2, Users, DollarSign, FileText, Check, Clock, Sparkles } from 'lucide-react'

type Step = 'assess' | 'plan' | 'legal' | 'financial' | 'transition' | 'launch'

const STEPS: { key: Step; title: string; description: string; tasks: string[] }[] = [
  {
    key: 'assess',
    title: 'Assessment',
    description: 'Is this business a good candidate for conversion?',
    tasks: [
      'Business profitability and financial health review',
      'Employee interest survey — how many want to be owners?',
      'Industry viability for cooperative model',
      'Owner motivation and timeline',
      'Workforce stability and tenure',
    ],
  },
  {
    key: 'plan',
    title: 'Planning',
    description: 'Design the cooperative structure.',
    tasks: [
      'Choose cooperative type (worker co-op, hybrid)',
      'Draft bylaws with governance structure',
      'Determine buy-in amount and payment options',
      'Set patronage allocation method (hours, revenue, equal)',
      'Define voting methods and quorum requirements',
      'Plan committee structure',
    ],
  },
  {
    key: 'legal',
    title: 'Legal Structure',
    description: 'Incorporate the cooperative and handle legal requirements.',
    tasks: [
      'Incorporate as a cooperative corporation (state-specific)',
      'File articles of incorporation',
      'Draft and adopt bylaws',
      'Obtain EIN for the new entity',
      'Register for Subchapter T tax election',
      'Review workers\' comp and liability insurance',
    ],
  },
  {
    key: 'financial',
    title: 'Financial Transition',
    description: 'Value the business, structure the purchase, and set up cooperative finances.',
    tasks: [
      'Business valuation (independent appraiser)',
      'Negotiate purchase price and seller note terms',
      'Structure financing (SBA loans, CDFIs, seller financing)',
      'Set up cooperative bank accounts',
      'Transfer assets and contracts to new entity',
      'Set up payroll and benefits under cooperative',
      'Connect Communis for ICA tracking and payments',
    ],
  },
  {
    key: 'transition',
    title: 'Cultural Transition',
    description: 'Shift from "boss decides" to "we decide together."',
    tasks: [
      'Governance training for all new member-owners',
      'First rehearsal votes — practice decision-making',
      'Elect initial board and committee members',
      'Establish meeting cadence (weekly, monthly)',
      'Set up communication channels in Communis',
      'Assign mentors/buddies for new owners',
      'First small decision as a co-op (build the governance muscle)',
    ],
  },
  {
    key: 'launch',
    title: 'Launch',
    description: 'The cooperative is operational. Celebrate.',
    tasks: [
      'First official general membership meeting',
      'Distribute member handbooks',
      'Set up Communis: import members, configure bylaws, connect payments',
      'Run first patronage calculation',
      'Announce to clients and community',
      'Join USFWC and connect with the cooperative ecosystem',
    ],
  },
]

const RESOURCES = [
  { title: 'DAWI — Workers to Owners', url: 'https://institute.coop', description: 'Free cooperative development support' },
  { title: 'Project Equity', url: 'https://project-equity.org', description: 'Business conversion specialists' },
  { title: 'ICA Group', url: 'https://icagroup.org', description: 'ICA tracking templates and consulting' },
  { title: 'USFWC Co-op Clinic', url: 'https://usworker.coop', description: 'Peer technical assistance' },
  { title: 'Shared Capital Cooperative', url: 'https://sharedcapital.coop', description: 'Cooperative lending and financing' },
]

export default function ConversionPage() {
  const [activeStep, setActiveStep] = useState<Step>('assess')
  const current = STEPS.find(s => s.key === activeStep)!
  const stepIndex = STEPS.findIndex(s => s.key === activeStep)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-warmth-100 flex items-center justify-center">
          <Building2 size={20} className="text-warmth-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Conversion Toolkit</h1>
          <p className="text-sm text-gray-400 mt-0.5">Convert a traditional business to worker ownership — step by step.</p>
        </div>
      </div>

      {/* Silver tsunami callout */}
      <div className="narrative-card bg-warmth-50 border-warmth-100 mb-6 flex items-start gap-3">
        <Sparkles size={16} className="text-warmth-600 mt-0.5" />
        <p className="text-sm text-warmth-700">
          2.9 million US businesses have owners over 55. More than half lack succession plans.
          Worker cooperative conversion preserves jobs, builds community wealth, and keeps businesses local.
        </p>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        {STEPS.map((step, i) => (
          <button
            key={step.key}
            onClick={() => setActiveStep(step.key)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeStep === step.key ? 'bg-grove-600 text-white' :
              i < stepIndex ? 'bg-grove-100 text-grove-700' :
              'bg-warmth-100 text-gray-500 hover:bg-warmth-200'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              {i < stepIndex ? <Check size={10} /> : i + 1}
            </span>
            {step.title}
          </button>
        ))}
      </div>

      {/* Active step */}
      <div className="narrative-card mb-6">
        <h2 className="font-display text-lg font-semibold text-gray-900">
          Step {stepIndex + 1}: {current.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{current.description}</p>

        <div className="mt-4 space-y-2">
          {current.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-terra-50 last:border-0">
              <div className="w-5 h-5 rounded border-2 border-terra-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[8px] text-gray-400">{i + 1}</span>
              </div>
              <p className="text-sm text-gray-600">{task}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Conversion Resources</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {RESOURCES.map(res => (
          <a
            key={res.title}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="narrative-card hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-medium text-grove-700">{res.title}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{res.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
