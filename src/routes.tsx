import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { DashboardPage } from './pages/app/dashboard'
import { AppLayout } from './pages/app/layouts/app-layout'
import { AuthLayout } from './pages/auth/layouts/auth-layout'
import { SignInPage } from './pages/auth/sign-in'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <DashboardPage /> }],
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignInPage /> }],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
