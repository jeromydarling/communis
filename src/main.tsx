import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AccessibilityProvider } from './components/a11y/AccessibilityProvider'
import { DemoModeProvider } from './contexts/DemoModeContext'
import { AuthProvider } from './contexts/AuthContext'
import { TenantProvider } from './contexts/TenantContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccessibilityProvider>
    <DemoModeProvider>
    <AuthProvider>
    <TenantProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </TenantProvider>
    </AuthProvider>
    </DemoModeProvider>
    </AccessibilityProvider>
  </React.StrictMode>,
)
