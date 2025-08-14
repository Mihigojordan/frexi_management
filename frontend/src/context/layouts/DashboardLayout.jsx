import React, { useState } from 'react';
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

const DashboardLayout = () => {

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
         <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;