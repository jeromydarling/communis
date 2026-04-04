# Communis — Lovable Implementation Prompt

> **Purpose**: This document is the single-source handoff from the scaffold repo to Lovable. It contains everything Lovable needs to build the production app without back-and-forth clarification. Read the entire document before generating any code.

---

## What Communis Is

Communis is a cooperative management platform — the operating system for worker cooperatives. It replaces the spreadsheet-and-Loomio-and-QuickBooks patchwork that co-ops use today with an integrated system for member equity tracking, patronage distribution, democratic governance, and financial transparency.

It is built on the **CROS (Communal Relationship Operating System)** philosophy: story guides structure, technology carries the weight, humans carry the meaning. The AI layer is called **NRI (Narrative Relational Intelligence)** — it follows a core loop of **Recognize · Synthesize · Prioritize**. NRI is rule-based (deterministic signal detection), not LLM-driven. AI assists with phrasing only.

**Domain**: communis.coop
**Target market**: ~1,300 US worker cooperatives, expanding to 30,000+ all US cooperatives
**Business model**: SaaS + Stripe Connect transaction fees

---

## What Already Exists in This Repo

The scaffold repo contains **57 files, ~11,000 lines** of working React + TypeScript + Tailwind CSS. Everything builds and runs. The scaffold includes:

### Marketing Site (7 pages)
- `/` — Homepage with animated SVG cooperative network, live browser-frame screenshots, stats, CROS body section
- `/features` — 13 feature modules across 4 categories
- `/pricing` — Two-tier model (details below)
- `/map` — Interactive TopoJSON US map with 408 geocoded cooperatives, industry filter, hover tooltips
- `/manifesto` — Cooperative history from Rochdale to civil rights to silver tsunami
- `/open-source` — Stack breakdown with bug/feature request links
- `/demo` — Contact form gate (bypassable)

### App Demo (11 pages)
- `/app` — Dashboard with NRI greeting, stats, signals, equity overview
- `/app/members` — Member roster with status badges, equity progress
- `/app/members/:id` — Member Story (CROS narrative, equity journey)
- `/app/governance` — Proposals, voting UI, discussion/voting/resolved
- `/app/patronage` — Surplus distribution table, qualified/non-qualified splits
- `/app/committees` — Committee management with rotation fairness index
- `/app/payments` — Stripe Connect dashboard (buy-ins, dues, patronage payouts)
- `/app/payments/setup` — Payment onboarding (choose which features to enable)
- `/app/integrations` — QuickBooks financial dashboard, time source connections
- `/app/import` — "Bring Your Mess" CSV import with fuzzy field mapping
- `/app/onboarding` — Cooperative setup wizard with 8 templates

### Gardener Console (8 pages)
- `/gardener` — Dark-themed operator console with tenant overview, KPIs, system signals
- `/gardener/tenants` — Cooperative management (stub)
- `/gardener/content` — Perplexity AI essay pipeline (draft/review/published)
- `/gardener/seo` — Keyword rankings, Perplexity query scheduler
- `/gardener/analytics` — Platform metrics (stub)
- `/gardener/system` — Service health (Supabase, Stripe, Perplexity, DeepL)
- `/gardener/inbox` — Support tickets (stub)
- `/gardener/settings` — API keys, feature flags (stub)

### Infrastructure Already Built
- **Type system**: 4 files (`types/index.ts`, `payments.ts`, `integrations.ts`, `scheduling.ts`) with complete cooperative data model
- **Context providers**: `AccessibilityProvider → DemoModeProvider → AuthProvider → TenantProvider` (CROS nesting pattern)
- **Role system**: 6 roles with permission matrix, role switcher in demo
- **NRI engine**: `scopeGuardrails.ts` (crisis/off-topic detection), `signalEngine.ts` (7 deterministic rules)
- **NRI Compass**: Chat drawer with quick prompts, role-scoped responses, typing indicator
- **i18n**: English/Spanish with 30+ cooperative glossary terms, `t()` function, DeepL config
- **Accessibility**: WCAG 2.2 AA mode (focus rings, killed animations, touch targets)
- **Notifications**: Type system with 12 templates, preference system, channel routing
- **SEO Engine**: Perplexity query types, 8 default queries, 14 tracked keywords
- **CSV Parser**: Auto-delimiter detection, fuzzy field mapping
- **408 geocoded cooperatives** from USFWC directory data
- **8 cooperative templates** (cleaning, tech, food, construction, childcare, consulting, retail, custom) with pre-filled bylaws

---

## What Lovable Needs to Build

### Phase 1: Supabase Backend (do this FIRST)

**Auth**: Supabase Auth with email/password. On signup, create a profile row and tenant_users membership. The `profiles` table stores `display_name`, `nickname`, `timezone`, `is_approved`. The `user_roles` table stores role assignments.

**Multi-tenancy**: Every table has a `tenant_id` column with RLS policies: `auth.uid()` must be in `tenant_users` for that tenant. Use the existing type definitions in `src/types/` as the schema source of truth.

**Core tables** (create migrations in this order):
1. `tenants` — cooperative profile (matches `Tenant` type)
2. `bylaw_configs` — one per tenant (matches `BylawConfig` type)
3. `profiles` + `user_roles` + `tenant_users` — auth and membership
4. `members` — cooperative members (matches `Member` type)
5. `ica_transactions` — internal capital account ledger (matches `ICATransaction` type)
6. `patronage_runs` + `patronage_allocations` — patronage engine
7. `proposals` + `votes` — governance
8. `committees` + `committee_memberships` — committee management
9. `meetings` — meeting management
10. `labor_entries` — hours tracking
11. `nri_signals` — NRI signal storage
12. `import_batches` — import tracking
13. `notifications` + `notification_preferences` — notification system

**RLS pattern**: For every table, create a policy where `tenant_id = (SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid() LIMIT 1)`.

### Phase 2: Replace Demo Data with Real Queries

Every page currently renders from static demo data in `src/data/demo.ts`. Replace each with real Supabase queries using TanStack React Query (already a CROS pattern — 30s stale time, 5min GC, 1 retry).

- `DashboardPage` → query members, proposals, nri_signals, ica aggregate
- `MembersPage` → query members with ICA balance aggregate
- `MemberStoryPage` → query single member + ica_transactions + labor_entries
- `GovernancePage` → query proposals + votes
- `PatronagePage` → query patronage_runs + patronage_allocations
- `CommitteesPage` → query committees + committee_memberships
- `PaymentsPage` → query payment tables (see Phase 4)

### Phase 3: Real Auth Flow

Replace the `DemoModeContext` → `AuthContext` → `TenantContext` chain with real Supabase auth:

1. `DemoModeContext` stays as-is (intercepting writes in demo mode)
2. `AuthContext` connects to `supabase.auth.onAuthStateChange()`, fetches profile + roles
3. `TenantContext` fetches tenant + bylaw_config + feature_flags from the user's tenant_users membership
4. Add `/login`, `/signup`, `/forgot-password`, `/reset-password` pages
5. Add `ProtectedRoute` checks against real auth state (scaffold already exists)
6. Implement `ViewMode` context: "guided" (member) vs "full" (steward) workspace toggle

### Phase 4: Stripe Connect

Use Supabase Edge Functions for all Stripe operations. The type definitions in `src/types/payments.ts` are the contract.

**Edge Functions to create**:
- `stripe-connect-onboard` — Create Connected Account for cooperative, return onboarding URL
- `stripe-connect-status` — Check if onboarding is complete, charges/payouts enabled
- `buy-in-create-payment` — Create PaymentIntent (one-time) or Subscription (installments) for member buy-in
- `buy-in-webhook` — Handle payment_intent.succeeded → write ICA transaction
- `dues-create-subscription` — Create Stripe Billing subscription for recurring dues
- `dues-webhook` — Handle invoice.paid → log payment
- `patronage-payout` — Create Transfers to member bank accounts after governance vote passes
- `stripe-webhook` — Central webhook handler routing to above

**Platform fee**: Application fee of 0.5% on every transaction via Stripe Connect's `application_fee_amount` parameter.

**Important**: Connected Account type should be `Standard` (co-op manages their own Stripe dashboard) not `Express` or `Custom`.

### Phase 5: QuickBooks Integration

Edge Functions:
- `qbo-oauth-start` — Redirect to QuickBooks OAuth
- `qbo-oauth-callback` — Exchange code for tokens, store encrypted
- `qbo-sync` — Pull financial snapshot (revenue, expenses, net income, cash)
- `qbo-sync-payroll` — Pull payroll hours → match to members → write labor_entries
- `qbo-write-journal` — Push patronage journal entries back to QBO

Use the types in `src/types/integrations.ts`.

### Phase 6: NRI Compass (Production)

The scaffold has the UI (`CompassDrawer`) and guardrails (`scopeGuardrails.ts`). For production:

1. Create edge function `nri-compass-chat` that:
   - Receives message + user role + tenant_id
   - Runs scope guardrails server-side
   - Queries relevant cooperative data based on role's `KnowledgeBoundary`
   - Sends context + message to Claude API (or OpenAI) for response generation
   - Returns response
2. The signal engine (`signalEngine.ts`) runs as a scheduled edge function (`nri-generate-signals`) — daily or on data change. Writes to `nri_signals` table.
3. NRI never makes decisions. It serves attention. The tone is calm, narrative, cooperative-aware.

### Phase 7: Gardener Console (Production)

The scaffold has layout + pages. For production:
- Gardener is an `admin` role in `user_roles`
- `/gardener` routes are wrapped in `ProtectedRoute requiredRoles={['admin']}`
- Tenant impersonation: session-storage override of tenant context (pattern from CROS `TenantContext`)
- Content Studio: Supabase table `essay_drafts` + edge function calling Perplexity API
- SEO Engine: Supabase table `keyword_rankings` + `perplexity_queries` + scheduled edge functions

### Phase 8: i18n + Accessibility

- **i18n**: The scaffold has `src/i18n/index.ts` with `t()` function and en/es strings. Expand to full locale JSON files. Add DeepL edge function for translating user-generated content (proposals, meeting minutes). Add language switcher to settings.
- **Accessibility**: The scaffold has `AccessibilityProvider` and CSS. Add toggle in user settings. Ensure all interactive elements have proper ARIA labels. Test with screen reader.

---

## Pricing Model (source of truth)

**Two tiers, same features:**

| | Communis | Communis + Payments |
|---|---|---|
| Price | $49/mo ($490/yr) | $49/mo + 0.5% per transaction |
| Free tier | ≤5 members | ≤5 members (payments add when ready) |
| All features | Yes | Yes |
| Stripe Connect | No | Buy-ins, dues, patronage payouts |

---

## Role System (source of truth)

| Role | See own equity | See all equity | Vote | Manage members | Manage bylaws | Run patronage | Access gardener |
|---|---|---|---|---|---|---|---|
| Candidate | Yes | No | No | No | No | No | No |
| Member | Yes | Bylaw-dependent | Yes | No | No | No | No |
| Coordinator | Yes | Yes | Yes | Yes | No | No | No |
| Steward | Yes | Yes | Yes | Yes | Yes | Yes | No |
| Advisor | No | Yes | No | No | No | No | No |
| Gardener | Yes | Yes | N/A | Yes | Yes | Yes | Yes |

Visibility of financial data to Members and Candidates is **bylaw-configurable** via `BylawConfig.visibility_rules`.

---

## Design System

**Fonts**: Source Serif 4 (headings), Inter (body)
**Colors**: Earthy cooperative palette defined in `tailwind.config.js`:
- `grove` (green) — primary actions, positive states, equity
- `terra` (brown) — borders, subtle backgrounds
- `warmth` (amber/orange) — warnings, candidates, financial highlights
- `commons` (blue-gray) — governance, informational

**Components**:
- `.narrative-card` — white/80 backdrop-blur, terra border, rounded-2xl, p-6
- `.calm-button-primary` — grove-600, rounded-xl, hover shadow
- `.calm-button-secondary` — white, grove border
- `.signal-dot` — 2px pulsing indicator

**Gardener console**: Dark theme (gray-900/950) with grove-400 accents.

**Philosophy**: Calm, narrative-first. No alert fatigue. No dashboard urgency. Equity statements read like sentences, not spreadsheets. "Your equity of $12,480 reflects 6 years of shared ownership."

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 3
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions, Realtime, RLS)
- **Payments**: Stripe Connect (Standard accounts)
- **UI Components**: Replace current hand-rolled components with shadcn/ui (Lovable default)
- **Data Fetching**: TanStack React Query
- **Routing**: React Router v7 (already configured)
- **Maps**: topojson-client + us-atlas CDN
- **AI**: Claude API or OpenAI for NRI compass phrasing (edge function)
- **Search/SEO**: Perplexity AI API for news aggregation
- **Translation**: DeepL API for Spanish content
- **Icons**: Lucide React

---

## File Structure (preserve this)

```
src/
├── components/
│   ├── a11y/          # Accessibility provider
│   ├── auth/          # ProtectedRoute
│   ├── compass/       # NRI Compass drawer
│   ├── gardener/      # GardenerLayout
│   ├── gates/         # FeatureGate
│   ├── import/        # ImportWizard
│   ├── layout/        # AppLayout, MarketingLayout
│   ├── marketing/     # BrowserFrame, AppScreenshots, CooperativeMap
│   └── onboarding/    # OnboardingWizard, PaymentSetup
├── contexts/          # DemoMode, Auth, Tenant
├── data/              # demo.ts, cooperatives.ts (408 geocoded co-ops)
├── i18n/              # Locale system with DeepL
├── lib/
│   ├── notifications/ # Template system
│   ├── nri/           # scopeGuardrails, signalEngine
│   └── seo/           # Perplexity engine
├── pages/
│   └── gardener/      # 8 gardener pages
└── types/             # index, payments, integrations, scheduling
```

---

## Critical Implementation Notes

1. **All financial amounts are stored in cents** (integer). Never use floating point for money. Display with `(amount / 100).toLocaleString()`.

2. **NRI is rule-based, not AI**. The signal engine (`signalEngine.ts`) uses deterministic rules. AI is only used for natural language phrasing in the Compass chat. Never let AI make decisions about cooperative governance or finances.

3. **Demo mode must always work**. The `DemoModeContext` pattern must be preserved — it intercepts writes and provides synthetic data. This is how prospects experience the product.

4. **Bylaws drive everything**. Patronage basis, voting method, quorum thresholds, buy-in amounts, visibility rules — all come from `BylawConfig`. Never hardcode these values.

5. **The cooperative owns their Stripe account**. Communis is a platform (Stripe Connect), not a payment processor. Money flows directly to the cooperative's bank account. Communis takes an application fee. We never hold cooperative funds.

6. **Every table needs tenant_id + RLS**. No exceptions. Row-level security is the foundation of multi-tenancy.

7. **Spanish is not optional**. 37.9% of worker-owners are Latinx. The i18n system exists — use it for all user-facing strings.

8. **The Gardener console is admin-only**. It must be behind role-based route protection. It uses a dark theme to visually distinguish it from the tenant app.

9. **Preserve the CROS narrative voice**. Equity statements are sentences, not numbers. NRI signals are gentle observations, not alerts. The app notices, it doesn't nag.

10. **Cooperative templates pre-fill bylaws**. When a co-op selects "Cleaning Cooperative" during onboarding, the system pre-fills: $2,000 buy-in, hours-based patronage, 80% qualified, majority voting, 6-month candidacy, 3-year revolvement. The co-op can customize everything.

---

## What NOT to Build

- **Accounting software** — We integrate with QuickBooks/Xero, we don't replace them
- **Payroll** — We import hours from payroll systems, we don't process payroll
- **General-purpose chat/messaging** — NRI Compass is a knowledge assistant, not Slack
- **CRM** — Communis is a Cooperative OS, not a customer relationship tool
- **Scheduling/shift management** — We import from scheduling tools, we don't build a scheduler (committee scheduling is the exception)
