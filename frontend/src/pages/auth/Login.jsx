import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, MapPin, Plane } from 'lucide-react';
import useAdminAuth from '../../context/AdminAuthContext'; // Adjust import path as needed
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { login, isLoading: authLoading, isAuthenticated } = useAdminAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  

  // Real-time validation functions
  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  // Validate field on change
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field in real-time if it has been touched
    if (touched[name] || value !== '') {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched on blur
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    
    // Filter out empty errors
    Object.keys(newErrors).forEach(key => {
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
      password: true
    });

    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await login({
        adminEmail: formData.email,
        password: formData.password
      });

         if (response.authenticated) {
        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || "/admin/dashboard";
        navigate(from, { replace: true });
      } else {
        setErrors({ general: response.message || 'Login failed' });
      }
      // If successful, the auth context will handle the redirect/state update
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: error.message || 'An error occurred during login. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return formData.email && 
           formData.password && 
           !errors.email && 
           !errors.password;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-100 to-cyan-100 opacity-20"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-primary-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 px-8 py-10 text-center relative">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-6 h-6 text-white" />
                  <Plane className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Travel Admin</h1>
              <p className="text-primary-200 text-sm">Manage your travel & tour system</p>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
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
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-primary-300 focus:border-primary-500 focus:ring-primary-500/20'
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
                <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors duration-200 ${
                      errors.password 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-primary-300 focus:border-primary-500 focus:ring-primary-500/20'
                    } focus:outline-none focus:ring-4`}
                    placeholder="Enter your password"
                    disabled={isLoading || authLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600 disabled:opacity-50"
                    disabled={isLoading || authLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                    className="w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500 focus:ring-2"
                    disabled={isLoading || authLoading}
                  />
                  <span className="ml-2 text-sm text-primary-600">Remember me</span>
                </label>
                <Link className='text-primary-500 underline underline-offset-4' >
                go back
                </Link>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || authLoading || !isFormValid()}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading || authLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-primary-500">
            © 2025 Travel System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;