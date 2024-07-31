import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'

import { OrderStatus } from './order-status'
import { OrderTableDialog } from './order-table-details-dialog'

interface OrderTableRowProps {
  order: GetOrdersResponse['orders'][0]
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: cancel } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, orderId) {
      const cached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      cached.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) return

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((o) => {
            if (o.orderId === orderId) {
              return { ...o, status: 'canceled' }
            }

            return o
          }),
        })
      })
    },
  })

  return (
    <TableRow key={order.orderId}>
      <TableCell>
        <OrderTableDialog
          onOpen={setIsDetailsOpen}
          open={isDetailsOpen}
          orderId={order.orderId}
        />
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
        <Button
          onClick={() => cancel(order.orderId)}
          disabled={!['pending', 'processing'].includes(order.status)}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 size-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
