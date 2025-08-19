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
import DashboardLayout from "../context/layouts/DashboardLayout";

import FrexiAuthPage from "../pages/auth/userAuth/UserAuth";
import ProtectPrivateUserRoute from "../components/protectors/ProtectPrivateUserRoute";
import UserDashboardHome from "../pages/user-dashboard/DashboardHome";

// Admin Auth

const AdminLogin = lazy(() => import("../pages/auth/Login"));
// Dashboard
const Dashboard = lazy(() => import("../pages/dashboard/DashboardHome"));
const AdminProfile = lazy(() => import("../pages/dashboard/AdminProfile"));
const ProtectPrivateAdminRoute = lazy(() =>
  import("../components/protectors/ProtectPrivateAdminRoute")
);
const UnlockScreen = lazy(() => import("../pages/auth/UnlockScreen"));

// Tours
const TourManagement = lazy(() => import("../pages/dashboard/TourManagement"));
const CreateTourPage = lazy(() =>
  import("../components/dashboard/tour/CreateTourPage")
);
const UpdateTourPage = lazy(() =>
  import("../components/dashboard/tour/UpdateTourPage")
);
const TourViewPage = lazy(() =>
  import("../components/dashboard/tour/TourViewPage")
);

// Destinations
const DestinationManagement = lazy(() =>
  import("../pages/dashboard/DestinationManagement")
);
const CreateDestinationPage = lazy(() =>
  import("../components/dashboard/destination/CreateDestinationPage")
);
const UpdateDestinationPage = lazy(() =>
  import("../components/dashboard/destination/UpdateTourPage")
);
const DestinationViewPage = lazy(() =>
  import("../components/dashboard/destination/DestinationViewPage")
);

// Landing pages
const HomePage = lazy(() => import("../pages/landing/HomePage"));
const PartnerManagement = lazy(() =>
  import("../pages/dashboard/PartnerManagement")
);
const TestimonialManagement = lazy(() =>
  import("../pages/dashboard/TestmonialManagement")
);
const AboutPage = lazy(() => import("../pages/landing/AboutPage"));
const YachtGallery = lazy(() => import("../pages/landing/GalleryPage"));
const ServicePage = lazy(() => import("../pages/landing/ServicePage"));

// Static assets
import logo from "../assets/image/frexilogo.png";


const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <img
      src={logo}
      alt="Loading..."
      className="h-40 animate-zoomInOut"
    />
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
          { index: true, element: <SuspenseWrapper> <HomePage /> </SuspenseWrapper> },
          { path:'/about', element: <SuspenseWrapper> <AboutPage /> </SuspenseWrapper> },
          { path:'/gallery', element: <SuspenseWrapper> <YachtGallery /> </SuspenseWrapper> },
          { path:'/service', element: <SuspenseWrapper> <ServicePage /> </SuspenseWrapper> },
        ]
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
