import CooperativeMap from '@/components/marketing/CooperativeMap'
import { cooperatives } from '@/data/cooperatives'

export default function MapPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <CooperativeMap cooperatives={cooperatives} />
    </div>
  )
}
