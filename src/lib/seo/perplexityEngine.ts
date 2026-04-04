/**
 * SEO Content Engine — Perplexity AI integration scaffold.
 * Aggregates cooperative news, generates essay drafts, tracks keywords.
 */

export interface PerplexityQuery {
  id: string
  query: string
  category: 'sector_news' | 'legislation' | 'conversions' | 'international' | 'movement'
  schedule: 'hourly' | 'daily' | 'weekly'
  last_run_at: string | null
  results_count: number
}

export interface NewsArticle {
  id: string
  query_id: string
  title: string
  source_url: string
  source_name: string
  summary: string
  relevance_score: number // 0-1
  published_at: string
  fetched_at: string
}

export interface EssayDraft {
  id: string
  title: string
  slug: string
  status: 'generating' | 'draft' | 'review' | 'published' | 'archived'
  source_articles: string[] // article IDs
  outline_markdown: string
  body_markdown: string
  seo_title: string
  seo_description: string
  og_image_url: string | null
  target_keywords: string[]
  word_count: number
  created_at: string
  published_at: string | null
}

export interface KeywordTracking {
  id: string
  keyword: string
  current_rank: number | null
  previous_rank: number | null
  search_volume_monthly: number
  trend: 'up' | 'down' | 'stable' | 'new'
  target_page: string
  last_checked_at: string
}

/**
 * Default Perplexity queries for cooperative sector intelligence.
 */
export const DEFAULT_QUERIES: Omit<PerplexityQuery, 'id' | 'last_run_at' | 'results_count'>[] = [
  { query: 'worker cooperative news United States', category: 'sector_news', schedule: 'daily' },
  { query: 'cooperative business conversions employee ownership transitions', category: 'conversions', schedule: 'daily' },
  { query: 'cooperative legislation state policy worker ownership bills', category: 'legislation', schedule: 'weekly' },
  { query: 'USFWC federation worker cooperative programs announcements', category: 'sector_news', schedule: 'weekly' },
  { query: 'Mondragon international cooperative news global', category: 'international', schedule: 'weekly' },
  { query: 'platform cooperative technology digital cooperative', category: 'movement', schedule: 'weekly' },
  { query: 'cooperative development DAWI Project Equity conversions', category: 'conversions', schedule: 'weekly' },
  { query: 'silver tsunami baby boomer business succession cooperative', category: 'conversions', schedule: 'weekly' },
]

/**
 * Default keywords to track for SEO.
 */
export const DEFAULT_KEYWORDS: string[] = [
  'worker cooperative software',
  'internal capital account tracking',
  'patronage dividend calculator',
  'cooperative management platform',
  'cooperative governance software',
  'worker cooperative conversion',
  'Subchapter T compliance',
  '1099-PATR generation',
  'cooperative member equity',
  'cooperative patronage distribution',
  'worker owned business software',
  'democratic workplace tools',
  'cooperative onboarding',
  'cooperative bylaws management',
]
