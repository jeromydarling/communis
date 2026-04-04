/**
 * Committee Scheduling Types
 * Democratic scheduling: meetings, terms, rotation fairness.
 */

export interface CommitteeSchedule {
  id: string
  tenant_id: string
  committee_id: string
  meeting_cadence: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'as_needed'
  preferred_day: number | null // 0=Sun, 1=Mon, etc.
  preferred_time: string | null // "14:00"
  duration_minutes: number
  location: string | null
  next_meeting_date: string | null
  auto_schedule: boolean
}

export interface TermRotation {
  id: string
  tenant_id: string
  committee_id: string
  member_id: string
  role: 'chair' | 'member'
  term_start: string
  term_end: string
  is_current: boolean
  consecutive_terms: number
  max_consecutive_terms: number | null // from bylaws
}

export interface RotationFairness {
  member_id: string
  member_name: string
  total_committee_months: number
  committees_served: string[]
  current_committees: string[]
  last_committee_end: string | null
  fairness_score: number // 0-100, lower = should serve next
}
