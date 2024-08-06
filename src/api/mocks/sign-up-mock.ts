import { http, HttpResponse } from 'msw'

import type { SignUpBody } from '../sign-up'

export const signUpMock = http.post<never, SignUpBody>(
  '/restaurants',
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'johndoe@example.com') {
      return new HttpResponse(null, {
        status: 201,
      })
    }

    return new HttpResponse(null, { status: 400 })
  },
)
