/**
 * EducationTooltip — inline "what does this mean?" popover.
 * Renders cooperative terms with a dotted underline.
 * Hover/click to see the NRI plain-language explanation.
 */
import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { findGlossaryEntry } from '@/lib/nri/education'

interface EducationTooltipProps {
  term: string
  children?: React.ReactNode
}

export function EducationTooltip({ term, children }: EducationTooltipProps) {
  const [open, setOpen] = useState(false)
  const entry = findGlossaryEntry(term)

  if (!entry) {
    return <>{children || term}</>
  }

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex items-center gap-1 border-b border-dotted border-grove-400 text-grove-700 hover:text-grove-800 cursor-help"
      >
        {children || term}
        <HelpCircle size={12} className="text-grove-400" />
      </button>

      {open && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-72 bg-white rounded-xl shadow-lg border border-terra-100 p-4 text-left">
          <p className="text-xs font-medium text-grove-700 mb-1">{entry.term}</p>
          <p className="text-sm text-gray-900 font-medium leading-relaxed">{entry.simple}</p>
          <div className="mt-2 p-2.5 rounded-lg bg-warmth-50 border border-warmth-100">
            <p className="text-xs text-warmth-700 leading-relaxed">
              💡 {entry.analogy}
            </p>
          </div>
          {entry.related.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {entry.related.map(r => (
                <span key={r} className="text-[9px] px-1.5 py-0.5 rounded bg-grove-50 text-grove-600 border border-grove-100">
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </span>
  )
}

/**
 * LearnCard — larger educational card for NRI compass or onboarding.
 */
interface LearnCardProps {
  term: string
  showDetail?: boolean
}

export function LearnCard({ term, showDetail = false }: LearnCardProps) {
  const entry = findGlossaryEntry(term)
  if (!entry) return null

  return (
    <div className="narrative-card">
      <p className="text-xs font-medium text-grove-600 uppercase tracking-wider mb-1">Learn</p>
      <p className="font-display text-lg font-semibold text-gray-900">{entry.term}</p>
      <p className="text-sm text-gray-700 mt-2 leading-relaxed">{entry.simple}</p>
      <div className="mt-3 p-3 rounded-lg bg-warmth-50 border border-warmth-100">
        <p className="text-sm text-warmth-700 leading-relaxed">{entry.analogy}</p>
      </div>
      {showDetail && (
        <p className="text-xs text-gray-500 mt-3 leading-relaxed">{entry.detail}</p>
      )}
      {entry.related.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          <span className="text-[9px] text-gray-400 mr-1">Related:</span>
          {entry.related.map(r => (
            <span key={r} className="text-[9px] px-1.5 py-0.5 rounded bg-grove-50 text-grove-600 border border-grove-100">
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
