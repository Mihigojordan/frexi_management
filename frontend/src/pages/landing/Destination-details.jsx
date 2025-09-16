import React from 'react';
import { Star, MapPin, Globe, DollarSign, Calendar, Users, Check, Search, Phone, ArrowRight } from 'lucide-react';
import img1 from '../../assets/image/gorilla1.jpg' ;
import HeaderBanner from '../../components/landing/HeaderBanner';

const DestinationDetails = () => {
  const categories = [
    { name: 'City Tour', count: 8 },
    { name: 'Beach Tours', count: 6 },
    { name: 'Wildlife Tours', count: 2 },
    { name: 'News & Tips', count: 7 },
    { name: 'Adventure Tours', count: 9 },
    { name: 'Mountain Tours', count: 10 }
  ];

  const recentPosts = [
    {
      title: 'Exploring The Green Spaces Of The Island Maldives',
      date: '22/6/2024',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    },
    {
      title: 'Harmony With Nature Of Belgium Tour And Travel',
      date: '25/6/2024',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'
    },
    {
      title: 'Exploring The Green Spaces Of Realar Residence',
      date: '27/6/2024',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop'
    }
  ];

  const popularTags = ['Tour', 'Adventure', 'Rent', 'Innovate', 'Hotel', 'Modern', 'Luxury', 'Travel'];

  const highlights = [
    'Stroll through the UNESCO-listed Grand Place, a breathtaking square.',
    'Enjoy daily continental breakfasts at eco-certified hotels.',
    'Explore with a local guide who offers deep insights into Brussels\' history and culture.',
    'Savor exquisite Belgian chocolate from local, sustainable shops.',
    'Take advantage of currency exchange assistance and tourist guidance.',
    'Stay in hotels that prioritize water and energy conservation.',
    'Experience Brussels\' world-renowned hospitality in a sustainable way.'
  ];

  const basicInfo = [
    { label: 'Destination', value: 'Belgium, Brussels', icon: MapPin },
    { label: 'Visa Requirements', value: 'Schengen Visa', icon: Globe },
    { label: 'Language', value: 'French, Dutch', icon: Users },
    { label: 'Currency Used', value: 'Euro (€)', icon: DollarSign },
    { label: 'Area (km²)', value: '161 km²', icon: MapPin },
    { label: 'Popular Sites', value: 'Grand Place, Atomium', icon: Star },
    { label: 'Estimated Budget', value: 'Approx. $950.00', icon: DollarSign }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=300&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeaderBanner title={'brussel'} />
      <div className="relative h-96 bg-gradient-to-r from-primary-500 to-primary-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <img 
          src={img1}
          alt="Brussels Grand Place"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            {/* <div className="inline-flex items-center bg-primary-500 px-4 py-2 rounded-full mb-4">
              <span className="bg-green-500 text-white px-2 py-1 rounded mr-2 text-sm">Featured</span>
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm">4.9</span>
            </div> */}
            <h1 className="text-4xl font-bold mb-4">Explore the Charm of Brussels, Belgium</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 mb-6">
                Known for its stunning architecture, world-class chocolate, and vibrant culture, Brussels offers a blend 
                of history, art, and modernity. Discover the historic Grand Place, the Atomium, and sample renowned 
                Belgian waffles and chocolate. This capital city is both cosmopolitan and quaint, inviting travelers to 
                immerse themselves in its unique charm.
              </p>
              <p className="text-gray-600 mb-6">
                Brussels also boasts a wide array of eco-conscious accommodations, with many options focusing on 
                sustainable practices. From the bustling streets to the tranquil parks, the city is as committed to green 
                living as it is to preserving its heritage.
              </p>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-primary-500 mb-6">Basic Information</h2>
              <p className="text-gray-600 mb-6">
                With its blend of French and Dutch influences, Brussels is a truly multicultural city. It is the political and 
                administrative center of the European Union, making it a prominent international city. Here is some 
                basic travel information to make the most of your visit.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basicInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">{info.label}:</span>
                      <span className="ml-2 text-gray-600">{info.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                <blockquote className="text-lg text-gray-700 italic mb-4">
                  "Brussels is a city that captivates all senses. From the smell of fresh chocolate to the sight of 
                  beautiful architecture, it's a place where history meets the contemporary world."
                </blockquote>
                <div className="inline-block bg-primary-500 text-white px-4 py-2 rounded">
                  <span className="font-medium">Marie Dubois</span>
                </div>
              </div>

              <p className="text-gray-600 mt-6">
                Dining in Brussels offers a journey into the heart of Belgian cuisine, from classic moules-frites to 
                delectable waffles. Enjoy a meal at one of the many eco-friendly restaurants, committed to using local, 
                sustainable ingredients.
              </p>
            </div>

            {/* Sustainable Hotels Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-primary-500 mb-4">Top Hotels in Brussels for the Sustainable Traveler</h2>
              <p className="text-gray-600 mb-6">
                For travelers committed to ethical and sustainable tourism, Brussels offers a variety of eco-friendly 
                accommodations that align with these values. Each hotel is thoughtfully designed to provide comfort while 
                minimizing environmental impact.
              </p>
              
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=300&fit=crop"
                  alt="Brussels city view"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <p className="text-gray-600">
                Experience a day immersed in Brussels' culture by exploring its museums, art galleries, and beautiful 
                green spaces. In this city, sustainable travel is a priority, with many establishments offering eco-conscious amenities to enhance your stay.
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&h=300&fit=crop"
                  alt="Brussels Grand Place with flower carpet"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-primary-500 mb-6">Highlights</h2>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-primary-500 mb-6">From our gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={image}
                      alt={`Brussels gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-gray-600 hover:text-primary-500 cursor-pointer">
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="flex space-x-3">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 hover:text-primary-500 cursor-pointer line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary-500 hover:text-white cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Need Help? We Are Here To Help You</h3>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold mb-2">FR</div>
                <p className="text-sm mb-3">You Get Online support</p>
                <div className="flex items-center text-lg font-medium mb-3">
                  <Phone className="w-4 h-4 mr-2" />
                  +256 214 203 215
                </div>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center text-sm transition-colors">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;