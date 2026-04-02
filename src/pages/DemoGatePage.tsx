import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sprout } from 'lucide-react'

export default function DemoGatePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', coop: '', role: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would POST to an API
    // For now, store in sessionStorage and proceed
    sessionStorage.setItem('communis_demo_contact', JSON.stringify(form))
    setSubmitted(true)
    setTimeout(() => navigate('/app'), 600)
  }

  const handleSkip = () => {
    sessionStorage.setItem('communis_demo_contact', JSON.stringify({ skipped: true }))
    navigate('/app')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-grove-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sprout size={24} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            See Communis in action
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Explore a demo cooperative — Evergreen Workers Co-op — with realistic
            member equity, patronage calculations, and democratic governance.
          </p>
        </div>

        {submitted ? (
          <div className="narrative-card text-center">
            <p className="font-display font-semibold text-grove-700">Welcome aboard.</p>
            <p className="text-sm text-gray-500 mt-1">Taking you to the demo...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="narrative-card space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-500 mb-1">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-grove-300 focus:border-grove-400 transition-colors"
                  placeholder="María Reyes"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-grove-300 focus:border-grove-400 transition-colors"
                  placeholder="maria@evergreen.coop"
                />
              </div>

              <div>
                <label htmlFor="coop" className="block text-xs font-medium text-gray-500 mb-1">
                  Cooperative or organization <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  id="coop"
                  type="text"
                  value={form.coop}
                  onChange={e => setForm({ ...form, coop: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-grove-300 focus:border-grove-400 transition-colors"
                  placeholder="Evergreen Workers Co-op"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-xs font-medium text-gray-500 mb-1">
                  Your role <span className="text-gray-300">(optional)</span>
                </label>
                <select
                  id="role"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-grove-300 focus:border-grove-400 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="member-owner">Member-owner</option>
                  <option value="board">Board member</option>
                  <option value="manager">Manager / Operations</option>
                  <option value="developer">Cooperative developer / Advisor</option>
                  <option value="considering">Considering conversion</option>
                  <option value="curious">Just curious</option>
                </select>
              </div>

              <button type="submit" className="w-full calm-button-primary flex items-center justify-center gap-2">
                Enter the Demo <ArrowRight size={16} />
              </button>
            </form>

            <button
              onClick={handleSkip}
              className="w-full mt-3 text-xs text-gray-400 hover:text-grove-500 transition-colors text-center py-2"
            >
              Skip for now — go straight to the demo
            </button>
          </>
        )}
      </div>
    </div>
  )
}
