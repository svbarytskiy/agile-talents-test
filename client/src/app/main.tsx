import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { ProfileSearchProvider } from './context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileSearchProvider>
      <App />
    </ProfileSearchProvider>
  </StrictMode>,
)
