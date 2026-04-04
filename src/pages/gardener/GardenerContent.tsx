import { useState } from 'react'
import { FileText, Edit3, Eye, Send, Clock, Check } from 'lucide-react'

const DEMO_DRAFTS = [
  {
    id: '1',
    title: 'Why Worker Cooperatives Survive Longer Than Traditional Businesses',
    status: 'draft',
    source: 'perplexity',
    created: '2025-01-20',
    excerpt: 'New data from the 2025 State of the Sector report confirms what cooperative advocates have long argued...',
  },
  {
    id: '2',
    title: 'The Silver Tsunami: 2.9 Million Businesses Need Succession Plans',
    status: 'review',
    source: 'perplexity',
    created: '2025-01-18',
    excerpt: 'As baby-boomer business owners approach retirement, worker ownership emerges as a viable succession strategy...',
  },
  {
    id: '3',
    title: 'How Mondragon Built a $12 Billion Cooperative Economy',
    status: 'published',
    source: 'perplexity',
    created: '2025-01-15',
    excerpt: 'Founded by a Basque Catholic priest in 1956, the Mondragon Corporation now employs over 70,000 workers...',
  },
]

const statusConfig = {
  draft: { icon: Edit3, color: 'text-gray-400', bg: 'bg-gray-800' },
  review: { icon: Eye, color: 'text-warmth-400', bg: 'bg-warmth-900' },
  published: { icon: Check, color: 'text-grove-400', bg: 'bg-grove-900' },
}

export default function GardenerContent() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Content Studio</h1>
          <p className="text-sm text-gray-400 mt-1">
            Perplexity AI aggregates cooperative news. You edit and publish.
          </p>
        </div>
        <button className="bg-grove-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-grove-700 flex items-center gap-2">
          <FileText size={14} /> Generate New Essay
        </button>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Drafts', count: 4, color: 'text-gray-400' },
          { label: 'In Review', count: 2, color: 'text-warmth-400' },
          { label: 'Published', count: 12, color: 'text-grove-400' },
        ].map(stage => (
          <div key={stage.label} className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
            <p className={`font-display text-2xl font-bold ${stage.color}`}>{stage.count}</p>
            <p className="text-xs text-gray-500">{stage.label}</p>
          </div>
        ))}
      </div>

      {/* Draft list */}
      <div className="space-y-3">
        {DEMO_DRAFTS.map(draft => {
          const config = statusConfig[draft.status as keyof typeof statusConfig]
          const Icon = config.icon
          return (
            <div key={draft.id} className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-gray-700 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.bg}`}>
                  <Icon size={14} className={config.color} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{draft.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{draft.excerpt}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                    <span>Source: {draft.source}</span>
                    <span>·</span>
                    <span>{draft.created}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${config.bg} ${config.color}`}>
                  {draft.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
