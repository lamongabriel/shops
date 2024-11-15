import './app.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { enableMSW } from './api/mocks/index.ts'
import { Providers } from './providers.tsx'
import { AppRoutes } from './routes.tsx'

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Providers>
        <AppRoutes />
      </Providers>
    </StrictMode>,
  )
})
