import { Link } from 'react-router-dom'
import { ArrowRight, Quote, AlertCircle } from 'lucide-react'

/**
 * Real pain points from real cooperative sources — not testimonials,
 * but documented frustrations from the ecosystem.
 */
const PAIN_QUOTES = [
  {
    quote: 'The ins and outs of managing stock classes, equity allocations, and patronage refunds are extremely complex.',
    source: 'Levridge — Equity and Patronage Software',
    url: 'https://www.levridge.com/solutions/equity-and-patronage/',
    context: 'Said about agricultural co-ops. Worker co-ops have the same complexity with zero dedicated tools.',
  },
  {
    quote: 'Spreadsheet-based financial management becomes unwieldy as cooperatives expand, creating risks of calculation errors in critical areas like patronage distributions and equity tracking.',
    source: 'Finotor — Cooperative Accounting Software',
    url: 'https://finotor.com/cooperative-accounting-software-features-benefits-and-implementation/',
    context: 'The industry acknowledges the problem. Nobody has built the solution for worker co-ops.',
  },
  {
    quote: 'USFWC and DAWI provide spreadsheet tools that illustrate a simplified version of how patronage flows through a cooperative corporation.',
    source: 'Democracy at Work Institute',
    url: 'https://institute.coop/resources/patronage-calculation-template',
    context: 'The national organizations offer Excel templates — because no software exists.',
  },
  {
    quote: 'Basic accounting software lacks the specialized features necessary for cooperative structures, forcing organizations to use workarounds that compromise accuracy and efficiency.',
    source: 'Finotor — Cooperative Accounting Analysis',
    url: 'https://finotor.com/cooperative-accounting-software-features-benefits-and-implementation/',
    context: 'QuickBooks wasn\'t built for cooperatives. Neither was Xero. Neither was anything else.',
  },
  {
    quote: 'The sector\'s most pressing needs include quality and affordable healthcare, business marketing, and business planning support.',
    source: '2025 State of the Sector — USFWC / DAWI',
    url: 'https://www.usworker.coop/census/',
    context: 'Technology infrastructure doesn\'t even make the list — because co-ops have given up asking for it.',
  },
]

const BEFORE_AFTER = [
  {
    before: 'Track member equity in Excel workbooks from the ICA Group',
    after: 'Internal Capital Accounts with automatic ledger updates on every transaction',
  },
  {
    before: 'Calculate patronage by hand — hours × share × qualified split — pray the math is right',
    after: 'Patronage engine does the calculation, members vote, payouts go to bank accounts',
  },
  {
    before: 'Use Loomio for governance but nothing connects votes to outcomes',
    after: 'A vote to distribute patronage triggers the patronage engine. A vote to hire starts onboarding.',
  },
  {
    before: 'Stitch together QuickBooks + Loomio + Slack + Google Docs + Venmo',
    after: 'One platform. ICA, governance, payments, documents, education, communication.',
  },
  {
    before: 'New members have no idea what "patronage" or "revolvement" means',
    after: 'Glossary, rehearsal votes, knowledge base, welcome experience — from confused to confident',
  },
  {
    before: 'Financial transparency means the steward emails a PDF once a year',
    after: 'Every member sees their equity, the co-op\'s health, and the next patronage distribution — live',
  },
  {
    before: 'Paying buy-ins via check, Venmo, or "remind me next month"',
    after: 'Stripe Connect: automated installments, recurring dues, patronage payouts to bank accounts',
  },
  {
    before: 'Institutional knowledge lives in one person\'s head',
    after: 'NRI reads your documents. The Compass answers questions from your actual bylaws and policies.',
  },
]

export default function BeforeAfterPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          The gap is real.
          <br />
          <span className="text-grove-600">We built the bridge.</span>
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Worker cooperatives have been told to use tools built for corporations — just smaller.
          Here's what that actually looks like, and what it could look like instead.
        </p>
      </div>

      {/* Real quotes from the ecosystem */}
      <div className="mb-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-3">
          The cooperative sector's own words
        </h2>
        <p className="text-sm text-gray-400 text-center mb-8 max-w-md mx-auto">
          These aren't our words. These are documented pain points from cooperative organizations, researchers, and industry analysts.
        </p>

        <div className="space-y-4 max-w-3xl mx-auto">
          {PAIN_QUOTES.map((pq, i) => (
            <div key={i} className="narrative-card">
              <div className="flex items-start gap-3">
                <Quote size={20} className="text-warmth-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed italic">"{pq.quote}"</p>
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={pq.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-grove-600 hover:text-grove-700 font-medium"
                    >
                      — {pq.source}
                    </a>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{pq.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After */}
      <div className="mb-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-3">
          Before Communis → After Communis
        </h2>
        <p className="text-sm text-gray-400 text-center mb-8">
          Same cooperative. Different tools. Different experience.
        </p>

        <div className="space-y-3 max-w-4xl mx-auto">
          {BEFORE_AFTER.map((ba, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="flex items-start gap-2">
                  <AlertCircle size={14} className="text-red-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-500">{ba.before}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-grove-50 border border-grove-100">
                <div className="flex items-start gap-2">
                  <ArrowRight size={14} className="text-grove-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-grove-700">{ba.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The cost of doing nothing */}
      <div className="narrative-card max-w-3xl mx-auto text-center mb-16">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-4">The cost of "good enough"</h2>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="font-display text-3xl font-bold text-warmth-600">40+</p>
            <p className="text-xs text-gray-400">hours/year on manual patronage calculation</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-warmth-600">7</p>
            <p className="text-xs text-gray-400">disconnected tools stitched together</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-warmth-600">$0</p>
            <p className="text-xs text-gray-400">software built for your co-op until now</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Communis costs less than the labor your steward spends wrestling spreadsheets.
          And it does everything the spreadsheets can't: connect governance to finance, educate
          your members, and make your cooperative's democracy actually feel like democracy.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/contact" className="calm-button-primary inline-flex items-center gap-2 text-lg px-8 py-4">
          Start Your Cooperative <ArrowRight size={18} />
        </Link>
        <p className="mt-3 text-xs text-gray-400">Free for co-ops with 5 or fewer members</p>
      </div>
    </div>
  )
}
