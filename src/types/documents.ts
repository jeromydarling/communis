/**
 * Document Connector Types — Google Drive, Dropbox, and direct upload.
 * NRI ingests these to become the co-op's institutional memory.
 */

// ─── Connector Sources ───────────────────────────────────
export type DocumentSource = 'google_drive' | 'dropbox' | 'upload' | 'url'

export interface DocumentConnector {
  id: string
  tenant_id: string
  source: DocumentSource
  connected: boolean
  account_email: string | null
  last_sync_at: string | null
  folder_id: string | null // root folder to sync from
  sync_enabled: boolean
  documents_count: number
}

// ─── Documents ───────────────────────────────────────────
export type DocumentType =
  | 'bylaws'
  | 'policy'
  | 'meeting_minutes'
  | 'financial_report'
  | 'training_material'
  | 'onboarding_doc'
  | 'contract'
  | 'handbook'
  | 'template'
  | 'other'

export type DocumentStatus = 'pending' | 'processing' | 'indexed' | 'failed'

export interface CoopDocument {
  id: string
  tenant_id: string
  source: DocumentSource
  external_id: string | null // Google Drive file ID, Dropbox path, etc.
  title: string
  file_type: string // pdf, docx, txt, md, etc.
  document_type: DocumentType
  file_size_bytes: number
  status: DocumentStatus
  indexed_at: string | null
  chunk_count: number // number of text chunks indexed for NRI
  summary: string | null // NRI-generated summary
  tags: string[]
  uploaded_by: string | null
  visibility: DocumentVisibility
  created_at: string
  updated_at: string
}

export type DocumentVisibility =
  | 'all_members'     // any member can see and ask NRI about it
  | 'stewards_only'   // only stewards and coordinators
  | 'committee'       // specific committee members
  | 'private'         // only the uploader and gardener

// ─── NRI Document Knowledge ──────────────────────────────
export interface DocumentChunk {
  id: string
  document_id: string
  tenant_id: string
  chunk_index: number
  content: string
  embedding_vector: number[] | null // for semantic search
  metadata: {
    page_number?: number
    section_heading?: string
    source_file: string
  }
}

export interface DocumentSearchResult {
  document_id: string
  document_title: string
  document_type: DocumentType
  chunk_content: string
  relevance_score: number
  section_heading: string | null
}

// ─── Sync Configuration ──────────────────────────────────
export interface DriveFolder {
  id: string
  name: string
  path: string
  children: DriveFolder[]
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, { label: string; description: string }> = {
  bylaws: { label: 'Bylaws', description: 'Your cooperative\'s governing document' },
  policy: { label: 'Policy', description: 'Board policies, HR policies, operational policies' },
  meeting_minutes: { label: 'Meeting Minutes', description: 'Records of board, committee, and general meetings' },
  financial_report: { label: 'Financial Report', description: 'Monthly financials, annual reports, audits' },
  training_material: { label: 'Training Material', description: 'Onboarding docs, safety training, procedures' },
  onboarding_doc: { label: 'Onboarding', description: 'Welcome packets, candidate guides, mentor guides' },
  contract: { label: 'Contract', description: 'Vendor contracts, lease agreements, insurance' },
  handbook: { label: 'Handbook', description: 'Employee/member handbook, operating manual' },
  template: { label: 'Template', description: 'Form templates, checklists, standard documents' },
  other: { label: 'Other', description: 'Any other document' },
}
