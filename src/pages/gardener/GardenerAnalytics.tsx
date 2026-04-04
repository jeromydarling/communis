export default function GardenerAnalytics() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-2">Analytics</h1>
      <p className="text-sm text-gray-400 mb-6">
        Platform-wide metrics: feature adoption, Stripe transaction volume, NRI signal health, churn signals.
      </p>
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center">
        <p className="text-gray-500 text-sm">Recharts dashboards — tenant activity, revenue, feature usage, AI token budgets</p>
        <p className="text-gray-600 text-xs mt-2">Scaffold ready for Lovable implementation</p>
      </div>
    </div>
  )
}
