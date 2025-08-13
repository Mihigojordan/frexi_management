import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, MessageCircle, Instagram, ArrowUp } from 'lucide-react';

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
  React.useEffect(() => {
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
                className="px-6 py-3 rounded-full border border-gray-300 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={handleSubscribe}
                className="bg-teal-800 text-white px-8 py-3 rounded-full hover:bg-teal-900 transition-colors font-medium whitespace-nowrap"
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
                  <Phone className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <a href="tel:+250782379122" className="text-gray-600 hover:text-teal-600 transition-colors">
                    +250 782 379 122
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <a href="mailto:Booking@frexi.rw" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Booking@frexi.rw
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
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
      <div className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-center sm:text-left">
              Copyright 2024 Frexi Ltd . All Rights Reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">We Accept</span>
              <div className="flex space-x-2 ml-2">
                {/* Payment method placeholders */}
                <div className="bg-white rounded px-2 py-1 text-xs text-gray-800 font-medium">VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-gray-800 font-medium">MC</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-gray-800 font-medium">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-teal-800 text-white p-3 rounded-full shadow-lg hover:bg-teal-900 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;