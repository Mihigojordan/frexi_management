import { BrowserRouter, createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes } from "react-router-dom"
import React, { Suspense, lazy } from "react";
import MainLayout from "../context/layouts/MainLayout";
import AuthLayout from "../context/layouts/AuthLayout";
import AdminLogin from "../pages/auth/Login";
import DashboardLayout from "../context/layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/DashboardHome";
import AdminProfile from "../pages/dashboard/AdminProfile";
import ProtectPrivateAdminRoute from "../components/protectors/ProtectPrivateAdminRoute";
import UnlockScreen from "../pages/auth/UnlockScreen";
import TourManagement from "../pages/dashboard/TourManagement";
import HomePage from "../pages/landing/HomePage";
import PartnerManagement from "../pages/dashboard/PartnerManagement";


// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          { index: true, element: <SuspenseWrapper> <HomePage /> </SuspenseWrapper> }
        ]
      },
      {
        path: 'admin',
        element:(
          <ProtectPrivateAdminRoute>
             <Outlet />
          </ProtectPrivateAdminRoute>
        ),
        children: [
          {
            index:true,
            element: <Navigate to={'/admin/dashboard'} replace />
          },
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />
              },
               {
                path: 'tours',
                element: <TourManagement />
              }, 
              {
                path: 'profile',
                element: <AdminProfile />
              },
              {
                path: 'partner',
                element: <PartnerManagement />
              },
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'admin/login',
        element: <AdminLogin />
      },
      {
        path: 'admin/register',
        element: <h1>register</h1>
      },
      {
        path: 'admin/unlock',
        element: <UnlockScreen />
      }
    ]
  }

])

export default routes