// DestinationCard.jsx
// import React from 'react';

const DestinationCard = ({ 
  image, 
  title, 
  rating, 
  duration, 
  onBookNow,
  isHighlighted = false 
}) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-orange-400 text-sm">★</span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
          {title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {renderStars(rating)}
          </div>
          <span className="text-sm text-gray-600">({rating} Rating)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <span className="text-sm mr-1">⏱</span>
            <span className="text-sm">{duration}</span>
          </div>
          
          <button 
            onClick={onBookNow}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
              isHighlighted 
                ? 'bg-teal-700 text-white hover:bg-teal-800' 
                : 'text-teal-700 border border-teal-700 hover:bg-teal-700 hover:text-white'
            }`}
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;