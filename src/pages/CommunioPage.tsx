import { useState } from 'react'
import { Globe, MessageSquare, TrendingUp, Sparkles, Heart, Bookmark, Search, Plus } from 'lucide-react'
import { SEED_INSIGHTS, INSIGHT_CATEGORIES, type InsightCategory, type CommunioInsight } from '@/types/communio'

const DEMO_INSIGHTS: CommunioInsight[] = SEED_INSIGHTS.map((s, i) => ({
  ...s,
  id: `insight-${i}`,
  tenant_id: `tenant-${i}`,
  approved_by: 'steward-1',
  created_at: new Date(2025, 0, 20 - i * 3).toISOString(),
}))

const DEMO_QUESTIONS = [
  { id: 'q1', title: 'How do you handle members who consistently miss meetings?', category: 'governance' as InsightCategory, answers: 4, industry: 'Cleaning', size: 'small' },
  { id: 'q2', title: 'What percentage of surplus do you retain vs distribute?', category: 'finance' as InsightCategory, answers: 7, industry: 'Various', size: 'medium' },
  { id: 'q3', title: 'How do you onboard non-English speaking candidates?', category: 'onboarding' as InsightCategory, answers: 3, industry: 'Cleaning', size: 'small' },
]

const DEMO_PATTERNS = [
  { title: '3-month cash reserve is the most common benchmark', evidence: 12, confidence: 'strong' as const, category: 'finance' },
  { title: 'Consent-based decisions are replacing consensus in co-ops under 20 members', evidence: 8, confidence: 'established' as const, category: 'governance' },
  { title: 'Buddy systems outperform formal mentorship for onboarding', evidence: 6, confidence: 'emerging' as const, category: 'onboarding' },
]

const confidenceColors = {
  emerging: 'bg-commons-50 text-commons-700 border-commons-100',
  established: 'bg-warmth-50 text-warmth-700 border-warmth-100',
  strong: 'bg-grove-50 text-grove-700 border-grove-100',
}

export default function CommunioPage() {
  const [tab, setTab] = useState<'insights' | 'questions' | 'patterns'>('insights')
  const [category, setCategory] = useState<InsightCategory | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = category === 'all'
    ? DEMO_INSIGHTS
    : DEMO_INSIGHTS.filter(i => i.category === category)

  const searched = !search
    ? filtered
    : filtered.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.body_markdown.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Communio</h1>
          <p className="text-sm text-gray-400 mt-1">
            How cooperatives actually run — shared knowledge from the movement.
          </p>
        </div>
        <button className="calm-button-primary text-xs flex items-center gap-2">
          <Plus size={14} /> Share an Insight
        </button>
      </div>

      {/* Intro */}
      <div className="narrative-card bg-grove-50 border-grove-100 mb-6 flex items-start gap-3">
        <Globe size={16} className="text-grove-600 mt-0.5" />
        <div>
          <p className="text-sm text-grove-800">
            Real operational knowledge from real cooperatives — anonymized and shared with permission.
            No names, no identifying details. Just how co-ops actually work on the ground.
          </p>
          <p className="text-xs text-grove-600 mt-1">
            {DEMO_INSIGHTS.length} insights from cooperatives across the US · {DEMO_QUESTIONS.length} open questions
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-warmth-100 rounded-xl p-1">
        {[
          { key: 'insights', label: `Insights (${DEMO_INSIGHTS.length})` },
          { key: 'questions', label: `Questions (${DEMO_QUESTIONS.length})` },
          { key: 'patterns', label: `Patterns (${DEMO_PATTERNS.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'insights' && (
        <>
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search insights..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-terra-200 bg-warmth-50 text-sm" />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value as typeof category)} className="px-3 py-2 rounded-xl border border-terra-200 bg-warmth-50 text-xs">
              <option value="all">All categories</option>
              {Object.entries(INSIGHT_CATEGORIES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {searched.map(insight => (
              <div key={insight.id} className="narrative-card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-grove-50 text-grove-600 border border-grove-100">
                        {INSIGHT_CATEGORIES[insight.category].label}
                      </span>
                      <span className="text-[9px] text-gray-400">
                        {insight.coop_size} {insight.coop_industry} co-op · {insight.coop_region} · {insight.coop_age_years}yr old
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 leading-relaxed mt-3 whitespace-pre-line">
                  {insight.body_markdown.split('\n\n').slice(0, 2).join('\n\n')}
                  {insight.body_markdown.split('\n\n').length > 2 && (
                    <span className="text-grove-600 cursor-pointer"> ...read more</span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-terra-50">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-grove-600">
                    <Heart size={12} /> {insight.helpful_count} helpful
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-grove-600">
                    <MessageSquare size={12} /> {insight.reply_count} replies
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-grove-600">
                    <Bookmark size={12} /> {insight.bookmark_count}
                  </button>
                  <div className="flex gap-1 ml-auto">
                    {insight.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[8px] px-1 py-0.5 rounded bg-gray-100 text-gray-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'questions' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 mb-4">
            Co-ops ask real questions. Other co-ops answer from experience.
          </p>
          {DEMO_QUESTIONS.map(q => (
            <div key={q.id} className="narrative-card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <MessageSquare size={16} className="text-commons-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{q.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-grove-50 text-grove-600 border border-grove-100">
                      {INSIGHT_CATEGORIES[q.category].label}
                    </span>
                    <span className="text-[9px] text-gray-400">{q.size} · {q.industry}</span>
                    <span className="text-[9px] text-grove-600 ml-auto">{q.answers} answers</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'patterns' && (
        <div className="space-y-4">
          <div className="narrative-card bg-warmth-50 border-warmth-100 flex items-start gap-3 mb-4">
            <Sparkles size={16} className="text-warmth-600 mt-0.5" />
            <p className="text-sm text-warmth-700">
              NRI synthesizes insights across all participating cooperatives to detect emerging patterns.
              These aren't opinions — they're trends backed by real co-op experiences.
            </p>
          </div>

          {DEMO_PATTERNS.map((pattern, i) => (
            <div key={i} className="narrative-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-grove-500" />
                  <p className="text-sm font-medium text-gray-900">{pattern.title}</p>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${confidenceColors[pattern.confidence]}`}>
                  {pattern.confidence} ({pattern.evidence} co-ops)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
