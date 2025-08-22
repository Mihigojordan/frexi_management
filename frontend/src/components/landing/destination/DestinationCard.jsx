// DestinationCard.jsx
import React from 'react';
import { MapPin, ArrowRight, Map, Star } from 'lucide-react';
import destinationService from '../../../services/destinationServices';
import { Link } from 'react-router-dom';

const DestinationCard = ({
  destination,
  onBookNow,
  viewMode = 'grid'
}) => {
  const {
 
    name,
    country,
    mainPhotoUrl,
    rating,
   
    isActive = true
  } = destination;

  const renderStars = (rating) => {
    const numRating = Number(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          if (index < fullStars) {
            return <Star key={index} className="w-4 h-4 text-amber-400 fill-current" />;
          } else if (index === fullStars && hasHalfStar) {
            return <Star key={index} className="w-4 h-4 text-amber-400 fill-current opacity-50" />;
          } else {
            return <Star key={index} className="w-4 h-4 text-gray-300" />;
          }
        })}
      </div>
    );
  };

  const getImageUrl = () => {
    if (!mainPhotoUrl) {
      return '/api/placeholder/400/300';
    }
    
    if (mainPhotoUrl.startsWith('http')) {
      return mainPhotoUrl;
    }
    
    return destinationService.getFullImageUrl(mainPhotoUrl);
  };

  // Grid view (default)
  if (viewMode === 'grid') {
    return (
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl()}
            alt={name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/api/placeholder/400/300';
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {!isActive && (
              <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                Unavailable
              </div>
            )}
          </div>
        </div>
       
        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 capitalize mb-2 group-hover:text-primary-600 transition-colors duration-300">
              {name}
            </h3>
            
            {country && (
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin className="w-4 h-4 mr-1.5 text-primary-400" />
                {country}
              </div>
            )}
          </div>
         
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {rating ? (
                <>
                  {renderStars(rating)}
                  <span className="text-sm text-orange-400 font-medium ml-1">
                    {Number(rating).toFixed(1)}
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
              )}
            </div>
          </div>
         
          <button
            onClick={onBookNow}
            disabled={!isActive}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isActive
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/25 focus:outline-none focus:ring-4 focus:ring-primary-200 transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isActive ? (
              <Link to={`destination/${destination.id}`} className=' flex items-center justify-center capitalize gap-2  ' >
                more details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            ) : (
              'Currently Unavailable'
            )}
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="relative lg:w-80 h-64 lg:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={getImageUrl()}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/api/placeholder/400/300';
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-gradient-to-t lg:from-black/40 lg:to-transparent" />
          
          {/* Status and country badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {!isActive && (
              <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                Unavailable
              </div>
            )}
          </div>

          {country && (
            <div className="absolute top-4 right-4 bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
              {country}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 capitalize mb-2 group-hover:text-primary-600 transition-colors duration-300">
                {name}
              </h3>
              {country && (
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1.5 text-primary-400" />
                  {country}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {rating ? (
                  <>
                    {renderStars(rating)}
                    <span className="text-sm text-gray-500 font-medium ml-1">
                      {Number(rating).toFixed(1)}
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onBookNow}
              disabled={!isActive}
              className={`py-3 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/25 focus:outline-none focus:ring-4 focus:ring-primary-200 transform hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isActive ? (
                <Link className=' flex items-center justify-center gap-2 capitalize '  to={`destinations/${destination.id}`} >
                  more details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              ) : (
                'Currently Unavailable'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;