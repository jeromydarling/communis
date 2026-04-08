export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mt-2">Last updated: April 2026</p>

      <div className="mt-8 space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Our Commitment</h2>
          <p>Communis is built for cooperatives — organizations founded on democratic ownership and transparency. We hold ourselves to the same standard. Your data belongs to your cooperative, not to us.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">What We Collect</h2>
          <p><strong>Account data:</strong> Name, email, cooperative name, role. Required to provide the service.</p>
          <p className="mt-2"><strong>Cooperative data:</strong> Member records, equity balances, governance history, labor hours, documents, meeting minutes. Stored exclusively for your cooperative's use.</p>
          <p className="mt-2"><strong>Payment data:</strong> Processed by Stripe. Communis does not store credit card numbers or bank account details. We receive transaction confirmation data (amounts, dates, status).</p>
          <p className="mt-2"><strong>Usage data:</strong> Page visits, feature usage, NRI interactions. Used to improve the product. Never sold to third parties.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Multi-Tenant Isolation</h2>
          <p>Every cooperative's data is isolated using row-level security (RLS) in PostgreSQL. No cooperative can access another's data. Communis operators (Gardeners) can access tenant data only for support purposes, with full audit logging.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">What We Never Do</h2>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Sell your data to advertisers or data brokers</li>
            <li>Share cooperative data between tenants (unless opted into Communio, which is anonymized)</li>
            <li>Use your data to train AI models</li>
            <li>Store payment card or bank account numbers</li>
            <li>Track individual members across cooperatives</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Document Storage</h2>
          <p>When you connect Google Drive or Dropbox, Communis syncs and indexes documents for NRI search. Documents are stored encrypted at rest. Document content is processed for semantic search within your tenant only — it is never shared with other cooperatives or used for any purpose outside your cooperative.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Communio Knowledge Sharing</h2>
          <p>If your cooperative opts into Communio, shared insights are stripped of all identifying information: no cooperative names, member names, email addresses, financial amounts, or location details beyond region (e.g., "Northeast"). A steward must approve each insight. You can withdraw consent at any time.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Data Retention and Deletion</h2>
          <p>Active accounts: data retained while subscription is active. Cancelled accounts: data retained for 30 days for export, then permanently deleted. Legal holds: data retained as required by applicable law.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Contact</h2>
          <p>Privacy questions: privacy@communis.coop</p>
        </section>
      </div>
    </div>
  )
}
