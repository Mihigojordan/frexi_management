import api from '../api/api'; // Your axios instance

/**
 * Employee Service - Handles all employee-related API operations
 */
class EmployeeService {
  constructor() {
    this.baseEndpoint = '/employees';
    // Define the base URL for the backend server (configure as needed, e.g., via environment variables)
    this.baseUrl = api.defaults.baseURL || 'http://localhost:3000';
  }

  /**
   * Create a new employee
   * @param {Object} employeeData - Employee data { firstName, lastName, email, phone?, address?, profilePhoto? }
   * @returns {Promise<Object>} Created employee
   */
  async createEmployee(employeeData) {
    try {
      const response = await api.post(this.baseEndpoint, employeeData, {
        headers: {
          'Content-Type': 'multipart/form-data', // For handling file uploads
        },
      });
      // Transform profilePhoto to full URL
      if (response.data.profilePhoto) {
        response.data.profilePhoto = this.getFileUrl(response.data.profilePhoto);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create employee');
    }
  }

  /**
   * Update an employee
   * @param {string} id - Employee ID
   * @param {Object} employeeData - Updated employee data { firstName?, lastName?, email?, phone?, address?, profilePhoto? }
   * @returns {Promise<Object>} Updated employee
   */
  async updateEmployee(id, employeeData) {
    try {
      const response = await api.put(`${this.baseEndpoint}/${id}`, employeeData, {
        headers: {
          'Content-Type': 'multipart/form-data', // For handling file uploads
        },
      });
      // Transform profilePhoto to full URL
      if (response.data.profilePhoto) {
        response.data.profilePhoto = this.getFileUrl(response.data.profilePhoto);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update employee with ID: ${id}`);
    }
  }

  /**
   * Get all employees
   * @returns {Promise<Array>} Array of all employees
   */
  async getAllEmployees() {
    try {
      const response = await api.get(this.baseEndpoint);
      return response.data.map(employee => ({
        ...employee,
        profilePhoto: this.getFileUrl(employee.profilePhoto),
      }));
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch employees');
    }
  }

  /**
   * Get a single employee by ID
   * @param {string} id - Employee ID
   * @returns {Promise<Object>} Employee object
   */
  async getEmployeeById(id) {
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      return {
        ...response.data,
        profilePhoto: this.getFileUrl(response.data.profilePhoto),
      };
    } catch (error) {
      throw this.handleError(error, `Failed to fetch employee with ID: ${id}`);
    }
  }

  /**
   * Delete an employee permanently
   * @param {string} id - Employee ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteEmployee(id) {
    try {
      const response = await api.delete(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete employee with ID: ${id}`);
    }
  }

  /**
   * Get employees with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} filters - Additional filters (e.g., department, role, etc.)
   * @returns {Promise<Object>} Paginated employees result
   */
  async getEmployeesPaginated(page = 1, limit = 10, filters = {}) {
    try {
      const params = { page, limit, ...filters };
      const response = await api.get(this.baseEndpoint, { params });
      return {
        ...response.data,
        data: response.data.data.map(employee => ({
          ...employee,
          profilePhoto: this.getFileUrl(employee.profilePhoto),
        })),
      };
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch paginated employees');
    }
  }

  /**
   * Search employees by name, email, or phone number
   * @param {string} searchTerm - Search term
   * @param {Object} options - Search options (limit, etc.)
   * @returns {Promise<Array>} Array of matching employees
   */
  async searchEmployees(searchTerm, options = {}) {
    try {
      const params = { search: searchTerm, ...options };
      const response = await api.get(`${this.baseEndpoint}/search`, { params });
      return response.data.map(employee => ({
        ...employee,
        profilePhoto: this.getFileUrl(employee.profilePhoto),
      }));
    } catch (error) {
      throw this.handleError(error, 'Failed to search employees');
    }
  }

  /**
   * Get employee statistics
   * @returns {Promise<Object>} Employee statistics
   */
  async getEmployeeStats() {
    try {
      const allEmployees = await this.getAllEmployees();
      
      const stats = {
        total: allEmployees.length,
        withFirstName: allEmployees.filter((employee) => employee.firstName).length,
        withLastName: allEmployees.filter((employee) => employee.lastName).length,
        withBothNames: allEmployees.filter((employee) => employee.firstName && employee.lastName).length,
        recentEmployees: allEmployees.filter((employee) => {
          const createdDate = new Date(employee.createdAt);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return createdDate >= thirtyDaysAgo;
        }).length,
        withProfilePhoto: allEmployees.filter((employee) => employee.profilePhoto).length,
      };

      return stats;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch employee statistics');
    }
  }

  /**
   * Get employees by email domain
   * @param {string} domain - Email domain (e.g., 'company.com')
   * @returns {Promise<Array>} Array of employees with specified email domain
   */
  async getEmployeesByEmailDomain(domain) {
    try {
      const response = await api.get(`${this.baseEndpoint}/domain/${domain}`);
      return response.data.map(employee => ({
        ...employee,
        profilePhoto: this.getFileUrl(employee.profilePhoto),
      }));
    } catch (error) {
      throw this.handleError(error, `Failed to fetch employees with email domain: ${domain}`);
    }
  }

  /**
   * Get employees by creation date range
   * @param {string} startDate - Start date (ISO string)
   * @param {string} endDate - End date (ISO string)
   * @returns {Promise<Array>} Array of employees created within date range
   */
  async getEmployeesByDateRange(startDate, endDate) {
    try {
      const params = { startDate, endDate };
      const response = await api.get(`${this.baseEndpoint}/date-range`, { params });
      return response.data.map(employee => ({
        ...employee,
        profilePhoto: this.getFileUrl(employee.profilePhoto),
      }));
    } catch (error) {
      throw this.handleError(error, `Failed to fetch employees for date range: ${startDate} to ${endDate}`);
    }
  }

  /**
   * Export employees data
   * @param {Object} filters - Export filters
   * @param {string} format - Export format (csv, xlsx, pdf)
   * @returns {Promise<Blob>} Export file blob
   */
  async exportEmployees(filters = {}, format = 'csv') {
    try {
      const response = await api.get(`${this.baseEndpoint}/export`, {
        params: { ...filters, format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to export employees');
    }
  }

  /**
   * Generate a preview URL for an uploaded image (client-side)
   * @param {File} file - The image file to preview
   * @returns {string} Temporary URL for image preview
   * @throws {Error} If the file is invalid or not an image
   */
  generateImagePreview(file) {
    try {
      if (!file) {
        throw new Error('No file provided for preview');
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        throw new Error('File must be a JPEG or PNG image');
      }
      return URL.createObjectURL(file);
    } catch (error) {
      console.error('Failed to generate image preview:', error);
      throw new Error(error.message || 'Failed to generate image preview');
    }
  }

  /**
   * Get file URL for display
   * @param {string} filePath - Server file path
   * @returns {string|null} Full URL for file access
   */
  getFileUrl(filePath) {
    if (!filePath) return null;

    // If it's already a full URL, return as is
    if (filePath.startsWith('http')) {
      return filePath;
    }

    // Construct full URL assuming images are stored in /uploads/photos/
    return `${this.baseUrl}${filePath}`;
  }

  /**
   * Validate employee data
   * @param {Object} data - Employee data to validate
   * @returns {Object} Validation result with errors array
   */
  validateEmployeeData(data) {
    const errors = [];

    if (!data.firstName?.trim()) {
      errors.push('First name is required');
    }
    if (!data.lastName?.trim()) {
      errors.push('Last name is required');
    }
    if (!data.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }
    if (!data.phone?.trim()) {
      errors.push('Phone number is required');
    }
    if (!data.address?.trim()) {
      errors.push('Address is required');
    }
    if (data.profilePhoto && typeof data.profilePhoto === 'object' && !['image/jpeg', 'image/png'].includes(data.profilePhoto.type)) {
      errors.push('Profile photo must be a JPEG or PNG image');
    }

    return { errors };
  }

  /**
   * Error handler helper
   * @param {Error} error - The error object
   * @param {string} defaultMessage - Default error message
   * @returns {Error} Formatted error
   */
  handleError(error, defaultMessage) {
    console.error(`Employee Service Error: ${defaultMessage}`, error);

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
const employeeService = new EmployeeService();
export default employeeService;

// Named exports for specific methods if needed
export const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesPaginated,
  searchEmployees,
  getEmployeeStats,
  getEmployeesByEmailDomain,
  getEmployeesByDateRange,
  exportEmployees,
  generateImagePreview,
  getFileUrl,
  validateEmployeeData,
} = employeeService;