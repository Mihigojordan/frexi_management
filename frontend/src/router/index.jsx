import { BrowserRouter,createBrowserRouter,Route,RouterProvider,Routes } from "react-router-dom"
import React, { Suspense, lazy } from "react";
import MainLayout from "../layouts/MainLayout";
const  HomePage = lazy(()=> import("../pages/HomePage"));


// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const  SuspenseWrapper = ({children})=>{
   return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
}

const routes = createBrowserRouter([
  {
    path: '/',
    element:<MainLayout/>,
    children:[
        { index:true , element: <SuspenseWrapper> <HomePage/> </SuspenseWrapper> }
    ]
  }
])

export default routes