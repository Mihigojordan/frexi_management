import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAdminAuth from "../../context/AuthContext";

const Header = () => {
    const [activeTab, setActiveTab] = useState()
    const location = useLocation()

    const {user} =  useAdminAuth()

    const tabs = {
        '/admin/dashboard': 'Dashboard',
        '/admin/dashboard/tour': 'Tour',
        '/admin/dashboard/destination': 'Tour',
        '/admin/dashboard/testimonial': 'Testimonial',
    }

    useEffect(() => {

        const getActiveTabs = () => {
            if (location.pathname) return setActiveTab('Dashboard')
            const active_tab = tabs[location.pathname]
            if (!activeTab) return setActiveTab('Dashboard')
            setActiveTab(active_tab)
        }

        getActiveTabs()

    }, [location.pathname])


    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h1>
                    <p className="text-slate-500">Manage your travel system</p>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            //   onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">A</span>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-slate-800">{user?.adminName}</p>
                            <p className="text-slate-500">{user?.adminEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header