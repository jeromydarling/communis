/**
 * Knowledge Base — structured learning content for cooperative members.
 * Guides by topic, by role, and by milestone. Written at an 8th-grade reading level.
 */

export interface Guide {
  id: string
  title: string
  subtitle: string
  category: 'topic' | 'role' | 'milestone'
  tags: string[]
  forRoles: string[] // which roles should see this
  readTimeMinutes: number
  sections: GuideSection[]
}

export interface GuideSection {
  heading: string
  body: string
}

export const GUIDES: Guide[] = [
  // ─── Topic Guides ──────────────────────────────────────
  {
    id: 'understanding-equity',
    title: 'Understanding Your Equity',
    subtitle: 'What you own, how it grows, and what happens when you leave',
    category: 'topic',
    tags: ['equity', 'ownership', 'ica'],
    forRoles: ['candidate', 'member', 'coordinator', 'steward'],
    readTimeMinutes: 4,
    sections: [
      {
        heading: 'You own part of this business',
        body: "When you joined this cooperative, you became a co-owner. Not a shareholder in some abstract sense — a real owner of the business you work in every day. Your ownership is tracked in your Internal Capital Account (ICA), which works like a savings account inside the co-op.\n\nYour ICA grows in two ways: your buy-in contributions and your share of the co-op's profits (patronage). Every hour you work, every year you stay, your stake gets bigger.",
      },
      {
        heading: 'Your buy-in',
        body: "Most co-ops ask new members to contribute a buy-in — a set amount of money (often $1,000-$5,000) that represents your initial investment. Think of it like a deposit on an apartment, except you get it back when you leave.\n\nIf you can't pay it all at once, that's fine. Many co-ops let you pay in installments — a little from each paycheck until it's done. The co-op wants you here. The buy-in isn't a barrier, it's a commitment.",
      },
      {
        heading: 'Patronage — your share of profits',
        body: "Every year, if the co-op earns more than it spends, the leftover money is called surplus. In a regular company, surplus goes to shareholders. In your co-op, it goes to the workers.\n\nYour share is based on how much you contributed — usually your hours worked. If you worked 20% of the total hours, you get 20% of the surplus. This is called patronage, and it's one of the most powerful things about cooperative ownership.",
      },
      {
        heading: 'When you leave',
        body: "If you ever leave the cooperative, your equity doesn't disappear. It gets paid back to you over time — usually 3-5 years in installments. This is called revolvement.\n\nThe co-op pays you back gradually so it stays financially healthy, but every dollar you earned through buy-in and patronage comes back to you. You built this wealth through your labor.",
      },
    ],
  },
  {
    id: 'how-governance-works',
    title: 'How Governance Works',
    subtitle: 'Voting, proposals, and making decisions together',
    category: 'topic',
    tags: ['governance', 'voting', 'proposals'],
    forRoles: ['candidate', 'member', 'coordinator', 'steward'],
    readTimeMinutes: 5,
    sections: [
      {
        heading: 'One member, one vote',
        body: "In your cooperative, every member-owner has equal voting power. It doesn't matter if you've been here 10 years or 10 months, if you're the highest-paid or lowest-paid — your vote counts exactly the same.\n\nThis is the heart of cooperative democracy. The people who do the work make the decisions.",
      },
      {
        heading: 'How a proposal works',
        body: "When someone has an idea — buying new equipment, hiring a new member, changing a policy — it becomes a proposal. Here's the typical flow:\n\n1. Someone (or a committee) writes up the proposal\n2. It enters a discussion period where members ask questions and suggest changes\n3. When it's ready, it goes to a vote\n4. Depending on the voting method, it either passes or doesn't\n5. If it passes, the action happens\n\nCommunis connects the vote directly to the outcome — a vote to distribute patronage triggers the patronage engine. A vote to accept a new member starts the onboarding.",
      },
      {
        heading: 'Voting methods',
        body: "Different decisions use different voting methods:\n\n**Majority** — more than half say yes. Quick and simple. Good for everyday decisions.\n\n**Supermajority** — 2/3 or 3/4 say yes. For big decisions like changing bylaws or removing a member.\n\n**Consensus** — everyone agrees, or at least nobody blocks. Takes longer but builds deep buy-in. One person can stop a bad decision.\n\n**Consent** — nobody has a strong objection. Faster than consensus. 'Good enough for now, safe enough to try.'\n\nYour co-op's bylaws specify which method to use for each type of decision. You can practice all of them in the Rehearsal Votes section.",
      },
      {
        heading: 'Committees do the work',
        body: "Not everything goes to a full vote. Committees handle specific areas: Finance manages the budget, Hiring reviews candidates, Operations runs day-to-day decisions.\n\nCommittee service is part of being a member-owner. It's shared labor — everyone takes turns. Communis tracks rotation fairness so no one gets stuck doing all the governance work.",
      },
    ],
  },
  {
    id: 'patronage-explained',
    title: 'Patronage — From Start to Finish',
    subtitle: "How the co-op's profits become your money",
    category: 'topic',
    tags: ['patronage', 'surplus', 'taxes'],
    forRoles: ['member', 'coordinator', 'steward'],
    readTimeMinutes: 5,
    sections: [
      {
        heading: 'Step 1: The co-op earns surplus',
        body: "At the end of each quarter or year, your co-op looks at total revenue minus total expenses. What's left is surplus — the cooperative equivalent of profit. But unlike a regular company, this surplus doesn't go to investors. It goes to you and your fellow worker-owners.",
      },
      {
        heading: 'Step 2: Allocation is calculated',
        body: "Your share of surplus is based on your patronage — usually your hours worked. If 5 members worked a total of 8,000 hours and you worked 1,600 of them, your share is 20%. Communis calculates this automatically from your labor tracking data.\n\nSome co-ops use equal shares or revenue generated instead of hours. Your bylaws decide.",
      },
      {
        heading: 'Step 3: The co-op votes to distribute',
        body: "Patronage distribution is a governance decision. The Finance Committee proposes a distribution, the membership votes on it, and if it passes, the money flows.\n\nThis is where democratic governance and financial operations connect — a vote triggers the actual distribution.",
      },
      {
        heading: 'Step 4: Taxes (not as scary as it sounds)',
        body: "Cooperative patronage has special tax treatment under Subchapter T. Here's the simple version:\n\n**Qualified patronage** (usually 80%) — the co-op deducts it from their taxes, and you report it on yours. You get at least 20% in cash.\n\n**Non-qualified patronage** (usually 20%) — stays in your ICA. The co-op pays tax on it now. When it eventually gets paid out to you, you don't pay tax again.\n\nYou'll get a 1099-PATR form — like a W-2 but for your co-op ownership. Communis generates it automatically.",
      },
    ],
  },

  // ─── Role Guides ───────────────────────────────────────
  {
    id: 'new-candidate-guide',
    title: 'New Candidate Guide',
    subtitle: 'Everything you need to know on your path to membership',
    category: 'role',
    tags: ['candidate', 'onboarding', 'training'],
    forRoles: ['candidate'],
    readTimeMinutes: 4,
    sections: [
      {
        heading: "What it means to be a candidate",
        body: "You're in a candidacy period — a time for you and the co-op to get to know each other. Think of it like a mutual tryout. You're learning if this is right for you, and the co-op is seeing if you're a good fit for ownership.\n\nDuring candidacy, you work and earn wages like everyone else. What you can't do yet: vote, receive patronage, or sit on committees. Those come with full membership.",
      },
      {
        heading: 'What to expect',
        body: "Your candidacy typically lasts 3-6 months. During that time you'll:\n\n• Complete training milestones specific to your co-op\n• Be paired with a mentor — an experienced member who answers your questions\n• Attend meetings (you can observe but not vote)\n• Start your buy-in payments (if your co-op collects them during candidacy)\n\nCommunis tracks your progress and lets you see where you are at any time.",
      },
      {
        heading: 'The membership vote',
        body: "At the end of your candidacy, the hiring committee reviews your progress and recommends you for full membership. Then the full membership votes.\n\nThis isn't a test — if you've completed your milestones and your mentor gives a good review, the vote is usually a celebration, not an exam.\n\nOnce you pass: you're a worker-owner. You can vote. You receive patronage. You belong.",
      },
    ],
  },
  {
    id: 'first-time-voter-guide',
    title: 'First-Time Voter Guide',
    subtitle: 'Your first vote matters — here\'s how to make it count',
    category: 'role',
    tags: ['member', 'governance', 'voting'],
    forRoles: ['member'],
    readTimeMinutes: 3,
    sections: [
      {
        heading: 'Your vote is real power',
        body: "This isn't a suggestion box. When you vote in your cooperative, your vote has the same weight as every other member's — including the founder, the board president, and the person with the most seniority. One member, one vote.\n\nYour cooperative cannot make major decisions without you. That's what quorum means — enough members have to participate for a vote to count.",
      },
      {
        heading: 'Before you vote',
        body: "Read the proposal. Ask questions during the discussion period. Talk to other members. If something is unclear, ask NRI — it knows your co-op's bylaws and can explain anything in plain language.\n\nThere are no dumb questions. The whole point of cooperative governance is that everyone understands what they're deciding.",
      },
      {
        heading: "It's OK to abstain",
        body: "If you genuinely don't know enough to vote, you can abstain. This is different from not showing up — an abstention means 'I'm present but I need more information.' It counts for quorum but not for or against.\n\nIf you're unsure about a voting method (consensus, consent, majority), try a Rehearsal Vote first. Practice makes democracy easier.",
      },
    ],
  },
  {
    id: 'steward-financial-guide',
    title: "Steward's Financial Guide",
    subtitle: 'Understanding the numbers behind the cooperative',
    category: 'role',
    tags: ['steward', 'finance', 'patronage', 'taxes'],
    forRoles: ['steward'],
    readTimeMinutes: 6,
    sections: [
      {
        heading: 'Your financial responsibilities',
        body: "As a steward (board member or officer), you have fiduciary responsibility to the cooperative. This sounds intimidating, but it means three things:\n\n1. **Duty of care** — make informed decisions (read the financials, ask questions)\n2. **Duty of loyalty** — put the co-op's interests ahead of your own\n3. **Duty of obedience** — follow the bylaws\n\nYou don't need an accounting degree. You need to pay attention and ask questions.",
      },
      {
        heading: 'Reading the financial dashboard',
        body: "Communis pulls your financial data from QuickBooks and presents it in cooperative-friendly terms:\n\n**Revenue** — what the co-op earned\n**Expenses** — what it spent (labor is usually 60-80% for service co-ops)\n**Net income** — revenue minus expenses = surplus available for patronage\n**Cash on hand** — how many months of expenses you could cover if revenue stopped\n\nHealthy co-ops keep 2-3 months of operating expenses in reserve.",
      },
      {
        heading: 'Patronage distribution decisions',
        body: "The Finance Committee recommends how much surplus to distribute and how much to retain. Considerations:\n\n• **Member expectations** — workers created this surplus and deserve their share\n• **Reserves** — the co-op needs cash to operate and handle emergencies\n• **Growth** — retained surplus funds equipment, hiring, and expansion\n• **Tax implications** — qualified vs. non-qualified split affects both the co-op and members\n\nCommunis calculates all of this. Your job is to recommend a fair balance.",
      },
    ],
  },

  // ─── Milestone Guides ──────────────────────────────────
  {
    id: 'your-first-week',
    title: 'Your First Week',
    subtitle: "What to explore in Communis during your first few days",
    category: 'milestone',
    tags: ['onboarding', 'getting-started'],
    forRoles: ['candidate', 'member'],
    readTimeMinutes: 2,
    sections: [
      {
        heading: 'Day 1: Look around',
        body: "Start with the Dashboard. It shows your co-op's current state: how many members, total equity, active proposals, and NRI signals. The NRI compass (the green button in the bottom-right) is your guide — ask it anything.\n\nCheck out the Glossary if you see any terms you don't know. Every cooperative term has a plain-language explanation.",
      },
      {
        heading: 'Day 2-3: Learn your numbers',
        body: "Visit the Members section and find your name. See your Member Story page — it shows your equity, your buy-in progress, and your labor hours. This is YOUR ownership, tracked in real time.\n\nIf your co-op has payments set up, check the Payments section to see your buy-in schedule.",
      },
      {
        heading: 'Day 4-5: Try governance',
        body: "Visit Rehearsal Votes and practice casting a vote. Try all four voting methods to see how they feel. This is how you'll participate in real decisions.\n\nCheck the Governance page to see any active proposals. Read them even if you can't vote yet — understanding the process is half the learning.",
      },
    ],
  },
]

export function getGuidesForRole(role: string): Guide[] {
  return GUIDES.filter(g => g.forRoles.includes(role))
}

export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return GUIDES.filter(g => g.category === category)
}
