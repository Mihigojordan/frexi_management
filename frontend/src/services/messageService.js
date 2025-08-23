import api from '../api/api'; // Adjust the path based on your file structure

// Enum for SenderType (matching your backend)
export const SenderType = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

class MessageService {
  /**
   * Send a message with optional image
   * @param {Object} messageData - The message data
   * @param {string} messageData.conversationId - The conversation ID
   * @param {string} messageData.senderType - The sender type (USER or ADMIN)
   * @param {string} [messageData.senderAdminId] - Admin ID if sender is admin
   * @param {string} [messageData.senderUserId] - User ID if sender is user
   * @param {string} messageData.text - The message text
   * @param {File} [imageFile] - Optional image file
   * @returns {Promise} API response
   */
  async sendMessage(messageData, imageFile = null) {
    try {
      const formData = new FormData();
      
      // Append text data
      formData.append('senderType', messageData.senderType);
      formData.append('text', messageData.text);
      
      if (messageData.senderAdminId) {
        formData.append('senderAdminId', messageData.senderAdminId);
      }
      
      if (messageData.senderUserId) {
        formData.append('senderUserId', messageData.senderUserId);
      }
      
      // Append image file if provided
      if (imageFile) {
        formData.append('chatImg', imageFile);
      }

      const response = await api.post(`/messages/${messageData.conversationId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }


  /**
   * Get all messages for a conversation
   * @param {string} conversationId - The conversation ID
   * @returns {Promise} API response with messages array
   */
  async getMessages(conversationId) {
    try {
      const response = await api.get(`/messages/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }


}

// Create and export a singleton instance
const messageService = new MessageService();
export default messageService;

// Also export the class if needed for testing or multiple instances
export { MessageService };