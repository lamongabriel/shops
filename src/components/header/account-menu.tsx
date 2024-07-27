import { Building, ChevronDown, LogOut } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const options = [
  { name: 'Store Configuration', icon: Building, className: '' },
  { name: 'Logout', icon: LogOut, className: 'text-destructive' },
]

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          User
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span>User</span>
          <span className="text xs font-normal text-muted-foreground">
            User@user.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {options.map((option) => (
          <DropdownMenuItem
            key={option.name}
            className={`flex items-center gap-1.5 ${option.className}`}
          >
            <option.icon className="size-4" />
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
