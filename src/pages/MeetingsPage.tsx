import { Calendar, Clock, Users, Check, FileText, Plus, MapPin } from 'lucide-react'

const UPCOMING_MEETINGS = [
  { id: '1', type: 'committee', committee: 'Operations', title: 'Weekly Operations Check-in', date: 'Jan 27, 2025', time: '9:00 AM', location: 'Office', attendees: 2, quorumNeeded: 2, hasAgenda: true },
  { id: '2', type: 'committee', committee: 'Hiring', title: 'Hiring Committee — Roberto Review', date: 'Jan 28, 2025', time: '2:00 PM', location: 'Zoom', attendees: 0, quorumNeeded: 2, hasAgenda: false },
  { id: '3', type: 'board', committee: 'Board', title: 'Board of Directors Monthly', date: 'Feb 5, 2025', time: '4:00 PM', location: 'Office', attendees: 1, quorumNeeded: 2, hasAgenda: true },
  { id: '4', type: 'committee', committee: 'Finance', title: 'Finance Committee — Q1 Budget', date: 'Feb 10, 2025', time: '3:00 PM', location: 'Zoom', attendees: 0, quorumNeeded: 2, hasAgenda: false },
  { id: '5', type: 'general', committee: null, title: 'General Membership Meeting', date: 'Feb 15, 2025', time: '10:00 AM', location: 'Community Center', attendees: 0, quorumNeeded: 3, hasAgenda: true },
]

const PAST_MEETINGS = [
  { id: 'p1', type: 'board', title: 'Board of Directors — January', date: 'Jan 8, 2025', attendees: 3, quorumMet: true, hasMinutes: true },
  { id: 'p2', type: 'committee', title: 'Hiring Committee — Candidate Review', date: 'Jan 14, 2025', attendees: 2, quorumMet: true, hasMinutes: true },
  { id: 'p3', type: 'general', title: 'General Membership Meeting', date: 'Dec 15, 2024', attendees: 5, quorumMet: true, hasMinutes: true },
]

const typeColors = {
  general: 'bg-grove-50 text-grove-700 border-grove-100',
  board: 'bg-commons-50 text-commons-700 border-commons-100',
  committee: 'bg-warmth-50 text-warmth-700 border-warmth-100',
}

export default function MeetingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Meetings</h1>
          <p className="text-sm text-gray-400 mt-1">Agendas, minutes, quorum tracking. All connected to governance.</p>
        </div>
        <button className="calm-button-primary text-xs flex items-center gap-2">
          <Plus size={14} /> Schedule Meeting
        </button>
      </div>

      {/* Upcoming */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Upcoming</h2>
      <div className="space-y-3 mb-8">
        {UPCOMING_MEETINGS.map(meeting => (
          <div key={meeting.id} className="narrative-card flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center flex-shrink-0 w-12">
              <p className="text-[10px] text-gray-400">{meeting.date.split(',')[0].split(' ')[0]}</p>
              <p className="font-display text-lg font-bold text-gray-900">{meeting.date.split(' ')[1]?.replace(',', '')}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${typeColors[meeting.type as keyof typeof typeColors]}`}>
                  {meeting.type}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><Clock size={10} /> {meeting.time}</span>
                <span className="flex items-center gap-1"><MapPin size={10} /> {meeting.location}</span>
                <span className="flex items-center gap-1">
                  <Users size={10} />
                  {meeting.attendees}/{meeting.quorumNeeded} for quorum
                </span>
                {meeting.hasAgenda && (
                  <span className="flex items-center gap-1 text-grove-500"><FileText size={10} /> Agenda ready</span>
                )}
              </div>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-grove-50 text-grove-700 border border-grove-100 hover:bg-grove-100">
              RSVP
            </button>
          </div>
        ))}
      </div>

      {/* Past */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Past Meetings</h2>
      <div className="space-y-2">
        {PAST_MEETINGS.map(meeting => (
          <div key={meeting.id} className="narrative-card flex items-center gap-4">
            <Check size={14} className="text-grove-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">{meeting.title}</p>
              <p className="text-[10px] text-gray-400">{meeting.date} · {meeting.attendees} attended · {meeting.quorumMet ? 'Quorum met' : 'Quorum not met'}</p>
            </div>
            {meeting.hasMinutes && (
              <button className="text-[10px] text-grove-600 hover:text-grove-700 flex items-center gap-1">
                <FileText size={12} /> Minutes
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
