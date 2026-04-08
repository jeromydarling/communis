import { useState } from 'react'
import { Megaphone, Plus, Pin, MessageSquare, Clock, Users } from 'lucide-react'

const DEMO_ANNOUNCEMENTS = [
  {
    id: '1', pinned: true,
    title: 'Q4 2024 Patronage Vote — Cast Your Vote',
    body: 'The Finance Committee has proposed distributing $18,400 in surplus from Q4. This is a majority vote. Please review the proposal in Governance and cast your vote before January 31.',
    author: 'Finance Committee', date: 'Jan 15, 2025', comments: 3,
    audience: 'All Members',
  },
  {
    id: '2', pinned: false,
    title: 'Welcome Roberto Sandoval — New Candidate',
    body: 'Roberto joined us in November and is working the evening shift. His mentor is James. Please introduce yourself and help him feel at home. His candidacy review is scheduled for Q2.',
    author: 'Hiring Committee', date: 'Jan 10, 2025', comments: 7,
    audience: 'All Members',
  },
  {
    id: '3', pinned: false,
    title: 'New Safety Training Material Available',
    body: 'Updated OSHA-compliant safety procedures have been uploaded to Documents. All members — please review before your next shift. The training committee will schedule a walkthrough next week.',
    author: 'Training Committee', date: 'Jan 5, 2025', comments: 1,
    audience: 'All Members',
  },
  {
    id: '4', pinned: false,
    title: 'Board Meeting Summary — December 2024',
    body: 'The board approved the grievance policy update (unanimous), discussed the equipment purchase, and reviewed Roberto\'s candidacy progress. Full minutes are in Documents.',
    author: 'María Reyes', date: 'Dec 18, 2024', comments: 0,
    audience: 'All Members',
  },
  {
    id: '5', pinned: false,
    title: 'Holiday Schedule Reminder',
    body: 'The co-op will be closed December 24-26 and December 31-January 1. If you have client commitments during these dates, coordinate with Operations.',
    author: 'Operations Committee', date: 'Dec 10, 2024', comments: 2,
    audience: 'All Members',
  },
]

const DEMO_COMMITTEE_THREADS = [
  { committee: 'Finance', title: 'Should we increase reserves to 4 months?', replies: 4, lastActivity: '2 days ago' },
  { committee: 'Hiring', title: 'Roberto\'s midpoint review notes', replies: 2, lastActivity: '1 week ago' },
  { committee: 'Operations', title: 'New client onboarding checklist draft', replies: 6, lastActivity: '3 days ago' },
]

export default function AnnouncementsPage() {
  const [tab, setTab] = useState<'announcements' | 'committees'>('announcements')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Communication</h1>
          <p className="text-sm text-gray-400 mt-1">Announcements and committee discussions. Not Slack-sprawl.</p>
        </div>
        <button className="calm-button-primary text-xs flex items-center gap-2">
          <Plus size={14} /> New Post
        </button>
      </div>

      <div className="flex gap-1 mb-6 bg-warmth-100 rounded-xl p-1">
        <button onClick={() => setTab('announcements')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'announcements' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Announcements ({DEMO_ANNOUNCEMENTS.length})
        </button>
        <button onClick={() => setTab('committees')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'committees' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Committee Threads ({DEMO_COMMITTEE_THREADS.length})
        </button>
      </div>

      {tab === 'announcements' && (
        <div className="space-y-3">
          {DEMO_ANNOUNCEMENTS.map(ann => (
            <div key={ann.id} className={`narrative-card ${ann.pinned ? 'ring-1 ring-grove-200' : ''}`}>
              <div className="flex items-start gap-3">
                {ann.pinned && <Pin size={14} className="text-grove-500 mt-1 flex-shrink-0" />}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{ann.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ann.body}</p>
                  <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
                    <span>{ann.author}</span>
                    <span>·</span>
                    <span>{ann.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5"><Users size={10} /> {ann.audience}</span>
                    {ann.comments > 0 && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-0.5"><MessageSquare size={10} /> {ann.comments} replies</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'committees' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 mb-2">Async discussions by committee — private to committee members.</p>
          {DEMO_COMMITTEE_THREADS.map(thread => (
            <div key={thread.title} className="narrative-card flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-commons-50 flex items-center justify-center">
                <MessageSquare size={16} className="text-commons-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-commons-50 text-commons-600 border border-commons-100">{thread.committee}</span>
                  <p className="text-sm font-medium text-gray-900">{thread.title}</p>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{thread.replies} replies · Last activity: {thread.lastActivity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
