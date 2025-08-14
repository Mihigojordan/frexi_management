import React, { useState, useEffect } from 'react';
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
    Filter,
    Download,
    Globe,
    Star,
    Clock,
    User,
    MessageSquare,
    UserCheck,
    Building,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    FileText,
    Activity
} from 'lucide-react';
import tourService from '../../services/toursServices';
import destinationService from '../../services/destinationServices';
import testimonialService from '../../services/testimonialServices';
import partnerService from '../../services/partnerService';
import { useNavigate } from 'react-router-dom';

// Mock services for demonstration - replace with your actual imports


const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        tours: [],
        destinations: [],
        testimonials: [],
        partners: [],
        stats: {
            tours: { total: 0, active: 0, inactive: 0, countries: 0, averageBudget: 0 },
            destinations: { total: 0, active: 0, inactive: 0, countries: 0 },
            testimonials: { total: 0, averageRating: 0, withImages: 0 },
            partners: 0
        }
    });

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                const [tours, destinations, testimonials, partners, tourStats, destStats, testimonialStats] = await Promise.all([
                    tourService.getAllTours(),
                    destinationService.getAllDestinations(),
                    testimonialService.getAllTestimonials(),
                    partnerService.findAll(),
                    tourService.getTourStats(),
                    destinationService.getDestinationStats(),
                    testimonialService.getTestimonialStats()
                ]);

                setDashboardData({
                    tours: tours.slice(0, 5), // Latest 5 tours
                    destinations: destinations.slice(0, 4), // Top 4 destinations
                    testimonials: testimonials.slice(0, 3), // Recent 3 testimonials
                    partners: partners.slice(0, 4), // Recent 4 partners
                    stats: {
                        tours: tourStats,
                        destinations: destStats,
                        testimonials: testimonialStats,
                        partners: partners.length
                    }
                });
            } catch (err) {
                setError(err.message);
                console.error('Dashboard data fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statsCards = [
        {
            label: 'Total Tours',
            value: dashboardData.stats.tours.total,
            change: '+12%',
            icon: MapPin,
            color: 'from-primary-400 to-primary-500',
            trend: 'up'
        },
        {
            label: 'Active Destinations',
            value: dashboardData.stats.destinations.active,
            change: '+8%',
            icon: Globe,
            color: 'from-blue-400 to-blue-500',
            trend: 'up'
        },
        {
            label: 'Customer Reviews',
            value: dashboardData.stats.testimonials.total,
            change: '+23%',
            icon: MessageSquare,
            color: 'from-green-400 to-green-500',
            trend: 'up'
        },
        {
            label: 'Partner Network',
            value: dashboardData.stats.partners,
            change: '-2%',
            icon: Building,
            color: 'from-purple-400 to-purple-500',
            trend: 'down'
        }
    ];

    const handleViewMore = (part) => {

        switch (part) {
            case 'partner':
                return navigate('/admin/dashboard/partner')
            case 'tour':
                return navigate('/admin/dashboard/tours')
            case 'destination':
                return navigate('/admin/dashboard/destinations')
            case 'testimonial':
                return navigate('/admin/dashboard/testimonial')

            default:
                return null

        }

    }

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="flex items-center space-x-3">
                    <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
                    <span className="text-lg text-gray-600">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-2">Error loading dashboard</div>
                    <div className="text-gray-600">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your tourism business.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value.toLocaleString()}</p>
                                    <div className="flex items-center mt-3">
                                        {stat.trend === 'up' ? (
                                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className={`text-sm font-medium ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-gray-500 text-sm ml-2">vs last month</span>
                                    </div>
                                </div>
                                <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Tours */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Tours</h3>
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Filter className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {dashboardData.tours.map((tour) => (
                                    <div key={tour.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                                <MapPin className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{tour.name}</p>
                                                <p className="text-sm text-gray-500">{tour.country}</p>
                                                <div className="flex items-center mt-1">
                                                    <span className={`text-xs px-2 py-1 rounded-full ${tour.isActive
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {tour.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">${tour.estimatedBudget?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {
                                dashboardData.partners && dashboardData.partners.length > 0 ?
                                    <div className="mt-6 pt-4 border-t border-gray-200">

                                        <button className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm py-2" onClick={() => handleViewMore('tour')}>
                                            View All Tours →
                                        </button>
                                    </div>
                                    :
                                    (
                                        <div className="p-6">
                                            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                                                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                                <h3 className="text-lg font-semibold text-slate-800 mb-2">Tours</h3>
                                                <p className="text-slate-600">No Tours have been added yet.</p>
                                            </div>
                                        </div>)
                            }
                        </div>
                    </div>

                    {/* Recent Testimonials */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-medium text-yellow-700">
                                            {dashboardData.stats.testimonials.averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {dashboardData.testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                                    <div className="flex items-center space-x-1 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < testimonial.rating
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {new Date(testimonial.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.message}"</p>
                                    </div>
                                ))}
                            </div>
                            {
                                dashboardData.testimonials && dashboardData.testimonials.length > 0 ?
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <button className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm py-2" onClick={() => handleViewMore('testimonial')}>
                                            View All Reviews →
                                        </button>
                                    </div>

                                    :

                                    (
                                        <div className="p-6">
                                            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                                                <Star className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                                <h3 className="text-lg font-semibold text-slate-800 mb-2">Reviews</h3>
                                                <p className="text-slate-600">No Reviews have been added yet.</p>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Popular Destinations */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Popular Destinations</h3>

                                {
                                    dashboardData.destinations && dashboardData.destinations.length > 0 ?
                                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium" onClick={() => handleViewMore('destination')}>
                                            View All
                                        </button>

                                        :
                                        (
                                            <div className="p-6">
                                                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                                                    <Globe className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Destinations</h3>
                                                    <p className="text-slate-600">No Destinations have been added yet.</p>
                                                </div>
                                            </div>

                                        )
                                }
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dashboardData.destinations.map((destination) => (
                                    <div key={destination.id} className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Globe className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{destination.name}</p>
                                                    <p className="text-sm text-gray-500">{destination.country}</p>
                                                </div>
                                            </div>
                                            <span className="text-green-100 bg-green-500 text-xs px-2 py-1 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Starting from</span>
                                            <span className="font-bold text-gray-900">${destination.estimatedBudget?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Partners Summary */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Partner Network</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {dashboardData.partners.map((partner) => (
                                    <div key={partner.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Building className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{partner.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{partner.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {
                                dashboardData.partners && dashboardData.partners.length > 0 ?
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <button className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm py-2" onClick={() => handleViewMore('partner')}>
                                            View Partners →
                                        </button>
                                    </div>

                                    :
                                    (
                                        <div className="p-6">
                                            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                                                <Building className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                                <h3 className="text-lg font-semibold text-slate-800 mb-2">Partners</h3>
                                                <p className="text-slate-600">No Partners have been added yet.</p>
                                            </div>
                                        </div>

                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;