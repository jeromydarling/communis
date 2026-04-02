import { useState, useMemo, useEffect } from 'react'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import { MapPin, Filter, X } from 'lucide-react'

interface Cooperative {
  name: string
  city: string
  state: string
  lat: number
  lng: number
  industry: string
  type: string
}

interface CooperativeMapProps {
  cooperatives: Cooperative[]
}

// Albers USA projection (simplified)
function albersUsa(lng: number, lat: number): [number, number] | null {
  // Main US (lower 48)
  if (lat > 24 && lat < 50 && lng > -130 && lng < -65) {
    const x = (lng + 130) / 65 * 900 + 50
    const y = (50 - lat) / 26 * 500 + 30
    return [x, y]
  }
  // Alaska (scaled down, repositioned)
  if (lat > 50 && lng < -130) {
    const x = (lng + 180) / 40 * 200 + 80
    const y = 480
    return [x, y]
  }
  // Hawaii
  if (lat > 18 && lat < 23 && lng > -162 && lng < -154) {
    const x = (lng + 162) / 8 * 80 + 250
    const y = 520
    return [x, y]
  }
  // Puerto Rico
  if (lat > 17 && lat < 19 && lng > -68 && lng < -65) {
    const x = (lng + 68) / 3 * 40 + 820
    const y = 500
    return [x, y]
  }
  // Canada entries — place them near border
  if (lat > 43 && lng > -130 && lng < -65) {
    const x = (lng + 130) / 65 * 900 + 50
    const y = Math.max(30, (50 - Math.min(lat, 50)) / 26 * 500 + 30)
    return [x, y]
  }
  return null
}

const INDUSTRY_COLORS: Record<string, string> = {
  'Food & Beverage': '#3d8b50',
  'Cleaning Services': '#5ea86e',
  'Technology': '#7388b4',
  'Health': '#dc7c30',
  'Build & Design': '#b37d42',
  'Business Support': '#8fa3c5',
  'Media': '#c2955c',
  'Engineering': '#9a6636',
  'Education': '#5f72a4',
  'Energy': '#3d8b50',
  'Arts': '#c2955c',
  'Retail': '#8fa3c5',
  'Transportation': '#7d4f2e',
  'Legal': '#546196',
  'Real Estate': '#b37d42',
  'Waste': '#5ea86e',
  'Tourism': '#dc7c30',
}

function getIndustryColor(industry: string): string {
  for (const [key, color] of Object.entries(INDUSTRY_COLORS)) {
    if (industry.startsWith(key)) return color
  }
  return '#8fa3c5'
}

function getIndustryCategory(industry: string): string {
  const dash = industry.indexOf(' - ')
  return dash > 0 ? industry.slice(0, dash) : industry
}

const US_TOPO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

export default function CooperativeMap({ cooperatives }: CooperativeMapProps) {
  const [topoData, setTopoData] = useState<FeatureCollection<Geometry> | null>(null)
  const [hoveredCoop, setHoveredCoop] = useState<Cooperative | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    fetch(US_TOPO_URL)
      .then(r => r.json())
      .then((topo: Topology) => {
        const states = feature(topo, topo.objects.states) as FeatureCollection<Geometry>
        setTopoData(states)
      })
      .catch(console.error)
  }, [])

  const industries = useMemo(() => {
    const cats = new Set<string>()
    cooperatives.forEach(c => cats.add(getIndustryCategory(c.industry)))
    return Array.from(cats).sort()
  }, [cooperatives])

  const filteredCoops = useMemo(() => {
    if (!selectedIndustry) return cooperatives
    return cooperatives.filter(c => getIndustryCategory(c.industry) === selectedIndustry)
  }, [cooperatives, selectedIndustry])

  const stateStats = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredCoops.forEach(c => { counts[c.state] = (counts[c.state] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10)
  }, [filteredCoops])

  // Generate SVG path from GeoJSON using simplified Albers
  const statePaths = useMemo(() => {
    if (!topoData) return ''
    return topoData.features.map(feat => {
      const coords = feat.geometry.type === 'Polygon'
        ? [feat.geometry.coordinates]
        : feat.geometry.type === 'MultiPolygon'
        ? feat.geometry.coordinates
        : []

      return coords.map(polygon =>
        polygon.map(ring =>
          ring.map(([lng, lat]) => albersUsa(lng, lat))
            .filter((p): p is [number, number] => p !== null)
        ).filter(ring => ring.length > 2)
        .map(ring => 'M' + ring.map(([x, y]) => `${x},${y}`).join('L') + 'Z')
        .join('')
      ).join('')
    }).join('')
  }, [topoData])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900">
            {filteredCoops.length} Cooperatives Across America
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Worker cooperatives and democratic workplaces. Data from USFWC directory.
          </p>
        </div>

        {/* Industry filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <select
            value={selectedIndustry || ''}
            onChange={e => setSelectedIndustry(e.target.value || null)}
            className="text-xs px-3 py-1.5 rounded-lg border border-terra-200 bg-warmth-50 text-gray-700"
          >
            <option value="">All industries</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          {selectedIndustry && (
            <button
              onClick={() => setSelectedIndustry(null)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="narrative-card p-2 overflow-hidden">
        <svg
          viewBox="0 0 975 560"
          className="w-full h-auto"
          onMouseMove={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
          }}
          onMouseLeave={() => setHoveredCoop(null)}
        >
          {/* State outlines */}
          <path
            d={statePaths}
            fill="#f0e6d6"
            stroke="#e2ceae"
            strokeWidth="0.5"
          />

          {/* Cooperative dots */}
          {filteredCoops.map((coop, i) => {
            const pos = albersUsa(coop.lng, coop.lat)
            if (!pos) return null
            const color = getIndustryColor(coop.industry)
            return (
              <circle
                key={`${coop.name}-${i}`}
                cx={pos[0]}
                cy={pos[1]}
                r={hoveredCoop === coop ? 5 : 3}
                fill={color}
                fillOpacity={0.8}
                stroke="white"
                strokeWidth={hoveredCoop === coop ? 1.5 : 0.5}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredCoop(coop)}
              />
            )
          })}
        </svg>

        {/* Tooltip */}
        {hoveredCoop && (
          <div
            className="absolute z-10 pointer-events-none bg-white rounded-lg shadow-lg border border-terra-100 px-3 py-2 max-w-xs"
            style={{
              left: Math.min(mousePos.x + 12, 300),
              top: mousePos.y - 10,
            }}
          >
            <p className="text-xs font-medium text-gray-900">{hoveredCoop.name}</p>
            <p className="text-[10px] text-gray-500">
              {hoveredCoop.city}, {hoveredCoop.state}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getIndustryColor(hoveredCoop.industry) }}
              />
              <span className="text-[10px] text-gray-400">{hoveredCoop.industry}</span>
            </div>
            <span className="text-[9px] text-gray-300 mt-0.5 block">{hoveredCoop.type}</span>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-xs text-gray-400 mb-2">Top states</p>
          <div className="flex flex-wrap gap-2">
            {stateStats.map(([state, count]) => (
              <span key={state} className="text-[10px] px-2 py-1 rounded-full bg-grove-50 text-grove-700 border border-grove-100">
                {state}: {count}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">By type</p>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-1 rounded-full bg-grove-50 text-grove-700 border border-grove-100">
              <MapPin size={8} className="inline mr-1" />
              {filteredCoops.filter(c => c.type === 'Worker Co-op').length} Worker Co-ops
            </span>
            <span className="text-[10px] px-2 py-1 rounded-full bg-commons-50 text-commons-700 border border-commons-100">
              {filteredCoops.filter(c => c.type === 'Democratic Workplace').length} Democratic Workplaces
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
