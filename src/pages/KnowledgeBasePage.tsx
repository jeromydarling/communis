import { useState } from 'react'
import { BookOpen, Clock, ChevronDown, ChevronUp, GraduationCap, Sparkles } from 'lucide-react'
import { GUIDES, type Guide } from '@/data/knowledgeBase'

export default function KnowledgeBasePage() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)
  const [category, setCategory] = useState<'all' | 'topic' | 'role' | 'milestone'>('all')

  const filtered = category === 'all' ? GUIDES : GUIDES.filter(g => g.category === category)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-grove-100 flex items-center justify-center">
          <GraduationCap size={20} className="text-grove-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Learn how your cooperative works — in plain language, at your own pace.
          </p>
        </div>
      </div>

      {/* NRI learning prompt */}
      <div className="narrative-card bg-grove-50 border-grove-100 mb-6 flex items-start gap-3">
        <Sparkles size={16} className="text-grove-600 mt-0.5" />
        <p className="text-sm text-grove-700">
          Not sure where to start? If you just joined, read <strong>"Your First Week"</strong> and
          <strong> "Understanding Your Equity."</strong> Then try a <strong>Rehearsal Vote</strong> to
          practice governance.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-1 mb-6">
        {[
          { key: 'all', label: 'All Guides' },
          { key: 'topic', label: 'By Topic' },
          { key: 'role', label: 'By Role' },
          { key: 'milestone', label: 'Milestones' },
        ].map(cat => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key as typeof category)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              category === cat.key ? 'bg-grove-600 text-white' : 'bg-warmth-100 text-gray-500 hover:bg-warmth-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Guide list or selected guide */}
      {selectedGuide ? (
        <div>
          <button
            onClick={() => setSelectedGuide(null)}
            className="text-xs text-gray-400 hover:text-grove-600 mb-4"
          >
            ← Back to guides
          </button>

          <div className="narrative-card mb-6">
            <h2 className="font-display text-xl font-bold text-gray-900">{selectedGuide.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{selectedGuide.subtitle}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock size={12} /> {selectedGuide.readTimeMinutes} min read</span>
              <span>{selectedGuide.sections.length} sections</span>
            </div>
          </div>

          <div className="space-y-6">
            {selectedGuide.sections.map((section, i) => (
              <div key={i} className="narrative-card">
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">{section.heading}</h3>
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-sm text-gray-600 leading-relaxed mb-3 last:mb-0 whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(guide => (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="w-full narrative-card text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  guide.category === 'topic' ? 'bg-grove-100' :
                  guide.category === 'role' ? 'bg-warmth-100' :
                  'bg-commons-100'
                }`}>
                  <BookOpen size={16} className={
                    guide.category === 'topic' ? 'text-grove-600' :
                    guide.category === 'role' ? 'text-warmth-600' :
                    'text-commons-600'
                  } />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{guide.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{guide.subtitle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock size={10} /> {guide.readTimeMinutes} min
                    </span>
                    {guide.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
