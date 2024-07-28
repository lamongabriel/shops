import { api } from '@/lib/axios'

interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: Array<{
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }>
}

export async function getOrderDetails({ orderId }: { orderId: string }) {
  const { data } = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return data
}
