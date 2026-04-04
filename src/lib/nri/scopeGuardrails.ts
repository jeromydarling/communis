/**
 * NRI Scope Guardrails — client-side message pre-screening for the compass.
 * Adapted from CROS pattern. Blocks off-topic, crisis, and professional advice queries.
 * Routes cooperative questions through role-scoped knowledge access.
 */

export interface ScopeCheckResult {
  allowed: boolean
  reason: string
  gentleResponse: string | null
}

const CRISIS_PATTERNS = [
  /suicid/i, /kill\s*(my)?self/i, /self.?harm/i, /want\s+to\s+die/i,
  /abuse/i, /domestic\s+violence/i, /addiction/i, /overdose/i,
]

const PROFESSIONAL_ADVICE_PATTERNS = [
  /legal\s+advice/i, /tax\s+advice/i, /should\s+i\s+sue/i,
  /medical\s+advice/i, /diagnos/i, /prescri/i,
  /investment\s+advice/i, /financial\s+planning/i,
]

const OFF_TOPIC_PATTERNS = [
  /write\s+(me\s+)?a\s+poem/i, /tell\s+(me\s+)?a\s+joke/i,
  /help\s+me\s+code/i, /write\s+code/i, /debug/i,
  /pretend\s+you/i, /roleplay/i, /ignore\s+previous/i,
  /what\s+is\s+the\s+meaning\s+of\s+life/i,
]

export function checkNriScope(message: string): ScopeCheckResult {
  // Crisis detection — compassionate redirect
  for (const pattern of CRISIS_PATTERNS) {
    if (pattern.test(message)) {
      return {
        allowed: false,
        reason: 'crisis_detected',
        gentleResponse: 'I\'m not equipped to help with this, but people who are trained for exactly this are available right now. Please reach out to the 988 Suicide & Crisis Lifeline (call or text 988) or the Crisis Text Line (text HOME to 741741).',
      }
    }
  }

  // Professional advice — redirect to appropriate professional
  for (const pattern of PROFESSIONAL_ADVICE_PATTERNS) {
    if (pattern.test(message)) {
      return {
        allowed: false,
        reason: 'professional_advice',
        gentleResponse: 'That\'s an important question, but I\'m not qualified to give professional advice. Your cooperative should consult with a qualified professional — a lawyer, accountant, or financial advisor who understands cooperative structures. The ICA Group and DAWI can recommend cooperative-friendly professionals.',
      }
    }
  }

  // Off-topic — gentle redirect to cooperative domain
  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(message)) {
      return {
        allowed: false,
        reason: 'off_topic',
        gentleResponse: 'I\'m here to help with your cooperative — member equity, governance, patronage, bylaws, and the health of your co-op. What would you like to know about your cooperative?',
      }
    }
  }

  return { allowed: true, reason: 'in_scope', gentleResponse: null }
}

/**
 * Role-scoped knowledge boundaries.
 * Determines what cooperative data NRI can reference when answering questions.
 */
export interface KnowledgeBoundary {
  canAccessOwnEquity: boolean
  canAccessAllEquity: boolean
  canAccessFinancials: boolean
  canAccessGovernanceHistory: boolean
  canAccessMeetingMinutes: boolean
  canAccessMemberDetails: boolean
  canAccessBylaws: boolean
  canAccessPatronageDetails: boolean
}

export function getKnowledgeBoundary(role: string, visibilityRules?: Record<string, boolean>): KnowledgeBoundary {
  const rules = visibilityRules || {}

  switch (role) {
    case 'candidate':
      return {
        canAccessOwnEquity: true,
        canAccessAllEquity: false,
        canAccessFinancials: rules.candidates_can_see_financials ?? false,
        canAccessGovernanceHistory: true,
        canAccessMeetingMinutes: rules.candidates_can_see_meeting_minutes ?? true,
        canAccessMemberDetails: false,
        canAccessBylaws: true,
        canAccessPatronageDetails: false,
      }
    case 'member':
      return {
        canAccessOwnEquity: true,
        canAccessAllEquity: rules.members_can_see_all_equity ?? false,
        canAccessFinancials: true,
        canAccessGovernanceHistory: true,
        canAccessMeetingMinutes: true,
        canAccessMemberDetails: false,
        canAccessBylaws: true,
        canAccessPatronageDetails: true,
      }
    case 'coordinator':
    case 'steward':
    case 'gardener':
      return {
        canAccessOwnEquity: true,
        canAccessAllEquity: true,
        canAccessFinancials: true,
        canAccessGovernanceHistory: true,
        canAccessMeetingMinutes: true,
        canAccessMemberDetails: true,
        canAccessBylaws: true,
        canAccessPatronageDetails: true,
      }
    case 'advisor':
      return {
        canAccessOwnEquity: false,
        canAccessAllEquity: true,
        canAccessFinancials: true,
        canAccessGovernanceHistory: true,
        canAccessMeetingMinutes: true,
        canAccessMemberDetails: false,
        canAccessBylaws: true,
        canAccessPatronageDetails: true,
      }
    default:
      return {
        canAccessOwnEquity: false, canAccessAllEquity: false, canAccessFinancials: false,
        canAccessGovernanceHistory: false, canAccessMeetingMinutes: false,
        canAccessMemberDetails: false, canAccessBylaws: false, canAccessPatronageDetails: false,
      }
  }
}
