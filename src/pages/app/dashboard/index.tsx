import { Helmet } from 'react-helmet-async'

import { DayOrdersCard } from './day-orders-card'
import { MonthCancelledOrdersCard } from './month-cancelled-orders-card'
import { MonthOrdersCard } from './month-orders-card'
import { PopularProductsChart } from './popular-products-chart'
import { RevenueCard } from './revenue-card'
import { RevenueChart } from './revenue-chart'

export function DashboardPage() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <RevenueCard />
        <MonthOrdersCard />
        <DayOrdersCard />
        <MonthCancelledOrdersCard />
      </div>

      <div className="grid grid-cols-9 gap-4">
        <RevenueChart />
        <PopularProductsChart />
      </div>
    </>
  )
}
