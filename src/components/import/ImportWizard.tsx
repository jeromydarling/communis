import { useState, useCallback } from 'react'
import { Upload, FileSpreadsheet, ArrowRight, ArrowLeft, Check, AlertCircle, Sparkles } from 'lucide-react'
import { parseCSV, suggestFieldMappings, type ParseResult, type FieldSuggestion } from '@/lib/csvParser'
import type { ImportTargetType } from '@/types'

type Step = 'upload' | 'map' | 'review' | 'complete'

const TARGET_LABELS: Record<ImportTargetType, { label: string; description: string }> = {
  members: { label: 'Members', description: 'Import your member roster — names, emails, roles, join dates.' },
  ica_balances: { label: 'Equity Balances', description: 'Import internal capital account balances — buy-in, patronage, equity totals.' },
  labor_hours: { label: 'Labor Hours', description: 'Import hours worked — for patronage calculation basis.' },
  governance_history: { label: 'Governance History', description: 'Import past decisions and vote records.' },
}

export default function ImportWizard() {
  const [step, setStep] = useState<Step>('upload')
  const [targetType, setTargetType] = useState<ImportTargetType>('members')
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [mappings, setMappings] = useState<FieldSuggestion[]>([])
  const [fileName, setFileName] = useState('')

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (evt) => {
      const text = evt.target?.result as string
      const result = parseCSV(text)
      setParseResult(result)
      const mappableType = targetType === 'governance_history' ? 'members' : targetType
      const suggestions = suggestFieldMappings(result.headers, mappableType)
      setMappings(suggestions)
      setStep('map')
    }
    reader.readAsText(file)
  }, [targetType])

  const updateMapping = (sourceColumn: string, targetField: string) => {
    setMappings(prev => prev.map(m =>
      m.sourceColumn === sourceColumn ? { ...m, targetField, confidence: targetField ? 1 : 0 } : m
    ))
  }

  const targetFields = targetType === 'members'
    ? ['name', 'email', 'phone', 'joined_date', 'status', 'role']
    : targetType === 'ica_balances'
    ? ['member_name', 'equity_balance', 'buy_in_paid', 'buy_in_total', 'patronage_qualified', 'patronage_non_qualified']
    : ['member_name', 'date', 'hours', 'description']

  const mappedCount = mappings.filter(m => m.targetField).length
  const autoMappedCount = mappings.filter(m => m.confidence >= 0.6).length

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-gray-900">Bring Your Mess</h1>
        <p className="text-sm text-gray-400 mt-1">
          Upload whatever you have. We'll help you make sense of it.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {(['upload', 'map', 'review', 'complete'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === s ? 'bg-grove-600 text-white'
                : (['upload', 'map', 'review', 'complete'].indexOf(step) > i) ? 'bg-grove-100 text-grove-700'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {(['upload', 'map', 'review', 'complete'].indexOf(step) > i) ? <Check size={14} /> : i + 1}
            </div>
            {i < 3 && <div className="w-8 h-0.5 bg-gray-100" />}
          </div>
        ))}
      </div>

      {/* Step: Upload */}
      {step === 'upload' && (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">What are you importing?</p>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(TARGET_LABELS) as [ImportTargetType, typeof TARGET_LABELS[ImportTargetType]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setTargetType(key)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    targetType === key
                      ? 'border-grove-400 bg-grove-50'
                      : 'border-terra-100 bg-white hover:border-grove-200'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{val.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{val.description}</p>
                </button>
              ))}
            </div>
          </div>

          <label className="narrative-card flex flex-col items-center justify-center py-12 cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-terra-200">
            <Upload size={32} className="text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-700">Drop your file here or click to browse</p>
            <p className="text-xs text-gray-400 mt-1">CSV, TSV, or Excel exports. We handle the mess.</p>
            <input
              type="file"
              accept=".csv,.tsv,.txt,.xls,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Step: Map fields */}
      {step === 'map' && parseResult && (
        <div className="space-y-6">
          <div className="narrative-card bg-grove-50 border-grove-100">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-grove-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-grove-800">
                  Found {parseResult.rowCount} rows in "{fileName}"
                </p>
                <p className="text-xs text-grove-600 mt-1">
                  NRI auto-mapped {autoMappedCount} of {parseResult.headers.length} columns.
                  Review and adjust below.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {mappings.map(mapping => (
              <div key={mapping.sourceColumn} className="narrative-card flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet size={14} className="text-gray-400" />
                    <p className="text-sm font-medium text-gray-900 truncate">{mapping.sourceColumn}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    Sample: {parseResult.rows[0]?.[mapping.sourceColumn] || '—'}
                  </p>
                </div>

                <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />

                <div className="w-48">
                  <select
                    value={mapping.targetField}
                    onChange={(e) => updateMapping(mapping.sourceColumn, e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      mapping.confidence >= 0.8 ? 'border-grove-300 bg-grove-50'
                        : mapping.targetField ? 'border-warmth-300 bg-warmth-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <option value="">Skip this column</option>
                    {targetFields.map(f => (
                      <option key={f} value={f}>{f.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>

                {mapping.confidence >= 0.6 && (
                  <span className="text-[10px] text-grove-500 flex-shrink-0">auto</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep('upload')} className="calm-button-secondary text-sm flex items-center gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => setStep('review')} className="calm-button-primary text-sm flex items-center gap-2">
              Review Import <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Review */}
      {step === 'review' && parseResult && (
        <div className="space-y-6">
          <div className="narrative-card">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Import Summary</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-grove-50 border border-grove-100 text-center">
                <p className="font-display text-xl font-bold text-gray-900">{parseResult.rowCount}</p>
                <p className="text-xs text-gray-400">rows to import</p>
              </div>
              <div className="p-3 rounded-xl bg-warmth-50 border border-warmth-100 text-center">
                <p className="font-display text-xl font-bold text-gray-900">{mappedCount}</p>
                <p className="text-xs text-gray-400">fields mapped</p>
              </div>
              <div className="p-3 rounded-xl bg-commons-50 border border-commons-100 text-center">
                <p className="font-display text-xl font-bold text-gray-900">
                  {parseResult.headers.length - mappedCount}
                </p>
                <p className="text-xs text-gray-400">columns skipped</p>
              </div>
            </div>

            {/* Preview table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-terra-100">
                    {mappings.filter(m => m.targetField).map(m => (
                      <th key={m.sourceColumn} className="text-left py-2 px-2 text-gray-400 font-medium">
                        {m.targetField.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parseResult.rows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b border-terra-50">
                      {mappings.filter(m => m.targetField).map(m => (
                        <td key={m.sourceColumn} className="py-2 px-2 text-gray-600">
                          {row[m.sourceColumn] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {parseResult.rowCount > 5 && (
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Showing 5 of {parseResult.rowCount} rows
                </p>
              )}
            </div>
          </div>

          <div className="narrative-card bg-warmth-50 border-warmth-100 flex items-start gap-3">
            <AlertCircle size={18} className="text-warmth-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warmth-800">Your original file is preserved</p>
              <p className="text-xs text-warmth-600 mt-1">
                We never destroy source data. The raw upload is kept as an artifact you can always reference.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep('map')} className="calm-button-secondary text-sm flex items-center gap-2">
              <ArrowLeft size={14} /> Adjust Mapping
            </button>
            <button onClick={() => setStep('complete')} className="calm-button-primary text-sm flex items-center gap-2">
              Import {parseResult.rowCount} Records <Check size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Complete */}
      {step === 'complete' && parseResult && (
        <div className="narrative-card text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-grove-100 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-grove-600" />
          </div>
          <h2 className="font-display text-xl font-bold text-gray-900">Import Complete</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            {parseResult.rowCount} records imported from "{fileName}".
            Your cooperative's data is now in Communis.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Demo mode — no data was actually written.
          </p>
        </div>
      )}
    </div>
  )
}
