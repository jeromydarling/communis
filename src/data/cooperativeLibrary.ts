/**
 * Cooperative Library — curated reading list with Google Books API integration.
 * Books on cooperative economics, governance, history, and practice.
 */

export interface Book {
  title: string
  author: string
  isbn: string // for Google Books API lookup
  category: 'governance' | 'economics' | 'history' | 'practice' | 'movement'
  description: string
  whyItMatters: string // one sentence on why this matters for co-op members
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const COOPERATIVE_BOOKS: Book[] = [
  // ─── Beginner ──────────────────────────────────────────
  {
    title: 'Ours to Hack and to Own',
    author: 'Trebor Scholz & Nathan Schneider',
    isbn: '9781944869335',
    category: 'movement',
    description: 'An accessible introduction to platform cooperativism — the movement to create cooperatively owned digital platforms.',
    whyItMatters: 'Understand why worker ownership is the future of the digital economy.',
    difficulty: 'beginner',
  },
  {
    title: 'Democracy at Work: A Cure for Capitalism',
    author: 'Richard D. Wolff',
    isbn: '9781608462476',
    category: 'economics',
    description: "Economist Richard Wolff argues that worker cooperatives offer a real alternative to the corporate model. Written for regular people, not economists.",
    whyItMatters: 'See the big picture of why your cooperative exists and why it works.',
    difficulty: 'beginner',
  },
  {
    title: 'Humanizing the Economy: Co-operatives in the Age of Capital',
    author: 'John Restakis',
    isbn: '9780865716858',
    category: 'economics',
    description: 'A global tour of cooperative economies — from Mondragon to Emilia-Romagna to Kerala. Shows how co-ops work at massive scale.',
    whyItMatters: 'Your little co-op is part of a global movement with $3 trillion in assets.',
    difficulty: 'beginner',
  },
  {
    title: 'The Co-operative Advantage',
    author: 'National Co-operative Business Association',
    isbn: '9780870136115',
    category: 'practice',
    description: 'A practical guide to what makes cooperatives different from other businesses — and why those differences are strengths.',
    whyItMatters: 'Quick read that helps you explain to friends and family what your co-op IS.',
    difficulty: 'beginner',
  },

  // ─── Intermediate ──────────────────────────────────────
  {
    title: 'Making Mondragon',
    author: 'William Foote Whyte & Kathleen King Whyte',
    isbn: '9780875461823',
    category: 'history',
    description: "The definitive story of how a Catholic priest in the Basque country built the world's largest cooperative network — now 70,000+ workers and $12 billion in revenue.",
    whyItMatters: 'Proof that worker cooperatives can scale to any size.',
    difficulty: 'intermediate',
  },
  {
    title: 'Collective Courage: A History of African American Cooperative Economic Thought and Practice',
    author: 'Jessica Gordon Nembhard',
    isbn: '9780271062167',
    category: 'history',
    description: 'The untold history of Black cooperative economics — from mutual aid societies to the Federation of Southern Cooperatives. Essential reading.',
    whyItMatters: 'Cooperative economics has always been a tool for liberation and justice.',
    difficulty: 'intermediate',
  },
  {
    title: 'We Own It: Building an Economy That Works for Everyone',
    author: 'Peter Gowan & Gar Alperovitz',
    isbn: '9781620975046',
    category: 'movement',
    description: 'A roadmap for building democratic ownership at scale — employee ownership, community land trusts, public banking, and worker cooperatives.',
    whyItMatters: 'See where the cooperative movement is heading and how your co-op fits in.',
    difficulty: 'intermediate',
  },
  {
    title: 'A Loomio Handbook',
    author: 'Loomio Cooperative',
    isbn: '', // online resource
    category: 'governance',
    description: 'Written by the team behind Loomio (itself a worker cooperative), this handbook covers practical cooperative governance: running meetings, making decisions, handling conflict.',
    whyItMatters: 'Practical governance skills you can use in your next committee meeting.',
    difficulty: 'intermediate',
  },
  {
    title: 'Many Voices, One Song: Shared Power with Sociocracy',
    author: 'Ted J. Rau & Jerry Koch-Gonzalez',
    isbn: '9781949183009',
    category: 'governance',
    description: 'The practical guide to consent-based governance. How to run meetings, make decisions, and organize circles of authority.',
    whyItMatters: 'If your co-op uses consent-based decision making, this is the manual.',
    difficulty: 'intermediate',
  },

  // ─── Advanced ──────────────────────────────────────────
  {
    title: "A Worker Cooperative Toolbox",
    author: 'Virginia Cooperative Extension',
    isbn: '',
    category: 'practice',
    description: 'Detailed guide to the legal, financial, and operational mechanics of starting and running a worker cooperative.',
    whyItMatters: 'The nuts-and-bolts handbook for stewards who manage the co-op.',
    difficulty: 'advanced',
  },
  {
    title: 'The ICA Group: Internal Capital Accounts Explained',
    author: 'ICA Group',
    isbn: '',
    category: 'practice',
    description: 'The definitive guide to ICA tracking — the same workbooks that Communis is replacing. Understand the manual process to appreciate the automation.',
    whyItMatters: 'Deep understanding of the equity tracking system that Communis automates.',
    difficulty: 'advanced',
  },
  {
    title: 'Equity Redemption and Internal Capital Accounts in Worker Cooperatives',
    author: 'Ohio Employee Ownership Center',
    isbn: '',
    category: 'practice',
    description: 'Technical guide to revolvement schedules, equity redemption policies, and financial management of member capital.',
    whyItMatters: 'For stewards and finance committees managing member equity.',
    difficulty: 'advanced',
  },
]

/**
 * Google Books API URL for a given ISBN.
 * Returns cover image, description, and preview link.
 */
export function getGoogleBooksUrl(isbn: string): string {
  return `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
}

/**
 * Google Books thumbnail URL (no API key needed for thumbnails)
 */
export function getBookCoverUrl(isbn: string): string {
  if (!isbn) return ''
  return `https://books.google.com/books/content?id=&printsec=frontcover&img=1&zoom=1&source=gbs_api&isbn=${isbn}`
}
