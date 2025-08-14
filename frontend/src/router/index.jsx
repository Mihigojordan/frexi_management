import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom"
import React, { Suspense, lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLogin from "../pages/auth/Login";
const HomePage = lazy(() => import("../pages/HomePage"));


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
        path: '/admin',
        element: <h1>admin layout </h1>
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
      }
    ]
  }

])

export default routes