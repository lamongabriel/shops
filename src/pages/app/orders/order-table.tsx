import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, X } from 'lucide-react'

import { GetOrdersResponse } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderStatus } from './order-status'
import { OrderTableDialog } from './order-table-details-dialog'

export function OrderTable({
  orders,
}: {
  orders: GetOrdersResponse['orders']
}) {
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
        {orders.map((order) => (
          <TableRow key={order.orderId}>
            <TableCell>
              <OrderTableDialog />
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
              {order.orderId}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDistanceToNow(order.createdAt, {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell>
              <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="font-medium">
              {order.total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </TableCell>
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
        ))}
      </TableBody>
    </Table>
  )
}
