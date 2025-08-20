// CategorySidebar.jsx
import React, { useState } from 'react';
import { 
  Building2, 
  Waves, 
  Mountain, 
  Newspaper, 
  Compass, 
  TreePine,
  Search,
  Calendar,
  Hash,
  Filter,
  MapPin,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import img from '../../../assets/image/gorilla1.jpg';

const CategorySidebar = ({ onCategoryFilter, onLocationFilter, onBudgetFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const categories = [
    { name: 'City Tour', count: 8, icon: Building2, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { name: 'Beach Tours', count: 6, icon: Waves, color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
    { name: 'Wildlife Tours', count: 2, icon: TreePine, color: 'text-green-500', bgColor: 'bg-green-50' },
    { name: 'News & Tips', count: 7, icon: Newspaper, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { name: 'Adventure Tours', count: 9, icon: Compass, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { name: 'Mountain Tours', count: 10, icon: Mountain, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  ];

  const recentPosts = [
    {
      title: 'Exploring The Green Spaces Of The Island Maldives',
      date: '22/6/2024',
      image: img,
      readTime: '5 min read'
    },
    {
      title: 'Harmony With Nature Of Belgium Tour And Travel',
      date: '25/6/2024',
      image: img,
      readTime: '8 min read'
    },
    {
      title: 'Exploring The Green Spaces Of Realar Residence',
      date: '27/6/2024',
      image: img,
      readTime: '6 min read'
    }
  ];

  const popularTags = [
    { name: 'Tour', count: 24 },
    { name: 'Adventure', count: 18 },
    { name: 'Rent', count: 12 },
    { name: 'Innovate', count: 8 },
    { name: 'Hotel', count: 15 },
    { name: 'Modern', count: 9 },
    { name: 'Luxury', count: 21 },
    { name: 'Travel', count: 33 }
  ];

  const budgetRanges = [
    { label: 'Under $500', value: '0-500', count: 12 },
    { label: '$500 - $1,000', value: '500-1000', count: 18 },
    { label: '$1,000 - $2,500', value: '1000-2500', count: 25 },
    { label: '$2,500 - $5,000', value: '2500-5000', count: 15 },
    { label: 'Over $5,000', value: '5000+', count: 8 }
  ];

  const popularLocations = [
    { name: 'Rwanda', count: 15, flag: '🇷🇼' },
    { name: 'Kenya', count: 12, flag: '🇰🇪' },
    { name: 'Tanzania', count: 18, flag: '🇹🇿' },
    { name: 'Uganda', count: 9, flag: '🇺🇬' },
    { name: 'Ethiopia', count: 7, flag: '🇪🇹' }
  ];

  const handleCategoryClick = (category) => {
    const newSelectedCategory = selectedCategory === category.name ? null : category.name;
    setSelectedCategory(newSelectedCategory);
    onCategoryFilter?.(newSelectedCategory);
  };

  const handleBudgetChange = (range) => {
    setSelectedBudgetRange(range);
    onBudgetFilter?.(range);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    onLocationFilter?.(location);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Search Widget */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-bold text-gray-800">Quick Search</h3>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pl-10 text-black "
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white p-2 rounded-md hover:bg-primary-600 transition-colors"
            >
              <Search className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-bold text-gray-800">Recent Posts</h3>
        </div>
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm leading-tight mb-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;