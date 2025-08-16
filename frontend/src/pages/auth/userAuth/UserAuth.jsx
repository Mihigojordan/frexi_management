import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, AlertCircle, Phone } from 'lucide-react';
// Updated import - make sure this path is correct
import useUserAuth from '../../../context/UserAuthContext';
import bgimage from "../../../assets/image/gorilla1.jpg"
import { useLocation, useNavigate } from 'react-router-dom';

export default function FrexiAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get auth functions from context - add error handling
  const authContext = useUserAuth();
  
  if (!authContext) {
    return <div>Error: Authentication context not available</div>;
  }
  
  const { login, register , isAuthenticated, isLoading: authLoading } = authContext;

    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already authenticated
    useEffect(() => {
      if (isAuthenticated && !authLoading) {
        const from = location.state?.from?.pathname || "/user/dashboard";
        navigate(from, { replace: true });
      }
    }, [isAuthenticated, authLoading, navigate, location]);
  
  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register form data
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber:'',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateRegisterForm = () => {
    if (!registerData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!registerData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!registerData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!registerData.password) {
      setError('Password is required');
      return false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (registerData.password.phoneNumber) {
      setError('phone number is required ');
      return false;
    }
    return true;
  };

  const validateLoginForm = () => {
    if (!loginData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!loginData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Attempting login with:', { email: loginData.email }); // Debug log
      const result = await login(loginData);
      console.log('Login result:', result); // Debug log
      // Success - user will be redirected by the auth context or parent component
      if (result.authenticated) {
        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || "/user/dashboard";
        navigate(from, { replace: true });
      } else {
        setErrors({ general: result.message || "Login failed" });
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Prepare data for registration
      const registrationData = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        fullName: `${registerData.firstName} ${registerData.lastName}`.trim(),
        email: registerData.email,
        password: registerData.password,
        phoneNumber:registerData.phoneNumber
      };
      
      console.log('Attempting registration with:', { 
        firstName: registrationData.firstName, 
        lastName: registrationData.lastName,
        email: registrationData.email 
      }); // Debug log
      
      const result = await register(registrationData);
      console.log('Registration result:', result); // Debug log
      // Success - user will be automatically logged in by the auth context
      if (result.authenticated) {
        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || "/user/dashboard";
        navigate(from, { replace: true });
      } else {
        setErrors({ general: response.message || "register failed" });
      }
    } catch (err) {
      console.error('Registration error:', err); // Debug log
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForms = () => {
    setLoginData({ email: '', password: '' });
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber:'',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    resetForms();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src={bgimage}
          alt="Students collaborating"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-end mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded mr-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-primary-500">Frexi</span>
              <span className="text-sm text-gray-500 ml-1">Travel</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Join Frexi Travel today'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
            {/* Login Form */}
            {isLogin ? (
              <div className="space-y-4">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                    placeholder="Email"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                    placeholder="Password"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            ) : (
              /* Register Form */
              <div className="space-y-4">
                {/* First Name and Last Name */}
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-primary-500" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={registerData.firstName}
                      onChange={handleRegisterChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                      placeholder="First name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="lastName"
                      value={registerData.lastName}
                      onChange={handleRegisterChange}
                      className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                      placeholder="Last name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                    placeholder="Email"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {/* phone Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={registerData.phoneNumber}
                    onChange={handleRegisterChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                    placeholder="Phone number"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                    placeholder="Password"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                    placeholder="Confirm password"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={registerData.agreeToTerms}
                    onChange={handleRegisterChange}
                    className="mt-1 h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    required
                    disabled={isSubmitting}
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-600">
                    I agree with the{' '}
                    <button 
                      type="button" 
                      className="text-primary-500 hover:text-primary-600 font-medium underline"
                      onClick={() => {/* Handle terms modal/link */}}
                      disabled={isSubmitting}
                    >
                      Terms & Condition
                    </button>
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 mt-6"
            >
              {isSubmitting 
                ? (isLogin ? 'Signing in...' : 'Creating account...') 
                : (isLogin ? 'Sign In' : 'Create Account')
              }
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Toggle between Login/Register */}
          <div className="text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-primary-500 hover:text-primary-600 font-medium"
                disabled={isSubmitting}
              >
                {isLogin ? 'Create account' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}