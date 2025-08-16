import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminAuthContextProvider } from './context/AdminAuthContext.jsx'
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthContextProvider>
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
    </AdminAuthContextProvider>
  </StrictMode>,
)
