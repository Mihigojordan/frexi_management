import { data } from 'react-router-dom';
import api from '../api/api'; // Assuming your api instance is in a separate file

// Blog Service for frontend
export const blogService = {
  // Create a new blog with image upload
  async createBlog(blogData, imageFile) {
    try {
      const formData = new FormData();
      console.log(blogData, imageFile);
      
      
      // Add text fields
      if (blogData.title) formData.append('title', blogData.title);
      if (blogData.description.details) formData.append('description', blogData.description.details); // Send as string
      if (blogData.authorId) formData.append('authorId', blogData.authorId);
      
      // Add image file
      if (imageFile) {
        formData.append('blogImg', imageFile);
      }

      const response = await api.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        data: response.data,
        message: 'Blog created successfully'
      };
    } catch (error) {
        console.log('Error creating blog:', error);
        
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to create blog',
        status: error.response?.status
      };
    }
  },

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
  },

    

  // Get all blogs
  async getAllBlogs() {
    try {
      const response = await api.get('/blogs');
      
      return {
        success: true,
        data: response.data,
        message: 'Blogs fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch blogs',
        status: error.response?.status
      };
    }
  },

  // Get single blog by ID
  async getBlogById(id) {
    try {
      const response = await api.get(`/blogs/${id}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Blog fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch blog',
        status: error.response?.status
      };
    }
  },

  // Update blog with optional image upload
  async updateBlog(id, blogData, imageFile = null) {
    try {
      const formData = new FormData();
      
      // Add text fields
      if (blogData.title) formData.append('title', blogData.title);
      if (blogData.description.details) formData.append('description', blogData.description.details); // Send as string
      if (blogData.authorId) formData.append('authorId', blogData.authorId);
      
      // Add image file if provided
      if (imageFile) {
        formData.append('blogImg', imageFile);
      }

      const response = await api.put(`/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        data: response.data,
        message: 'Blog updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update blog',
        status: error.response?.status
      };
    }
  },

  // Delete blog
  async deleteBlog(id) {
    try {
      const response = await api.delete(`/blogs/${id}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Blog deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to delete blog',
        status: error.response?.status
      };
    }
  },

  // Helper function to get full image URL
  getImageUrl(imagePath) {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // Otherwise, construct full URL with API base URL
    const API_URL = import.meta.env.VITE_API_URL;
    return `${API_URL}/${imagePath}`;
  }
};

export default blogService;