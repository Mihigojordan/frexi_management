// Destination.jsx
import React, { useState, useEffect } from "react";
import { Search, Grid, List } from "lucide-react";
import HeaderBanner from "../../components/landing/HeaderBanner";
import CategorySidebar from "../../components/landing/destination/CategoryCard";
import destinationService from "../../services/destinationServices";
import DestinationCard from "../../components/landing/destination/DestinationCard";

const Destination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Default Sorting");
  const [viewMode, setViewMode] = useState("grid");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");

  const itemsPerPage = 6; // Changed from 9 to 6

  // Fetch destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  // Filter and sort destinations when dependencies change
  useEffect(() => {
    let filtered = [...destinations];

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((dest) => {
        const name = (dest.name || "").toString().toLowerCase();
        const country = (dest.country || "").toString().toLowerCase();
        const description = (dest.description || "").toString().toLowerCase();

        return (
          name.includes(lowerSearch) ||
          country.includes(lowerSearch) ||
          description.includes(lowerSearch)
        );
      });
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(
        (dest) =>
          dest.category &&
          dest.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(
        (dest) =>
          dest.country &&
          dest.country.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply budget filter
    if (budgetFilter) {
      filtered = applyBudgetFilter(filtered, budgetFilter);
    }

    // Apply sorting
    filtered = applySorting(filtered, sortBy);

    setFilteredDestinations(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    destinations,
    searchTerm,
    sortBy,
    categoryFilter,
    locationFilter,
    budgetFilter,
  ]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await destinationService.getActiveDestinations();
      setDestinations(data);
    } catch (err) {
      setError(err.message || "Failed to fetch destinations");
      console.error("Error fetching destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  const applySorting = (destinationList, sortType) => {
    switch (sortType) {
      case "Name A-Z":
        return destinationList.sort((a, b) => a.name.localeCompare(b.name));
      case "Name Z-A":
        return destinationList.sort((a, b) => b.name.localeCompare(a.name));
      case "Rating High to Low":
        return destinationList.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
      case "Rating Low to High":
        return destinationList.sort(
          (a, b) => (a.rating || 0) - (b.rating || 0)
        );
      case "Budget Low to High":
        return destinationList.sort(
          (a, b) => (a.estimatedBudget || 0) - (b.estimatedBudget || 0)
        );
      case "Budget High to Low":
        return destinationList.sort(
          (a, b) => (b.estimatedBudget || 0) - (a.estimatedBudget || 0)
        );
      default:
        return destinationList;
    }
  };

  const applyBudgetFilter = (destinationList, budgetRange) => {
    if (!budgetRange) return destinationList;

    return destinationList.filter((dest) => {
      const budget = dest.estimatedBudget || 0;

      switch (budgetRange) {
        case "0-500":
          return budget <= 500;
        case "500-1000":
          return budget > 500 && budget <= 1000;
        case "1000-2500":
          return budget > 1000 && budget <= 2500;
        case "2500-5000":
          return budget > 2500 && budget <= 5000;
        case "5000+":
          return budget > 5000;
        default:
          return true;
      }
    });
  };

  const handleBookNow = (destinationId) => {
    console.log(`Booking destination: ${destinationId}`);
    // Navigate to booking page or open booking modal
    // Example: navigate(`/booking/${destinationId}`);
  };

  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);

    // Optional: Use backend search if you prefer server-side filtering
    if (searchValue && searchValue.length > 2) {
      try {
        const searchResults = await destinationService.searchDestinations(
          searchValue
        );
        // You can choose to use searchResults instead of client-side filtering
      } catch (err) {
        console.error("Search error:", err);
      }
    }
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handleLocationFilter = (location) => {
    setLocationFilter(location);
  };

  const handleBudgetFilter = (budgetRange) => {
    setBudgetFilter(budgetRange);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategoryFilter(null);
    setLocationFilter("");
    setBudgetFilter("");
  };

  // Helper function to format budget display
  const formatBudgetDisplay = (budgetRange) => {
    if (!budgetRange) return "";
    return budgetRange.replace("-", " - $").replace("+", "+").replace(/^/, "$");
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 text-gray-700 hover:text-primary-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          ← Prev
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            i === currentPage
              ? "bg-primary-500 text-white"
              : "border border-gray-300 text-gray-700 hover:bg-primary-500 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 text-gray-700 hover:text-primary-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Next →
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        {pages}
      </div>
    );
  };

  const hasActiveFilters =
    categoryFilter || locationFilter || budgetFilter || searchTerm;

  if (loading) {
    return (
      <>
        <HeaderBanner title={"Our Destinations"} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-lg">Loading destinations...</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderBanner title={"Our Destinations"} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <div className="text-red-500 text-xl mb-4">
              ⚠️ Error Loading Destinations
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchDestinations}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderBanner title={"Our Destinations"} />
      <div className="container mx-auto px-4 py-8 w-11/12 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  className="w-full px-4 py-3 bg-gray-50 text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pl-10"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Results Info */}
              <div className="text-sm text-gray-600">
                Showing {currentDestinations.length} of{" "}
                {filteredDestinations.length} destinations
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary-500 text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-primary-500 text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-black "
                >
                  <option>Default Sorting</option>
                  <option>Name A-Z</option>
                  <option>Name Z-A</option>
                  <option>Rating High to Low</option>
                  <option>Rating Low to High</option>
                  <option>Budget Low to High</option>
                  <option>Budget High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <span className="text-sm font-medium text-primary-700">
                  Active Filters:
                </span>

                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => handleSearch("")}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                )}

                {categoryFilter && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    Category: {categoryFilter}
                    <button
                      onClick={() => handleCategoryFilter(null)}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                )}

                {locationFilter && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    Location: {locationFilter}
                    <button
                      onClick={() => handleLocationFilter("")}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                )}

                {budgetFilter && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    Budget: {formatBudgetDisplay(budgetFilter)}
                    <button
                      onClick={() => handleBudgetFilter("")}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary-600 hover:text-primary-800 underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* No Results Message */}
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl text-gray-600 mb-2">
                  No destinations found
                </h3>
                <p className="text-gray-500 mb-4">
                  {hasActiveFilters
                    ? "Try adjusting your filters"
                    : "No destinations available at the moment"}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2 text-primary-700 border border-primary-700 rounded-md hover:bg-primary-700 hover:text-white transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Destinations Grid */}
                <div
                  className={`grid gap-6 mb-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {currentDestinations.map((destination) => (
                    <DestinationCard
                      key={destination._id || destination.id}
                      destination={destination}
                      viewMode={viewMode}
                      onBookNow={() =>
                        handleBookNow(destination._id || destination.id)
                      }
                    />
                  ))}
                </div>

                {/* Pagination */}
                {renderPagination()}
              </>
            )}
          </div>

          {/* Sidebar */}
          <CategorySidebar
            onCategoryFilter={handleCategoryFilter}
            onLocationFilter={handleLocationFilter}
            onBudgetFilter={handleBudgetFilter}
          />
        </div>
      </div>
    </>
  );
};

export default Destination;
