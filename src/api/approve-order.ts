import { api } from '@/lib/axios'

export async function approveOrder(orderId: string) {
  return api.patch(`/orders/${orderId}/approve`)
}
