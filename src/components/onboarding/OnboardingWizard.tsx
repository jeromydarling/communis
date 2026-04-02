import { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Sprout, Building2, Scale, Users } from 'lucide-react'
import { COOP_TEMPLATES, type CoopTemplate, type PatronageBasis, type VotingMethod } from '@/types'

type Step = 'welcome' | 'template' | 'bylaws' | 'members' | 'complete'

interface BylawAnswers {
  buyIn: number
  installments: boolean
  candidacyMonths: number
  patronageBasis: PatronageBasis
  qualifiedPct: number
  votingMethod: VotingMethod
  quorum: number
  revolvementYears: number
}

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>('welcome')
  const [coopName, setCoopName] = useState('')
  const [template, setTemplate] = useState<CoopTemplate>('custom')
  const [bylaws, setBylaws] = useState<BylawAnswers>({
    buyIn: 2000,
    installments: true,
    candidacyMonths: 6,
    patronageBasis: 'hours',
    qualifiedPct: 80,
    votingMethod: 'majority',
    quorum: 50,
    revolvementYears: 3,
  })

  const selectedTemplate = COOP_TEMPLATES.find(t => t.key === template)

  // When template changes, pre-fill bylaws
  const selectTemplate = (key: CoopTemplate) => {
    setTemplate(key)
    const tmpl = COOP_TEMPLATES.find(t => t.key === key)
    if (tmpl?.default_bylaws) {
      setBylaws(prev => ({
        ...prev,
        buyIn: (tmpl.default_bylaws.buy_in_amount_cents || 200000) / 100,
        installments: tmpl.default_bylaws.buy_in_allows_installments ?? true,
        candidacyMonths: tmpl.default_bylaws.candidacy_period_months ?? 6,
        patronageBasis: tmpl.default_bylaws.patronage_basis ?? 'hours',
        qualifiedPct: tmpl.default_bylaws.default_qualified_pct ?? 80,
        votingMethod: tmpl.default_bylaws.default_voting_method ?? 'majority',
        quorum: (tmpl.default_bylaws.general_meeting_quorum ?? 0.5) * 100,
        revolvementYears: tmpl.default_bylaws.revolvement_years ?? 3,
      }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step: Welcome */}
      {step === 'welcome' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-grove-600 flex items-center justify-center mx-auto mb-6">
            <Sprout size={32} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900">
            Welcome to Communis
          </h1>
          <p className="mt-3 text-gray-500 max-w-md mx-auto leading-relaxed">
            Let's set up your cooperative. We'll ask a few questions about your bylaws
            and structure, then you're ready to go.
          </p>

          <div className="mt-8 space-y-4 max-w-sm mx-auto">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 text-left">
                Cooperative name
              </label>
              <input
                type="text"
                value={coopName}
                onChange={e => setCoopName(e.target.value)}
                placeholder="Evergreen Workers Co-op"
                className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-grove-300"
              />
            </div>
            <button
              onClick={() => setStep('template')}
              disabled={!coopName.trim()}
              className="w-full calm-button-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Template */}
      {step === 'template' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Building2 size={20} className="text-grove-600" />
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">What kind of cooperative?</h2>
              <p className="text-sm text-gray-400">Choose a template to pre-fill your settings, or start custom.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {COOP_TEMPLATES.map(tmpl => (
              <button
                key={tmpl.key}
                onClick={() => selectTemplate(tmpl.key)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  template === tmpl.key
                    ? 'border-grove-400 bg-grove-50 shadow-sm'
                    : 'border-terra-100 bg-white hover:border-grove-200'
                }`}
              >
                <p className="text-sm font-medium text-gray-900">{tmpl.name}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tmpl.description}</p>
              </button>
            ))}
          </div>

          {selectedTemplate && template !== 'custom' && (
            <div className="narrative-card bg-grove-50 border-grove-100 mb-6">
              <p className="text-xs font-medium text-grove-700">Pre-configured:</p>
              <p className="text-xs text-grove-600 mt-1">
                Committees: {selectedTemplate.default_committees.join(', ')} ·
                Buy-in: ${bylaws.buyIn.toLocaleString()} ·
                Patronage by {bylaws.patronageBasis} ·
                {bylaws.votingMethod} voting
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <button onClick={() => setStep('welcome')} className="calm-button-secondary text-sm flex items-center gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep('bylaws')} className="calm-button-primary text-sm flex items-center gap-2">
              Configure Bylaws <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Bylaws */}
      {step === 'bylaws' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Scale size={20} className="text-grove-600" />
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Your bylaws</h2>
              <p className="text-sm text-gray-400">We pre-filled from the template. Adjust to match your actual bylaws.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="narrative-card grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Member buy-in ($)</label>
                <input
                  type="number"
                  value={bylaws.buyIn}
                  onChange={e => setBylaws(p => ({ ...p, buyIn: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-terra-200 bg-warmth-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Candidacy period (months)</label>
                <input
                  type="number"
                  value={bylaws.candidacyMonths}
                  onChange={e => setBylaws(p => ({ ...p, candidacyMonths: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-terra-200 bg-warmth-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Patronage basis</label>
                <select
                  value={bylaws.patronageBasis}
                  onChange={e => setBylaws(p => ({ ...p, patronageBasis: e.target.value as PatronageBasis }))}
                  className="w-full px-3 py-2 rounded-lg border border-terra-200 bg-warmth-50 text-sm"
                >
                  <option value="hours">Hours worked</option>
                  <option value="revenue">Revenue generated</option>
                  <option value="equal">Equal shares</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Qualified patronage %</label>
                <input
                  type="number"
                  value={bylaws.qualifiedPct}
                  onChange={e => setBylaws(p => ({ ...p, qualifiedPct: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-terra-200 bg-warmth-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Default voting method</label>
                <select
                  value={bylaws.votingMethod}
                  onChange={e => setBylaws(p => ({ ...p, votingMethod: e.target.value as VotingMethod }))}
                  className="w-full px-3 py-2 rounded-lg border border-terra-200 bg-warmth-50 text-sm"
                >
                  <option value="majority">Majority</option>
                  <option value="supermajority">Supermajority (2/3)</option>
                  <option value="consensus">Consensus</option>
                  <option value="consent">Consent</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Quorum (%)</label>
                <input
                  type="number"
                  value={bylaws.quorum}
                  onChange={e => setBylaws(p => ({ ...p, quorum: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-terra-200 bg-warmth-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Revolvement period (years)</label>
                <input
                  type="number"
                  value={bylaws.revolvementYears}
                  onChange={e => setBylaws(p => ({ ...p, revolvementYears: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-terra-200 bg-warmth-50 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bylaws.installments}
                  onChange={e => setBylaws(p => ({ ...p, installments: e.target.checked }))}
                  className="rounded border-terra-200"
                />
                <label className="text-xs text-gray-500">Allow buy-in installments</label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep('template')} className="calm-button-secondary text-sm flex items-center gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep('members')} className="calm-button-primary text-sm flex items-center gap-2">
              Add Members <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Members */}
      {step === 'members' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Users size={20} className="text-grove-600" />
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Your people</h2>
              <p className="text-sm text-gray-400">Add members now, or import them later.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="narrative-card text-center py-8">
              <p className="text-sm text-gray-500">
                In the full app, you can add members one by one or use the
                <span className="font-medium text-grove-600"> Bring Your Mess</span> importer
                to upload your existing roster.
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep('bylaws')} className="calm-button-secondary text-sm flex items-center gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep('complete')} className="calm-button-primary text-sm flex items-center gap-2">
              Complete Setup <Check size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Complete */}
      {step === 'complete' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-grove-100 flex items-center justify-center mx-auto mb-6">
            <Sprout size={32} className="text-grove-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900">
            {coopName} is ready
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Your cooperative is set up with {template !== 'custom' ? `the ${selectedTemplate?.name} template` : 'custom settings'}.
            Buy-in: ${bylaws.buyIn.toLocaleString()} · Patronage by {bylaws.patronageBasis} · {bylaws.votingMethod} voting.
          </p>
          <p className="text-xs text-gray-400 mt-6">
            Demo mode — no cooperative was actually created.
          </p>
        </div>
      )}
    </div>
  )
}
