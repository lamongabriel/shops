import { AArrowDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export type NavLinkType = {
  name: string
  path: string
  icon: typeof AArrowDown
}

interface NavLinkProps {
  link: NavLinkType
}

export function NavLink({ link }: NavLinkProps) {
  const { pathname } = useLocation()

  const isCurrentPath =
    link.path === '/' ? pathname === '/' : pathname.includes(link.path)

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
}
