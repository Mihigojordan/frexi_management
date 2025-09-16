import api from '../api/api'; // Your axios instance

/**
 * Employee Auth Service - Handles all employee authentication API operations
 */
class EmployeeAuthService {
  constructor() {
    this.baseEndpoint = '/auth/employee';
  }

  /**
   * Employee login
   * @param {Object} credentials - Login credentials { email, password }
   * @returns {Promise<Object>} Login response with authentication status
   */
  async login(credentials) {
    try {
      const response = await api.post(`${this.baseEndpoint}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Important for cookies
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to login employee');
    }
  }

  /**
   * Employee logout
   * @returns {Promise<Object>} Logout confirmation
   */
  async logout() {
    try {
      const response = await api.post(`${this.baseEndpoint}/logout`, {}, {
        withCredentials: true, // Important for cookies
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to logout employee');
    }
  }

  /**
   * Get current employee profile
   * @returns {Promise<Object>} Employee profile data
   */
  async getProfile() {
    try {
      const response = await api.get(`${this.baseEndpoint}/profile`, {
        withCredentials: true, // Important for cookies
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch employee profile');
    }
  }

  /**
   * Lock employee account
   * @returns {Promise<Object>} Lock confirmation
   */
  async lockAccount() {
    try {
      const response = await api.post(`${this.baseEndpoint}/lock`, {}, {
        withCredentials: true, // Important for cookies
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to lock employee account');
    }
  }

  /**
   * Unlock employee account
   * @param {Object} unlockData - Unlock data { password }
   * @returns {Promise<Object>} Unlock confirmation
   */
  async unlockAccount(unlockData) {
    try {
      const response = await api.post(`${this.baseEndpoint}/unlock`, unlockData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Important for cookies
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to unlock employee account');
    }
  }

  /**
   * Check if employee is authenticated
   * @returns {Promise<boolean>} Authentication status
   */
  async checkAuth() {
    try {
      await this.getProfile();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate employee session
   * @returns {Promise<Object>} Session validation result
   */
  async validateSession() {
    try {
      const profile = await this.getProfile();
      return {
        isValid: true,
        employee: profile,
        isLocked: profile.isLocked || false
      };
    } catch (error) {
      return {
        isValid: false,
        employee: null,
        isLocked: false
      };
    }
  }

  /**
   * Error handler helper
   * @param {Error} error - The error object
   * @param {string} defaultMessage - Default error message
   * @returns {Error} Formatted error
   */
  handleError(error, defaultMessage) {
    console.error(`Employee Auth Service Error: ${defaultMessage}`, error);

    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.data || defaultMessage;
      const customError = new Error(message);
      customError.status = error.response.status;
      customError.data = error.response.data;
      return customError;
    } else if (error.request) {
      // Request made but no response
      const networkError = new Error('Network error - please check your connection');
      networkError.status = 0;
      return networkError;
    } else {
      // Something else happened
      return new Error(error.message || defaultMessage);
    }
  }
}

// Create and export a singleton instance
const employeeAuthService = new EmployeeAuthService();
export default employeeAuthService;

// Named exports for specific methods if needed
export const {
  login,
  logout,
  getProfile,
  lockAccount,
  unlockAccount,
  checkAuth,
  validateSession,
} = employeeAuthService;