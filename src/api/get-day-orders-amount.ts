import { api } from '@/lib/axios'

export interface GetDaysOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDaysOrdersAmount() {
  const { data } = await api.get<GetDaysOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  )

  return data
}
