import { Link } from 'react-router-dom'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const FAQS = [
  {
    question: 'Is my cooperative\'s data safe?',
    answer: 'Yes. Every cooperative\'s data is isolated using row-level security in PostgreSQL — no co-op can see another\'s data. We use Supabase (built on PostgreSQL) with encryption at rest and in transit. We never sell your data. We never use it to train AI models. You own your data and can export it anytime.',
  },
  {
    question: 'Do I need to replace QuickBooks?',
    answer: 'No. Communis integrates with QuickBooks (and Xero). Your accountant keeps working in the tool they know. Communis pulls financial data for member transparency and pushes patronage journal entries back. We bridge the gap — we don\'t replace your accounting system.',
  },
  {
    question: 'What happens if I cancel?',
    answer: 'You get 30 days to export all your data in standard formats (CSV, PDF). After 30 days, your data is permanently deleted. No lock-in, no hostage-taking. Your cooperative owns its data, always.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No contracts. Month-to-month billing. Cancel anytime. We believe if we\'re not earning your trust every month, we don\'t deserve your subscription.',
  },
  {
    question: 'Can I import from our existing spreadsheets?',
    answer: 'Yes. The "Bring Your Mess" import wizard handles CSV, TSV, and Excel exports. It auto-detects column formats and uses fuzzy matching to map your messy headers to Communis fields. Upload your ICA workbook, member roster, or hours log — we\'ll help you make sense of it.',
  },
  {
    question: 'How does Stripe Connect work? Who holds our money?',
    answer: 'Your cooperative gets its own Stripe account (a "Connected Account"). When members pay buy-ins or dues, money goes directly to YOUR Stripe account, then to YOUR bank. Communis never holds your funds. We charge a 0.5% platform fee on top of standard Stripe processing fees. Your members see your co-op\'s name on their statements, not "Communis."',
  },
  {
    question: 'What if we\'re a brand new cooperative?',
    answer: 'Communis is built for you. The onboarding wizard offers 8 cooperative templates (cleaning, tech, food, construction, childcare, consulting, retail, custom) that pre-fill your bylaws configuration. The education system teaches new members what cooperatives are and how they work. Rehearsal votes let you practice governance before it counts. You don\'t need to know everything on day one.',
  },
  {
    question: 'What if we\'re converting from a traditional business?',
    answer: 'The Conversion Toolkit walks you through the entire process step by step — business assessment, deal structure, legal setup, financial transition, governance launch. Communis connects you with resources like DAWI, Project Equity, and the ICA Group. It\'s the operational infrastructure for the silver tsunami succession wave.',
  },
  {
    question: 'Does the AI (NRI) make decisions for our cooperative?',
    answer: 'Absolutely not. NRI is designed to serve your attention, not replace your judgment. It notices patterns (committee hasn\'t met, quorum at risk), answers questions from your actual documents, and educates members on cooperative terms. But every decision is made by humans through democratic governance. AI phrases responses — it never decides anything.',
  },
  {
    question: 'Do you support Spanish?',
    answer: 'Yes. 37.9% of worker-owners are Latinx. The interface supports English and Spanish with cooperative-specific terminology (patronage → patronazgo, bylaws → estatutos). User-generated content (proposals, meeting minutes) can be translated via DeepL integration.',
  },
  {
    question: 'What\'s Communio? Is our data shared with other co-ops?',
    answer: 'Only if you explicitly opt in. Communio is a knowledge-sharing network where cooperatives share anonymized operational insights — "how we handle grievances" or "our onboarding buddy system" — with no names, no financial amounts, no identifying details. A steward must approve every shared insight. You can withdraw consent at any time.',
  },
  {
    question: 'Is Communis a cooperative itself?',
    answer: 'Yes. Communis is structured as a platform cooperative. We build for cooperatives, as a cooperative. Your subscription funds shared infrastructure, not investor returns.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Real questions from cooperatives considering Communis.
        </p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="narrative-card">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start gap-3 text-left"
            >
              <HelpCircle size={18} className={`mt-0.5 flex-shrink-0 ${openIndex === i ? 'text-grove-600' : 'text-gray-300'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                {openIndex === i && (
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">Still have questions?</p>
        <Link to="/contact" className="calm-button-primary inline-flex items-center gap-2">
          Get in Touch <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
