import { Home, UtensilsCrossed } from 'lucide-react'

import { ShopsLogo } from '@/assets/icons/logo'
import { Separator } from '@/components/ui/separator'

import { ModeToggle } from '../theme/mode-toggle'
import { AccountMenu } from './account-menu'
import { NavLink, type NavLinkType } from './nav-link'

const links = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Orders', path: '/orders', icon: UtensilsCrossed },
] as NavLinkType[]

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <ShopsLogo />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          {links.map((link) => (
            <NavLink key={link.name} link={link} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}
