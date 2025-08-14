import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Star,
  Image,
  Check,
  AlertTriangle,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Mail,
  MessageSquare,
  X,
  Upload,
  Quote,
} from "lucide-react";
import testimonialService from "../../services/testimonialServices";

// Add/Edit Testimonial Modal Component
const AddEditTestimonialModal = ({ isOpen, onClose, onSubmit, testimonial, isLoading, isEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    message: '',
    rating: 5,
    imageUrl: null
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (testimonial && isEdit) {
      setFormData({
        name: testimonial.name || '',
        position: testimonial.position || '',
        message: testimonial.message || '',
        rating: testimonial.rating || 5,
        imageUrl: null // Reset file input for security
      });
      setImagePreview(testimonial.imageUrl || null);
    } else {
      setFormData({
        name: '',
        position: '',
        message: '',
        rating: 5,
        imageUrl: null
      });
      setImagePreview(null);
    }
    setErrors({});
    setValidationErrors([]);
  }, [testimonial, isEdit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic file validation
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setValidationErrors(['Image file size must be less than 5MB']);
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setValidationErrors(['Image must be JPEG, PNG, GIF, or WebP format']);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({ ...prev, imageUrl: file }));
      };
      reader.readAsDataURL(file);
      setValidationErrors([]);
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name?.trim()) {
      errors.push('Customer name is required');
    }
    if (!formData.message?.trim()) {
      errors.push('Testimonial message is required');
    }
    if (formData.rating < 1 || formData.rating > 5) {
      errors.push('Rating must be between 1 and 5 stars');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (validation.length > 0) {
      setValidationErrors(validation);
      return;
    }

    await onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Please fix the following errors:</h4>
                  <ul className="text-sm text-red-700 mt-1 list-disc list-inside">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div className="text-center">
            <div className="relative inline-block">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                  <Image size={32} className="text-gray-400" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Upload size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Customer photo (optional) - JPEG, PNG, GIF, WebP (max 5MB)
            </p>
          </div>

          {/* Customer Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter customer name"
            />
          </div>

          {/* Position Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position/Title
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position or title (optional)"
            />
          </div>

          {/* Rating Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`p-1 rounded transition-colors ${
                    star <= formData.rating
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star size={24} fill={star <= formData.rating ? 'currentColor' : 'none'} />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">({formData.rating} star{formData.rating !== 1 ? 's' : ''})</span>
            </div>
          </div>

          {/* Testimonial Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Testimonial Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              maxLength={400}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the testimonial message..."
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.message.length}/400 characters
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <RefreshCw size={16} className="animate-spin" />}
              {isEdit ? 'Update' : 'Add'} Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Testimonial Modal Component
const DeleteTestimonialModal = ({ isOpen, onClose, onConfirm, testimonial, isLoading }) => {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Testimonial</h3>
              <p className="text-gray-600">This action cannot be undone.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              Are you sure you want to delete the testimonial from <strong>{testimonial.name}</strong>?
              This will permanently remove the testimonial data.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <RefreshCw size={16} className="animate-spin" />}
              Delete Testimonial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// View Testimonial Modal Component
const ViewTestimonialModal = ({ isOpen, onClose, testimonial }) => {
  if (!isOpen || !testimonial) return null;

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Testimonial Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {/* Customer Image */}
          <div className="text-center mb-6">
            {testimonial.imageUrl ? (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-2xl mx-auto">
                {testimonial.name?.charAt(0)?.toUpperCase() || <User size={32} />}
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mt-3">
              {testimonial.name || 'Anonymous'}
            </h3>
            {testimonial.position && (
              <p className="text-gray-600 text-sm mt-1">{testimonial.position}</p>
            )}
            <div className="flex justify-center mt-2">
              {renderStars(testimonial.rating || 0)}
              <span className="ml-2 text-sm text-gray-600">({testimonial.rating || 0}/5)</span>
            </div>
          </div>

          {/* Testimonial Message */}
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4 relative">
              <Quote className="absolute top-2 left-2 text-gray-300" size={20} />
              <p className="text-gray-800 italic pl-6">
                "{testimonial.message || 'No testimonial message provided.'}"
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date Added</p>
                <p className="text-gray-900">
                  {new Date(testimonial.createdAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Testimonial Management Component
const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch all testimonials
  const fetchTestimonials = async (showRefreshLoader = false) => {
    if (showRefreshLoader) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await testimonialService.getAllTestimonials();
      setTestimonials(data);
      setFilteredTestimonials(data);

      // Fetch stats
      const statsData = await testimonialService.getTestimonialStats();
      setStats(statsData);

      if (showRefreshLoader) {
        showNotification("Testimonials refreshed successfully!");
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Enhanced search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTestimonials(testimonials);
    } else {
      const filtered = testimonials.filter(
        (testimonial) =>
          testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          testimonial.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          testimonial.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTestimonials(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, testimonials]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTestimonials.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddTestimonial = () => {
    setSelectedTestimonial(null);
    setIsAddModalOpen(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditModalOpen(true);
  };

  const handleDeleteTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteModalOpen(true);
  };

  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  // Handle form submission
  const handleTestimonialSubmit = async (testimonialData) => {
    setIsLoading(true);
    try {
      if (selectedTestimonial) {
        // Update existing testimonial
        const updatedTestimonial = await testimonialService.updateTestimonial(
          selectedTestimonial.id,
          testimonialData,
          testimonialData.imageUrl
        );
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === selectedTestimonial.id ? { ...t, ...updatedTestimonial } : t
          )
        );
        showNotification("Testimonial updated successfully!");
      } else {
        // Create new testimonial
        const newTestimonial = await testimonialService.createTestimonial(
          testimonialData,
          testimonialData.imageUrl
        );
        setTestimonials((prev) => [...prev, newTestimonial]);
        showNotification("Testimonial added successfully!");
      }

      // Close modals and reset state
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setSelectedTestimonial(null);

      // Refresh stats
      const statsData = await testimonialService.getTestimonialStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to save testimonial:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle testimonial deletion
  const handleConfirmDelete = async () => {
    if (!selectedTestimonial) return;

    setIsLoading(true);
    try {
      await testimonialService.deleteTestimonial(selectedTestimonial.id);
      setTestimonials((prev) =>
        prev.filter((testimonial) => testimonial.id !== selectedTestimonial.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedTestimonial(null);
      showNotification("Testimonial deleted successfully!");

      // Refresh stats
      const statsData = await testimonialService.getTestimonialStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const closeAllModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedTestimonial(null);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  // Pagination Component
  const PaginationComponent = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredTestimonials.length)} of{" "}
          {filteredTestimonials.length} entries
        </p>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-2 text-sm border rounded-md transition-colors ${
              currentPage === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-1 mx-2">
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-2 text-sm border rounded-md transition-colors ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );

  // Statistics Component
  const StatsComponent = () => (
    stats && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Testimonials</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
                <div className="flex gap-1">
                  {renderStars(Math.round(stats.averageRating))}
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">With Images</p>
              <p className="text-2xl font-bold text-gray-900">{stats.withImages}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Image className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Card View Component (Mobile/Tablet)
  const CardView = () => (
    <div className="md:hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {currentItems.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Customer Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 object-cover rounded-full shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{
                      display: testimonial.imageUrl ? "none" : "flex",
                    }}
                  >
                    {testimonial.name?.charAt(0)?.toUpperCase() || (
                      <User size={24} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-gray-900 truncate"
                      title={testimonial.name}
                    >
                      {testimonial.name || "Anonymous"}
                    </h3>
                    {testimonial.position && (
                      <p className="text-sm text-gray-600 truncate" title={testimonial.position}>
                        {testimonial.position}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(testimonial.rating || 0)}
                      <span className="text-xs text-gray-500">({testimonial.rating || 0}/5)</span>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewTestimonial(testimonial)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="View testimonial"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditTestimonial(testimonial)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit testimonial"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete testimonial"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Testimonial Message */}
              <div className="mb-4">
                <div className="bg-gray-50 rounded-lg p-3 relative">
                  <Quote className="absolute top-2 left-2 text-gray-300" size={16} />
                  <p className="text-sm text-gray-700 italic pl-5 line-clamp-3">
                    "{testimonial.message || 'No testimonial message provided.'}"
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  <span>Added {formatDate(testimonial.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination for Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <PaginationComponent />
      </div>
    </div>
  );

  // Table View Component (Desktop)
  const TableView = () => (
    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((testimonial, index) => (
              <tr
                key={testimonial.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {startIndex + index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {testimonial.imageUrl ? (
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="w-10 h-10 object-cover rounded-full shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{
                        display: testimonial.imageUrl ? "none" : "flex",
                      }}
                    >
                      {testimonial.name?.charAt(0)?.toUpperCase() || (
                        <User size={16} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {testimonial.name || "Anonymous"}
                      </div>
                      {testimonial.position && (
                        <div className="text-sm text-gray-500">
                          {testimonial.position}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {renderStars(testimonial.rating || 0)}
                    <span className="text-sm text-gray-600">({testimonial.rating || 0}/5)</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 line-clamp-2" title={testimonial.message}>
                      "{testimonial.message || 'No testimonial message provided.'}"
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {testimonial.position || "Not specified"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(testimonial.createdAt)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewTestimonial(testimonial)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent />
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 h-[90vh] sm:p-6 lg:p-8">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } animate-in slide-in-from-top-2 duration-300`}
        >
          {notification.type === "success" ? (
            <Check size={16} />
          ) : (
            <AlertTriangle size={16} />
          )}
          {notification.message}
        </div>
      )}

      <div className="h-full overflow-y-auto mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Testimonial Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage customer testimonials and reviews
          </p>
        </div>

        {/* Statistics */}
        <StatsComponent />

        {/* Search and Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search testimonials by name, position, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchTestimonials(true)}
                disabled={isRefreshing}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
              >
                <RefreshCw
                  size={18}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>
              <button
                onClick={handleAddTestimonial}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus size={20} />
                Add Testimonial
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && !isRefreshing ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No testimonials found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first testimonial."}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddTestimonial}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Testimonial
              </button>
            )}
          </div>
        ) : (
          <>
            <CardView />
            <TableView />
          </>
        )}

        {/* Modals */}
        <AddEditTestimonialModal
          testimonial={selectedTestimonial}
          isLoading={isLoading}
          isEdit={isEditModalOpen}
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={closeAllModals}
          onSubmit={handleTestimonialSubmit}
        />

        <ViewTestimonialModal
          isOpen={isViewModalOpen}
          onClose={closeAllModals}
          testimonial={selectedTestimonial}
        />

        <DeleteTestimonialModal
          isOpen={isDeleteModalOpen}
          onClose={closeAllModals}
          onConfirm={handleConfirmDelete}
          testimonial={selectedTestimonial}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default TestimonialManagement;