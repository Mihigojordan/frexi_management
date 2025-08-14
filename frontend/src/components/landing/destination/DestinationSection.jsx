import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

const TravelDestinations = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideSets = [
    [
      {
        id: 1,
        name: "Dubai",
        listings: "15 Listing",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        isMain: true
      },
      {
        id: 2,
        name: "Istanbul", 
        listings: "22 Listing",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        isMain: true
      },
      {
        id: 3,
        name: "Paris",
        listings: "18 Listing", 
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
        isMain: false
      },
      {
        id: 4,
        name: "Tokyo",
        listings: "12 Listing",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2094&q=80",
        isMain: false
      }
    ],
    [
      {
        id: 5,
        name: "London",
        listings: "28 Listing",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        isMain: false
      },
      {
        id: 6,
        name: "New York", 
        listings: "35 Listing",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        isMain: true
      },
      {
        id: 7,
        name: "Barcelona",
        listings: "24 Listing", 
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        isMain: false
      },
      {
        id: 8,
        name: "Sydney",
        listings: "19 Listing",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        isMain: false
      }
    ],
    [
      {
        id: 9,
        name: "Rome",
        listings: "31 Listing",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2096&q=80",
        isMain: false
      },
      {
        id: 10,
        name: "Santorini", 
        listings: "16 Listing",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2119&q=80",
        isMain: true
      },
      {
        id: 11,
        name: "Bali",
        listings: "27 Listing", 
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        isMain: false
      },
      {
        id: 12,
        name: "Singapore",
        listings: "20 Listing",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80",
        isMain: false
      }
    ]
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideSets.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slideSets.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideSets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideSets.length) % slideSets.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentDestinations = slideSets[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-500 mb-2">
            <span className="text-3xl font-light text-cyan-600">Top Destination</span>
          </h1>
          <h2 className="text-5xl font-bold text-primary-500">Popular Destination</h2>
        </div>

        {/* Slideshow Navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button 
            onClick={prevSlide}
            className="bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={20} className="text-primary-500" />
          </button>
          
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slideSets.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary-500 scale-125' 
                    : 'bg-primary-200 hover:bg-primary-300'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={20} className="text-primary-500" />
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="flex items-center justify-center gap-8 transition-all duration-700 ease-in-out">
          {currentDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 ${
                destination.isMain 
                  ? 'w-80 h-96 z-10 shadow-2xl' 
                  : 'w-64 h-80 opacity-75 hover:opacity-100'
              } ${index === 0 ? 'blur-sm hover:blur-none' : ''} ${index === 3 ? 'blur-sm hover:blur-none' : ''}`}
              style={{
                backgroundImage: `url(${destination.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                <p className="text-sm opacity-80">{destination.listings}</p>
              </div>

              {/* View All Button - Only on main card */}
              {destination.isMain && (
                <div className="absolute bottom-6 right-6">
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                    View All
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Arrow */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 hover:scale-110">
            <ArrowUp size={24} className="text-primary-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelDestinations;