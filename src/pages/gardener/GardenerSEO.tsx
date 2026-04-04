import { Search, TrendingUp, Globe, Target, RefreshCw } from 'lucide-react'

const DEMO_KEYWORDS = [
  { keyword: 'worker cooperative software', rank: 12, volume: 320, trend: 'up', page: '/features' },
  { keyword: 'internal capital account tracking', rank: 3, volume: 90, trend: 'up', page: '/features' },
  { keyword: 'patronage dividend calculator', rank: 5, volume: 140, trend: 'up', page: '/features' },
  { keyword: 'cooperative management platform', rank: 18, volume: 210, trend: 'up', page: '/' },
  { keyword: 'worker cooperative conversion', rank: 8, volume: 170, trend: 'up', page: '/manifesto' },
  { keyword: 'cooperative governance software', rank: 7, volume: 110, trend: 'stable', page: '/features' },
  { keyword: 'Subchapter T compliance', rank: 2, volume: 60, trend: 'up', page: '/features' },
  { keyword: '1099-PATR generation', rank: 1, volume: 40, trend: 'stable', page: '/features' },
]

const DEMO_QUERIES = [
  { query: 'worker cooperative news United States 2025', lastRun: '2 hours ago', articles: 3 },
  { query: 'cooperative business conversions silver tsunami', lastRun: '6 hours ago', articles: 1 },
  { query: 'USFWC federation announcements programs', lastRun: '12 hours ago', articles: 2 },
  { query: 'Mondragon cooperative international news', lastRun: '1 day ago', articles: 0 },
  { query: 'cooperative legislation state policy worker ownership', lastRun: '1 day ago', articles: 4 },
]

export default function GardenerSEO() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">SEO Engine</h1>
          <p className="text-sm text-gray-400 mt-1">
            Keyword tracking, Perplexity-powered news aggregation, content opportunities.
          </p>
        </div>
        <button className="bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2">
          <RefreshCw size={14} /> Run All Queries
        </button>
      </div>

      {/* Keyword rankings */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
          <Target size={14} /> Keyword Rankings
        </h2>
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Keyword</th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">Rank</th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">Volume</th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">Trend</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Page</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_KEYWORDS.map(kw => (
                <tr key={kw.keyword} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="px-4 py-2.5 text-gray-300">{kw.keyword}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`font-display font-bold ${kw.rank <= 3 ? 'text-grove-400' : kw.rank <= 10 ? 'text-warmth-400' : 'text-gray-400'}`}>
                      #{kw.rank}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-400">{kw.volume}/mo</td>
                  <td className="px-4 py-2.5 text-right">
                    {kw.trend === 'up' ? (
                      <TrendingUp size={12} className="text-grove-400 inline" />
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">{kw.page}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Perplexity queries */}
      <div>
        <h2 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
          <Globe size={14} /> Perplexity News Queries
        </h2>
        <div className="space-y-2">
          {DEMO_QUERIES.map(q => (
            <div key={q.query} className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-center gap-4">
              <Search size={14} className="text-gray-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-300">{q.query}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Last run: {q.lastRun}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                q.articles > 0 ? 'bg-grove-900 text-grove-400' : 'bg-gray-800 text-gray-500'
              }`}>
                {q.articles} new articles
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
