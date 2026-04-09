import { Link } from 'react-router-dom'
import {
  BookOpen, GraduationCap, HelpCircle, Calendar, FileText,
  Heart, Library, Globe, ArrowRight, Vote,
} from 'lucide-react'

const RESOURCES = [
  {
    icon: Calendar,
    title: 'A Week at a Co-op',
    description: 'See what daily life looks like when a cooperative runs on Communis.',
    to: '/week',
    color: 'bg-grove-50 text-grove-600',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: '12 honest answers to the questions every cooperative asks before signing up.',
    to: '/faq',
    color: 'bg-warmth-50 text-warmth-600',
  },
  {
    icon: FileText,
    title: 'Why Communis',
    description: 'The gap is real — documented pain points and before/after comparisons.',
    to: '/compare',
    color: 'bg-commons-50 text-commons-600',
  },
  {
    icon: Heart,
    title: 'Manifesto',
    description: 'The cooperative history, the CROS philosophy, and why this matters.',
    to: '/manifesto',
    color: 'bg-terra-50 text-terra-600',
  },
  {
    icon: Globe,
    title: 'Cooperative Map',
    description: '408 cooperatives across America — see the movement.',
    to: '/map',
    color: 'bg-grove-50 text-grove-600',
  },
  {
    icon: Vote,
    title: 'Rehearsal Votes',
    description: 'Practice democratic decision-making before it counts. Try all 4 voting methods.',
    to: '/demo',
    note: 'Available in the demo',
    color: 'bg-warmth-50 text-warmth-600',
  },
  {
    icon: BookOpen,
    title: 'Cooperative Glossary',
    description: '26 terms in plain language. "Buy-in = like buying into a poker game, except you get it back."',
    to: '/demo',
    note: 'Available in the demo',
    color: 'bg-commons-50 text-commons-600',
  },
  {
    icon: Library,
    title: 'Cooperative Library',
    description: '12 essential books — from Making Mondragon to Collective Courage.',
    to: '/demo',
    note: 'Available in the demo',
    color: 'bg-terra-50 text-terra-600',
  },
]

export default function LearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <GraduationCap size={32} className="text-grove-600 mx-auto mb-4" />
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Learn about cooperatives
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Whether you're exploring worker ownership for the first time or you've been
          running a co-op for decades — there's something here for you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {RESOURCES.map(resource => (
          <Link
            key={resource.title}
            to={resource.to}
            className="narrative-card hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${resource.color}`}>
              <resource.icon size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{resource.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{resource.description}</p>
              {resource.note && (
                <p className="text-[10px] text-grove-500 mt-1.5">{resource.note}</p>
              )}
            </div>
            <ArrowRight size={14} className="text-gray-300 mt-1" />
          </Link>
        ))}
      </div>

      <div className="mt-12 narrative-card bg-grove-50 border-grove-100 text-center">
        <p className="font-display text-lg font-semibold text-gray-900">Want to see it all in action?</p>
        <p className="text-sm text-gray-500 mt-2">
          The demo includes the full knowledge base, glossary, rehearsal votes, and cooperative library.
        </p>
        <Link to="/demo" className="inline-flex items-center gap-2 mt-4 calm-button-primary">
          Try the Demo <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
