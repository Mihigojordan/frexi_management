import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  Edit3,
  Trash2,
  Clock,
  BookOpen,
  Share2,
  Eye,
  RefreshCw,
  AlertTriangle,
  Check
} from "lucide-react";
import blogService from "../../../services/blogServices";
import { useParams } from "react-router-dom";


const ViewBlogPage = () => {
  // Simulated params and navigation
  const {id:blogId} = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch blog details
  const fetchBlog = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await blogService.getBlogById(blogId);
      console.log('Fetched blog:', response);
      
      if (response.success) {
        setBlog(response.data);
      } else {
        throw new Error(response.error || "Failed to fetch blog");
      }
    } catch (error) {
      console.error("Failed to fetch blog:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleGoBack = () => {
    window.history.back();
  };




  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return "1 min read";
    
    // Remove HTML tags and count words
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200); // Average reading speed
    return `${readTime} min read`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to Load Blog
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchBlog}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw size={16} />
              Retry
            </button>
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No blog found
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Blog Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The blog you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-10 py-4">
        <h1 className="text-3xl sm:text-4xl capitalize font-bold text-gray-900 mb-6 leading-tight">
                  {blog.title || "Untitled Blog"}
                </h1>
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Blog Content */}
          <div className="space-y-8 col-span-2">
            {/* Blog Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Featured Image */}
              {blog.imageUrl && (
                <div className="w-full h-64 sm:h-80 rounded-t-xl overflow-hidden">
                  <img
                    src={blogService.getImageUrl(blog.imageUrl)}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div 
                    className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {blog.title || "Untitled Blog"}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {blog.author?.adminName || "Unknown Author"}
                      </span>
                      {blog.author?.adminEmail && (
                        <span className="text-gray-500 ml-1">
                          ({blog.author.adminEmail})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Published {formatDate(blog.createdAt)}</span>
                  </div>

                  {/* Updated Date */}
                  {blog.updatedAt !== blog.createdAt && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Updated {formatDate(blog.updatedAt)}</span>
                    </div>
                  )}

                  {/* Read Time */}
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{calculateReadTime(blog.description?.details)}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mb-8"></div>

                {/* Blog Content */}
                <div className="">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: blogService.parseDescription(blog.description) || "<p>No content available.</p>" 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Blog Metadata */}
          <div className="space-y-8">
            {/* Blog Metadata Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Blog Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Author Details
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-900">
                      <span className="font-medium">Name:</span>{" "}
                      {blog.author?.adminName || "Unknown"}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Email:</span>{" "}
                      {blog.author?.adminEmail || "Not available"}
                    </p>
                   
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Publication Details
                  </h4>
                  <div className="space-y-2">
                   
                    <p className="text-gray-900">
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(blog.createdAt)}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Last Updated:</span>{" "}
                      {formatDate(blog.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlogPage;