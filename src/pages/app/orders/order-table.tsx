import { GetOrdersResponse } from '@/api/get-orders'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableRow } from './order-table-row'

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
          <OrderTableRow key={order.orderId} order={order} />
        ))}
      </TableBody>
    </Table>
  )
}
