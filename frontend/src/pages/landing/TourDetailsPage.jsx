import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  MapPin, 
  Globe, 
  DollarSign, 
  Calendar, 
  Users, 
  Star, 
  ArrowLeft,
  Camera,
  Info,
  Banknote,
  Languages,
  FileText,
  Eye,
  Loader2,
  Heart,
  Share2,
  ChevronRight,
  Clock,
  ChevronLeft
} from 'lucide-react';
import tourService from '../../services/toursServices';

const TourDetailsPage = () => {
  const {id:tourId} = useParams();
  const [tour, setTour] = useState(null);
  const [otherTours, setOtherTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const navigateToTours = () => {
    navigate('/tours');
  };

  const navigateToTour = (tourId) => {
    setLoading(true);
    setActiveImageIndex(0);
    navigate(`/tours/${tourId}`);
  };

  useEffect(() => {
    fetchTourDetails();
    fetchOtherTours();
  }, [tourId]);

  const handleBookNow =(book)=>{
    if(!tourId) return Swal.fire({
      icon: "error",
        title: "Invalid Tour",
        text: "The selected tour is invalid. Please try again.",
        confirmButtonColor: "#113d48"
    });
    if(!book) return Swal.fire({
        icon: "error",
        title: "Booking Error",
        text: "Please select a valid booking option.",
        confirmButtonColor: "#113d48"
    });
    // Navigate to booking page with tourId and book option

    navigate('/auth/user?mode=register&tourId='+tourId, { state: { bookNow: book } });
    

  }

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      const tourData = await tourService.getTourById(tourId);
      setTour(tourData);
    } catch (err) {
      setError(err.message || 'Failed to fetch tour details');
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherTours = async () => {
    try {
      const allTours = await tourService.getActiveTours();
      const filtered = allTours.filter(t => t.id !== tourId);
      const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 6);
      setOtherTours(shuffled);
    } catch (err) {
      console.error('Failed to fetch other tours:', err);
    }
  };

  const formatBudget = (budget) => {
    if (!budget) return 'Budget not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(budget);
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

  const renderDescription = () => {
    if (!tour?.description) return <p className="text-gray-600 leading-relaxed">No description available</p>;
    const description = tourService.parseDescription(tour.description);
    if (typeof description === 'string') {
      return <div className='text-black' dangerouslySetInnerHTML={{ __html: description }} />;
    }
    return <p className="text-gray-600 leading-relaxed">{description}</p>;
  };

  const getAllImages = () => {
    const images = [];
    if (tour?.mainPhotoUrl) {
      images.push(tourService.getFullImageUrl(tour.mainPhotoUrl));
    }
    
    const gallery = parseJsonField(tour?.gallery);
    if (gallery && Array.isArray(gallery)) {
      gallery.forEach(img => {
        images.push(tourService.getFullImageUrl(img));
      });
    }
    
    return images.filter(img => img);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide effect for Hero Image Section
  const allImages = getAllImages();
  useEffect(() => {
    if (allImages.length <= 1 || showFullGallery) return; // Don't auto-slide if there's only one image or gallery is open

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount or when dependencies change
  }, [allImages, showFullGallery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Error Loading Tour</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => navigateToTours()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Tours
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-xl">Tour not found</p>
          <button
            onClick={() => navigateToTours()}
            className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  const popularSites = parseJsonField(tour.popularSites);
  const highlights = parseJsonField(tour.highlights);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
        <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 sm:p-6 lg:p-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Image Section */}
            <div className="relative mb-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {allImages.length > 0 ? (
                  <div className="relative h-[50vh]">
                    <img
                      src={allImages[activeImageIndex]}
                      alt={tour.name}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    
                    {/* Image overlay with tour info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Tour title and location overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">{tour.name}</h1>
                        <div className="flex items-center text-lg mb-4">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{tour.city ? `${tour.city}, ` : ''}{tour.country}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">
                            {formatBudget(tour.estimatedBudget)}
                          </div>
                          {allImages.length > 1 && (
                            <button
                              onClick={() => setShowFullGallery(true)}
                              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-white/30 transition-all"
                            >
                              <Camera className="h-4 w-4" />
                              <span>+{allImages.length - 1} more</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Image navigation dots */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === activeImageIndex 
                                ? 'bg-white w-8' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg">No images available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {tour.language && (
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4 text-center">
                  <Languages className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Language</p>
                  <p className="font-semibold text-gray-900">{tour.language}</p>
                </div>
              )}
              
              {tour.currencyUsed && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center">
                  <Banknote className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Currency</p>
                  <p className="font-semibold text-gray-900">{tour.currencyUsed}</p>
                </div>
              )}
              
              {tour.areaKm2 && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center">
                  <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Area</p>
                  <p className="font-semibold text-gray-900">{tour.areaKm2.toLocaleString()} km²</p>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 text-center">
                <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">Added</p>
                <p className="font-semibold text-gray-900">
                  {new Date(tour.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <Info className="h-6 w-6 mr-3 text-primary-600" />
                About This Destination
              </h2>
              <div className="prose prose-lg max-w-none">
                {renderDescription()}
              </div>
            </div>

            {/* Popular Sites and Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {popularSites && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Popular Sites & Attractions</h3>
                  <div className="space-y-3">
                    {(Array.isArray(popularSites) ? popularSites : [popularSites]).map((item, index) => (
                      <div key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {highlights && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Tour Highlights</h3>
                  <div className="space-y-3">
                    {(Array.isArray(highlights) ? highlights : [highlights]).map((item, index) => (
                      <div key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Visa Requirements */}
              {tour.visaRequirements && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-red-600" />
                    Visa Requirements
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{tour.visaRequirements}</p>
                </div>
              )}

              {/* Book Now */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Ready to Book?</h3>
                <p className="mb-4 text-primary-100 text-sm">Start planning your adventure to {tour.name}!</p>
                <button className="w-full bg-white text-primary-600 font-semibold py-3 px-6 rounded-xl hover:bg-primary-50 transition-colors" onClick={() => handleBookNow(tour)}>
                  Contact Travel Agent
                </button>
              </div>

              {/* Other Tours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Other Tours</h3>
                  <button
                    onClick={navigateToTours}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                  >
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {otherTours.map((otherTour) => (
                    <div
                      key={otherTour.id}
                      onClick={() => navigateToTour(otherTour.id)}
                      className="cursor-pointer group"
                    >
                      <div className="flex space-x-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          {otherTour.mainPhotoUrl ? (
                            <img
                              src={tourService.getFullImageUrl(otherTour.mainPhotoUrl)}
                              alt={otherTour.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <Camera className="h-6 w-6 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-primary-600 transition-colors">
                            {otherTour.name}
                          </h4>
                          <div className="flex items-center text-gray-500 text-xs mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">
                              {otherTour.city ? `${otherTour.city}, ` : ''}{otherTour.country}
                            </span>
                          </div>
                          <div className="text-primary-600 font-semibold text-sm mt-1">
                            {formatBudget(otherTour.estimatedBudget)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Gallery Slider */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-11/12 max-h-full p-4">
            <button
              onClick={() => setShowFullGallery(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70"
            >
              ×
            </button>

            <div className="relative w-full h-[80vh] flex items-center justify-center">
              {/* Previous Button */}
              {allImages.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
              )}

              {/* Slider Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={allImages[activeImageIndex]}
                  alt={`Gallery ${activeImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-xl transition-all duration-300"
                  onClick={() => {
                    setShowFullGallery(false);
                  }}
                />
                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Next Button */}
              {allImages.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetailsPage;