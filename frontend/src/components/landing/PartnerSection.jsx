import { useEffect, useState } from "react";
import { Building2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import partnerService from "../../services/partnerService";

// Loading skeleton for partners
const PartnerSkeleton = () => (
  <div className="group cursor-pointer">
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-32 flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="w-32 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
    </div>
  </div>
);

const PartnerCard = ({ partner, index, isVisible }) => {
  const getPartnerGradient = (index) => {
    const gradients = [
      "from-emerald-500 to-teal-600",
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-violet-600",
      "from-amber-500 to-orange-600",
      "from-rose-500 to-pink-600",
      "from-cyan-500 to-blue-600",
      "from-lime-500 to-green-600",
      "from-orange-500 to-red-600"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div 
      className={`group cursor-pointer transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-32 flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/90 group-hover:border-emerald-200">
        {/* Hover glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getPartnerGradient(index)} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r ${getPartnerGradient(index)} rounded-full animate-ping`}
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 30}%`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>

        <img
          src={partnerService.getImageUrl(partner)}
          alt={partner.name}
          className="max-w-full max-h-16 object-contain transition-all duration-500 group-hover:scale-110 relative z-10"
          onError={(e) => {
            const gradient = getPartnerGradient(index);
            const colors = gradient.match(/(\w+)-500/g);
            const color1 = colors[0]?.replace('-500', '') || 'emerald';
            const color2 = colors[1]?.replace('-600', '') || 'teal';
            e.target.src = `https://via.placeholder.com/200x80/${color1}/${color2}?text=${encodeURIComponent(partner.name)}`;
          }}
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -skew-x-12 transform opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="w-4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default function PartnersSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response = await partnerService.findAll();
        setPartners(response);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    fetchPartners();
  }, []);

  // Responsive slides calculation
  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1; // Mobile: 1 card
    if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
    return 4; // Desktop: 4 cards
  };

  const [slidesPerView, setSlidesPerView] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
      setCurrentSlide(0); // Reset to first slide on resize
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(partners.length / slidesPerView);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Floating Background Elements */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/8 to-red-400/8 rounded-full blur-2xl animate-float-slow"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16,185,129) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-24 mr-6 animate-pulse"></div>
            <div className="relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 group-hover:rotate-0 transition-all duration-500 hover:scale-110">
                <Building2 className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-24 ml-6 animate-pulse"></div>
          </div>

          <p className="text-xl font-medium text-emerald-600 mb-4 tracking-wider uppercase animate-fade-in-up">
            Trusted Network
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Our Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Collaborating with industry leaders to deliver exceptional experiences and services worldwide
          </p>
        </div>

        {/* Partners Slider Container */}
        <div className="relative">
          {/* Custom Navigation Buttons */}
          {!loading && partners.length > slidesPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-white/20 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 hover:scale-110 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-white/20 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 hover:scale-110 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </>
          )}

          {/* Partners Grid */}
          <div className="overflow-hidden rounded-2xl p-2">
            {loading ? (
              // Loading skeletons
              <div className={`grid gap-6 ${
                slidesPerView === 1 ? 'grid-cols-1' : 
                slidesPerView === 2 ? 'grid-cols-2' : 
                'grid-cols-4'
              }`}>
                {Array.from({ length: slidesPerView }).map((_, index) => (
                  <PartnerSkeleton key={index} />
                ))}
              </div>
            ) : (
              // Partner cards with smooth sliding
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                  width: `${totalSlides * 100}%`
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div 
                    key={slideIndex} 
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    <div className={`grid gap-6 ${
                      slidesPerView === 1 ? 'grid-cols-1' : 
                      slidesPerView === 2 ? 'grid-cols-2' : 
                      'grid-cols-4'
                    }`}>
                      {partners
                        .slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView)
                        .map((partner, partnerIndex) => (
                          <PartnerCard
                            key={partner.id}
                            partner={partner}
                            index={slideIndex * slidesPerView + partnerIndex}
                            isVisible={isVisible}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Dots */}
          {!loading && partners.length > slidesPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                    currentSlide === index
                      ? 'bg-emerald-500 scale-125'
                      : 'bg-emerald-300 hover:bg-emerald-400 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) scale(1.03) rotate(2deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(40px) translateY(40px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 4s;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}