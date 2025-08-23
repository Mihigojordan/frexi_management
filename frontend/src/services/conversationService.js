import api from '../api/api'; // Adjust the path based on your project structure

/**
 * Conversation Service
 * Handles all conversation-related API calls
 */
class ConversationService {
  /**
   * Get or create a conversation for a specific user
   * @param {string} userId - The user ID
   * @returns {Promise} Axios response promise
   */
  async getOrCreateConversation(userId) {
    try {
      const response = await api.get(`/conversations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting or creating conversation:', error);
      throw error;
    }
  }

  /**
   * Get all conversations (typically for admin users)
   * @returns {Promise} Axios response promise
   */
  async getAllConversations() {
    try {
      const response = await api.get('/conversations');
      return response.data;
    } catch (error) {
      console.error('Error getting all conversations:', error);
      throw error;
    }
  }

  /**
   * Get a specific conversation by ID
   * @param {string} conversationId - The conversation ID
   * @returns {Promise} Axios response promise
   */
  async getConversationById(conversationId) {
    try {
      const response = await api.get(`/conversations/id/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting conversation by ID:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const conversationService = new ConversationService();
export default conversationService;