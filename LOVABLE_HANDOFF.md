# Communis — Lovable Implementation Prompt

> **CRITICAL**: This app is NOT done when it compiles. This app is NOT done when pages render. This app is DONE when every feature is wired front-to-back — real data flows from Supabase to UI, real auth gates routes, real Stripe processes payments, real NRI answers from real documents. A page that renders static demo data is a scaffold, not a feature. **Build the complete, functioning application. Leave no stone unturned.**

> Read the entire document before generating any code.

---

## What Communis Is

Communis is a cooperative management platform — the operating system for worker cooperatives. It replaces the spreadsheet-and-Loomio-and-QuickBooks patchwork that co-ops use today with an integrated system for member equity tracking, patronage distribution, democratic governance, financial transparency, payments, document intelligence, and cooperative education.

Built on **CROS (Communal Relationship Operating System)**: story guides structure, technology carries the weight, humans carry the meaning. AI layer is **NRI (Narrative Relational Intelligence)** — Recognize · Synthesize · Prioritize. NRI is rule-based. AI assists with phrasing only.

**Domain**: communis.coop  
**Market**: ~1,300 US worker cooperatives → 30,000+ all US cooperatives  
**Model**: SaaS ($49/mo) + Stripe Connect transaction fees (0.5%)

---

## What Already Exists — 87 files, ~16,000 lines

Everything builds, runs, and renders with demo data. **Your job is to replace demo data with real Supabase queries, real auth, real Stripe, and real API integrations — for EVERY page.**

### Marketing Site (16 pages)
| Route | Page | Status |
|---|---|---|
| `/` | Homepage — hero, animated SVG, 6 live browser screenshots, 9 features, CROS body, stats | Complete |
| `/features` | 8 feature categories, 30+ feature cards | Complete |
| `/pricing` | Two-tier with Stripe signup buttons | Wire Stripe checkout links |
| `/map` | 408 geocoded cooperatives, TopoJSON map | Complete |
| `/compare` | Before/after comparison, real pain quotes, cost analysis | Complete |
| `/learn` | Learning hub — links to all educational resources | Complete |
| `/week` | "A Week at a Cleaning Co-op" — 7-day narrative | Complete |
| `/faq` | 12 FAQ accordion items | Complete |
| `/manifesto` | Cooperative history, CROS philosophy | Complete |
| `/about` | About page, beliefs, ecosystem partners | Complete |
| `/open-source` | Tech stack, feedback links | Complete |
| `/contact` | Stripe signup cards + contact form | Wire Stripe + form submission |
| `/demo` | Demo gate with contact form | Wire form to Supabase |
| `/legal/terms` | Terms of Service | Complete |
| `/legal/privacy` | Privacy Policy | Complete |
| `/legal/ai-transparency` | AI Transparency policy | Complete |

### App (24 pages) — ALL need real Supabase wiring
| Route | Page | What to wire |
|---|---|---|
| `/app` | Dashboard | Query members, proposals, signals, ICA aggregates |
| `/app/members` | Member roster | Query members + ICA balances |
| `/app/members/:id` | Member Story | Query member + transactions + labor + committees |
| `/app/governance` | Proposals & voting | Query proposals + votes, WRITE votes |
| `/app/patronage` | Patronage distribution | Query runs + allocations, TRIGGER from vote |
| `/app/committees` | Committees & fairness | Query committees + memberships + rotation |
| `/app/meetings` | Meeting management | CRUD meetings, agenda, minutes, quorum, RSVP |
| `/app/bylaws` | Bylaws registry | Query bylaws sections, amendment history |
| `/app/announcements` | Communication | CRUD announcements + committee threads |
| `/app/reports` | Narrative reports | Generate from real data, PDF export |
| `/app/payments` | Stripe dashboard | Query Stripe transactions via edge functions |
| `/app/payments/setup` | Payment onboarding | Real Stripe Connect OAuth flow |
| `/app/documents` | Document library | Google Drive/Dropbox OAuth, file sync, NRI indexing |
| `/app/communio` | Knowledge hub | Cross-tenant queries, consent management, replies |
| `/app/integrations` | QuickBooks dashboard | Real QBO OAuth + data sync |
| `/app/rehearsal` | Rehearsal votes | WRITE practice votes, store results |
| `/app/glossary` | Cooperative glossary | Complete (static content) |
| `/app/learn` | Knowledge base | Track read progress per member |
| `/app/library` | Cooperative library | Google Books API for covers |
| `/app/conversion` | Conversion toolkit | Checklist persistence per tenant |
| `/app/advisor` | Advisor multi-coop view | Cross-tenant read queries (advisor role) |
| `/app/annual-meeting` | Annual meeting workflow | Aggregate from governance + finance + members |
| `/app/import` | CSV import wizard | Parse → map → WRITE to Supabase tables |
| `/app/onboarding` | Cooperative setup | CREATE tenant + bylaws + committees |

### Gardener Console (8 pages) — ALL need real wiring
| Route | What to wire |
|---|---|
| `/gardener` | Real tenant list, real KPIs, real system signals |
| `/gardener/tenants` | Tenant detail, impersonation, config overrides |
| `/gardener/content` | Perplexity API → essay drafts → editorial workflow |
| `/gardener/seo` | Real keyword tracking, scheduled Perplexity queries |
| `/gardener/analytics` | Recharts with real platform metrics |
| `/gardener/system` | Real health checks (Supabase, Stripe, Perplexity, DeepL) |
| `/gardener/inbox` | Support ticket management |
| `/gardener/settings` | API key management, default templates, feature flags |

---

## COMPLETION REQUIREMENTS — Read This Carefully

**The app is NOT complete until ALL of the following are true:**

### Auth (every item must work)
- [ ] Email/password signup creates profile + tenant_users row
- [ ] Login redirects to `/:tenantSlug/` dashboard
- [ ] Logout clears session and redirects to marketing site
- [ ] Forgot password sends reset email
- [ ] Reset password works with token from email
- [ ] Role-based route protection: candidates can't access steward pages
- [ ] Demo mode still works for unauthenticated users visiting `/demo`
- [ ] Welcome Experience triggers on first login (component exists: `WelcomeExperience.tsx`)

### Data (every page must query real data)
- [ ] Zero pages render from `src/data/demo.ts` in production mode
- [ ] Every page that shows member data queries `members` table
- [ ] Every page that shows equity queries `ica_transactions` with aggregation
- [ ] Every page that shows proposals queries `proposals` + `votes`
- [ ] Every page that shows patronage queries `patronage_runs` + `patronage_allocations`
- [ ] Computed values (ICA balance, patronage share, rotation fairness) are calculated from real data
- [ ] TanStack React Query used for all data fetching (30s stale, 5min GC, 1 retry)

### Mutations (every write action must persist)
- [ ] Creating a proposal writes to `proposals` table
- [ ] Casting a vote writes to `votes` table and updates proposal status
- [ ] Running patronage calculates allocations and writes to `patronage_allocations`
- [ ] A governance vote passing triggers the linked outcome (patronage distribution, member onboard)
- [ ] Adding a member writes to `members` table
- [ ] Logging hours writes to `labor_entries` table
- [ ] Importing CSV writes to the target table (members, ICA, labor)
- [ ] Creating a meeting writes to `meetings` table
- [ ] Posting an announcement writes to `announcements` table
- [ ] Saving bylaws amendments writes to `bylaw_amendments` table
- [ ] Sharing a Communio insight writes to `communio_insights` table

### Stripe Connect (every payment flow must work end-to-end)
- [ ] Cooperative can connect Stripe account via OAuth (Standard Connected Account)
- [ ] Members can pay buy-in (one-time or installment subscription)
- [ ] Payment success writes ICA transaction automatically
- [ ] Recurring dues create Stripe Billing subscriptions
- [ ] Patronage payouts send Stripe Transfers to member bank accounts
- [ ] Webhook handler processes all payment events
- [ ] Platform fee (0.5%) applied via `application_fee_amount`
- [ ] Payment dashboard shows real transaction data from Stripe

### Integrations (each must complete OAuth + data sync)
- [ ] QuickBooks: OAuth → token storage → financial data pull → display in dashboard
- [ ] QuickBooks: Patronage journal entries written back to QBO
- [ ] Google Drive: OAuth → folder selection → document sync → NRI indexing
- [ ] Dropbox: OAuth → folder selection → document sync → NRI indexing
- [ ] Time sources: At least CSV import of hours working end-to-end

### NRI (must work with real cooperative data)
- [ ] Signal engine runs on real data (not demo data) — scheduled or on-change
- [ ] Compass chat queries real member data, real documents, real bylaws
- [ ] Scope guardrails block crisis/off-topic/professional-advice server-side
- [ ] Role-scoped knowledge boundaries enforced (candidates can't query steward data)
- [ ] Milestone detection triggers on real events (first vote, buy-in complete, etc.)

### Gardener Console (must work with real multi-tenant data)
- [ ] Overview shows real tenant list with real KPIs
- [ ] Impersonation allows viewing any tenant as any role
- [ ] Content Studio calls Perplexity API and stores essay drafts
- [ ] SEO Engine runs scheduled queries and tracks keyword rankings
- [ ] System health checks real service endpoints

### i18n (must be complete)
- [ ] Every user-facing string uses `t()` function
- [ ] Language switcher in user settings
- [ ] Spanish translations complete for all UI strings
- [ ] DeepL edge function translates user-generated content (proposals, minutes)

### Reports (must generate from real data)
- [ ] Year-in-Review generates narrative from real member/financial/governance data
- [ ] Patronage Letter populates from real patronage run data
- [ ] Member Equity Statement populates from real ICA transactions
- [ ] Governance Narrative populates from real proposals/votes
- [ ] PDF export works for all report types

### Edge Cases That Must Work
- [ ] New tenant with zero members sees empty states, not errors
- [ ] Departing member triggers revolvement schedule calculation
- [ ] Patronage run with zero surplus handles gracefully
- [ ] Consensus vote with a block correctly prevents passage
- [ ] Member with incomplete buy-in can't receive patronage (bylaw-dependent)
- [ ] Candidate role correctly restricts all candidate-restricted features

---

## Implementation Order

**Do not skip ahead. Each phase depends on the previous one.**

1. **Supabase schema** — Create ALL tables with RLS. Test that RLS works.
2. **Auth flow** — Signup, login, logout, reset, role fetching. Test with real users.
3. **Tenant + Bylaws** — Create tenant on signup, configure bylaws. Test cooperative creation.
4. **Core data** — Members, ICA, patronage, governance, committees, meetings, labor. Wire every page.
5. **Stripe Connect** — All payment flows. Test with Stripe test mode.
6. **QuickBooks** — OAuth + sync. Test with QBO sandbox.
7. **Document connectors** — Google Drive + Dropbox OAuth + NRI indexing.
8. **NRI production** — Claude API edge function for compass. Scheduled signal generation.
9. **Communio** — Cross-tenant sharing with consent and anonymization.
10. **Gardener console** — Impersonation, content studio, SEO engine.
11. **i18n** — Full Spanish translations, DeepL integration.
12. **Reports** — PDF generation from real data.
13. **API keys** — Connect real Stripe, QuickBooks, Google, Dropbox, Perplexity, DeepL, Claude API keys. **This is the LAST step.**

---

## Pricing Model

**Two tiers, same features:**

| | Communis | Communis + Payments |
|---|---|---|
| Price | $49/mo ($490/yr) | $49/mo + 0.5% per transaction |
| Free tier | ≤5 members | ≤5 members (payments add when ready) |
| All features | Yes | Yes |
| Stripe Connect | No | Buy-ins, dues, patronage payouts |

---

## Role System

| Role | See own equity | See all equity | Vote | Manage members | Manage bylaws | Run patronage | Access gardener |
|---|---|---|---|---|---|---|---|
| Candidate | Yes | No | No | No | No | No | No |
| Member | Yes | Bylaw-dependent | Yes | No | No | No | No |
| Coordinator | Yes | Yes | Yes | Yes | No | No | No |
| Steward | Yes | Yes | Yes | Yes | Yes | Yes | No |
| Advisor | No | Yes | No | No | No | No | No |
| Gardener | Yes | Yes | N/A | Yes | Yes | Yes | Yes |

---

## Design System

**Fonts**: Source Serif 4 (headings), Inter (body)  
**Colors**: grove (green), terra (brown), warmth (amber), commons (blue-gray)  
**Gardener**: Dark theme (gray-900/950) with grove-400 accents  
**Voice**: Calm, narrative-first. No alert fatigue. Reports are letters, not ledgers. Equity is a sentence, not a number.

---

## Type System (source of truth for schema)

- `src/types/index.ts` — Members, ICA, Patronage, Governance, Committees, Meetings, Labor, Bylaws, Tenants, NRI, Import, Templates
- `src/types/payments.ts` — Stripe Connect, Buy-In, Dues, Patronage Payouts, Payment Events
- `src/types/integrations.ts` — QuickBooks, Time Import Sources
- `src/types/scheduling.ts` — Committee Schedules, Term Rotation, Fairness
- `src/types/documents.ts` — Document Connectors, Document Types, NRI Chunks
- `src/types/communio.ts` — Insights, Questions, Patterns, Sharing Consent

**Every type maps to a Supabase table. Create the tables from the types.**

---

## Critical Notes

1. **All money in cents** (integer). Never float. Display: `(cents / 100).toLocaleString()`.
2. **NRI is rule-based**. AI phrases responses only. Signal engine is deterministic.
3. **Demo mode preserved**. Unauthenticated users at `/demo` see the full demo with synthetic data.
4. **Bylaws drive everything**. Never hardcode patronage basis, voting method, quorum, buy-in amounts.
5. **Co-op owns their Stripe account**. We never hold funds. Standard Connected Accounts.
6. **Every table: tenant_id + RLS**. No exceptions.
7. **Spanish required**. 37.9% Latinx worker-owners. All UI strings through `t()`.
8. **Narrative voice**. Reports are human prose. Equity statements are sentences. NRI notices, never nags.
9. **Templates pre-fill bylaws**. 8 cooperative templates with default configurations.
10. **API keys are the LAST step**. Everything else must be wired and tested first.

---

## What NOT to Build

- Accounting software (integrate with QuickBooks)
- Payroll (import hours from payroll systems)
- General chat (NRI Compass is a knowledge assistant)
- CRM (this is a Cooperative OS)
- Shift scheduling (import from scheduling tools)

---

## Definition of Done

**The app is complete when a new cooperative can:**
1. Sign up and create their cooperative (onboarding wizard)
2. Configure bylaws from a template
3. Add members (manually or via CSV import)
4. Connect Stripe and collect member buy-ins
5. Track member equity in Internal Capital Accounts
6. Log labor hours (manual or import)
7. Run a patronage calculation and hold a governance vote
8. Distribute patronage via Stripe payouts
9. Upload documents and ask NRI questions about them
10. Practice governance with rehearsal votes
11. Generate a narrative annual report
12. Share an anonymized insight to Communio
13. Do all of the above in Spanish

**If any of these 13 steps don't work end-to-end, the app is not done.**
