import { ArrowRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableDialog } from './order-table-details-dialog'

export function OrderTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[64px]"></TableHead>
          <TableHead className="w-[140px]">ID</TableHead>
          <TableHead className="w-[180px]">Created at</TableHead>
          <TableHead className="w-[140px]">Status</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="w-[140px]">Total</TableHead>
          <TableHead className="w-[164px]"></TableHead>
          <TableHead className="w-[132px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <OrderTableDialog />
          </TableCell>
          <TableCell className="font-mono text-xs font-medium">
            OR-2341AA
          </TableCell>
          <TableCell className="text-muted-foreground">
            Mon, 13 Aug 2024
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-400"></span>
              <span className="font-medium text-muted-foreground">Pending</span>
            </div>
          </TableCell>
          <TableCell className="font-medium">Dan Schneider</TableCell>
          <TableCell className="font-medium">U$ 34,45</TableCell>
          <TableCell>
            <Button variant="outline" size="xs">
              <ArrowRight className="mr-2 size-3" />
              Approve
            </Button>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="xs">
              <X className="mr-2 size-3" />
              Cancel
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
