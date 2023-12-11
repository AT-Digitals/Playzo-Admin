import { lazy } from 'react'

// project import
import Loadable from 'components/Loadable'
import MainLayout from 'layout/MainLayout'
import BookingPage from 'pages/extra-pages/BookingPage'
import ExpenseManagementPage from 'pages/extra-pages/ExpenseManagementPage'
import BadmintonPage from 'pages/extra-pages/BadmintonPage'
import PaymentPage from 'pages/extra-pages/PaymentPage'

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')))

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')))

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')))
const Color = Loadable(lazy(() => import('pages/components-overview/Color')))
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')))
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'color',
      element: <Color />,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: 'sample-page',
      element: <SamplePage />,
    },
    {
      path: 'shadow',
      element: <Shadow />,
    },
    {
      path: 'typography',
      element: <Typography />,
    },
    {
      path: 'icons/ant',
      element: <AntIcons />,
    },
    {
      path: 'bookings',
      element: <BookingPage />,
    },
    {
      path: 'badminton',
      element: <BadmintonPage />,
    },
    {
      path: 'expense-management',
      element: <ExpenseManagementPage />,
    },
    {
      path: 'payments',
      element: <PaymentPage />,
    },
  ],
}

export default MainRoutes
