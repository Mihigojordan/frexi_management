import React from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';

export default function MostPopularAndGallery() {
  const popularPackages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
      title: "Dubai Travel Package",
      rating: 4.8,
      days: 7,
      location: "Dubai"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
      title: "Istanbul travel package",
      rating: 4.8,
      days: 7,
      location: "Istanbul"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
      title: "Brussels tour Package",
      rating: 4.8,
      days: 7,
      location: "Brussels"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      title: "Warsaw Travel Package",
      rating: 4.8,
      days: 7,
      location: "Warsaw"
    }
  ];

  const galleryImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
      size: "large"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
      size: "medium"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop",
      size: "medium"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      size: "medium"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
      size: "medium"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&h=200&fit=crop",
      size: "medium"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      size: "medium"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300&h=400&fit=crop",
      size: "tall"
    }
  ];

  return (
    <div className="bg-white">
      {/* Most Popular Travel Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-teal-600 font-medium text-lg italic mb-2">
              Best Place For You
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Most Popular Travel
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Traveling opens doors to unforgettable experiences and unique cultural encounters. 
              Exploring new places allows us to step outside our comfort zones.
            </p>
          </div>

          {/* Travel Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPackages.map((package_item) => (
              <div key={package_item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={package_item.image} 
                    alt={package_item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-slate-800 mb-3">
                    {package_item.title}
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(package_item.rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({package_item.rating} Rating)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{package_item.days} Days</span>
                    </div>
                    
                    <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Recent Gallery Section */}
<section className="py-16 px-6">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
      <p className="text-teal-600 font-medium text-lg italic mb-2">
        Make Your Tour More Pleasure
      </p>
      <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
        Recent Gallery
      </h2>
    </div>

    {/* Gallery Grid */}
    <div
      className="
        grid gap-4
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-12
        auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[100px]
      "
    >
      {/* Large image */}
      <div className="sm:col-span-2 lg:col-span-4 lg:row-span-6">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop"
          alt="Tropical road"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>

      {/* Medium image - top left */}
      <div className="lg:col-span-4 lg:row-span-2">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
          alt="Kayaking"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>

      {/* Medium image - top right */}
      <div className="lg:col-span-4 lg:row-span-2">
        <img
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop"
          alt="Mountain lake"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>

      {/* Tall image */}
      <div className="sm:col-span-2 lg:col-span-4 lg:row-span-6">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600"
          alt="Aerial lake view"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>

      {/* Couple photo */}
      <div className="lg:col-span-4 lg:row-span-3">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop"
          alt="Travel couple"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>

      {/* Cruise ship */}
      <div className="lg:col-span-4 lg:row-span-3">
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop"
          alt="Cruise ship"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>

      {/* Island view */}
      <div className="lg:col-span-2 lg:row-span-2">
        <img
          src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=200&h=200&fit=crop"
          alt="Island paradise"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>

      {/* Person in yellow */}
      <div className="lg:col-span-2 lg:row-span-2">
        <img
          src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=200&h=200&fit=crop"
          alt="Adventure traveler"
          className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        />
      </div>
    </div>
  </div>
</section>

    </div>
  );
}