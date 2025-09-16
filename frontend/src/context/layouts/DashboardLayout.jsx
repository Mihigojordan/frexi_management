import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Plane, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  Globe,
  Star,
  Clock,
  User
} from 'lucide-react';
import Header from '../../components/dashboard/Header';
import Sidebar from '../../components/dashboard/Sidebar';
import useAdminAuth from '../AdminAuthContext';
import useEmployeeAuth from '../EmployeeAuthContext';
import { Outlet } from 'react-router-dom';
import { useSocket } from '../SocketContext';

const DashboardLayout = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const adminAuth = useAdminAuth();
  const employeeAuth = useEmployeeAuth();
  
  // Dynamically select the appropriate auth context based on role
  const authContext = role === 'admin' ? adminAuth : employeeAuth;
  const { user } = authContext;
  
  const { emit, isConnected, socket } = useSocket();
  const isOnline = useRef(false);

  // Join room when user is available and socket is connected
  useEffect(() => {
    if (user?.id && isConnected && !isOnline.current) {
      console.log(`${role} online:`, user.id);
      emit('goOnline', { [`${role}Id`]: user.id });
      isOnline.current = true;
    }
  }, [user?.id, isConnected, emit, socket, role]);

  // Reset online status when socket disconnects
  useEffect(() => {
    if (!isConnected) {
      isOnline.current = false;
    }
  }, [isConnected]);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      <Sidebar onToggle={onToggle} isOpen={isOpen} role={role} />
      <div className="flex-1 flex flex-col h-screen">
        <Header onToggle={onToggle} role={role} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;