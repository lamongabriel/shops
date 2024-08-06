import { format, subDays } from 'date-fns'
import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json(
    Array.from({ length: 20 }).map((_, index) => {
      const date = format(subDays(new Date(), index + 1), 'MM/dd/yyyy')

      const receipt = Math.random() * 10000

      return {
        date,
        receipt,
      }
    }),
  )
})
