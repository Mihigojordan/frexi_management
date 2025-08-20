import React from 'react';

const MapSection = () => {
  return (
    <div className="w-full h-96 bg-gray-200 relative overflow-hidden">
      {/* Embedded Google Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5186!2d30.0619!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7d1b0a7f1f1%3A0x1234567890abcdef!2sMakuza%20Peace%20Plaza%2C%20KN%204%20Ave%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Makuza Peace Plaza Location"
        className="absolute inset-0"
      ></iframe>

      {/* Location Info Card Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Makuza Peace Plaza</h3>
            <p className="text-gray-600 text-xs">KN 48 Street, Kigali</p>
            <div className="flex items-center gap-1 mt-2">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-600 ml-1">4.5</span>
              <span className="text-xs text-gray-500">57 reviews</span>
            </div>
            <div className="mt-2">
              <button className="text-blue-600 text-xs hover:underline">Directions</button>
              <button className="text-gray-600 text-xs hover:underline ml-3">View larger map</button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Card Overlay */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h4 className="font-semibold text-gray-900 mb-3">Contact Us</h4>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Makuza Peace Plaza 3rd Floor F3-28</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+250 782 379 122</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>booking@frexi.rw</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;