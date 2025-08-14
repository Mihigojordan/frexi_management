import api from '../api/api'; // Your axios instance

/**
 * Testimonial Service - Handles all testimonial-related API operations
 */
class TestimonialService {
  constructor() {
    this.baseEndpoint = '/testimonials';
  }

  /**
   * Create a new testimonial with an optional image upload
   * @param {Object} testimonialData - Testimonial data
   * @param {File} imageFile - Testimonial image file (optional)
   * @returns {Promise<Object>} Created testimonial
   */
  async createTestimonial(testimonialData, imageFile = null) {
    try {
      const formData = new FormData();

      // Append testimonial data fields (excluding imageUrl if it's a file)
      Object.keys(testimonialData).forEach((key) => {
        // Skip imageUrl as we'll handle it separately as a file
        if (key !== 'imageUrl' && testimonialData[key] !== undefined && testimonialData[key] !== null) {
          formData.append(key, testimonialData[key]);
        }
      });

      // Append image file with the correct field name that backend expects
      if (imageFile) {
        formData.append('imageUrl', imageFile); // This should match your backend field name
      }

      // Debug: Log what we're sending
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await api.post(this.baseEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create testimonial');
    }
  }

  /**
   * Update a testimonial
   * @param {string} id - Testimonial ID
   * @param {Object} testimonialData - Updated testimonial data
   * @param {File} newImageFile - New image file (optional)
   * @returns {Promise<Object>} Updated testimonial
   */
  async updateTestimonial(id, testimonialData, newImageFile = null) {
    try {
      const formData = new FormData();

      // Append testimonial data fields (excluding imageUrl if it's a file)
      Object.keys(testimonialData).forEach((key) => {
        // Skip imageUrl as we'll handle it separately as a file
        if (key !== 'imageUrl' && testimonialData[key] !== undefined && testimonialData[key] !== null) {
          formData.append(key, testimonialData[key]);
        }
      });

      // Append new image file with correct field name
      if (newImageFile) {
        formData.append('imageUrl', newImageFile);
      }

      // Debug: Log what we're sending
      console.log('Update FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await api.put(`${this.baseEndpoint}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update testimonial with ID: ${id}`);
    }
  }

  /**
   * Get all testimonials
   * @returns {Promise<Array>} Array of all testimonials
   */
  async getAllTestimonials() {
    try {
      const response = await api.get(this.baseEndpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch testimonials');
    }
  }

  /**
   * Get a single testimonial by ID
   * @param {string} id - Testimonial ID
   * @returns {Promise<Object>} Testimonial object
   */
  async getTestimonialById(id) {
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch testimonial with ID: ${id}`);
    }
  }

  /**
   * Delete a testimonial permanently
   * @param {string} id - Testimonial ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteTestimonial(id) {
    try {
      const response = await api.delete(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete testimonial with ID: ${id}`);
    }
  }

  /**
   * Get testimonials with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} filters - Additional filters
   * @returns {Promise<Object>} Paginated testimonials result
   */
  async getTestimonialsPaginated(page = 1, limit = 10, filters = {}) {
    try {
      const params = { page, limit, ...filters };
      const response = await api.get(this.baseEndpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch paginated testimonials');
    }
  }

  /**
   * Get testimonial statistics
   * @returns {Promise<Object>} Testimonial statistics
   */
  async getTestimonialStats() {
    try {
      const allTestimonials = await this.getAllTestimonials();
      
      const stats = {
        total: allTestimonials.length,
        averageRating: allTestimonials.length
          ? allTestimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 0), 0) / allTestimonials.length
          : 0,
        withImages: allTestimonials.filter((testimonial) => testimonial.imageUrl).length,
      };

      return stats;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch testimonial statistics');
    }
  }

  /**
   * Error handler helper
   * @param {Error} error - The error object
   * @param {string} defaultMessage - Default error message
   * @returns {Error} Formatted error
   */
  handleError(error, defaultMessage) {
    console.error(`Testimonial Service Error: ${defaultMessage}`, error);

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
const testimonialService = new TestimonialService();
export default testimonialService;

// Named exports for specific methods if needed
export const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialsPaginated,
  getTestimonialStats,
} = testimonialService;