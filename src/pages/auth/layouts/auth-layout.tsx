import { Outlet } from 'react-router-dom'

import { ShopsLogo } from '@/assets/icons/logo'

export function AuthLayout() {
  return (
    <main className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <ShopsLogo />
        <footer className="text-sm">
          Dashboard &copy; Shops {new Date().getFullYear()}
        </footer>
      </div>
      <div className="relative flex flex-col items-center justify-center bg-background text-foreground">
        <Outlet />
      </div>
    </main>
  )
}
