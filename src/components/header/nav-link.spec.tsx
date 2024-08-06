import { render } from '@testing-library/react'
import { UtensilsCrossed } from 'lucide-react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('Navigation', () => {
  it('should highlight the current navigation link path', () => {
    const wrapper = render(
      <>
        <NavLink
          link={{ icon: UtensilsCrossed, name: 'About', path: '/about' }}
        />
        <NavLink link={{ icon: UtensilsCrossed, name: 'Home', path: '/' }} />
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )

    const aboutLink = wrapper.getByText('About')
    const homeLink = wrapper.getByText('Home')

    expect(aboutLink.dataset.current).toBe('true')
    expect(homeLink.dataset.current).toBe('false')
  })
})
