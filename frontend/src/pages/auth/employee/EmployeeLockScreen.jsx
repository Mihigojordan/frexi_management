import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  User,
  ArrowLeft
} from 'lucide-react';
import { API_URL } from '../../../api/api';
import useEmployeeAuth from '../../../context/EmployeeAuthContext';

const EmployeeUnlockScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const { user, unlockEmployee } = useEmployeeAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Real-time validation
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Clear general error when user starts typing
    if (error) {
      setError('');
    }
    // Show validation error in real-time if field has been touched
    if (touched && value !== '') {
      const validationError = validatePassword(value);
      if (validationError && validationError !== 'Password is required') {
        setError(validationError);
      }
    }
  };

  const handlePasswordBlur = () => {
    setTouched(true);
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await unlockEmployee(password);
      if (response) {
        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || "/employee/dashboard";
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Unlock error:', err);
      setError(err.message || 'Invalid password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = async () => {
    try {
      // Navigate back to employee login
      navigate('/auth/employee/login', { replace: true });
    } catch (error) {
      console.error('Error navigating back to login:', error);
      navigate('/auth/employee/login', { replace: true });
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return password && !validatePassword(password);
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-100 to-blue-100 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-20"></div>
      </div>
      
      <div className="relative max-w-md w-full mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/80 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#113d48] to-[#0d5a6d] rounded-2xl mb-4 shadow-md">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Screen Locked</h2>
            <p className="text-gray-600">Enter your password to unlock</p>
          </div>
          
          {/* User Info */}
          <div className="flex items-center justify-center space-x-3 mb-6 p-4 bg-[#113d48]/5 rounded-xl border border-[#113d48]/10">
            <div className="w-12 h-12 bg-[#113d48]/10 rounded-full flex items-center justify-center overflow-hidden">
              {user?.profileImg ? (
                <img
                  src={`${API_URL}${user.profileImg}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-[#113d48]" />
              )}
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-900">{user?.firstName + ' ' + user?.lastName || 'Employee'}</p>
              <p className="text-sm text-gray-600">{user?.employeeEmail || user?.email}</p>
              <p className="text-xs text-[#113d48] font-medium">Employee</p>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {/* Unlock Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-[#113d48]/30 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                    error && touched
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#113d48]'
                  }`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#113d48] disabled:cursor-not-allowed transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className="w-full bg-gradient-to-r from-[#113d48] to-[#0d5a6d] text-white py-3 px-4 rounded-xl hover:from-[#0d5a6d] hover:to-[#0a4a5a] focus:outline-none focus:ring-4 focus:ring-[#113d48]/30 transition-all duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2 text-white" />
                  Unlocking...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2 text-white" />
                  Unlock
                </>
              )}
            </button>
          </form>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBackToLogin}
              disabled={isSubmitting}
              className="inline-flex items-center text-sm text-[#113d48] hover:text-[#0d5a6d] font-medium transition-colors disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-1 text-[#113d48] hover:text-[#0d5a6d]" />
              Back to Login
            </button>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            For security, your session was locked after a period of inactivity
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmployeeUnlockScreen;