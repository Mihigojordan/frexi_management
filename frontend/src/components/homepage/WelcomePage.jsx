import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, ChevronUp, MapPin, Play } from 'lucide-react';

const TravelLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Discover the World's Hidden Gems",
      subtitle: "Embark on extraordinary journeys to breathtaking destinations that will create memories to last a lifetime",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      location: "Swiss Alps, Switzerland"
    },
    {
      id: 2,
      title: "Majestic Alpine Adventures Await",
      subtitle: "Experience the raw beauty of towering peaks, pristine valleys, and crystal-clear mountain lakes",
      image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1387?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      location: "Rocky Mountains, Canada"
    },
    {
      id: 3,
      title: "Untouched Wilderness Beckons",
      subtitle: "Immerse yourself in nature's sanctuary where wildlife roams free and landscapes remain pristine",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      location: "Patagonia, Argentina"
    },
    {
      id: 4,
      title: "Serenity in Nature's Embrace",
      subtitle: "Find peace in tranquil lakes that mirror the sky, surrounded by ancient forests and towering mountains",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      location: "Banff National Park, Canada"
    }
  ];

  // Auto-advance slideshow with smooth transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative h-[550px] overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 ">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-[#113d48]/50 to-[#0a2a33]/70"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Side Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute right-8 top-1/2 transform -translate-y-16 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group border-red-300 border "
      >
        <ChevronUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform translate-y-16 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center -mt-14">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Location Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white/90 mb-6 border border-white/20">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{slides[currentSlide].location}</span>
              </div>

              <h1 className={`text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {slides[currentSlide].title}
              </h1>
              
              <p className={`text-white/90 text-lg md:text-xl mb-12 font-light leading-relaxed max-w-3xl mx-auto transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {slides[currentSlide].subtitle}
              </p>
              
              {/* Action Buttons */}
              <div className="flex  flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button className="group bg-[#113d48] hover:bg-[#0a2a33] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group border-2 border-white/70 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm flex items-center space-x-3">
                  <Play className="w-5 h-5" />
                  <span>Watch Our Story</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-white' 
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelLandingPage;
