/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Shield, AlertCircle, ArrowLeft, MapPin, Plane } from "lucide-react";
import useAdminAuth from "../../context/AdminAuthContext"; 
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login, isLoading: authLoading, isAuthenticated } = useAdminAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      const from = location.state?.from?.pathname || "/admin/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, location]);

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return "";
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const hasData = formData.email && formData.password;
    const hasErrors = Object.values(errors).some(error => error);
    return hasData && !hasErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    // Validate field in real-time if it has been touched
    if (touched[name] || value !== "") {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Mark field as touched on blur
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    // Validate field
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    // Filter out empty errors
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      console.log("Attempting admin login with:", { email: formData.email });
      const response = await login({
        adminEmail: formData.email,
        password: formData.password,
      });
      if (response.authenticated) {
        const from = location.state?.from?.pathname || "/admin/dashboard";
        navigate(from, { replace: true });
      } else {
        setErrors({ general: response.message || "Login failed" });
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setErrors({ general: err.message || "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-100 to-blue-100 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-20"></div>
      </div>
      
      <div className="relative w-full max-w-md mx-auto">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#113d48] to-[#0d5a6d] px-8 py-10 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-6 h-6 text-white" />
                  <Plane className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Travel Admin
              </h1>
              <p className="text-blue-100 text-sm">
                Manage your travel & tour system
              </p>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-[#113d48] focus:ring-[#113d48]/20"
                  } focus:outline-none focus:ring-4`}
                  placeholder="admin@travel.com"
                  disabled={isLoading || authLoading}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors duration-200 ${
                      errors.password
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-[#113d48] focus:ring-[#113d48]/20"
                    } focus:outline-none focus:ring-4`}
                    placeholder="Enter your password"
                    disabled={isLoading || authLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#113d48] disabled:opacity-50"
                    disabled={isLoading || authLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#113d48] border-gray-300 rounded focus:ring-[#113d48] focus:ring-2"
                    disabled={isLoading || authLoading}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link to="/" className="text-[#113d48] hover:text-[#0d5a6d] text-sm font-medium transition-colors duration-200">
                  Go back
                </Link>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || authLoading || !isFormValid()}
                className="w-full bg-gradient-to-r from-[#113d48] to-[#0d5a6d] text-white py-3 px-4 rounded-lg font-medium hover:from-[#0d5a6d] hover:to-[#0a4a5a] focus:outline-none focus:ring-4 focus:ring-[#113d48]/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isLoading || authLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2025 Abytech Hub . All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;