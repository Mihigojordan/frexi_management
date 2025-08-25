import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/image/frexilogo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Destination", href: "/destination" },
    { name: "Tour Package", href: "/tour" },
    { name: "Service", href: "/service" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
    { name: "", href: "/auth/user" },
  ];

  return (
    <div className=" sticky top-0 bg-white shadow-sm z-50">
    <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8  bg-white shadow-sm z-50">
      <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center h-16 w-20 group">
          <div className="relative">
            <img
              src={logo}
              className="h-full transition-transform duration-300 group-hover:scale-105"
              alt="Frexi Logo"
            />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks
            .filter((link) => link.name)
            .map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 font-medium transition-all duration-300 rounded-lg hover:bg-gray-50 group ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-gray-700 hover:text-gray-900"
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#113d48" : "transparent",
                })}
              >
                {link.name}
                <span
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-8 transition-all duration-300"
                  style={{ backgroundColor: "#113d48" }}
                ></span>
              </NavLink>
            ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Link
            to="/auth/user"
            className="hidden sm:flex items-center space-x-2 text-white px-8 py-3 rounded-xl hover:opacity-90 hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105 shadow-md"
            style={{ backgroundColor: "#113d48" }}
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="py-6 border-t border-gray-200">
          <div className="space-y-2 mb-6">
            {navLinks
              .filter((link) => link.name)
              .map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-4 font-medium rounded-xl transition-all duration-200 border group ${
                      isActive
                        ? "text-white shadow-md border-transparent"
                        : "text-gray-700 hover:bg-gray-50 border-transparent hover:border-gray-200 hover:shadow-sm"
                    }`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#113d48" : "transparent",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </NavLink>
              ))}
          </div>

          {/* Mobile Book Now */}
          <div className="mb-6">
            <Link
              to="/auth/user"
              className="flex items-center justify-center space-x-2 w-full text-white px-6 py-4 rounded-xl hover:opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ backgroundColor: "#113d48" }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Book Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navigation;
