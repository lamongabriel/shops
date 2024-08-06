import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { Providers } from '@/providers'

import { SignInPage } from './sign-in'

describe('SignIn', () => {
  it('should set default email input value if email in present on search params', () => {
    const { container } = render(<SignInPage />, {
      wrapper: ({ children }) => {
        return (
          <Providers>
            <MemoryRouter
              initialEntries={['/sign-in?email=lamongabriel@icloud.com']}
            >
              {children}
            </MemoryRouter>
          </Providers>
        )
      },
    })

    const emailInput = container.querySelector("input[name='email']")

    expect(emailInput).toHaveValue('lamongabriel@icloud.com')
  })
})
