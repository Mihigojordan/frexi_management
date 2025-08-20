import api from '../api/api'; // Adjust the import path as needed

/**
 * User Auth Service
 * Handles all user authentication-related API calls
 */
class UserAuthService {
    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @param {string} userData.firstname - User's first name (optional)
     * @param {string} userData.lastname - User's last name (optional)
     * @param {string} userData.email - User's email address
     * @param {string} userData.phoneNumber - User's phone number
     * @param {string} userData.password - User's password
     * @returns {Promise<Object>} Response with success message and user ID
     */
    async registerUser(userData) {
        try {
            const response = await api.post('/users/register', userData);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to register user';

            throw new Error(errorMessage);
        }
    }

    /**
     * User login
     * @param {Object} loginData - User login data
     * @param {string} loginData.email - User's email address
     * @param {string} loginData.password - User's password
     * @returns {Promise<Object>} Response with JWT token
     */
    async userLogin(loginData) {
        try {
            const response = await api.post('/users/login', loginData);
            return response.data;
        } catch (error) {
            console.error('Error logging in user:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to login user';

            throw new Error(errorMessage);
        }
    }

    /**
     * User logout
     * @returns {Promise<Object>} Response with success message
     */
    async logout() {
        try {
            const response = await api.post('/users/logout');
            return response.data;
        } catch (error) {
            console.error('Error logging out user:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to logout user';

            throw new Error(errorMessage);
        }
    }

    /**
     * Get user profile
     * @returns {Promise<Object|null>} User profile object or null if not found
     */
    async getUserProfile() {
        try {
            const response = await api.get('/users/me');
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // User not found
            }

            console.error('Error fetching user profile:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to fetch user profile';

            throw new Error(errorMessage);
        }
    }

    /**
     * Update user profile
     * @param {Object} profileData - Profile data to update
     * @param {string} profileData.firstname - User's first name (optional)
     * @param {string} profileData.lastname - User's last name (optional)
     * @param {string} profileData.phoneNumber - User's phone number (optional)
     * @returns {Promise<Object>} Response with updated profile
     */
    async updateUserProfile(profileData) {
        try {
            const response = await api.put('/users/edit', profileData);
            return response.data;
        } catch (error) {
            console.error('Error updating user profile:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to update user profile';

            throw new Error(errorMessage);
        }
    }

    /**
     * Change user password
     * @param {Object} passwordData - Password change data
     * @param {string} passwordData.oldPassword - User's current password
     * @param {string} passwordData.newPassword - User's new password
     * @returns {Promise<Object>} Response with success message
     */
    async changeUserPassword(passwordData) {
        try {
            const response = await api.patch('/users/me/password', passwordData);
            return response.data;
        } catch (error) {
            console.error('Error changing user password:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to change user password';

            throw new Error(errorMessage);
        }
    }

    /**
     * Delete user account
     * @returns {Promise<Object>} Response with success message
     */
    async deleteUserAccount() {
        try {
            const response = await api.delete('/users/me');
            return response.data;
        } catch (error) {
            console.error('Error deleting user account:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to delete user account';

            throw new Error(errorMessage);
        }
    }

    /**
     * Find user by email (if available via API)
     * @param {string} email - User's email
     * @returns {Promise<Object|null>} User object or null if not found
     */
    async findUserByEmail(email) {
        try {
            const response = await api.get(`/users/by-email/${email}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // User not found
            }

            console.error('Error finding user by email:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to find user';

            throw new Error(errorMessage);
        }
    }

    /**
     * Find user by ID (if available via API)
     * @param {string} id - User's ID
     * @returns {Promise<Object|null>} User object or null if not found
     */
    async findUserById(id) {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // User not found
            }

            console.error('Error finding user by ID:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to find user';

            throw new Error(errorMessage);
        }
    }

    /**
     * Validate user registration data before sending to backend
     * @param {Object} userData - User data to validate
     * @returns {Object} Validation result with isValid boolean and errors array
     */
    validateUserRegistrationData(userData) {
        const errors = [];

        if (!userData.email) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(userData.email)) {
            errors.push('Email format is invalid');
        }

        if (!userData.phoneNumber?.trim()) {
            errors.push('Phone number is required');
        } else if (!this.isValidPhoneNumber(userData.phoneNumber)) {
            errors.push('Phone number format is invalid');
        }

        if (!userData.password) {
            errors.push('Password is required');
        } else if (userData.password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        // Optional fields validation
        if (userData.firstname && userData.firstname.trim().length < 2) {
            errors.push('First name must be at least 2 characters long');
        }

        if (userData.lastname && userData.lastname.trim().length < 2) {
            errors.push('Last name must be at least 2 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate user login data
     * @param {Object} loginData - Login data to validate
     * @returns {Object} Validation result with isValid boolean and errors array
     */
    validateUserLoginData(loginData) {
        const errors = [];

        if (!loginData.email) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(loginData.email)) {
            errors.push('Email format is invalid');
        }

        if (!loginData.password) {
            errors.push('Password is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate profile update data
     * @param {Object} profileData - Profile data to validate
     * @returns {Object} Validation result with isValid boolean and errors array
     */
    validateProfileUpdateData(profileData) {
        const errors = [];

        if (profileData.firstname && profileData.firstname.trim().length < 2) {
            errors.push('First name must be at least 2 characters long');
        }

        if (profileData.lastname && profileData.lastname.trim().length < 2) {
            errors.push('Last name must be at least 2 characters long');
        }

        if (profileData.phoneNumber && !this.isValidPhoneNumber(profileData.phoneNumber)) {
            errors.push('Phone number format is invalid');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate password change data
     * @param {Object} passwordData - Password change data to validate
     * @returns {Object} Validation result with isValid boolean and errors array
     */
    validatePasswordChangeData(passwordData) {
        const errors = [];

        if (!passwordData.oldPassword) {
            errors.push('Current password is required');
        }

        if (!passwordData.newPassword) {
            errors.push('New password is required');
        } else if (passwordData.newPassword.length < 6) {
            errors.push('New password must be at least 6 characters long');
        }

        if (passwordData.oldPassword === passwordData.newPassword) {
            errors.push('New password must be different from current password');
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
     * @param {string} phoneNumber - Phone number to validate
     * @returns {boolean} True if phone number format is valid
     */
    isValidPhoneNumber(phoneNumber) {
        // Basic phone number validation - adjust regex based on your requirements
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ''));
    }
}

// Create and export a singleton instance
const userAuthService = new UserAuthService();
export default userAuthService;

// Named exports for individual methods if needed
export const {
    registerUser,
    userLogin,
    logout,
    getUserProfile,
    updateUserProfile,
    changeUserPassword,
    deleteUserAccount,
    findUserByEmail,
    findUserById,
    validateUserRegistrationData,
    validateUserLoginData,
    validateProfileUpdateData,
    validatePasswordChangeData
} = userAuthService;