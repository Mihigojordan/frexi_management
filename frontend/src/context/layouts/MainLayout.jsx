import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
const MainLayout = () => {
  const pathname = location.pathname
  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      // inline: "start",
    });
  }, [pathname]);
  return (
    <div className='min-h-dvh text-white flex justify-between items-stretch flex-col bg-white'>
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default MainLayout