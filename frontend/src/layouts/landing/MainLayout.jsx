import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';


const MainLayout = () => {
  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }, []);
  return (
    <div className='min-h-dvh text-white flex justify-between items-stretch flex-col bg-[#0D0F1A]'>

    <Navbar />
    <Outlet />
    <Footer />

    </div>
  )
}

export default MainLayout