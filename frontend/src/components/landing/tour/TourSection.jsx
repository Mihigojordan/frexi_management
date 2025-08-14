import React, { useState, useEffect, useRef } from 'react';
import TourCard from './TourCard';
import img1 from '../../../assets/image/tour/tour1.jpeg'
// Reusable Card Component


const TourSection = () => {
  const [currentSlide, setCurrentSlide] = useState(3); // Start at first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef(null);
  const autoSlideRef = useRef(null);

  const categories = [
    {
      id: 1,
      title: 'Airbirds',
      bgImage: img1
    },
    {
      id: 2,
      title: 'Wildlife',
      bgImage: img1
    },
    {
      id: 3,
      title: 'Walking',
       bgImage: img1
    },
    {
      id: 4,
      title: 'Cruises',
    bgImage: img1
    },
    {
      id: 5,
      title: 'Hiking',
      bgImage: img1
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
    <div className="relative bg-white py-20 px-4 overflow-hidden">
      {/* Background decorative elements with primary colors */}
      <div className="absolute inset-0 opacity-5">
        {/* Scattered light primary circles */}
        <div className="absolute top-16 left-20 w-16 h-16 rounded-full bg-primary-200"></div>
        <div className="absolute top-32 right-32 w-12 h-12 rounded-full bg-primary-300"></div>
        <div className="absolute top-24 left-1/3 w-8 h-8 rounded-full bg-primary-400"></div>
        <div className="absolute top-40 right-1/4 w-20 h-20 rounded-full bg-primary-200"></div>
        <div className="absolute bottom-32 left-16 w-14 h-14 rounded-full bg-primary-300"></div>
        <div className="absolute bottom-20 right-20 w-10 h-10 rounded-full bg-primary-400"></div>
        <div className="absolute bottom-40 left-1/2 w-18 h-18 rounded-full bg-primary-200"></div>
        
        {/* Additional scattered elements */}
        <div className="absolute top-60 left-40 w-6 h-6 rounded-full bg-primary-300"></div>
        <div className="absolute top-80 right-40 w-24 h-24 rounded-full bg-primary-100"></div>
        <div className="absolute bottom-60 left-1/4 w-16 h-16 rounded-full bg-primary-200"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with primary color accent */}
        <div className="text-center mb-16">
          <p className="text-primary-500 font-normal text-xl mb-3 font-serif italic">Wonderful Place For You</p>
          <h2 className="text-5xl font-bold text-primary-800 mb-4">Tour Categories</h2>
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
                <TourCard
                  key={`${category.id}-${index}`}
                  category={category}
                  isActive={((currentSlide - 3 + categories.length) % categories.length) === (index - 3)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator with primary colors */}
        <div className="flex justify-center mt-12 space-x-3">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                ((currentSlide - 3 + categories.length) % categories.length) === index 
                  ? 'bg-primary-800' 
                  : 'bg-gray-300 hover:bg-primary-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourSection;