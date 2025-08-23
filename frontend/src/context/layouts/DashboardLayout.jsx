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
import useAdminAuth from '../AdminAuthContext';
import Sidebar from '../../components/dashboard/Sidebar';
import Dashboard from '../../pages/dashboard/DashboardHome';
import { Outlet } from 'react-router-dom';
import { useSocket } from '../SocketContext';

const DashboardLayout = () => {

    const [isOpen, setIsOpen] = useState(false)

      const { user } = useAdminAuth();
      const { emit, isConnected ,socket } = useSocket();
     
      
       const isOnline = useRef(false);
       // Join room when user is available and socket is connected
       useEffect(() => {
         if (user?.id && isConnected && !isOnline.current) {
           console.log('onile admin :', user.id);
           emit('goOnline', { adminId: user.id });
           isOnline.current = true;
         }
       }, [user?.id, isConnected, emit,socket]);
       
    
  useEffect(() => {
     if (!isConnected) {
      
       isOnline.current = false;
     }
   }, [isConnected]);
 
  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onToggle={onToggle} isOpen={isOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggle={onToggle} />
        <main className="flex-1 overflow-y-auto">
         <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;