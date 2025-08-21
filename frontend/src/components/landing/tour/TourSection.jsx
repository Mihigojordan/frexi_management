import { useState, useEffect } from 'react';

const tourData = [
  { title: "Wildlife", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600", alt: "Wildlife", description: "Discover amazing creatures" },
  { title: "Walking", image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=600", alt: "Walking", description: "Peaceful nature walks" },
  { title: "Cruises", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600", alt: "Cruises", description: "Luxury ocean adventures" },
  { title: "Hiking", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600", alt: "Hiking", description: "Mountain trail experiences" },
  { title: "Airbirds", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=600", alt: "Airbirds", description: "Sky watching tours" },
  { title: "Mountain", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600", alt: "Mountain", description: "Peak exploration" },
  { title: "Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600", alt: "Beach", description: "Coastal paradise" },
  { title: "Forest", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600", alt: "Forest", description: "Woodland adventures" },
  { title: "Desert", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600", alt: "Desert", description: "Sand dune expeditions" },
];

const TourCard = ({ title, image, alt, description, isActive, onClick }) => {
  return (
    <div
      className={`relative w-[350px] h-[450px] rounded-3xl overflow-hidden transition-all duration-700 ease-out group ${
        isActive 
          ? 'scale-100 shadow-2xl shadow-slate-300/30 z-20 opacity-100' 
          : 'scale-90 z-10 opacity-50'
      }`}
      onClick={onClick}
    >
      {/* Main card background */}
      <div className="absolute inset-0 bg-white shadow-xl rounded-3xl overflow-hidden">
        
        {/* Image section */}
        <div className="relative h-[280px] overflow-hidden">
          <img
            src={image}
            alt={alt}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isActive ? 'scale-110' : 'scale-100'
            }`}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 shadow-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              Adventure
            </div>
          </div>

          {/* Favorite heart */}
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">{description}</p>
          
          {/* Bottom section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white"></div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-white"></div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 border-2 border-white"></div>
              </div>
              <span className="text-xs text-slate-500 font-medium">2.1k+ joined</span>
            </div>
            
            <button className="flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-slate-700 transition-colors shadow-lg">
              <span>Explore</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Active card accent */}
      {isActive && (
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-3xl blur-sm opacity-30 -z-10"></div>
      )}
    </div>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push((currentIndex + i) % tourData.length);
    }
    return cards;
  };

  const slideNext = () => setCurrentIndex((prev) => (prev + 1) % tourData.length);
  const slidePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + tourData.length) % tourData.length);

  useEffect(() => {
    const interval = setInterval(slideNext, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (index) => {
    const visible = visibleCards();
    const position = visible.indexOf(index);
    if (position === 1) return; // Center card for 3-card layout
    const steps = position - 1;
    if (steps > 0) {
      for (let i = 0; i < steps; i++) setTimeout(slideNext, i * 200);
    } else {
      for (let i = 0; i < Math.abs(steps); i++) setTimeout(slidePrev, i * 200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      <section className="relative py-10 px-6 text-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        </div>
        
        {/* Header */}
        <div className="relative z-10 mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-600 text-sm font-semibold mb-6 shadow-lg">
            <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Discover Amazing Places
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent mb-6">
            Tour Categories
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Embark on extraordinary adventures and create memories that will last a lifetime
          </p>
        </div>

        {/* Cards carousel - 3 cards */}
        <div className="relative flex justify-center items-center gap-8 overflow-hidden h-[520px] mb-12">
          {visibleCards().map((idx, pos) => {
            const tour = tourData[idx];
            return (
              <TourCard
                key={idx}
                title={tour.title}
                image={tour.image}
                alt={tour.alt}
                description={tour.description}
                isActive={pos === 1} // Center card is active in 3-card layout
                onClick={() => handleCardClick(idx)}
              />
            );
          })}
        </div>

        {/* Modern navigation */}
        <div className="flex justify-center items-center gap-8 -mt-10">
          <button
            onClick={slidePrev}
            className="group flex items-center space-x-3 bg-white/80 backdrop-blur-lg border border-slate-200/50 text-slate-700 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Previous</span>
          </button>
          
          {/* Progress indicator */}
          <div className="flex space-x-3">
            {tourData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 bg-gradient-to-r from-emerald-400 to-blue-500 shadow-lg' 
                    : 'w-3 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={slideNext}
            className="group flex items-center space-x-3 bg-white/80 backdrop-blur-lg border border-slate-200/50 text-slate-700 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-105 shadow-lg"
          >
            <span>Next</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;