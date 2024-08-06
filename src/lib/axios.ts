import axios, { isAxiosError } from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
  })
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const status = error.response?.status
      const code = error.response?.data?.code

      if (status === 401 && code === 'UNAUTHORIZED') {
        window.location.replace('/sign-in')

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
