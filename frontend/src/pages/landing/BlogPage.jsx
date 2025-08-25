import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderBanner from "../../components/landing/HeaderBanner";
import blogService from '../../services/blogServices'; // Adjust path as needed

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(2); // Number of blogs per page

    // Fetch blogs on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await blogService.getAllBlogs();
                
                if (response.success) {
                    setBlogs(response.data);
                    setFilteredBlogs(response.data);
                } else {
                    setError(response.error);
                }
            } catch (err) {
                setError('Failed to fetch blogs');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter(blog =>
                blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blogService.parseDescription(blog.description)?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBlogs(filtered);
        }
        setCurrentPage(1); // Reset to first page when searching
    }, [searchTerm, blogs]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Pagination component
    const Pagination = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-center items-center space-x-2 mt-12">
                {/* Previous button */}
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg border ${
                        currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                >
                    Previous
                </button>

                {/* Page numbers */}
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentPage(1)}
                            className="px-3 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                        >
                            1
                        </button>
                        {startPage > 2 && (
                            <span className="px-3 py-2 text-gray-500">...</span>
                        )}
                    </>
                )}

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-3 py-2 rounded-lg border ${
                            currentPage === number
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }`}
                    >
                        {number}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <span className="px-3 py-2 text-gray-500">...</span>
                        )}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-3 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next button */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg border ${
                        currentPage === totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                >
                    Next
                </button>
            </div>
        );
    };

    // Loading component
    if (loading) {
        return (
            <>
                <HeaderBanner title={'Our Blogs'} />
                <div className="min-h-screen bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-8">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                                    <div className="md:flex">
                                        <div className="md:w-1/3">
                                            <div className="h-64 bg-gray-300"></div>
                                        </div>
                                        <div className="md:w-2/3 p-8">
                                            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                                            <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                                            <div className="space-y-2 mb-4">
                                                <div className="h-3 bg-gray-300 rounded"></div>
                                                <div className="h-3 bg-gray-300 rounded"></div>
                                                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                                            </div>
                                            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Error component
    if (error) {
        return (
            <>
                <HeaderBanner title={'Our Blogs'} />
                <div className="min-h-screen bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">
                                Error Loading Blogs
                            </h3>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HeaderBanner title={'Our Blogs'} />
            
            <div className="min-h-screen bg-gray-50 py-12">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center px-7 lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            {/* Search Bar */}
                            <div className="mb-8">
                                <div className="relative max-w-md">
                                    <input
                                        type="text"
                                        placeholder="Search blogs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="bg-teal-700 text-white p-1 rounded">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* No blogs message */}
                            {filteredBlogs.length === 0 && !loading && (
                                <div className="text-center py-12">
                                    <div className="max-w-md mx-auto">
                                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                                        </svg>
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blogs Found</h3>
                                        <p className="text-gray-500">
                                            {searchTerm ? 'Try adjusting your search terms.' : 'No blogs have been published yet.'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Blog List */}
                            {currentBlogs.length > 0 && (
                                <div className="space-y-8">
                                    {currentBlogs.map((blog) => (
                                        <article key={blog.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                            <div className="">
                                                {/* Blog Image */}
                                                <div className="relative">
                                                    {blog.imageUrl ? (
                                                        <div className="relative">
                                                            <img
                                                                src={blogService.getImageUrl(blog.imageUrl)}
                                                                alt={blog.title || 'Blog image'}
                                                                className="w-full h-[50vh]  object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.parentElement.innerHTML = `
                                                                        <div class="w-full h-64 md:h-full flex items-center justify-center bg-gray-200">
                                                                            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                                            </svg>
                                                                        </div>
                                                                    `;
                                                                }}
                                                            />
                                                            {/* Play button overlay
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all cursor-pointer">
                                                                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z"/>
                                                                    </svg>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-64 md:h-full flex items-center justify-center bg-gray-200">
                                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Blog Content */}
                                                <div className="md:w-2/3 p-8">
                                                    {/* Blog Meta */}
                                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                                        <div className="flex items-center mr-4">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                            </svg>
                                                            <span>By {blog.author?.name || 'Anonymous'}</span>
                                                        </div>
                                                        <div className="flex items-center mr-4">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                            </svg>
                                                            <span>{formatDate(blog.createdAt)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                                            </svg>
                                                            <span>Tour Guide</span>
                                                        </div>
                                                    </div>

                                                    {/* Blog Title */}
                                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-teal-700 transition-colors">
                                                        <Link to={`/blogs/${blog.id}`}>
                                                            {blog.title || 'Untitled Blog'}
                                                        </Link>
                                                    </h2>

                                                    {/* Blog Description */}
                                                    <div className="text-gray-600 mb-6 leading-relaxed">
                                                        <div dangerouslySetInnerHTML={{ 
                                                            __html: blogService.parseDescription(blog.description) || 'No description available.' 
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <Pagination />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
                                {/* Categories */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-teal-600 pb-2 inline-block">
                                        Categories
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center justify-between">
                                            <Link to="/blogs/category/city-tour" className="text-gray-600 hover:text-teal-700 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                                </svg>
                                                City Tour
                                            </Link>
                                            <span className="text-gray-400 text-sm">(8)</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <Link to="/blogs/category/beach-tours" className="text-gray-600 hover:text-teal-700 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945"></path>
                                                </svg>
                                                Beach Tours
                                            </Link>
                                            <span className="text-gray-400 text-sm">(6)</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <Link to="/blogs/category/wildlife-tours" className="text-gray-600 hover:text-teal-700 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                                </svg>
                                                Wildlife Tours
                                            </Link>
                                            <span className="text-gray-400 text-sm">(2)</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <Link to="/blogs/category/news-tips" className="text-gray-600 hover:text-teal-700 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                                                </svg>
                                                News & Tips
                                            </Link>
                                            <span className="text-gray-400 text-sm">(7)</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <Link to="/blogs/category/adventure-tours" className="text-gray-600 hover:text-teal-700 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                                                </svg>
                                                Adventure Tours
                                            </Link>
                                            <span className="text-gray-400 text-sm">(9)</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <Link to="/blogs/category/mountain-tours" className="text-gray-600 hover:text-teal-700 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                                </svg>
                                                Mountain Tours
                                            </Link>
                                            <span className="text-gray-400 text-sm">(10)</span>
                                        </li>
                                    </ul>
                                </div>

                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogs;