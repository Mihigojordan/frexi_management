import React, { useState, useEffect, useRef } from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../../components/user-dashboard/Header';
import useUserAuth from '../UserAuthContext';
import Sidebar from '../../components/user-dashboard/Sidebar';

const UserDashboardLayout = () => {
 const {user} = useUserAuth()

  return (
    <div className="min-h-screen bg-gray-100 flex">
     
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
       <Header onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;