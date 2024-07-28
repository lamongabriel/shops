import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { Search } from 'lucide-react'

import { getOrderDetails } from '@/api/get-order-details'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderStatus } from './order-status'

interface OrderTableDialogProps {
  orderId: string
  open: boolean
  onOpen: (state: boolean) => void
}

export function OrderTableDialog({
  onOpen,
  open,
  orderId,
}: OrderTableDialogProps) {
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Search className="size-3" />
          <span className="sr-only">Order details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>{orderId}</DialogDescription>
        </DialogHeader>
        {order && (
          <div className="space-y-6">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Status
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <OrderStatus status={order.status} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Customer
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {order.customer.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Phone</TableCell>
                  <TableCell className="flex justify-end">
                    {order.customer.phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    E-mail
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {order.customer.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Created at
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {formatDistanceToNow(order.createdAt)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty. </TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.priceInCents / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        (item.priceInCents * item.quantity) /
                        100
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Order total</TableCell>
                  <TableCell className="text-right font-medium">
                    {(
                      order.orderItems.reduce(
                        (prev, cur) => prev + cur.priceInCents * cur.quantity,
                        0,
                      ) / 100
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
