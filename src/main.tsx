import './app.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { Providers } from './providers.tsx'
import { AppRoutes } from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AppRoutes />
    </Providers>
  </StrictMode>,
)
