import React from 'react';
import { ArrowRight, Users, Shield } from 'lucide-react';

export default function TravelLandingPage() {
  return (
    <div className="pt-10 bg-white  relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10">
        <div className="w-12 h-16 border-2 border-primary-300 rounded-full bg-primary-100 opacity-60"></div>
      </div>
      <div className="absolute top-20 left-32">
        <div className="w-8 h-12 border-2 border-primary-400 rounded-full bg-primary-200 opacity-70"></div>
      </div>
      <div className="absolute top-5 left-20">
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full bg-primary-300 opacity-80"></div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 ">
        {/* Left Side - Images */}
        <div className="flex-1 flex justify-center items-center">
          <div className="grid grid-cols-2 gap-4">
            {/* Large rounded-rectangle image */}
            <img 
              src="https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=600&h=400&fit=crop&crop=face"
              alt="Mountain Gorilla in Rwanda"
              className="w-64 h-[450px] object-cover shadow-2xl transform hover:scale-105 transition-transform duration-300"
              style={{
                borderRadius: '50% 50% 0% 50% / 35% 45% 65% 65%'
              }}
            />
            
            {/* Stack circles vertically */}
            <div className="flex flex-col gap-4 ">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop"
                alt="Kayaking adventure"
                className="w-44 h-[200px] object-cover  shadow-xl transform hover:scale-105 transition-transform duration-300"
                 style={{
                borderRadius: '60% 50% 70% 0% / 50% 50% 65% 50%'
              }}
              />
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&crop=faces"
                alt="Happy tourists"
                className="w-44 h-[200px] object-cover  shadow-xl transform hover:scale-105 transition-transform duration-300"
                  style={{
                borderRadius: '80% 0% 50% 60% / 50% 50% 65% 50%'
              }}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 max-w-xl">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h3 className="text-teal-700 font-medium text-lg italic mb-2">
                Let's Go Together
              </h3>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                Plan Your Trip<br />
                <span className="text-teal-700">With us</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              There are many variations of passages of available but the majority have suffered alteration in some form, by injected hum randomised words which don't look even slightly.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {/* Exclusive Trip */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-6 h-6 text-white transform -rotate-45" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Exclusive Trip
                  </h3>
                  <p className="text-gray-600">
                    Our experienced guides bring Rwanda's rich history and culture to life, ensuring an educational and engaging experience.
                  </p>
                </div>
              </div>

              {/* Professional Guide */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Professional Guide
                  </h3>
                  <p className="text-gray-600">
                    Your safety is our top priority, with dedicated teams and well-trained guides ensuring a secure and memorable journey.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Learn More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 right-10 w-20 h-20 bg-primary-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
    </div>
  );
}