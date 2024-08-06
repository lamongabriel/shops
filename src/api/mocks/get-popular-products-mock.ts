import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json(
    Array.from({ length: 5 }).map(() => {
      const amount = Math.round(Math.random() * 100)

      return {
        product: 'Pizza',
        amount,
      }
    }),
  )
})
