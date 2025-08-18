import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, ArrowRight, ChevronUp, MapPin, Clock, Star, Mountain, Menu, X } from 'lucide-react';
import logo from '../../assets/image/frexilogo.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Destination', href: '/destination' },
    { name: 'Service', href: '/service' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact Us', href: 'contact' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Info Bar - Hidden on mobile */}
      <div className="bg-gray-50 text-sm text-gray-600 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Makuza Peace Piazza 3rd Floor F3-28, KN 4 Ave, Kigali</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>from monday - sunday</span>
            </div>
            <span>24 / 7</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={toggleLanguage}
                className="hover:text-gray-800 flex items-center space-x-1"
              >
                <span>Language</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kinyarwanda</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">French</a>
                </div>
              )}
            </div>
            <a href="#faq" className="hover:text-gray-800">FAQ</a>
            <a href="#support" className="hover:text-gray-800">Support</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center h-16">
            <img src={logo} className='h-full' alt="" />
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors relative group"
                style={{color: link.name === 'Home' ? '#113d48' : ''}}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundColor: '#113d48'}}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Book Now Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors font-medium hidden sm:inline-block"
              style={{backgroundColor: '#113d48'}}
            >
              Book Now →
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 border-t border-gray-200">
            {/* Mobile Top Info */}
            <div className="lg:hidden pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Makuza Peace Piazza, Kigali</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Monday - Sunday, 24/7</span>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  style={{color: link.name === 'Home' ? '#113d48' : ''}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Book Now Button */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                to="/contact"
                className="block w-full text-center text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors font-medium"
                style={{backgroundColor: '#113d48'}}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now →
              </Link>
            </div>

            {/* Mobile Language & Support */}
            <div className="pt-4 flex justify-center space-x-6 text-sm text-gray-600">
              <button className="hover:text-gray-800">Language</button>
              <a href="#faq" className="hover:text-gray-800">FAQ</a>
              <a href="#support" className="hover:text-gray-800">Support</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar