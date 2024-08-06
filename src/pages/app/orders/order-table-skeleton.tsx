import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Button variant="outline" size="xs">
            <Search className="size-3" />
            <span className="sr-only">Order details</span>
          </Button>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>
        <TableCell className="text-muted-foreground">
          <Skeleton className="h-4 w-[148px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[110px]" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-[64px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
      </TableRow>
    )
  })
}
