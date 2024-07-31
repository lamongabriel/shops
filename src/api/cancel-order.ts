import { api } from '@/lib/axios'

export async function cancelOrder(orderId: string) {
  return api.patch(`/orders/${orderId}/cancel`)
}
