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
} from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import employeeService from "../../services/employeeService";

// Add/Edit Employee Modal Component
const AddEditEmployeeModal = ({ isOpen, onClose, onSubmit, employee, isLoading, isEdit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: '',
  });
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  useEffect(() => {
    if (employee && isEdit) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        address: employee.address || '',
        profilePhoto: employee.profilePhoto || '',
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        profilePhoto: '',
      });
    }
    setErrors({});
    setValidationErrors([]);
    setProfilePhotoFile(null);
  }, [employee, isEdit, isOpen]);

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
    setFormData(prev => ({ ...prev, phone: value || '' }));
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const previewUrl = employeeService.generateImagePreview(file);
        setProfilePhotoFile(file);
        setFormData(prev => ({ ...prev, profilePhoto: previewUrl }));
      } catch (error) {
        setValidationErrors([error.message]);
      }
    }
  };

  const validateForm = () => {
    return employeeService.validateEmployeeData({ ...formData, profilePhoto: profilePhotoFile }).errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    const submitData = new FormData();
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('address', formData.address);
    if (profilePhotoFile) submitData.append('profilePhoto', profilePhotoFile);

    await onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

          {/* Profile Photo Field */}
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <div className="relative w-32 h-32 mb-4">
              {formData.profilePhoto ? (
                <img
                  src={formData.profilePhoto}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = '/images/fallback.png'; // Fallback image
                    console.error('Failed to load profile photo');
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                  <User size={48} className="text-gray-400" />
                </div>
              )}
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700 transition-colors"
              >
                <Edit3 size={16} />
                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Upload a JPEG or PNG image (optional)
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* First Name and Last Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
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
                Phone Number *
              </label>
              <PhoneInput
                international
                defaultCountry="US"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter address"
              />
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
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <RefreshCw size={16} className="animate-spin" />}
              {isEdit ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Employee Modal Component
const DeleteEmployeeModal = ({ isOpen, onClose, onConfirm, employee, isLoading }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Employee</h3>
              <p className="text-gray-600">This action cannot be undone.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              Are you sure you want to delete the employee <strong>{employee.firstName} {employee.lastName}</strong>?
              This will permanently remove the employee data.
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
              Delete Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// View Employee Modal Component
const ViewEmployeeModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Employee Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
              {employee.profilePhoto ? (
                <img
                  src={employee.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/fallback.png'; // Fallback image
                    console.error('Failed to load profile photo');
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold text-3xl">
                  {employee.firstName?.charAt(0)?.toUpperCase() || <User size={32} />}
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h3>
            {employee.email && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <Mail size={16} />
                {employee.email}
              </div>
            )}
            {employee.phone && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <Phone size={16} />
                {employee.phone}
              </div>
            )}
            {employee.address && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <Globe size={16} />
                {employee.address}
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
                  {new Date(employee.createdAt || Date.now()).toLocaleDateString('en-US', {
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

// Main Employee Management Component
const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch all employees
  const fetchEmployees = async (showRefreshLoader = false) => {
    if (showRefreshLoader) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);

      // Fetch stats
      const statsData = await employeeService.getEmployeeStats();
      setStats(statsData);

      if (showRefreshLoader) {
        showNotification("Employees refreshed successfully!");
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Enhanced search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, employees]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEmployees.slice(startIndex, endIndex);

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

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsAddModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  // Handle form submission
  const handleEmployeeSubmit = async (employeeData) => {
    setIsLoading(true);
    try {
      if (selectedEmployee) {
        // Update existing employee
        const updatedEmployee = await employeeService.updateEmployee(
          selectedEmployee.id,
          employeeData
        );
        setEmployees((prev) =>
          prev.map((e) =>
            e.id === selectedEmployee.id ? { ...e, ...updatedEmployee } : e
          )
        );
        showNotification("Employee updated successfully!");
      } else {
        // Create new employee
        const newEmployee = await employeeService.createEmployee(employeeData);
        setEmployees((prev) => [...prev, newEmployee]);
        showNotification("Employee added successfully!");
      }

      // Close modals and reset state
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setSelectedEmployee(null);

      // Refresh stats
      const statsData = await employeeService.getEmployeeStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to save employee:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle employee deletion
  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;

    setIsLoading(true);
    try {
      await employeeService.deleteEmployee(selectedEmployee.id);
      setEmployees((prev) =>
        prev.filter((employee) => employee.id !== selectedEmployee.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
      showNotification("Employee deleted successfully!");

      // Refresh stats
      const statsData = await employeeService.getEmployeeStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to delete employee:", error);
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
    setSelectedEmployee(null);
  };

  // Pagination Component
  const PaginationComponent = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredEmployees.length)} of{" "}
          {filteredEmployees.length} entries
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
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
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
              <p className="text-sm font-medium text-gray-600">Recent Employees (30 days)</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recentEmployees}</p>
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
        {currentItems.map((employee, index) => (
          <div
            key={employee.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Employee Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                    {employee.profilePhoto ? (
                      <img
                        src={employee.profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/fallback.png'; // Fallback image
                          console.error('Failed to load profile photo');
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                        {employee.firstName?.charAt(0)?.toUpperCase() || <User size={24} />}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-gray-900 truncate"
                      title={`${employee.firstName} ${employee.lastName}`}
                    >
                      {employee.firstName} {employee.lastName}
                    </h3>
                    {employee.email && (
                      <p className="text-sm text-gray-600 truncate" title={employee.email}>
                        {employee.email}
                      </p>
                    )}
                    {employee.phone && (
                      <p className="text-sm text-gray-600 truncate" title={employee.phone}>
                        {employee.phone}
                      </p>
                    )}
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewEmployee(employee)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="View employee"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit employee"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete employee"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  <span>Added {formatDate(employee.createdAt)}</span>
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
            {currentItems.map((employee, index) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {startIndex + index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                      {employee.profilePhoto ? (
                        <img
                          src={employee.profilePhoto}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/fallback.png'; // Fallback image
                            console.error('Failed to load profile photo');
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {employee.firstName?.charAt(0)?.toUpperCase() || <User size={16} />}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Mail size={14} className="text-gray-400" />
                    {employee.email || 'Not specified'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Phone size={14} className="text-gray-400" />
                    {employee.phone || 'Not specified'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(employee.createdAt)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewEmployee(employee)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditEmployee(employee)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee)}
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
              Employee Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage your employees and their details
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
                placeholder="Search employees by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchEmployees(true)}
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
                onClick={handleAddEmployee}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus size={20} />
                Add Employee
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && !isRefreshing ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-primary-600" />
              <p className="text-gray-600">Loading employees...</p>
            </div>
          </div>
        ) : filteredEmployees.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first employee."}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddEmployee}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Employee
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
        <AddEditEmployeeModal
          employee={selectedEmployee}
          isLoading={isLoading}
          isEdit={isEditModalOpen}
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={closeAllModals}
          onSubmit={handleEmployeeSubmit}
        />

        <ViewEmployeeModal
          isOpen={isViewModalOpen}
          onClose={closeAllModals}
          employee={selectedEmployee}
        />

        <DeleteEmployeeModal
          isOpen={isDeleteModalOpen}
          onClose={closeAllModals}
          onConfirm={handleConfirmDelete}
          employee={selectedEmployee}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;