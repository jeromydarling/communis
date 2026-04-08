import { Sparkles } from 'lucide-react'

export default function AITransparencyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles size={24} className="text-grove-600" />
        <h1 className="font-display text-3xl font-bold text-gray-900">AI Transparency</h1>
      </div>
      <p className="text-sm text-gray-400 mt-2">How Communis uses AI — and how it doesn't</p>

      <div className="mt-8 space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Our AI Philosophy</h2>
          <p>NRI (Narrative Relational Intelligence) is designed to <strong>serve your attention, not replace your judgment</strong>. AI in Communis carries the weight of organization so humans can focus on the work that only humans can do — democratic decision-making, relationship building, and cooperative governance.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">What AI Does in Communis</h2>
          <div className="space-y-3 mt-3">
            <div className="p-3 rounded-lg bg-grove-50 border border-grove-100">
              <p className="text-sm font-medium text-grove-800">Cooperative Health Signals</p>
              <p className="text-xs text-grove-600 mt-1">Rule-based detection of patterns: participation dropping, committees going quiet, equity imbalances growing. <strong>Not AI</strong> — deterministic rules that surface observations. No machine learning, no predictions.</p>
            </div>
            <div className="p-3 rounded-lg bg-grove-50 border border-grove-100">
              <p className="text-sm font-medium text-grove-800">NRI Compass Chat</p>
              <p className="text-xs text-grove-600 mt-1">AI-assisted question answering about your cooperative. NRI searches your documents and data, then uses a language model to phrase the answer naturally. <strong>AI generates the phrasing, not the facts.</strong> Facts come from your actual data.</p>
            </div>
            <div className="p-3 rounded-lg bg-grove-50 border border-grove-100">
              <p className="text-sm font-medium text-grove-800">Document Summarization</p>
              <p className="text-xs text-grove-600 mt-1">When documents are indexed, AI generates brief summaries for search results. The full document text is always available.</p>
            </div>
            <div className="p-3 rounded-lg bg-grove-50 border border-grove-100">
              <p className="text-sm font-medium text-grove-800">Communio Pattern Detection</p>
              <p className="text-xs text-grove-600 mt-1">AI identifies emerging patterns across anonymized cooperative insights. Example: "consent-based decisions are replacing consensus in small co-ops." These are statistical trends, not recommendations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">What AI Never Does</h2>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Makes governance decisions</strong> — AI never votes, never recommends how to vote, never influences proposals</li>
            <li><strong>Calculates patronage</strong> — patronage math is deterministic (hours × share). AI is not involved in financial calculations</li>
            <li><strong>Accesses data across cooperatives</strong> — NRI operates within your tenant boundary. It cannot see other co-ops' data</li>
            <li><strong>Replaces professional advice</strong> — NRI explicitly blocks legal, tax, medical, and financial advice queries</li>
            <li><strong>Provides crisis support</strong> — NRI detects crisis language and redirects to 988 Suicide & Crisis Lifeline</li>
            <li><strong>Trains on your data</strong> — your cooperative's data is never used to train AI models</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">AI Models Used</h2>
          <p>NRI Compass uses Anthropic's Claude API for natural language responses. Document embeddings use standard text embedding models for semantic search. All AI processing occurs via Supabase Edge Functions — no data leaves the Communis infrastructure except to the AI provider for the specific query.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Scope Guardrails</h2>
          <p>NRI includes client-side and server-side guardrails that prevent misuse:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Off-topic queries (poems, code, roleplay) are redirected to cooperative topics</li>
            <li>Professional advice queries (legal, tax, medical) are redirected to qualified professionals</li>
            <li>Crisis language triggers compassionate redirect to crisis resources</li>
            <li>Role-based knowledge boundaries ensure members only access data their role permits</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">Contact</h2>
          <p>Questions about AI usage: ai@communis.coop</p>
        </section>
      </div>
    </div>
  )
}
