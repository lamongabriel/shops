import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-cancelled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCancelledOrdersCard() {
  const { data } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ['metrics', 'month-canceled-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelled Orders
        </CardTitle>
        <X className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {data ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {data.amount.toLocaleString()}
            </span>
            <p className="text-sm text-muted-foreground">
              {data.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{data.diffFromLastMonth}%
                  </span>{' '}
                  from last month
                </>
              ) : (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    -{data.diffFromLastMonth}%
                  </span>{' '}
                  from last month
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
