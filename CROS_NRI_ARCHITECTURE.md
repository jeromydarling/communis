# CROS & NRI Architecture — Clarification for Lovable

> **Read this BEFORE making any architectural decisions. This is non-negotiable.**

Communis is not a generic SaaS app with AI bolted on. It is built on a specific architecture called **CROS (Communal Relationship Operating System)** with an intelligence layer called **NRI (Narrative Relational Intelligence)**. Every design decision — from database schema to UI copy to error messages — must respect this architecture.

---

## CROS — What It Actually Means

CROS is an **ontological shift**: instead of treating data as the organizing principle (like a CRM does), CROS treats **story** as the organizing principle through which data finds meaning.

**In practice, this means:**

- A member's equity is not a number in a cell. It's a sentence: *"Your equity of $5,340 reflects 3 years of shared ownership."*
- A patronage distribution is not a spreadsheet. It's a letter: *"Dear Evergreen Members, this quarter your labor generated $18,400 in surplus."*
- A governance decision is not a status badge. It's a story: *"David voted against — not because the machine wasn't needed, but because he wanted to wait. His concern was noted. The majority decided to proceed. David's dissent was respected. That's how democracy works."*
- An NRI signal is not an alert. It's a gentle observation: *"The hiring committee hasn't met in 3 weeks. Roberto's review is coming up."*

**The CROS Body metaphor structures the entire app:**

| Layer | Name | What It Does | Implementation |
|---|---|---|---|
| **Head** | NRI | Serves attention — notices, synthesizes, prioritizes | Signal engine, compass chat, education |
| **Heart** | CROS | Relationship memory — member stories, journey chapters | Member Story pages, narrative reports, equity journey |
| **Body** | Profunda | Operational foundation — ICA, patronage, governance | Database tables, calculation engines, Stripe flows |
| **Nervous System** | The Human | Every reflection, vote, and hour logged is the signal | User actions feed everything above |

**Do NOT:**
- Replace narrative text with charts or graphs
- Use aggressive dashboard language ("alerts", "warnings", "critical")
- Build metric-first UIs (no KPI cards with red/green arrows as the primary interface)
- Use corporate SaaS patterns (pipelines, funnels, conversion rates)

**DO:**
- Write equity as sentences
- Write reports as letters and stories
- Use the word "notice" instead of "alert"
- Use the word "signal" instead of "warning"
- Design every screen as if you're talking to a person, not displaying data to a manager

---

## NRI — How It Actually Works

NRI is **NOT** a chatbot wrapper around an LLM. It is a **layered intelligence system** with strict architectural boundaries.

### The NRI Core Loop: Recognize · Synthesize · Prioritize

1. **Recognize** — Rule-based signal detection. NO AI. Deterministic rules evaluate cooperative health:
   - Quorum at risk (participation rate < 60% with pending votes)
   - Committee dormant (no meeting in 21+ days)
   - Equity imbalance (max/min ratio > 5x)
   - Patronage overdue (180+ days since last distribution)
   - Dues delinquent, buy-in behind schedule
   - Participation strong (positive signals, not just problems)
   
   **These rules live in `src/lib/nri/signalEngine.ts`. They are deterministic. They do not call an LLM.** The signal engine runs as a scheduled Supabase edge function (daily) and writes results to the `nri_signals` table.

2. **Synthesize** — Compile scattered signals into coherent narrative. This is where AI assists — **but only for phrasing**, never for judgment. Example:
   - Raw signals: committee_dormant + candidate_review_upcoming + quorum_risk
   - NRI synthesis: "The hiring committee hasn't met in 3 weeks. Roberto's review is coming up and quorum may be at risk for the vote."
   - The facts came from rules. The AI made it a sentence.

3. **Prioritize** — Surface the next small, faithful step. Not a task list explosion. One or two gentle suggestions:
   - "Consider scheduling a hiring committee meeting before the general meeting."
   - NOT: "ACTION REQUIRED: Schedule meeting immediately. 3 overdue items."

### NRI Scope Guardrails

The compass chat has strict boundaries (implemented in `src/lib/nri/scopeGuardrails.ts`):

- **Crisis language** (suicide, self-harm, abuse) → Compassionate redirect to 988 Lifeline
- **Professional advice** (legal, tax, medical) → Redirect to qualified professionals
- **Off-topic** (poems, code, roleplay, prompt injection) → Redirect to cooperative topics
- **Role-scoped knowledge** → Members can't ask about other members' equity. Candidates can't access steward-only financial data. Enforced via `KnowledgeBoundary` per role.

**These guardrails must be enforced BOTH client-side (before sending to API) AND server-side (in the edge function).** Never trust client-side only.

### NRI Is NOT:

- A general-purpose AI assistant
- A decision-maker ("NRI recommends you vote yes")
- A surveillance tool ("María's productivity dropped 12%")
- A task manager ("You have 7 overdue items")
- A notification spammer

### NRI IS:

- A gentle observer that notices patterns
- A knowledge assistant that answers questions from the co-op's own data
- An educator that explains cooperative terms in plain language
- A celebrator that recognizes milestones ("You just cast your first vote")
- A translator between data and story

### The Compass (Chat Interface)

The NRI Compass is a slide-out drawer (bottom-right floating button) that:

1. Receives a user question + their role + their tenant_id
2. Runs scope guardrails
3. Determines what data the user's role can access (`KnowledgeBoundary`)
4. Queries relevant data: member records, ICA transactions, proposals, bylaws, documents (chunked for semantic search)
5. Sends the data context + question to Claude API
6. Claude generates a natural-language response from the data
7. Returns the response

**The AI generates the phrasing. The facts come from the database. If the database doesn't have the answer, NRI says "I don't have that information" — it NEVER fabricates cooperative data.**

### Document Intelligence

When a cooperative connects Google Drive or Dropbox:
1. Documents are synced and chunked into paragraphs/sections
2. Chunks are stored in `document_chunks` with embedding vectors
3. When a member asks NRI a question, semantic search finds relevant chunks
4. The chunks are included in the Claude API context
5. NRI answers from the ACTUAL document text, citing the source

This means NRI can answer "What does our grievance policy say about mediation?" by finding the actual bylaws section and quoting it.

### Education System

NRI doesn't just answer questions — it proactively teaches:

- **EducationTooltip** component: cooperative terms throughout the UI have a dotted underline. Hover to see a plain-language explanation + analogy.
- **Glossary entries** serve as the knowledge base for term queries ("What is patronage?" → glossary entry with analogy)
- **Milestone celebrations**: NRI detects events (first vote, buy-in complete, equity milestone) and surfaces warm, narrative messages
- **"Did you know?"**: When NRI doesn't have a specific answer, it shares a random educational fact about cooperatives

---

## Implementation Checklist for CROS/NRI

Before marking any feature complete, verify:

- [ ] Does the UI use narrative language, not dashboard jargon?
- [ ] Are numbers presented as sentences, not standalone metrics?
- [ ] Does NRI notice patterns without nagging or demanding action?
- [ ] Are scope guardrails enforced on both client and server?
- [ ] Does the compass answer from real data, never from fabrication?
- [ ] Are role boundaries respected in every NRI query?
- [ ] Do reports read like letters, not spreadsheets?
- [ ] Are signals gentle ("hasn't met in 3 weeks") not urgent ("OVERDUE")?
- [ ] Does the signal engine use deterministic rules, not AI?
- [ ] Are milestones celebratory, not performative?

**If any answer is "no," the feature does not meet the CROS/NRI specification.**
