import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

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