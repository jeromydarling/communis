/**
 * i18n — Internationalization scaffold with DeepL integration.
 * Primary: English. Secondary: Spanish (37.9% Latinx worker-owners).
 * Future: Portuguese, French, Haitian Creole.
 */

export type Locale = 'en' | 'es'

export const SUPPORTED_LOCALES: { code: Locale; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
]

export const DEFAULT_LOCALE: Locale = 'en'

/**
 * DeepL integration config.
 * Used for translating user-generated content (proposals, meeting minutes)
 * and for maintaining Spanish locale files.
 */
export interface DeepLConfig {
  api_key_encrypted: string
  formality: 'default' | 'more' | 'less' | 'prefer_more' | 'prefer_less'
  glossary_id: string | null // custom cooperative terminology glossary
  source_lang: string
  target_langs: string[]
}

/**
 * Cooperative-specific translation glossary.
 * DeepL custom glossary ensures cooperative terminology is translated correctly.
 */
export const COOPERATIVE_GLOSSARY: Record<string, Record<Locale, string>> = {
  'worker-owner': { en: 'worker-owner', es: 'trabajador-propietario' },
  'member-owner': { en: 'member-owner', es: 'miembro-propietario' },
  'patronage': { en: 'patronage', es: 'patronazgo' },
  'patronage dividend': { en: 'patronage dividend', es: 'dividendo de patronazgo' },
  'internal capital account': { en: 'internal capital account', es: 'cuenta de capital interna' },
  'buy-in': { en: 'buy-in', es: 'aportación de ingreso' },
  'revolvement': { en: 'revolvement', es: 'revolución de capital' },
  'surplus': { en: 'surplus', es: 'excedente' },
  'cooperative': { en: 'cooperative', es: 'cooperativa' },
  'bylaws': { en: 'bylaws', es: 'estatutos' },
  'quorum': { en: 'quorum', es: 'quórum' },
  'proposal': { en: 'proposal', es: 'propuesta' },
  'steward': { en: 'steward', es: 'administrador' },
  'candidacy': { en: 'candidacy', es: 'período de prueba' },
  'general meeting': { en: 'general meeting', es: 'asamblea general' },
  'board of directors': { en: 'board of directors', es: 'consejo de administración' },
  'committee': { en: 'committee', es: 'comité' },
  'consensus': { en: 'consensus', es: 'consenso' },
  'majority vote': { en: 'majority vote', es: 'voto mayoritario' },
  'equity': { en: 'equity', es: 'capital social' },
}

/**
 * Simple translation function — looks up key in locale files.
 * Falls back to English if key not found in target locale.
 */
export function t(key: string, locale: Locale = DEFAULT_LOCALE, params?: Record<string, string>): string {
  const translations = LOCALE_STRINGS[locale] || LOCALE_STRINGS.en
  let value = translations[key] || LOCALE_STRINGS.en[key] || key

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{{${k}}}`, v)
    }
  }

  return value
}

/**
 * Locale string maps — to be expanded.
 * In production, these load from JSON files and DeepL keeps them in sync.
 */
const LOCALE_STRINGS: Record<Locale, Record<string, string>> = {
  en: {
    'app.name': 'Communis',
    'app.tagline': 'The operating system for worker cooperatives',
    'nav.dashboard': 'Dashboard',
    'nav.members': 'Members',
    'nav.governance': 'Governance',
    'nav.patronage': 'Patronage',
    'nav.payments': 'Payments',
    'nav.committees': 'Committees',
    'nav.integrations': 'Integrations',
    'nav.import': 'Import',
    'nav.setup': 'Setup',
    'role.candidate': 'Candidate',
    'role.member': 'Member',
    'role.coordinator': 'Coordinator',
    'role.steward': 'Steward',
    'role.advisor': 'Advisor',
    'nri.greeting': 'Good morning, {{coopName}}.',
    'member.equity_narrative': 'Your equity of ${{amount}} reflects {{years}} years of shared ownership.',
    'patronage.basis_hours': 'Based on hours worked',
    'patronage.basis_revenue': 'Based on revenue generated',
    'patronage.basis_equal': 'Equal shares',
    'governance.vote_cast': 'Cast Your Vote',
    'governance.quorum_met': 'Quorum met',
    'governance.quorum_not_met': 'Quorum not met',
  },
  es: {
    'app.name': 'Communis',
    'app.tagline': 'El sistema operativo para cooperativas de trabajo',
    'nav.dashboard': 'Panel',
    'nav.members': 'Miembros',
    'nav.governance': 'Gobernanza',
    'nav.patronage': 'Patronazgo',
    'nav.payments': 'Pagos',
    'nav.committees': 'Comités',
    'nav.integrations': 'Integraciones',
    'nav.import': 'Importar',
    'nav.setup': 'Configuración',
    'role.candidate': 'Candidato',
    'role.member': 'Miembro',
    'role.coordinator': 'Coordinador',
    'role.steward': 'Administrador',
    'role.advisor': 'Asesor',
    'nri.greeting': 'Buenos días, {{coopName}}.',
    'member.equity_narrative': 'Tu capital de ${{amount}} refleja {{years}} años de propiedad compartida.',
    'patronage.basis_hours': 'Basado en horas trabajadas',
    'patronage.basis_revenue': 'Basado en ingresos generados',
    'patronage.basis_equal': 'Partes iguales',
    'governance.vote_cast': 'Emitir Tu Voto',
    'governance.quorum_met': 'Quórum alcanzado',
    'governance.quorum_not_met': 'Quórum no alcanzado',
  },
}
