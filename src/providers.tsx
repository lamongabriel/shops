import { QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'

import { queryClient } from './lib/react-query'

export function Providers({ children }: { children: ReactElement }) {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="shops@theme">
        <Helmet titleTemplate="%s | shops" />
        <Toaster position="bottom-center" closeButton duration={3000} />

        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
