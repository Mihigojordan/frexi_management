import React from 'react';
import { ArrowRight, Anchor, Shield, Users, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-200 to-blue-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-200 to-teal-300 rounded-full opacity-15 blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side - Enhanced Image Layout */}
          <div className="relative">
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
              {/* Main featured image */}
              <div className="relative z-30 mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop"
                  alt="Mountain lake adventure"
                  className="w-full h-[350px] object-cover rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl border-4 border-white/50 backdrop-blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
              </div>
              
              {/* Overlapping secondary images */}
              <div className="absolute -bottom-16 -right-8 z-20">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=350&h=280&fit=crop&crop=faces"
                  alt="Group of happy travelers"
                  className="w-48 h-36 object-cover rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:z-40 border-3 border-white/70"
                />
              </div>
              
              <div className="absolute -top-16 -left-8 z-20">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=250&fit=crop"
                  alt="Luxury yacht"
                  className="w-44 h-32 object-cover rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:z-40 border-3 border-white/70"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute top-8 right-8 z-40 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-slate-700">Premium Tours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Content */}
          <div className="space-y-10">
            {/* Header with enhanced typography */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                <p className="text-teal-700 font-semibold text-sm uppercase tracking-wider">
                  Welcome To Tourism
                </p>
              </div>
              
              <h2 className="text-4xl lg:text-5xl pb-4 font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight">
                We are world<br />
                <span className="text-teal-600">renowned</span> travel agency
              </h2>
              
              <div className="space-y-4 ">
                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                  Frexi Travel & Tours is your premier gateway to explore the breathtaking beauty and rich cultural tapestry of East Africa.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed ">
                  Based in Rwanda, we craft expertly designed itineraries that take you from heart-pounding gorilla trekking adventures to the serene shores of Zanzibar. With our deep-rooted commitment to sustainable tourism, we ensure your journey creates positive impact on local communities.
                </p>
              </div>
            </div>


            {/* Enhanced CTA Button */}
            <div className="pt-2 -mb-8">
              <button 
                className="group relative bg-gradient-to-r from-[#113d48] to-teal-700 hover:from-[#0d2f36] hover:to-teal-800 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-4 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #113d48 0%, #0f4c75 50%, #2c7da0 100%)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Contact With Us</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}