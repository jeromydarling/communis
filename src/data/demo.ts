// Demo data for Evergreen Workers Co-op — a fictional cleaning cooperative

export interface Member {
  id: string
  name: string
  initials: string
  role: string
  joinedDate: string
  status: 'candidate' | 'active' | 'on-leave' | 'departed'
  equity: number
  buyInPaid: number
  buyInTotal: number
  hoursThisYear: number
  committees: string[]
  story: string
}

export interface Proposal {
  id: string
  title: string
  type: 'hiring' | 'financial' | 'policy' | 'operational'
  status: 'discussion' | 'voting' | 'passed' | 'failed'
  proposedBy: string
  date: string
  votingMethod: 'consensus' | 'majority' | 'supermajority'
  votesFor: number
  votesAgainst: number
  votesAbstain: number
  totalEligible: number
  description: string
}

export interface NRISignal {
  id: string
  type: 'participation' | 'equity' | 'governance' | 'wellbeing'
  severity: 'gentle' | 'notable' | 'urgent'
  message: string
  detail: string
  date: string
}

export const members: Member[] = [
  {
    id: '1',
    name: 'María Reyes',
    initials: 'MR',
    role: 'Board President',
    joinedDate: '2019-03-15',
    status: 'active',
    equity: 12480,
    buyInPaid: 2000,
    buyInTotal: 2000,
    hoursThisYear: 1640,
    committees: ['Board', 'Finance'],
    story: 'María was one of the founding members. She led the conversion from a traditional cleaning company, negotiating the buyout terms and drafting the original bylaws. Now in her fifth year as board president, she mentors new candidates and represents Evergreen at USFWC conferences.',
  },
  {
    id: '2',
    name: 'James Okonkwo',
    initials: 'JO',
    role: 'Operations Lead',
    joinedDate: '2020-01-10',
    status: 'active',
    equity: 8920,
    buyInPaid: 2000,
    buyInTotal: 2000,
    hoursThisYear: 1580,
    committees: ['Operations', 'Hiring'],
    story: 'James joined during the pandemic when Evergreen pivoted to sanitization services. His background in logistics helped the co-op scale without losing its culture. He chairs the operations committee and is training two new members.',
  },
  {
    id: '3',
    name: 'Ana Lucía Vega',
    initials: 'AV',
    role: 'Member-Owner',
    joinedDate: '2021-06-01',
    status: 'active',
    equity: 5340,
    buyInPaid: 1500,
    buyInTotal: 2000,
    hoursThisYear: 1720,
    committees: ['Hiring', 'Training'],
    story: 'Ana Lucía came to Evergreen through a DAWI-trained cooperative developer. She completed her candidacy in record time and has the highest hours this year. She leads the Spanish-language onboarding track for new candidates.',
  },
  {
    id: '4',
    name: 'David Chen',
    initials: 'DC',
    role: 'Finance Committee',
    joinedDate: '2021-09-15',
    status: 'active',
    equity: 4780,
    buyInPaid: 2000,
    buyInTotal: 2000,
    hoursThisYear: 1490,
    committees: ['Finance'],
    story: 'David brought bookkeeping experience from his previous job. He manages the QuickBooks integration and has been advocating for better financial tools — which is partly why Evergreen is piloting Communis.',
  },
  {
    id: '5',
    name: 'Fatima Hassan',
    initials: 'FH',
    role: 'Member-Owner',
    joinedDate: '2022-03-01',
    status: 'active',
    equity: 3210,
    buyInPaid: 1200,
    buyInTotal: 2000,
    hoursThisYear: 1550,
    committees: ['Operations'],
    story: 'Fatima was referred by a community organization. Her candidacy included a mentorship from María. She has become one of the most reliable team leads and recently expressed interest in joining the board.',
  },
  {
    id: '6',
    name: 'Roberto Sandoval',
    initials: 'RS',
    role: 'Candidate',
    joinedDate: '2024-11-01',
    status: 'candidate',
    equity: 0,
    buyInPaid: 400,
    buyInTotal: 2000,
    hoursThisYear: 320,
    committees: [],
    story: 'Roberto is in his third month of candidacy. He works the evening shift and is completing his training milestones. His mentor is James. The hiring committee will review his membership application next quarter.',
  },
  {
    id: '7',
    name: 'Karen Whitfield',
    initials: 'KW',
    role: 'Former Member',
    joinedDate: '2019-03-15',
    status: 'departed',
    equity: 0,
    buyInPaid: 2000,
    buyInTotal: 2000,
    hoursThisYear: 0,
    committees: [],
    story: 'Karen was a founding member who departed in 2023 to care for family. Her equity of $9,400 is being revolved over 3 years per the bylaws. She remains a friend of the co-op and attends the annual celebration.',
  },
]

export const proposals: Proposal[] = [
  {
    id: '1',
    title: 'Approve Q4 2024 Patronage Distribution',
    type: 'financial',
    status: 'voting',
    proposedBy: 'Finance Committee',
    date: '2025-01-15',
    votingMethod: 'majority',
    votesFor: 3,
    votesAgainst: 0,
    votesAbstain: 1,
    totalEligible: 5,
    description: 'Distribute $18,400 in surplus from Q4 based on hours worked. 80% qualified, 20% non-qualified per our Subchapter T election.',
  },
  {
    id: '2',
    title: 'Accept Roberto Sandoval as Member-Owner',
    type: 'hiring',
    status: 'discussion',
    proposedBy: 'Hiring Committee',
    date: '2025-02-01',
    votingMethod: 'consensus',
    votesFor: 0,
    votesAgainst: 0,
    votesAbstain: 0,
    totalEligible: 5,
    description: 'Roberto has completed 4 of 5 training milestones and received positive reviews from his mentor and team leads. Hiring committee recommends advancing to full membership vote.',
  },
  {
    id: '3',
    title: 'Update Grievance Policy Section 4.2',
    type: 'policy',
    status: 'passed',
    proposedBy: 'María Reyes',
    date: '2024-12-10',
    votingMethod: 'supermajority',
    votesFor: 5,
    votesAgainst: 0,
    votesAbstain: 0,
    totalEligible: 5,
    description: 'Amend grievance timeline from 30 to 45 days and add optional mediation step before formal hearing.',
  },
  {
    id: '4',
    title: 'Purchase New Floor Equipment ($4,200)',
    type: 'operational',
    status: 'passed',
    proposedBy: 'Operations Committee',
    date: '2024-11-28',
    votingMethod: 'majority',
    votesFor: 4,
    votesAgainst: 1,
    votesAbstain: 0,
    totalEligible: 5,
    description: 'Replace aging floor scrubber. Three quotes obtained. Operations committee recommends EcoClean Pro model.',
  },
]

export const nriSignals: NRISignal[] = [
  {
    id: '1',
    type: 'participation',
    severity: 'gentle',
    message: 'The hiring committee hasn\'t met in 3 weeks',
    detail: 'With Roberto\'s membership review approaching, the committee may want to schedule before the Q1 general meeting.',
    date: '2025-01-20',
  },
  {
    id: '2',
    type: 'equity',
    severity: 'notable',
    message: 'Ana Lucía\'s buy-in is 75% complete',
    detail: 'She has $500 remaining on her buy-in schedule. At her current payroll deduction rate, she\'ll complete it by April.',
    date: '2025-01-18',
  },
  {
    id: '3',
    type: 'governance',
    severity: 'gentle',
    message: 'Patronage vote needs one more voice',
    detail: 'The Q4 distribution proposal has 4 of 5 eligible votes. David hasn\'t voted yet.',
    date: '2025-01-16',
  },
  {
    id: '4',
    type: 'wellbeing',
    severity: 'gentle',
    message: 'Participation has been strong this quarter',
    detail: 'All 5 active members have attended at least one committee meeting. General meeting quorum has been met 3 months running.',
    date: '2025-01-15',
  },
]

export const coopStats = {
  totalMembers: 5,
  candidates: 1,
  totalEquity: 34730,
  collectiveReserve: 28500,
  annualRevenue: 420000,
  surplusToDistribute: 18400,
  avgHourlyWage: 22.50,
  payRatio: '1.3:1',
  survivalYears: 6,
}
