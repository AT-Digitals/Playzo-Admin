import BadmintonPage from 'pages/extra-pages/BadmintonPage';
import BookingPage from 'pages/extra-pages/BookingPage';
import ExpenseManagementPage from 'pages/extra-pages/ExpenseManagementPage';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import PaymentPage from 'pages/extra-pages/PaymentPage';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project import

// project import

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
//const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
// ==============================|| ROUTING RENDER ||============================== //
export default function ThemeRoutes() {
  return useRoutes([
    {
      element: <MinimalLayout />,
      children: [
        {
          path: '/',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        }
      ]
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            }
          ]
        },
        {
          path: 'sample-page',
          element: <SamplePage />
        },
        {
          path: 'shadow',
          element: <Shadow />
        },
        {
          path: 'typography',
          element: <Typography />
        },
        {
          path: 'icons/ant',
          element: <AntIcons />
        },
        {
          path: 'bookings',
          element: <BookingPage />
        },
        {
          path: 'badminton',
          element: <BadmintonPage />
        },
        {
          path: 'expense-management',
          element: <ExpenseManagementPage />
        },
        {
          path: 'payments',
          element: <PaymentPage />
        }
      ]
    }
  ]);
}
