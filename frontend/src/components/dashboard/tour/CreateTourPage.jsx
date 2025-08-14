import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Plus, X, Upload, MapPin, DollarSign, Globe, Camera, Tag } from 'lucide-react';
import tourService from '../../../services/toursServices';
import { useNavigate } from 'react-router-dom';

const CreateTourPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    visaRequirements: '',
    language: '',
    currencyUsed: '',
    areaKm2: '',
    estimatedBudget: '',
    isActive: true
  });

  const [popularSites, setPopularSites] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [newPopularSite, setNewPopularSite] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [mainPhoto, setMainPhoto] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  const [mainPhotoPreview, setMainPhotoPreview] = useState(null);
const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Quill modules configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet', 'link'
  ];

  // Add this useEffect after your state declarations:
useEffect(() => {
  return () => {
    // Cleanup preview URLs when component unmounts
    if (mainPhotoPreview) {
      URL.revokeObjectURL(mainPhotoPreview);
    }
    galleryPreviews.forEach(url => {
      URL.revokeObjectURL(url);
    });
  };
}, [ ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: value
    }));
  };

  const addPopularSite = () => {
    if (newPopularSite.trim()) {
      setPopularSites(prev => [...prev, newPopularSite.trim()]);
      setNewPopularSite('');
      setErrors(prev => ({ ...prev, popularSites: '' }));
    }
  };

  const removePopularSite = (index) => {
    setPopularSites(prev => prev.filter((_, i) => i !== index));
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights(prev => [...prev, newHighlight.trim()]);
      setNewHighlight('');
      setErrors(prev => ({ ...prev, highlights: '' }));
    }
  };

  const removeHighlight = (index) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'popularSites') {
        addPopularSite();
      } else if (type === 'highlights') {
        addHighlight();
      }
    }
  };

  const handleMainPhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        mainPhoto: 'File size should be less than 5MB'
      }));
      return;
    }
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setMainPhoto(file);
    setMainPhotoPreview(previewUrl);
    
    setErrors(prev => ({
      ...prev,
      mainPhoto: ''
    }));
  }

};

const handleGalleryFilesChange = (e) => {
  const files = Array.from(e.target.files);
  const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
  
  // Calculate how many files can be added (max 10 total)
  const remainingSlots = 10 - galleryFiles.length;
  const filesToAdd = validFiles.slice(0, remainingSlots);
  
  let errorMessage = '';
  
  if (validFiles.length !== files.length) {
    errorMessage = 'Some files were too large (max 5MB each). ';
  }
  
  if (validFiles.length > remainingSlots) {
    errorMessage += `Only ${remainingSlots} more images can be added (10 max total).`;
  }
  
  if (galleryFiles.length >= 10) {
    errorMessage = 'Maximum 10 images allowed in gallery.';
  }
  
  if (errorMessage) {
    setErrors(prev => ({
      ...prev,
      gallery: errorMessage.trim()
    }));
  } else {
    setErrors(prev => ({
      ...prev,
      gallery: ''
    }));
  }
  
  if (filesToAdd.length > 0) {
    // Create preview URLs for new files
    const newPreviewUrls = filesToAdd.map(file => URL.createObjectURL(file));
    
    // Add to existing arrays
    setGalleryFiles(prev => [...prev, ...filesToAdd]);
    setGalleryPreviews(prev => [...prev, ...newPreviewUrls]);
  }
  
  // Reset the file input
  e.target.value = '';
};

const removeMainPhotoPreview = () => {
  if (mainPhotoPreview) {
    URL.revokeObjectURL(mainPhotoPreview);
  }
  setMainPhoto(null);
  setMainPhotoPreview(null);
  // Reset the file input
  document.getElementById('main-photo').value = '';
};

const removeGalleryPreview = (index) => {
  const newFiles = galleryFiles.filter((_, i) => i !== index);
  const newPreviews = galleryPreviews.filter((_, i) => i !== index);
  

  console.log('old removed : ' ,galleryPreviews[index]);

  
  setGalleryFiles(newFiles);
  setGalleryPreviews(newPreviews);
};

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Tour name is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!mainPhoto ) newErrors.mainPhoto = 'Main Photo  is required';
    
    if (mainPhoto && mainPhoto.size > 5 * 1024 * 1024  ) newErrors.mainPhoto =  'File size should be less than 5MB';
    if (!formData.description.trim() || formData.description === '<p><br></p>') {
      newErrors.description = 'Description is required';
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const tourData = {
        ...formData,
        areaKm2: formData.areaKm2 ? parseFloat(formData.areaKm2) : null,
        estimatedBudget: formData.estimatedBudget ? parseFloat(formData.estimatedBudget) : null,
        popularSites: popularSites,
        highlights: highlights,
        description: formData.description
      };

      const response = await tourService.createTour(tourData, mainPhoto, galleryFiles);
      
      // Reset form on success
      setFormData({
        name: '',
        country: '',
        city: '',
        description: '',
        visaRequirements: '',
        language: '',
        currencyUsed: '',
        areaKm2: '',
        estimatedBudget: '',
        isActive: true
      });
      setPopularSites([]);
      setHighlights([]);
      setNewPopularSite('');
      setNewHighlight('');
      setMainPhoto(null);
      setGalleryFiles([]);
      navigate('/admin/dashboard/tours')
      setMainPhotoPreview(null);
setGalleryPreviews([]);

      
      alert('Tour created successfully!');
    } catch (error) {
      console.error('Error creating tour:', error);
      alert('Failed to create tour. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <MapPin className="mr-2" />
              Create New Tour
            </h1>
            <p className="text-primary-100 mt-1">Add a new destination to your tour collection</p>
          </div>

          <div className="p-6">
            {/* Two Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6 col-span-2 lg:col-span-1">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tour Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm`}
                      placeholder="Enter tour name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-lg border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm`}
                        placeholder="Country"
                      />
                      {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="Main language"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Globe className="inline mr-1" size={14} />
                        Currency
                      </label>
                      <input
                        type="text"
                        name="currencyUsed"
                        value={formData.currencyUsed}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="USD, EUR, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <div className={`rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'}`}>
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={handleDescriptionChange}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write a detailed description..."
                      style={{ height: '180px', marginBottom: '42px' }}
                    />
                  </div>
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Area (km²)
                      </label>
                      <input
                        type="number"
                        name="areaKm2"
                        value={formData.areaKm2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <DollarSign className="inline mr-1" size={14} />
                        Budget
                      </label>
                      <input
                        type="number"
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visa Requirements
                    </label>
                    <input
                      type="text"
                      name="visaRequirements"
                      value={formData.visaRequirements}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Visa required, on arrival, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6 col-span-2 lg:col-span-1">
                {/* Popular Sites */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline mr-1" size={14} />
                    Popular Sites *
                  </label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={newPopularSite}
                      onChange={(e) => setNewPopularSite(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'popularSites')}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Add a popular site"
                    />
                    <button
                      onClick={addPopularSite}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {popularSites.map((site, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {site}
                        <button
                          onClick={() => removePopularSite(index)}
                          className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary-200 text-primary-600"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.popularSites && <p className="text-red-500 text-xs mt-1">{errors.popularSites}</p>}
                </div>

                {/* Highlights */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="inline mr-1" size={14} />
                    Highlights *
                  </label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'highlights')}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Add a highlight"
                    />
                    <button
                      onClick={addHighlight}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {highlight}
                        <button
                          onClick={() => removeHighlight(index)}
                          className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary-200 text-primary-600"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.highlights && <p className="text-red-500 text-xs mt-1">{errors.highlights}</p>}
                </div>

                {/* File Uploads */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Images</h3>
                  {/* Main Image */}
                 <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    <Camera className="inline mr-1" size={14} />
    Main Photo
  </label>
  <div className="relative">
    <input
      type="file"
      accept="image/*"
      onChange={handleMainPhotoChange}
      className="hidden"
      id="main-photo"
    />
    
    {mainPhotoPreview ? (
      <div className="relative">
        <img
          src={mainPhotoPreview}
          alt="Main photo preview"
          className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
        />
        <button
          type="button"
          onClick={removeMainPhotoPreview}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
        >
          <X size={16} />
        </button>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {mainPhoto?.name}
        </div>
      </div>
    ) : (
      <label
        htmlFor="main-photo"
        className={`flex items-center justify-center w-full px-3 py-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm ${
          errors.mainPhoto ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <div className="text-center">
          <Upload className="mx-auto mb-2" size={24} />
          Choose main photo
        </div>
      </label>
    )}
    {errors.mainPhoto && <p className="text-red-500 text-xs mt-1">{errors.mainPhoto}</p>}
  </div>
</div>
{/* Gallery Images */}
  <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Gallery Images ({galleryFiles.length}/10)
  </label>
  <div className="relative">
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleGalleryFilesChange}
      className="hidden"
      id="gallery-files"
      disabled={galleryFiles.length >= 10}
    />
    
    {galleryPreviews.length > 0 ? (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
          {galleryPreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Gallery preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeGalleryPreview(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={12} />
              </button>
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 rounded text-xs truncate max-w-20">
                {galleryFiles[index]?.name}
              </div>
            </div>
          ))}
        </div>
        {galleryFiles.length < 10 && (
          <label
            htmlFor="gallery-files"
            className="flex items-center justify-center w-full px-3 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm"
          >
            <Plus size={16} className="mr-1" />
            Add more images ({10 - galleryFiles.length} remaining)
          </label>
        )}
        {galleryFiles.length >= 10 && (
          <div className="flex items-center justify-center w-full px-3 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm">
            Maximum 10 images reached
          </div>
        )}
      </div>
    ) : (
      <label
        htmlFor="gallery-files"
        className={`flex items-center justify-center w-full px-3 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm ${
          errors.gallery ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <div className="text-center">
          <Upload className="mx-auto mb-2" size={20} />
          Choose gallery images (max 10)
        </div>
      </label>
    )}
    {errors.gallery && <p className="text-red-500 text-xs mt-1">{errors.gallery}</p>}
  </div>
</div>              </div>

                {/* Active Status & Submit */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      id="isActive"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                      Make this tour active and visible
                    </label>
                  </div>

                </div>
              </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full col-span-2 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 transform hover:scale-105'
                    } shadow-lg`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Tour...
                      </div>
                    ) : (
                      'Create Tour'
                    )}
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTourPage;