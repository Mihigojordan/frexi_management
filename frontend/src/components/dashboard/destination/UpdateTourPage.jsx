import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Plus, X, Upload, MapPin, DollarSign, Globe, Camera, Tag, Loader } from 'lucide-react';
import destinationService from '../../../services/destinationServices';
import Swal from 'sweetalert2';

const UpdateDestinationPage = ({ role }) => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    // Image states
    const [existingMainPhoto, setExistingMainPhoto] = useState(null);
    const [newMainPhoto, setNewMainPhoto] = useState(null);
    const [newMainPhotoPreview, setNewMainPhotoPreview] = useState(null);

    const [existingGallery, setExistingGallery] = useState([]);
    const [keepGalleryImages, setKeepGalleryImages] = useState([]);
    const [newGalleryFiles, setNewGalleryFiles] = useState([]);
    const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // Quill modules configuration
    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    const quillFormats = [
        'header', 'bold', 'italic', 'underline',
        'list', 'bullet', 'link'
    ];

    // Fetch existing destination data
    useEffect(() => {
        const fetchDestinationData = async () => {
            if (!id) return;

            try {
                setIsInitialLoading(true);
                const destinationData = await destinationService.getDestinationById(id);

                // Populate form data
                setFormData({
                    name: destinationData.name || '',
                    country: destinationData.country || '',
                    city: destinationData.city || '',
                    description: destinationData.description || '',
                    visaRequirements: destinationData.visaRequirements || '',
                    language: destinationData.language || '',
                    currencyUsed: destinationData.currencyUsed || '',
                    areaKm2: destinationData.areaKm2 ? destinationData.areaKm2.toString() : '',
                    estimatedBudget: destinationData.estimatedBudget ? destinationData.estimatedBudget.toString() : '',
                    isActive: destinationData.isActive !== undefined ? destinationData.isActive : true
                });

           setPopularSites(() => {
    const sites = destinationData.popularSites;
    if (Array.isArray(sites)) return sites;
    if (typeof sites === 'string') {
        try {
            const parsed = JSON.parse(sites);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return sites.split(',').map(s => s.trim()).filter(s => s.length > 0);
        }
    }
    return [];
});

setHighlights(() => {
    const highlights = destinationData.highlights;
    console.log('highlights',highlights);
    
    if (Array.isArray(highlights)) return highlights;
    if (typeof highlights === 'string') {
        try {
            const parsed = JSON.parse(highlights);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return highlights.split(',').map(h => h.trim()).filter(h => h.length > 0);
        }
    }
    return [];
});

                // Set existing images
                setExistingMainPhoto(destinationData.mainPhotoUrl || null);
                const gallery = Array.isArray(destinationData.gallery) ? destinationData.gallery : [];
                setExistingGallery(gallery);
                setKeepGalleryImages(gallery); // Initially keep all existing images

            } catch (error) {
                console.error('Error fetching destination data:', error);
                alert('Failed to load destination data. Please try again.');
                navigate( role == 'admin' ? '/admin/dashboard/destinations': '/employee/dashboard/destinations');
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchDestinationData();
    }, [id, navigate]);

    // Cleanup preview URLs
    useEffect(() => {
        return () => {
            if (newMainPhotoPreview) {
                URL.revokeObjectURL(newMainPhotoPreview);
            }
            newGalleryPreviews.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, []);

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
            setNewMainPhoto(file);
            setNewMainPhotoPreview(previewUrl);

            setErrors(prev => ({
                ...prev,
                mainPhoto: ''
            }));
        }
    };

    const removeNewMainPhoto = () => {
        if (newMainPhotoPreview) {
            URL.revokeObjectURL(newMainPhotoPreview);
        }
        setNewMainPhoto(null);
        setNewMainPhotoPreview(null);
        document.getElementById('main-photo').value = '';
    };

    const handleNewGalleryFilesChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);

        // Calculate total images (kept + new)
        const totalImages = keepGalleryImages.length + newGalleryFiles.length;
        const remainingSlots = 10 - totalImages;
        const filesToAdd = validFiles.slice(0, remainingSlots);

        let errorMessage = '';

        if (validFiles.length !== files.length) {
            errorMessage = 'Some files were too large (max 5MB each). ';
        }

        if (validFiles.length > remainingSlots) {
            errorMessage += `Only ${remainingSlots} more images can be added (10 max total).`;
        }

        if (totalImages >= 10) {
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

            setNewGalleryFiles(prev => [...prev, ...filesToAdd]);
            setNewGalleryPreviews(prev => [...prev, ...newPreviewUrls]);
        }

        e.target.value = '';
    };

  const removeExistingGalleryImage = async (imageUrl) => {
    const result = await Swal.fire({
        title: 'Delete Image?',
        text: 'This image will be permanently removed from the gallery. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        setKeepGalleryImages(prev => prev.filter(url => url !== imageUrl));
        
        Swal.fire({
            title: 'Deleted!',
            text: 'The image has been removed from the gallery.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    }
};

    const removeNewGalleryImage = (index) => {
        const newFiles = newGalleryFiles.filter((_, i) => i !== index);
        const newPreviews = newGalleryPreviews.filter((_, i) => i !== index);

        // Revoke the removed preview URL
        URL.revokeObjectURL(newGalleryPreviews[index]);

        setNewGalleryFiles(newFiles);
        setNewGalleryPreviews(newPreviews);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Destination name is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';

        // Featured Photo validation - require either existing or new
        if (!existingMainPhoto && !newMainPhoto) {
            newErrors.mainPhoto = 'Featured Photo is required';
        }

        if (newMainPhoto && newMainPhoto.size > 5 * 1024 * 1024) {
            newErrors.mainPhoto = 'File size should be less than 5MB';
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
            const destinationData = {
                ...formData,
                areaKm2: formData.areaKm2 ? parseFloat(formData.areaKm2) : null,
                estimatedBudget: formData.estimatedBudget ? parseFloat(formData.estimatedBudget) : null,
                popularSites: popularSites,
                highlights: highlights,
                description: destinationService.parseDescription(formData.description) 
            };

           
            await destinationService.updateDestination(
                id,
                destinationData,
                newMainPhoto,
                newGalleryFiles,
                keepGalleryImages
            );

            alert('Destination updated successfully!');
            navigate('/admin/dashboard/destinations');
        } catch (error) {
            console.error('Error updating destination:', error);
            alert('Failed to update destination. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isInitialLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin mx-auto mb-4" size={48} />
                    <p className="text-gray-600">Loading destination data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white flex items-center">
                            <MapPin className="mr-2" />
                            Update Destination
                        </h1>
                        <p className="text-primary-100 mt-1">Edit destination information and media</p>
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
                                            Destination Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm`}
                                            placeholder="Enter destination name"
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
                                            value={destinationService.parseDescription(formData.description)}
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
                                     {/* Popular Sites */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="inline mr-1" size={14} />
                                        Popular Sites
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
                                        Highlights
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
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6 col-span-2 lg:col-span-1">
                           

                                {/* Images */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Images</h3>

                                    {/* Featured Photo */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Camera className="inline mr-1" size={14} />
                                            Featured Photo
                                        </label>

                                        {/* Current Featured Photo */}
                                        {existingMainPhoto && !newMainPhoto && (
                                            <div className="mb-3">
                                                <p className="text-sm text-gray-600 mb-2">Current Featured Photo:</p>
                                                <div className="relative">
                                                    <img
                                                        src={destinationService.getFullImageUrl(existingMainPhoto)}
                                                        alt="Current Featured Photo"
                                                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                                    />
                                                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                                        Current
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* New Featured Photo preview */}
                                        {newMainPhotoPreview && (
                                            <div className="mb-3">
                                                <p className="text-sm text-gray-600 mb-2">New Featured Photo:</p>
                                                <div className="relative">
                                                    <img
                                                        src={newMainPhotoPreview}
                                                        alt="New Featured Photo preview"
                                                        className="w-full h-48 object-cover rounded-lg border-2 border-green-300"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeNewMainPhoto}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    <div className="absolute bottom-2 left-2 bg-green-600 bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                                                        New - {newMainPhoto?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Upload new Featured Photo */}
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleMainPhotoChange}
                                                className="hidden"
                                                id="main-photo"
                                            />
                                            <label
                                                htmlFor="main-photo"
                                                className={`flex items-center justify-center w-full px-3 py-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm ${errors.mainPhoto ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            >
                                                <div className="text-center">
                                                    <Upload className="mx-auto mb-1" size={20} />
                                                    {existingMainPhoto ? 'Change Featured Photo' : 'Upload Featured Photo'}
                                                </div>
                                            </label>
                                            {errors.mainPhoto && <p className="text-red-500 text-xs mt-1">{errors.mainPhoto}</p>}
                                        </div>
                                    </div>

                                    {/* Gallery Images */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gallery Images ({keepGalleryImages.length + newGalleryFiles.length}/10)
                                        </label>

                                        {/* Existing gallery images */}
                                        {existingGallery.length > 0 && (
    <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Current gallery images:</p>
        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {existingGallery.map((imageUrl, index) => {
                const isKept = keepGalleryImages.includes(imageUrl);
                
                // Only show images that are still kept
                if (!isKept) return null;
                
                return (
                    <div key={index} className="relative">
                        <img
                            src={destinationService.getFullImageUrl(imageUrl)}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border-2 border-gray-300"
                        />
                        <button
                            type="button"
                            onClick={() => removeExistingGalleryImage(imageUrl)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="Delete image permanently"
                        >
                            <X size={12} />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 rounded text-xs">
                            Current
                        </div>
                    </div>
                );
            })}
        </div>
        
       
    </div>
)}


                                        {/* New gallery images */}
                                        {newGalleryPreviews.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-600 mb-2">New gallery images:</p>
                                                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                                                    {newGalleryPreviews.map((preview, index) => (
                                                        <div key={index} className="relative">
                                                            <img
                                                                src={preview}
                                                                alt={`New gallery ${index + 1}`}
                                                                className="w-full h-20 object-cover rounded-lg border-2 border-green-300"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeNewGalleryImage(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                            <div className="absolute bottom-1 left-1 bg-green-600 bg-opacity-75 text-white px-1 py-0.5 rounded text-xs truncate max-w-16">
                                                                {newGalleryFiles[index]?.name}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Add new gallery images */}
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleNewGalleryFilesChange}
                                                className="hidden"
                                                id="gallery-files"
                                                disabled={keepGalleryImages.length + newGalleryFiles.length >= 10}
                                            />

                                            {keepGalleryImages.length + newGalleryFiles.length < 10 ? (
                                                <label
                                                    htmlFor="gallery-files"
                                                    className={`flex items-center justify-center w-full px-3 py-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm ${errors.gallery ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                >
                                                    <div className="text-center">
                                                        <Plus size={16} className="mx-auto mb-1" />
                                                        Add gallery images ({10 - (keepGalleryImages.length + newGalleryFiles.length)} remaining)
                                                    </div>
                                                </label>
                                            ) : (
                                                <div className="flex items-center justify-center w-full px-3 py-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm">
                                                    Maximum 10 images reached
                                                </div>
                                            )}
                                            {errors.gallery && <p className="text-red-500 text-xs mt-1">{errors.gallery}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Active Status */}
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
                                            Make this destination active and visible
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="col-span-2">
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate('/admin/dashboard/destinations')}
                                        className="flex-1 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all shadow-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 transform hover:scale-105'
                                            } shadow-lg`}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Updating Destination...
                                            </div>
                                        ) : (
                                            'Update Destination'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateDestinationPage;