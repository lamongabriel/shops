import { Home, UtensilsCrossed } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { ShopsLogo } from '@/assets/icons/logo'
import { Separator } from '@/components/ui/separator'

import { ModeToggle } from '../theme/mode-toggle'
import { AccountMenu } from './account-menu'

const links = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Orders', path: '/orders', icon: UtensilsCrossed },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <ShopsLogo />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          {links.map((link) => {
            const isCurrentPath = pathname.includes(link.path)

            return (
              <Link
                data-current={isCurrentPath}
                className={`flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground`}
                key={link.name}
                to={link.path}
              >
                <link.icon className="mr-1.5 size-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}
