/**
 * Communio Knowledge Types — collective cooperative intelligence.
 * Anonymized, permission-based sharing of how co-ops actually run.
 *
 * This is the "open source knowledge base" of cooperative operations —
 * real practices from real co-ops, not academic theory.
 */

// ─── Knowledge Contributions ─────────────────────────────
export type InsightCategory =
  | 'governance'
  | 'finance'
  | 'onboarding'
  | 'culture'
  | 'operations'
  | 'growth'
  | 'conflict'
  | 'technology'
  | 'legal'
  | 'conversion'

export interface CommunioInsight {
  id: string
  tenant_id: string // who contributed (but displayed anonymized)
  category: InsightCategory
  title: string
  body_markdown: string
  // Anonymized metadata — no names, just characteristics
  coop_size: 'tiny' | 'small' | 'medium' | 'large' // 1-5, 6-15, 16-50, 50+
  coop_industry: string // "Cleaning Services", "Tech", etc.
  coop_region: string // "Pacific Northwest", "Northeast", etc.
  coop_age_years: number
  // Sharing controls
  sharing_consent: boolean // explicit opt-in
  anonymized: boolean // always true for shared insights
  approved_by: string | null // steward who approved sharing
  // Community engagement
  helpful_count: number
  bookmark_count: number
  reply_count: number
  tags: string[]
  created_at: string
}

export interface CommunioReply {
  id: string
  insight_id: string
  tenant_id: string
  body_markdown: string
  coop_size: string
  coop_industry: string
  helpful_count: number
  created_at: string
}

// ─── Knowledge Questions ─────────────────────────────────
// Co-ops can ask questions and other co-ops answer from experience
export interface CommunioQuestion {
  id: string
  tenant_id: string
  category: InsightCategory
  title: string
  body_markdown: string
  coop_size: string
  coop_industry: string
  answer_count: number
  status: 'open' | 'answered' | 'closed'
  tags: string[]
  created_at: string
}

// ─── Aggregated Patterns ─────────────────────────────────
// NRI synthesizes across all shared insights to surface patterns
export interface CommunioPattern {
  id: string
  category: InsightCategory
  title: string
  summary: string
  evidence_count: number // how many co-ops contributed to this pattern
  coop_sizes: string[] // which sizes reported this
  industries: string[] // which industries
  confidence: 'emerging' | 'established' | 'strong'
  source_insight_ids: string[]
  detected_at: string
}

// ─── Sharing Consent ─────────────────────────────────────
export interface SharingPreferences {
  tenant_id: string
  share_governance_practices: boolean
  share_financial_structures: boolean
  share_onboarding_processes: boolean
  share_culture_practices: boolean
  share_operational_patterns: boolean
  share_anonymized_metrics: boolean // pay ratios, member counts, patronage amounts
  // What gets anonymized
  anonymize_industry: boolean // false = show actual industry
  anonymize_region: boolean // false = show actual region
  anonymize_size: boolean // false = show actual member count
  // Who approved
  approved_by: string // steward member_id
  approved_at: string
  consent_text: string // the exact consent language they agreed to
}

export const SHARING_CONSENT_TEXT = `
By enabling knowledge sharing, your cooperative agrees to:

1. Share anonymized operational insights with other cooperatives on the Communis platform.
2. No names, member details, financial amounts, or identifying information will ever be shared.
3. Only general practices, approaches, and lessons learned are shared.
4. A steward must approve each shared insight before it becomes visible.
5. You can withdraw consent and remove all shared insights at any time.
6. Other cooperatives may reply to your insights — replies are also anonymized.

Your cooperative's identity is never revealed. Insights are attributed only by
size (small/medium/large), industry, and region.

This knowledge sharing is voluntary and exists to strengthen the cooperative movement.
`.trim()

// ─── Seed Insights ───────────────────────────────────────
// Pre-populated insights from cooperative best practices
export const SEED_INSIGHTS: Omit<CommunioInsight, 'id' | 'tenant_id' | 'approved_by' | 'created_at'>[] = [
  {
    category: 'onboarding',
    title: 'Buddy system works better than formal mentorship',
    body_markdown: "We tried assigning formal mentors to candidates but it felt too hierarchical. Switched to a buddy system — each candidate pairs with a member who's been here 1-2 years (not a founder). The buddies eat lunch together, the candidate shadows them for a week. Completion rate went from 60% to 90%.\n\nKey lesson: new members learn culture from peers, not from managers.",
    coop_size: 'small',
    coop_industry: 'Cleaning Services',
    coop_region: 'Northeast',
    coop_age_years: 5,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 34,
    bookmark_count: 12,
    reply_count: 5,
    tags: ['onboarding', 'mentorship', 'culture', 'candidates'],
  },
  {
    category: 'governance',
    title: 'We switched from consensus to consent — and meetings got 40% shorter',
    body_markdown: "For 3 years we used full consensus for everything. It honored everyone's voice but meetings ran 3+ hours and people stopped coming.\n\nWe switched to consent-based decisions (from sociocracy): instead of 'does everyone agree?' we ask 'does anyone have a paramount objection?' If not, we move forward.\n\nMeetings dropped from 3 hours to under 2. Attendance went up 25%. And honestly, the decisions are just as good.\n\nWe still use full consensus for bylaws changes and membership votes. Everything else is consent.",
    coop_size: 'small',
    coop_industry: 'Technology',
    coop_region: 'Pacific Northwest',
    coop_age_years: 4,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 67,
    bookmark_count: 28,
    reply_count: 11,
    tags: ['governance', 'consensus', 'consent', 'meetings', 'sociocracy'],
  },
  {
    category: 'finance',
    title: 'We keep 3 months of expenses in reserve — here\'s why',
    body_markdown: "Our first year, we distributed almost all surplus as patronage. Members loved it. Then we lost a major client and had 6 weeks of cash runway.\n\nNow we follow the 3-month rule: before any patronage is distributed, we set aside enough to cover 3 months of operating expenses. Members understand — we showed them the math of what would have happened that bad quarter if we hadn't had reserves.\n\nFinancial transparency makes this conversation easy. When members can see the numbers, they make responsible decisions.",
    coop_size: 'medium',
    coop_industry: 'Cleaning Services',
    coop_region: 'West Coast',
    coop_age_years: 7,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 45,
    bookmark_count: 19,
    reply_count: 8,
    tags: ['finance', 'reserves', 'patronage', 'cash-flow', 'transparency'],
  },
  {
    category: 'culture',
    title: 'Monthly "story circles" transformed our co-op culture',
    body_markdown: "Once a month, instead of a business meeting, we do a story circle. Someone shares a 5-minute story about their life — not work, just their life. Where they grew up, why they came to this city, what they care about.\n\nWe're a diverse co-op (8 countries represented) and these circles did more for trust and cohesion than any team-building exercise. When you know someone's story, you argue differently in governance meetings.\n\nWe've been doing this for 2 years. Turnover dropped to nearly zero.",
    coop_size: 'medium',
    coop_industry: 'Food & Beverage',
    coop_region: 'Midwest',
    coop_age_years: 6,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 89,
    bookmark_count: 41,
    reply_count: 15,
    tags: ['culture', 'diversity', 'trust', 'storytelling', 'retention'],
  },
  {
    category: 'conflict',
    title: 'Our grievance process has 3 steps — and we\'ve only ever needed the first',
    body_markdown: "Step 1: Direct conversation between the two people, facilitated by a neutral member.\nStep 2: Committee hearing with 3 members (not involved in the conflict).\nStep 3: Full membership vote on resolution.\n\nWe've been open 4 years. Every conflict resolved at step 1. The key: we train EVERY member in basic mediation during onboarding. 2 hours. Covers active listening, separating positions from interests, and how to say 'I feel' instead of 'you always.'\n\nThe fact that steps 2 and 3 exist gives step 1 weight. People take the direct conversation seriously because they know the alternative.",
    coop_size: 'small',
    coop_industry: 'Construction',
    coop_region: 'Mountain West',
    coop_age_years: 4,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 72,
    bookmark_count: 33,
    reply_count: 9,
    tags: ['conflict', 'grievance', 'mediation', 'training', 'policy'],
  },
  {
    category: 'operations',
    title: 'Rotating the "manager of the week" keeps everyone accountable',
    body_markdown: "We don't have a permanent manager. Each week, a different member is 'coordinator of the week' — they handle client calls, schedule adjustments, and daily decisions. Everyone rotates through.\n\nBenefits: no one becomes a bottleneck, everyone understands the full business, and it naturally develops leadership skills in every member.\n\nDownside: it took 6 months before everyone was comfortable in the role. We created a one-page 'coordinator cheat sheet' that lives on the wall.\n\nThis only works because we're 8 people. Bigger co-ops might need standing coordinators.",
    coop_size: 'small',
    coop_industry: 'Cleaning Services',
    coop_region: 'Southeast',
    coop_age_years: 3,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 56,
    bookmark_count: 22,
    reply_count: 7,
    tags: ['operations', 'management', 'rotation', 'leadership', 'flat-structure'],
  },
  {
    category: 'growth',
    title: 'We grew from 3 to 15 members in 2 years — here\'s what almost broke us',
    body_markdown: "Rapid growth nearly killed our culture. When we were 3, decisions happened over coffee. At 8, we needed formal meetings. At 12, we needed committees. By 15, people who joined at the beginning didn't recognize the co-op.\n\nWhat saved us:\n1. We wrote down our values (should have done this at 3 people, not 12)\n2. We limited growth to 2 new members per quarter\n3. We required every new member to do a 'cultural immersion' — 2 weeks working with a different team than they'd normally join\n4. We started a 'founders circle' where original members process the grief of losing the small-co-op feel\n\nGrowth is good. Unmanaged growth is dangerous.",
    coop_size: 'medium',
    coop_industry: 'Technology',
    coop_region: 'West Coast',
    coop_age_years: 3,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 91,
    bookmark_count: 47,
    reply_count: 19,
    tags: ['growth', 'scaling', 'culture', 'values', 'onboarding'],
  },
  {
    category: 'conversion',
    title: 'Converting from a traditional business: what we wish we\'d known',
    body_markdown: "Our founder sold the business to us (the employees) when she retired. Here's what we wish someone had told us:\n\n1. **The legal stuff takes 6 months minimum.** Get a lawyer who knows co-ops. We used the ICA Group and they were worth every dollar.\n2. **Not everyone wants to be an owner.** 3 of 12 employees chose not to buy in. That's OK. They stayed as employees.\n3. **The seller note is your friend.** Our founder financed 60% of the purchase price over 7 years. We couldn't have done it otherwise.\n4. **Culture shock is real.** Going from 'the boss decides' to 'we decide together' is a 6-month adjustment. Budget for facilitation help.\n5. **Start with small decisions.** Our first vote was on what coffee to buy for the break room. It built the muscle for bigger decisions.\n\nTwo years later: best decision we ever made. Revenue is up 20%, turnover is zero, and the founder still comes to our annual dinner.",
    coop_size: 'medium',
    coop_industry: 'Engineering & Manufacturing',
    coop_region: 'Midwest',
    coop_age_years: 2,
    sharing_consent: true,
    anonymized: true,
    helpful_count: 113,
    bookmark_count: 62,
    reply_count: 24,
    tags: ['conversion', 'succession', 'silver-tsunami', 'seller-note', 'transition'],
  },
]

export const INSIGHT_CATEGORIES: Record<InsightCategory, { label: string; description: string }> = {
  governance: { label: 'Governance', description: 'How co-ops make decisions, run meetings, and manage voting' },
  finance: { label: 'Finance', description: 'Patronage, reserves, buy-ins, and financial management' },
  onboarding: { label: 'Onboarding', description: 'How co-ops welcome and train new members' },
  culture: { label: 'Culture', description: 'Building trust, handling diversity, maintaining values' },
  operations: { label: 'Operations', description: 'Day-to-day management, scheduling, client relations' },
  growth: { label: 'Growth', description: 'Scaling, adding members, expanding services' },
  conflict: { label: 'Conflict', description: 'Grievance processes, mediation, difficult conversations' },
  technology: { label: 'Technology', description: 'Tools, software, digital transformation' },
  legal: { label: 'Legal', description: 'Legal structures, compliance, bylaws changes' },
  conversion: { label: 'Conversion', description: 'Transitioning traditional businesses to worker ownership' },
}
