import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
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
import CreateTourPage from "../components/dashboard/tour/CreateTourPage";
import UpdateTourPage from "../components/dashboard/tour/UpdateTourPage";
import TourViewPage from "../components/dashboard/tour/TourViewPage";
import DestinationManagement from "../pages/dashboard/DestinationManagement";
import CreateDestinationPage from "../components/dashboard/destination/CreateDestinationPage";
import UpdateDestinationPage from "../components/dashboard/destination/UpdateTourPage";
import DestinationViewPage from "../components/dashboard/destination/DestinationViewPage";
import HomePage from "../pages/landing/HomePage";
import PartnerManagement from "../pages/dashboard/PartnerManagement";
import TestimonialManagement from "../pages/dashboard/TestmonialManagement";
import FrexiAuthPage from "../pages/auth/userAuth/UserAuth";
import ProtectPrivateUserRoute from "../components/protectors/ProtectPrivateUserRoute";
import UserDashboardHome from "../pages/user-dashboard/DashboardHome";

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper>
                {" "}
                <HomePage />{" "}
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectPrivateAdminRoute>
            <Outlet />
          </ProtectPrivateAdminRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={"/admin/dashboard"} replace />,
          },
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },

              // tour
              {
                path: "tours",
                element: <TourManagement />,
              },
              {
                path: "tours/:id",
                element: <TourViewPage />,
              },
              {
                path: "tours/create",
                element: <CreateTourPage />,
              },
              {
                path: "tours/update/:id",
                element: <UpdateTourPage />,
              },

              // destination
              {
                path: "destinations",
                element: <DestinationManagement />,
              },
              {
                path: "destinations/:id",
                element: <DestinationViewPage />,
              },
              {
                path: "destinations/create",
                element: <CreateDestinationPage />,
              },
              {
                path: "destinations/update/:id",
                element: <UpdateDestinationPage />,
              },
              {
                path: "profile",
                element: <AdminProfile />,
              },
              {
                path: "partner",
                element: <PartnerManagement />,
              },
              {
                path: "testimonial",
                element: <TestimonialManagement />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path:"user",
    element:(
      <ProtectPrivateUserRoute>
        <Outlet/>
      </ProtectPrivateUserRoute>
    ),
    children:[
      {
        index:true,
        element: <Navigate to={"/user/dashboard"} replace />, 
      },
      {
        path:'dashboard',
        element:<UserDashboardHome/>
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "admin/register",
        element: <h1>register</h1>,
      },
      {
        path: "admin/unlock",
        element: <UnlockScreen />,
      },
    ],
  },
  {
    path: "/auth/user",
    element: <FrexiAuthPage />,
  },
]);

export default routes;
