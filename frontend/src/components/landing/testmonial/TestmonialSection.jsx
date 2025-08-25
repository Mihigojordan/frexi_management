import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const TestimonialsSection = ({ autoAdvance = true, interval = 6000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    { 
      name: 'Jacques Nyilinkindi', 
      role: 'Tour Guide',
      location: 'Kigali, Rwanda',
      rating: 5, 
      text: 'Timely response and Good service. The team exceeded my expectations with their professionalism and attention to detail.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-emerald-500 to-teal-600'
    },
    { 
      name: 'Gabriel Sheja', 
      role: 'Adventure Traveller',
      location: 'Dar es Salaam, Tanzania', 
      rating: 5, 
      text: 'Mon expérience avec Frexi a été plus que formidable. Le service bien servi avec le sourire, chaleureusement accueilli j\'ai été. Je recommande à tous.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-blue-500 to-indigo-600'
    },
    { 
      name: 'Emad Alami', 
      role: 'Business Traveller',
      location: 'Dubai, UAE',
      rating: 5, 
      text: 'Professional, trustworthy with great customer care. Their attention to detail and personalized service made my trip unforgettable.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      name: 'Sarah Thompson', 
      role: 'Family Traveller',
      location: 'London, UK',
      rating: 5, 
      text: 'Amazing family vacation experience! Every detail was perfectly planned and executed. Our kids had the time of their lives.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b167?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-rose-500 to-orange-600'
    },
    { 
      name: 'Michael Chen', 
      role: 'Solo Adventurer',
      location: 'Singapore',
      rating: 5, 
      text: 'Outstanding service for solo travelers. They made me feel safe and ensured I had authentic local experiences throughout my journey.',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-cyan-500 to-blue-600'
    },
    { 
      name: 'Maria Rodriguez', 
      role: 'Honeymoon Traveller',
      location: 'Barcelona, Spain',
      rating: 5, 
      text: 'Perfect honeymoon experience! Romantic destinations, luxury accommodations, and impeccable service made our trip absolutely magical.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  // Responsive cards per view
  const [cardsPerView, setCardsPerView] = useState(3);
  
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) { // Mobile
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) { // Tablet
        setCardsPerView(2);
      } else { // Desktop
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxSlide = Math.max(0, testimonials.length - cardsPerView);

  // Auto-advance slideshow
  useEffect(() => {
    if (!autoAdvance || !isPaused === false || testimonials.length <= cardsPerView) return;
    
    const testimonialInterval = setInterval(() => {
      setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    }, interval);
    
    return () => clearInterval(testimonialInterval);
  }, [autoAdvance, isPaused, interval, testimonials.length, maxSlide, cardsPerView]);

  const nextSlide = () => {
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlide));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 transition-colors duration-300 ${
          index < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-orange-400/8 to-red-400/8 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-16 sm:w-24 mr-4"></div>
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-16 sm:w-24 ml-4"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light tracking-wide px-4">
            Real stories from real travelers
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 space-x-4 sm:space-x-6">
          {/* Navigation Buttons - Hide on mobile when single card */}
          <button
            onClick={prevSlide}
            className={`p-2 sm:p-3 bg-white/80 backdrop-blur-lg rounded-full border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group ${
              testimonials.length <= cardsPerView ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={testimonials.length <= cardsPerView}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-3 sm:p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-white"
          >
            {isPaused ? 
              <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" /> : 
              <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
            }
          </button>

          <button
            onClick={nextSlide}
            className={`p-2 sm:p-3 bg-white/80 backdrop-blur-lg rounded-full border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group ${
              testimonials.length <= cardsPerView ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={testimonials.length <= cardsPerView}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 px-2 sm:px-4 ${
                    cardsPerView === 1 ? 'w-full' : 
                    cardsPerView === 2 ? 'w-1/2' : 
                    'w-1/3'
                  }`}
                  style={{ minWidth: `${100/cardsPerView}%` }}
                >
                  <div className="group bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-4 sm:p-8 border border-white/50 hover:-translate-y-2 relative overflow-hidden">
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-3 right-3 sm:top-6 sm:right-6">
                      <Quote className={`w-8 h-8 sm:w-12 sm:h-12 text-gray-200 group-hover:bg-gradient-to-r group-hover:${testimonial.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500`} />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* User Info */}
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur`}></div>
                        </div>
                        
                        <div className="ml-3 sm:ml-4 flex-grow">
                          <h3 className="font-bold text-base sm:text-lg text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm font-medium">{testimonial.role}</p>
                          <p className="text-gray-500 text-xs hidden sm:block">{testimonial.location}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="flex space-x-1 mr-2 sm:mr-3">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">
                          {testimonial.rating}.0
                        </span>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-gray-700 leading-relaxed text-sm sm:text-base italic line-clamp-4 sm:line-clamp-none">
                        "{testimonial.text}"
                      </blockquote>
                      
                      {/* Decorative elements */}
                      <div className="flex justify-center mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex -space-x-2">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r ${testimonial.gradient} rounded-full border-2 border-white shadow-lg`}></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        {testimonials.length > cardsPerView && (
          <div className="flex justify-center space-x-3 mt-12">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full relative overflow-hidden ${
                  index === currentSlide 
                    ? 'w-12 h-4' 
                    : 'w-4 h-4 hover:w-6'
                }`}
              >
                <div className={`w-full h-full rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}>
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

     
      </div>
    </section>
  );
};

export default TestimonialsSection;