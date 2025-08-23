import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Star, Navigation, Eye, Clock, Users } from "lucide-react";
import contactService from "../../../services/contactService"; // adjust path if needed
import Swal from "sweetalert2";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await contactService.sendMessage(formData);
      console.log("Response:", res);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been delivered successfully.",
        confirmButtonColor: "#0d9488",
      });

      setFormData({ firstName: "", email: "", message: "" }); // reset form
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to send your message. Please try again!",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-40 h-40 bg-gradient-to-br from-teal-200 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-200 to-teal-300 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-gradient-to-br from-emerald-200 to-cyan-300 rounded-full opacity-15 blur-2xl"></div>
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
   

        <div className="flex flex-col lg:flex-row gap-12 rounded-3xl overflow-hidden shadow-2xl">
          {/* Enhanced Contact Form Section */}
          <div className="lg:w-1/2 bg-white/80 backdrop-blur-md p-8 md:p-12 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-blue-50/30 rounded-l-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#113d48] to-teal-600 rounded-2xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#113d48]">Send us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Enhanced First Name Field */}
                <div className="relative group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-6 py-5 pr-14 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#113d48] focus:border-transparent outline-none transition-all duration-300 text-slate-700 placeholder-slate-400 group-hover:shadow-lg"
                    required
                  />
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
                    <Users className="w-5 h-5 text-slate-400 group-focus-within:text-[#113d48]" />
                  </div>
                </div>

                {/* Enhanced Email Field */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-5 pr-14 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#113d48] focus:border-transparent outline-none transition-all duration-300 text-slate-700 placeholder-slate-400 group-hover:shadow-lg"
                    required
                  />
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-[#113d48]" />
                  </div>
                </div>

                {/* Enhanced Message Field */}
                <div className="relative group">
                  <textarea
                    name="message"
                    placeholder="Tell us about your dream adventure..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-6 py-5 pr-14 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#113d48] focus:border-transparent outline-none transition-all duration-300 resize-none text-slate-700 placeholder-slate-400 group-hover:shadow-lg"
                    required
                  />
                  <div className="absolute right-5 top-5 transition-colors duration-300">
                    <Send className="w-5 h-5 text-slate-400 group-focus-within:text-[#113d48]" />
                  </div>
                </div>
<button
  type="submit"
  className="group relative w-full bg-gradient-to-br from-[#113d48] to-teal-600 hover:from-[#0c2d35] hover:via-teal-800 hover:to-blue-800 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
  disabled={loading}
>
  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  {/* Dynamic text */}
  <span className="relative z-10 text-lg">
    {loading ? "Sending..." : "Send Message"}
  </span>

  {/* Icon (always shown, animates on hover) */}
  {!loading && (
    <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
  )}

  {/* Animated background effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
</button>


              </form>

            </div>
          </div>

          {/* Enhanced Map Section */}
          <div className="lg:w-1/2 h-96 lg:h-auto relative overflow-hidden rounded-r-3xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5186!2d30.0619!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7d1b0a7f1f1%3A0x1234567890abcdef!2sMakuza%20Peace%20Plaza%2C%20KN%204%20Ave%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Makuza Peace Plaza Location"
              className="absolute inset-0 filter brightness-95"
            ></iframe>

            {/* Enhanced Location Info Card */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-sm border border-white/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#113d48] to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Makuza Peace Plaza</h3>
                  <p className="text-slate-600 text-sm mb-3">3rd Floor F3-28, KN 48 Street, Kigali</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <Star className="w-4 h-4 text-slate-300 fill-current" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">4.5</span>
                    <span className="text-sm text-slate-500">(57 reviews)</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-[#113d48] hover:bg-[#0c2d35] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      <Navigation className="w-4 h-4" />
                      Directions
                    </button>
                    <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;