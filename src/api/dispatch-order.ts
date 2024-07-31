import { api } from '@/lib/axios'

export async function dispatchOrder(orderId: string) {
  return api.patch(`/orders/${orderId}/dispatch`)
}
