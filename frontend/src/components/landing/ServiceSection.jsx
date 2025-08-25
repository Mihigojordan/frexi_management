import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Flight Tickets',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Vintage airplane toy on blurred background',
      icon: '✈️'
    },
    {
      id: 2,
      title: 'Tour Packages',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Helicopter on landing pad with people',
      icon: '🚁'
    },
    {
      id: 3,
      title: 'Holiday Packages',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Elegant woman decorating Christmas tree',
      icon: '🎄'
    },
    {
      id: 4,
      title: 'Visa Assistance',
      image: 'https://images.unsplash.com/photo-1597149959069-2415346d8c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'World map with travel documents and money',
      icon: '📋'
    },
    {
      id: 5,
      title: 'Travel Insurance',
      image: 'https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Woman with backpack walking in airport',
      icon: '🛡️'
    },
    {
      id: 6,
      title: 'Motor Insurance',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Teal car in forest setting',
      icon: '🚗'
    },
    {
      id: 7,
      title: 'Health Insurance',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Medical professional in protective equipment',
      icon: '⚕️'
    },
    {
      id: 8,
      title: 'Fire Insurance',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'House fire with smoke and emergency response',
      icon: '🔥'
    }
  ];

  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#113d48] to-teal-600 rounded-full mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <span className="text-2xl text-white">⚡</span>
          </div>
          <p className="text-lg md:text-xl text-slate-700 font-medium tracking-wide">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#113d48] to-slate-800 bg-clip-text text-transparent mb-4">
            Discover Our Premium Offerings
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#113d48] to-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#113d48]/80 via-transparent to-transparent"></div>
                {/* Icon Badge */}
                <div className="absolute top-3 right-3 w-10 h-10 bg-[#113d48]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg text-white">{service.icon}</span>
                </div>
              </div>

              {/* Service Title Container */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-[#113d48] capitalize group-hover:text-teal-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#113d48] to-teal-500 mx-auto mt-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#113d48]/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>

    
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-teal-200/20 to-blue-200/20 rounded-full blur-3xl -z-10"></div>

      {/* Keyframes for Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;