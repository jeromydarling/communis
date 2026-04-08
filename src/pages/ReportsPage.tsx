import { useState } from 'react'
import { FileText, Download, Sparkles, Calendar, Heart, Users, Landmark, ArrowRight } from 'lucide-react'
import { members } from '@/data/demo'

type ReportType = 'annual' | 'patronage' | 'equity' | 'governance' | 'meeting_packet'

interface ReportConfig {
  key: ReportType
  title: string
  subtitle: string
  icon: typeof FileText
}

const REPORTS: ReportConfig[] = [
  { key: 'annual', title: 'Year-in-Review', subtitle: 'The story of your cooperative\'s year', icon: Heart },
  { key: 'patronage', title: 'Patronage Letter', subtitle: 'Your share of the surplus — explained', icon: Landmark },
  { key: 'equity', title: 'Member Equity Statement', subtitle: 'Your ownership journey in one page', icon: Users },
  { key: 'governance', title: 'Governance Narrative', subtitle: 'The decisions we made together', icon: Calendar },
  { key: 'meeting_packet', title: 'Annual Meeting Packet', subtitle: 'Everything you need for the big meeting', icon: FileText },
]

export default function ReportsPage() {
  const [selected, setSelected] = useState<ReportType>('annual')

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-400 mt-1">
          Not dashboards. Not spreadsheets. Stories about your cooperative — told in words.
        </p>
      </div>

      {/* Report selector */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {REPORTS.map(report => (
          <button
            key={report.key}
            onClick={() => setSelected(report.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selected === report.key
                ? 'bg-grove-600 text-white shadow-sm'
                : 'bg-warmth-100 text-gray-500 hover:bg-warmth-200'
            }`}
          >
            <report.icon size={14} />
            {report.title}
          </button>
        ))}
      </div>

      {/* Year-in-Review */}
      {selected === 'annual' && (
        <div className="space-y-6">
          <div className="narrative-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-grove-600 font-medium uppercase tracking-wider">Year-in-Review</p>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-1">Fiscal Year 2024</h2>
                <p className="text-sm text-gray-400 mt-1">Evergreen Workers Co-op · Portland, Oregon</p>
              </div>
              <button className="calm-button-secondary text-xs flex items-center gap-1">
                <Download size={12} /> Export PDF
              </button>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                This was the year Evergreen found its stride.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Six years ago, five people decided to own their work. Not just show up and get paid — but
                <em> own</em> it. Own the decisions, own the surplus, own the mistakes, and own the future.
                In 2024, that bet continued to pay off — not in the way venture capitalists measure returns,
                but in the way that matters: steady work, shared wealth, and a democracy that actually functions.
              </p>

              <h3 className="font-display text-lg font-semibold text-gray-900 mt-8 mb-3">The Numbers, in Human Terms</h3>
              <p className="text-gray-600 leading-relaxed">
                Evergreen earned <strong>$420,000 in revenue</strong> this year — an 8% increase over last year.
                After paying everyone a fair wage (average $22.50/hour, with a pay ratio of 1.3:1), after covering
                supplies, insurance, and the van payment, there was <strong>$54,000 left over</strong>.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In a regular company, that $54,000 would go to an owner who didn't mop a single floor. Here,
                it went back to the five people who earned it — proportional to their hours. María, who worked
                the most hours, received the largest share. But even the smallest share was real money,
                deposited into a real account, building real wealth.
              </p>

              <h3 className="font-display text-lg font-semibold text-gray-900 mt-8 mb-3">The People</h3>
              <p className="text-gray-600 leading-relaxed">
                Five active member-owners held the cooperative together this year.
              </p>
            </div>
          </div>

          {/* Member vignettes */}
          <div className="grid md:grid-cols-2 gap-4">
            {members.filter(m => m.status === 'active').map(member => (
              <div key={member.id} className="narrative-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-grove-100 flex items-center justify-center text-sm font-medium text-grove-700">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-display font-semibold text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {member.id === '1' && 'Led the cooperative through another strong year. Represented Evergreen at the USFWC conference in Chicago. Mentored new members and kept the board focused on what matters.'}
                  {member.id === '2' && 'Chaired Operations and Hiring simultaneously. Trained two team members on commercial floor care. His logistics background continues to make the impossible feel routine.'}
                  {member.id === '3' && 'Highest hours in the cooperative this year. Led the Spanish-language onboarding track that will be crucial as Evergreen grows. Her energy is contagious.'}
                  {member.id === '4' && 'Quietly kept the books honest. Advocated for better financial tools (which is partly why we\'re piloting Communis). The Finance Committee runs smoothly because David runs the numbers.'}
                  {member.id === '5' && 'Grew into a team lead this year. Expressed interest in joining the board — a sign that the cooperative\'s democratic culture is working. The future is in good hands.'}
                </p>
                <div className="mt-3 pt-3 border-t border-terra-50 flex items-center justify-between text-xs text-gray-400">
                  <span>{member.hoursThisYear.toLocaleString()} hours</span>
                  <span>${member.equity.toLocaleString()} equity</span>
                  <span>{member.committees.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="narrative-card">
            <div className="prose prose-sm max-w-none">
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">The Candidate</h3>
              <p className="text-gray-600 leading-relaxed">
                Roberto Sandoval joined in November. He works the evening shift, he's quiet, and he shows up
                every single day. His mentor James says Roberto asks good questions — the kind that suggest
                he's thinking about the cooperative, not just the job. His membership review comes in Q2.
                If the pattern holds, he'll become Evergreen's sixth worker-owner.
              </p>

              <h3 className="font-display text-lg font-semibold text-gray-900 mt-8 mb-3">The Democracy</h3>
              <p className="text-gray-600 leading-relaxed">
                Four governance decisions were made this year. The grievance policy was updated by unanimous vote —
                adding an optional mediation step that nobody has needed yet (which is the point). New floor
                equipment was purchased after an honest 4-1 vote where the dissent was heard and respected.
                Meeting attendance averaged 92%. Every committee met on schedule.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This is what functional democracy looks like. Not perfect, not fast, not always comfortable —
                but real. The people who do the work made the decisions about the work.
              </p>

              <h3 className="font-display text-lg font-semibold text-gray-900 mt-8 mb-3">The Departed</h3>
              <p className="text-gray-600 leading-relaxed">
                Karen Whitfield, a founding member, departed in 2023 to care for family. Her equity of $9,400
                is being revolved out over three years per the bylaws. She came to the annual celebration dinner.
                She still calls this place "hers" — and she's right. The cooperative she helped build continues.
              </p>

              <h3 className="font-display text-lg font-semibold text-gray-900 mt-8 mb-3">Looking Forward</h3>
              <p className="text-gray-600 leading-relaxed">
                Year seven is about depth, not growth. Roberto's membership vote. Fatima's potential board
                service. A possible second team for commercial clients. And the quiet, steady accumulation
                of shared wealth — the kind of wealth that no layoff can take away, because the workers
                who built it also own it.
              </p>

              <div className="mt-8 p-6 rounded-xl bg-grove-50 border border-grove-100">
                <p className="font-display text-lg font-semibold text-grove-800 italic">
                  "Computers learned numbers. AI learned language.
                  But only people can build a workplace worth belonging to."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patronage Letter */}
      {selected === 'patronage' && (
        <div className="narrative-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-grove-600 font-medium uppercase tracking-wider">Patronage Letter</p>
              <h2 className="font-display text-2xl font-bold text-gray-900 mt-1">Q4 2024 Distribution</h2>
            </div>
            <button className="calm-button-secondary text-xs flex items-center gap-1">
              <Download size={12} /> Export PDF
            </button>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Dear Evergreen Members,
            </p>
            <p className="text-gray-600 leading-relaxed">
              This quarter, your labor generated <strong>$18,400 in surplus</strong> — the difference between what
              Evergreen earned and what it cost to operate. In a conventional business, this money would disappear
              into someone else's pocket. At Evergreen, it comes back to you.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Per our bylaws (Section 4), patronage is distributed based on hours worked. If you worked 20%
              of the total hours, you receive 20% of the surplus. This isn't a bonus or a gift — it's your
              rightful share of the value you created.
            </p>

            <h3 className="font-display text-lg font-semibold text-gray-900 mt-6 mb-3">Your Share</h3>
            <p className="text-gray-600 leading-relaxed">
              The distribution splits 80/20 between qualified and non-qualified patronage:
            </p>
            <ul className="text-gray-600">
              <li><strong>Qualified (80% = $14,720)</strong> — At least 20% paid in cash. The full amount is reported on your 1099-PATR and taxable this year. The co-op deducts it from its taxes.</li>
              <li><strong>Non-qualified (20% = $3,680)</strong> — Stays in your Internal Capital Account. The co-op pays tax on it now. When it's eventually paid out to you, you won't be taxed again.</li>
            </ul>

            <p className="text-gray-600 leading-relaxed mt-4">
              Your individual allocation is on your Member Equity Statement. If you have questions about the tax
              implications, NRI can explain the basics — but for specific tax advice, please consult your
              accountant. The co-op can recommend cooperative-friendly tax professionals.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              This distribution was approved by majority vote on January 15, 2025, after review by the
              Finance Committee. 1099-PATR forms will be generated automatically by January 31.
            </p>

            <p className="text-gray-600 leading-relaxed mt-6">
              With gratitude for your labor,<br />
              <em>The Finance Committee</em>
            </p>
          </div>
        </div>
      )}

      {/* Equity Statement */}
      {selected === 'equity' && (
        <div className="narrative-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-grove-600 font-medium uppercase tracking-wider">Member Equity Statement</p>
              <h2 className="font-display text-2xl font-bold text-gray-900 mt-1">Ana Lucía Vega</h2>
              <p className="text-sm text-gray-400 mt-1">As of December 31, 2024</p>
            </div>
            <button className="calm-button-secondary text-xs flex items-center gap-1">
              <Download size={12} /> Export PDF
            </button>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Ana Lucía, you've been a worker-owner at Evergreen for three years.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In that time, you've built <strong>$5,340 in equity</strong> — real ownership in a real business,
              earned through your labor. Here's how it breaks down:
            </p>

            <div className="my-6 p-6 rounded-xl bg-warmth-50 border border-warmth-100 not-prose">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-warmth-200">
                  <span className="text-sm text-gray-600">Buy-in contributions</span>
                  <span className="font-display font-semibold text-gray-900">$1,500</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-warmth-200">
                  <span className="text-sm text-gray-600">Patronage allocated (3 years)</span>
                  <span className="font-display font-semibold text-gray-900">$3,840</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-warmth-200">
                  <span className="text-sm text-gray-600">Revolvements paid</span>
                  <span className="font-display font-semibold text-gray-900">$0</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-gray-900">Total equity</span>
                  <span className="font-display text-xl font-bold text-grove-700">$5,340</span>
                </div>
              </div>
            </div>

            <h3 className="font-display text-lg font-semibold text-gray-900 mt-6 mb-3">What This Means</h3>
            <p className="text-gray-600 leading-relaxed">
              Your equity is not a number on a screen. It's your ownership stake in Evergreen. Every hour
              you worked, every floor you cleaned, every client you served — it added to this.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You have <strong>$500 remaining</strong> on your buy-in. At your current installment rate of $125/month,
              you'll complete it by <strong>April 2025</strong>. After that, your equity grows only through
              patronage — your share of the cooperative's success.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If you ever leave Evergreen, your equity will be paid back to you over 3 years per the bylaws.
              This is your money. You built it.
            </p>

            <h3 className="font-display text-lg font-semibold text-gray-900 mt-6 mb-3">Your Year</h3>
            <p className="text-gray-600 leading-relaxed">
              In 2024, you worked <strong>1,720 hours</strong> — the highest in the cooperative. You served
              on the Hiring and Training committees, led the Spanish-language onboarding track, and
              mentored a colleague through their first month. Your patronage allocation for the year
              reflects this contribution.
            </p>
          </div>
        </div>
      )}

      {/* Governance Narrative */}
      {selected === 'governance' && (
        <div className="narrative-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-grove-600 font-medium uppercase tracking-wider">Governance Narrative</p>
              <h2 className="font-display text-2xl font-bold text-gray-900 mt-1">Fiscal Year 2024</h2>
            </div>
            <button className="calm-button-secondary text-xs flex items-center gap-1">
              <Download size={12} /> Export PDF
            </button>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed text-[15px]">
              This year, Evergreen made four collective decisions. Each one was debated, discussed,
              and decided by the people it affected. Here's what happened.
            </p>

            <div className="my-6 p-5 rounded-xl bg-grove-50 border border-grove-100 not-prose">
              <h4 className="font-display font-semibold text-grove-800 mb-2">Grievance Policy Update</h4>
              <p className="text-sm text-grove-700">December 2024 · Supermajority · Passed 5-0</p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                The cooperative extended the grievance timeline from 30 to 45 days and added an optional
                mediation step. María proposed it after reading about conflict resolution in another co-op
                (via Communio). The vote was unanimous — everyone saw the value of giving people more time
                and more options before things escalate. Nobody's used the new mediation step yet. That's
                the point.
              </p>
            </div>

            <div className="my-6 p-5 rounded-xl bg-warmth-50 border border-warmth-100 not-prose">
              <h4 className="font-display font-semibold text-warmth-800 mb-2">Equipment Purchase ($4,200)</h4>
              <p className="text-sm text-warmth-700">November 2024 · Majority · Passed 4-1</p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                The Operations Committee recommended replacing the aging floor scrubber. Three quotes were
                obtained. David voted against — not because the machine wasn't needed, but because he
                wanted to wait until Q1 when cash reserves would be higher. His concern was noted in the
                minutes. The majority decided to proceed. The new equipment has already reduced job times by 15%.
                David's dissent was respected. That's how democracy works.
              </p>
            </div>

            <div className="my-6 p-5 rounded-xl bg-commons-50 border border-commons-100 not-prose">
              <h4 className="font-display font-semibold text-commons-800 mb-2">Q3 Patronage Distribution ($15,200)</h4>
              <p className="text-sm text-commons-700">October 2024 · Majority · Passed 5-0</p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                The Finance Committee's recommendation passed without opposition. $15,200 distributed across
                5 members based on hours worked. This was the co-op's smoothest patronage vote to date —
                members are getting comfortable with the process.
              </p>
            </div>

            <h3 className="font-display text-lg font-semibold text-gray-900 mt-6 mb-3">Democratic Health</h3>
            <p className="text-gray-600 leading-relaxed">
              Meeting attendance averaged 92% across the year. Every committee met on its regular cadence.
              Quorum was achieved at every general meeting. One member — David — participated in every
              single governance decision this year. Fatima, the newest member, grew from observer to active
              participant by Q3.
            </p>
            <p className="text-gray-600 leading-relaxed">
              No grievances were filed. No decisions were appealed. No member blocked a consensus vote.
              This doesn't mean everyone agreed on everything — it means the cooperative's culture of
              discussion, dissent, and respect is working.
            </p>
          </div>
        </div>
      )}

      {/* Annual Meeting Packet */}
      {selected === 'meeting_packet' && (
        <div className="space-y-4">
          <div className="narrative-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-grove-600 font-medium uppercase tracking-wider">Annual Meeting Packet</p>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-1">FY 2024 Annual General Meeting</h2>
                <p className="text-sm text-gray-400 mt-1">February 15, 2025 · 10:00 AM · Community Center</p>
              </div>
              <button className="calm-button-primary text-xs flex items-center gap-1">
                <Download size={12} /> Download Full Packet (PDF)
              </button>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              This packet contains everything you need for the annual meeting. Read it before you arrive —
              you'll be voting on three important decisions. If anything is unclear, ask NRI or reach out
              to a board member.
            </p>
          </div>

          {[
            { num: 1, title: 'Year-in-Review Narrative', desc: 'The full story of Evergreen\'s 2024 — revenue, people, governance, and what\'s next.', ready: true },
            { num: 2, title: 'Financial Summary', desc: 'Revenue, expenses, surplus, cash reserves, and what the numbers mean in plain terms.', ready: true },
            { num: 3, title: 'Patronage Distribution Proposal', desc: '$42,000 surplus. Proposed 80/20 qualified/non-qualified split. Your individual allocation.', ready: true },
            { num: 4, title: 'Board Election Candidates', desc: 'Three seats, three candidates. María (incumbent), Fatima (first-time), David (incumbent). Their statements.', ready: true },
            { num: 5, title: 'Bylaws Amendment: Candidacy Period', desc: 'Proposal to reduce candidacy from 6 to 4 months. Requires supermajority. Arguments for and against.', ready: true },
            { num: 6, title: 'Member Equity Statements', desc: 'Your personal equity statement — buy-in, patronage, total ownership. One page, your story.', ready: true },
          ].map(doc => (
            <div key={doc.num} className="narrative-card flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-grove-50 flex items-center justify-center text-sm font-display font-bold text-grove-700 flex-shrink-0">
                {doc.num}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                <p className="text-xs text-gray-500 mt-1">{doc.desc}</p>
              </div>
              <button className="text-xs text-grove-600 hover:text-grove-700 flex items-center gap-1">
                <Download size={12} /> PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
