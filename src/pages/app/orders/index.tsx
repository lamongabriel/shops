import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { DataTablePagination } from '@/components/data-table/pagination'

import { OrderTable } from './order-table'
import { OrderTableFilters } from './order-table-filters'

export function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((p) => p - 1)
    .parse(searchParams.get('page') ?? '1')

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { data: results } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, customerName, orderId, status }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())

      return prev
    })
  }

  return (
    <>
      <Helmet title="Orders" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="space-y-2.5">
        <OrderTableFilters />

        <div className="rounded-md border">
          <OrderTable orders={results?.orders ?? []} />
        </div>

        {results && (
          <DataTablePagination
            onPageChange={handlePaginate}
            pageIndex={results.meta.pageIndex}
            totalCount={results.meta.totalCount}
            perPage={results.meta.perPage}
          />
        )}
      </div>
    </>
  )
}
