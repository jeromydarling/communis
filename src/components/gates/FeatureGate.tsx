import { useTenant } from '@/contexts/TenantContext'

interface FeatureGateProps {
  featureKey: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function FeatureGate({ featureKey, children, fallback }: FeatureGateProps) {
  const { hasFeature, tenant } = useTenant()

  if (!tenant || !hasFeature(featureKey)) {
    return fallback ? <>{fallback}</> : (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="narrative-card text-center max-w-sm">
          <p className="font-display font-semibold text-gray-900">Feature not available</p>
          <p className="text-sm text-gray-500 mt-2">
            This feature requires a higher subscription tier.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
