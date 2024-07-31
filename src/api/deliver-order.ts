import { api } from '@/lib/axios'

export async function deliverOrder(orderId: string) {
  return api.patch(`/orders/${orderId}/deliver`)
}
