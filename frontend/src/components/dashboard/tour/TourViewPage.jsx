import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Globe, 
  MessageCircle, 
  DollarSign, 
  Calendar, 
  Users, 
  Star, 
  ArrowLeft,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import tourService from '../../../services/toursServices';
import { useParams } from 'react-router-dom';


const TourViewPage = () => {
  // Mock ID for demonstration - replace with actual useParams() when using React Router
  const {id} = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // Mock navigation function - replace with actual useNavigate() when using React Router
  const navigate = (path) => {
    console.log('Navigate to:', path);
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const tourData = await tourService.getTourById(id);
        setTour(tourData);
      } catch (err) {
        setError(err.message || 'Failed to fetch tour details');
        console.error('Error fetching tour:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTour();
    }
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const parseJsonField = (field) => {
    if (!field) return null;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  };

  const getAllImages = () => {
    const images = [];
    if (tour.mainPhotoUrl) {
      images.push(tourService.getFullImageUrl(tour.mainPhotoUrl));
    }
    
    const gallery = parseJsonField(tour.gallery);
    console.log(gallery);
    
    if (gallery && Array.isArray(gallery)) {
      gallery.forEach(img => {
        images.push(tourService.getFullImageUrl(img));
      });
    }
    
    return images.filter(img => img);
  };

  const nextImage = () => {
    const images = getAllImages();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getAllImages();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-primary-600 text-center">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-primary-800 mb-2">Error Loading Tour</h2>
            <p className="text-primary-600 mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <p className="text-primary-600">Tour not found</p>
        </div>
      </div>
    );
  }

  const images = getAllImages();
  const description = tourService.parseDescription(tour.description);
  const popularSites = parseJsonField(tour.popularSites);
  const highlights = parseJsonField(tour.highlights);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-primary-100">
        <div className="   mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tours
          </button>
          <h1 className="text-3xl font-bold text-primary-800">{tour.name}</h1>
          <div className="flex items-center mt-2 text-primary-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{tour.city ? `${tour.city}, ` : ''}{tour.country}</span>
            {!tour.isActive && (
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Inactive
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-w-16 aspect-h-12 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={images[selectedImageIndex] || '/api/placeholder/800/600'}
                  alt={tour.name}
                  className="w-full h-96 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setIsGalleryModalOpen(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex flex-wrap gap-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square max-h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImageIndex === index
                        ? 'ring-3 ring-primary-500 scale-105 opacity-100 brightness-50 '
                        : 'hover:scale-105 opacity-100 hover:brightness-50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${tour.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {images.length > 8 && (
                  <div 
                    onClick={() => setIsGalleryModalOpen(true)}
                    className="aspect-square rounded-lg bg-primary-100 flex items-center justify-center cursor-pointer hover:bg-primary-200 transition-colors"
                  >
                    <span className="text-primary-600 font-medium">+{images.length - 8}</span>
                  </div>
                )}
              </div>
            )}

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-100">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-primary-500 mr-3" />
                  <div>
                    <p className="text-sm text-primary-600">Estimated Budget</p>
                    <p className="text-lg font-semibold text-primary-800">
                      {tour.estimatedBudget ? formatCurrency(tour.estimatedBudget) : 'Contact for pricing'}
                    </p>
                  </div>
                </div>
              </div>
              
              {tour.areaKm2 && (
                <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-100">
                  <div className="flex items-center">
                    <Globe className="w-8 h-8 text-primary-500 mr-3" />
                    <div>
                      <p className="text-sm text-primary-600">Area</p>
                      <p className="text-lg font-semibold text-primary-800">
                        {tour.areaKm2.toLocaleString()} km²
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
              <h2 className="text-xl font-semibold text-primary-800 mb-4">About This Destination</h2>
              <div 
                className="text-primary-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description || 'No description available.' }}
              />
            </div>

            {/* Travel Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
              <h2 className="text-xl font-semibold text-primary-800 mb-4">Travel Information</h2>
              <div className="space-y-4">
                {tour.language && (
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-primary-500 mr-3" />
                    <div>
                      <span className="text-sm text-primary-600">Language: </span>
                      <span className="text-primary-800 font-medium">{tour.language}</span>
                    </div>
                  </div>
                )}
                
                {tour.currencyUsed && (
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-primary-500 mr-3" />
                    <div>
                      <span className="text-sm text-primary-600">Currency: </span>
                      <span className="text-primary-800 font-medium">{tour.currencyUsed}</span>
                    </div>
                  </div>
                )}
                
                {tour.visaRequirements && (
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h3 className="font-medium text-primary-800 mb-2">Visa Requirements</h3>
                    <p className="text-primary-700 text-sm">{tour.visaRequirements}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Popular Sites */}
            {popularSites && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
                <h2 className="text-xl font-semibold text-primary-800 mb-4">Popular Sites</h2>
                <div className="space-y-2">
                  {Array.isArray(popularSites) ? popularSites.map((site, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-3" />
                      <span className="text-primary-700">{site}</span>
                    </div>
                  )) : (
                    <p className="text-primary-700">{popularSites}</p>
                  )}
                </div>
              </div>
            )}

            {/* Highlights */}
            {highlights && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
                <h2 className="text-xl font-semibold text-primary-800 mb-4">Highlights</h2>
                <div className="space-y-2">
                  {Array.isArray(highlights) ? highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      <span className="text-primary-700">{highlight}</span>
                    </div>
                  )) : (
                    <p className="text-primary-700">{highlights}</p>
                  )}
                </div>
              </div>
            )}

            {/* Created Date */}
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary-500 mr-3" />
                <div>
                  <span className="text-sm text-primary-600">Added on: </span>
                  <span className="text-primary-800 font-medium">
                    {new Date(tour.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <img
              src={images[selectedImageIndex]}
              alt={tour.name}
              className="max-w-full max-h-full object-contain"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 text-white hover:text-gray-300"
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 text-white hover:text-gray-300"
                >
                  <ChevronRight className="w-12 h-12" />
                </button>
              </>
            )}
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourViewPage;