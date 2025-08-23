import React, { useEffect, useState } from "react";
import logo from "../../assets/image/frexilogo.png";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Instagram,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribe with email:", email);
      setEmail("");
      // send email to backend here
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-slate-50 to-gray-100 py-20 relative overflow-hidden -mt-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23113d48\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="max-w-8xl mx-auto px-2 lg:px-8 relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-block p-3 bg-[#113d48]/10 rounded-xl mb-4">
                  <Mail className="w-8 h-8 text-[#113d48]" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Get Updated The Latest
                </h2>
                <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#113d48] to-teal-600 bg-clip-text text-transparent">
                  Newsletter
                </h3>
                <p className="text-gray-600 mt-4 max-w-md">
                  Stay informed with our latest updates and exclusive offers
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-6 py-4 rounded-xl border-2 border-gray-200 w-full sm:w-80 focus:outline-none focus:ring-0 focus:border-[#113d48] transition-colors text-gray-700 bg-gray-50 focus:bg-white"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  className="bg-[#113d48] text-white px-8 py-4 rounded-xl hover:bg-[#0d2f36] transition-all duration-300 font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Subscribe Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z\' fill=\'%23113d48\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-50"></div>

        <div className="relative max-w-8xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
  <div className="bg-[#113d48] p-4 h-24 rounded-xl inline-flex items-center justify-center mb-6">
    <img
      src={logo}
      className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
      alt="Frexi Logo"
    />
  </div>
  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
    Rapidiously myocardinate cross-platform intellectual capital
    model. Appropriately create interactive infrastructures
  </p>
              <div className="flex space-x-4">
                {[
                  {
                    Icon: Facebook,
                    color: "hover:text-blue-400",
                    bg: "hover:bg-blue-400/10",
                  },
                  {
                    Icon: Twitter,
                    color: "hover:text-sky-400",
                    bg: "hover:bg-sky-400/10",
                  },
                  {
                    Icon: Linkedin,
                    color: "hover:text-blue-600",
                    bg: "hover:bg-blue-600/10",
                  },
                  {
                    Icon: MessageCircle,
                    color: "hover:text-green-400",
                    bg: "hover:bg-green-400/10",
                  },
                  {
                    Icon: Instagram,
                    color: "hover:text-pink-400",
                    bg: "hover:bg-pink-400/10",
                  },
                // eslint-disable-next-line no-unused-vars
                ].map(({ Icon, color, bg }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`text-gray-500 ${color} ${bg} p-3 rounded-xl transition-all duration-300 transform hover:scale-110 border border-gray-200 hover:border-transparent`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-[#113d48] to-teal-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Quick Links</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { to: "", text: "Home" },
                  { to: "/about", text: "About us" },
                  { to: "/service", text: "Our Service" },
                  { to: "#terms", text: "Terms of Service" },
                  { to: "#book", text: "Tour Booking Now" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.to}
                      className="text-gray-600 hover:text-[#113d48] transition-all duration-300 flex items-center group text-lg"
                    >
                      <div className="w-6 h-6 mr-3 rounded-md bg-gray-100 group-hover:bg-[#113d48] transition-colors flex items-center justify-center">
                        <ArrowUp className="w-3 h-3 rotate-90 text-gray-500 group-hover:text-white" />
                      </div>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-[#113d48] to-teal-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Address</h3>
              </div>
              <div className="space-y-6">
                {[
                  {
                    Icon: Phone,
                    href: "tel:+250782379122",
                    text: "+250 782 379 122",
                  },
                  {
                    Icon: Mail,
                    href: "mailto:Booking@frexi.rw",
                    text: "Booking@frexi.rw",
                  },
                // eslint-disable-next-line no-unused-vars
                ].map(({ Icon, href, text }, index) => (
                  <div key={index} className="group">
                    <a
                      href={href}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-[#113d48]/10 transition-all duration-300 border border-gray-100 hover:border-[#113d48]/20"
                    >
                      <div className="p-2 bg-[#113d48]/10 rounded-lg group-hover:bg-[#113d48] transition-colors">
                        <Icon className="w-5 h-5 text-[#113d48] group-hover:text-white" />
                      </div>
                      <span className="text-gray-600 group-hover:text-[#113d48] transition-colors text-lg font-medium">
                        {text}
                      </span>
                    </a>
                  </div>
                ))}

                <div className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 group-hover:bg-[#113d48]/10 transition-all duration-300 border border-gray-100 hover:border-[#113d48]/20">
                    <div className="p-2 bg-[#113d48]/10 rounded-lg group-hover:bg-[#113d48] transition-colors">
                      <MapPin className="w-5 h-5 text-[#113d48] group-hover:text-white" />
                    </div>
                    <div className="text-gray-600 group-hover:text-[#113d48] transition-colors text-lg font-medium">
                      <p>Makuza Peace Plaza</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Post */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-[#113d48] to-teal-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Instagram Post</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <a
                    key={i}
                    href="#"
                    className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden hover:from-[#113d48] hover:to-teal-600 cursor-pointer transition-all duration-300 group transform hover:scale-105 shadow-lg border border-gray-200 hover:border-transparent"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Instagram className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-[#113d48] py-3 border-t border-white/10">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-white/80 text-center sm:text-left text-md">
              Copyright 2024 Frexi Ltd . All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-white/80 text-md">We Accept</span>
              <div className="flex space-x-3">
                {["VISA", "MC", "AMEX"].map((payment) => (
                  <div
                    key={payment}
                    className="bg-white rounded-lg px-8 py-1 text-sm font-bold text-[#113d48] shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#113d48] text-white p-4 rounded-full shadow-2xl hover:bg-[#0d2f36] transition-all duration-300 z-50 transform hover:scale-110 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default Footer;