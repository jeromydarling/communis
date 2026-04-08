/**
 * NRI Cooperative Education — plain-language glossary with analogies.
 * Every cooperative term explained like you're talking to a friend
 * who just got invited to join a co-op and has no idea what any of this means.
 */

export interface GlossaryEntry {
  term: string
  simple: string // one-sentence plain English
  analogy: string // relatable analogy
  detail: string // slightly longer explanation
  related: string[] // related terms
  forRole: 'everyone' | 'candidate' | 'member' | 'steward' // who needs this most
}

export const COOPERATIVE_GLOSSARY: GlossaryEntry[] = [
  // ─── Ownership & Equity ────────────────────────────────
  {
    term: 'Worker-Owner',
    simple: 'You own part of the business you work at.',
    analogy: 'Imagine if every employee at your job also owned a piece of the company — like everyone in the band owns the band, not just the manager.',
    detail: 'In a worker cooperative, the people who do the work also own the business. You\'re not just an employee — you\'re a co-owner with a real stake and a real vote.',
    related: ['Buy-In', 'Equity', 'Member'],
    forRole: 'everyone',
  },
  {
    term: 'Buy-In',
    simple: 'The money you pay to become an owner.',
    analogy: 'Think of it like buying into a poker game. You put money in to sit at the table and have a stake. Except here, you can pay over time and you get it back when you leave.',
    detail: 'When you join a cooperative, you contribute a set amount (like $2,000) either all at once or in installments from your paycheck. This is your ownership stake. When you leave the co-op, your equity — including your buy-in — gets paid back to you over time.',
    related: ['Equity', 'Revolvement', 'Internal Capital Account'],
    forRole: 'candidate',
  },
  {
    term: 'Equity',
    simple: 'Your ownership share — how much of the co-op belongs to you.',
    analogy: 'Like equity in a house. The longer you live there and pay in, the more of it is yours. Your equity in the co-op grows every year you work.',
    detail: 'Your equity is the total value of your ownership stake: your original buy-in plus your accumulated share of the co-op\'s profits (patronage). It\'s real money that belongs to you.',
    related: ['Buy-In', 'Patronage', 'Internal Capital Account'],
    forRole: 'everyone',
  },
  {
    term: 'Internal Capital Account (ICA)',
    simple: 'Your personal equity bank account inside the co-op.',
    analogy: 'Like a savings account that the co-op keeps for you. Your buy-in goes in, your share of profits gets added each year, and when you leave, it gets paid out to you.',
    detail: 'Every member has an ICA that tracks their total equity: buy-in contributions, patronage allocations, and any payouts. It\'s the financial record of your ownership.',
    related: ['Equity', 'Buy-In', 'Patronage', 'Revolvement'],
    forRole: 'member',
  },
  {
    term: 'Revolvement',
    simple: 'Getting your money back when you leave the co-op.',
    analogy: 'Like cashing out your chips when you leave the table. You don\'t get it all at once — it comes in installments over a few years so the co-op stays healthy.',
    detail: 'When a member departs, their equity is "revolved out" — paid back in installments (typically over 3-5 years) per the bylaws. This protects the co-op from having to pay a large lump sum while honoring the departing member\'s ownership.',
    related: ['Equity', 'Internal Capital Account', 'Bylaws'],
    forRole: 'member',
  },

  // ─── Money & Profits ───────────────────────────────────
  {
    term: 'Surplus',
    simple: 'The money left over after all the bills are paid.',
    analogy: 'If your household earned $5,000 this month and spent $4,000 on rent, food, and bills, the $1,000 left over is your surplus. In a co-op, that surplus gets shared among the worker-owners.',
    detail: 'In a regular company, leftover profits go to shareholders or the owner. In a cooperative, surplus is distributed to the workers who created it — proportional to their labor contribution.',
    related: ['Patronage', 'Patronage Dividend'],
    forRole: 'everyone',
  },
  {
    term: 'Patronage',
    simple: 'Your share of the co-op\'s profits, based on how much you worked.',
    analogy: 'Imagine splitting a pizza based on who helped make it. If you made half the pizzas, you get half the share. Your hours worked = your slice of the surplus.',
    detail: 'Patronage is how cooperatives distribute surplus. Most worker co-ops calculate it based on hours worked: if you worked 20% of the total hours, you get 20% of the surplus. Some co-ops use revenue generated or equal shares instead.',
    related: ['Surplus', 'Patronage Dividend', 'Qualified Patronage'],
    forRole: 'everyone',
  },
  {
    term: 'Patronage Dividend',
    simple: 'The actual payment you receive from your share of profits.',
    analogy: 'Like a bonus at the end of the year — except it\'s not a gift from the boss. It\'s YOUR share of the profits that YOU helped create.',
    detail: 'After the co-op calculates each member\'s patronage share, the dividend is either paid out in cash, credited to your ICA, or a mix of both. The split between cash and retained equity is governed by your bylaws and tax law (Subchapter T).',
    related: ['Patronage', 'Surplus', 'Qualified Patronage', 'Non-Qualified Patronage'],
    forRole: 'member',
  },
  {
    term: 'Qualified Patronage',
    simple: 'The part of your patronage dividend that gets taxed this year.',
    analogy: 'Think of it like your regular paycheck — it shows up and you pay taxes on it now. The co-op gives you at least 20% in cash, and you report the full amount on your taxes.',
    detail: 'Under Subchapter T of the tax code, qualified patronage is deductible by the co-op and taxable to the member in the year it\'s allocated. At least 20% must be paid in cash. The rest can be retained in your ICA.',
    related: ['Non-Qualified Patronage', 'Subchapter T', '1099-PATR'],
    forRole: 'steward',
  },
  {
    term: 'Non-Qualified Patronage',
    simple: 'The part of your patronage that stays in the co-op and gets taxed later.',
    analogy: 'Like money your employer puts into a retirement account for you. It\'s yours, but you don\'t pay taxes on it until you actually get it.',
    detail: 'Non-qualified patronage is allocated to your ICA but taxed to the co-op now and to you when it\'s eventually paid out. Co-ops use a mix of qualified and non-qualified to balance member cash flow with the co-op\'s capital needs.',
    related: ['Qualified Patronage', 'Subchapter T'],
    forRole: 'steward',
  },
  {
    term: 'Subchapter T',
    simple: 'The tax rules that let co-ops share profits without double-taxing them.',
    analogy: 'Normally, a company pays taxes on profits, then you pay taxes when you get paid. Subchapter T says: if a co-op distributes profits to workers based on their work, it only gets taxed once.',
    detail: 'Subchapter T of the Internal Revenue Code governs how cooperatives are taxed. It allows co-ops to deduct patronage dividends from their taxable income, avoiding the double taxation that regular corporations face. This is one of the key financial advantages of the cooperative structure.',
    related: ['Qualified Patronage', '1099-PATR'],
    forRole: 'steward',
  },
  {
    term: '1099-PATR',
    simple: 'The tax form you get showing your patronage dividends for the year.',
    analogy: 'Like a W-2 but for your co-op ownership. It tells the IRS how much you received in patronage dividends so you can report it on your taxes.',
    detail: 'Co-ops issue 1099-PATR forms to each member showing their qualified patronage dividends. Members report this on their personal tax returns. Communis generates these automatically from your patronage data.',
    related: ['Patronage Dividend', 'Subchapter T'],
    forRole: 'steward',
  },

  // ─── Governance ────────────────────────────────────────
  {
    term: 'Proposal',
    simple: 'An idea someone puts forward for the co-op to decide on together.',
    analogy: 'Like when someone in a friend group says "Hey, should we go to the beach or the mountains?" — except the group votes on it formally.',
    detail: 'Any member (or committee) can propose something: hiring a new member, distributing surplus, buying equipment, changing a policy. The proposal goes through discussion, then voting.',
    related: ['Vote', 'Quorum', 'Committee'],
    forRole: 'everyone',
  },
  {
    term: 'Majority Vote',
    simple: 'More than half say yes, it passes.',
    analogy: 'Like choosing a restaurant with friends — if 3 out of 5 want tacos, you\'re getting tacos.',
    detail: 'The simplest voting method. More than 50% of votes cast must be "yes" for the proposal to pass. Quick and decisive, but minorities can feel overruled.',
    related: ['Supermajority', 'Consensus', 'Consent'],
    forRole: 'everyone',
  },
  {
    term: 'Supermajority',
    simple: 'A bigger-than-normal majority — usually 2/3 or 3/4 must agree.',
    analogy: 'Like needing not just most of your friends to agree, but almost all of them. Used for big decisions where you want strong agreement.',
    detail: 'Typically requires 2/3 (67%) or 3/4 (75%) approval. Co-ops use supermajority for major decisions: changing bylaws, large expenditures, removing a member. Harder to pass, but the result carries more legitimacy.',
    related: ['Majority Vote', 'Quorum'],
    forRole: 'member',
  },
  {
    term: 'Consensus',
    simple: 'Everyone has to agree — or at least no one blocks it.',
    analogy: 'Like a road trip where you only go somewhere everyone\'s at least OK with. One person saying "absolutely not" stops it. Takes longer but everyone feels heard.',
    detail: 'In consensus decision-making, the goal is a decision everyone can live with. Members can "stand aside" (disagree but not block) or "block" (prevent the decision). Blocking should be rare and reserved for principled objections.',
    related: ['Consent', 'Block'],
    forRole: 'member',
  },
  {
    term: 'Consent',
    simple: 'Nobody objects enough to block it — it\'s "good enough for now, safe enough to try."',
    analogy: 'Instead of asking "Does everyone love this idea?" you ask "Can anyone NOT live with this?" If nobody objects, you move forward.',
    detail: 'Consent-based decision making (from sociocracy) is faster than consensus. The bar isn\'t "everyone agrees" — it\'s "nobody has a paramount objection." This lets co-ops move faster while still respecting every voice.',
    related: ['Consensus', 'Majority Vote'],
    forRole: 'member',
  },
  {
    term: 'Quorum',
    simple: 'The minimum number of people who need to show up for a vote to count.',
    analogy: 'Like needing at least 3 of 5 roommates present to make a house decision. If only 2 show up, you can\'t decide anything official.',
    detail: 'Quorum prevents a small group from making decisions for everyone. Most co-ops set quorum at 50% of members. If quorum isn\'t met, the meeting can discuss but can\'t vote.',
    related: ['Vote', 'Proposal'],
    forRole: 'everyone',
  },
  {
    term: 'Block',
    simple: 'Saying "I can\'t allow this" in a consensus vote — it stops the decision.',
    analogy: 'Like a veto. One person can stop a decision if they have a serious, principled reason. Not "I don\'t like it" but "this would cause real harm."',
    detail: 'In consensus decision-making, a block is a last resort. It means "this decision violates our core values or would seriously harm the cooperative." Blocks should be rare. If someone blocks, the group must address their concern before moving forward.',
    related: ['Consensus', 'Consent'],
    forRole: 'member',
  },

  // ─── Structure ─────────────────────────────────────────
  {
    term: 'Bylaws',
    simple: 'The rulebook your co-op wrote for itself.',
    analogy: 'Like house rules. "Dishes go in the dishwasher. Quiet hours after 10pm." Except these rules cover how you vote, share profits, and make big decisions.',
    detail: 'Bylaws are the legal governing document of your cooperative. They define: how members join and leave, how profits are shared, how votes work, what committees exist, and how the bylaws themselves can be changed. They\'re a living document — the co-op can amend them.',
    related: ['Proposal', 'Vote', 'Committee'],
    forRole: 'everyone',
  },
  {
    term: 'Committee',
    simple: 'A small group of members responsible for a specific area.',
    analogy: 'Like dividing up household chores. The "kitchen committee" handles food. The "finance committee" handles bills. Everyone serves on at least one.',
    detail: 'Committees distribute governance work so not everything goes to a full member vote. Common committees: Finance (budgets, patronage), Hiring (recruitment, onboarding), Operations (day-to-day), Board (strategic oversight).',
    related: ['Rotation', 'Bylaws'],
    forRole: 'everyone',
  },
  {
    term: 'Candidacy Period',
    simple: 'A trial period before you become a full member-owner.',
    analogy: 'Like dating before marriage. You work at the co-op, learn the culture, complete training — and the co-op gets to know you. Then everyone votes on whether to make it official.',
    detail: 'Most co-ops have a 3-12 month candidacy period. Candidates work and earn wages but can\'t vote or receive patronage. They complete training milestones and are mentored by an existing member. At the end, the membership votes on acceptance.',
    related: ['Buy-In', 'Member', 'Mentor'],
    forRole: 'candidate',
  },
  {
    term: 'Pay Ratio',
    simple: 'The difference between the highest and lowest paid person in the co-op.',
    analogy: 'In a regular company, the CEO might make 300x the janitor. In a co-op, the highest-paid person might make 2x the lowest. That\'s the ratio.',
    detail: 'Most worker cooperatives maintain a maximum pay ratio between 2:1 and 5:1. This means the highest-paid member earns no more than 2-5 times the lowest-paid. The average US corporation has a ratio of 303:1. Co-ops prove you can run a successful business with fairness.',
    related: ['Bylaws', 'Surplus'],
    forRole: 'everyone',
  },

  // ─── NRI & Communis ────────────────────────────────────
  {
    term: 'NRI',
    simple: 'Communis\'s way of noticing what\'s happening in your co-op and gently pointing it out.',
    analogy: 'Like a thoughtful friend who says "Hey, I noticed the hiring committee hasn\'t met in a while — everything OK?" Not nagging. Just noticing.',
    detail: 'NRI (Narrative Relational Intelligence) follows a simple rhythm: Recognize what\'s changing, Synthesize scattered signals into a coherent picture, and Prioritize the next small step. It\'s rule-based, not AI that decides for you.',
    related: ['Signal', 'Compass'],
    forRole: 'everyone',
  },
  {
    term: 'Rehearsal Vote',
    simple: 'A practice vote that doesn\'t count — so you can learn how voting works.',
    analogy: 'Like a fire drill. You go through all the steps of voting so that when it\'s real, everyone knows what to do.',
    detail: 'Rehearsal votes let your co-op practice democratic decision-making without real consequences. Try different voting methods, test quorum levels, train new members. Results are visible but don\'t trigger any outcomes.',
    related: ['Vote', 'Proposal', 'Quorum'],
    forRole: 'everyone',
  },
]

/**
 * Find glossary entries by term or related terms.
 */
export function findGlossaryEntry(term: string): GlossaryEntry | undefined {
  return COOPERATIVE_GLOSSARY.find(
    e => e.term.toLowerCase() === term.toLowerCase()
  )
}

/**
 * Get glossary entries appropriate for a given role.
 * Returns all 'everyone' entries plus role-specific ones.
 */
export function getGlossaryForRole(role: string): GlossaryEntry[] {
  const roleHierarchy: Record<string, string[]> = {
    candidate: ['everyone', 'candidate'],
    member: ['everyone', 'candidate', 'member'],
    coordinator: ['everyone', 'candidate', 'member', 'steward'],
    steward: ['everyone', 'candidate', 'member', 'steward'],
    advisor: ['everyone', 'candidate', 'member', 'steward'],
    gardener: ['everyone', 'candidate', 'member', 'steward'],
  }
  const allowed = roleHierarchy[role] || ['everyone']
  return COOPERATIVE_GLOSSARY.filter(e => allowed.includes(e.forRole))
}

/**
 * Get a random "did you know" entry for the NRI compass.
 */
export function getRandomEducation(role: string): GlossaryEntry {
  const entries = getGlossaryForRole(role)
  return entries[Math.floor(Math.random() * entries.length)]
}
