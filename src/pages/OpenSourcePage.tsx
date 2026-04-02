import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const stack = [
  {
    name: 'React',
    role: 'UI Framework',
    url: 'https://react.dev',
    license: 'MIT',
    description: 'The foundation of our interface. React powers the component-driven UI — every member story card, every patronage table, every governance vote.',
  },
  {
    name: 'TypeScript',
    role: 'Language',
    url: 'https://www.typescriptlang.org',
    license: 'Apache 2.0',
    description: 'Type safety for cooperative financial calculations. When you\'re computing patronage splits and ICA balances, correctness isn\'t optional.',
  },
  {
    name: 'Vite',
    role: 'Build Tool',
    url: 'https://vite.dev',
    license: 'MIT',
    description: 'Fast builds and instant hot module replacement. Developed by the Vue.js community, used across the JavaScript ecosystem.',
  },
  {
    name: 'Tailwind CSS',
    role: 'Styling',
    url: 'https://tailwindcss.com',
    license: 'MIT',
    description: 'Utility-first CSS that lets us build the calm, narrative-first design language Communis needs — without fighting a component library\'s opinions.',
  },
  {
    name: 'React Router',
    role: 'Navigation',
    url: 'https://reactrouter.com',
    license: 'MIT',
    description: 'Client-side routing that makes the app feel fast and connected — navigate between your dashboard, members, governance, and patronage without page reloads.',
  },
  {
    name: 'Lucide',
    role: 'Icons',
    url: 'https://lucide.dev',
    license: 'ISC',
    description: 'Clean, consistent open source icons. A community fork of Feather Icons with an active contributor base.',
  },
  {
    name: 'Supabase',
    role: 'Backend & Database',
    url: 'https://supabase.com',
    license: 'Apache 2.0',
    description: 'Open source Firebase alternative. PostgreSQL database, authentication, row-level security, and real-time subscriptions — all self-hostable.',
  },
  {
    name: 'PostgreSQL',
    role: 'Database',
    url: 'https://www.postgresql.org',
    license: 'PostgreSQL License',
    description: 'The world\'s most advanced open source relational database. Handles financial-grade data integrity for ICA tracking and patronage calculations.',
  },
]

const principles = [
  {
    title: 'Built on open foundations',
    description: 'Every layer of Communis rests on open source software maintained by global communities. We chose these tools because they\'re proven, transparent, and collectively owned — values that mirror the cooperative movement itself.',
  },
  {
    title: 'Inspectable, not extractive',
    description: 'Our stack choices mean the technology serving your cooperative can be audited, understood, and if necessary, self-hosted. No proprietary black boxes between your data and your democracy.',
  },
  {
    title: 'Community-maintained',
    description: 'These aren\'t niche tools — they\'re the backbone of the modern web, maintained by thousands of contributors. Your cooperative\'s infrastructure rests on the same foundation as the rest of the internet.',
  },
]

export default function OpenSourcePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Built on open source.
          <br />
          <span className="text-grove-600">Accountable by design.</span>
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Cooperatives are built on transparency and shared ownership. The technology
          that serves them should be too. Here's exactly what Communis is made of.
        </p>
      </div>

      {/* Principles */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {principles.map(p => (
          <div key={p.title} className="narrative-card">
            <h3 className="font-display text-lg font-semibold text-gray-900">{p.title}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>

      {/* Stack breakdown */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">The Stack</h2>
        <p className="text-sm text-gray-400 mb-8">Every dependency, explained in plain language</p>

        <div className="space-y-4">
          {stack.map(tool => (
            <div key={tool.name} className="narrative-card flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="sm:w-48 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-gray-900">{tool.name}</h3>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-grove-500"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
                <p className="text-xs text-gray-400">{tool.role}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-grove-50 text-grove-600 border border-grove-100 mt-1 inline-block">
                  {tool.license}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback section */}
      <div className="mt-16 narrative-card bg-commons-50 border-commons-100 text-center">
        <h2 className="font-display text-xl font-bold text-gray-900">Help us build what cooperatives need</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto">
          Communis is shaped by the cooperative community. Report bugs, request features,
          or share how your co-op works so we can build better tools.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/jeromydarling/communis/issues/new?template=bug_report.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="calm-button-secondary inline-flex items-center gap-2 text-sm"
          >
            Report a Bug <ExternalLink size={14} />
          </a>
          <a
            href="https://github.com/jeromydarling/communis/issues/new?template=feature_request.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="calm-button-primary inline-flex items-center gap-2 text-sm"
          >
            Request a Feature <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
