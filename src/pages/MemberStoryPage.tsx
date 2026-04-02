import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Landmark, Users } from 'lucide-react'
import { members } from '../data/demo'

export default function MemberStoryPage() {
  const { id } = useParams()
  const member = members.find(m => m.id === id)

  if (!member) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Member not found.</p>
        <Link to="/app/members" className="text-grove-600 text-sm mt-2 inline-block">Back to members</Link>
      </div>
    )
  }

  const yearsAsMember = Math.max(1, new Date().getFullYear() - new Date(member.joinedDate).getFullYear())

  return (
    <div className="max-w-3xl">
      <Link to="/app/members" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-grove-600 mb-6">
        <ArrowLeft size={14} /> All members
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-semibold ${
          member.status === 'active' ? 'bg-grove-100 text-grove-700' :
          member.status === 'candidate' ? 'bg-warmth-100 text-warmth-700' :
          'bg-gray-100 text-gray-500'
        }`}>
          {member.initials}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">{member.name}</h1>
          <p className="text-sm text-gray-400">{member.role}</p>
          <div className="flex items-center gap-3 mt-2">
            {member.committees.map(c => (
              <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-grove-50 text-grove-600 border border-grove-100">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Story — the CROS narrative */}
      <div className="narrative-card mb-6">
        <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">Member Story</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{member.story}</p>
      </div>

      {/* Equity journey */}
      <div className="narrative-card mb-6">
        <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Equity Journey</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-grove-50 border border-grove-100">
            <Landmark size={16} className="text-grove-500 mb-1" />
            <p className="font-display text-xl font-bold text-gray-900">${member.equity.toLocaleString()}</p>
            <p className="text-xs text-gray-400">total equity</p>
          </div>
          <div className="p-4 rounded-xl bg-warmth-50 border border-warmth-100">
            <Calendar size={16} className="text-warmth-500 mb-1" />
            <p className="font-display text-xl font-bold text-gray-900">{yearsAsMember} {yearsAsMember === 1 ? 'year' : 'years'}</p>
            <p className="text-xs text-gray-400">since {member.joinedDate}</p>
          </div>
        </div>

        {/* Buy-in progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Buy-in progress</span>
            <span className="text-gray-700 font-medium">${member.buyInPaid.toLocaleString()} / ${member.buyInTotal.toLocaleString()}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-grove-500 rounded-full transition-all"
              style={{ width: `${(member.buyInPaid / member.buyInTotal) * 100}%` }}
            />
          </div>
          {member.buyInPaid >= member.buyInTotal && (
            <p className="text-xs text-grove-600 mt-1">Buy-in complete</p>
          )}
        </div>

        {/* Narrative equity summary — CROS style */}
        {member.status === 'active' && (
          <div className="p-4 rounded-xl bg-warmth-50 border border-warmth-100 mt-4">
            <p className="text-sm text-warmth-700 leading-relaxed">
              {member.equity > 10000
                ? `Your equity of $${member.equity.toLocaleString()} reflects ${yearsAsMember} years of shared ownership. Through your labor and the cooperative's success, your stake has grown steadily.`
                : member.equity > 3000
                ? `You've built $${member.equity.toLocaleString()} in equity over ${yearsAsMember} ${yearsAsMember === 1 ? 'year' : 'years'}. Each hour you work strengthens both the cooperative and your own ownership stake.`
                : `Your cooperative journey is just beginning. $${member.equity.toLocaleString()} in equity and growing — every hour of work builds shared wealth.`
              }
            </p>
          </div>
        )}
        {member.status === 'candidate' && (
          <div className="p-4 rounded-xl bg-warmth-50 border border-warmth-100 mt-4">
            <p className="text-sm text-warmth-700 leading-relaxed">
              You're on the path to full membership. ${member.buyInPaid.toLocaleString()} of your ${member.buyInTotal.toLocaleString()} buy-in is paid. Complete your training milestones and the membership vote will follow.
            </p>
          </div>
        )}
      </div>

      {/* Labor this year */}
      {member.hoursThisYear > 0 && (
        <div className="narrative-card mb-6">
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">Labor Contribution</h2>
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-commons-50 border border-commons-100">
              <Clock size={16} className="text-commons-500 mb-1" />
              <p className="font-display text-xl font-bold text-gray-900">{member.hoursThisYear.toLocaleString()}</p>
              <p className="text-xs text-gray-400">hours this year</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 leading-relaxed">
                {member.hoursThisYear >= 1600
                  ? 'Full-time contribution. Your hours are the basis for patronage calculation — the more you work, the larger your share of surplus.'
                  : 'Your hours are tracked for patronage calculation. Each hour of labor determines your share of the cooperative\'s surplus.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Committees */}
      {member.committees.length > 0 && (
        <div className="narrative-card">
          <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">Democratic Participation</h2>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-grove-500" />
            <p className="text-sm text-gray-500">
              Active in {member.committees.join(' and ')} {member.committees.length === 1 ? 'committee' : 'committees'}.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
