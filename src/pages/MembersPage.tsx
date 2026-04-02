import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { members } from '../data/demo'

const statusColors = {
  active: 'bg-grove-100 text-grove-700',
  candidate: 'bg-warmth-100 text-warmth-700',
  'on-leave': 'bg-commons-100 text-commons-700',
  departed: 'bg-gray-100 text-gray-500',
}

const statusLabels = {
  active: 'Active Member',
  candidate: 'Candidate',
  'on-leave': 'On Leave',
  departed: 'Departed',
}

export default function MembersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Members</h1>
        <p className="text-sm text-gray-400 mt-1">
          Every member has a story. This is the living record of your cooperative's people.
        </p>
      </div>

      <div className="space-y-3">
        {members.map(member => (
          <Link
            key={member.id}
            to={`/app/members/${member.id}`}
            className="narrative-card flex items-center gap-4 hover:shadow-md transition-shadow block"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
              member.status === 'active' ? 'bg-grove-100 text-grove-700' :
              member.status === 'candidate' ? 'bg-warmth-100 text-warmth-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              {member.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[member.status]}`}>
                  {statusLabels[member.status]}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{member.role} · Joined {member.joinedDate}</p>
              {member.committees.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {member.committees.map(c => (
                    <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{c}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-display font-semibold text-gray-900">
                ${member.equity.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400">
                {member.status === 'departed' ? 'revolving out' : 'equity'}
              </p>
              {member.buyInPaid < member.buyInTotal && (
                <div className="mt-1 w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warmth-400 rounded-full"
                    style={{ width: `${(member.buyInPaid / member.buyInTotal) * 100}%` }}
                  />
                </div>
              )}
            </div>
            <ArrowRight size={16} className="text-gray-300" />
          </Link>
        ))}
      </div>
    </div>
  )
}
