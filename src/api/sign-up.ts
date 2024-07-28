import { api } from '@/lib/axios'

export interface SignUpBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function signUp({
  email,
  managerName,
  phone,
  restaurantName,
}: SignUpBody) {
  return api.post('/restaurants', { restaurantName, managerName, email, phone })
}
