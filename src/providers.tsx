import { ReactElement } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'

export function Providers({ children }: { children: ReactElement }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="shops@theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | shops" />
        <Toaster position="bottom-center" closeButton duration={3000} />
        {children}
      </HelmetProvider>
    </ThemeProvider>
  )
}
