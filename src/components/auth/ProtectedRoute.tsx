import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { CoopRole } from '@/types'

interface ProtectedRouteProps {
  children: React.ReactNode
  minRole?: CoopRole
  gardenerOnly?: boolean
}

export function ProtectedRoute({ children, minRole, gardenerOnly }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isGardener, hasMinRole } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/demo" replace />
  }

  if (gardenerOnly && !isGardener) {
    return <Navigate to="/app" replace />
  }

  if (minRole && !hasMinRole(minRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="narrative-card text-center max-w-sm">
          <p className="font-display font-semibold text-gray-900">Access restricted</p>
          <p className="text-sm text-gray-500 mt-2">
            This section requires a different role level. Contact your cooperative's steward.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
