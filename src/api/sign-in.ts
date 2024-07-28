import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  return api.post('/authenticate', { email })
}
