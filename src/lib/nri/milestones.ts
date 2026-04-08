/**
 * NRI Milestone Celebrations
 * Recognizes member achievements with warm, narrative messages.
 * These surface as NRI signals when milestones are reached.
 */

export interface Milestone {
  id: string
  trigger: string // programmatic trigger key
  title: string
  message: string
  category: 'equity' | 'governance' | 'participation' | 'membership' | 'learning'
}

export const MILESTONES: Milestone[] = [
  // ─── Membership ────────────────────────────────────────
  {
    id: 'first_login',
    trigger: 'member.first_login',
    title: 'Welcome to the table',
    message: "You just logged in for the first time. Everything here — the equity, the votes, the committees — belongs to you and your fellow worker-owners. Take your time looking around.",
    category: 'membership',
  },
  {
    id: 'candidacy_start',
    trigger: 'member.candidacy_start',
    title: 'Your journey begins',
    message: "You've started your candidacy. This is the path to full ownership. Complete your training milestones, get to know your mentor, and attend meetings. The co-op is getting to know you too.",
    category: 'membership',
  },
  {
    id: 'candidacy_midpoint',
    trigger: 'member.candidacy_midpoint',
    title: 'Halfway there',
    message: "You're at the midpoint of your candidacy. If you've been showing up, doing the work, and learning the culture — you're exactly where you should be.",
    category: 'membership',
  },
  {
    id: 'full_membership',
    trigger: 'member.full_membership',
    title: 'You are a worker-owner',
    message: "The cooperative voted. You're in. You are now a full member-owner with voting rights, patronage eligibility, and a voice in every major decision. Welcome home.",
    category: 'membership',
  },

  // ─── Equity ────────────────────────────────────────────
  {
    id: 'buyin_25',
    trigger: 'equity.buyin_25_pct',
    title: 'Buy-in: 25% complete',
    message: "A quarter of your buy-in is paid. You're building your ownership stake with every installment.",
    category: 'equity',
  },
  {
    id: 'buyin_50',
    trigger: 'equity.buyin_50_pct',
    title: 'Buy-in: halfway',
    message: "You're halfway through your buy-in. Half of your initial ownership stake is locked in. Keep going.",
    category: 'equity',
  },
  {
    id: 'buyin_complete',
    trigger: 'equity.buyin_complete',
    title: 'Buy-in complete',
    message: "Your buy-in is fully paid. Your ownership foundation is set. From here, every year of patronage adds to your equity.",
    category: 'equity',
  },
  {
    id: 'equity_1000',
    trigger: 'equity.total_1000',
    title: 'Your equity passed $1,000',
    message: "One thousand dollars of real ownership — built through your labor and the cooperative's success.",
    category: 'equity',
  },
  {
    id: 'equity_5000',
    trigger: 'equity.total_5000',
    title: 'Your equity passed $5,000',
    message: "Five thousand dollars in equity. This is wealth that no employer gave you — you built it by working in a business you co-own.",
    category: 'equity',
  },
  {
    id: 'equity_10000',
    trigger: 'equity.total_10000',
    title: 'Your equity passed $10,000',
    message: "Ten thousand dollars. Your cooperative ownership has built real, meaningful wealth. In a regular job, this money would have gone to shareholders.",
    category: 'equity',
  },
  {
    id: 'first_patronage',
    trigger: 'equity.first_patronage',
    title: 'Your first patronage dividend',
    message: "You just received your first share of the cooperative's surplus — earned through your labor, calculated from your hours, voted on by your peers. This is what cooperative ownership feels like.",
    category: 'equity',
  },

  // ─── Governance ────────────────────────────────────────
  {
    id: 'first_vote',
    trigger: 'governance.first_vote',
    title: 'You just voted',
    message: "Your first democratic decision as a worker-owner. Your vote had the same weight as every other member's. That's the point.",
    category: 'governance',
  },
  {
    id: 'first_proposal',
    trigger: 'governance.first_proposal',
    title: 'You proposed something',
    message: "You put an idea forward for the cooperative to decide on together. That's leadership — not top-down, but democratic.",
    category: 'governance',
  },
  {
    id: 'tenth_vote',
    trigger: 'governance.tenth_vote',
    title: '10 votes cast',
    message: "You've participated in 10 cooperative decisions. You're not just a member — you're an active democratic citizen of your workplace.",
    category: 'governance',
  },

  // ─── Participation ─────────────────────────────────────
  {
    id: 'first_committee',
    trigger: 'participation.first_committee',
    title: 'Committee service begins',
    message: "You joined your first committee. This is where the real governance work happens — not in votes, but in the thoughtful preparation that leads to good decisions.",
    category: 'participation',
  },
  {
    id: 'second_committee',
    trigger: 'participation.second_committee',
    title: 'Serving on two committees',
    message: "You're now contributing to two areas of the cooperative's governance. Your perspective across committees helps the co-op see connections others might miss.",
    category: 'participation',
  },
  {
    id: 'one_year',
    trigger: 'participation.one_year',
    title: 'One year as a worker-owner',
    message: "365 days of shared ownership. One year of building equity, casting votes, serving on committees, and proving that workers can own and run their own business.",
    category: 'participation',
  },
  {
    id: 'three_years',
    trigger: 'participation.three_years',
    title: 'Three years',
    message: "Three years of cooperative ownership. You've weathered challenges, celebrated successes, and helped new members find their way — just as someone once helped you.",
    category: 'participation',
  },
  {
    id: 'five_years',
    trigger: 'participation.five_years',
    title: 'Five years of shared ownership',
    message: "Half a decade. You are part of the institutional memory of this cooperative now. The culture you've helped build will outlast any single decision.",
    category: 'participation',
  },

  // ─── Learning ──────────────────────────────────────────
  {
    id: 'first_glossary',
    trigger: 'learning.first_glossary',
    title: 'Learning the language',
    message: "You looked up your first cooperative term. Understanding the language of cooperative economics is the first step to owning it.",
    category: 'learning',
  },
  {
    id: 'first_rehearsal',
    trigger: 'learning.first_rehearsal',
    title: 'Practice makes democracy',
    message: "You completed your first rehearsal vote. Now you know exactly how it feels — and when the real vote comes, you'll be ready.",
    category: 'learning',
  },
  {
    id: 'all_guides_read',
    trigger: 'learning.all_guides',
    title: 'Knowledge complete',
    message: "You've read every guide in the Knowledge Base. You now understand cooperative economics, governance, and operations at a level most people never reach. Share what you know.",
    category: 'learning',
  },
]

export function getMilestone(triggerId: string): Milestone | undefined {
  return MILESTONES.find(m => m.trigger === triggerId)
}

export function getMilestonesByCategory(category: Milestone['category']): Milestone[] {
  return MILESTONES.filter(m => m.category === category)
}
