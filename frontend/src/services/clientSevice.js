import api from '../api/api'; // Your axios instance

/**
 * Client Service - Handles all client-related API operations
 */
class ClientService {
  constructor() {
    this.baseEndpoint = '/clients';
  }

  /**
   * Create a new client
   * @param {Object} clientData - Client data { firstname?, lastname?, email, phoneNumber }
   * @returns {Promise<Object>} Created client
   */
  async createClient(clientData) {
    try {
      const response = await api.post(this.baseEndpoint, clientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create client');
    }
  }

  /**
   * Update a client
   * @param {string} id - Client ID
   * @param {Object} clientData - Updated client data { firstname?, lastname?, email?, phoneNumber? }
   * @returns {Promise<Object>} Updated client
   */
  async updateClient(id, clientData) {
    try {
      const response = await api.put(`${this.baseEndpoint}/${id}`, clientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update client with ID: ${id}`);
    }
  }

  /**
   * Get all clients
   * @returns {Promise<Array>} Array of all clients
   */
  async getAllClients() {
    try {
      const response = await api.get(this.baseEndpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch clients');
    }
  }

  /**
   * Get a single client by ID
   * @param {string} id - Client ID
   * @returns {Promise<Object>} Client object
   */
  async getClientById(id) {
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch client with ID: ${id}`);
    }
  }

  /**
   * Delete a client permanently
   * @param {string} id - Client ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteClient(id) {
    try {
      const response = await api.delete(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete client with ID: ${id}`);
    }
  }

  /**
   * Get clients with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} filters - Additional filters (e.g., status, company, etc.)
   * @returns {Promise<Object>} Paginated clients result
   */
  async getClientsPaginated(page = 1, limit = 10, filters = {}) {
    try {
      const params = { page, limit, ...filters };
      const response = await api.get(this.baseEndpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch paginated clients');
    }
  }

  /**
   * Search clients by name, email, or phone number
   * @param {string} searchTerm - Search term
   * @param {Object} options - Search options (limit, etc.)
   * @returns {Promise<Array>} Array of matching clients
   */
  async searchClients(searchTerm, options = {}) {
    try {
      const params = { search: searchTerm, ...options };
      const response = await api.get(`${this.baseEndpoint}/search`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to search clients');
    }
  }

  /**
   * Get client statistics
   * @returns {Promise<Object>} Client statistics
   */
  async getClientStats() {
    try {
      const allClients = await this.getAllClients();
      
      const stats = {
        total: allClients.length,
        withFirstName: allClients.filter((client) => client.firstname).length,
        withLastName: allClients.filter((client) => client.lastname).length,
        withBothNames: allClients.filter((client) => client.firstname && client.lastname).length,
        recentClients: allClients.filter((client) => {
          const createdDate = new Date(client.createdAt);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return createdDate >= thirtyDaysAgo;
        }).length,
      };

      return stats;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch client statistics');
    }
  }

  /**
   * Get clients by email domain
   * @param {string} domain - Email domain (e.g., 'gmail.com')
   * @returns {Promise<Array>} Array of clients with specified email domain
   */
  async getClientsByEmailDomain(domain) {
    try {
      const response = await api.get(`${this.baseEndpoint}/domain/${domain}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch clients with email domain: ${domain}`);
    }
  }

  /**
   * Get clients by creation date range
   * @param {string} startDate - Start date (ISO string)
   * @param {string} endDate - End date (ISO string)
   * @returns {Promise<Array>} Array of clients created within date range
   */
  async getClientsByDateRange(startDate, endDate) {
    try {
      const params = { startDate, endDate };
      const response = await api.get(`${this.baseEndpoint}/date-range`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch clients for date range: ${startDate} to ${endDate}`);
    }
  }

  /**
   * Get client testimonials/reviews
   * @param {string} clientId - Client ID
   * @returns {Promise<Array>} Array of client testimonials
   */
  async getClientTestimonials(clientId) {
    try {
      const response = await api.get(`${this.baseEndpoint}/${clientId}/testimonials`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch testimonials for client ID: ${clientId}`);
    }
  }

  /**
   * Export clients data
   * @param {Object} filters - Export filters
   * @param {string} format - Export format (csv, xlsx, pdf)
   * @returns {Promise<Blob>} Export file blob
   */
  async exportClients(filters = {}, format = 'csv') {
    try {
      const response = await api.get(`${this.baseEndpoint}/export`, {
        params: { ...filters, format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to export clients');
    }
  }

  /**
   * Error handler helper
   * @param {Error} error - The error object
   * @param {string} defaultMessage - Default error message
   * @returns {Error} Formatted error
   */
  handleError(error, defaultMessage) {
    console.error(`Client Service Error: ${defaultMessage}`, error);

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
const clientService = new ClientService();
export default clientService;

// Named exports for specific methods if needed
export const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientsPaginated,
  searchClients,
  getClientStats,
  getClientsByEmailDomain,
  getClientsByDateRange,
  getClientTestimonials,
  exportClients,
} = clientService;