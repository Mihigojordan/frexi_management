import { useState, useEffect } from 'react';
import { MapPin, Star, Users, ArrowRight, Play, Pause } from 'lucide-react';

const DestinationCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(2); // Start with Nairobi (middle item)
  const [isPaused, setIsPaused] = useState(false);

  const destinations = [
    {
      id: 1,
      name: "Nyungwe",
      listings: "25 Listings",
      country: "Rwanda",
      rating: 4.9,
      visitors: "2.3K",
      price: "$899",
      description: "Ancient rainforest with rare primates",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
      gradient: "from-emerald-600 via-green-600 to-teal-700",
      showButton: false
    },
    {
      id: 2,
      name: "Volcano Park",
      listings: "15 Listings",
      country: "Rwanda",
      rating: 4.8,
      visitors: "1.8K",
      price: "$1,299",
      description: "Home to majestic mountain gorillas",
      image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80",
      gradient: "from-orange-600 via-red-600 to-rose-700",
      showButton: false
    },
    {
      id: 3,
      name: "Nairobi",
      listings: "28 Listings",
      country: "Kenya",
      rating: 4.7,
      visitors: "5.2K",
      price: "$799",
      description: "Gateway to African safari adventures",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80",
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      showButton: true
    },
    {
      id: 4,
      name: "Mombasa",
      listings: "20 Listings",
      country: "Kenya",
      rating: 4.6,
      visitors: "3.1K",
      price: "$699",
      description: "Pristine beaches and Swahili culture",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      gradient: "from-cyan-600 via-blue-600 to-indigo-700",
      showButton: false
    },
    {
      id: 5,
      name: "Dubai",
      listings: "30 Listings",
      country: "UAE",
      rating: 4.9,
      visitors: "8.7K",
      price: "$1,599",
      description: "Modern luxury meets desert mystique",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600",
      gradient: "from-amber-600 via-orange-600 to-red-700",
      showButton: false
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % destinations.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [destinations.length, isPaused]);

  const getSlidePosition = (index) => {
    let position = index - currentSlide;
    
    // Handle wrapping for infinite loop
    if (position > destinations.length / 2) {
      position -= destinations.length;
    } else if (position < -destinations.length / 2) {
      position += destinations.length;
    }
    
    return position;
  };

  const getSlideStyles = (position) => {
    const isActive = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isFarther = Math.abs(position) === 2;
    
    if (isActive) {
      return {
        transform: `translateX(${position * 200}px) scale(1.15)`,
        zIndex: 10,
        filter: 'none',
        opacity: 1,
        width: '480px',  // 8mx larger
        height: '85%'
      };
    } else if (isAdjacent) {
      return {
        transform: `translateX(${position * 280}px) scale(0.9)`,
        zIndex: 5,
        filter: 'blur(2px) brightness(0.8)',
        opacity: 0.9,
        width: '380px',  // 8mx larger
        height: '420px'
      };
    } else if (isFarther) {
      return {
        transform: `translateX(${position * 220}px) scale(0.7)`,
        zIndex: 2,
        filter: 'blur(4px) brightness(0.6)',
        opacity: 0.7,
        width: '320px',  // 8mx larger
        height: '360px'
      };
    } else {
      return {
        transform: `translateX(${position * 200}px) scale(0.5)`,
        zIndex: 1,
        filter: 'blur(3px) brightness(0.4)',
        opacity: 0.3,
        width: '280px',  // 8mx larger
        height: '300px'
      };
    }
  };

  const currentDestination = destinations[currentSlide];

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-center py-24 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-orange-400/15 to-red-400/15 rounded-full blur-2xl"></div>
      
      {/* Header Section */}
      <div className="relative z-10 mb-20">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-24 mr-4"></div>
          <h4 className="text-emerald-600 text-xl font-medium tracking-wider uppercase">
            Discover Places
          </h4>
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-24 ml-4"></div>
        </div>
        
        <h2 className="text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4">
          World's Top Destinations
        </h2>
        
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Embark on extraordinary journeys to the most breathtaking locations on Earth
        </p>
      </div>

      {/* Stats Bar for Active Destination */}
      <div className="relative z-10 mb-12">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="text-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${currentDestination.gradient} text-white font-semibold text-sm mb-2`}>
                <MapPin className="w-4 h-4 mr-2" />
                {currentDestination.country}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentDestination.name}</h3>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400 mr-1" />
                <span className="text-xl font-bold text-gray-900">{currentDestination.rating}</span>
              </div>
              <p className="text-gray-600 text-sm">Rating</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-xl font-bold text-gray-900">{currentDestination.visitors}</span>
              </div>
              <p className="text-gray-600 text-sm">Travelers</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{currentDestination.price}</div>
              <p className="text-gray-600 text-sm">Starting from</p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative flex justify-center items-center h-[700px] overflow-hidden px-8 mb-16">
        {destinations.map((destination, index) => {
          const position = getSlidePosition(index);
          const styles = getSlideStyles(position);
          const isActive = position === 0;
          
          return (
            <div
              key={destination.id}
              className="absolute transition-all duration-1000 ease-out rounded-3xl overflow-hidden cursor-pointer"
              style={{
                ...styles,
                boxShadow: isActive 
                  ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)` 
                  : `0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
              }}
              onClick={() => setCurrentSlide(index)}
            >
              {/* Image with advanced overlay gradients */}
              <div className="relative w-full h-full group">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`}
                />
                
                {/* Multi-layered gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} opacity-20 mix-blend-multiply`} />
                
                {/* Shine effect on active card */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </div>
              
              {/* Card Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                {/* Top badges */}
                <div className="flex justify-between items-start">
                  <div className={`px-4 py-2 bg-gradient-to-r ${destination.gradient} rounded-full text-white text-sm font-semibold backdrop-blur-sm`}>
                    {destination.listings}
                  </div>
                  
                  {isActive && (
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  )}
                </div>
                
                {/* Bottom content */}
                <div className="text-white text-left">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2 drop-shadow-2xl">{destination.name}</h3>
                    <p className="text-lg opacity-90 drop-shadow-lg mb-2">{destination.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                        <span>{destination.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{destination.visitors} travelers</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action button - enhanced for active slide */}
                  {isActive && (
                    <button className="group/btn bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/40 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:from-white/30 hover:to-white/20 hover:scale-105 hover:shadow-2xl flex items-center">
                      <span className="mr-3">Explore Destination</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Navigation */}
      <div className="relative z-10 flex items-center justify-center space-x-8">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-3 bg-white/80 backdrop-blur-lg rounded-full border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isPaused ? 
            <Play className="w-5 h-5 text-gray-700 ml-0.5" /> : 
            <Pause className="w-5 h-5 text-gray-700" />
          }
        </button>

        {/* Navigation Dots */}
        <div className="flex space-x-4">
          {destinations.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-500 rounded-full relative overflow-hidden ${
                index === currentSlide 
                  ? 'w-12 h-4' 
                  : 'w-4 h-4 hover:w-6'
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <div className={`w-full h-full rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? `bg-gradient-to-r ${destinations[index].gradient}` 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}>
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full animate-pulse"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="text-sm text-gray-600 font-medium">
          {String(currentSlide + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default DestinationCarousel;