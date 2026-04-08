import { useState } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { COOPERATIVE_BOOKS, getBookCoverUrl, type Book } from '@/data/cooperativeLibrary'

const CATEGORIES = [
  { key: 'all', label: 'All Books' },
  { key: 'beginner', label: 'Start Here' },
  { key: 'intermediate', label: 'Go Deeper' },
  { key: 'advanced', label: 'Expert' },
]

const TOPIC_FILTERS = [
  { key: 'all', label: 'All Topics' },
  { key: 'governance', label: 'Governance' },
  { key: 'economics', label: 'Economics' },
  { key: 'history', label: 'History' },
  { key: 'practice', label: 'Practice' },
  { key: 'movement', label: 'Movement' },
]

const difficultyColors = {
  beginner: 'bg-grove-50 text-grove-700 border-grove-100',
  intermediate: 'bg-warmth-50 text-warmth-700 border-warmth-100',
  advanced: 'bg-commons-50 text-commons-700 border-commons-100',
}

export default function LibraryPage() {
  const [difficulty, setDifficulty] = useState('all')
  const [topic, setTopic] = useState('all')

  const filtered = COOPERATIVE_BOOKS.filter(book => {
    const matchesDiff = difficulty === 'all' || book.difficulty === difficulty
    const matchesTopic = topic === 'all' || book.category === topic
    return matchesDiff && matchesTopic
  })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-terra-100 flex items-center justify-center">
          <BookOpen size={20} className="text-terra-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Cooperative Library</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Essential reading on worker ownership, cooperative economics, and democratic governance.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setDifficulty(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                difficulty === cat.key ? 'bg-grove-600 text-white' : 'bg-warmth-100 text-gray-500 hover:bg-warmth-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {TOPIC_FILTERS.map(t => (
            <button
              key={t.key}
              onClick={() => setTopic(t.key)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                topic === t.key ? 'bg-terra-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Book list */}
      <div className="space-y-4">
        {filtered.map(book => (
          <div key={book.title} className="narrative-card flex gap-4">
            {/* Cover */}
            <div className="w-16 h-24 rounded-lg bg-terra-100 flex-shrink-0 overflow-hidden">
              {book.isbn ? (
                <img
                  src={getBookCoverUrl(book.isbn)}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={20} className="text-terra-300" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{book.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{book.author}</p>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium flex-shrink-0 ${difficultyColors[book.difficulty]}`}>
                  {book.difficulty}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{book.description}</p>

              <div className="mt-2 p-2 rounded-lg bg-warmth-50 border border-warmth-100">
                <p className="text-xs text-warmth-700">
                  <strong>Why it matters:</strong> {book.whyItMatters}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{book.category}</span>
                {book.isbn && (
                  <a
                    href={`https://books.google.com/books?isbn=${book.isbn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-grove-600 hover:text-grove-700 flex items-center gap-1"
                  >
                    Preview on Google Books <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
