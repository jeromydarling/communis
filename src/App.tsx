import { Routes, Route } from 'react-router-dom'
import MarketingLayout from './components/layout/MarketingLayout'
import AppLayout from './components/layout/AppLayout'
import GardenerLayout from './components/gardener/GardenerLayout'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import ManifestoPage from './pages/ManifestoPage'
import OpenSourcePage from './pages/OpenSourcePage'
import MapPage from './pages/MapPage'
import ContactPage from './pages/ContactPage'
import DemoGatePage from './pages/DemoGatePage'
import TermsPage from './pages/legal/TermsPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import AITransparencyPage from './pages/legal/AITransparencyPage'
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
import RehearsalPage from './pages/RehearsalPage'
import GlossaryPage from './pages/GlossaryPage'
import KnowledgeBasePage from './pages/KnowledgeBasePage'
import LibraryPage from './pages/LibraryPage'
import DocumentsPage from './pages/DocumentsPage'
import CommunioPage from './pages/CommunioPage'
import ReportsPage from './pages/ReportsPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import MeetingsPage from './pages/MeetingsPage'
import BylawsPage from './pages/BylawsPage'
import ConversionPage from './pages/ConversionPage'
import AdvisorDashboardPage from './pages/AdvisorDashboardPage'
import AnnualMeetingPage from './pages/AnnualMeetingPage'
import GardenerOverview from './pages/gardener/GardenerOverview'
import GardenerTenants from './pages/gardener/GardenerTenants'
import GardenerContent from './pages/gardener/GardenerContent'
import GardenerSEO from './pages/gardener/GardenerSEO'
import GardenerAnalytics from './pages/gardener/GardenerAnalytics'
import GardenerSystem from './pages/gardener/GardenerSystem'
import GardenerInbox from './pages/gardener/GardenerInbox'
import GardenerSettings from './pages/gardener/GardenerSettings'

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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoGatePage />} />
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/legal/ai-transparency" element={<AITransparencyPage />} />
      </Route>

      {/* App Demo */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:id" element={<MemberStoryPage />} />
        <Route path="governance" element={<GovernancePage />} />
        <Route path="patronage" element={<PatronagePage />} />
        <Route path="committees" element={<CommitteesPage />} />
        <Route path="meetings" element={<MeetingsPage />} />
        <Route path="bylaws" element={<BylawsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="payments/setup" element={<PaymentSetupPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="communio" element={<CommunioPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="rehearsal" element={<RehearsalPage />} />
        <Route path="glossary" element={<GlossaryPage />} />
        <Route path="learn" element={<KnowledgeBasePage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="conversion" element={<ConversionPage />} />
        <Route path="advisor" element={<AdvisorDashboardPage />} />
        <Route path="annual-meeting" element={<AnnualMeetingPage />} />
        <Route path="import" element={<ImportPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
      </Route>

      {/* Gardener Console */}
      <Route path="/gardener" element={<GardenerLayout />}>
        <Route index element={<GardenerOverview />} />
        <Route path="tenants" element={<GardenerTenants />} />
        <Route path="content" element={<GardenerContent />} />
        <Route path="seo" element={<GardenerSEO />} />
        <Route path="analytics" element={<GardenerAnalytics />} />
        <Route path="system" element={<GardenerSystem />} />
        <Route path="inbox" element={<GardenerInbox />} />
        <Route path="settings" element={<GardenerSettings />} />
      </Route>
    </Routes>
  )
}
