// Destination.jsx
import React, { useState } from 'react';
import HeaderBanner from "../../components/landing/HeaderBanner";
import DestinationCard from '../../components/landing/destination/DestinationCard';
import CategorySidebar from '../../components/landing/destination/CategoryCard';
import img from '../../assets/image/tour/tour1.jpeg'
const Destination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Default Sorting');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const destinations = [
    {
      id: 1,
      title: 'Dubai',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    },
    {
      id: 2,
      title: 'poland',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    },
    {
      id: 3,
      title: 'France',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    },
    {
      id: 4,
      title: 'Maldives',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    },
    {
      id: 5,
      title: 'Belgium',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    },
    {
      id: 6,
      title: 'istanbul',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    },
    {
      id: 7,
      title: 'Spain',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    },
    {
      id: 8,
      title: 'Greece',
      image: img,
      rating: 4.8,
      duration: '7 Days',
      isHighlighted: true
    },
    {
      id: 9,
      title: 'Newziland',
      image: img,
      rating: 4.8,
      duration: '7 Days'
    }
  ];

  const handleBookNow = (destinationId) => {
    console.log(`Booking destination: ${destinationId}`);
    // Add your booking logic here
  };

  const handleSearch = (searchTerm) => {
    console.log(`Searching for: ${searchTerm}`);
    // Add your search logic here
  };

  return (
    <>
      <HeaderBanner title={'Our Destinations'} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input 
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-700 text-white p-2 rounded-full hover:bg-teal-800">
                  🔍
                </button>
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-teal-700 text-white' : 'text-gray-600'}`}
                  >
                    ⊞
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-teal-700 text-white' : 'text-gray-600'}`}
                  >
                    ☰
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>Default Sorting</option>
                  <option>Name A-Z</option>
                  <option>Name Z-A</option>
                  <option>Rating High to Low</option>
                  <option>Rating Low to High</option>
                </select>
              </div>
            </div>

            {/* Destinations Grid */}
            <div className={`grid gap-6 mb-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  image={destination.image}
                  title={destination.title}
                  rating={destination.rating}
                  duration={destination.duration}
                  isHighlighted={destination.isHighlighted}
                  onBookNow={() => handleBookNow(destination.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
              <button 
                className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center"
              >
                1
              </button>
              {[2, 3, 4].map((page) => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-teal-700 hover:text-white"
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 text-gray-700 hover:text-teal-700">
                Next →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <CategorySidebar />
        </div>
      </div>
    </>
  );
};

export default Destination;