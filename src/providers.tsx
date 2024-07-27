import { ReactElement } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export function Providers({ children }: { children: ReactElement }) {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | shops" />
      {children}
    </HelmetProvider>
  )
}
