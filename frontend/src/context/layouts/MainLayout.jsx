import React, { useEffect } from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
const MainLayout = () => {
  const location = useLocation();

  // useEffect(() => {
  //   document.body.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //     // inline: "start",
  //   });
  // }, [location.pathname]);
  return (
    <div className='min-h-dvh text-white flex justify-between items-stretch flex-col bg-white'>
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default MainLayout