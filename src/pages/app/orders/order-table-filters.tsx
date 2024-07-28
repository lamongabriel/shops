import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilters = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId') ?? ''
  const customerName = searchParams.get('customerName') ?? ''
  const status = searchParams.get('status') ?? 'all'

  const { register, handleSubmit, control, reset } = useForm<OrderFilters>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId,
      customerName,
      status,
    },
  })

  function handleFilterData({ orderId, customerName, status }: OrderFilters) {
    setSearchParams((prev) => {
      if (orderId) {
        prev.set('orderId', orderId.toString())
      } else {
        prev.delete('orderId')
      }

      if (customerName) {
        prev.set('customerName', customerName.toString())
      } else {
        prev.delete('customerName')
      }

      if (status && status !== 'all') {
        prev.set('status', status.toString())
      } else {
        prev.delete('status')
      }

      prev.set('page', '1')

      return prev
    })
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('orderId')
      prev.delete('customerName')
      prev.delete('status')
      prev.set('page', '1')

      return prev
    })

    reset({
      customerName: '',
      orderId: '',
      status: '',
    })
  }

  const showClearFilters =
    orderId || customerName || (status && status !== 'all')

  return (
    <form
      onSubmit={handleSubmit(handleFilterData)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filters</span>
      <Input
        placeholder="Order ID"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Customer name"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivering">Delivering</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-1.5 size-4" />
        Filter
      </Button>

      {showClearFilters && (
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={handleClearFilters}
        >
          <X className="mr-1.5 size-4" />
          Remove Filters
        </Button>
      )}
    </form>
  )
}
