import { api } from '@/lib/axios'

export async function signOut() {
  return api.post('/sign-out')
}
