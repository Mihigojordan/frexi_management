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
  Clock
} from 'lucide-react';
import Header from '../components/dashboard/Header';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data
  const stats = [
    { label: 'Total Tours', value: '124', change: '+12%', icon: MapPin, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Bookings', value: '89', change: '+5%', icon: Calendar, color: 'from-green-500 to-green-600' },
    { label: 'Total Customers', value: '1,234', change: '+18%', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Revenue', value: '$45,678', change: '+23%', icon: DollarSign, color: 'from-orange-500 to-orange-600' }
  ];
  
  const recentBookings = [
    { id: 1, customer: 'John Smith', tour: 'Paris Adventure', date: '2025-08-20', status: 'confirmed', amount: '$2,450' },
    { id: 2, customer: 'Sarah Johnson', tour: 'Tokyo Explorer', date: '2025-08-22', status: 'pending', amount: '$3,200' },
    { id: 3, customer: 'Mike Brown', tour: 'Bali Paradise', date: '2025-08-25', status: 'confirmed', amount: '$1,890' },
    { id: 4, customer: 'Lisa Davis', tour: 'Rome Classic', date: '2025-08-28', status: 'confirmed', amount: '$2,100' },
  ];
  
  const popularTours = [
    { id: 1, name: 'Paris Adventure', bookings: 45, rating: 4.8, price: '$2,450', image: '🗼' },
    { id: 2, name: 'Tokyo Explorer', bookings: 38, rating: 4.9, price: '$3,200', image: '🏯' },
    { id: 3, name: 'Bali Paradise', bookings: 32, rating: 4.7, price: '$1,890', image: '🏝️' },
    { id: 4, name: 'Rome Classic', bookings: 28, rating: 4.6, price: '$2,100', image: '🏛️' },
  ];

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-slate-200 h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg">
            <div className="flex items-center space-x-0.5">
              <MapPin className="w-4 h-4 text-white" />
              <Plane className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Travel Admin</h2>
            <p className="text-sm text-slate-500">Management Portal</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
          { id: 'tours', label: 'Tours', icon: MapPin },
          { id: 'bookings', label: 'Bookings', icon: Calendar },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'revenue', label: 'Revenue', icon: DollarSign },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );



  const Dashboard = () => (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                <p className="text-green-600 text-sm mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Recent Bookings</h3>
              <button className="text-slate-500 hover:text-slate-700">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{booking.customer}</p>
                    <p className="text-sm text-slate-500">{booking.tour}</p>
                    <p className="text-xs text-slate-400">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-800">{booking.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Popular Tours */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Popular Tours</h3>
              <button className="text-slate-500 hover:text-slate-700">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {popularTours.map((tour) => (
                <div key={tour.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{tour.image}</div>
                    <div>
                      <p className="font-medium text-slate-800">{tour.name}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-600">{tour.rating}</span>
                        </div>
                        <span className="text-slate-400">•</span>
                        <span className="text-sm text-slate-600">{tour.bookings} bookings</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-800">{tour.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tours':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Tours Management</h3>
              <p className="text-slate-600">Manage all your travel tours and destinations here.</p>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Bookings Management</h3>
              <p className="text-slate-600">View and manage all customer bookings.</p>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Customer Management</h3>
              <p className="text-slate-600">Manage customer profiles and preferences.</p>
            </div>
          </div>
        );
      case 'revenue':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <DollarSign className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Revenue Analytics</h3>
              <p className="text-slate-600">Track your earnings and financial metrics.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <Settings className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">System Settings</h3>
              <p className="text-slate-600">Configure your travel system preferences.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;