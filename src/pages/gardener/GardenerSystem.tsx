export default function GardenerSystem() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-2">System Health</h1>
      <p className="text-sm text-gray-400 mb-6">
        Supabase, Stripe, Perplexity, DeepL — all integration health in one place.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { name: 'Supabase', status: 'healthy', latency: '12ms' },
          { name: 'Stripe Connect', status: 'healthy', latency: '89ms' },
          { name: 'Perplexity AI', status: 'healthy', latency: '340ms' },
          { name: 'DeepL Translation', status: 'healthy', latency: '120ms' },
        ].map(svc => (
          <div key={svc.name} className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-grove-500" />
            <div className="flex-1">
              <p className="text-sm text-white">{svc.name}</p>
              <p className="text-[10px] text-gray-500">{svc.latency} avg</p>
            </div>
            <span className="text-[10px] text-grove-400">{svc.status}</span>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center">
        <p className="text-gray-500 text-sm">Error desk, automation health, edge function logs, recovery intelligence</p>
        <p className="text-gray-600 text-xs mt-2">Scaffold ready for Lovable implementation</p>
      </div>
    </div>
  )
}
