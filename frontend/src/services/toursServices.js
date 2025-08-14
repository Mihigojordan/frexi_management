    import api, { API_URL } from '../api/api'; // Your axios instance

    /**
     * Tour Service - Handles all tour-related API operations
     */
    class TourService {
    constructor() {
        this.baseEndpoint = '/tours';
    }

    /**
     * Create a new tour with file uploads
     * @param {Object} tourData - Tour data
     * @param {File} mainPhoto - Main photo file
     * @param {File[]} galleryFiles - Array of gallery image files
     * @returns {Promise<Object>} Created tour
     */
    async createTour(tourData, mainPhoto = null, galleryFiles = []) {
        try {
        const formData = new FormData();
        
        // Append tour data fields
        Object.keys(tourData).forEach(key => {
            if (tourData[key] !== undefined && tourData[key] !== null) {
            if (Array.isArray(tourData[key])) {
                formData.append(key, JSON.stringify(tourData[key]));
            } else {
                formData.append(key, tourData[key]);
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
        throw this.handleError(error, 'Failed to create tour');
        }
    }


    getFullImageUrl(img){
    if(!img) return null
    console.log('the image',img);
    
    return `${API_URL}/${img}`

    }

    /**
     * Get all tours
     * @returns {Promise<Array>} Array of all tours
     */
    async getAllTours() {
        try {
        const response = await api.get(this.baseEndpoint);
        return response.data;
        } catch (error) {
        throw this.handleError(error, 'Failed to fetch tours');
        }
    }

    /**
     * Get all active tours
     * @returns {Promise<Array>} Array of active tours
     */
    async getActiveTours() {
        try {
        const response = await api.get(`${this.baseEndpoint}/active`);
        return response.data;
        } catch (error) {
        throw this.handleError(error, 'Failed to fetch active tours');
        }
    }

    /**
     * Get a single tour by ID
     * @param {string} id - Tour ID
     * @returns {Promise<Object>} Tour object
     */
    async getTourById(id) {
        try {
        const response = await api.get(`${this.baseEndpoint}/${id}`);
        return response.data;
        } catch (error) {
        throw this.handleError(error, `Failed to fetch tour with ID: ${id}`);
        }
    }

    /**
     * Get tours by country
     * @param {string} country - Country name
     * @returns {Promise<Array>} Array of tours in the specified country
     */
    async getToursByCountry(country) {
        try {
        const response = await api.get(`${this.baseEndpoint}/country/${encodeURIComponent(country)}`);
        return response.data;
        } catch (error) {
        throw this.handleError(error, `Failed to fetch tours for country: ${country}`);
        }
    }

    /**
     * Search tours by query
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of matching tours
     */
    async searchTours(query) {
        try {
        const response = await api.get(`${this.baseEndpoint}/search`, {
            params: { q: query }
        });
        return response.data;
        } catch (error) {
        throw this.handleError(error, `Failed to search tours with query: ${query}`);
        }
    }

    /**
     * Update a tour
     * @param {string} id - Tour ID
     * @param {Object} tourData - Updated tour data
     * @param {File} newMainPhoto - New main photo file (optional)
     * @param {File[]} newGalleryFiles - New gallery files (optional)
     * @param {string[]} keepGalleryImages - URLs of gallery images to keep (optional)
     * @returns {Promise<Object>} Updated tour
     */
    async updateTour(id, tourData, newMainPhoto = null, newGalleryFiles = [], keepGalleryImages = []) {
        try {
        const formData = new FormData();
        
        // Append tour data fields
        Object.keys(tourData).forEach(key => {
            if (tourData[key] !== undefined && tourData[key] !== null) {
            if (Array.isArray(tourData[key])) {
                formData.append(key, JSON.stringify(tourData[key]));
            } else {
                formData.append(key, tourData[key]);
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
        throw this.handleError(error, `Failed to update tour with ID: ${id}`);
        }
    }

    /**
     * Delete a tour permanently
     * @param {string} id - Tour ID
     * @returns {Promise<Object>} Deletion confirmation
     */
    async deleteTour(id) {
        try {
        const response = await api.delete(`${this.baseEndpoint}/${id}`);
        return response.data;
        } catch (error) {
        throw this.handleError(error, `Failed to delete tour with ID: ${id}`);
        }
    }

    /**
     * Soft delete a tour (set isActive to false)
     * @param {string} id - Tour ID
     * @returns {Promise<Object>} Updated tour with isActive: false
     */
    async softDeleteTour(id) {
        try {
        const response = await api.put(`${this.baseEndpoint}/${id}/soft-delete`);
        return response.data;
        } catch (error) {
        throw this.handleError(error, `Failed to soft delete tour with ID: ${id}`);
        }
    }

    /**
     * Batch operations
     */

    /**
     * Get tours with pagination
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} filters - Additional filters
     * @returns {Promise<Object>} Paginated tours result
     */
    async getToursPaginated(page = 1, limit = 10, filters = {}) {
        try {
        const params = { page, limit, ...filters };
        const response = await api.get(this.baseEndpoint, { params });
        return response.data;
        } catch (error) {
        throw this.handleError(error, 'Failed to fetch paginated tours');
        }
    }

    /**
     * Get tour statistics
     * @returns {Promise<Object>} Tour statistics
     */
    async getTourStats() {
        try {
        const allTours = await this.getAllTours();
        const activeTours = allTours.filter(tour => tour.isActive);
        
        const stats = {
            total: allTours.length,
            active: activeTours.length,
            inactive: allTours.length - activeTours.length,
            countries: [...new Set(allTours.map(tour => tour.country))].length,
            averageBudget: allTours.reduce((sum, tour) => sum + (tour.estimatedBudget || 0), 0) / allTours.length
        };
        
        return stats;
        } catch (error) {
        throw this.handleError(error, 'Failed to fetch tour statistics');
        }
    }

    /**
     * Bulk update tours
     * @param {Array} tourUpdates - Array of {id, data} objects
     * @returns {Promise<Array>} Array of updated tours
     */
    async bulkUpdateTours(tourUpdates) {
        try {
        const updatePromises = tourUpdates.map(({ id, data }) => 
            this.updateTour(id, data)
        );
        
        const results = await Promise.allSettled(updatePromises);
        
        return results.map((result, index) => ({
            id: tourUpdates[index].id,
            success: result.status === 'fulfilled',
            data: result.status === 'fulfilled' ? result.value : null,
            error: result.status === 'rejected' ? result.reason.message : null
        }));
        } catch (error) {
        throw this.handleError(error, 'Failed to bulk update tours');
        }
    }

    /**
     * Upload additional gallery images to existing tour
     * @param {string} id - Tour ID
     * @param {File[]} galleryFiles - Array of gallery image files
     * @param {string[]} keepExisting - URLs of existing images to keep
     * @returns {Promise<Object>} Updated tour
     */
    async addGalleryImages(id, galleryFiles, keepExisting = []) {
        try {
        // First get the current tour to get existing gallery
        const currentTour = await this.getTourById(id);
        const existingGallery = currentTour.gallery || [];
        
        // Combine existing images to keep with current gallery
        const imagesToKeep = keepExisting.length > 0 ? keepExisting : existingGallery;
        
        return await this.updateTour(id, {}, null, galleryFiles, imagesToKeep);
        } catch (error) {
        throw this.handleError(error, `Failed to add gallery images to tour: ${id}`);
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
     * Remove specific gallery images from tour
     * @param {string} id - Tour ID
     * @param {string[]} imagesToRemove - URLs of images to remove
     * @returns {Promise<Object>} Updated tour
     */
    async removeGalleryImages(id, imagesToRemove) {
        try {
        const currentTour = await this.getTourById(id);
        const existingGallery = currentTour.gallery || [];
        
        // Keep images that are not in the removal list
        const imagesToKeep = existingGallery.filter(url => !imagesToRemove.includes(url));
        
        return await this.updateTour(id, {}, null, [], imagesToKeep);
        } catch (error) {
        throw this.handleError(error, `Failed to remove gallery images from tour: ${id}`);
        }
    }

    /**
     * Error handler helper
     * @param {Error} error - The error object
     * @param {string} defaultMessage - Default error message
     * @returns {Error} Formatted error
     */
    handleError(error, defaultMessage) {
        console.error(`Tour Service Error: ${defaultMessage}`, error);
        
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
    const tourService = new TourService();
    export default tourService;

    // Named exports for specific methods if needed
    export const {
    createTour,
    getAllTours,
    getActiveTours,
    getTourById,
    getToursByCountry,
    searchTours,
    updateTour,
    deleteTour,
    softDeleteTour,
    getToursPaginated,
    getTourStats,
    bulkUpdateTours,
    addGalleryImages,
    removeGalleryImages,
    parseDescription
    } = tourService;