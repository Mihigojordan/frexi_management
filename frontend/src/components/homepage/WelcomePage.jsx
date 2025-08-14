
import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, ArrowRight, ChevronUp, MapPin, Clock, Star, Mountain, Menu, X } from 'lucide-react';

const WelcomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchForm, setSearchForm] = useState({
    destination: 'Select Destination',
    type: 'Adventure',
    duration: 'Duration',
    category: 'Luxury'
  });

  const slides = [
    {
      id: 1,
      title: "Natural Wonder of the world",
      subtitle: "Get unforgettable pleasure with us",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    },
    {
      id: 2,
      title: "Majestic Mountain Peaks",
      subtitle: "Experience breathtaking alpine adventures",
      image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    },
    {
      id: 3,
      title: "Pristine Wilderness",
      subtitle: "Discover untouched landscapes and wildlife",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    },
    {
      id: 4,
      title: "Crystal Clear Lakes",
      subtitle: "Immerse yourself in nature's tranquility",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute right-16 top-1/2 transform -translate-y-12 z-20 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-16 top-1/2 transform translate-y-12 z-20 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8">
            <div className="max-w-2xl">
              <p className="text-white/90 text-lg mb-4 font-light tracking-wide">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                {slides[currentSlide].title}
              </h1>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  className="text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 hover:opacity-90"
                  style={{backgroundColor: '#113d48'}}
                >
                  <span>Explore Tours</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white/70 hover:border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm flex items-center space-x-2">
                  <span>Our Services</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form - Positioned at Very Bottom */}
        <div className="absolute -bottom-2 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 sm:px-8">
          <div className="bg-white/95 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-2xl">
            {/* Mobile Layout - Stack vertically */}
            <div className="block sm:hidden space-y-4">
              {/* Row 1: Destination & Type */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 border-r border-gray-200 pr-3">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs text-gray-600 block">Destination</label>
                    <select 
                      className="w-full text-sm text-gray-800 font-medium focus:outline-none bg-transparent truncate"
                      value={searchForm.destination}
                      onChange={(e) => setSearchForm({...searchForm, destination: e.target.value})}
                    >
                      <option>Select Destination</option>
                      <option>Swiss Alps</option>
                      <option>Rocky Mountains</option>
                      <option>Himalayas</option>
                      <option>Patagonia</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs text-gray-600 block">Type</label>
                    <select 
                      className="w-full text-sm text-gray-800 font-medium focus:outline-none bg-transparent"
                      value={searchForm.type}
                      onChange={(e) => setSearchForm({...searchForm, type: e.target.value})}
                    >
                      <option>Adventure</option>
                      <option>Relaxation</option>
                      <option>Cultural</option>
                      <option>Wildlife</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Duration & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 border-r border-gray-200 pr-3">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs text-gray-600 block">Duration</label>
                    <select 
                      className="w-full text-sm text-gray-800 font-medium focus:outline-none bg-transparent"
                      value={searchForm.duration}
                      onChange={(e) => setSearchForm({...searchForm, duration: e.target.value})}
                    >
                      <option>Duration</option>
                      <option>1-3 days</option>
                      <option>4-7 days</option>
                      <option>1-2 weeks</option>
                      <option>2+ weeks</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{background: 'linear-gradient(to right, #113d48, #1a5f6b)'}}></div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs text-gray-600 block">Category</label>
                    <select 
                      className="w-full text-sm text-gray-800 font-medium focus:outline-none bg-transparent"
                      value={searchForm.category}
                      onChange={(e) => setSearchForm({...searchForm, category: e.target.value})}
                    >
                      <option>Luxury</option>
                      <option>Budget</option>
                      <option>Premium</option>
                      <option>Standard</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button - Full width on mobile */}
              <button 
                className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:opacity-90"
                style={{backgroundColor: '#113d48'}}
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>

            {/* Desktop Layout - Original grid */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="text-sm text-gray-600 block">Destination</label>
                  <select 
                    className="w-full text-gray-800 font-medium focus:outline-none bg-transparent"
                    value={searchForm.destination}
                    onChange={(e) => setSearchForm({...searchForm, destination: e.target.value})}
                  >
                    <option>Select Destination</option>
                    <option>Swiss Alps</option>
                    <option>Rocky Mountains</option>
                    <option>Himalayas</option>
                    <option>Patagonia</option>
                  </select>
                </div>
                {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
              </div>

              {/* Type */}
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="text-sm text-gray-600 block">Type</label>
                  <select 
                    className="w-full text-gray-800 font-medium focus:outline-none bg-transparent"
                    value={searchForm.type}
                    onChange={(e) => setSearchForm({...searchForm, type: e.target.value})}
                  >
                    <option>Adventure</option>
                    <option>Relaxation</option>
                    <option>Cultural</option>
                    <option>Wildlife</option>
                  </select>
                </div>
                {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
              </div>

              {/* Duration */}
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="text-sm text-gray-600 block">Duration</label>
                  <select 
                    className="w-full text-gray-800 font-medium focus:outline-none bg-transparent"
                    value={searchForm.duration}
                    onChange={(e) => setSearchForm({...searchForm, duration: e.target.value})}
                  >
                    <option>Duration</option>
                    <option>1-3 days</option>
                    <option>4-7 days</option>
                    <option>1-2 weeks</option>
                    <option>2+ weeks</option>
                  </select>
                </div>
                {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
              </div>

              {/* Category & Search Button */}
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full" style={{background: 'linear-gradient(to right, #113d48, #1a5f6b)'}}></div>
                <div className="flex-1">
                  <label className="text-sm text-gray-600 block">Tour Category</label>
                  <select 
                    className="w-full text-gray-800 font-medium focus:outline-none bg-transparent"
                    value={searchForm.category}
                    onChange={(e) => setSearchForm({...searchForm, category: e.target.value})}
                  >
                    <option>Luxury</option>
                    <option>Budget</option>
                    <option>Premium</option>
                    <option>Standard</option>
                  </select>
                </div>
                <button 
                  className="text-white p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center hover:opacity-90"
                  style={{backgroundColor: '#113d48'}}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 sm:bottom-40 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      console.log('Subscribe with email:', email);
      setEmail('');
      // Here you would typically send the email to your backend
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Get Updated The Latest
              </h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-700">
                Newsletter
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="px-6 py-3 rounded-full border border-gray-300 w-full sm:w-80 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{focusRingColor: '#113d48'}}
              />
              <button
                onClick={handleSubscribe}
                className="text-white px-8 py-3 rounded-full hover:opacity-90 transition-colors font-medium whitespace-nowrap"
                style={{backgroundColor: '#113d48'}}
              >
                Subscribe Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="bg-black text-white px-3 py-2 font-bold text-lg">
                  FR
                  <div className="text-xs">FREXI</div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Rapidiously myocardinate cross-platform intellectual capital model. 
                Appropriately create interactive infrastructures
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#home" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                    → Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                    → About us
                  </a>
                </li>
                <li>
                  <a href="#service" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                    → Our Service
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                    → Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#book" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                    → Tour Booking Now
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Address</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{color: '#113d48'}} />
                  <a href="tel:+250782379122" className="text-gray-600 transition-colors" style={{'&:hover': {color: '#113d48'}}}>
                    +250 782 379 122
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{color: '#113d48'}} />
                  <a href="mailto:Booking@frexi.rw" className="text-gray-600 transition-colors" style={{'&:hover': {color: '#113d48'}}}>
                    Booking@frexi.rw
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{color: '#113d48'}} />
                  <div className="text-gray-600">
                    <p>Makuza Peace Plaza 3rd</p>
                    <p>Floor F3-28, KN 4 Ave,</p>
                    <p>Kigali</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Post */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Instagram Post</h3>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <a
                    key={i}
                    href="#"
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-80 cursor-pointer transition-opacity group"
                  >
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gradient-to-br from-gray-100 to-gray-300 group-hover:from-teal-50 group-hover:to-teal-100">
                      <Instagram className="w-6 h-6" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="text-white py-6" style={{backgroundColor: '#113d48'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-center sm:text-left">
              Copyright 2024 Frexi Ltd . All Rights Reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-white/80">We Accept</span>
              <div className="flex space-x-2 ml-2">
                {/* Payment method placeholders */}
                <div className="bg-white rounded px-2 py-1 text-xs font-medium" style={{color: '#113d48'}}>VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-medium" style={{color: '#113d48'}}>MC</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-medium" style={{color: '#113d48'}}>AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 z-50"
          style={{backgroundColor: '#113d48'}}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default WelcomePage