import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TourSection = () => {
  const [currentSlide, setCurrentSlide] = useState(3); // Start at first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef(null);
  const autoSlideRef = useRef(null);

  const categories = [
    {
      id: 1,
      title: 'Airbirds',
      bgImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%2387CEEB"/><path d="M50 150 Q200 100 350 150 Q200 200 50 150" fill="%2300BFFF" opacity="0.7"/><circle cx="100" cy="80" r="40" fill="white" opacity="0.6"/><path d="M80 70 Q100 65 120 70 Q100 75 80 70" fill="%23FFD700"/></svg>'
    },
    {
      id: 2,
      title: 'Wildlife',
      bgImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%2320B2AA"/><circle cx="150" cy="100" r="60" fill="%23FF6347" opacity="0.7"/><circle cx="250" cy="180" r="40" fill="%23FFD700" opacity="0.8"/><path d="M50 250 Q200 200 350 250 L350 300 L50 300 Z" fill="%2332CD32" opacity="0.6"/></svg>'
    },
    {
      id: 3,
      title: 'Walking',
      bgImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23D3D3D3"/><path d="M0 250 Q100 200 200 220 Q300 240 400 200 L400 300 L0 300 Z" fill="%23A9A9A9"/><circle cx="200" cy="100" r="15" fill="%23000" opacity="0.6"/><rect x="195" y="115" width="10" height="40" fill="%23000" opacity="0.6" rx="5"/><rect x="190" y="155" width="8" height="20" fill="%23000" opacity="0.6" rx="4"/><rect x="202" y="155" width="8" height="20" fill="%23000" opacity="0.6" rx="4"/></svg>'
    },
    {
      id: 4,
      title: 'Cruises',
      bgImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%2340E0D0"/><path d="M0 200 Q200 180 400 200 L400 300 L0 300 Z" fill="%2300CED1" opacity="0.8"/><rect x="150" y="120" width="100" height="60" fill="white" opacity="0.9" rx="5"/><rect x="160" y="100" width="80" height="20" fill="%23FF6347" opacity="0.7" rx="3"/></svg>'
    },
    {
      id: 5,
      title: 'Hiking',
      bgImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%2332CD32"/><path d="M0 180 Q100 140 200 160 Q300 120 400 140 L400 300 L0 300 Z" fill="%23228B22" opacity="0.8"/><circle cx="80" cy="60" r="25" fill="%238B4513" opacity="0.7"/><rect x="75" y="85" width="10" height="30" fill="%238B4513" opacity="0.7" rx="5"/><path d="M50 115 L80 105 L110 115" stroke="%23654321" stroke-width="3" fill="none" opacity="0.6"/></svg>'
    }
  ];

  // Create infinite loop by duplicating slides
  const infiniteCategories = [
    ...categories.slice(-3), // Last 3 items at the beginning
    ...categories,
    ...categories.slice(0, 3) // First 3 items at the end
  ];

  const resetAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (!isTransitioning) return;
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentSlide(prev => prev - 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index + 3); // Offset by 3 for the duplicated slides
    resetAutoSlide();
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      
      if (currentSlide >= categories.length + 3) {
        // Reset to beginning
        setCurrentSlide(3);
        slideRef.current.style.transition = 'none';
        slideRef.current.style.transform = `translateX(-${3 * (100 / 3)}%)`;
      } else if (currentSlide <= 2) {
        // Reset to end
        setCurrentSlide(categories.length + 2);
        slideRef.current.style.transition = 'none';
        slideRef.current.style.transform = `translateX(-${(categories.length + 2) * (100 / 3)}%)`;
      }
      
      setTimeout(() => {
        setIsTransitioning(true);
        if (slideRef.current) {
          slideRef.current.style.transition = 'transform 0.5s ease-in-out';
        }
      }, 50);
    };

    const slideElement = slideRef.current;
    if (slideElement) {
      slideElement.addEventListener('transitionend', handleTransitionEnd);
      return () => slideElement.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [currentSlide, categories.length]);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-blue-25 to-cyan-50 py-20 px-4 overflow-hidden">
      {/* Background decorative elements matching the original */}
      <div className="absolute inset-0 opacity-5">
        {/* Scattered light blue circles */}
        <div className="absolute top-16 left-20 w-16 h-16 rounded-full bg-blue-200"></div>
        <div className="absolute top-32 right-32 w-12 h-12 rounded-full bg-cyan-200"></div>
        <div className="absolute top-24 left-1/3 w-8 h-8 rounded-full bg-blue-300"></div>
        <div className="absolute top-40 right-1/4 w-20 h-20 rounded-full bg-teal-200"></div>
        <div className="absolute bottom-32 left-16 w-14 h-14 rounded-full bg-blue-200"></div>
        <div className="absolute bottom-20 right-20 w-10 h-10 rounded-full bg-cyan-300"></div>
        <div className="absolute bottom-40 left-1/2 w-18 h-18 rounded-full bg-blue-200"></div>
        
        {/* Additional scattered elements */}
        <div className="absolute top-60 left-40 w-6 h-6 rounded-full bg-teal-300"></div>
        <div className="absolute top-80 right-40 w-24 h-24 rounded-full bg-blue-100"></div>
        <div className="absolute bottom-60 left-1/4 w-16 h-16 rounded-full bg-cyan-200"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header exactly matching the original */}
        <div className="text-center mb-16">
          <p className="text-teal-600 font-normal text-xl mb-3 font-serif italic">Wonderful Place For You</p>
          <h2 className="text-5xl font-bold text-slate-800 mb-4">Tour Categories</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Cards Container */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => autoSlideRef.current && clearInterval(autoSlideRef.current)}
            onMouseLeave={resetAutoSlide}
          >
            <div 
              ref={slideRef}
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
            >
              {infiniteCategories.map((category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="w-1/3 flex-shrink-0 px-4"
                >
                  <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden rounded-3xl">
                      {/* Background image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url("${category.bgImage}")` }}
                      ></div>
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Content positioned at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-bold mb-3 text-white">
                        {category.title}
                      </h3>
                      <button className="text-sm text-gray-200 hover:text-white transition-colors duration-300 font-normal">
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator exactly matching original */}
        <div className="flex justify-center mt-12 space-x-3">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                ((currentSlide - 3 + categories.length) % categories.length) === index 
                  ? 'bg-slate-800' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourSection;