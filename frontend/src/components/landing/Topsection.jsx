import React, { useState } from "react";
import { ChevronDown, MapPin, Clock } from "lucide-react";

const TopSection = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 hidden lg:block">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 group">
              <div className="p-1.5 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                <MapPin className="w-3.5 h-3.5 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                Makuza Peace Piazza 3rd Floor F3-28, KN 4 Ave, Kigali
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 group">
                <div className="p-1.5 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                  <Clock className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  Monday - Sunday
                </span>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                24/7 Available
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <span className="text-sm font-medium text-gray-700">
                  Language
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="mr-2">🇺🇸</span> English
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="mr-2">🇷🇼</span> Kinyarwanda
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="mr-2">🇫🇷</span> French
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ & Support */}
            <div className="flex items-center space-x-4">
              <a
                href="#faq"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#support"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                Support
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
