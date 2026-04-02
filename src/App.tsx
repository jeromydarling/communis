import { Routes, Route } from 'react-router-dom'
import MarketingLayout from './components/layout/MarketingLayout'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import ManifestoPage from './pages/ManifestoPage'
import OpenSourcePage from './pages/OpenSourcePage'
import DemoGatePage from './pages/DemoGatePage'
import DashboardPage from './pages/DashboardPage'
import MembersPage from './pages/MembersPage'
import MemberStoryPage from './pages/MemberStoryPage'
import GovernancePage from './pages/GovernancePage'
import PatronagePage from './pages/PatronagePage'

export default function App() {
  return (
    <Routes>
      {/* Marketing Site */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/open-source" element={<OpenSourcePage />} />
        <Route path="/demo" element={<DemoGatePage />} />
      </Route>

      {/* App Demo */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:id" element={<MemberStoryPage />} />
        <Route path="governance" element={<GovernancePage />} />
        <Route path="patronage" element={<PatronagePage />} />
      </Route>
    </Routes>
  )
}
