import React from 'react';
import { Star, Clock, MapPin, Users, Heart } from 'lucide-react';

const DestinationCard = ({ 
  image = "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80", 
  title = "Nairobi Safari Adventure", 
  rating = 4.8, 
  duration = "5 Days", 
  location = "Kenya",
  price = "$1,299",
  travelers = 120,
  onBookNow = () => {},
  isHighlighted = false 
}) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${
          index < fullStars 
            ? 'fill-amber-400 text-amber-400' 
            : index === fullStars && hasHalfStar 
              ? 'fill-amber-200 text-amber-400' 
              : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Heart Icon */}
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 transition-all duration-300 hover:bg-white/40 hover:scale-110">
          <Heart className="w-5 h-5 text-white hover:fill-red-500 hover:text-red-500 transition-colors duration-300" />
        </button>
        
        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
          {price}
        </div>
        
        {/* Location Badge */}
        <div className="absolute top-4 left-4 flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
          <MapPin className="w-4 h-4 text-white mr-1" />
          <span className="text-white text-xs font-medium">{location}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-6 z-20">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
            <span className="text-sm text-gray-500">({Math.floor(rating * 245)} reviews)</span>
          </div>
        </div>
        
        {/* Duration and Travelers */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">{duration}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium">{travelers}+ travelers</span>
          </div>
        </div>
        
        {/* Redesigned Avatars Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-3 font-medium">Recent travelers:</span>
            <div className="flex -space-x-3">
              <div className="relative group/avatar">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:z-10">
                  <span className="text-white font-bold text-sm">JD</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full opacity-0 group-hover/avatar:opacity-30 transition-opacity duration-300 blur"></div>
              </div>
              
              <div className="relative group/avatar">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:z-10">
                  <span className="text-white font-bold text-sm">SM</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-0 group-hover/avatar:opacity-30 transition-opacity duration-300 blur"></div>
              </div>
              
              <div className="relative group/avatar">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:z-10">
                  <span className="text-white font-bold text-sm">AL</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-0 group-hover/avatar:opacity-30 transition-opacity duration-300 blur"></div>
              </div>
              
              <div className="relative group/avatar">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:z-10">
                  <span className="text-white font-bold text-sm">+{Math.floor(travelers/10)}</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-rose-400 to-red-500 rounded-full opacity-0 group-hover/avatar:opacity-30 transition-opacity duration-300 blur"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <button 
          onClick={onBookNow}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
            isHighlighted 
              ? 'bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40' 
              : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-2 border-transparent hover:border-gradient-to-r hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 hover:bg-gradient-to-r hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 hover:text-white'
          }`}
          style={!isHighlighted ? {
            background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6) border-box'
          } : {}}
        >
          <span className="flex items-center justify-center">
            Book Adventure Now
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>
      
      {/* Floating Gradient Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
};

// Demo Component to show the card
const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-md mx-auto">
        <DestinationCard />
      </div>
    </div>
  );
};

export default Demo;