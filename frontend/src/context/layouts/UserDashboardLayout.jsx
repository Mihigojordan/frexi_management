
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Header from '../../components/user-dashboard/Header';
import useUserAuth from '../UserAuthContext';
import Sidebar from '../../components/user-dashboard/Sidebar';
import { useSocket, useSocketEvent } from '../SocketContext';

const UserDashboardLayout = () => {
  const { user } = useUserAuth();
  const { emit, isConnected } = useSocket();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const hasJoinedRoom = useRef(false);

  // Join room when user is available and socket is connected
  useEffect(() => {
    if (user?.id && isConnected && !hasJoinedRoom.current) {
      console.log('Joining room for user:', user.id);
      emit('joinRoom', { userId: user.id });
      hasJoinedRoom.current = true;
    }
  }, [user?.id, isConnected, emit]);

  // Reset room join flag when disconnected
  useEffect(() => {
    if (!isConnected) {
      hasJoinedRoom.current = false;
    }
  }, [isConnected]);





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

      {/* Socket Status Indicator (optional - for debugging) */}
      {import.meta.env.VITE_NODE_ENV === 'development' && (
        <div className={`fixed bottom-4 right-4 px-3 py-2 rounded-full text-sm font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      )}
    </div>
  );
};

// Hook to use outlet context in child components
export const useChatContext = () => {
  const context = useOutletContext();
  if (!context) {
    throw new Error('useChatContext must be used within UserDashboardLayout');
  }
  return context;
};

export default UserDashboardLayout;