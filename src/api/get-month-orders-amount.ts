import { api } from '@/lib/axios'

export interface GetMonthsOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthsOrdersAmount() {
  const { data } = await api.get<GetMonthsOrdersAmountResponse>(
    '/metrics/month-orders-amount',
  )

  return data
}
