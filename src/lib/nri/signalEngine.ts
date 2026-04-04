/**
 * NRI Signal Engine — rule-based cooperative health detection.
 * Adapted from CROS: entirely deterministic, no AI.
 * AI is used only downstream for phrasing.
 */

import type { SignalType, SignalSeverity } from '@/types'

export interface SignalRule {
  id: string
  name: string
  type: SignalType
  evaluate: (context: CoopContext) => SignalResult | null
}

export interface SignalResult {
  type: SignalType
  severity: SignalSeverity
  message: string
  detail: string
  source_rule: string
}

export interface CoopContext {
  memberCount: number
  candidateCount: number
  activeProposals: number
  pendingVotes: number
  committeesWithoutQuorum: string[]
  daysSinceLastMeeting: Record<string, number>
  memberEquityImbalanceRatio: number // max/min ratio
  participationRate30d: number // 0-1
  duesDelinquentCount: number
  buyInOverdueCount: number
  patronagePending: boolean
  daysSinceLastPatronage: number
}

export const SIGNAL_RULES: SignalRule[] = [
  {
    id: 'quorum_at_risk',
    name: 'Quorum at Risk',
    type: 'governance',
    evaluate: (ctx) => {
      if (ctx.pendingVotes > 0 && ctx.participationRate30d < 0.6) {
        return {
          type: 'governance', severity: 'notable',
          message: 'Quorum may be at risk for pending votes',
          detail: `${ctx.pendingVotes} proposal(s) awaiting votes. Recent participation rate is ${Math.round(ctx.participationRate30d * 100)}%.`,
          source_rule: 'quorum_at_risk',
        }
      }
      return null
    },
  },
  {
    id: 'committee_dormant',
    name: 'Committee Dormant',
    type: 'participation',
    evaluate: (ctx) => {
      const dormant = Object.entries(ctx.daysSinceLastMeeting)
        .filter(([_, days]) => days > 21)
        .map(([name]) => name)
      if (dormant.length > 0) {
        return {
          type: 'participation', severity: 'gentle',
          message: `${dormant.join(', ')} hasn't met in over 3 weeks`,
          detail: 'Consider scheduling a meeting to keep governance momentum.',
          source_rule: 'committee_dormant',
        }
      }
      return null
    },
  },
  {
    id: 'equity_imbalance',
    name: 'Equity Imbalance Growing',
    type: 'equity',
    evaluate: (ctx) => {
      if (ctx.memberEquityImbalanceRatio > 5) {
        return {
          type: 'equity', severity: 'notable',
          message: 'Member equity imbalance is growing',
          detail: `The highest member equity is ${ctx.memberEquityImbalanceRatio.toFixed(1)}× the lowest. This is normal in co-ops with long-tenured and new members, but worth monitoring.`,
          source_rule: 'equity_imbalance',
        }
      }
      return null
    },
  },
  {
    id: 'patronage_overdue',
    name: 'Patronage Distribution Overdue',
    type: 'equity',
    evaluate: (ctx) => {
      if (ctx.patronagePending && ctx.daysSinceLastPatronage > 180) {
        return {
          type: 'equity', severity: 'notable',
          message: 'Patronage distribution is overdue',
          detail: `It's been ${ctx.daysSinceLastPatronage} days since the last patronage distribution. Members may be wondering about their share.`,
          source_rule: 'patronage_overdue',
        }
      }
      return null
    },
  },
  {
    id: 'participation_strong',
    name: 'Participation Strong',
    type: 'wellbeing',
    evaluate: (ctx) => {
      if (ctx.participationRate30d > 0.85 && ctx.committeesWithoutQuorum.length === 0) {
        return {
          type: 'wellbeing', severity: 'gentle',
          message: 'Participation has been strong this quarter',
          detail: 'All committees are meeting regularly and governance participation is high. The cooperative is healthy.',
          source_rule: 'participation_strong',
        }
      }
      return null
    },
  },
  {
    id: 'dues_delinquent',
    name: 'Dues Delinquent',
    type: 'operational',
    evaluate: (ctx) => {
      if (ctx.duesDelinquentCount > 0) {
        return {
          type: 'operational', severity: ctx.duesDelinquentCount > 2 ? 'notable' : 'gentle',
          message: `${ctx.duesDelinquentCount} member(s) have overdue dues`,
          detail: 'Reach out personally before escalating. There may be circumstances the co-op should know about.',
          source_rule: 'dues_delinquent',
        }
      }
      return null
    },
  },
  {
    id: 'buy_in_progress',
    name: 'Buy-In Progress',
    type: 'equity',
    evaluate: (ctx) => {
      if (ctx.buyInOverdueCount > 0) {
        return {
          type: 'equity', severity: 'gentle',
          message: `${ctx.buyInOverdueCount} member(s) behind on buy-in schedule`,
          detail: 'Check in with them — the cooperative should be flexible when members face financial difficulty.',
          source_rule: 'buy_in_progress',
        }
      }
      return null
    },
  },
]

export function evaluateSignals(context: CoopContext): SignalResult[] {
  return SIGNAL_RULES
    .map(rule => rule.evaluate(context))
    .filter((result): result is SignalResult => result !== null)
    .sort((a, b) => {
      const severityOrder = { urgent: 0, notable: 1, gentle: 2 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })
}
