import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';




const TestimonialsSection = ({autoAdvance = true, interval = 6000 }) => {
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

  const testimonials = [
    { 
      name: 'Jacques Nyilinkindi', 
      role: 'Tour', 
      rating: 5, 
      text: 'Timely response and Good service' 
    },
    { 
      name: 'Gabriel Sheja', 
      role: 'Traveller', 
      rating: 5, 
      text: 'Mon expérience avec Frexi été plus que Formidable, Le service bien servi Servi avec le sourire Chaleureusement accueilli j\'ai été. Je recommande à tous et toutes personnes. Merci Frexi.' 
    },
    { 
      name: 'Emad Alami', 
      role: 'Traveller', 
      rating: 5, 
      text: 'Professional, Trust Worthy with great customer care...' 
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    if (!autoAdvance || testimonials.length <= 1) return;
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialSlide(prev => (prev + 1) % testimonials.length);
    }, interval);
    
    return () => clearInterval(testimonialInterval);
  }, [autoAdvance, interval, testimonials.length]);

  const SlideIndicators = ({ current, total, onChange }) => (
    <div className="flex justify-center space-x-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === current ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-primary-50 to-primary-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">What Client Say About us</h2>
          <p className="text-gray-600 italic">Testimonial</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SlideIndicators 
            current={currentTestimonialSlide} 
            total={testimonials.length} 
            onChange={setCurrentTestimonialSlide}
          />
        </div>
      </div>
    </section>
  );
};


export default TestimonialsSection;