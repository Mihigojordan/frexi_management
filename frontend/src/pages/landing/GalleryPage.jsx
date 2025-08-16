import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import HeaderBanner from '../../components/landing/HeaderBanner';

const YachtGallery = () => {

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Luxury yacht in crystal clear water',
    size: 'large'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Man relaxing on yacht deck',
    size: 'medium'
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
    alt: 'Yacht from aerial view',
    size: 'medium'
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&crop=faces",
    alt: 'Luxury mega yacht at sunset',
    size: 'large'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'People on sailing yacht',
    size: 'medium'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Sailboat in open ocean',
    size: 'medium'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Family enjoying yacht trip',
    size: 'medium'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Couple enjoying ocean view',
    size: 'medium'
  }
];
  return (
    <div className="min-h-screen bg-white">
     <HeaderBanner title={'Our Gallery'} />
      {/* Gallery Section */}
      <div className="relative z-20 bg-white py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => {
              // Dynamic grid sizing
              let gridClasses = '';
              if (image.size === 'large') {
                gridClasses = 'md:col-span-2 md:row-span-2';
              } else if (index % 5 === 0) {
                gridClasses = 'md:row-span-2';
              } else if (index % 7 === 0) {
                gridClasses = 'lg:col-span-2';
              } else {
                gridClasses = 'md:col-span-1';
              }

              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${gridClasses}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative border */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="mt-16 text-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <span className="relative z-10">Load More Images</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="relative">
        <svg
          className="w-full h-20 text-blue-50 transform rotate-180"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-blue-50 h-32"></div>
      </div>
    </div>
  );
};

export default YachtGallery;