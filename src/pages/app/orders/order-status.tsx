type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusNameMap: Record<OrderStatus, string> = {
  pending: 'Pending',
  canceled: 'Cancelled',
  delivered: 'Delivered',
  delivering: 'Delivering',
  processing: 'Processing',
}

const orderStatusColorMap: Record<OrderStatus, string> = {
  pending: 'bg-slate-400',
  canceled: 'bg-rose-500',
  delivered: 'bg-emerald-500',
  delivering: 'bg-amber-500',
  processing: 'bg-amber-500',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={`h-2 w-2 rounded-full ${orderStatusColorMap[status]}`}
      ></span>
      <span className="font-medium text-muted-foreground">
        {orderStatusNameMap[status]}
      </span>
    </div>
  )
}
