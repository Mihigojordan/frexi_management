import { useState, useEffect } from 'react';

const DestinationCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(2); // Start with Nairobi (middle item)

  const destinations = [
    {
      id: 1,
      name: "Nyungwe",
      listings: "25 Listing",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
      showButton: false
    },
    {
      id: 2,
      name: "Volcano Park",
      listings: "15 Listing",
      image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80",
      showButton: false
    },
    {
      id: 3,
      name: "Nairobi",
      listings: "28 Listing",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80",
      showButton: true
    },
    {
      id: 4,
      name: "Mombasa",
      listings: "20 Listing",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      showButton: false
    },
    {
      id: 5,
      name: "Dubai",
      listings: "30 Listing",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600",
      showButton: false
    },
    
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [destinations.length]);

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
        transform: `translateX(${position * 160}px) scale(1.1)`,
        zIndex: 10,
        filter: 'none',
        opacity: 1,
        width: '360px',
        height: '90%'
      };
    } else if (isAdjacent) {
      return {
        transform: `translateX(${position * 200}px) scale(0.85)`,
        zIndex: 5,
        filter: 'blur(3px) brightness(0.7)',
        opacity: 1,
        width: '280px',
        height: '360px'
      };
    } else if (isFarther) {
      return {
        transform: `translateX(${position * 160}px) scale(0.65)`,
        zIndex: 2,
        filter: 'blur(5px) brightness(0.5)',
        opacity: 1,
        width: '240px',
        height: '300px'
      };
    } else {
      return {
        transform: `translateX(${position * 160}px) scale(0.4)`,
        zIndex: 1,
        filter: 'blur(3px) brightness(0.3)',
        opacity: 0.2,
        width: '200px',
        height: '240px'
      };
    }
  };

  return (
    <div className="w-full bg-white text-center py-16">
      {/* Header */}
      <h4 className="text-[#0b4a5a] text-xl mb-3" style={{ fontFamily: 'cursive', fontWeight: 'normal' }}>
        Top Destination
      </h4>
      <h2 className="text-[#425a60] text-4xl font-bold mb-16">
        Popular Destination
      </h2>

      {/* Carousel Container */}
      <div className="relative flex justify-center items-center h-[600px] overflow-hidden px-4">
        {destinations.map((destination, index) => {
          const position = getSlidePosition(index);
          const styles = getSlideStyles(position);
          const isActive = position === 0;
          
          return (
            <div
              key={destination.id}
              className="absolute transition-all duration-700 ease-out rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
              style={styles}
              onClick={() => setCurrentSlide(index)}
            >
              {/* Image with overlay gradient */}
              <div className="relative w-full h-full">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Card Info */}
              <div className="absolute bottom-6 left-6 text-white text-left">
                <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{destination.name}</h3>
                <p className="text-sm opacity-90 drop-shadow-md">{destination.listings}</p>
              </div>

              {/* View Button - only show on active slide */}
              {isActive && (
                <div className="absolute bottom-6 right-6">
                  <button className="bg-white/20 backdrop-blur-sm border border-white/40 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-lg">
                    View All →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-12 space-x-3">
        {destinations.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-3 bg-[#0b4a5a]' 
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationCarousel;