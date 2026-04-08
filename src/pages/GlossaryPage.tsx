import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { COOPERATIVE_GLOSSARY, type GlossaryEntry } from '@/lib/nri/education'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'ownership', label: 'Ownership & Equity', terms: ['Worker-Owner', 'Buy-In', 'Equity', 'Internal Capital Account (ICA)', 'Revolvement'] },
  { key: 'money', label: 'Money & Profits', terms: ['Surplus', 'Patronage', 'Patronage Dividend', 'Qualified Patronage', 'Non-Qualified Patronage', 'Subchapter T', '1099-PATR'] },
  { key: 'governance', label: 'Governance', terms: ['Proposal', 'Majority Vote', 'Supermajority', 'Consensus', 'Consent', 'Quorum', 'Block', 'Rehearsal Vote'] },
  { key: 'structure', label: 'Structure', terms: ['Bylaws', 'Committee', 'Candidacy Period', 'Pay Ratio'] },
  { key: 'communis', label: 'NRI & Communis', terms: ['NRI'] },
]

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = COOPERATIVE_GLOSSARY.filter(entry => {
    const matchesSearch = !search ||
      entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.simple.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' ||
      CATEGORIES.find(c => c.key === category)?.terms?.includes(entry.term)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-grove-100 flex items-center justify-center">
          <BookOpen size={20} className="text-grove-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Cooperative Glossary</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Every term explained in plain language. No jargon, just understanding.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-grove-300"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              category === cat.key
                ? 'bg-grove-600 text-white'
                : 'bg-warmth-100 text-gray-500 hover:bg-warmth-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {filtered.map(entry => (
          <div key={entry.term} className="narrative-card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display text-lg font-semibold text-gray-900">{entry.term}</h3>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                entry.forRole === 'everyone' ? 'bg-grove-50 text-grove-600' :
                entry.forRole === 'candidate' ? 'bg-warmth-50 text-warmth-600' :
                entry.forRole === 'member' ? 'bg-commons-50 text-commons-600' :
                'bg-terra-50 text-terra-600'
              }`}>
                {entry.forRole === 'everyone' ? 'Everyone' :
                 entry.forRole === 'candidate' ? 'Candidates' :
                 entry.forRole === 'member' ? 'Members' :
                 'Stewards'}
              </span>
            </div>

            <p className="text-sm text-gray-700 font-medium">{entry.simple}</p>

            <div className="mt-3 p-3 rounded-lg bg-warmth-50 border border-warmth-100">
              <p className="text-sm text-warmth-700 leading-relaxed">{entry.analogy}</p>
            </div>

            <p className="text-xs text-gray-500 mt-3 leading-relaxed">{entry.detail}</p>

            {entry.related.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="text-[9px] text-gray-400 mr-1">Related:</span>
                {entry.related.map(r => (
                  <button
                    key={r}
                    onClick={() => { setSearch(r); setCategory('all') }}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-grove-50 text-grove-600 border border-grove-100 hover:bg-grove-100"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">No terms found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
