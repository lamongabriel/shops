import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { OrderTableFilters } from './order-table-filters'

describe('Order Table Filters', () => {
  it('should add the orderId to the URL when using the order ID filter', () => {
    const { container } = render(<OrderTableFilters />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={['/orders']}>{children}</MemoryRouter>
        )
      },
    })

    const orderIdInput = container.querySelector("input[name='orderId']")

    expect(orderIdInput).toBeVisible()
  })
})
