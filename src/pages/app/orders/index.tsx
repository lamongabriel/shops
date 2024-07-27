import { Helmet } from 'react-helmet-async'

import { DataTablePagination } from '@/components/data-table/pagination'

import { OrderTable } from './order-table'
import { OrderTableFilters } from './order-table-filters'

export function OrdersPage() {
  return (
    <>
      <Helmet title="Orders" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="space-y-2.5">
        <OrderTableFilters />

        <div className="rounded-md border">
          <OrderTable />
        </div>

        <DataTablePagination pageIndex={0} totalCount={105} perPage={10} />
      </div>
    </>
  )
}
