// TourCard.jsx
import React from 'react';
import { MapPin, Clock, Star, DollarSign, Users, Calendar, Eye } from 'lucide-react';
import tourService from '../../../services/toursServices';

const TourCard = ({ tour, viewMode = 'grid', onBookNow, onViewDetails }) => {
  if (!tour) return null;

  const {
    id,
    name,
    mainPhotoUrl,
    country,
    city,
    estimatedBudget,
    duration,
    rating,
    maxGroupSize,
    startDate,
    category,
    highlights = [],
    description
  } = tour;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format budget
  const formatBudget = (budget) => {
    if (!budget) return 'Price on request';
    return `$${budget.toLocaleString()}`;
  };

  // Get full image URL
  const getImageUrl = () => {
    if (!mainPhotoUrl) return '/api/placeholder/400/300';
    return tourService.getFullImageUrl(mainPhotoUrl);
  };

  // Parse description
  const getShortDescription = () => {
    const desc = tourService.parseDescription(description);
    if (!desc) return '';
    
    // Remove HTML tags and get first 150 characters
    const plainText = desc.replace(/<[^>]*>/g, '');
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  // Parse highlights to ensure it's an array
  const parseHighlights = () => {
    if (!highlights) return [];
    
    // If it's already an array, return it
    if (Array.isArray(highlights)) return highlights;
    
    // If it's a string, try to parse it as JSON
    if (typeof highlights === 'string') {
      try {
        const parsed = JSON.parse(highlights);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        // If JSON parsing fails, return empty array
        return [];
      }
    }
    
    // If it's an object or other type, return empty array
    return [];
  };

  // Grid view component
  const GridView = () => (
    <div className="bg-white rounded-xl flex-col flex justify-between  shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/api/placeholder/400/300';
          }}
        />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </div>
        )}

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-800">{rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{city ? `${city}, ` : ''}{country}</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {getShortDescription()}
          </p>
        )}

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          {duration && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-primary-500" />
              <span>{duration} {duration === 1 ? 'day' : 'days'}</span>
            </div>
          )}
          
          {maxGroupSize && (
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-primary-500" />
              <span>Max {maxGroupSize}</span>
            </div>
          )}
          
          {startDate && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-primary-500" />
              <span>{formatDate(startDate)}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-primary-500" />
            <span>{formatBudget(estimatedBudget)}</span>
          </div>
        </div>

        {/* Highlights */}
        {parseHighlights().length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {parseHighlights().slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {highlight}
                </span>
              ))}
              {parseHighlights().length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  +{parseHighlights().length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
        
          <button 
            onClick={() => onViewDetails && onViewDetails(id)}
  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 "
          >
           
           More Details
          </button>
        </div>
      </div>
    </div>
  );

  // List view component
  const ListView = () => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-80 h-64 md:h-auto overflow-hidden flex-shrink-0">
          <img
            src={getImageUrl()}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/api/placeholder/400/300';
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {category && (
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category}
                    </span>
                  )}
                  {rating && (
                    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-800">{rating}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{city ? `${city}, ` : ''}{country}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">
                  {formatBudget(estimatedBudget)}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {getShortDescription()}
              </p>
            )}

            {/* Tour Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {duration && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-primary-500" />
                  <span className="text-sm">{duration} {duration === 1 ? 'day' : 'days'}</span>
                </div>
              )}
              
              {maxGroupSize && (
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-primary-500" />
                  <span className="text-sm">Max {maxGroupSize}</span>
                </div>
              )}
              
              {startDate && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                  <span className="text-sm">{formatDate(startDate)}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2 text-primary-500" />
                <span className="text-sm">{formatBudget(estimatedBudget)}</span>
              </div>
            </div>

            {/* Highlights */}
            {parseHighlights().length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Highlights:</h4>
                <div className="flex flex-wrap gap-1">
                  {parseHighlights().slice(0, 5).map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {parseHighlights().length > 5 && (
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      +{parseHighlights().length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => onViewDetails && onViewDetails(id)}
                className="flex flex-1 items-center justify-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on view mode
  return viewMode === 'grid' ? <GridView /> : <ListView />;
};

export default TourCard;