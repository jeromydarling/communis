/**
 * Notification System — types and dispatcher scaffold.
 * Handles in-app, email digest, and push notifications.
 */

export type NotificationChannel = 'in_app' | 'email' | 'push'
export type NotificationCategory = 'governance' | 'financial' | 'membership' | 'nri_signal' | 'system'
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface Notification {
  id: string
  tenant_id: string
  recipient_member_id: string
  category: NotificationCategory
  priority: NotificationPriority
  title: string
  body: string
  action_url: string | null
  channels: NotificationChannel[]
  read_at: string | null
  sent_at: string
  created_at: string
}

export interface NotificationPreferences {
  member_id: string
  governance_votes: NotificationChannel[]
  governance_decisions: NotificationChannel[]
  financial_patronage: NotificationChannel[]
  financial_dues: NotificationChannel[]
  membership_changes: NotificationChannel[]
  nri_signals: NotificationChannel[]
  email_digest_frequency: 'realtime' | 'daily' | 'weekly' | 'never'
}

export const DEFAULT_PREFERENCES: NotificationPreferences = {
  member_id: '',
  governance_votes: ['in_app', 'email'],
  governance_decisions: ['in_app', 'email'],
  financial_patronage: ['in_app', 'email'],
  financial_dues: ['in_app'],
  membership_changes: ['in_app', 'email'],
  nri_signals: ['in_app'],
  email_digest_frequency: 'daily',
}

/**
 * Template for notification messages.
 * These get localized through the i18n system.
 */
export const NOTIFICATION_TEMPLATES: Record<string, { title: string; body: string }> = {
  'governance.vote_open': {
    title: 'New proposal: {{proposalTitle}}',
    body: 'A new {{votingMethod}} vote is open. {{daysRemaining}} days to cast your vote.',
  },
  'governance.vote_passed': {
    title: '{{proposalTitle}} — Passed',
    body: 'The proposal passed {{votesFor}}-{{votesAgainst}}. {{outcomeDescription}}',
  },
  'financial.patronage_distributed': {
    title: 'Patronage distributed: ${{amount}}',
    body: 'Your share of the {{period}} surplus has been allocated. ${{qualifiedAmount}} qualified, ${{nonQualifiedAmount}} non-qualified.',
  },
  'financial.payout_sent': {
    title: 'Payout sent: ${{amount}}',
    body: 'Your patronage payout of ${{amount}} has been sent to your bank account via Stripe.',
  },
  'financial.dues_reminder': {
    title: 'Dues reminder',
    body: 'Your {{frequency}} dues of ${{amount}} are due on {{dueDate}}.',
  },
  'financial.buy_in_milestone': {
    title: 'Buy-in milestone: {{percentage}}% complete',
    body: 'You\'ve paid ${{paidAmount}} of your ${{totalAmount}} buy-in. {{remainingDescription}}',
  },
  'membership.candidate_review': {
    title: '{{candidateName}} is ready for membership review',
    body: 'The hiring committee recommends advancing {{candidateName}} to a full membership vote.',
  },
  'membership.welcome': {
    title: 'Welcome to {{coopName}}!',
    body: 'You are now a full member-owner. Your voice matters. Your vote counts. Your labor builds shared wealth.',
  },
  'nri.gentle_signal': {
    title: '{{signalMessage}}',
    body: '{{signalDetail}}',
  },
}
