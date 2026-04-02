import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DemoModeProvider } from './contexts/DemoModeContext'
import { AuthProvider } from './contexts/AuthContext'
import { TenantProvider } from './contexts/TenantContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoModeProvider>
    <AuthProvider>
    <TenantProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </TenantProvider>
    </AuthProvider>
    </DemoModeProvider>
  </React.StrictMode>,
)
