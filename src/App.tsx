import { Routes, Route } from 'react-router-dom'
import MarketingLayout from './components/layout/MarketingLayout'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import ManifestoPage from './pages/ManifestoPage'
import OpenSourcePage from './pages/OpenSourcePage'
import MapPage from './pages/MapPage'
import DemoGatePage from './pages/DemoGatePage'
import DashboardPage from './pages/DashboardPage'
import MembersPage from './pages/MembersPage'
import MemberStoryPage from './pages/MemberStoryPage'
import GovernancePage from './pages/GovernancePage'
import PatronagePage from './pages/PatronagePage'
import ImportPage from './pages/ImportPage'
import OnboardingPage from './pages/OnboardingPage'
import PaymentsPage from './pages/PaymentsPage'
import PaymentSetupPage from './pages/PaymentSetupPage'
import IntegrationsPage from './pages/IntegrationsPage'
import CommitteesPage from './pages/CommitteesPage'

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
        <Route path="/map" element={<MapPage />} />
        <Route path="/demo" element={<DemoGatePage />} />
      </Route>

      {/* App Demo */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:id" element={<MemberStoryPage />} />
        <Route path="governance" element={<GovernancePage />} />
        <Route path="patronage" element={<PatronagePage />} />
        <Route path="import" element={<ImportPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="payments/setup" element={<PaymentSetupPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="committees" element={<CommitteesPage />} />
      </Route>

      {/* Gardener Console (future) */}
      {/* <Route path="/gardener" element={<GardenerLayout />}> */}
      {/*   <Route index element={<GardenerDashboard />} /> */}
      {/*   <Route path="tenants" element={<GardenerTenants />} /> */}
      {/*   <Route path="content" element={<GardenerContentStudio />} /> */}
      {/*   <Route path="seo" element={<GardenerSEO />} /> */}
      {/* </Route> */}
    </Routes>
  )
}
