import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'flight ticket',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Vintage airplane toy on blurred background',
      icon: '✈️'
    },
    {
      id: 2,
      title: 'Tour packages',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Helicopter on landing pad with people',
      icon: '🚁'
    },
    {
      id: 3,
      title: 'holiday packages',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Elegant woman decorating Christmas tree',
      icon: '🎄'
    },
    {
      id: 4,
      title: 'visa assistance',
      image: 'https://images.unsplash.com/photo-1597149959069-2415346d8c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'World map with travel documents and money',
      icon: '📋'
    },
    {
      id: 5,
      title: 'travel insurance',
      image: 'https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Woman with backpack walking in airport',
      icon: '🛡️'
    },
    {
      id: 6,
      title: 'motor insurance',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'teal car in forest setting',
      icon: '🚗'
    },
    {
      id: 7,
      title: 'health insurance',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Medical professional in protective equipment',
      icon: '⚕️'
    },
    {
      id: 8,
      title: 'fire insurance',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'House fire with smoke and emergency response',
      icon: '🔥'
    }
  ];

  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-300 rounded-full mb-6 shadow-lg">
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-lg md:text-xl text-slate-600 font-light italic mb-3 tracking-wide">
            our services Co
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-4">
            explore more about our offer
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-300 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-700/30 to-transparent"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">{service.icon}</span>
                </div>
              </div>

              {/* Service Title Container */}
              <div className="relative p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-50/95 to-teal-50/95 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-800 text-center mb-2 group-hover:text-slate-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-teal-300 mx-auto rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </div>
              </div>

              {/* Hover Overlay with Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-teal-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Enhanced Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-teal-400/30 via-teal-300/30 to-teal-400/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   style={{ maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }}></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-4">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <span>View All Services</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full"></div>
            </button>
            <p className="text-slate-500 text-sm">
              Discover premium solutions tailored for you
            </p>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-teal-400/10 to-teal-300/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-slate-400/10 to-teal-300/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default ServicesSection;