import { 
  MapPin, 
  Plane, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Bell,
  Settings,
  Handshake,
  User
} from 'lucide-react';
import useAdminAuth from "../../context/AdminAuthContext";
import { NavLink, useNavigate } from 'react-router-dom';

  const Sidebar = () =>{
    const {user} = useAdminAuth()
    const navigate = useNavigate()

    const navlinks = [
          { id: '', label: 'Dashboard', icon: TrendingUp },
          { id: 'tours', label: 'Tours', icon: MapPin },
          { id: 'partner', label: 'partner', icon: Handshake },
        
        ]
        const handleNavigateProfile = ()=>{

        }
    return  (
    <div className="w-64 bg-white border-r flex flex-col border-primary-200 h-full">
      {/* Logo */}
      <div className="p-6 border-b border-primary-200">
        <div className="flex items-center space-x-3">
          {/* <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg">
            <div className="flex items-center space-x-0.5">
              <MapPin className="w-4 h-4 text-white" />
              <Plane className="w-3 h-3 text-white" />
            </div>
          </div> */}
          <div>
            <h2 className="font-bold text-xl text-primary-800">Frexi</h2>
            <p className="text-sm text-primary-500">Admin Management Portal</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 flex-1 space-y-2">
        {navlinks.map((item, key) => (
  <NavLink
    key={key}
    to={`/admin/dashboard/${item.id}`}
    end
    className={({ isActive }) =>
      `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
        isActive
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
          : 'text-primary-600 hover:bg-primary-50'
      }`
    }
  >
    <item.icon className="w-5 h-5" />
    <span className="font-medium">{item.label}</span>
  </NavLink>
))}

      </nav>
      
    
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 cursor-pointer" onClick={handleNavigateProfile}>
          <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            
              <div className="flex-1 min-w-0">
                <p className="text-sm font-normal text-gray-900 truncate">
                  {user?.adminName || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.adminEmail || 'admin@example.com'}
                </p>
              </div>
          
          </div>
        </div>
    </div>
  )
  };

  export default Sidebar