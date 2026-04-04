export default function GardenerSettings() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-2">Settings</h1>
      <p className="text-sm text-gray-400 mb-6">
        Platform configuration, API keys, Stripe Connect settings, Perplexity queries, DeepL config.
      </p>
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center">
        <p className="text-gray-500 text-sm">API key management, default cooperative templates, feature flags, billing config</p>
        <p className="text-gray-600 text-xs mt-2">Scaffold ready for Lovable implementation</p>
      </div>
    </div>
  )
}
