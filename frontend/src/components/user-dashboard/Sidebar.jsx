import { Calendar, CreditCard, Home, MapPin, MessageCircle, Globe, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items with corresponding routes
  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home, path: '/user/dashboard' },
    { name: 'Messages', id: 'messages', icon: MessageCircle, path: '/user/dashboard/messages' },
    { name: 'My Bookings', id: 'bookings', icon: Calendar, path: '/user/dashboard/bookings' },
    { name: 'Tours', id: 'tours', icon: MapPin, path: '/user/dashboard/tours' },
    { name: 'Payments', id: 'payments', icon: CreditCard, path: '/user/dashboard/payments' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Frexi</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end
                className={({ isActive }) =>
                  `w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-700'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
                {item.id === 'messages' && chats.length > 0 && (
                  <span className="ml-auto bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    {chats.reduce((acc, chat) => acc + chat.unreadCount, 0) || chats.length}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-8 w-8 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">
                {user?.firstname || ''} {user?.lastname}
              </p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;