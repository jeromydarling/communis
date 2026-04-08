import { useState } from 'react'
import {
  FileText, Upload, Cloud, FolderOpen, Search, Sparkles,
  CheckCircle2, Clock, AlertCircle, ExternalLink, Link2,
} from 'lucide-react'
import { DOCUMENT_TYPE_LABELS, type DocumentType, type DocumentSource, type CoopDocument } from '@/types/documents'

const DEMO_DOCUMENTS: CoopDocument[] = [
  { id: '1', tenant_id: 'd', source: 'google_drive', external_id: null, title: 'Evergreen Workers Co-op Bylaws (2024)', file_type: 'pdf', document_type: 'bylaws', file_size_bytes: 245000, status: 'indexed', indexed_at: '2025-01-15', chunk_count: 42, summary: 'Complete bylaws including membership, governance, patronage distribution, and revolvement policies. Last amended December 2024.', tags: ['bylaws', 'governance'], uploaded_by: '1', visibility: 'all_members', created_at: '2025-01-10', updated_at: '2025-01-15' },
  { id: '2', tenant_id: 'd', source: 'google_drive', external_id: null, title: 'Member Handbook v3', file_type: 'docx', document_type: 'handbook', file_size_bytes: 180000, status: 'indexed', indexed_at: '2025-01-12', chunk_count: 28, summary: 'Complete member guide covering expectations, benefits, governance participation, and co-op culture.', tags: ['handbook', 'onboarding'], uploaded_by: '1', visibility: 'all_members', created_at: '2025-01-08', updated_at: '2025-01-12' },
  { id: '3', tenant_id: 'd', source: 'upload', external_id: null, title: 'Board Meeting Minutes — January 2025', file_type: 'pdf', document_type: 'meeting_minutes', file_size_bytes: 45000, status: 'indexed', indexed_at: '2025-01-22', chunk_count: 8, summary: 'Discussed Q4 patronage distribution, Roberto\'s candidacy progress, and equipment purchase.', tags: ['board', 'minutes'], uploaded_by: '1', visibility: 'all_members', created_at: '2025-01-20', updated_at: '2025-01-22' },
  { id: '4', tenant_id: 'd', source: 'google_drive', external_id: null, title: 'Safety Training Manual', file_type: 'pdf', document_type: 'training_material', file_size_bytes: 320000, status: 'indexed', indexed_at: '2025-01-05', chunk_count: 35, summary: 'OSHA-compliant safety procedures for residential and commercial cleaning operations.', tags: ['safety', 'training', 'OSHA'], uploaded_by: '2', visibility: 'all_members', created_at: '2024-11-01', updated_at: '2025-01-05' },
  { id: '5', tenant_id: 'd', source: 'dropbox', external_id: null, title: 'Q4 2024 Financial Report', file_type: 'pdf', document_type: 'financial_report', file_size_bytes: 98000, status: 'indexed', indexed_at: '2025-01-18', chunk_count: 15, summary: 'Revenue $105K, expenses $86.6K, net surplus $18.4K. Recommended for patronage distribution.', tags: ['finance', 'quarterly'], uploaded_by: '4', visibility: 'stewards_only', created_at: '2025-01-15', updated_at: '2025-01-18' },
  { id: '6', tenant_id: 'd', source: 'upload', external_id: null, title: 'Candidate Onboarding Checklist', file_type: 'docx', document_type: 'onboarding_doc', file_size_bytes: 28000, status: 'indexed', indexed_at: '2025-01-03', chunk_count: 5, summary: 'Step-by-step checklist for new candidates: training milestones, buddy assignment, meeting attendance.', tags: ['onboarding', 'candidates', 'checklist'], uploaded_by: '2', visibility: 'all_members', created_at: '2024-10-15', updated_at: '2025-01-03' },
  { id: '7', tenant_id: 'd', source: 'upload', external_id: null, title: 'Vendor Contract — EcoClean Supplies', file_type: 'pdf', document_type: 'contract', file_size_bytes: 156000, status: 'indexed', indexed_at: '2025-01-10', chunk_count: 12, summary: 'Annual supply contract with EcoClean for cleaning products. Expires March 2025.', tags: ['vendor', 'contract', 'supplies'], uploaded_by: '1', visibility: 'stewards_only', created_at: '2024-03-01', updated_at: '2025-01-10' },
]

const DEMO_CONNECTORS = [
  { source: 'google_drive' as DocumentSource, name: 'Google Drive', icon: '📁', connected: true, docs: 14, lastSync: '2 hours ago' },
  { source: 'dropbox' as DocumentSource, name: 'Dropbox', icon: '📦', connected: true, docs: 3, lastSync: '1 day ago' },
  { source: 'upload' as DocumentSource, name: 'Direct Upload', icon: '📄', connected: true, docs: 4, lastSync: null },
]

const statusIcons = {
  indexed: { icon: CheckCircle2, color: 'text-grove-500', label: 'Indexed by NRI' },
  processing: { icon: Clock, color: 'text-warmth-500', label: 'Processing...' },
  pending: { icon: Clock, color: 'text-gray-400', label: 'Pending' },
  failed: { icon: AlertCircle, color: 'text-red-500', label: 'Failed' },
}

export default function DocumentsPage() {
  const [tab, setTab] = useState<'documents' | 'connectors'>('documents')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all')

  const filtered = DEMO_DOCUMENTS.filter(doc => {
    const matchesSearch = !search || doc.title.toLowerCase().includes(search.toLowerCase()) || doc.summary?.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || doc.document_type === typeFilter
    return matchesSearch && matchesType
  })

  const indexedCount = DEMO_DOCUMENTS.filter(d => d.status === 'indexed').length
  const totalChunks = DEMO_DOCUMENTS.reduce((sum, d) => sum + d.chunk_count, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-400 mt-1">Your co-op's institutional memory. NRI learns from everything here.</p>
        </div>
        <button className="calm-button-primary text-xs flex items-center gap-2">
          <Upload size={14} /> Upload Document
        </button>
      </div>

      {/* NRI knowledge status */}
      <div className="narrative-card bg-grove-50 border-grove-100 mb-6 flex items-start gap-3">
        <Sparkles size={16} className="text-grove-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-grove-800">NRI has read {indexedCount} documents ({totalChunks} knowledge chunks)</p>
          <p className="text-xs text-grove-600 mt-1">
            Ask the NRI Compass anything about your bylaws, policies, meeting history, or training materials.
            NRI answers from your actual documents, not generic information.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-warmth-100 rounded-xl p-1">
        <button onClick={() => setTab('documents')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'documents' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Documents ({DEMO_DOCUMENTS.length})
        </button>
        <button onClick={() => setTab('connectors')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'connectors' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Connectors
        </button>
      </div>

      {tab === 'documents' && (
        <>
          {/* Search and filter */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-terra-200 bg-warmth-50 text-sm" />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="px-3 py-2 rounded-xl border border-terra-200 bg-warmth-50 text-xs">
              <option value="all">All types</option>
              {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            {filtered.map(doc => {
              const status = statusIcons[doc.status]
              const StatusIcon = status.icon
              return (
                <div key={doc.id} className="narrative-card flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-terra-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-terra-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
                      <StatusIcon size={12} className={status.color} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{doc.summary}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-grove-50 text-grove-600 border border-grove-100">
                        {DOCUMENT_TYPE_LABELS[doc.document_type].label}
                      </span>
                      <span className="text-[9px] text-gray-400">{doc.file_type.toUpperCase()}</span>
                      <span className="text-[9px] text-gray-400">{doc.chunk_count} chunks</span>
                      {doc.visibility === 'stewards_only' && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-warmth-50 text-warmth-600 border border-warmth-100">Stewards only</span>
                      )}
                      <span className="text-[9px] text-gray-300 ml-auto">
                        {doc.source === 'google_drive' ? '📁 Drive' : doc.source === 'dropbox' ? '📦 Dropbox' : '📄 Upload'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {tab === 'connectors' && (
        <div className="space-y-4">
          {DEMO_CONNECTORS.map(conn => (
            <div key={conn.source} className={`narrative-card flex items-center gap-4 ${conn.connected ? 'ring-1 ring-grove-200' : ''}`}>
              <div className="text-2xl">{conn.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{conn.name}</p>
                  {conn.connected && <span className="text-[10px] px-2 py-0.5 rounded-full bg-grove-100 text-grove-700">Connected</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {conn.docs} documents · {conn.lastSync ? `Last sync: ${conn.lastSync}` : 'Immediate'}
                </p>
              </div>
              <button className={`text-xs px-3 py-1.5 rounded-lg ${conn.connected ? 'bg-white border border-gray-200 text-gray-600' : 'bg-grove-600 text-white'}`}>
                {conn.connected ? 'Settings' : 'Connect'}
              </button>
            </div>
          ))}

          <div className="narrative-card bg-commons-50 border-commons-100 flex items-start gap-3">
            <Link2 size={16} className="text-commons-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-commons-800">How document learning works</p>
              <p className="text-xs text-commons-600 mt-1">
                When you connect Google Drive or Dropbox, Communis syncs your documents and NRI reads them —
                splitting each into small chunks for semantic search. When a member asks NRI a question,
                it searches your documents first, giving answers grounded in YOUR co-op's actual policies and history.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
