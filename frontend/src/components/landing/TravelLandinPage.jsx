import React from 'react';
import { ArrowRight, Users, Shield, Sparkles, Globe, Award } from 'lucide-react';

export default function TravelLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Advanced Background Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-400/20 via-blue-500/15 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-purple-400/15 via-pink-400/10 to-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-500/15 rounded-full blur-2xl"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl rotate-12 opacity-80 shadow-xl"></div>
        </div>
        <div className="absolute top-32 left-40">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-70 shadow-lg"></div>
        </div>
        <div className="absolute top-10 left-32">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl rotate-45 opacity-60 shadow-md"></div>
        </div>
        
        {/* Animated Elements */}
        <div className="absolute bottom-40 left-20 animate-bounce">
          <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-1/3 right-20 animate-pulse">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg rotate-12 opacity-60"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side - Enhanced Images with Modern Graphics */}
          <div className="flex-1 flex justify-center items-center relative">
            {/* Background decorative circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 rounded-full blur-2xl scale-150"></div>
            
            <div className="relative grid grid-cols-2 gap-6">
              {/* Main large image with modern styling */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=600&h=400&fit=crop&crop=face"
                  alt="Mountain Gorilla in Rwanda"
                  className="relative w-72 h-[480px] object-cover shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-white/50 backdrop-blur-sm"
                  style={{
                    borderRadius: '50% 50% 0% 50% / 35% 45% 65% 65%'
                  }}
                />
                {/* Floating badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-slate-700">Live Adventure</span>
                  </div>
                </div>
              </div>
              
              {/* Smaller images with enhanced styling */}
              <div className="flex flex-col gap-6">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop"
                    alt="Kayaking adventure"
                    className="relative w-48 h-[220px] object-cover shadow-xl transform hover:scale-105 transition-all duration-300 border-3 border-white/60 backdrop-blur-sm"
                    style={{
                      borderRadius: '60% 50% 70% 0% / 50% 50% 65% 50%'
                    }}
                  />
                  {/* Rating badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                    <div className="flex items-center space-x-1">
                      <span className="text-amber-500 text-sm">★</span>
                      <span className="text-xs font-bold text-slate-700">4.9</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&crop=faces"
                    alt="Happy tourists"
                    className="relative w-48 h-[220px] object-cover shadow-xl transform hover:scale-105 transition-all duration-300 border-3 border-white/60 backdrop-blur-sm"
                    style={{
                      borderRadius: '80% 0% 50% 60% / 50% 50% 65% 50%'
                    }}
                  />
                  {/* Customer count */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border border-white"></div>
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border border-white"></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-700">2k+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-8 -right-8 bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-800">500+</div>
                  <div className="text-sm text-slate-600">Adventures</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Content */}
          <div className="flex-1 max-w-2xl relative">
            <div className="space-y-10">
              {/* Header with modern styling */}
              <div className="relative">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-600 text-sm font-semibold mb-6 shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
                  Let's Explore Together
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
                    Plan Your Dream
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Adventure
                  </span>
                </h1>
              </div>

              {/* Enhanced Description */}
              <div className="relative">
              <p className="text-xl text-slate-600 leading-relaxed font-light">
  Explore stunning destinations and create lasting memories with our expertly crafted wildlife and cultural experiences.
</p>

              </div>

              {/* Modern Features Cards */}
              <div className="grid gap-6">
                {/* Exclusive Trip */}
                <div className="group relative bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl p-6 hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        Exclusive Adventures
                      </h3>
                    <p className="text-slate-600 leading-relaxed">
  Discover Rwanda's rich biodiversity and culture through experiences that highlight its best treasures.
</p>

                    </div>
                  </div>
                </div>

                {/* Professional Guide */}
                <div className="group relative bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl p-6 hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        Expert Guidance
                      </h3>
                    <p className="text-slate-600 leading-relaxed">
  Our expert local guides ensure your safety and share deep insights into Rwanda's nature and culture.
</p>

                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Section */}
              <div className=" flex flex-col sm:flex-row gap-4 items-center">
                <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  <span className="relative z-10">Start Your Journey</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                
                {/* Secondary info */}
                <div className="flex items-center space-x-4 text-slate-600">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white"></div>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Join 5,000+ travelers</div>
                    <div className="text-xs">Rated 4.9/5 ★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent"></div>
    </div>
  );
}