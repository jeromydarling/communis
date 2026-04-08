import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CreditCard, Sprout, Check, Users, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Ready to give your co-op
          <br />
          <span className="text-grove-600">the tools it deserves?</span>
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Start today. No credit card required for co-ops with 5 or fewer members.
        </p>
      </div>

      {/* Signup cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <div className="narrative-card text-center flex flex-col">
          <Sprout size={32} className="text-grove-600 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-900">Communis</h2>
          <p className="text-sm text-gray-500 mt-2">All features. $49/month.</p>
          <p className="text-xs text-grove-600 font-medium mt-1">Free for co-ops with 5 or fewer members</p>
          <ul className="text-left mt-6 space-y-2 flex-1">
            {['ICA tracking & patronage engine', 'Democratic governance & rehearsal votes', 'Document intelligence (Google Drive, Dropbox)', 'Communio knowledge hub', 'NRI Compass & cooperative education', 'QuickBooks/Xero integration', 'Committee management', 'Unlimited everything'].map(f => (
              <li key={f} className="text-xs text-gray-600 flex items-start gap-2">
                <Check size={12} className="text-grove-500 mt-0.5 flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <a
            href="https://buy.stripe.com/communis_core"
            className="mt-6 calm-button-primary w-full flex items-center justify-center gap-2"
          >
            Start Free <ArrowRight size={16} />
          </a>
          <p className="text-[10px] text-gray-300 mt-2">No credit card for free tier</p>
        </div>

        <div className="narrative-card text-center flex flex-col ring-2 ring-grove-500 shadow-xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-grove-600 text-white text-[10px] font-medium px-3 py-1 rounded-full">
            Most co-ops choose this
          </div>
          <CreditCard size={32} className="text-grove-600 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-900">Communis + Payments</h2>
          <p className="text-sm text-gray-500 mt-2">$49/month + 0.5% per transaction</p>
          <p className="text-xs text-grove-600 font-medium mt-1">Stripe Connect handles your money</p>
          <ul className="text-left mt-6 space-y-2 flex-1">
            {['Everything in Communis, plus:', 'Buy-in collection (one-time or installments)', 'Recurring member dues via Stripe Billing', 'Patronage payouts to member bank accounts', 'Automated ICA ledger updates', 'Real-time payment dashboard', '1099-PATR auto-generation', 'Your co-op owns the Stripe account'].map(f => (
              <li key={f} className="text-xs text-gray-600 flex items-start gap-2">
                <Check size={12} className="text-grove-500 mt-0.5 flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <a
            href="https://buy.stripe.com/communis_payments"
            className="mt-6 calm-button-primary w-full flex items-center justify-center gap-2 bg-grove-700 hover:bg-grove-800"
          >
            Start with Payments <CreditCard size={16} />
          </a>
          <p className="text-[10px] text-gray-300 mt-2">14-day free trial · Cancel anytime</p>
        </div>
      </div>

      {/* Contact form */}
      <div className="max-w-lg mx-auto">
        <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-2">Questions?</h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          We'd love to hear from you — especially if you're a cooperative developer, DAWI advisor, or USFWC member.
        </p>

        {submitted ? (
          <div className="narrative-card text-center py-8">
            <Check size={32} className="text-grove-600 mx-auto mb-3" />
            <p className="font-display text-lg font-semibold text-gray-900">Message sent</p>
            <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="narrative-card space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                <input type="text" required className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm" placeholder="María Reyes" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input type="email" required className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm" placeholder="maria@evergreen.coop" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Cooperative <span className="text-gray-300">(optional)</span></label>
              <input type="text" className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm" placeholder="Evergreen Workers Co-op" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">How can we help?</label>
              <textarea rows={4} required className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm resize-none" placeholder="Tell us about your cooperative and what you need..." />
            </div>
            <button type="submit" className="w-full calm-button-primary flex items-center justify-center gap-2">
              <MessageSquare size={16} /> Send Message
            </button>
          </form>
        )}
      </div>

      {/* Partners */}
      <div className="mt-16 text-center">
        <p className="text-xs text-gray-400 mb-4">Built for the cooperative ecosystem</p>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
          <span>USFWC Members</span>
          <span>·</span>
          <span>DAWI-Trained Advisors</span>
          <span>·</span>
          <span>Platform Cooperativism Consortium</span>
          <span>·</span>
          <span>ICA Members</span>
        </div>
      </div>
    </div>
  )
}
