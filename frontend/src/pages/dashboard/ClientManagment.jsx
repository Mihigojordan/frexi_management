import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  User,
  Mail,
  Phone,
  Check,
  AlertTriangle,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  Globe,
  MessageSquare,
  Quote,
} from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import clientService from "../../services/clientSevice";

// Add/Edit Client Modal Component
const AddEditClientModal = ({ isOpen, onClose, onSubmit, client, isLoading, isEdit }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (client && isEdit) {
      setFormData({
        firstname: client.firstname || '',
        lastname: client.lastname || '',
        email: client.email || '',
        phoneNumber: client.phoneNumber || '',
      });
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
      });
    }
    setErrors({});
    setValidationErrors([]);
  }, [client, isEdit, isOpen]);

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

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phoneNumber: value || '' }));
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.firstname?.trim()) {
      errors.push('First name is required');
    }
    if (!formData.lastname?.trim()) {
      errors.push('Last name is required');
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Invalid email format');
    }
    if (formData.phoneNumber && formData.phoneNumber.length < 10) {
      errors.push('Phone number must be valid');
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
            {isEdit ? 'Edit Client' : 'Add New Client'}
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

          {/* First Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter last name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter email"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="RW"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Enter phone number "
            />
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
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <RefreshCw size={16} className="animate-spin" />}
              {isEdit ? 'Update' : 'Add'} Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Client Modal Component
const DeleteClientModal = ({ isOpen, onClose, onConfirm, client, isLoading }) => {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Client</h3>
              <p className="text-gray-600">This action cannot be undone.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              Are you sure you want to delete the client <strong>{client.firstname} {client.lastname}</strong>?
              This will permanently remove the client data.
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
              Delete Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// View Client Modal Component
const ViewClientModal = ({ isOpen, onClose, client, testimonials }) => {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Client Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Client Info */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-3xl mx-auto mb-3">
              {client.firstname?.charAt(0)?.toUpperCase() || <User size={32} />}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {client.firstname} {client.lastname}
            </h3>
            {client.email && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <Mail size={16} />
                {client.email}
              </div>
            )}
            {client.phoneNumber && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <Phone size={16} />
                {client.phoneNumber}
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date Added</p>
                <p className="text-gray-900">
                  {new Date(client.createdAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          {testimonials && testimonials.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Testimonials</h4>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
                    <Quote className="absolute top-2 left-2 text-gray-300" size={20} />
                    <p className="text-gray-800 italic pl-6">
                      "{testimonial.message || 'No message.'}"
                    </p>
                    <div className="flex justify-end mt-2 text-sm text-gray-600">
                      Rating: {testimonial.rating}/5
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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

// Main Client Management Component
const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch all clients
  const fetchClients = async (showRefreshLoader = false) => {
    if (showRefreshLoader) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await clientService.getAllClients();
      setClients(data);
      setFilteredClients(data);

      // Fetch stats
      const statsData = await clientService.getClientStats();
      setStats(statsData);

      if (showRefreshLoader) {
        showNotification("Clients refreshed successfully!");
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Enhanced search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(
        (client) =>
          client.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, clients]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredClients.slice(startIndex, endIndex);

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

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsAddModalOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteClient = (client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const handleViewClient = async (client) => {
    setSelectedClient(client);
    try {
      const testimonials = await clientService.getClientTestimonials(client.id);
      setSelectedTestimonials(testimonials);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setSelectedTestimonials([]);
    }
    setIsViewModalOpen(true);
  };

  // Handle form submission
  const handleClientSubmit = async (clientData) => {
    setIsLoading(true);
    try {
      if (selectedClient) {
        // Update existing client
        const updatedClient = await clientService.updateClient(
          selectedClient.id,
          clientData
        );
        setClients((prev) =>
          prev.map((c) =>
            c.id === selectedClient.id ? { ...c, ...updatedClient } : c
          )
        );
        showNotification("Client updated successfully!");
      } else {
        // Create new client
        const newClient = await clientService.createClient(clientData);
        setClients((prev) => [...prev, newClient]);
        showNotification("Client added successfully!");
      }

      // Close modals and reset state
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setSelectedClient(null);

      // Refresh stats
      const statsData = await clientService.getClientStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to save client:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle client deletion
  const handleConfirmDelete = async () => {
    if (!selectedClient) return;

    setIsLoading(true);
    try {
      await clientService.deleteClient(selectedClient.id);
      setClients((prev) =>
        prev.filter((client) => client.id !== selectedClient.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedClient(null);
      showNotification("Client deleted successfully!");

      // Refresh stats
      const statsData = await clientService.getClientStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to delete client:", error);
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
    setSelectedClient(null);
    setSelectedTestimonials([]);
  };

  // Pagination Component
  const PaginationComponent = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredClients.length)} of{" "}
          {filteredClients.length} entries
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
                    ? "bg-primary-600 text-white"
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
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">With Both Names</p>
              <p className="text-2xl font-bold text-gray-900">{stats.withBothNames}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Clients (30 days)</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recentClients}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
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
        {currentItems.map((client, index) => (
          <div
            key={client.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Client Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {client.firstname?.charAt(0)?.toUpperCase() || <User size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-gray-900 truncate"
                      title={`${client.firstname} ${client.lastname}`}
                    >
                      {client.firstname} {client.lastname}
                    </h3>
                    {client.email && (
                      <p className="text-sm text-gray-600 truncate" title={client.email}>
                        {client.email}
                      </p>
                    )}
                    {client.phoneNumber && (
                      <p className="text-sm text-gray-600 truncate" title={client.phoneNumber}>
                        {client.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewClient(client)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="View client"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditClient(client)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit client"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete client"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  <span>Added {formatDate(client.createdAt)}</span>
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
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
            {currentItems.map((client, index) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {startIndex + index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {client.firstname?.charAt(0)?.toUpperCase() || <User size={16} />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {client.firstname} {client.lastname}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Mail size={14} className="text-gray-400" />
                    {client.email || 'Not specified'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Phone size={14} className="text-gray-400" />
                    {client.phoneNumber || 'Not specified'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(client.createdAt)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewClient(client)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditClient(client)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client)}
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
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Client Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage your clients and their details
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
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchClients(true)}
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
                onClick={handleAddClient}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus size={20} />
                Add Client
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && !isRefreshing ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-primary-600" />
              <p className="text-gray-600">Loading clients...</p>
            </div>
          </div>
        ) : filteredClients.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No clients found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first client."}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddClient}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Client
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
        <AddEditClientModal
          client={selectedClient}
          isLoading={isLoading}
          isEdit={isEditModalOpen}
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={closeAllModals}
          onSubmit={handleClientSubmit}
        />

        <ViewClientModal
          isOpen={isViewModalOpen}
          onClose={closeAllModals}
          client={selectedClient}
          testimonials={selectedTestimonials}
        />

        <DeleteClientModal
          isOpen={isDeleteModalOpen}
          onClose={closeAllModals}
          onConfirm={handleConfirmDelete}
          client={selectedClient}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ClientManagement;