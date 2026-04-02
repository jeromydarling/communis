/**
 * BrowserFrame — wraps content in a macOS-style browser chrome.
 * Used on marketing pages to show app screenshots.
 */
interface BrowserFrameProps {
  title?: string
  url?: string
  children: React.ReactNode
  className?: string
}

export function BrowserFrame({ title, url, children, className = '' }: BrowserFrameProps) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-xl border border-terra-200 bg-white ${className}`}>
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-terra-100">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-300" />
          <div className="w-3 h-3 rounded-full bg-yellow-300" />
          <div className="w-3 h-3 rounded-full bg-green-300" />
        </div>
        {url && (
          <div className="flex-1 mx-3">
            <div className="bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 border border-gray-200 text-center max-w-xs mx-auto">
              {url}
            </div>
          </div>
        )}
        {title && !url && (
          <p className="flex-1 text-center text-[10px] text-gray-400">{title}</p>
        )}
      </div>
      {/* Content */}
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  )
}
