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


// Static assets
import logo from "../assets/image/frexilogo.png";
import ViewBlogPage from "../components/dashboard/blog/ViewMorePage";
import TourPage from "../pages/landing/TourPage";
import TourDetailsPage from "../pages/landing/TourDetailsPage";
import UserDashboardLayout from "../context/layouts/UserDashboardLayout";
import UserDashboardHome from "../pages/user-dashboard/DashboardHome";
import MessageManagement from "../pages/user-dashboard/MessageManagement";
import AdminMessageManagement from "../pages/dashboard/MessageManagement";

// Admin Auth - Lazy loaded
const AdminLogin = lazy(() => import("../pages/auth/Login"));

// Dashboard - Lazy loaded
const Dashboard = lazy(() => import("../pages/dashboard/DashboardHome"));
const AdminProfile = lazy(() => import("../pages/dashboard/AdminProfile"));
const ProtectPrivateAdminRoute = lazy(() =>
  import("../components/protectors/ProtectPrivateAdminRoute")
);
const ProtectPrivateEmployeeRoute = lazy(()=> import('../components/protectors/ProtectEmployeeRoutes'))
const UnlockScreen = lazy(() => import("../pages/auth/UnlockScreen"));

// Tours - Lazy loaded
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

// Destinations - Lazy loaded
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

// Landing pages - Lazy loaded
const HomePage = lazy(() => import("../pages/landing/HomePage"));
const PartnerManagement = lazy(() =>
  import("../pages/dashboard/PartnerManagement")
);
const BlogsManagement = lazy(() =>
  import("../pages/dashboard/BlogsManagement")
);
const TestimonialManagement = lazy(() =>
  import("../pages/dashboard/TestmonialManagement")
);
const ContactMessageManagement = lazy(() =>
  import("../pages/dashboard/ContactMessageManagement")
);
const ClientManagement = lazy(()=> import("../pages/dashboard/ClientManagment"))
const EmployeeManagement = lazy(()=> import("../pages/dashboard/EmployeeManagement"))
const EmployeeLogin = lazy(() => import("../pages/auth/employee/EmployeeLogin"));

const AboutPage = lazy(() => import("../pages/landing/AboutPage"));
const YachtGallery = lazy(() => import("../pages/landing/GalleryPage"));
const ServicePage = lazy(() => import("../pages/landing/ServicePage"));
const BlogPage  = lazy(()=> import("../pages/landing/BlogPage"))
const DestinationPage = lazy(()=> import("../pages/landing/DestinationPage"))
const ContactUsPage = lazy(()=> import("../pages/landing/ContactUsPage"))
const DestinationDetails = lazy(()=> import("../pages/landing/Destination-details"))

// eslint-disable-next-line react-refresh/only-export-components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <img
      src={logo}
      alt="Loading..."
      className="h-40 animate-zoomInOut"
    />
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
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
          { path:'/blogs', element: <SuspenseWrapper> <BlogPage /> </SuspenseWrapper> },
          { path:'/destination', element: <SuspenseWrapper> <DestinationPage /> </SuspenseWrapper> },
          { path:'/tour', element: <SuspenseWrapper> <TourPage /> </SuspenseWrapper> },
          { path:'/tour/:id', element: <SuspenseWrapper> <TourDetailsPage /> </SuspenseWrapper> },
          { path:'/contact', element: <SuspenseWrapper> <ContactUsPage /> </SuspenseWrapper> },
          { path:'/destination/:id', element: <SuspenseWrapper> <DestinationDetails /> </SuspenseWrapper> },
        ]
      },
      {
        path: "admin",
        element: (
          <SuspenseWrapper>
            <ProtectPrivateAdminRoute>
              <Outlet />
            </ProtectPrivateAdminRoute>
          </SuspenseWrapper>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={"/admin/dashboard"} replace />,
          },
          {
            path: "dashboard",
            element: <DashboardLayout role={"admin"} />,
            children: [
              {
                index: true,
                element: <SuspenseWrapper><Dashboard /></SuspenseWrapper>,
              },

              // tour
              {
                path: "tours",
                element: <SuspenseWrapper><TourManagement /></SuspenseWrapper>,
              },
              {
                path: "tours/:id",
                element: <SuspenseWrapper><TourViewPage /></SuspenseWrapper>,
              },
              {
                path: "tours/create",
                element: <SuspenseWrapper><CreateTourPage /></SuspenseWrapper>,
              },
              {
                path: "tours/update/:id",
                element: <SuspenseWrapper><UpdateTourPage /></SuspenseWrapper>,
              },

              // destination
              {
                path: "destinations",
                element: <SuspenseWrapper><DestinationManagement /></SuspenseWrapper>,
              },
              {
                path: "destinations/:id",
                element: <SuspenseWrapper><DestinationViewPage /></SuspenseWrapper>,
              },
              {
                path: "destinations/create",
                element: <SuspenseWrapper><CreateDestinationPage /></SuspenseWrapper>,
              },
              {
                path: "destinations/update/:id",
                element: <SuspenseWrapper><UpdateDestinationPage /></SuspenseWrapper>,
              },
              {
                path: "profile",
                element: <SuspenseWrapper><AdminProfile /></SuspenseWrapper>,
              },
              {
                path: "partner",
                element: <SuspenseWrapper><PartnerManagement /></SuspenseWrapper>,
              },
              {
                path: "testimonial",
                element: <SuspenseWrapper><TestimonialManagement /></SuspenseWrapper>,
              },
              {
                path: "client",
                element: <SuspenseWrapper><ClientManagement /></SuspenseWrapper>,
              },
              {
                path: "employee",
                element: <SuspenseWrapper><EmployeeManagement /></SuspenseWrapper>,
              },
              {

                path: "contact-message",
                element: <SuspenseWrapper><ContactMessageManagement /></SuspenseWrapper>,
              },
              {
                path: "messages",
                element: <SuspenseWrapper><AdminMessageManagement /></SuspenseWrapper>,
       },
              {
                path: "blogs",
                element: <SuspenseWrapper><BlogsManagement /></SuspenseWrapper>,
              },
              {
                path: "blogs/:id",
                element: <SuspenseWrapper><ViewBlogPage /></SuspenseWrapper>,
              },
            ],
          },
        ],
      },
      {
        path: "employee",
        element: (
          <SuspenseWrapper>
            <ProtectPrivateEmployeeRoute>
              <Outlet />
            </ProtectPrivateEmployeeRoute>
          </SuspenseWrapper>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={"/employee/dashboard"} replace />,
          },
          {
            path: "dashboard",
            element: <DashboardLayout role={"employee"} />,
            children: [
              {
                index: true,
                element: <SuspenseWrapper><Dashboard /></SuspenseWrapper>,
              },

              // tour
              {
                path: "tours",
                element: <SuspenseWrapper><TourManagement /></SuspenseWrapper>,
              },
              {
                path: "tours/:id",
                element: <SuspenseWrapper><TourViewPage /></SuspenseWrapper>,
              },
              {
                path: "tours/create",
                element: <SuspenseWrapper><CreateTourPage /></SuspenseWrapper>,
              },
              {
                path: "tours/update/:id",
                element: <SuspenseWrapper><UpdateTourPage /></SuspenseWrapper>,
              },

              // destination
              {
                path: "destinations",
                element: <SuspenseWrapper><DestinationManagement /></SuspenseWrapper>,
              },
              {
                path: "destinations/:id",
                element: <SuspenseWrapper><DestinationViewPage /></SuspenseWrapper>,
              },
              {
                path: "destinations/create",
                element: <SuspenseWrapper><CreateDestinationPage /></SuspenseWrapper>,
              },
              {
                path: "destinations/update/:id",
                element: <SuspenseWrapper><UpdateDestinationPage /></SuspenseWrapper>,
              },
              {
                path: "profile",
                element: <SuspenseWrapper><AdminProfile /></SuspenseWrapper>,
              },
              {
                path: "partner",
                element: <SuspenseWrapper><PartnerManagement /></SuspenseWrapper>,
              },
              {
                path: "testimonial",
                element: <SuspenseWrapper><TestimonialManagement /></SuspenseWrapper>,
              },
              {
                path: "client",
                element: <SuspenseWrapper><ClientManagement /></SuspenseWrapper>,
              },
              {
                path: "employee",
                element: <SuspenseWrapper><EmployeeManagement /></SuspenseWrapper>,
              },
              {

                path: "contact-message",
                element: <SuspenseWrapper><ContactMessageManagement /></SuspenseWrapper>,
              },
              {
                path: "messages",
                element: <SuspenseWrapper><AdminMessageManagement /></SuspenseWrapper>,
       },
              {
                path: "blogs",
                element: <SuspenseWrapper><BlogsManagement /></SuspenseWrapper>,
              },
              {
                path: "blogs/:id",
                element: <SuspenseWrapper><ViewBlogPage /></SuspenseWrapper>,
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
        element:<UserDashboardLayout/>,
        children:[
          {
            index:true,
            element:<SuspenseWrapper><UserDashboardHome/></SuspenseWrapper>
          },
          {
            path:"messages",
            element: <SuspenseWrapper><MessageManagement /> </SuspenseWrapper>
          }
          
        ]
      },
      
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "admin/login",
        element: <SuspenseWrapper><AdminLogin /></SuspenseWrapper>,
      },
      {
        path: "admin/register",
        element: <h1>register</h1>,
      },
      {
        path: "admin/unlock",
        element: <SuspenseWrapper><UnlockScreen /></SuspenseWrapper>,
      },
    ],
  },
  {
    path: "/auth/user",
    element: <FrexiAuthPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "employee/login",
        element: <SuspenseWrapper><EmployeeLogin /></SuspenseWrapper>,
      },
      {
        path: "admin/unlock",
        element: <SuspenseWrapper><UnlockScreen /></SuspenseWrapper>,
      },
    ],
  },
]);

export default routes;