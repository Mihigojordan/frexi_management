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


  export default Dashboard