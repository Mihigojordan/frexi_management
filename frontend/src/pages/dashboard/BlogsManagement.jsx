import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Image,
  Check,
  AlertTriangle,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  BookOpen,
  X,
  Upload,
  FileText,
} from "lucide-react";
import AddEditBlogModal from "../../components/dashboard/blog/AddEditBlogModal";
import DeleteBlogModal from "../../components/dashboard/blog/DeleteBlogModal";
// import ViewBlogModal from "../../components/dashboard/blog/ViewBlogModal";
import blogService from "../../services/blogServices";
import { useNavigate } from "react-router-dom";

// Main Blog Management Component
const BlogManagement = ( { role }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [, setIsViewModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,] = useState(5);

  const navigate = useNavigate();

  // Fetch all blogs using the real service
  const fetchBlogs = async (showRefreshLoader = false) => {
    if (showRefreshLoader) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await blogService.getAllBlogs();
      if (response.success) {
        setBlogs(response.data);
        setFilteredBlogs(response.data);

        if (showRefreshLoader) {
          showNotification("Blogs refreshed successfully!");
        }
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Enhanced search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description?.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author?.adminName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author?.adminEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, blogs]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredBlogs.slice(startIndex, endIndex);

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

  const handleAddBlog = () => {
    setSelectedBlog(null);
    setIsAddModalOpen(true);
    console.log("click to add");
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDeleteBlog = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleViewBlog = (blog) => {
    if(!blog.id) return showNotification("Blog ID is missing", "error");
    navigate( role == 'admin'? '/admin/dashboard/blogs/' + blog.id : '/employee/dashboard/blogs/' + blog.id  );
  };

  // Handle form submission using the real service
  const handleBlogSubmit = async (blogData) => {
    setIsLoading(true);
    try {
      let response;
      if (selectedBlog) {
        // Update existing blog
        response = await blogService.updateBlog(selectedBlog.id, blogData.formData, blogData.image);
      } else {
        // Create new blog
        response = await blogService.createBlog(blogData.formData, blogData.image);
      }

      if (response.success) {
        // Refresh the blogs list
        await fetchBlogs();
        showNotification(response.message);

        // Close modals and reset state
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedBlog(null);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to save blog:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle blog deletion using the real service
  const handleConfirmDelete = async () => {
    if (!selectedBlog) return;

    setIsLoading(true);
    try {
      const response = await blogService.deleteBlog(selectedBlog.id);
      if (response.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== selectedBlog.id));
        setIsDeleteModalOpen(false);
        setSelectedBlog(null);
        showNotification(response.message);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
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
    setSelectedBlog(null);
  };

  // Pagination Component
  const PaginationComponent = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredBlogs.length)} of{" "}
          {filteredBlogs.length} entries
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

  // Card View Component (Mobile/Tablet)
  const CardView = () => (
    <div className="md:hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {currentItems.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Blog Header */}
              <div className="flex items-start flex-wrap justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {blogService.getImageUrl(blog.imageUrl) ? (
                    <img
                      src={blogService.getImageUrl(blog.imageUrl)}
                      alt={blog.title}
                      className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
                    style={{
                      display: blogService.getImageUrl(blog.imageUrl) ? "none" : "flex",
                    }}
                  >
                    <BookOpen size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-gray-900 truncate"
                      title={blog.title}
                    >
                      {blog.title || "Untitled Blog"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      By {blog.author?.name || "Unknown Author"}
                    </p>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewBlog(blog)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="View blog"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditBlog(blog)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit blog"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete blog"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Blog Description */}
              <div className="mb-4">
                <div
                      className="text-sm text-gray-600 truncate line-clamp-1"
                      title={blog.title}
                      dangerouslySetInnerHTML={{ __html: blogService.parseDescription(blog.description?.details)  }}
                    />
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} />
                    <span>Created {formatDate(blog.createdAt)}</span>
                  </div>
                  {blog.updatedAt !== blog.createdAt && (
                    <div className="flex items-center gap-1">
                      <span>Updated {formatDate(blog.updatedAt)}</span>
                    </div>
                  )}
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
                Blog
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((blog, index) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {startIndex + index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {blogService.getImageUrl(blog.imageUrl) ? (
                      <img
                        src={blogService.getImageUrl(blog.imageUrl)}
                        alt={blog.title}
                        className="w-10 h-10 object-cover rounded-lg shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold"
                      style={{
                        display: blogService.getImageUrl(blog.imageUrl)
                          ? "none"
                          : "flex",
                      }}
                    >
                      <BookOpen size={16} />
                    </div>
                    <div className="max-w-xs">
                      <div className="font-medium text-gray-900 truncate" title={blog.title}>
                        {blog.title || "Untitled Blog"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {blog.author?.adminName || "Unknown"}
                      </div>
                     
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <div
                      className="text-sm text-gray-600 truncate line-clamp-1"
                      title={blog.title}
                      dangerouslySetInnerHTML={{ __html: blogService.parseDescription(blog.description?.details)  }}
                    />
                      
                    
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {blog.updatedAt !== blog.createdAt
                        ? formatDate(blog.updatedAt)
                        : "Never"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewBlog(blog)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog)}
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Blog Management
            </h1>
          </div>
          <p className="text-gray-600">
            Create, edit, and manage your blog posts
          </p>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title, description, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchBlogs(true)}
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
                onClick={handleAddBlog}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus size={20} />
                Add Blog
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && !isRefreshing ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by creating your first blog post."}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddBlog}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Blog
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
        <AddEditBlogModal
          blog={selectedBlog}
          isLoading={isLoading}
          isEdit={isEditModalOpen}
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={closeAllModals}
          onSubmit={handleBlogSubmit}
        />

     

        <DeleteBlogModal
          isOpen={isDeleteModalOpen}
          onClose={closeAllModals}
          onConfirm={handleConfirmDelete}
          blog={selectedBlog}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default BlogManagement;