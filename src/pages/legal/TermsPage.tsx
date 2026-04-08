export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="text-sm text-gray-400 mt-2">Last updated: April 2026</p>

      <div className="mt-8 space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">1. Agreement to Terms</h2>
          <p>By accessing or using Communis ("the Service"), you agree to be bound by these Terms of Service. Communis is operated by Communis Cooperative ("we," "us," "our"), a platform cooperative. If you are using the Service on behalf of a cooperative or organization, you represent that you have authority to bind that entity to these terms.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">2. Description of Service</h2>
          <p>Communis provides cooperative management tools including member equity tracking, patronage calculation, democratic governance, payment processing, document management, and educational resources. The Service is designed for worker cooperatives and democratic workplaces.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">3. Accounts and Cooperatives</h2>
          <p>Each cooperative ("tenant") maintains its own workspace within Communis. A cooperative steward creates the account and invites members. You are responsible for maintaining the security of your account credentials. Cooperative data is isolated by tenant — no cooperative can access another's data.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">4. Payment Processing</h2>
          <p>Payment processing is provided through Stripe Connect. Each cooperative connects its own Stripe account. Communis acts as a platform facilitator — we never hold cooperative funds. Communis charges a platform fee of 0.5% per transaction in addition to standard Stripe processing fees. Your cooperative owns its Stripe account and can disconnect at any time.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">5. Financial Calculations</h2>
          <p>Communis provides tools for patronage calculation, equity tracking, and tax form generation. <strong>These tools are not a substitute for professional accounting, legal, or tax advice.</strong> Your cooperative should consult qualified professionals for financial and legal decisions. Communis is not liable for calculation errors, tax filing outcomes, or financial decisions made using the Service.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">6. Data Ownership</h2>
          <p>Your cooperative owns its data. We do not sell, share, or monetize cooperative data. If you cancel your subscription, you can export your data in standard formats. Data is stored on Supabase infrastructure in the United States with row-level security enforcement.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">7. Communio Knowledge Sharing</h2>
          <p>Cooperatives may opt into Communio, a knowledge-sharing network. Shared insights are anonymized — no cooperative names, member names, or specific financial figures are shared. A cooperative steward must approve each shared insight. Consent can be withdrawn at any time, and all shared insights will be removed.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">8. AI Usage (NRI)</h2>
          <p>Communis uses AI (NRI — Narrative Relational Intelligence) for cooperative health signals, document summarization, and compass chat assistance. NRI does not make decisions for your cooperative. AI-generated content is clearly labeled. See our AI Transparency policy for details.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">9. Termination</h2>
          <p>Either party may terminate this agreement at any time. Upon termination, your cooperative retains access for 30 days to export data. After 30 days, data is permanently deleted unless otherwise required by law.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">10. Contact</h2>
          <p>Questions about these terms should be directed to legal@communis.coop.</p>
        </section>
      </div>
    </div>
  )
}
