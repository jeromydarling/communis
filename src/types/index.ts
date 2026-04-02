/**
 * Communis Core Types
 * Cooperative-first data model built on CROS patterns.
 */

// ─── Roles ───────────────────────────────────────────────
export type CoopRole = 'candidate' | 'member' | 'coordinator' | 'steward' | 'advisor';
export type SystemRole = 'gardener'; // Platform operator

export interface RolePermissions {
  canViewOwnEquity: boolean;
  canViewAllEquity: boolean;
  canViewFinancials: boolean;
  canVote: boolean;
  canProposeMotions: boolean;
  canManageMembers: boolean;
  canManageBylaws: boolean;
  canManageCommittees: boolean;
  canViewPatronageDetails: boolean;
  canRunPatronage: boolean;
  canImportData: boolean;
  canAccessGardener: boolean;
}

export const ROLE_PERMISSIONS: Record<CoopRole | SystemRole, RolePermissions> = {
  candidate: {
    canViewOwnEquity: true, canViewAllEquity: false, canViewFinancials: false,
    canVote: false, canProposeMotions: false, canManageMembers: false,
    canManageBylaws: false, canManageCommittees: false,
    canViewPatronageDetails: false, canRunPatronage: false,
    canImportData: false, canAccessGardener: false,
  },
  member: {
    canViewOwnEquity: true, canViewAllEquity: false, canViewFinancials: true,
    canVote: true, canProposeMotions: true, canManageMembers: false,
    canManageBylaws: false, canManageCommittees: false,
    canViewPatronageDetails: true, canRunPatronage: false,
    canImportData: false, canAccessGardener: false,
  },
  coordinator: {
    canViewOwnEquity: true, canViewAllEquity: true, canViewFinancials: true,
    canVote: true, canProposeMotions: true, canManageMembers: true,
    canManageBylaws: false, canManageCommittees: true,
    canViewPatronageDetails: true, canRunPatronage: false,
    canImportData: true, canAccessGardener: false,
  },
  steward: {
    canViewOwnEquity: true, canViewAllEquity: true, canViewFinancials: true,
    canVote: true, canProposeMotions: true, canManageMembers: true,
    canManageBylaws: true, canManageCommittees: true,
    canViewPatronageDetails: true, canRunPatronage: true,
    canImportData: true, canAccessGardener: false,
  },
  advisor: {
    canViewOwnEquity: false, canViewAllEquity: true, canViewFinancials: true,
    canVote: false, canProposeMotions: false, canManageMembers: false,
    canManageBylaws: false, canManageCommittees: false,
    canViewPatronageDetails: true, canRunPatronage: false,
    canImportData: true, canAccessGardener: false,
  },
  gardener: {
    canViewOwnEquity: true, canViewAllEquity: true, canViewFinancials: true,
    canVote: false, canProposeMotions: false, canManageMembers: true,
    canManageBylaws: true, canManageCommittees: true,
    canViewPatronageDetails: true, canRunPatronage: true,
    canImportData: true, canAccessGardener: true,
  },
};

// ─── Member ──────────────────────────────────────────────
export type MemberStatus = 'candidate' | 'active' | 'on-leave' | 'departed';

export interface Member {
  id: string;
  tenant_id: string;
  user_id: string | null;
  name: string;
  initials: string;
  email: string;
  phone: string | null;
  role: CoopRole;
  status: MemberStatus;
  joined_date: string;
  departed_date: string | null;
  mentor_id: string | null;
  committees: string[];
  story: string;
  created_at: string;
  updated_at: string;
}

// ─── Internal Capital Account ────────────────────────────
export type ICATransactionType =
  | 'buy_in_contribution'
  | 'patronage_qualified'
  | 'patronage_non_qualified'
  | 'revolvement_payout'
  | 'adjustment'
  | 'initial_balance';

export interface ICATransaction {
  id: string;
  tenant_id: string;
  member_id: string;
  transaction_type: ICATransactionType;
  amount_cents: number; // positive = credit, negative = debit
  description: string;
  fiscal_year: number;
  effective_date: string;
  created_by: string | null;
  created_at: string;
}

export interface ICABalance {
  member_id: string;
  total_equity_cents: number;
  buy_in_paid_cents: number;
  buy_in_total_cents: number;
  patronage_qualified_cents: number;
  patronage_non_qualified_cents: number;
  revolvements_paid_cents: number;
}

// ─── Patronage ───────────────────────────────────────────
export type PatronageBasis = 'hours' | 'revenue' | 'equal' | 'custom';
export type PatronageStatus = 'draft' | 'proposed' | 'approved' | 'distributed';

export interface PatronageRun {
  id: string;
  tenant_id: string;
  fiscal_year: number;
  period_label: string; // "Q4 2024", "FY 2024"
  status: PatronageStatus;
  basis: PatronageBasis;
  total_surplus_cents: number;
  qualified_pct: number; // 0-100
  non_qualified_pct: number;
  proposal_id: string | null; // linked governance proposal
  created_by: string;
  approved_at: string | null;
  distributed_at: string | null;
  created_at: string;
}

export interface PatronageAllocation {
  id: string;
  run_id: string;
  member_id: string;
  basis_value: number; // hours, revenue, or 1 for equal
  basis_share_pct: number;
  total_cents: number;
  qualified_cents: number;
  non_qualified_cents: number;
}

// ─── Governance ──────────────────────────────────────────
export type VotingMethod = 'consensus' | 'consent' | 'majority' | 'supermajority';
export type ProposalStatus = 'draft' | 'discussion' | 'voting' | 'passed' | 'failed' | 'withdrawn';
export type ProposalType = 'hiring' | 'financial' | 'policy' | 'operational' | 'bylaw_amendment' | 'membership';

export interface Proposal {
  id: string;
  tenant_id: string;
  title: string;
  description: string;
  proposal_type: ProposalType;
  status: ProposalStatus;
  voting_method: VotingMethod;
  proposed_by: string; // member_id or committee name
  discussion_opens: string;
  voting_opens: string | null;
  voting_closes: string | null;
  quorum_required: number; // fraction, e.g. 0.5
  pass_threshold: number; // fraction, e.g. 0.667 for supermajority
  outcome_trigger: string | null; // 'patronage_run:123' or 'member_onboard:456'
  created_at: string;
}

export interface Vote {
  id: string;
  proposal_id: string;
  member_id: string;
  vote: 'for' | 'against' | 'abstain' | 'block'; // block for consensus
  comment: string | null;
  cast_at: string;
}

// ─── Committees ──────────────────────────────────────────
export interface Committee {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  is_standing: boolean; // standing vs ad-hoc
  created_at: string;
}

export interface CommitteeMembership {
  id: string;
  committee_id: string;
  member_id: string;
  role: 'chair' | 'member';
  term_start: string;
  term_end: string | null;
}

// ─── Meetings ────────────────────────────────────────────
export type MeetingType = 'general' | 'board' | 'committee' | 'special';

export interface Meeting {
  id: string;
  tenant_id: string;
  meeting_type: MeetingType;
  committee_id: string | null;
  title: string;
  scheduled_at: string;
  location: string | null;
  agenda_markdown: string | null;
  minutes_markdown: string | null;
  quorum_met: boolean | null;
  attendee_ids: string[];
  created_at: string;
}

// ─── Labor Tracking ──────────────────────────────────────
export interface LaborEntry {
  id: string;
  tenant_id: string;
  member_id: string;
  date: string;
  hours: number;
  description: string | null;
  source: 'manual' | 'payroll_import' | 'api';
  created_at: string;
}

// ─── Bylaws Configuration ────────────────────────────────
export interface BylawConfig {
  id: string;
  tenant_id: string;
  buy_in_amount_cents: number;
  buy_in_allows_installments: boolean;
  candidacy_period_months: number;
  patronage_basis: PatronageBasis;
  default_qualified_pct: number;
  default_voting_method: VotingMethod;
  general_meeting_quorum: number; // fraction
  board_meeting_quorum: number;
  max_pay_ratio: number | null;
  revolvement_years: number; // years to pay out departing member equity
  fiscal_year_end_month: number; // 1-12
  visibility_rules: VisibilityRules;
  updated_at: string;
}

export interface VisibilityRules {
  members_can_see_all_equity: boolean;
  members_can_see_surplus_total: boolean;
  candidates_can_see_financials: boolean;
  candidates_can_see_meeting_minutes: boolean;
}

// ─── Tenant (Cooperative) ────────────────────────────────
export type CoopType = 'worker' | 'consumer' | 'producer' | 'housing' | 'platform' | 'multi_stakeholder';
export type TenantStatus = 'onboarding' | 'active' | 'suspended' | 'churned';
export type SubscriptionTier = 'seedling' | 'grove' | 'commons';

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  coop_type: CoopType;
  status: TenantStatus;
  tier: SubscriptionTier;
  founded_date: string | null;
  city: string | null;
  state: string | null;
  country: string;
  industry: string | null;
  website: string | null;
  member_count: number;
  annual_revenue_cents: number | null;
  created_at: string;
}

// ─── NRI Signals ─────────────────────────────────────────
export type SignalType = 'participation' | 'equity' | 'governance' | 'wellbeing' | 'operational';
export type SignalSeverity = 'gentle' | 'notable' | 'urgent';

export interface NRISignal {
  id: string;
  tenant_id: string;
  signal_type: SignalType;
  severity: SignalSeverity;
  message: string;
  detail: string;
  source_rule: string; // which rule engine generated this
  detected_at: string;
  dismissed_at: string | null;
  dismissed_by: string | null;
}

// ─── Import ──────────────────────────────────────────────
export type ImportBatchStatus = 'uploading' | 'mapping' | 'reviewing' | 'importing' | 'complete' | 'failed';
export type ImportTargetType = 'members' | 'ica_balances' | 'labor_hours' | 'governance_history';

export interface ImportBatch {
  id: string;
  tenant_id: string;
  target_type: ImportTargetType;
  status: ImportBatchStatus;
  file_name: string;
  record_count: number;
  imported_count: number;
  error_count: number;
  column_mapping: Record<string, string>; // source_col → target_field
  raw_preview: Record<string, string>[]; // first N rows
  errors: ImportError[];
  created_by: string;
  created_at: string;
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
  value: string;
}

// ─── Cooperative Templates ───────────────────────────────
export type CoopTemplate = 'cleaning' | 'tech' | 'food' | 'construction' | 'childcare' | 'consulting' | 'retail' | 'custom';

export interface CoopTemplateConfig {
  key: CoopTemplate;
  name: string;
  description: string;
  default_committees: string[];
  default_bylaws: Partial<BylawConfig>;
  onboarding_steps: string[];
}

export const COOP_TEMPLATES: CoopTemplateConfig[] = [
  {
    key: 'cleaning',
    name: 'Cleaning Cooperative',
    description: 'Residential and commercial cleaning services. Common in urban areas, often Latinx-led.',
    default_committees: ['Operations', 'Hiring', 'Finance', 'Training'],
    default_bylaws: {
      buy_in_amount_cents: 200000, // $2,000
      buy_in_allows_installments: true,
      candidacy_period_months: 6,
      patronage_basis: 'hours',
      default_qualified_pct: 80,
      default_voting_method: 'majority',
      general_meeting_quorum: 0.5,
      revolvement_years: 3,
    },
    onboarding_steps: ['Set up member roster', 'Configure buy-in schedule', 'Import hours from payroll', 'Set up committees'],
  },
  {
    key: 'tech',
    name: 'Tech Cooperative',
    description: 'Software development, IT services, or digital agencies. Often distributed teams.',
    default_committees: ['Board', 'Finance', 'Hiring', 'Business Development'],
    default_bylaws: {
      buy_in_amount_cents: 500000,
      buy_in_allows_installments: true,
      candidacy_period_months: 6,
      patronage_basis: 'hours',
      default_qualified_pct: 70,
      default_voting_method: 'consent',
      general_meeting_quorum: 0.67,
      revolvement_years: 5,
    },
    onboarding_steps: ['Set up member roster', 'Configure equity structure', 'Connect time tracking', 'Set up governance'],
  },
  {
    key: 'food',
    name: 'Food / Restaurant Cooperative',
    description: 'Restaurants, bakeries, catering, or food production.',
    default_committees: ['Operations', 'Finance', 'Menu/Product', 'Hiring'],
    default_bylaws: {
      buy_in_amount_cents: 150000,
      buy_in_allows_installments: true,
      candidacy_period_months: 3,
      patronage_basis: 'hours',
      default_qualified_pct: 80,
      default_voting_method: 'majority',
      general_meeting_quorum: 0.5,
      revolvement_years: 3,
    },
    onboarding_steps: ['Set up member roster', 'Import existing equity', 'Configure patronage', 'Set up shift tracking'],
  },
  {
    key: 'construction',
    name: 'Construction Cooperative',
    description: 'General contracting, specialty trades, or landscaping.',
    default_committees: ['Safety', 'Operations', 'Finance', 'Hiring'],
    default_bylaws: {
      buy_in_amount_cents: 300000,
      buy_in_allows_installments: true,
      candidacy_period_months: 6,
      patronage_basis: 'hours',
      default_qualified_pct: 80,
      default_voting_method: 'majority',
      general_meeting_quorum: 0.5,
      revolvement_years: 3,
    },
    onboarding_steps: ['Set up member roster', 'Configure buy-in', 'Import job hours', 'Set up safety committee'],
  },
  {
    key: 'childcare',
    name: 'Childcare Cooperative',
    description: 'Daycare centers, after-school programs, or family childcare networks.',
    default_committees: ['Education', 'Finance', 'Parent Liaison', 'Hiring'],
    default_bylaws: {
      buy_in_amount_cents: 100000,
      buy_in_allows_installments: true,
      candidacy_period_months: 3,
      patronage_basis: 'hours',
      default_qualified_pct: 80,
      default_voting_method: 'consensus',
      general_meeting_quorum: 0.5,
      revolvement_years: 2,
    },
    onboarding_steps: ['Set up member roster', 'Configure licensing requirements', 'Set up parent committees', 'Import staff hours'],
  },
  {
    key: 'consulting',
    name: 'Consulting / Professional Services',
    description: 'Management consulting, design, accounting, or legal cooperatives.',
    default_committees: ['Board', 'Finance', 'Business Development', 'Professional Standards'],
    default_bylaws: {
      buy_in_amount_cents: 1000000,
      buy_in_allows_installments: true,
      candidacy_period_months: 12,
      patronage_basis: 'revenue',
      default_qualified_pct: 70,
      default_voting_method: 'consent',
      general_meeting_quorum: 0.67,
      revolvement_years: 5,
    },
    onboarding_steps: ['Set up member roster', 'Configure revenue-based patronage', 'Import client revenue data', 'Set up governance'],
  },
  {
    key: 'retail',
    name: 'Retail Cooperative',
    description: 'Worker-owned retail stores, bookshops, or markets.',
    default_committees: ['Operations', 'Finance', 'Merchandising', 'Hiring'],
    default_bylaws: {
      buy_in_amount_cents: 150000,
      buy_in_allows_installments: true,
      candidacy_period_months: 3,
      patronage_basis: 'hours',
      default_qualified_pct: 80,
      default_voting_method: 'majority',
      general_meeting_quorum: 0.5,
      revolvement_years: 3,
    },
    onboarding_steps: ['Set up member roster', 'Configure POS hours import', 'Set up committees', 'Configure patronage'],
  },
  {
    key: 'custom',
    name: 'Custom Cooperative',
    description: 'Configure everything from scratch to match your bylaws.',
    default_committees: ['Board', 'Finance'],
    default_bylaws: {
      buy_in_amount_cents: 200000,
      buy_in_allows_installments: true,
      candidacy_period_months: 6,
      patronage_basis: 'hours',
      default_qualified_pct: 80,
      default_voting_method: 'majority',
      general_meeting_quorum: 0.5,
      revolvement_years: 3,
    },
    onboarding_steps: ['Set up member roster', 'Configure bylaws', 'Set up governance', 'Configure patronage'],
  },
];
