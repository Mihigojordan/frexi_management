import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import TopSection from '../../components/landing/Topsection';
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
    <div className=' text-white flex justify-between items-stretch flex-col bg-white'>
    <TopSection />
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default MainLayout