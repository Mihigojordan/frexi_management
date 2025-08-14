import api from '../api/api'; // Adjust the import path as needed

/**
 * Partner Service
 * Handles all partner-related API calls
 */
class PartnerService {
    /**
     * Create a new partner
     * @param {Object} partnerData - Partner data
     * @param {string} [partnerData.name] - Partner's name
     * @param {string} [partnerData.email] - Partner's email address
     * @param {string} [partnerData.phone] - Partner's phone number
     * @param {string} [partnerData.address] - Partner's address
     * @param {File} [partnerData.partnerImg] - Partner's image file
     * @returns {Promise<Object>} Response with created partner
     */
    async create(partnerData) {
        try {
            const formData = new FormData();
            
            // Append text fields
            if (partnerData.name) formData.append('name', partnerData.name);
            if (partnerData.email) formData.append('email', partnerData.email);
            if (partnerData.phone) formData.append('phone', partnerData.phone);
            if (partnerData.address) formData.append('address', partnerData.address);
            
            // Append file if provided
            if (partnerData.partnerImg) {
                formData.append('partnerImg', partnerData.partnerImg);
            }

            const response = await api.post('/partners', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating partner:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to create partner';

            throw new Error(errorMessage);
        }
    }

    /**
     * Get all partners
     * @returns {Promise<Array>} Array of partner objects
     */
    async findAll() {
        try {
            const response = await api.get('/partners');
            return response.data;
        } catch (error) {
            console.error('Error fetching partners:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to fetch partners';

            throw new Error(errorMessage);
        }
    }

    /**
     * Get a single partner by ID
     * @param {string} id - Partner's ID
     * @returns {Promise<Object|null>} Partner object or null if not found
     */
    async findOne(id) {
        try {
            const response = await api.get(`/partners/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // Partner not found
            }

            console.error('Error fetching partner:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to fetch partner';

            throw new Error(errorMessage);
        }
    }

    /**
     * Update a partner
     * @param {string} id - Partner's ID
     * @param {Object} partnerData - Partner data to update
     * @param {string} [partnerData.name] - Partner's name
     * @param {string} [partnerData.email] - Partner's email address
     * @param {string} [partnerData.phone] - Partner's phone number
     * @param {string} [partnerData.address] - Partner's address
     * @param {File} [partnerData.partnerImg] - Partner's image file
     * @returns {Promise<Object>} Response with updated partner
     */
    async update(id, partnerData) {
        try {
            const formData = new FormData();
            
            // Append text fields
            if (partnerData.name !== undefined) formData.append('name', partnerData.name);
            if (partnerData.email !== undefined) formData.append('email', partnerData.email);
            if (partnerData.phone !== undefined) formData.append('phone', partnerData.phone);
            if (partnerData.address !== undefined) formData.append('address', partnerData.address);
            
            // Append file if provided
            if (partnerData.partnerImg) {
                formData.append('partnerImg', partnerData.partnerImg);
            }

            const response = await api.put(`/partners/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating partner:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to update partner';

            throw new Error(errorMessage);
        }
    }

    /**
     * Delete a partner
     * @param {string} id - Partner's ID
     * @returns {Promise<Object>} Response with success message
     */
    async remove(id) {
        try {
            const response = await api.delete(`/partners/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting partner:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to delete partner';

            throw new Error(errorMessage);
        }
    }

    /**
     * Find partner by email
     * @param {string} email - Partner's email
     * @returns {Promise<Object|null>} Partner object or null if not found
     */
    async findByEmail(email) {
        try {
            const response = await api.get(`/partners/by-email/${email}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // Partner not found
            }

            console.error('Error finding partner by email:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to find partner';

            throw new Error(errorMessage);
        }
    }

    /**
     * Find partner by phone
     * @param {string} phone - Partner's phone number
     * @returns {Promise<Object|null>} Partner object or null if not found
     */
    async findByPhone(phone) {
        try {
            const response = await api.get(`/partners/by-phone/${phone}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // Partner not found
            }

            console.error('Error finding partner by phone:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to find partner';

            throw new Error(errorMessage);
        }
    }

    /**
     * Get the full image URL for a partner
     * @param {Object} partner - Partner object
     * @returns {string|null} Full image URL or null if no image
     */
    getImageUrl(partner) {
        if (!partner?.imageUrl) return null;
        
        // If imageUrl is already a full URL, return as is
        if (partner.imageUrl.startsWith('http')) {
            return partner.imageUrl;
        }
        
        // Otherwise, construct the full URL (adjust base URL as needed)
        const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
        return `${baseUrl}/${partner.imageUrl}`;
    }

    /**
     * Validate partner data before sending to backend
     * @param {Object} partnerData - Partner data to validate
     * @param {boolean} [isUpdate=false] - Whether this is an update operation
     * @returns {Object} Validation result with isValid boolean and errors array
     */
    validatePartnerData(partnerData, isUpdate = false) {
        const errors = [];

        // Email validation
        if (partnerData.email) {
            if (!this.isValidEmail(partnerData.email)) {
                errors.push('Email format is invalid');
            }
        }

        // Phone validation
        if (partnerData.phone) {
            if (!this.isValidPhone(partnerData.phone)) {
                errors.push('Phone number format is invalid');
            }
        }

        // Name validation (only required for creation)
        if (!isUpdate && !partnerData.name?.trim()) {
            errors.push('Name is required');
        } else if (partnerData.name && partnerData.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        // Image validation
        if (partnerData.partnerImg) {
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validImageTypes.includes(partnerData.partnerImg.type)) {
                errors.push('Image must be in JPEG, PNG, GIF, or WebP format');
            }

            // Check file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (partnerData.partnerImg.size > maxSize) {
                errors.push('Image size must be less than 5MB');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Basic email validation
     * @param {string} email - Email to validate
     * @returns {boolean} True if email format is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Basic phone number validation
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if phone format is valid
     */
    isValidPhone(phone) {
        // Basic phone validation - allows various international formats
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Format phone number for display
     * @param {string} phone - Phone number to format
     * @returns {string} Formatted phone number
     */
    formatPhone(phone) {
        if (!phone) return '';
        
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');
        
        // Format based on length (assuming US format for 10-11 digits)
        if (digits.length === 10) {
            return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        } else if (digits.length === 11 && digits[0] === '1') {
            return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
        }
        
        return phone; // Return original if doesn't match expected format
    }

    /**
     * Search partners by name
     * @param {string} searchTerm - Search term
     * @returns {Promise<Array>} Array of matching partners
     */
    async searchByName(searchTerm) {
        try {
            const response = await api.get(`/partners/search?name=${encodeURIComponent(searchTerm)}`);
            return response.data;
        } catch (error) {
            console.error('Error searching partners:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to search partners';

            throw new Error(errorMessage);
        }
    }
}

// Create and export a singleton instance
const partnerService = new PartnerService();
export default partnerService;

// Named exports for individual methods if needed
export const {
    create,
    findAll,
    findOne,
    update,
    remove,
    findByEmail,
    findByPhone,
    getImageUrl,
    validatePartnerData,
    searchByName,
    formatPhone
} = partnerService;