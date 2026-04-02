/**
 * CSV Parser — handles messy cooperative data.
 * Parses CSV text into rows, auto-detects delimiters, handles quoted fields.
 */

export interface ParseResult {
  headers: string[]
  rows: Record<string, string>[]
  rowCount: number
}

export function parseCSV(text: string): ParseResult {
  const delimiter = detectDelimiter(text)
  const lines = text.split(/\r?\n/).filter(line => line.trim())
  if (lines.length === 0) return { headers: [], rows: [], rowCount: 0 }

  const headers = parseLine(lines[0], delimiter).map(h => h.trim())
  const rows = lines.slice(1).map(line => {
    const values = parseLine(line, delimiter)
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = (values[i] || '').trim() })
    return row
  })

  return { headers, rows, rowCount: rows.length }
}

function detectDelimiter(text: string): string {
  const firstLine = text.split(/\r?\n/)[0] || ''
  const tabCount = (firstLine.match(/\t/g) || []).length
  const commaCount = (firstLine.match(/,/g) || []).length
  const semiCount = (firstLine.match(/;/g) || []).length
  if (tabCount > commaCount && tabCount > semiCount) return '\t'
  if (semiCount > commaCount) return ';'
  return ','
}

function parseLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') { current += '"'; i++ }
      else if (char === '"') { inQuotes = false }
      else { current += char }
    } else {
      if (char === '"') { inQuotes = true }
      else if (char === delimiter) { result.push(current); current = '' }
      else { current += char }
    }
  }
  result.push(current)
  return result
}

/**
 * Fuzzy field matching — maps messy CSV headers to Communis fields.
 * Returns suggested mappings with confidence scores.
 */
export interface FieldSuggestion {
  sourceColumn: string
  targetField: string
  confidence: number // 0-1
}

const MEMBER_FIELD_PATTERNS: Record<string, RegExp[]> = {
  name: [/name/i, /member/i, /full.?name/i, /worker/i],
  email: [/email/i, /e.?mail/i, /correo/i],
  phone: [/phone/i, /tel/i, /mobile/i, /cell/i],
  joined_date: [/join/i, /start/i, /hire/i, /fecha/i, /date/i],
  status: [/status/i, /estado/i, /active/i],
  role: [/role/i, /position/i, /title/i, /cargo/i],
}

const ICA_FIELD_PATTERNS: Record<string, RegExp[]> = {
  member_name: [/name/i, /member/i, /worker/i],
  equity_balance: [/equity/i, /balance/i, /capital/i, /account/i, /saldo/i],
  buy_in_paid: [/buy.?in/i, /paid/i, /contribution/i, /aporte/i],
  buy_in_total: [/total/i, /required/i, /target/i],
  patronage_qualified: [/qualified/i, /qual/i],
  patronage_non_qualified: [/non.?qual/i, /unqual/i],
}

const LABOR_FIELD_PATTERNS: Record<string, RegExp[]> = {
  member_name: [/name/i, /member/i, /worker/i, /employee/i],
  date: [/date/i, /day/i, /fecha/i, /period/i, /week/i],
  hours: [/hour/i, /hrs/i, /time/i, /horas/i, /duration/i],
  description: [/desc/i, /note/i, /task/i, /project/i, /job/i],
}

export function suggestFieldMappings(
  headers: string[],
  targetType: 'members' | 'ica_balances' | 'labor_hours'
): FieldSuggestion[] {
  const patterns = targetType === 'members' ? MEMBER_FIELD_PATTERNS
    : targetType === 'ica_balances' ? ICA_FIELD_PATTERNS
    : LABOR_FIELD_PATTERNS

  const suggestions: FieldSuggestion[] = []

  for (const header of headers) {
    let bestMatch = ''
    let bestConfidence = 0

    for (const [field, regexes] of Object.entries(patterns)) {
      for (const regex of regexes) {
        if (regex.test(header)) {
          const confidence = header.toLowerCase() === field.toLowerCase() ? 1.0
            : header.toLowerCase().includes(field.toLowerCase()) ? 0.8
            : 0.6
          if (confidence > bestConfidence) {
            bestMatch = field
            bestConfidence = confidence
          }
        }
      }
    }

    suggestions.push({
      sourceColumn: header,
      targetField: bestMatch || '',
      confidence: bestConfidence,
    })
  }

  return suggestions
}
