import React from 'react';
import { ArrowRight, Anchor, Shield, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Overlapping Images */}
          <div className="flex flex-col items-start relative gap-5 w-[400px]">
            {/* Top left image - Mountain lake */}
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop"
              alt="Mountain lake adventure"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 hover:z-30 relative z-10"
              style={{ transform: 'translate(0, 0)' }}
            />
            
            {/* Center overlapping image - Group of friends */}
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=350&h=280&fit=crop&crop=faces"
              alt="Group of happy travelers"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 hover:z-30 relative z-20 border-4 border-white"
              style={{ transform: 'translate(120px, -60px)' }}
            />
            
            {/* Bottom left image - Yacht */}
            <img 
              src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=250&fit=crop"
              alt="Luxury yacht"
              className="w-full h-[270px] object-cover rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 hover:z-30 relative z-10 border-4 border-white"
              style={{ transform: 'translate(0, -120px)' }}
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-teal-600 font-medium text-lg italic mb-3">
                Welcome To Tourism
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
                We are world<br />
                reputeted travel<br />
                agency
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                frexi travel & tours is your premier choice for explore the breathtaking, beauty and rich cultural tapestry of east africa
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                based in rwanda we offer expertly crafted itineraries that take you from the heart -pounding adventure of gorilla trekking to serena shores of zanzibar with deep -rooted commitment to sustainable tourism we ensure your journey leaves a positive impact on local communities . let us be your guideto an unforgettable east african experience
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {/* Exclusive Trip */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Anchor className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Exclusive Trip
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enjoy a tailor-made adventure crafted just for you, offering unique experiences in Rwanda's most breathtaking locations.
                  </p>
                </div>
              </div>

              {/* Safety First Always */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Safety First Always
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your safety is our top priority, with dedicated teams and well-trained guides ensuring a secure and memorable journey.
                  </p>
                </div>
              </div>

              {/* Professional Guide */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Professional Guide
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our experienced guides bring Rwanda's rich history and culture to life, ensuring an educational and engaging experience.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Contact With Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}