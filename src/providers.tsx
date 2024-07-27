import { ReactElement } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: ReactElement }) {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | shops" />
      <Toaster position="bottom-center" closeButton duration={3000} />
      {children}
    </HelmetProvider>
  )
}
