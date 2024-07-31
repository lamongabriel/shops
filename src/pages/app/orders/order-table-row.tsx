import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
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

  function updateOrderStatusCache(
    orderId: string,
    status: typeof order.status,
  ) {
    const cached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    cached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((o) => {
          if (o.orderId === orderId) {
            return { ...o, status }
          }

          return o
        }),
      })
    })
  }

  const { mutateAsync: cancel, isPending: isCancelingPending } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, orderId) {
      updateOrderStatusCache(orderId, 'canceled')
    },
  })

  const { mutateAsync: approve, isPending: isApprovePending } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, orderId) {
      updateOrderStatusCache(orderId, 'processing')
    },
  })

  const { mutateAsync: dispatch, isPending: isDispatchPending } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_, orderId) {
      updateOrderStatusCache(orderId, 'delivering')
    },
  })

  const { mutateAsync: deliver, isPending: isDeliverPending } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, orderId) {
      updateOrderStatusCache(orderId, 'delivered')
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
        {order.status === 'pending' && (
          <Button
            disabled={isApprovePending}
            onClick={() => approve(order.orderId)}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Approve
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            disabled={isDispatchPending}
            onClick={() => dispatch(order.orderId)}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Delivery
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            disabled={isDeliverPending}
            onClick={() => deliver(order.orderId)}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Complete
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancel(order.orderId)}
          disabled={
            isCancelingPending ||
            !['pending', 'processing'].includes(order.status)
          }
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
