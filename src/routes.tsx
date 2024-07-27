import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { DashboardPage } from './pages/app/dashboard'
import { AppLayout } from './pages/app/layouts/app-layout'
import { AuthLayout } from './pages/auth/layouts/auth-layout'
import { SignInPage } from './pages/auth/sign-in'
import { SignUpPage } from './pages/auth/sign-up'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/dashboard', element: <DashboardPage /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
