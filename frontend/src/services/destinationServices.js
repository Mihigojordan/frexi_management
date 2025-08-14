    import api, { API_URL } from '../api/api'; // Your axios instance

/**
 * Destination Service - Handles all destination-related API operations
 */
class DestinationService {
  constructor() {
    this.baseEndpoint = '/destinations';
  }

  /**
   * Create a new destination with file uploads
   * @param {Object} destinationData - Destination data
   * @param {File} mainPhoto - Main photo file
   * @param {File[]} galleryFiles - Array of gallery image files
   * @returns {Promise<Object>} Created destination
   */
  async createDestination(destinationData, mainPhoto = null, galleryFiles = []) {
    try {
      const formData = new FormData();
      
      // Append destination data fields
      Object.keys(destinationData).forEach(key => {
        if (destinationData[key] !== undefined && destinationData[key] !== null) {
          if (Array.isArray(destinationData[key])) {
            formData.append(key, JSON.stringify(destinationData[key]));
          } else {
            formData.append(key, destinationData[key]);
          }
        }
      });

      // Append main photo if provided
      if (mainPhoto) {
        formData.append('mainPhotoUrl', mainPhoto);
      }

      // Append gallery files if provided
      if (galleryFiles && galleryFiles.length > 0) {
        galleryFiles.forEach((file) => {
          formData.append('gallery', file);
        });
      }

      const response = await api.post(this.baseEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create destination');
    }
  }

  /**
   * Get all destinations
   * @returns {Promise<Array>} Array of all destinations
   */
  async getAllDestinations() {
    try {
      const response = await api.get(this.baseEndpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch destinations');
    }
  }

  /**
   * Get all active destinations
   * @returns {Promise<Array>} Array of active destinations
   */
  async getActiveDestinations() {
    try {
      const response = await api.get(`${this.baseEndpoint}/active`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch active destinations');
    }
  }



  
      getFullImageUrl(img){
      if(!img) return null
      console.log('the image',img);
      
      return `${API_URL}/${img}`
  
      }

  /**
   * Get a single destination by ID
   * @param {string} id - Destination ID
   * @returns {Promise<Object>} Destination object
   */
  async getDestinationById(id) {
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch destination with ID: ${id}`);
    }
  }



  /**
   * Get destinations by country
   * @param {string} country - Country name
   * @returns {Promise<Array>} Array of destinations in the specified country
   */
  async getDestinationsByCountry(country) {
    try {
      const response = await api.get(`${this.baseEndpoint}/country/${encodeURIComponent(country)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch destinations for country: ${country}`);
    }
  }

  /**
   * Search destinations by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching destinations
   */
  async searchDestinations(query) {
    try {
      const response = await api.get(`${this.baseEndpoint}/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to search destinations with query: ${query}`);
    }
  }

  /**
   * Update a destination
   * @param {string} id - Destination ID
   * @param {Object} destinationData - Updated destination data
   * @param {File} newMainPhoto - New main photo file (optional)
   * @param {File[]} newGalleryFiles - New gallery files (optional)
   * @param {string[]} keepGalleryImages - URLs of gallery images to keep (optional)
   * @returns {Promise<Object>} Updated destination
   */
  async updateDestination(id, destinationData, newMainPhoto = null, newGalleryFiles = [], keepGalleryImages = []) {
    try {
      const formData = new FormData();
      
      // Append destination data fields
      Object.keys(destinationData).forEach(key => {
        if (destinationData[key] !== undefined && destinationData[key] !== null) {
          if (Array.isArray(destinationData[key])) {
            formData.append(key, JSON.stringify(destinationData[key]));
          } else {
            formData.append(key, destinationData[key]);
          }
        }
      });

      // Append new main photo if provided
      if (newMainPhoto) {
        formData.append('mainPhotoUrl', newMainPhoto);
      }

      // Append gallery images to keep
      if (keepGalleryImages.length > 0) {
        formData.append('keepGalleryImages', JSON.stringify(keepGalleryImages));
      }

      // Append new gallery files if provided
      if (newGalleryFiles && newGalleryFiles.length > 0) {
        newGalleryFiles.forEach((file) => {
          formData.append('gallery', file);
        });
      }

      const response = await api.put(`${this.baseEndpoint}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update destination with ID: ${id}`);
    }
  }

  /**
   * Delete a destination permanently
   * @param {string} id - Destination ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteDestination(id) {
    try {
      const response = await api.delete(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete destination with ID: ${id}`);
    }
  }

  /**
   * Soft delete a destination (set isActive to false)
   * @param {string} id - Destination ID
   * @returns {Promise<Object>} Updated destination with isActive: false
   */
  async softDeleteDestination(id) {
    try {
      const response = await api.put(`${this.baseEndpoint}/${id}/soft-delete`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to soft delete destination with ID: ${id}`);
    }
  }

  /**
   * Batch operations
   */

  /**
   * Get destinations with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} filters - Additional filters
   * @returns {Promise<Object>} Paginated destinations result
   */
  async getDestinationsPaginated(page = 1, limit = 10, filters = {}) {
    try {
      const params = { page, limit, ...filters };
      const response = await api.get(this.baseEndpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch paginated destinations');
    }
  }

  /**
   * Get destination statistics
   * @returns {Promise<Object>} Destination statistics
   */
  async getDestinationStats() {
    try {
      const allDestinations = await this.getAllDestinations();
      const activeDestinations = allDestinations.filter(dest => dest.isActive);
      
      const stats = {
        total: allDestinations.length,
        active: activeDestinations.length,
        inactive: allDestinations.length - activeDestinations.length,
        countries: [...new Set(allDestinations.map(dest => dest.country))].length,
        averageBudget: allDestinations.reduce((sum, dest) => sum + (dest.estimatedBudget || 0), 0) / allDestinations.length,
        totalArea: allDestinations.reduce((sum, dest) => sum + (dest.areaKm2 || 0), 0)
      };
      
      return stats;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch destination statistics');
    }
  }

  /**
   * Bulk update destinations
   * @param {Array} destinationUpdates - Array of {id, data} objects
   * @returns {Promise<Array>} Array of updated destinations
   */
  async bulkUpdateDestinations(destinationUpdates) {
    try {
      const updatePromises = destinationUpdates.map(({ id, data }) => 
        this.updateDestination(id, data)
      );
      
      const results = await Promise.allSettled(updatePromises);
      
      return results.map((result, index) => ({
        id: destinationUpdates[index].id,
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null
      }));
    } catch (error) {
      throw this.handleError(error, 'Failed to bulk update destinations');
    }
  }

  /**
   * Upload additional gallery images to existing destination
   * @param {string} id - Destination ID
   * @param {File[]} galleryFiles - Array of gallery image files
   * @param {string[]} keepExisting - URLs of existing images to keep
   * @returns {Promise<Object>} Updated destination
   */
  async addGalleryImages(id, galleryFiles, keepExisting = []) {
    try {
      // First get the current destination to get existing gallery
      const currentDestination = await this.getDestinationById(id);
      const existingGallery = currentDestination.gallery || [];
      
      // Combine existing images to keep with current gallery
      const imagesToKeep = keepExisting.length > 0 ? keepExisting : existingGallery;
      
      return await this.updateDestination(id, {}, null, galleryFiles, imagesToKeep);
    } catch (error) {
      throw this.handleError(error, `Failed to add gallery images to destination: ${id}`);
    }
  }

  /**
   * Remove specific gallery images from destination
   * @param {string} id - Destination ID
   * @param {string[]} imagesToRemove - URLs of images to remove
   * @returns {Promise<Object>} Updated destination
   */
  async removeGalleryImages(id, imagesToRemove) {
    try {
      const currentDestination = await this.getDestinationById(id);
      const existingGallery = currentDestination.gallery || [];
      
      // Keep images that are not in the removal list
      const imagesToKeep = existingGallery.filter(url => !imagesToRemove.includes(url));
      
      return await this.updateDestination(id, {}, null, [], imagesToKeep);
    } catch (error) {
      throw this.handleError(error, `Failed to remove gallery images from destination: ${id}`);
    }
  }

  /**
   * Get popular destinations (by area or budget criteria)
   * @param {Object} criteria - Filtering criteria
   * @returns {Promise<Array>} Array of popular destinations
   */
  async getPopularDestinations(criteria = {}) {
    try {
      const destinations = await this.getActiveDestinations();
      
      let filtered = destinations;
      
      // Filter by budget range if specified
      if (criteria.minBudget || criteria.maxBudget) {
        filtered = filtered.filter(dest => {
          const budget = dest.estimatedBudget || 0;
          return (!criteria.minBudget || budget >= criteria.minBudget) &&
                 (!criteria.maxBudget || budget <= criteria.maxBudget);
        });
      }
      
      // Filter by area range if specified
      if (criteria.minArea || criteria.maxArea) {
        filtered = filtered.filter(dest => {
          const area = dest.areaKm2 || 0;
          return (!criteria.minArea || area >= criteria.minArea) &&
                 (!criteria.maxArea || area <= criteria.maxArea);
        });
      }
      
      // Filter by countries if specified
      if (criteria.countries && Array.isArray(criteria.countries)) {
        filtered = filtered.filter(dest => 
          criteria.countries.includes(dest.country)
        );
      }
      
      // Sort by specified criteria or default to name
      const sortBy = criteria.sortBy || 'name';
      const sortOrder = criteria.sortOrder || 'asc';
      
      filtered.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
      
      // Limit results if specified
      if (criteria.limit) {
        filtered = filtered.slice(0, criteria.limit);
      }
      
      return filtered;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch popular destinations');
    }
  }

  /**
   * Get destinations grouped by country
   * @returns {Promise<Object>} Destinations grouped by country
   */
  async getDestinationsByCountryGrouped() {
    try {
      const destinations = await this.getActiveDestinations();
      
      const grouped = destinations.reduce((acc, destination) => {
        const country = destination.country;
        if (!acc[country]) {
          acc[country] = [];
        }
        acc[country].push(destination);
        return acc;
      }, {});
      
      // Sort destinations within each country by name
      Object.keys(grouped).forEach(country => {
        grouped[country].sort((a, b) => a.name.localeCompare(b.name));
      });
      
      return grouped;
    } catch (error) {
      throw this.handleError(error, 'Failed to group destinations by country');
    }
  }

  // Helper to parse description from backend response
  parseDescription (description) {
    if (!description) return '';
    
    // If description is already a JSON object with details
    if (typeof description === 'object' && description.details) {
      return description.details;
    }
    
    // If description is a string, try parsing as JSON
    if (typeof description === 'string') {
      try {
        const parsed = JSON.parse(description);
        return parsed.details || parsed;
      } catch {
        // If parsing fails, return as-is (plain HTML string)
        return description;
      }
    }
    
    return description;
  }


  /**
   * Error handler helper
   * @param {Error} error - The error object
   * @param {string} defaultMessage - Default error message
   * @returns {Error} Formatted error
   */
  handleError(error, defaultMessage) {
    console.error(`Destination Service Error: ${defaultMessage}`, error);
    
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
const destinationService = new DestinationService();
export default destinationService;

// Named exports for specific methods if needed
export const {
  createDestination,
  getAllDestinations,
  getActiveDestinations,
  getDestinationById,
  getDestinationsByCountry,
  searchDestinations,
  updateDestination,
  deleteDestination,
  softDeleteDestination,
  getDestinationsPaginated,
  getDestinationStats,
  bulkUpdateDestinations,
  addGalleryImages,
  removeGalleryImages,
  getPopularDestinations,
  getDestinationsByCountryGrouped,
  parseDescription,
} = destinationService;