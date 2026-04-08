/**
 * First-Login Welcome Experience
 * A warm, celebratory walkthrough that makes new members feel
 * like they just joined something meaningful.
 */
import { useState } from 'react'
import { ArrowRight, Sprout, Landmark, Vote, PieChart, Heart, Users, Sparkles } from 'lucide-react'
import type { CoopRole } from '@/types'

interface WelcomeExperienceProps {
  memberName: string
  coopName: string
  role: CoopRole
  onComplete: () => void
}

interface WelcomeStep {
  icon: typeof Sprout
  headline: string
  body: string
  highlight: string
  color: string
}

const ROLE_INTROS: Record<string, string> = {
  candidate: "You're on the path to becoming a worker-owner. Not just an employee — an owner. Everything you're about to learn will prepare you for that moment.",
  member: "You are now a worker-owner. You own part of this business. Your voice matters. Your vote counts. Your labor builds shared wealth.",
  coordinator: "You've been trusted to coordinate — to keep the threads of democratic work connected. Your committees are where governance becomes real.",
  steward: "You carry the vision. As a steward, you see the whole picture — the finances, the governance, the people, the future. This is your dashboard.",
  advisor: "You bring outside perspective to this cooperative. Your experience strengthens their democracy. Here's what you need to know.",
}

const STEPS: WelcomeStep[] = [
  {
    icon: Landmark,
    headline: 'You own this',
    body: "In a regular company, someone else owns the business and you work for them. Here, you ARE the business. Your equity — your ownership stake — grows every year you work. It's real money that belongs to you.",
    highlight: 'Only 15,000 Americans are worker-owners. You just became one of them.',
    color: 'bg-grove-50 border-grove-100',
  },
  {
    icon: PieChart,
    headline: 'You share in the success',
    body: "When the cooperative earns more than it spends, that surplus gets shared among the worker-owners — based on your labor, not someone else's investment. The more you work, the bigger your share. It's called patronage.",
    highlight: 'Worker co-ops have a 2:1 pay ratio. Regular companies average 303:1.',
    color: 'bg-warmth-50 border-warmth-100',
  },
  {
    icon: Vote,
    headline: 'You decide together',
    body: "Every major decision — hiring, spending, policy changes — gets decided by the people who do the work. One member, one vote. Your voice is equal to everyone else's, regardless of tenure or title.",
    highlight: 'Worker cooperatives survive longer than traditional businesses.',
    color: 'bg-commons-50 border-commons-100',
  },
  {
    icon: Users,
    headline: "You're not alone",
    body: "There are over 1,300 worker cooperatives across America. Cleaning companies, tech firms, bakeries, construction crews — all owned by the people who do the work. You're part of a movement that's been growing for over a century.",
    highlight: '62.5% of worker-owners are women. 37.9% are Latinx. This is what democracy looks like.',
    color: 'bg-terra-50 border-terra-100',
  },
]

export default function WelcomeExperience({ memberName, coopName, role, onComplete }: WelcomeExperienceProps) {
  const [step, setStep] = useState(0) // 0 = intro, 1-4 = steps, 5 = ready
  const firstName = memberName.split(' ')[0]
  const intro = ROLE_INTROS[role] || ROLE_INTROS.member

  return (
    <div className="fixed inset-0 z-50 bg-warmth-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Intro */}
        {step === 0 && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-grove-600 flex items-center justify-center mx-auto mb-8">
              <Sprout size={40} className="text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Welcome, {firstName}.
            </h1>
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">
              You just joined <strong className="text-grove-700">{coopName}</strong>.
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed max-w-md mx-auto">
              {intro}
            </p>
            <p className="mt-6 text-sm text-gray-400">
              Let us show you what that means — in plain language, no jargon.
            </p>
            <button
              onClick={() => setStep(1)}
              className="mt-8 calm-button-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Show me <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Steps 1-4 */}
        {step >= 1 && step <= 4 && (
          <div className="animate-fade-in" key={step}>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i + 1 === step ? 'bg-grove-600 w-6' :
                    i + 1 < step ? 'bg-grove-300' :
                    'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className={`rounded-2xl border p-8 ${STEPS[step - 1].color}`}>
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const Icon = STEPS[step - 1].icon
                  return <Icon size={28} className="text-grove-600" />
                })()}
                <h2 className="font-display text-2xl font-bold text-gray-900">
                  {STEPS[step - 1].headline}
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                {STEPS[step - 1].body}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-white/60 border border-white/80">
                <p className="text-sm text-grove-700 font-medium">
                  <Sparkles size={14} className="inline mr-1 text-grove-500" />
                  {STEPS[step - 1].highlight}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  ← Back
                </button>
              )}
              <div className="ml-auto">
                <button
                  onClick={() => setStep(step + 1)}
                  className="calm-button-primary inline-flex items-center gap-2"
                >
                  {step < 4 ? 'Next' : "I'm ready"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ready */}
        {step === 5 && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-grove-100 flex items-center justify-center mx-auto mb-6">
              <Heart size={36} className="text-grove-600" />
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              You belong here, {firstName}.
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed max-w-md mx-auto">
              Your cooperative is waiting. Everything you need — your equity, your votes,
              your committees, your co-op's financial health — is inside.
              And if anything is unclear, just ask NRI. That's what it's for.
            </p>
            <button
              onClick={onComplete}
              className="mt-8 calm-button-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Enter {coopName} <ArrowRight size={18} />
            </button>
            <p className="mt-4 text-xs text-gray-300">
              You can revisit this anytime from the Glossary.
            </p>
          </div>
        )}
      </div>

      {/* Skip link — always available */}
      {step < 5 && (
        <button
          onClick={onComplete}
          className="fixed bottom-6 right-6 text-xs text-gray-300 hover:text-gray-500"
        >
          Skip for now
        </button>
      )}
    </div>
  )
}
