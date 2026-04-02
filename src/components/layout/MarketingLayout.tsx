import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function MarketingLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/map', label: 'Map' },
    { to: '/manifesto', label: 'Manifesto' },
    { to: '/open-source', label: 'Open Source' },
  ]

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-warmth-50/90 backdrop-blur-md border-b border-terra-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-grove-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-5 h-5">
                <circle cx="11" cy="13" r="3" fill="white" opacity="0.9"/>
                <circle cx="21" cy="13" r="3" fill="white" opacity="0.9"/>
                <circle cx="16" cy="21" r="3" fill="white" opacity="0.9"/>
                <line x1="11" y1="13" x2="21" y2="13" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="11" y1="13" x2="16" y2="21" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="21" y1="13" x2="16" y2="21" stroke="white" strokeWidth="1.5" opacity="0.5"/>
              </svg>
            </div>
            <span className="font-display text-xl font-semibold text-grove-800">communis</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-grove-700'
                    : 'text-gray-500 hover:text-grove-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/demo" className="calm-button-primary text-sm">
              Try the Demo
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-sm font-medium text-gray-600 hover:text-grove-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/demo"
              className="block calm-button-primary text-sm text-center"
              onClick={() => setMenuOpen(false)}
            >
              Try the Demo
            </Link>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-terra-100 bg-warmth-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <p className="font-display text-lg font-semibold text-grove-800">communis</p>
              <p className="mt-2 text-sm text-gray-500 max-w-sm">
                The operating system for worker cooperatives. Built with care, owned by the commons.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Product</p>
              <div className="space-y-2">
                <Link to="/features" className="block text-sm text-gray-600 hover:text-grove-600">Features</Link>
                <Link to="/pricing" className="block text-sm text-gray-600 hover:text-grove-600">Pricing</Link>
                <Link to="/demo" className="block text-sm text-gray-600 hover:text-grove-600">Demo</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Community</p>
              <div className="space-y-2">
                <Link to="/manifesto" className="block text-sm text-gray-600 hover:text-grove-600">Manifesto</Link>
                <span className="block text-sm text-gray-400">Open Source (coming soon)</span>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-terra-100 text-xs text-gray-400">
            communis.coop — Technology should carry the weight. Humans carry the meaning.
          </div>
        </div>
      </footer>
    </div>
  )
}
