import {
  MapPin,
  Plane,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  RouteIcon,
  Handshake,
  User,
  X,
  UserRoundCog,
  LetterTextIcon,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAdminAuth from '../../context/AdminAuthContext';
import useEmployeeAuth from '../../context/EmployeeAuthContext';

const Sidebar = ({ isOpen = true, onToggle, role }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const { user: adminData } = useAdminAuth();
  const { user: employeeData } = useEmployeeAuth();
  const navigate = useNavigate();

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const adminItems = [
    { key: 'dashboard', label: 'Dashboard', icon: TrendingUp, path: '/admin/dashboard' },
    { key: 'employees', label: 'Employees', icon: UserRoundCog, path: '/admin/dashboard/employee' },
    { key: 'clients', label: 'Our Clients', icon: Users, path: '/admin/dashboard/client' },
    { key: 'tours', label: 'Tours', icon: MapPin, path: '/admin/dashboard/tours' },
    { key: 'destinations', label: 'Destinations', icon: RouteIcon, path: '/admin/dashboard/destinations' },
    { key: 'partners', label: 'Partners', icon: Handshake, path: '/admin/dashboard/partner' },
    { key: 'testimonials', label: 'Testimonials', icon: UserRoundCog, path: '/admin/dashboard/testimonial' },
    { key: 'blogs', label: 'Blogs', icon: LetterTextIcon, path: '/admin/dashboard/blogs' },
    { key: 'contact-message', label: 'Contact Messages', icon: MessageCircle, path: '/admin/dashboard/contact-message' },
    { key: 'messages', label: 'Messages', icon: MessageCircle, path: '/admin/dashboard/messages' },
  ];

  const employeeItems = [
    { key: 'dashboard', label: 'Dashboard', icon: TrendingUp, path: '/employee/dashboard' },
    { key: 'tours', label: 'Tours ', icon: MapPin, path: '/employee/dashboard/tours' },
    { key: 'destinations', label: 'Destinations ', icon: RouteIcon, path: '/employee/dashboard/destinations' },
    { key: 'client', label: 'Client ', icon: Users, path: '/employee/dashboard/client' },
    { key: 'testimonial', label: 'Testimonial ', icon: UserRoundCog, path: '/employee/dashboard/testimonial' },
    { key: 'blog', label: 'Blog ', icon: LetterTextIcon, path: '/employee/dashboard/blogs' },
    { key: 'message', label: 'Message ', icon: MessageCircle, path: '/employee/dashboard/messages' },
  ];

  const getProfileRoute = () => role === 'admin' ? '/admin/dashboard/profile' : '/employee/dashboard/profile';

  const handleNavigateProfile = () => {
    const route = getProfileRoute();
    if (route) navigate(route, { replace: true });
  };

  const getCurrentMenuItems = () => {
    if (role === 'admin') return adminItems;
    if (role === 'employee') return employeeItems;
    return [];
  };

  const currentMenuItems = getCurrentMenuItems();

  useEffect(() => {
    const activePath = window.location.pathname;
    currentMenuItems.forEach(item => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some(subItem => activePath.startsWith(subItem.path));
        if (isSubmenuActive) {
          setExpandedMenus(prev => ({ ...prev, [item.key]: true }));
        }
      }
    });
  }, [currentMenuItems]);

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isExpanded = expandedMenus[item.key];

    return (
      <div key={item.key} className="mb-1">
        {item.hasSubmenu ? (
          <button
            onClick={() => toggleSubmenu(item.key)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${isExpanded ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' : 'text-primary-600 hover:bg-primary-50'}`}
          >
            <div className="flex items-center space-x-3">
              <Icon className={`w-5 h-5 ${isExpanded ? 'text-white' : 'text-primary-600 group-hover:text-primary-700'}`} />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90 text-white' : 'text-primary-600'}`} />
          </button>
        ) : (
          <NavLink
            to={item.path}
            end
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' : 'text-primary-600 hover:bg-primary-50'}`
            }
            onClick={() => {
              if (window.innerWidth < 1024) onToggle();
            }}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        )}

        {item.hasSubmenu && (
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-6 mt-2 space-y-1">
              {item.submenu.map(subItem => (
                <NavLink
                  key={subItem.key}
                  to={subItem.path}
                  end
                  className={({ isActive }) =>
                    `w-full block text-left px-3 py-1.5 text-sm rounded-md transition-colors ${isActive ? 'bg-primary-100 text-primary-700 font-medium' : 'text-primary-600 hover:bg-primary-50'}`
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) onToggle();
                  }}
                >
                  {subItem.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} />
      )}

      <div className={`fixed left-0 top-0 h-screen bg-white flex flex-col border-r border-primary-200 shadow-lg transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-80`}>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg">
              <div className="flex items-center space-x-0.5">
                <MapPin className="w-4 h-4 text-white" />
                <Plane className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-xl text-primary-800">Frexi</h2>
              <p className="text-sm text-primary-500 capitalize">{role} Portal</p>
            </div>
          </div>
          <button 
            onClick={onToggle} 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {currentMenuItems.length > 0 ? (
              currentMenuItems.map(renderMenuItem)
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No menu items available</p>
                {role === 'employee' && (
                  <p className="text-gray-400 text-xs mt-2">Contact admin to assign tasks for more options</p>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-primary-200 cursor-pointer" onClick={handleNavigateProfile}>
          <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            {role === 'admin' ? (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-normal text-gray-900 truncate">
                  {adminData?.adminName || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {adminData?.adminEmail || 'admin@example.com'}
                </p>
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-normal text-gray-900 truncate">
                  {employeeData?.firstname} {employeeData?.lastname}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {employeeData?.email}
                </p>
                {employeeData?.tasks && (
                  <p className="text-xs text-gray-400 truncate">Tasks: {employeeData.tasks.length}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;